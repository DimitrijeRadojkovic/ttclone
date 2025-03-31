import { signOut } from "@/auth";
import Video from "./ui/video";

export default function Home() {
  return (
    <>
      <p>bice ovde nesto ako bog da</p>
      <button onClick={async () => {
        'use server';
        await signOut({ redirectTo: '/friends' });
      }}>Odjava</button>
      <Video />
    </>
  );
}
