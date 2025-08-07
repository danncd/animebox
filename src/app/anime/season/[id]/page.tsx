

import { notFound } from 'next/navigation';
import { parseAnimeSearchParams, SearchParams } from '@/actions/search/actions';
import { fetchSearchedAnime, getAvailableSeasonsAndYears } from '@/actions/anime/client.actions';
import AnimeContent from '../../components/AnimeContent';
import Pagination from '@/components/anime/Pagination';
import SeasonSelector from '@/components/anime/SeasonSelector';

const ITEMS_PER_PAGE = 42;

type Props = {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ [key: string]: string | undefined }>;
}

const SeasonPage = async ({ params, searchParams }: Props) => {

    const { id } = await params;

    const [rawSeason, yearStr] = id.split("-");

    if (!rawSeason || !yearStr) {
        notFound();
    }

    const year = Number(yearStr);
    const season =
		rawSeason.charAt(0).toUpperCase() + rawSeason.slice(1).toLowerCase();

    const validSeasons = ["Winter", "Spring", "Summer", "Fall"];
    if (!validSeasons.includes(season)) {
        notFound();
    }

    if (isNaN(year) || year < 1970 || year > new Date().getFullYear() + 2) {
        notFound();
    }

    const { seasons, years } = await getAvailableSeasonsAndYears();

    const raw = await searchParams;
    const {query, sort, tags, page} = parseAnimeSearchParams(raw);

    const { data: animeList, count: count } = await fetchSearchedAnime(query || "", sort || "", tags, page, season, year);

    return (
        <div className='max-w-[1200px] mx-auto px-4'>
            <div className="mb-6">
                <h1 className="font-bold text-2xl">{season} {year}</h1>
                <h2 className="text-base font-[550] text-gray-500">Browse anime airing this season</h2>
            </div>
            <div className="mb-8">
				<SeasonSelector
					seasons={seasons}
					years={years}
					initialSeason={season}
					initialYear={year}
				/>
            </div>
            <AnimeContent animeList={animeList}/>
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

export default SeasonPage;