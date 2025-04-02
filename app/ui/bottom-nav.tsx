'use client';
import Link from "next/link";
import { HomeIcon, UserGroupIcon, PlusIcon, InboxIcon, UserIcon } from '@heroicons/react/24/outline';
import clsx from "clsx";
import { usePathname } from "next/navigation";

const links = [
    { label : "Home", href: "/", icon: HomeIcon },
    { label : "Friends", href: "/friends", icon: UserGroupIcon },
    { label : "", href: "/upload", icon: PlusIcon },
    { label : "Inbox", href: "/inbox", icon: InboxIcon },
    { label : "Profile", href: "/profile", icon: UserIcon },
]

export default function BottomNav(){
    const pathname = usePathname();
    return (
        <nav className="fixed w-full md:h-full md:w-7/100 md:left-0 bottom-0 h-[10%] bg-gray-900 flex md:flex-col flex-row justify-between items-center md:py-5">
            {links.map((link, index) => {
                const LinkIcon = link.icon;
                return (
                    <Link key={index} href={link.href}>
                        <div className={clsx("flex flex-col justify-between items-center w-[20px] md:w-[35px]", {
                            "ml-6 md:ml-0": index === 0,
                            "mr-6 md:mr-0": index === links.length - 1,
                        })}>
                            <LinkIcon className={clsx(
                                pathname === link.href ? "text-white" : "text-gray-400"
                            )} />
                            <p className={clsx("text-white text-xs", {
                                "font-extrabold": pathname === link.href
                            })}>{link.label}</p>
                        </div>
                    </Link>
                )
            })}
        </nav>
    )
}