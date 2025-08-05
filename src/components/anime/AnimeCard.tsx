import { Anime } from "@/types/anime";
import Link from "next/link";

type Props = {
    anime: Anime;
}

const AnimeCard = ({ anime }: Props) => {
    return (
        <div className="mb-2">
            <Link href={`/anime/${anime.mal_id}`} className="flex flex-col gap-2 items-center justify-start hover:scale-102 transition-all duration-200 ease-in-out">
                <img src={anime.image_url || ""} alt="" className="max-w-44 min-w-44 md:max-w-40 md:min-w-40 h-62 md:h-58 object-cover rounded shadow-sm"/>
                <span className="font-bold text-sm text-center">{anime.title}</span>
            </Link>
        </div>
    );
};

export default AnimeCard;