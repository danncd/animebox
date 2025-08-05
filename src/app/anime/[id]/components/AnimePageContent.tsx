

import { fetchAnimeById } from "@/actions/anime/server.actions";
import { notFound } from "next/navigation";
import AnimePageTitle from "./AnimePageTitle";
import AnimePageInfo from "./AnimePageInfo";
import AnimePageDescriptionTags from "./AnimePageDescriptionTags";
import ReviewSection from "@/components/reviews/ReviewSection";
import AnimePageReviewTitle from "./AnimePageReviewTitle";

type Props = {
	mal_id: number;
};

const AnimePageContent = async ({ mal_id }: Props) => {
	const anime = await fetchAnimeById(mal_id);

	if (!anime) {
		notFound();
	}

	return (
		<div>
			<AnimePageTitle title={anime.title} alt_titles={anime?.alt_titles}/>
			<div className="flex flex-col md:flex-row gap-6">
				<div className="flex-none">
					<img
						src={anime.image_url}
						alt=""
						className="h-64 w-42 md:h-96 md:w-65 rounded object-cover flex-shrink-0 shadow"
					/>
				</div>
				<AnimePageDescriptionTags anime={anime}/>
			</div>
            <AnimePageInfo anime={anime}/>
			<AnimePageReviewTitle anime={anime}/>
			<ReviewSection anime={anime} type="anime-page"/>
		</div>
	);
};

export default AnimePageContent;
