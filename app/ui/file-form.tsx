'use client';
import { useActionState, useState } from "react";
import { uploadVideo } from "../lib/actions";
import Image from "next/image";
import clsx from "clsx";

export default function FileForm(){

    const openFileDialog = () => {
        if(clickable){
            const fileInput = document.getElementById("file");
            if (fileInput) {
            fileInput.click(); // Otvara file dialog
            }
        }
    };

    const [state, formAction, isPending ] = useActionState(uploadVideo, undefined);
    const [clickable, setClickable] = useState(true);
    const [fileName, setFileName] = useState("No files chosen");

    return (
        <form action={formAction} className={clsx("flex flex-col justify-evenly items-center h-9/10 w-full md:w-93/100", {
            "opacity-50 transition-opacity duration-300 ease-in-out": isPending
        })}>
            <h1 className="text-4xl font-extrabold text-black">Upload a video</h1>
            <div onClick={openFileDialog} className="hover:cursor-pointer hover:bg-sky-100 hover:border-sky-400 transition duration-200 ease-in-out flex flex-col items-center justify-center h-7/10 w-9/10 border-dashed border-2 border-red-500 rounded-lg">
                <Image src="/images/upload-icon.svg" width={72} height={72} alt="upload image" className="mb-5"></Image>
                <input onChange={(e) => {
                    if(e.target.files?.length! > 0){
                        const f = e.target.files![0];
                        if(f){
                            setFileName(f.name);
                        }
                    }       
                }} className="hidden" type="file" name="file" id="file" />
                <label onMouseOver={() => setClickable(false)} onMouseLeave={() => setClickable(true)} htmlFor="file" className="z-1000 hover:cursor-pointer hover:bg-red-600 transition duration-100 bg-red-500 rounded md:w-1/5 w-3/5 p-3 text-center text-white">
                    {
                        fileName != "No files chosen" ? "Video selected" : "Select video"
                    }
                </label>
                <p>{fileName}</p>
                <button onMouseOver={() => setClickable(false)} onMouseLeave={() => setClickable(true)} className="my-5 z-1000 hover:cursor-pointer hover:bg-red-600 transition duration-100 bg-red-500 rounded md:w-1/5 w-3/5 p-3 text-center text-white">Upload a video</button>
                {state && <div>{state}</div>}
            </div>
        </form>
    )
}