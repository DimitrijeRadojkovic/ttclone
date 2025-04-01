'use client';
import { useActionState, useState } from "react";
import { State } from "@/app/lib/actions";
import { signin } from "@/app/lib/actions";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import clsx from "clsx";

export default function Form(){
    const initialState: State = { message: null, errors: {} };
    const [state, formAction, isPending] = useActionState(signin, initialState);
    const [seen, setSeen] = useState("password");
    return (
        <form action={formAction} className={clsx("flex flex-col justify-start items-center border-2 border-black h-full w-full pt-10 md:pt-15", {
            "opacity-50 transition-opacity duration-300 ease-in-out": isPending
        })}>

            <h1 className="text-4xl font-extrabold text-white">Sign in</h1>

            <div className="flex flex-col md:w-2/5 w-4/5 m-5 ">
                <label htmlFor="username" className="text-white text-lg">Username</label>
                <input type="text" required aria-disabled={isPending} className="text-white md:h-[50px] h-[45px] bg-gray-800 border border-black p-1 placeholder:text-gray-700 focus:caret-red-500 focus:outline-none" placeholder="Username" name="username" />
                
            </div>
            
            <div className="flex flex-row justify-start md:w-2/5 w-4/5">
                {state?.errors?.username && <div className="text-red-500 text-xs">{state.errors.username}</div>}
            </div>

            <div className="flex flex-col md:w-2/5 w-4/5 m-5 relative">
                <label htmlFor="password" className="text-white text-lg">Password</label>
                <input type={seen} aria-disabled={isPending} required className="text-white md:h-[50px] h-[45px] bg-gray-800 border border-black p-1 placeholder:text-gray-700 focus:caret-red-500 focus:outline-none" placeholder="Password" name="password" />
                {
                    seen === "password" ? 
                    <EyeIcon onClick={() => setSeen("text")} className="w-[35px] text-white absolute md:left-93/100 left-87/100 top-47/100 hover:cursor-pointer"></EyeIcon> :
                    <EyeSlashIcon onClick={() => setSeen("password")} className="w-[35px] text-white absolute md:left-93/100 left-87/100 top-47/100 hover:cursor-pointer"></EyeSlashIcon>
                }
               
            </div>

            <div className="flex flex-row justify-start md:w-2/5 w-4/5">
                {state?.errors?.password && <div className="text-red-500 text-xs">{state.errors.password}</div>}
            </div>

            <div className="flex flex-col md:w-2/5 w-4/5 m-5 ">
                <label htmlFor="name" className="text-white text-lg">Name</label>
                <input type="text" aria-disabled={isPending} required className="text-white md:h-[50px] h-[45px] bg-gray-800 border border-black p-1 placeholder:text-gray-700 focus:caret-red-500 focus:outline-none" placeholder="Name" name="name" />
                
            </div>

            <div className="flex flex-row justify-start md:w-2/5 w-4/5">
                {state?.errors?.name && <div className="text-red-500 text-xs">{state.errors.name}</div>}
            </div>

            <button type="submit" className="md:h-[50px] h-[45px] md:w-2/5 w-4/5 m-5 bg-red-500 rounded p-2 text-white hover:cursor-pointer" aria-disabled={isPending}>Submit</button>
            {state?.message && <div className="text-red-500 text-xs">{state.message}</div>}

            <div className="flex md:mt-5">
                <p className="mx-3 text-white">Already have an account?</p>
                <Link href='/login' className="text-red-500">Login</Link>
            </div>

        </form>
    )
}