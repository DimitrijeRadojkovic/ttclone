import type { User } from "@/app/lib/definitions";
import clsx from "clsx";
import Image from "next/image";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function ProfileImage({ user } : {
    user: User
}){
    return (
        <div className="flex flex-col justify-center items-center md:my-4">
            <div className={clsx("flex justify-center items-center rounded-full md:my-1 my-3 hover:cursor-pointer")}>
                <form className="relative flex flex-col justift-center items-center" >
                    <Image className="w-[44px] md:w-[54px]" src={user.profile_image} alt="profile image" width={54} height={54} ></Image>
                    <button className="bg-transparent p-0 border-none hover:cursor-pointer">
                        <div className="absolute top-4/5 md:left-31/100 left-32/100 bg-red-500 rounded-full p-1">
                            <PlusIcon className="md:w-[15px] w-[10px] text-white" />
                        </div>
                    </button>
                </form>
            </div>
        </div>
    )
}