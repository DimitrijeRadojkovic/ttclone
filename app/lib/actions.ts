'use server';
import { signIn } from "@/auth";
import { insertUser, insertVideo, insertLike, deleteLike } from "@/app/lib/fetch";
import { z } from 'zod';
import type { User } from "./definitions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { hashPassword } from "./utils";
import { AuthError } from "next-auth";
import fs from "node:fs/promises";
import { auth } from "@/auth";
import { PostgresError } from "postgres";
import { supabase } from "./supabaseClient";

export async function authorize(prevState: string | undefined, formData: FormData){
    try{
        await signIn('google');
    }
    catch(error){
        console.error(error);
        return "Error while authenticating";
    }
}

export type State = {
    errors?: {
        username?: string[],
        password?: string[],
        name?: string[]
    },
    message?: string | null
}

const signInSchema = z.object({
    username: z.string({
        invalid_type_error: "Username is not valid"
    }),
    password: z.string({
        invalid_type_error: "Password is not valid"
    }).min(6, "Password must be at least 6 characters"),
    name: z.string({
        invalid_type_error: "Name is not valid"
    })
});

function isPostgresError(error: unknown): error is { code: string } {
    return typeof error === "object" && error !== null && "code" in error;
}

export async function signin(prevState: State, formData: FormData){
    const validatedCredentials = signInSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
        name: formData.get('name'),
    });
    if(validatedCredentials.success){
        const user: Omit<Omit<User, 'id'>, 'profile_image'> = validatedCredentials.data;
        user.password = await hashPassword(user.password);
        try{
            await insertUser(user);
        }
        catch(error){
            console.log(error);
            const pgErr = error as any;
            console.log(pgErr.code);
            if(pgErr.code == '23505'){
                console.log("JESTE UNIQUE ERROR");
                return {
                    message: "User with this username already exists."
                }
            }
        }
    }
    else{
        return {
            errors: validatedCredentials.error.flatten().fieldErrors,
            message: "Invalid credentials"
        }
    }
    redirect("/login");
}

export async function authenticate(prevState: string | undefined, formData: FormData){
    try{
        await signIn('credentials', { username: formData.get("username"), password: formData.get("password"), redirectTo: "/" });
    }
    catch(error){
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return "Credentials not right."
                default:
                    return "Something went wrong."
            }
        }
        throw error;
    }
}

export async function uploadVideo(prevState: string | undefined, formData: FormData){

    const file = formData.get("file") as File;
    console.log(file.type);
    const session = await auth();
    console.log("session u upload", session?.user);
    if(file.type === "video/mp4" || file.type === "video/x-matroska"){
        try{
            const fileBuffer = await file.arrayBuffer();
            const filePath = `uploads/${Date.now()}-${file.name}`;

            const { data, error } = await supabase.storage.from("videos").upload(filePath, fileBuffer, { contentType: file.type });
            if(error){
                throw error;
            }
            const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/videos/${filePath}`;
            await insertVideo({ path: url, author: session?.user?.email!});
            
        }
        catch(error){
            console.log(error);
        }
    }
    else{
        return "Invalid file format: it has to be mp4 or mkv!";
    }
    revalidatePath('/');
    redirect('/');
}

export async function like(formData: FormData){
    const session = await auth();
    const liked = formData.get("liked");
    const video_id = formData.get("video_id");
    console.log("liked", liked);
    try{
        if(Number(liked) == 0 && typeof(video_id) === "string"){
            await insertLike(video_id, session?.user?.email!); 
        }
        else if(Number(liked) == 1 && typeof(video_id) === "string"){
            await deleteLike(video_id, session?.user?.email!);
        }
    }
    catch(error){
        console.log(error);
        throw error;
    }
}