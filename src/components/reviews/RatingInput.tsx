import React from "react";

type RatingInputProps = {
	label: string;
	value: number | "";
	onChange: (value: number) => void;
};

const RatingInput = ({ label, value, onChange }: RatingInputProps) => (
	<div className="flex flex-row items-center justify-center gap-8">
		<span className="font-gray-900 font-[550] text-lg text-center rounded-l-full">
			{label}
		</span>
		<span className="h-1 w-1 bg-black rounded-full"></span>
		<div className="">
			<input
				required
				type="number"
				min={0}
				max={10}
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
				className="py-1.5 focus:outline-none text-base font-bold"
			/>
			<span className="font-bold text-base">/ 10</span>
		</div>
	</div>
);

export default RatingInput;
