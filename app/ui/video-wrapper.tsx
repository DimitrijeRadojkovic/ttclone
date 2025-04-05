import type { Video } from "../lib/definitions";
import Like from "./video icons/likes";
import { getLikes } from "../lib/fetch";

export default async function IconsWrapper({currentVideo}: {
    currentVideo: Video,
}){
    const data = await Promise.all([
        getLikes(currentVideo),
    ]);

    return (
        <div className="absolute flex flex-col justify-evenly items-center md:left-65/100 left-85/100">
            <Like currentVideo={currentVideo} likes={data[0]}></Like>
        </div>
    )
}