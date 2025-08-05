import { fetchAnimeById } from "@/actions/anime/server.actions";
import ReviewForm from "@/components/reviews/ReviewForm";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
	params: Promise<{ id: string }>;
};

const UserReviewPage = async ({ params }: Props) => {
	const { id } = await params;
	const anime = await fetchAnimeById(id);

	if (!anime) {
		notFound();
	}

	return (
        <div className='max-w-[1200px] mx-auto px-2'>
            <div>
                <h1 className="font-[600] text-2xl">Write a Review</h1>
                <Link href={`/anime/${anime.mal_id}`}><h2 className="text-base font-[550] text-gray-500">{anime.title}</h2></Link>
            </div>
            <ReviewForm anime={anime}/>
        </div>
    );
};

export default UserReviewPage;
