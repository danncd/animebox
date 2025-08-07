import AnimeCard from "@/components/anime/AnimeCard";
import { Anime } from "@/types/anime";

type Props = {
    animeList: Anime[];
}
const HomepageAnimeList = ({ animeList }: Props) => {
    return (
        <div>	
			<div className="flex flex-row gap-4 rounded overflow-y-auto">
				{animeList.map((anime) => (
					<AnimeCard key={anime.mal_id} anime={anime} />
				))}
			</div>
		</div>
    );
};

export default HomepageAnimeList;