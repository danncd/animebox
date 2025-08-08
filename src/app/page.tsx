import Banner from "@/components/ui/Banner";
import TrendingAnime from "./components/TrendingAnime";
import SeasonalAnime from "./components/SeasonalAnime";
import { getAnimeSeason } from "@/utils/getAnimeSeason";

const Homepage = () => {

    const { season, year } = getAnimeSeason();

    return (
        <div className="w-full">
            <Banner/>
            <div className="max-w-[1200px] mx-auto px-4 my-10">
                Reviewed anime page
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-6">
                        <h2 className="text-2xl font-bold">Trending Anime</h2>
                        <TrendingAnime/>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h2 className="text-2xl font-bold">{season} {year}</h2>
                        <SeasonalAnime/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;