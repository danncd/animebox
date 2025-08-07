"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const AnimeSortBox = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newSort = e.target.value;

		const params = new URLSearchParams(searchParams.toString());
		params.set("sort", newSort);
		params.set("page", "1");

		startTransition(() => {
			router.push(`?${params.toString()}`);
		});
	};

	const currentSort = searchParams.get("sort") || "score";

	return (
		<div className="w-fit bg-gray-200 rounded py-[2px] px-2">
			<select
				className="w-28 text-sm font-[550] text-gray-800 cursor-pointer focus:outline-none"
				value={currentSort}
				onChange={handleChange}
			>
				<option value="score">Popular</option>
				<option value="year_desc">Newest</option>
				<option value="year_asc">Oldest</option>
			</select>
		</div>
	);
};

export default AnimeSortBox;