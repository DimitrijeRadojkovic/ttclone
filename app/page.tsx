import VideoPage from "./ui/video";
import { getVideos } from "./lib/fetch";
import Arrows from "./ui/video-arrows";
import { Video } from "./lib/definitions";
import IconsWrapper from "./ui/video-wrapper";

export default async function Home(props: {
  searchParams? : Promise<{
    watch?: string
  }>
}) {
  const videos = await getVideos(0);
  const searchParams = await props?.searchParams;
  const id = searchParams?.watch || videos[0]?.id || null;

  return (
    <div className="relative md:h-full h-[90%] w-full flex justify-center items-center bg-black">
      {
        videos.length > 0 ? (videos.some((v) => v.id === id) ? videos.map((v) => {
          if(v.id === id){
            return (<><VideoPage key={v.id} currentVideo={v} videos={videos} /><Arrows key={v.id + v.date} currentVideo={v} videos={videos}></Arrows><IconsWrapper key={v.id + Date.now().toLocaleString()} currentVideo={v} /></>)
          }
        }) : <VideoPage key={id} currentVideo={null} videos={videos} />) : <div className="h-full w-full text-5xl text-white flex justify-center items-center">No videos :(</div>
      }
    </div>
  );
}
