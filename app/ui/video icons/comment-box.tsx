'use client';
import { useEffect, useState } from "react";
import { getComments } from "@/app/lib/fetch";
import { Video, Comment } from "@/app/lib/definitions";
import CommentBoxSkeleton from "../skeletons/comment-box-skeleton";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function CommentBox({ clicked, currentVideo, setClicked }: {
    clicked: boolean,
    currentVideo: Video,
    setClicked: Function
}){
    const [comments, setComments] = useState<Comment[] | undefined>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(clicked){
            setLoading(true);
            getComments(currentVideo.id).then((comments) => {
                setComments(comments);
            }).catch((err) => console.log("error u comment boxu", err))
            .finally(() => setLoading(false));
        }
    }, [clicked]);
    
    return (
        <div className="absolute md:h-full h-1/2 md:left-2/10 w-screen md:w-7/10 md:p-4 transition-all ease-in-out duration-300">
            <div className="h-full bg-white p-4 md:rounded-3xl overflow-y-scroll">
                <div className="flex md:justify-center justify-between items-center">
                    <div className=""></div>
                    <h2 className="text-black">Comments</h2>
                    <div className="flex md:hidden justify-end items-center" onClick={() => setClicked(false)}>
                        <XMarkIcon className="text-black w-[15px]"></XMarkIcon>
                    </div>
                </div>
                
                {
                    loading ? (
                        <CommentBoxSkeleton />
                    ) :
                    (comments?.map((comment) => 
                        <p key={comment.created_at}>{comment.text}</p>
                    ))
                }
            </div>
        </div>
    )   
}