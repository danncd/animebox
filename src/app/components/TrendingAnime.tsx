"use client";

import { fetchTrendingAnime } from "@/actions/anime/client.actions";
import AnimeCard from "@/components/anime/AnimeCard";
import { useEffect, useState } from "react";

const TrendingAnime = () => {
	const [trendingAnime, setTrendingAnime] = useState<any[]>([]);

	useEffect(() => {
		async function loadTrending() {
			const trending = await fetchTrendingAnime();
			setTrendingAnime(trending);
		}
		loadTrending();
	}, []);

	return (
		<div>	
			<div className="flex flex-row gap-4 rounded overflow-y-auto">
				{trendingAnime.map((anime) => (
					<AnimeCard key={anime.mal_id} anime={anime} />
				))}
			</div>
		</div>
	);
};

export default TrendingAnime;