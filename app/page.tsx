import VideoPage from "./ui/video";
import { getVideos } from "./lib/fetch";
import { Video } from "./lib/definitions";

export default async function Home(props: {
  searchParams? : Promise<{
    watch?: string
  }>
}) {
  const videos = await getVideos(0);
  const searchParams = await props?.searchParams;
  const id = searchParams?.watch || videos[0]?.id || null;

  return (
    <div className="md:h-full h-[90%] w-full flex justify-center items-center bg-black">
      {
        videos.length > 0 ? (videos.some((v) => v.id === id) ? videos.map((v) => {
          if(v.id === id){
            return <VideoPage key={v.id} video={v} />
          }
        }) : <VideoPage key={id} video={null} />) : <div className="h-full w-full text-5xl text-white flex justify-center items-center">No videos :(</div>
      }
    </div>
  );
}
