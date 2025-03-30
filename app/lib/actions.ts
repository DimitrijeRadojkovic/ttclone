'use server';
import { signIn } from "@/auth";
import { insertUser } from "@/app/lib/fetch";
import { z } from 'zod';
import type { User } from "./definitions";
import { redirect } from "next/navigation";
import { hashPassword } from "./utils";
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