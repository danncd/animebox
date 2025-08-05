import React from "react";
import RatingInput from "./RatingInput";

type ReviewRatingsProps = {
	story: number | "";
	animation: number | "";
	sound: number | "";
	setStory: (val: number) => void;
	setAnimation: (val: number) => void;
	setSound: (val: number) => void;
};

const ReviewRatings = ({
	story,
	animation,
	sound,
	setStory,
	setAnimation,
	setSound,
}: ReviewRatingsProps) => {
	return (
		<div className="relative grid grid-cols-3 gap-6 items-center justify-center my-6">
			<div className="hidden md:flex flex-col items-center absolute left-1/3 top-0 bottom-0">
				<div className="w-px h-full bg-gray-300 my-2" />
			</div>
			<div className="hidden md:flex flex-col items-center absolute left-2/3 top-0 bottom-0">
				<div className="w-px h-full bg-gray-300 my-2" />
			</div>

			<RatingInput label="Story" value={story} onChange={setStory} />
			<RatingInput
				label="Animation"
				value={animation}
				onChange={setAnimation}
			/>
			<RatingInput label="Sounds" value={sound} onChange={setSound} />
		</div>
	);
};

export default ReviewRatings;
