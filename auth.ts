import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { getUser } from "./app/lib/fetch";
import { z } from "zod";
import bcrypt from "bcryptjs";

const loginSchema = z.object({
    username: z.string({
        invalid_type_error: "Username is not valid"
    }),
    password: z.string({
        invalid_type_error: "Password is not valid"
    }).min(6)
});

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: "openid profile email",
                },
            },
        }),
        Credentials({
            async authorize(credentials){
                console.log(credentials);
                const validatedCredentials = loginSchema.safeParse({
                    username: credentials.username,
                    password: credentials.password
                });
                if(validatedCredentials.success){
                    const { username, password } = validatedCredentials.data;
                    const user = await getUser(username);
                    console.log("posle logina", user);
                    if(!user) return null;
                    const isPassword = await bcrypt.compare(password, user.password);
                    if(isPassword){
                        return {
                            email: user.username
                        };
                    }
                    return null;
                }
                console.log("Invalid credentials");
                return null;
            }
        })
    ],
});