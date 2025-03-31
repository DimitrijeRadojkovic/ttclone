import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login'
    },
    callbacks: {
        authorized({ auth,  request: { nextUrl }}){
            console.log("middleware", auth?.user);
            const LoggedIn = !!auth?.user;
            if(nextUrl.pathname === "/signin"){
                return true;
            }
            else{
                if(!LoggedIn) return false;
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
              token.email = user.email;
            }
            return token;
          },
          async session({ session, token }) {
            session.user = {
                id: "123", 
                email: token.email!,
                emailVerified: new Date(),
            };
            return session;
          },
    },
    providers : []
} satisfies NextAuthConfig;