'use client';
import type { Video } from "@/app/lib/definitions";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { favorite } from "@/app/lib/actions";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Favorite({currentVideo, favorites, favorited}: {
    currentVideo: Video,
    favorites: number,
    favorited: boolean,
}){
    console.log("number favorited", Number(favorited));
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const url = `${pathname}?${params.toString()}`;
    const [favoritesVideo, setFavoritesVideo] = useState(favorites);
    const [favoritedVideo, setFavoritedVideo] = useState(favorited);
    return (
        <div className="flex flex-col justify-center items-center">
            <div className={clsx("flex justify-center items-center p-3 rounded-full my-1 hover:cursor-pointer hover:bg-gray-900 bg-gray-800 transition duration-200 ease-in-out")}>
                <form onSubmit={() => {
                    if(favoritedVideo){
                        setFavoritesVideo(favoritesVideo - 1);
                    }
                    else{
                        setFavoritesVideo(favoritesVideo + 1);
                    }
                    setFavoritedVideo(!favoritedVideo);
                }} action={favorite} className="md:h-[30px] h-[20px] ">
                    <input type="hidden" value={Number(favoritedVideo)} name="favorited" />
                    <input type="hidden" value={currentVideo.id} name="video_id" />
                    <input type="hidden" value={url} name="url" />
                    <button className="bg-transparent p-0 border-none hover:cursor-pointer">
                        <BookmarkIcon className={clsx("md:w-[30px] w-[20px]", {
                            "text-white": !favoritedVideo,
                            "text-yellow-500": favoritedVideo,
                        })}></BookmarkIcon>   
                    </button>
                </form>
            </div>
            <p className="text-white">{favoritesVideo}</p>
        </div>
    )
}