'use client';
import { notFound } from "next/navigation";
import { Video } from "../lib/definitions";
import { useState, useEffect } from "react";
import { PauseCircleIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function VideoPage({currentVideo, videos}: {
    currentVideo: Video | null,
    videos: Video[],
}){
    const [percent, setPercent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [hasMoved, setHasMoved] = useState(false);

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const goNext = () => {
        if(videos.indexOf(currentVideo!) !== videos.length - 1){
            const nextId = videos[videos.indexOf(currentVideo!) + 1].id;
            const url = new URLSearchParams(searchParams);
            url.set("watch", nextId);
            replace(`${pathname}?${url.toString()}`);
        }
    }

    const goPrevious = () => {
        if(videos.indexOf(currentVideo!) !== 0){
            const previousId = videos[videos.indexOf(currentVideo!) - 1].id;
            const url = new URLSearchParams(searchParams);
            url.set("watch", previousId);
            replace(`${pathname}?${url.toString()}`);
        }
    }
    
    if(!currentVideo){
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
                console.log("touchstart", touchStart);
                console.log("touchend", touchEnd);
                let v = e.currentTarget as HTMLVideoElement;
                if(isPaused){
                    v.play();
                }
                else{
                    v.pause();
                }
                setIsPaused(!isPaused);
            }}
            onTouchStart={(e) => {
                console.log("Pokret pokrenut");
                setTouchStart(e.touches[0].clientY);
                setHasMoved(false);
            }}
            onTouchMove={(e) => {
                setTouchEnd(e.touches[0].clientY);
                setHasMoved(true);
            }}
            onTouchEnd={() => {
                if(hasMoved){
                    console.log("Pokret zavrsen");
                    if(touchStart - touchEnd > 150){
                        console.log("idi sledeci");
                        goNext();
                    }
                    if(touchEnd - touchStart > 150){
                    
                        console.log("idi prethodni");
                        goPrevious();
                    }
                }
            }} 
            key={currentVideo.id} id="video" src={currentVideo.path} loop className="h-full w-full object-cover object-center md:rounded-3xl" autoPlay>
                
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