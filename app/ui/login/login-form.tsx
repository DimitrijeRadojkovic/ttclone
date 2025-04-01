'use client';
import { useActionState, useState } from "react";
import { authenticate } from "@/app/lib/actions";
import Link from "next/link";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Form(){
    const [state, formAction, isPending] = useActionState(authenticate, undefined);
    const [seen, setSeen] = useState("password");
    return (
            <form action={formAction} className="flex flex-col justify-center items-center border-2 border-black h-full w-full">
                <h1 className="text-4xl font-extrabold text-white">Login</h1>
                <div className="flex flex-col md:w-2/5 w-4/5 m-5 ">
                    <label htmlFor="username" className="text-white text-lg">Username</label>
                    <input type="text" required className="text-white h-[50px] bg-gray-800 border border-black p-1 placeholder:text-gray-700" placeholder="Username" name="username" />
                </div>
                
                <div className="flex flex-col md:w-2/5 w-4/5 m-5 relative">
                    <label htmlFor="password" className="text-white text-lg">Password</label>
                    <input type={seen} required className="text-white h-[50px] bg-gray-800 border border-black p-1 placeholder:text-gray-700" placeholder="Password" name="password" />
                    {
                        seen === "password" ? 
                        <EyeIcon onClick={() => setSeen("text")} className="w-[35px] text-white absolute md:left-93/100 left-87/100 top-47/100 hover:cursor-pointer"></EyeIcon> :
                        <EyeSlashIcon onClick={() => setSeen("password")} className="w-[35px] text-white absolute md:left-93/100 left-87/100 top-47/100 hover:cursor-pointer"></EyeSlashIcon>
                    }
                </div>

                <button type="submit" className="h-[50px] md:w-2/5 w-4/5 m-5 bg-red-500 rounded p-2 text-white hover:cursor-pointer" aria-disabled={isPending}>Submit</button>
                {state && <div className="text-red-500">{state}</div>}
                <div className="flex mt-5">
                    <p className="mx-3 text-white">Don't have an account?</p>
                    <Link href='/signin' className="text-red-500">Sign Up</Link>
                </div>
            </form>
    )
}