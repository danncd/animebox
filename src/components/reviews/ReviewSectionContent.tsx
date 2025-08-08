import { Review } from "@/types/review";
import Avatar from "../ui/Avatar";
import { formatDate, getOverall, getScoreColor } from "@/actions/review/actions";
import Link from "next/link";
import Image from "next/image";
import { NEW_USER_AVATAR } from "@/app/profile/components/ProfilePageInfo";
import { getPublicAvatarUrl } from "@/actions/profile/actions";

type Props = {
    reviewList: Review[];
    loading: boolean;
    type: string;
}

const ReviewSectionContent = ({ reviewList, loading, type }: Props) => {
    return (
        <div className="flex flex-col gap-16">
            {reviewList.map((review) => (
                <div key={review.id} className="flex flex-col gap-3">
                    {(type === "all-reviews" || type === "following" || type === "user") &&
                        <div className="mb-4 flex items-center text-gray-700 font-[600]">
                            <Link href={`/anime/${review.mal_id}`} className="relative group">
                                <h3 className="flex-shrink-0">{review.anime?.title}</h3>
                                <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-gray-700 transition-all duration-300 group-hover:left-0 group-hover:w-1/2"></span>
                                <span className="absolute right-1/2 bottom-0 w-0 h-[2px] bg-gray-700 transition-all duration-300 group-hover:right-0 group-hover:w-1/2"></span>
                            </Link>
                            <div className="flex-grow ml-3 h-[1.5px] bg-gray-300 rounded-full"></div>
                        </div>
                    }
                    <div className={`flex flex-row w-full gap-6`}>
                        {(type === "all-reviews" || type === "following" || type === "user") && 
                            <div className="hidden md:block">
                                <Link href={`/anime/${review.mal_id}`}>
                                    <Image 
                                        src={review.anime?.image_url || ""}
                                        alt={`${review.anime?.title} image`}
                                        width={175}
                                        height={175}
                                        className="object-cover min-w-38 max-w-38 max-h-56 min-h-56 rounded hover:scale-102 transition-all duration-300 ease-in-out"
                                    />
                                </Link>
                            </div>
                        }
                        <div className="w-full">
                            <div className="flex flex-row gap-4">
                                <Link href={`/profile/${review.profiles?.username}`}>
                                    <Avatar
                                        avatarUrl={getPublicAvatarUrl(review.profiles?.avatar_url, review.profiles?.avatar_updated_at) || NEW_USER_AVATAR}
                                        className="w-12 h-12"
                                    />
                                </Link>
                                <div className="flex flex-col gap-0 justify-center">
                                    <Link href={`/profile/${review.profiles?.username}`}>
                                        <span className="font-[600]">{review.profiles?.username}</span>
                                    </Link>
                                    {review.updated_at ? (
                                        <span className="text-sm text-gray-500">{formatDate(review.updated_at)} (Edited)</span>
                                    ) : (
                                        <span className="text-sm text-gray-500">{formatDate(review.created_at)}</span>
                                    )}
                                </div>
                            </div>
                            <div className="w-full my-3">
                                <div className="max-w-[720px] px-4 w-full mx-auto flex flex-wrap flex-1 justify-between">
                                    {Object.entries({
                                        Animation: review.animation_score,
                                        Sound: review.sound_score,
                                        Story: review.story_score,
                                    }).map(([label, value]) => (
                                        <div key={label} className="flex flex-col items-center">
                                            <span className={`font-black text-2xl ${getScoreColor(value)}`}>{value}</span>
                                            <span className="text-gray-700 text-xs">{label}</span>
                                        </div>
                                    ))}
                                    <div key="overall" className="flex flex-col items-center">
                                            <span 
                                                className={`font-black text-2xl ${getScoreColor(getOverall(review.animation_score, review.sound_score, review.story_score))}`}
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
                    </div>
                </div>
            ))}
            {!loading && !(reviewList.length > 0) && (
                <div className="p-4 text-gray-500 font-sm text-center">There are no reviews yet.</div>
            )}
        </div>
    );
};

export default ReviewSectionContent;