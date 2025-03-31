'use client';
import { useActionState } from "react";
import { uploadVideo } from "../lib/actions";

export default function FileForm(){
    const [state, formAction, isPending ] = useActionState(uploadVideo, undefined);
    return (
        <form action={formAction}>
            <input type="file" name="file" />
            <button>Upload a video</button>
            {state && <div>{state}</div>}
        </form>
    )
}