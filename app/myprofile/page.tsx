import { signOut } from "@/auth";

export default function Page(){
    return (
        <button onClick={async () => {
            'use server';
            await signOut({ redirectTo: '/friends' });
          }}>Odjava</button>
    )
}