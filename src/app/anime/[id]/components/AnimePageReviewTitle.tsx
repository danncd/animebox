'use client';

import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { Anime } from "@/types/anime";
import Link from "next/link";

type Props = {
    anime: Anime;
}

const AnimePageReviewTitle = ({ anime }: Props) => {
    
    const { user } = useAuth();

	return (
		<div className="flex flex-wrap items-center justify-between mb-6">
			<h2 className="font-[600] text-2xl">Reviews</h2>
			{user ? 
                <Link href={`/profile/review/${anime.mal_id}`}><Button>Create/Edit your review</Button></Link> 
            : 
                <p className="text-sm text-gray-500">Login to leave a review</p>
            }
		</div>
	);
};

export default AnimePageReviewTitle;
