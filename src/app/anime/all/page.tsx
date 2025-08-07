
import { fetchSearchedAnime } from "@/actions/anime/client.actions";
import { parseAnimeSearchParams, SearchParams } from "@/actions/search/actions";
import SearchBar from "@/components/anime/SearchBar";
import Pagination from "@/components/anime/Pagination";
import AnimeSortBox from "@/components/anime/AnimeSortBox";
import AnimeContent from "../components/AnimeContent";


const ITEMS_PER_PAGE = 42;

interface Props {
	searchParams: Promise<SearchParams>;
}

const AnimePage = async ({ searchParams}: Props) => {

    const raw = await searchParams;
	const {query, sort, tags, page} = parseAnimeSearchParams(raw);

    const { data: animeList, count: count } = await fetchSearchedAnime(query || "", sort || "", tags, page);

    console.log(animeList);


    return (
        <div className="max-w-[1200px] mx-auto px-4">
            <div className="">
                <h1 className="font-bold text-2xl">Browse Anime</h1>
                <h2 className="text-base font-[550] text-gray-500">Leave a review on your favorite anime</h2>
            </div>
            <div className="mb-2 w-full"><SearchBar/></div>
            <div className="pb-6">
                <AnimeSortBox/>
            </div>
            <AnimeContent animeList={animeList}/>
            <div className="my-6">
				{count !== undefined && (
					<Pagination
						totalItems={count ?? 0}
						itemsPerPage={ITEMS_PER_PAGE}
					/>
				)}
			</div>
        </div>
    );
};

export default AnimePage;