'use client';
import { useEffect, useState } from "react";
import { getComments } from "@/app/lib/fetch";
import { Video, Comment } from "@/app/lib/definitions";
import CommentBoxSkeleton from "../skeletons/comment-box-skeleton";

export default function CommentBox({ clicked, currentVideo }: {
    clicked: boolean,
    currentVideo: Video
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
        <div className="absolute h-screen left-full -top-[230px] w-[100px] bg-white">
            {
                loading ? (
                    <CommentBoxSkeleton />
                ) :
                (comments?.map((comment) => 
                    <p key={comment.created_at}>{comment.text}</p>
                ))
            }
        </div>
    )   
}