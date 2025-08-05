'use client';

import HamburgerIcon from "@/components/ui/HamburgerIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useNavigation } from "@/contexts/NavigationContext";

const Left = () => {

    const router = useRouter();
	const [searchTerm, setSearchTerm] = useState("");

	const { openSidebar } = useNavigation();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && searchTerm.trim()) {
			const params = new URLSearchParams({ query: searchTerm.trim(), page: "1" });
			router.push(`/anime/all?${params.toString()}&page=1`);
            setSearchTerm("");
		}
	};

    return (
        <div className="flex flex-row gap-5 items-center">
            <button onClick={openSidebar}><HamburgerIcon/></button>
            <Link href={`/`} className="font-bold text-[18px] cursor-pointer">ANIMEBOX</Link>
            <input
				type="text"
				placeholder="Search anime..."
				className="bg-white hidden md:block px-3 py-[3px] w-full min-w-55 max-w-75 rounded-full border b-white border-gray-300 focus:outline-none mr-10"
                value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
        </div>
    );
};

export default Left;