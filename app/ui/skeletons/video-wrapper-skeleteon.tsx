import { PlusIcon, HeartIcon, ChatBubbleLeftIcon, BookmarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

export default function VideoWrapperSkeleton() {
    return (
        <div className="absolute flex flex-col justify-end items-end md:items-start right-0 md:left-[65%] h-full md:w-[30%] space-y-4 p-4">
            {/* Profile Image */}
            <div className="animate-pulse flex flex-col items-center">
                <div className="relative">
                    <div className="w-[54px] h-[54px] bg-gray-700 rounded-full" />
                    <div className="absolute bottom-0 right-0 bg-red-500 rounded-full p-1">
                        <PlusIcon className="w-3 h-3 text-white" />
                    </div>
                </div>
            </div>

            {/* Like */}
            <div className="animate-pulse flex flex-col items-center space-y-1">
                <div className="p-3 rounded-full bg-gray-800">
                    <HeartIcon className="w-6 h-6 text-gray-600" />
                </div>
                <div className="w-6 h-4 bg-gray-700 rounded" />
            </div>

            {/* Comment */}
            <div className="animate-pulse flex flex-col items-center space-y-1">
                <div className="p-3 rounded-full bg-gray-800">
                    <ChatBubbleLeftIcon className="w-6 h-6 text-gray-600" />
                </div>
                <div className="w-6 h-4 bg-gray-700 rounded" />
            </div>

            {/* Favorite */}
            <div className="animate-pulse flex flex-col items-center space-y-1">
                <div className="p-3 rounded-full bg-gray-800">
                    <BookmarkIcon className="w-6 h-6 text-gray-600" />
                </div>
                <div className="w-6 h-4 bg-gray-700 rounded" />
            </div>
        </div>
    );
}
