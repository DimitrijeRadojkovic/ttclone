'use server';
import { signIn } from "@/auth";
import { insertUser, insertVideo } from "@/app/lib/fetch";
import { z } from 'zod';
import type { User } from "./definitions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { hashPassword } from "./utils";
import { AuthError } from "next-auth";
import fs from "node:fs/promises";
import { auth } from "@/auth";
import { PostgresError } from "postgres";

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
        const user: Omit<User, 'id'> = validatedCredentials.data;
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
    if(file.type === "mp4" || file.type === "video/x-matroska"){
        try{
            const arrayBuffer = await file.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);

            await fs.writeFile(`./public/uploads/${file.name}`, buffer);
            await insertVideo({ path: `/uploads/${file.name}`, author: session?.user?.email!});

            
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