"use client";
import React from "react";

const NEW_USER_AVATAR =
	"https://bdsfsiocacnfudhoikjs.supabase.co/storage/v1/object/public/avatars/main/newuser.png";
const AVATAR_BASE_URL =
	"https://bdsfsiocacnfudhoikjs.supabase.co/storage/v1/object/public/avatars/";

type AvatarProps = {
	avatarUrl?: string | null;
	onClick?: () => void;
	className?: string;
};

const Avatar = ({ avatarUrl, onClick, className = "" }: AvatarProps) => {
	const src = avatarUrl
		? `${AVATAR_BASE_URL}${avatarUrl}`
		: NEW_USER_AVATAR;

	return (
		<img
			src={src}
			alt="User avatar"
			onClick={onClick}
			className={`rounded-full object-cover cursor-pointer ${className}`}
		/>
	);
};

export default Avatar;