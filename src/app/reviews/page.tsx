"use client";

import ReviewSection from "@/components/reviews/ReviewSection";
import Button from "@/components/ui/Button";
import { useSearchParams, useRouter } from "next/navigation";

const ReviewsPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const filter = searchParams.get("filter") || "all";
    const normalizedFilter = filter.toLowerCase();
    const filterStr = normalizedFilter.charAt(0).toUpperCase() + normalizedFilter.slice(1);

    const handleFilterClick = (type: "all" | "following") => {
        router.push(`?filter=${type}`);
    };

    return (
        <div className='relative max-w-[1200px] mx-auto px-4'>
            <div className="mb-6">
                <h1 className="font-bold text-2xl">Recent Reviews — {filterStr}</h1>
                <h2 className="text-base font-[550] text-gray-500">Latest opinions and ratings</h2>
            </div>

            <div className="mb-6 flex flex-row gap-4">
                <Button
                    color={filter === "all" ? "blue" : "gray"}
                    className="font-[700]"
                    onClick={() => handleFilterClick("all")}
                >
                    All
                </Button>
                <Button
                    color={filter === "following" ? "blue" : "gray"}
                    className="font-[700]"
                    onClick={() => handleFilterClick("following")}
                >
                    Following
                </Button>
            </div>

            <ReviewSection type={"all-reviews"} />
        </div>
    );
};

export default ReviewsPage;