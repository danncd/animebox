'use client';

import { fetchAllReviews, fetchReviews } from "@/actions/review/actions";
import { Anime } from "@/types/anime";
import { Review } from "@/types/review";
import { useEffect, useState } from "react";
import ReviewSectionContent from "./ReviewSectionContent";
import { useAuth } from "@/contexts/AuthContext";
import { Profile } from "@/types/profile";

type SortOption = "newest" | "oldest";

type Props = {
    anime?: Anime;
    userProfile?: Profile;
    type: "anime-page" | "all-reviews" | "user";
}

const ReviewSection = ({ anime, type, userProfile }: Props) => {

    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState<SortOption>("newest");
    const { user } = useAuth();

    const mal_id = Number(anime?.mal_id);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);

            if (type === "anime-page") {
                let reviews = await fetchReviews({ mal_id, sortOrder });

                if (user) {
                    const userReview = reviews.find((review) => review.profile_id === user.id);
                    reviews = reviews.filter((review) => review.profile_id !== user.id);

                    if (userReview) {
                        reviews = [userReview, ...reviews];
                    }
                }
                setReviews(reviews);
            }
            
            else if (type === "user") {
                const userId = userProfile?.id;
                const reviews = await fetchReviews({ mal_id, userId, sortOrder });
                setReviews(reviews);

            } 
            
            else if (type === "all-reviews") {
                const reviews = await fetchAllReviews();
                setReviews(reviews);
            }

            
            setLoading(false);
        };
        fetch();
    }, [mal_id, type, sortOrder, user?.id]);

    return (
        <div>
            {type != "all-reviews" && reviews.length > 0 && (
                <div className="w-fit bg-gray-200 rounded py-[2px] px-2 mb-8">
                    <select
                        className="w-28 text-sm font-[550] text-gray-800 cursor-pointer focus:outline-none bg-gray-200"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as SortOption)}
                    >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
            )}
            <ReviewSectionContent reviewList={reviews} loading={loading} type={type}/>
        </div>
    );
};

export default ReviewSection;