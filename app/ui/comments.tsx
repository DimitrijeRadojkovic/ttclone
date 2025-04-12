'use client';
import CommentBox from "./video icons/comment-box";
import CommentIcon from "./video icons/comment-icon";
import { useState } from "react";
import type { Video } from "../lib/definitions";

export default function Comments({ currentVideo, number }: {
    currentVideo: Video,
    number: number,
}){
    const [clicked, setClicked] = useState(false);

    return (
        <>
            <div onClick={() => setClicked(!clicked)}>
                <CommentIcon currentVideo={currentVideo} number={number}></CommentIcon>
            </div>
            {
                clicked ? <CommentBox clicked={clicked} currentVideo={currentVideo} setClicked={setClicked}></CommentBox> : null
            }
        </>
    )
}