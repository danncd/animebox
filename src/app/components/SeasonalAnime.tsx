"use client";

import { fetchTopSeasonalAnime, fetchTrendingAnime } from "@/actions/anime/client.actions";
import { Anime } from "@/types/anime";
import { getAnimeSeason } from "@/utils/getAnimeSeason";
import { useEffect, useState } from "react";
import HomepageAnimeList from "./HomepageAnimeList";

const SeasonalAnime = () => {
	const [seasonalAnime, setseasonalAnime] = useState<Anime[]>([]);

	useEffect(() => {
		async function loadTrending() {
            const { season, year } = getAnimeSeason();
			const seasonal = await fetchTopSeasonalAnime(season, year);
			setseasonalAnime(seasonal);
		}
		loadTrending();
	}, []);

    return (
        <HomepageAnimeList animeList={seasonalAnime}/>
    );
};

export default SeasonalAnime;