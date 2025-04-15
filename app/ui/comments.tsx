'use client';
import CommentBox from "./video icons/comment-box";
import CommentIcon from "./video icons/comment-icon";
import { useState } from "react";
import type { Video, User } from "../lib/definitions";

export default function Comments({ currentVideo, number, user }: {
    currentVideo: Video,
    number: number,
    user: User,
}){
    const [clicked, setClicked] = useState(false);
    const [numberState, setNumberState] = useState(number);

    return (
        <>
            <div onClick={() => setClicked(!clicked)}>
                <CommentIcon currentVideo={currentVideo} number={numberState}></CommentIcon>
            </div>
            {
                clicked ? <CommentBox number={numberState} setNumber={setNumberState} user={user} clicked={clicked} currentVideo={currentVideo} setClicked={setClicked}></CommentBox> : null
            }
        </>
    )
}