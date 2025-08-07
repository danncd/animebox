'use client';

import { fetchReviewsByAnimeId, formatDate, getOverall, getScoreColor } from "@/actions/review/actions";
import { Anime } from "@/types/anime";
import { Review } from "@/types/review";
import { useEffect, useState } from "react";
import Avatar from "../ui/Avatar";

type Props = {
    anime: Anime;
    type: "anime-page";
}

const ReviewSection = ({ anime, type }: Props) => {

    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
		const fetch = async () => {
            setLoading(true);
			if (type == "anime-page") {
				const data = await fetchReviewsByAnimeId(anime.mal_id);
				setReviews(data);
			}
            setLoading(false);
		};
		fetch();
	}, [anime.mal_id, type]);

    return (
        <div className="flex flex-col gap-12">
            {reviews.map((review) => (
                <div key={review.id} className="flex flex-col gap-4">
                    <div className="flex flex-row gap-4">
                        <Avatar
                            avatarUrl={review.profiles?.avatar_url}
                            className="w-12 h-12"
                        />
                        <div className="flex flex-col gap-0 justify-center">
                            <span className="font-[600]">{review.profiles?.username}</span>
                            {review.updated_at ? (
                                <span className="text-sm text-gray-500">{formatDate(review.updated_at)} (Edited)</span>
                            ) : (
                                <span className="text-sm text-gray-500">{formatDate(review.created_at)}</span>
                            )}
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="max-w-[720px] px-4 w-full mx-auto flex flex-wrap flex-1 justify-between">
                            {Object.entries({
                                Animation: review.animation_score,
                                Sound: review.sound_score,
                                Story: review.story_score,
                            }).map(([label, value]) => (
                                <div key={label} className="flex flex-col items-center">
                                    <span className={`font-bold text-xl ${getScoreColor(value)}`}>{value}</span>
                                    <span className="text-gray-700 text-xs">{label}</span>
                                </div>
                            ))}
                            <div key="overall" className="flex flex-col items-center">
                                    <span 
                                        className={`font-bold text-xl ${getScoreColor(getOverall(review.animation_score, review.sound_score, review.story_score))}`}
                                    >
                                        {getOverall(
                                            review.story_score,
                                            review.animation_score,
                                            review.sound_score,
									    )}
                                    </span>
                                    <span className="text-gray-700 text-xs">Overall</span>
                            </div>
                        </div>
                    </div>
                    <p
                        className="prose [&>p:empty]:min-h-[1rem]"
                        dangerouslySetInnerHTML={{ __html: review.content }}
                    />
                </div>
            ))}
            {!loading && !(reviews.length > 0) && (
                <div className="p-4 text-gray-500 font-sm text-center">There are no reviews yet.</div>
            )}
        </div>
    );
};

export default ReviewSection;