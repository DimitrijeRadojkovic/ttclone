import type { Video } from "../lib/definitions";
import Like from "./video icons/likes";
import ProfileImage from "./video icons/profile-image";
import CommentIcon from "./video icons/comment-icon";
import { getAuthor, getCurrentUser, getLikes, getNumberOfComments } from "../lib/fetch";

export default async function IconsWrapper({currentVideo}: {
    currentVideo: Video,
}){
    const data = await Promise.all([
        getLikes(currentVideo),
        getAuthor(currentVideo),
        getNumberOfComments(currentVideo.id),
    ]);
    console.log("data", data);

    return (
        <div className="absolute flex flex-col justify-evenly items-center md:left-65/100 left-85/100">
            <ProfileImage user={data[1]!} />
            <Like currentVideo={currentVideo} likes={data[0].likes} liked={data[0].liked}></Like>
            <CommentIcon number={data[2]} currentVideo={currentVideo} ></CommentIcon>
        </div>
    )
}