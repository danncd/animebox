"use client";

import { fetchTrendingAnime } from "@/actions/anime/client.actions";
import { Anime } from "@/types/anime";
import { useEffect, useState } from "react";
import HomepageAnimeList from "./HomepageAnimeList";

const TrendingAnime = () => {
	const [trendingAnime, setTrendingAnime] = useState<Anime[]>([]);

	useEffect(() => {
		async function loadTrending() {
			const trending = await fetchTrendingAnime();
			setTrendingAnime(trending);
		}
		loadTrending();
	}, []);

	return (
		<HomepageAnimeList animeList={trendingAnime}/>
	);
};

export default TrendingAnime;