import type { Video } from "../lib/definitions";
import Like from "./video icons/likes";
import ProfileImage from "./video icons/profile-image";
import Comments from "./comments";
import Favorite from "./video icons/favorites";
import { getAuthor, getCurrentUser, getFavorites, getLikes, getNumberOfComments } from "../lib/fetch";

export default async function IconsWrapper({currentVideo}: {
    currentVideo: Video,
}){
    const data = await Promise.all([
        getLikes(currentVideo),
        getAuthor(currentVideo),
        getNumberOfComments(currentVideo.id),
        getFavorites(currentVideo),
    ]);
    console.log("data", data);

    return (
        <div className="absolute flex flex-col justify-end md:items-start items-end md:left-65/100 right-0 md:right-auto h-full md:w-3/10">
            <ProfileImage user={data[1]!} />
            <Like currentVideo={currentVideo} likes={data[0].likes} liked={data[0].liked}></Like>
            <Comments currentVideo={currentVideo} number={data[2]}></Comments>
            <Favorite currentVideo={currentVideo} favorites={data[3].favorites} favorited={data[3].favorited} ></Favorite>
        </div>
    )
}