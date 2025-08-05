
import { fetchSearchedAnime } from "@/actions/anime/client.actions";
import { parseAnimeSearchParams, SearchParams } from "@/actions/search/actions";
import SearchBar from "@/components/anime/SearchBar";
import Pagination from "@/components/anime/Pagination";
import AllAnimeContent from "./components/AllAnimeContent";


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
        <div className="max-w-[1200px] mx-auto px-2">
            <div className="">
                <h1 className="font-bold text-2xl">Browse Anime</h1>
                <h2 className="text-base font-[550] text-gray-500">Leave a review on your favorite anime</h2>
            </div>
            <div className="mb-2 w-full"><SearchBar/></div>
            <AllAnimeContent animeList={animeList}/>
            <div className="my-12">
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