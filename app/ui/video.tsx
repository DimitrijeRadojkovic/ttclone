'use client';
import { notFound } from "next/navigation";
import { Video } from "../lib/definitions";
import { useState } from "react";
import clsx from "clsx";

export default function VideoPage({video}: {
    video: Video | null
}){
    const [percent, setPercent] = useState(0);
    if(!video){
        notFound();
    }
    return (
        <div className="relative h-full md:w-3/10 w-full md:p-4 md:rounded-3xl">
            <video onTimeUpdate={(e) => {
                let v = e.currentTarget as HTMLVideoElement;
                let currentTime = v.currentTime;
                let duration = v.duration;
                let p = ( 100 * currentTime ) / duration;
                setPercent(p);
            }} key={video.id} id="video" src={video.path} loop muted className="h-full w-full object-cover object-center md:rounded-3xl" autoPlay>
                
            </video>
            <div className="absolute bottom-[1px] md:bottom-0 left-0 right-0 md:p-2 md:mx-4">
                <div className="absolute top-0 left-0 w-full md:h-[2px] h-[1px] bg-gray-500 rounded-3xl"></div>
                <div className="absolute top-0 left-0 md:h-[2px] h-[1px] bg-white rounded-3xl transition-all" style={{width: `${percent}%`}}></div>
            </div>
        </div>
    )
}