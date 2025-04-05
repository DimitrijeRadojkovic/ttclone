import type { Video } from "@/app/lib/definitions";
import { HeartIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function Like({currentVideo, likes}: {
    currentVideo: Video,
    likes: number,
}){
    return (
        <div className="flex flex-col justify-center items-center">
            <div className={clsx("flex justify-center items-center p-3 rounded-full my-1 hover:cursor-pointer hover:bg-gray-900 bg-gray-800 transition duration-200 ease-in-out")}>
                <HeartIcon className="md:w-[30px] w-[20px] text-white"></HeartIcon>   
            </div>
            <p className="text-white">{likes}</p>
        </div>
    )
}