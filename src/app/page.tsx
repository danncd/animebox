import Banner from "@/components/ui/Banner";
import TrendingAnime from "./components/TrendingAnime";

const Homepage = () => {

    return (
        <div className="w-full">
            <Banner/>
            <div className="max-w-[1200px] mx-auto px-2 my-8">
                <div className="flex flex-col gap-6">
                    <h2 className="text-2xl font-bold">Trending Anime</h2>
                    <TrendingAnime/>
                </div>
            </div>
        </div>
    );
};

export default Homepage;