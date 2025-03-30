import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login'
    },
    callbacks: {
        authorized({ auth,  request: { nextUrl }}){
            console.log("middleware",nextUrl.pathname);
            const LoggedIn = !!auth?.user;
            if(nextUrl.pathname === "/signin"){
                return true;
            }
            else{
                if(!LoggedIn) return false;
            }
            return true;
        }
    },
    providers : []
} satisfies NextAuthConfig;