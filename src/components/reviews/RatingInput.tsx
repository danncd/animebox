import React from "react";

type RatingInputProps = {
	label: string;
	value: number | "";
	onChange: (value: number) => void;
};

const RatingInput = ({ label, value, onChange }: RatingInputProps) => (
	<div className="flex flex-col items-center justify-center gap-2">
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
		<span className="font-gray-900 font-[550] text-sm py-1.5 min-w-23 text-center rounded-l-full">
			{label}
		</span>
	</div>
);

export default RatingInput;
