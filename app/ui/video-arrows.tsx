'use client';
import type { Video } from "../lib/definitions";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function Arrows({ currentVideo, videos } : { currentVideo: Video, videos: Video[] }){
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const goNext = () => {
        if(videos.indexOf(currentVideo) !== videos.length - 1){
            const nextId = videos[videos.indexOf(currentVideo) + 1].id;
            const url = new URLSearchParams(searchParams);
            url.set("watch", nextId);
            replace(`${pathname}?${url.toString()}`);
        }
    }

    const goPrevious = () => {
        if(videos.indexOf(currentVideo) !== 0){
            const previousId = videos[videos.indexOf(currentVideo) - 1].id;
            const url = new URLSearchParams(searchParams);
            url.set("watch", previousId);
            replace(`${pathname}?${url.toString()}`);
        }
    }

    return (
        <div className={clsx("absolute w-full hidden md:w-[54px] h-full md:block flex flex-col justify-between items-center mr-5 right-0 md:h-[100px] ", {
             
        })}>

            <div onClick={goPrevious} className={clsx("hidden md:flex justify-center items-center p-3 rounded-full my-2", {
                "hover:cursor-pointer hover:bg-gray-700 bg-gray-800": videos.indexOf(currentVideo) !== 0,
                "bg-gray-900 opacity-50 hover:cursor-not-allowed": videos.indexOf(currentVideo) === 0
            })}>
                <ChevronUpIcon className="w-[30px] text-white"></ChevronUpIcon>
            </div>
            
            <div onClick={goNext} className={clsx("hidden md:flex justify-center items-center p-3 rounded-full my-2", {
                "hover:cursor-pointer hover:bg-gray-700 bg-gray-800": videos.indexOf(currentVideo) !== videos.length - 1,
                "bg-gray-900 opacity-50 hover:cursor-not-allowed": videos.indexOf(currentVideo) === videos.length - 1
            })}>
                <ChevronDownIcon className="w-[30px] text-white"></ChevronDownIcon>
            </div>

        </div>
    )

}