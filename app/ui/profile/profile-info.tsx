import Image from "next/image"
export default function ProfileInfo({
    username,
    name,
    profile_image
}: {
    username: string,
    name: string,
    profile_image: string
}){
    return (
        <div className="w-full h-[50%] flex flex-col justify-evenly items-center">

            <div className="flex justify-center items-center">
                <p className="text-white text-center md:text-2xl text-3xl">{name}</p>
            </div>

            <div className="flex flex-col justify-center items-center">
                <div className="flex justify-center items-center">
                    <Image src={profile_image} alt="profile" width={100} height={100}>

                    </Image>
                </div>
            </div>
            
        </div>
    )
}