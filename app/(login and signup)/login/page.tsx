'use client';
import { useActionState } from "react"
import { authorize } from "@/app/lib/actions";
import Link from "next/link";
export default function Login(){
    const [state, formAction, isPending] = useActionState(authorize, undefined);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <form action={formAction}>
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                
                <button aria-disabled={isPending} type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"  >Log in</button>
            </form>
            <div className="flex mt-5">
                <p className="mx-3">Don't have an account?</p>
                <Link href='/signin' className="text-sky-700">Sign Up</Link>
            </div>
        </div>
    )
}