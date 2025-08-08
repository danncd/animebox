import { Anime } from "@/types/anime";

type Props = {
	anime: Anime;
};

const AnimePageInfo = ({ anime }: Props) => {
	const infoList = [
		{ label: "Episodes", value: anime.episodes || "Unknown" },
        { label: "Year", value: anime.year || "Unknown" },
		{ label: "Studio", value: anime.studio_name || "Unknown" },
        { label: "Duration", value: anime.duration || "Unknown" },
		{ label: "Status", value: anime.status || "Unknown" },
		{ label: "Aired", value: anime.aired || "Unknown" },
		{ label: "Premiered", value: anime.premiered || "Unknown" },
        { label: "Rating", value: anime.rating || "Unknown" },
        { label: "MAL Score", value: anime.score || "Unknown" },
		
	];

	return (
		<div className="w-full flex items-center justify-center my-10">
			<div className="relative grid grid-cols-2 md:grid-cols-3 gap-8 my-4 w-full max-w-[1080px] items-center justify-center">
				{/* Vertical split dividers */}
				<div className="hidden md:flex flex-col items-center absolute left-1/3 top-0 bottom-0">
					<div className="w-[1.5px] rounded-full h-[35%] bg-gray-300" />
					<div className="h-[30%]" />
					<div className="w-[1.5px] rounded-full h-[35%] bg-gray-300" />
                    <div className="h-[30%]" />
					<div className="w-[1.5px] rounded-full h-[35%] bg-gray-300" />
				</div>
				<div className="hidden md:flex flex-col items-center absolute left-2/3 top-0 bottom-0">
					<div className="w-[1.5px] rounded-full h-[35%] bg-gray-300" />
					<div className="h-[30%]" />
					<div className="w-[1.5px] rounded-full h-[35%] bg-gray-300" />
                    <div className="h-[30%]" />
					<div className="w-[1.5px] rounded-full h-[35%] bg-gray-300" />
				</div>

				{infoList.map(({ label, value }, index) => (
					<div
						key={index}
						className="flex flex-row justify-between px-4"
					>
						<span className="font-[550] text-base">{label}</span>
						<span className="text-right">{value}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default AnimePageInfo;