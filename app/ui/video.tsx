import { getVideos } from "../lib/fetch";

export default async function Video(){
    const videos = await getVideos();
    console.log(videos);
    return (
        <>
            {videos.map((v) => 
                <video src={v.path} loop width={500} height={500} autoPlay>

                </video>
            )}
            <p>videi</p>
        </>
    )
}