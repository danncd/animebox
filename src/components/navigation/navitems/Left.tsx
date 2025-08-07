"use client";

import HamburgerIcon from "@/components/ui/HamburgerIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useNavigation } from "@/contexts/NavigationContext";
import Image from "next/image";

const Left = () => {
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState("");

	const { openSidebar } = useNavigation();

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && searchTerm.trim()) {
			const params = new URLSearchParams({
				query: searchTerm.trim(),
				page: "1",
			});
			router.push(`/anime/all?${params.toString()}&page=1`);
			setSearchTerm("");
		}
	};

	return (
		<div className="flex flex-row items-center md:gap-7 gap-4">
			<button onClick={openSidebar}>
				<HamburgerIcon />
			</button>

			<Link
				href="/"
				className="font-bold text-[18px] flex items-center gap-2 cursor-pointer whitespace-nowrap flex-shrink-0"
			>
				<Image src="/logo.png" width={28} height={28} draggable={false} alt="Logo" />
				<span>ANIMEBOX</span>
			</Link>

			<input
				type="text"
				placeholder="Search anime..."
				className="mr-5 hidden md:block px-3 py-[3px] w-40 md:w-60 rounded-full border border-gray-300 focus:outline-none"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
		</div>
	);
};

export default Left;
