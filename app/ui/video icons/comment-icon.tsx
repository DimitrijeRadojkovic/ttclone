'use client';
import { Suspense, useState } from "react";
import clsx from "clsx";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/solid";
import { Video } from "@/app/lib/definitions";
import CommentBox from "./comment-box";
import CommentBoxSkeleton from "../skeletons/comment-box-skeleton";

export default function CommentIcon({ number, currentVideo }: {
    number: number,
    currentVideo: Video
}){

    return (
        <div className="flex flex-col justify-center items-center md:my-2">
            <div className={clsx("flex justify-center items-center p-3 rounded-full my-1 hover:cursor-pointer hover:bg-gray-900 bg-gray-800 transition duration-200 ease-in-out")}>
                <ChatBubbleLeftIcon className="md:w-[30px] w-[20px] text-white"></ChatBubbleLeftIcon>   
            </div>
            <p className="text-white">{number}</p>
        </div>
    )
}