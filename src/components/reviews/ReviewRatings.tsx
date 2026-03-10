import React from "react";
import RatingInput from "./RatingInput";

type ReviewRatingsProps = {
	story: number | "";
	animation: number | "";
	sound: number | "";
	setStory: (val: number) => void;
};

const ReviewRatings = ({
	story,
	setStory,
}: ReviewRatingsProps) => {
	return (
		<div className="flex justify-start my-4">

			<RatingInput label="Rating" value={story} onChange={setStory} />
		</div>
	);
};

export default ReviewRatings;
