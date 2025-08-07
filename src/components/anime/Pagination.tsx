"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Button from "../ui/Button";

type PaginationProps = {
	totalItems: number;
	itemsPerPage: number;
};

const Pagination = ({ totalItems, itemsPerPage }: PaginationProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const currentPage = parseInt(searchParams.get("page") || "1", 10);
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	if (totalPages <= 1) return null;

	const goToPage = (page: number) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", page.toString());
		router.push(`?${params.toString()}`);
	};

	const getPageNumbers = () => {
		const range: (number | "...")[] = [];
		const sidePages = 2;

		if (totalPages <= 10) {
			for (let i = 1; i <= totalPages; i++) range.push(i);
			return range;
		}

		const left = Math.max(2, currentPage - sidePages);
		const right = Math.min(totalPages - 1, currentPage + sidePages);

		range.push(1);

		if (left > 2) {
			range.push("...");
		}

		for (let i = left; i <= right; i++) {
			range.push(i);
		}

		if (right < totalPages - 1) {
			range.push("...");
		}

		range.push(totalPages);
		return range;
	};

	const pages = getPageNumbers();

	return (
		<div className="flex justify-center items-center gap-1 flex-wrap">

			{currentPage > 1 && (
				<Button
					onClick={() => goToPage(currentPage - 1)}
					className="px-3 h-9 rounded-full font-[550] text-sm mr-4"
				>
					← Prev
				</Button>
			)}


			{pages.map((page, idx) =>
				page === "..." ? (
					<span key={`ellipsis-${idx}`} className="px-2 text-gray-500 select-none font-[550]">
						...
					</span>
				) : (
					<Button
						key={page}
						onClick={() => goToPage(page)}
						color={page === currentPage ? "blue" : "gray"}
						className="!w-9 !h-9 text-sm !p-0 font-[550]"
					>
						{page}
					</Button>
				)
			)}


			{currentPage < totalPages && (
				<Button
					onClick={() => goToPage(currentPage + 1)}
					className="px-3 h-9 rounded-full font-[550] text-sm ml-4"
				>
					Next →
				</Button>
			)}
		</div>
	);
};

export default Pagination;