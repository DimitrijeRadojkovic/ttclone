import type { Video } from "../lib/definitions";
import Like from "./video icons/likes";
import ProfileImage from "./video icons/profile-image";
import { getAuthor, getCurrentUser, getLikes } from "../lib/fetch";

export default async function IconsWrapper({currentVideo}: {
    currentVideo: Video,
}){
    const data = await Promise.all([
        getLikes(currentVideo),
        getAuthor(currentVideo),
    ]);
    console.log("data", data);

    return (
        <div className="absolute flex flex-col justify-evenly items-center md:left-65/100 left-85/100">
            <ProfileImage user={data[1]!} />
            <Like currentVideo={currentVideo} likes={data[0].likes} liked={data[0].liked}></Like>
        </div>
    )
}