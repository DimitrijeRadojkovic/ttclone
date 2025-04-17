'use client';
import { useEffect, useState, useActionState } from "react";
import { getComments } from "@/app/lib/fetch";
import { Video, Comment, FormatedComment, User } from "@/app/lib/definitions";
import CommentBoxSkeleton from "../skeletons/comment-box-skeleton";
import { XMarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { comment } from "@/app/lib/actions";
import clsx from "clsx";
import { usePathname, useSearchParams } from "next/navigation";

export default function CommentBox({ clicked, currentVideo, setClicked, user, number, setNumber }: {
    clicked: boolean,
    currentVideo: Video,
    setClicked: Function,
    user: User,
    number: number,
    setNumber: Function,
}){
    const [comments, setComments] = useState<FormatedComment[] | undefined>();
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [commentText, setCommentText] = useState<string>();
    const [state, formAction] = useActionState(comment, undefined);
    const [openReplies, setOpenReplies] = useState(new Set());
    const [openReplyForm, setOpenReplyForm] = useState(new Set());
    const [repliedTo, setRepliedTo] = useState<string | undefined>(undefined);
    const [repliedToRoot, setRepliedToRoot] = useState<string | undefined>(undefined);

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const url = `${pathname}?${searchParams.toString()}`;

    const toggleReplies = (commentId: string) => {
        setOpenReplies((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(commentId)) {
                newSet.delete(commentId);
            } else {
                newSet.add(commentId);
            }
            return newSet;
        });
    };

    const toggleRepliesForm = (commentId: string) => {
        setOpenReplyForm((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(commentId)) {
                newSet.delete(commentId);
            } else {
                newSet.add(commentId);
            }
            return newSet;
        });
    };

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
                        (
                            comments?.map((comment) =>
                            
                                comment.replied_to === null ?
                                <div className="flex flex-col">
                                    <div className="flex items-start my-2" key={comment.name + comment.created_at}>

                                        <div className="flex justify-center items-start w-[30px] md:w-[35px] mx-1 hover:cursor-pointer">
                                            <Image className="w-full h-full" src={comment.profile_image} width={30} height={30} alt="profile_img"></Image>
                                        </div>

                                        <div className="flex flex-col">
                                            <p className="hover:cursor-pointer hover:underline">{comment.name}</p>
                                            <p className="opacity-75" key={comment.created_at}>{comment.text}</p>
                                            <p className="opacity-25">{new Date(comment.created_at).toLocaleDateString()}</p>
                                            <div className="flex">
                                                {
                                                    comments.some((c) => c.replied_to_root === comment.comment_id) ? <p onClick={() => toggleReplies(comment.comment_id)} className="hover:cursor-pointer hover:underline mr-2">{openReplies.has(comment.comment_id) ? 'Hide replies' : 'View replies'}</p> : null
                                                }
                                                <p onClick={() => {
                                                    setRepliedTo(comment.comment_id);
                                                    setRepliedToRoot(comment.comment_id);
                                                    toggleRepliesForm(comment.comment_id);
                                                }} className="hover:cursor-pointer hover:underline">Reply</p>
                                            </div>
                                            {openReplyForm.has(comment.comment_id) ? <form action={formAction} className="">
                                                <div className="flex items-center">
                                                    <input onChange={(e) => {
                                                        const text = e.target.value;
                                                        setCommentText(text);
                                                        if(text.length >=1 && /[a-zA-Z0-9]/.test(text)){
                                                            setDisabled(false);
                                                        }
                                                        else{
                                                            setDisabled(true);
                                                        }
                                                    }} type="text" placeholder="Add a reply" name="comment" className="w-full rounded-4xl p-2 h-[50px] border border-solid border-gray-500" />
                                                    <input type="hidden" name="video_id" value={currentVideo.id} />
                                                    <input type="hidden" name="replied_to" value={repliedTo} />
                                                    <input type="hidden" name="replied_to_root" value={repliedToRoot} />
                                                    <input type="hidden" name="url" value={url} />
                                                    <button className="flex justify-center items-center bg-red-500 hover:cursor-pointer h-full rounded-full p-2 disabled:opacity-50 disabled:cursor-default" disabled={disabled}>
                                                        <PaperAirplaneIcon className="text-white w-[30px]"></PaperAirplaneIcon>
                                                    </button>
                                                </div>
                                            </form> : null}
                                        </div>
                                        
                                    </div>
                                    <div className={clsx({
                                        "hidden": !openReplies.has(comment.comment_id),
                                        "flex flex-col justify-center items-center":  openReplies.has(comment.comment_id)
                                    })}>
                                        {
                                            comments?.map((c) =>
                                
                                                c.replied_to_root === comment.comment_id ?
                                                <div className="flex flex-col w-1/2">
                                                    <div className="flex items-start my-2" key={c.name + c.created_at}>
                
                                                        <div className="flex justify-center items-start w-[30px] md:w-[35px] mx-1 hover:cursor-pointer">
                                                            <Image className="w-full h-full" src={c.profile_image} width={30} height={30} alt="profile_img"></Image>
                                                        </div>
                
                                                        <div className="flex flex-col">
                                                            <p><span className="hover:cursor-pointer hover:underline">{c.name}</span>{' > '}<span className="hover:cursor-pointer hover:underline">{comment.name}</span></p>
                                                            <p className="opacity-75" key={c.created_at}>{c.text}</p>
                                                            <p className="opacity-25">{new Date(c.created_at).toLocaleDateString()}</p>
                                                            <div className="flex">
                                                                <p onClick={() => {
                                                                    setRepliedTo(c.comment_id);
                                                                    setRepliedToRoot(comment.comment_id);
                                                                    toggleRepliesForm(c.comment_id);
                                                                }} className="hover:cursor-pointer hover:underline">Reply</p>
                                                            </div>
                                                            {openReplyForm.has(c.comment_id) ? <form action={formAction} className="w-full">
                                                                <div className="flex items-center">
                                                                    <input onChange={(e) => {
                                                                        const text = e.target.value;
                                                                        setCommentText(text);
                                                                        if(text.length >=1 && /[a-zA-Z0-9]/.test(text)){
                                                                            setDisabled(false);
                                                                        }
                                                                        else{
                                                                            setDisabled(true);
                                                                        }
                                                                    }} type="text" placeholder="Add a reply..." name="comment" className="w-full rounded-4xl p-2 h-[50px] border border-solid border-gray-500" />
                                                                    <input type="hidden" name="video_id" value={currentVideo.id} />
                                                                    <input type="hidden" name="replied_to" value={repliedTo} />
                                                                    <input type="hidden" name="replied_to_root" value={repliedToRoot} />
                                                                    <input type="hidden" name="url" value={url} />
                                                                    <button className="flex justify-center items-center bg-red-500 hover:cursor-pointer h-full rounded-full p-2 disabled:opacity-50 disabled:cursor-default" disabled={disabled}>
                                                                        <PaperAirplaneIcon className="text-white w-[30px]"></PaperAirplaneIcon>
                                                                    </button>
                                                                </div>
                                                            </form> : null}
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                                : null
                                            
                                            )
                                        }
                                    </div>
                                </div>
                                : null
                            
                            )
                        )
                        
                    }
                    
                </div>
                <form action={formAction} className="">
                    <div className="flex items-center">
                        <input onChange={(e) => {
                            const text = e.target.value;
                            setCommentText(text);
                            if(text.length >=1 && /[a-zA-Z0-9]/.test(text)){
                                setDisabled(false);
                            }
                            else{
                                setDisabled(true);
                            }
                        }} type="text" placeholder="Add a comment..." name="comment" className="w-full rounded-4xl p-2 h-[50px] border border-solid border-gray-500" />
                        <input type="hidden" name="video_id" value={currentVideo.id} />
                        <input type="hidden" name="replied_to" value={undefined} />
                        <input type="hidden" name="replied_to_root" value={undefined} />
                        <input type="hidden" name="url" value={url} />
                        <button className="flex justify-center items-center bg-red-500 hover:cursor-pointer h-full rounded-full p-2 disabled:opacity-50 disabled:cursor-default" disabled={disabled}>
                            <PaperAirplaneIcon className="text-white w-[30px]"></PaperAirplaneIcon>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )   
}