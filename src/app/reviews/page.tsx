import ReviewSection from "@/components/reviews/ReviewSection";

const ReviewsPage = () => {
    return (
        <div className='max-w-[1200px] mx-auto px-4'>
            <div className="mb-6">
                <h1 className="font-bold text-2xl">Recent Reviews</h1>
                <h2 className="text-base font-[550] text-gray-500">Latest opinions and ratings</h2>
            </div>
            <ReviewSection type="all-reviews"/>
        </div>
    );
};

export default ReviewsPage;