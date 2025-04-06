'use client';
import type { Video } from "@/app/lib/definitions";
import { HeartIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { like } from "@/app/lib/actions";
import { usePathname, useSearchParams } from "next/navigation";

export default function Like({currentVideo, likes, liked}: {
    currentVideo: Video,
    likes: number,
    liked: boolean,
}){
    console.log("number liked", Number(liked));
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const url = `${pathname}?${params.toString()}`;
    return (
        <div className="flex flex-col justify-center items-center">
            <div className={clsx("flex justify-center items-center p-3 rounded-full my-1 hover:cursor-pointer hover:bg-gray-900 bg-gray-800 transition duration-200 ease-in-out")}>
                <form action={like} className="md:h-[30px] h-[20px] ">
                    <input type="hidden" value={Number(liked)} name="liked" />
                    <input type="hidden" value={currentVideo.id} name="video_id" />
                    <input type="hidden" value={url} name="url" />
                    <button className="bg-transparent p-0 border-none hover:cursor-pointer">
                        <HeartIcon className={clsx("md:w-[30px] w-[20px]", {
                            "text-white": !liked,
                            "text-red-500": liked,
                        })}></HeartIcon>   
                    </button>
                </form>
            </div>
            <p className="text-white">{likes}</p>
        </div>
    )
}