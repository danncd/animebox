import AnimeCard from "@/components/anime/AnimeCard";
import { Anime } from "@/types/anime";

type Props = {
    animeList: Anime[];
}

const AnimeContent = ({ animeList }: Props) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 items-start justify-center">
            {animeList.map((anime) => (
                <div key={anime.mal_id}>
                    <AnimeCard anime={anime}/>
                </div>
            ))}
        </div>
    );
};

export default AnimeContent;