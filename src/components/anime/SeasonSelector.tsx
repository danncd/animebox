"use client";

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SeasonSelectorProps = {
	seasons: string[];
	years: string[];
	initialSeason: string;
	initialYear: number;
};

const SeasonSelector = ({
	seasons,
	years,
	initialSeason,
	initialYear,
}: SeasonSelectorProps) => {
	const router = useRouter();
	const [selectedSeason, setSelectedSeason] = useState(initialSeason);
	const [selectedYear, setSelectedYear] = useState(initialYear);

	const handleGo = () => {
		if (selectedSeason && selectedYear) {
			router.push(`/anime/season/${selectedSeason.toLowerCase()}-${selectedYear}`);
		}
	};

	return (
		<div className="flex items-center gap-2 mb-4">
			<div className="bg-gray-200 rounded py-[2px] px-2">
				<select
					value={selectedSeason}
					onChange={(e) => setSelectedSeason(e.target.value)}
					className="text-sm font-[550] text-gray-800 cursor-pointer focus:outline-none bg-transparent"
				>
					<option value="">Select Season</option>
					{seasons.map((s) => (
						<option key={s} value={s}>
							{s}
						</option>
					))}
				</select>
			</div>

			<div className="bg-gray-200 rounded py-[2px] px-2">
				<select
					value={selectedYear}
					onChange={(e) => setSelectedYear(Number(e.target.value))}
					className="text-sm font-[550] text-gray-800 cursor-pointer focus:outline-none bg-transparent"
				>
					<option value="">Select Year</option>
					{years.map((y) => (
						<option key={y} value={y}>
							{y}
						</option>
					))}
				</select>
			</div>

			<Button
				onClick={handleGo}
				disabled={!selectedSeason || !selectedYear}
				color="blue"
				className="text-sm py-auto disabled:opacity-50"
			>
				Go
			</Button>
		</div>
	);
};

export default SeasonSelector;