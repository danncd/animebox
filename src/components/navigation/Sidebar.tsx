'use client';

import Link from "next/link";
import { useNavigation } from "@/contexts/NavigationContext";
import { useEffect, useState } from "react";
import HamburgerIcon from "../ui/HamburgerIcon";
import { useRouter } from "next/navigation";
import { getAnimeSeason } from "@/utils/getAnimeSeason";
import Image from "next/image";

const Sidebar = () => {

    const router = useRouter();

    const { isSidebarOpen, closeSidebar } = useNavigation();
    const [searchTerm, setSearchTerm] = useState("");
    const [season, setSeason] = useState("");
    const [year, setYear] = useState<number | "">("");

    useEffect(() => {
        const { season, year } = getAnimeSeason();
        setSeason(season);
        setYear(year);
    }, [])

    useEffect(() => {
            if (isSidebarOpen) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }
    
            return () => {
                document.body.style.overflow = "";
            };
        }, [isSidebarOpen]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && searchTerm.trim()) {
			const params = new URLSearchParams({ query: searchTerm.trim(), page: "1" });
			router.push(`/anime/all?${params.toString()}&page=1`);
            setSearchTerm("");
            closeSidebar();
		}
	};

    return (
        <>
            <div
                className={`z-50 sidebar fixed top-0 left-0 h-full w-60 bg-white/90 backdrop-blur-sm shadow-2xl transition-transform duration-300 ease-in-out ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >               
                <div className="flex items-center gap-5 cursor-pointer h-16 p-5 mb-5" onClick={closeSidebar}>
                    <Link href={`/`} className="flex items-center gap-5 cursor-pointer h-16">
                        <HamburgerIcon/>
                        <div className="fixed font-bold text-xl text-center w-full left-0 flex flex-row gap-2 justify-center pl-2">
                            <Image src="/logo.png" width={28} height={28} draggable={false} alt="Logo" />
                            <span>ANIMEBOX</span>
                        </div>
                    </Link>
                </div>
                <div>
                    <div className="px-2 mb-6">
                        <input
                        type="text"
                        placeholder="Search anime..."
                        className="bg-white hidden md:block px-3 py-[3px] w-full max-w-75 rounded-full border b-white border-gray-300 focus:outline-none mr-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    </div>
                    <div className="px-5 flex flex-col gap-3">
                        <Link href={`/anime/all`} onClick={closeSidebar}>
                            <span className="px-1 font-[550] text-base">Anime</span>
                        </Link>
                    </div>
                    <hr className="mx-2 border-t-1.5 mt-3 mb-3 rounded-xs border-gray-300" />
                    <div className="px-5 flex flex-col gap-3">
                        <Link href={`/anime/season/${season}-${year}`} onClick={closeSidebar}>
                            <span className="px-1 font-[550] text-base">{season} {year}</span>
                        </Link>
                    </div>
                    <hr className="mx-2 border-t-1.5 mt-3 mb-3 rounded-xs border-gray-300" />
                    <div className="px-5 flex flex-col gap-3">
                        <Link href={`/reviews`} onClick={closeSidebar}>
                            <span className="px-1 font-[550] text-base">Reviews</span>
                        </Link>
                    </div>
                    <hr className="mx-2 border-t-1.5 mt-3 mb-3 rounded-xs border-gray-300" />
                    <div className="px-5 flex flex-col gap-3">
                        <Link href={`/reviews?filter=following`} onClick={closeSidebar}>
                            <span className="px-1 font-[550] text-base">Following</span>
                        </Link>
                    </div>
                </div>
            </div>
			<div className={`z-30 fixed top-0 left-0 h-screen backdrop-blur-[2px] bg-black/25 w-full transition-opacity duration-200 ease-in-out ${isSidebarOpen? "opacity-100 pointer-events-auto": "opacity-0 pointer-events-none"}`} onClick={closeSidebar}/>
        </>
    );
};

export default Sidebar;