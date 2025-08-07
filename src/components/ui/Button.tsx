"use client";

import React from "react";

type ButtonColor = "gray" | "blue" | "red" | "white" | "green";


type ButtonProps = {
	children?: React.ReactNode;
	onClick?: () => void;
	className?: string;
	color?: ButtonColor;
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
};

const getColorClasses = (color: ButtonColor) => {

	if (color === "gray") return "bg-gray-200 hover:bg-gray-300/90 text-gray-900";
	if (color === "blue") return "bg-blue-600/95 hover:bg-blue-700 text-white";
	if (color === "red") return "bg-red-600/90 hover:bg-red-600 text-white";
	if (color === "white") return "bg-white hover:bg-gray-100 text-black border border-gray-300";
	if (color === "green") return "bg-[#7A9D1B]/90 hover:bg-[#739517] text-white";
	return "";
};

export default function Button({
	children,
	onClick,
	className = "",
	color = "gray",
	disabled = false,
	type = "button"
}: ButtonProps) {
	const baseClasses =
		"px-4 py-[4px] rounded-full text-[15pxs] font-[550] transition-all duration-300 cursor-pointer w-auto box-border";

	const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

	const colorClasses = getColorClasses(color);

	const combined = `${baseClasses} ${colorClasses} ${disabledClasses} ${className}`;

	return (
		<button
			onClick={onClick}
			type={type}
			disabled={disabled}
			className={combined}
		>
			{children}
		</button>
	);
}
