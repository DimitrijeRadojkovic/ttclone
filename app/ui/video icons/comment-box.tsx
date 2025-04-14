'use client';
import { useEffect, useState } from "react";
import { getComments } from "@/app/lib/fetch";
import { Video, Comment, FormatedComment } from "@/app/lib/definitions";
import CommentBoxSkeleton from "../skeletons/comment-box-skeleton";
import { XMarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export default function CommentBox({ clicked, currentVideo, setClicked }: {
    clicked: boolean,
    currentVideo: Video,
    setClicked: Function
}){
    const [comments, setComments] = useState<FormatedComment[] | undefined>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(clicked){
            setLoading(true);
            getComments(currentVideo.id).then((comments) => {
                setComments(comments);
                console.log("komentari", comments);
            }).catch((err) => console.log("error u comment boxu", err))
            .finally(() => setLoading(false));
        }
    }, [clicked]);
    
    return (
        <div className="absolute  md:h-full h-1/2 md:left-2/10 w-screen md:w-7/10 md:p-4 transition-all ease-in-out duration-300">
            <div className="h-full flex flex-col bg-white p-4 md:rounded-3xl">
                <div className="grow-8 overflow-y-scroll no-scrollbar">
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
                            <div className="flex items-start my-2" key={comment.name}>
                                <div className="flex justify-center items-start w-[30px] md:w-[35px] mx-1">
                                    <Image className="w-full h-full" src={comment.profile_image} width={30} height={30} alt="profile_img"></Image>
                                </div>
                                <div className="flex flex-col">
                                    <p>{comment.name}</p>
                                    <p className="opacity-75" key={comment.created_at}>{comment.text}</p>
                                    <p className="opacity-25">{new Date(comment.created_at).toLocaleDateString()}</p>
                                </div>
                            </div> 
                            
                        ))
                        
                    }
                    
                </div>
                <form action="" className="">
                    <div className="flex items-center">
                        <input type="text" name="comment" className="w-full rounded-4xl p-2 h-[50px] border border-solid border-gray-500" />
                        <button className="flex justify-center items-center bg-red-500 hover:cursor-pointer h-full rounded-full p-2">
                            <PaperAirplaneIcon className="text-white w-[30px]"></PaperAirplaneIcon>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )   
}