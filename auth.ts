import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: "openid profile email", // Ispravno razdvojeni scopes
                },
            },
        })
    ],
});