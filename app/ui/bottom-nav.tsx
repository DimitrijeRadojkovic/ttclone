'use client';
import Link from "next/link";
import { HomeIcon, UserGroupIcon, PlusIcon, InboxIcon } from '@heroicons/react/24/outline';
import clsx from "clsx";
import { usePathname } from "next/navigation";

const links = [
    { label : "Home", href: "/", icon: HomeIcon },
    { label : "Friends", href: "/friends", icon: UserGroupIcon },
    { label : "", href: "/upload", icon: PlusIcon },
    { label : "Inbox", href: "/inbox", icon: InboxIcon },
    { label : "Profile", href: "/profile", icon: InboxIcon },
]

export default function BottomNav(){
    const pathname = usePathname();
    return (
        <nav className="fixed w-full bottom-0 h-20 bg-gray-900 flex flex-row justify-evenly items-center">
            {links.map((link, index) => {
                const LinkIcon = link.icon;
                return (
                    <Link key={index} href={link.href}>
                        <div className={clsx("flex flex-col justify-between items-center w-[20px] md:w-[40px]")}>
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