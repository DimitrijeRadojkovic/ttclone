import { signOut } from "@/auth";
import ProfileInfo from "../ui/profile/profile-info";
import { getCurrentUser } from "../lib/fetch";
export default async function Page(){
    const user = await getCurrentUser();
    return (
        /*<button onClick={async () => {
            'use server';
            await signOut({ redirectTo: '/friends' });
          }}>Odjava</button>*/
        
        <div className="w-full md:h-full h-[90%] bg-black flex flex-col items-center">
            <ProfileInfo username={user?.username!} name={user?.name!} profile_image={user?.profile_image!}></ProfileInfo>
        </div>
    )
}