'use client';
import { notFound } from "next/navigation";
import { Video } from "../lib/definitions";
import { useState, useEffect } from "react";
import { PauseCircleIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function VideoPage({video}: {
    video: Video | null
}){
    const [percent, setPercent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    
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
            }} onClick={(e) => {
                setIsClicked(true);
                let v = e.currentTarget as HTMLVideoElement;
                if(isPaused){
                    v.play();
                }
                else{
                    v.pause();
                }
                setIsPaused(!isPaused);
            }} key={video.id} id="video" src={video.path} loop className="h-full w-full object-cover object-center md:rounded-3xl" autoPlay>
                
            </video>

            <PauseCircleIcon className={clsx("absolute top-1/2 left-45/100 text-white w-[60px] opacity-50", {
                "animate-popInOut": isPaused,
                "hidden": !isPaused,
            })} onAnimationEnd={(e) => e.currentTarget.classList.add("hidden")}></PauseCircleIcon>

            <PlayCircleIcon className={clsx("invisible absolute top-1/2 left-45/100 text-white w-[60px] opacity-50", {
                "animate-popInOut": !isPaused && isClicked,
            })} onAnimationStart={(e) => e.currentTarget.classList.remove("invisible")} onAnimationEnd={(e) => e.currentTarget.classList.add("invisible")}></PlayCircleIcon>
            
            <div className="absolute bottom-[1px] md:bottom-0 left-0 right-0 md:p-2 md:mx-4">
                <div className="absolute top-0 left-0 w-full md:h-[2px] h-[1px] bg-gray-500 rounded-3xl"></div>
                <div className="absolute top-0 left-0 md:h-[2px] h-[1px] bg-white rounded-3xl transition-all" style={{width: `${percent}%`}}></div>
            </div>
        </div>
    )
}