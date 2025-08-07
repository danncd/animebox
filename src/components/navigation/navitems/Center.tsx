import { getAnimeSeason } from "@/utils/getAnimeSeason";
import Link from "next/link";

const Center = () => {


    const { season, year } = getAnimeSeason();
    return (
        <div className="hidden flex-row justify-center items-center lg:flex gap-10 font-[600]">
            <Link href={`/anime/all`} className="relative group ">
                Anime
                <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-gray-800 transition-all duration-300 group-hover:left-0 group-hover:w-1/2"></span>
                <span className="absolute right-1/2 bottom-0 w-0 h-[2px] bg-gray-800 transition-all duration-300 group-hover:right-0 group-hover:w-1/2"></span>
            </Link>
            <Link href={`/anime/season/${season}-${year}`} className="relative group whitespace-nowrap">
                {season} {year}
                <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-gray-800 transition-all duration-300 group-hover:left-0 group-hover:w-1/2"></span>
                <span className="absolute right-1/2 bottom-0 w-0 h-[2px] bg-gray-800 transition-all duration-300 group-hover:right-0 group-hover:w-1/2"></span>
            </Link>
            <Link href={`/reviews`} className="relative group ">
                Reviews
                <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-gray-800 transition-all duration-300 group-hover:left-0 group-hover:w-1/2"></span>
                <span className="absolute right-1/2 bottom-0 w-0 h-[2px] bg-gray-800 transition-all duration-300 group-hover:right-0 group-hover:w-1/2"></span>
            </Link>
        </div>
    );
};

export default Center;