'use client';
import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions";
import Link from "next/link";
import clsx from "clsx";

export default function Form(){
    const [state, formAction, isPending] = useActionState(authenticate, undefined);
    return (
        <>
            <div className={clsx("h-100 w-100 absolute m-0", {
                "bg-gray-400 bg-opacity-20": isPending
            })}></div>
            <form action={formAction} className={clsx("z-1000 flex flex-col justify-evenly items-center border-2 border-black h-80 p-10")}>
                <p>Login</p>
                <input type="text" required className="rounded border border-black p-1" placeholder="Username" name="username" />
                
                <input type="password" required className="rounded border border-black p-1" placeholder="Password" name="password" />
                
                <button type="submit" className="bg-sky-500 rounded p-2 text-white hover:cursor-pointer" aria-disabled={isPending}>Submit</button>
                {state && <div className="text-red-500">{state}</div>}
                <div className="flex mt-5">
                    <p className="mx-3">Don't have an account?</p>
                    <Link href='/signin' className="text-sky-700">Sign Up</Link>
                </div>
            </form>
        </>
    )
}