'use client';
import { useActionState } from "react";
import { State } from "@/app/lib/actions";
import { signin } from "@/app/lib/actions";

export default function Form(){
    const initialState: State = { message: null, errors: {} };
    const [state, formAction, isPending] = useActionState(signin, initialState);
    return (
        <form action={formAction} className="flex flex-col justify-evenly items-center border-2 border-black h-80 p-10">
            <p>Sign in</p>
            <input type="text" required className="rounded border border-black p-1" placeholder="Username" name="username" />
            {state?.errors?.username && <div className="text-red-500">{state.errors.username}</div>}
            <input type="password" required className="rounded border border-black p-1" placeholder="Password" name="password" />
            {state?.errors?.password && <div className="text-red-500">{state.errors.password}</div>}
            <input type="text" required className="rounded border border-black p-1" placeholder="Name" name="name" />
            {state?.errors?.name && <div className="text-red-500">{state.errors.name}</div>}
            <button type="submit" className="bg-sky-500 rounded p-2 text-white hover:cursor-pointer" aria-disabled={isPending}>Submit</button>
            {state?.message && <div className="text-red-500">{state.message}</div>}
        </form>
    )
}