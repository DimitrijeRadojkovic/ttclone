import { signOut } from "@/auth";

export default function Home() {
  return (
    <>
      <p>bice ovde nesto ako bog da</p>
      <button onClick={async () => {
        'use server';
        await signOut({ redirectTo: '/friends' });
      }}>Odjava</button>
    </>
  );
}
