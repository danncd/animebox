"use client";

import { Profile } from "@/types/profile";
import Image from "next/image";
import { AVATAR_URL, NEW_USER_AVATAR } from "./ProfilePageInfo";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import {
	removeFollower,
	unfollowUser,
	followUser,
} from "@/actions/profile/actions";
import { useState } from "react";

type Props = {
	list: Profile[];
	type: "follower" | "following";
	pageProfile: Profile;
};

const FollowerList = ({ list, type, pageProfile }: Props) => {
	const { user } = useAuth();

	const [removedFollowerIds, setRemovedFollowerIds] = useState<string[]>([]);

	const [followingIds, setFollowingIds] = useState<string[]>(
		list.map((p) => p.id),
	);

	const handleUnfollow = async (profileId: string) => {
		if (!user) return;

		const isFollowing = followingIds.includes(profileId);

		if (isFollowing) {
			const { error } = await unfollowUser(user.id, profileId);
			if (!error) {
				setFollowingIds((prev) =>
					prev.filter((id) => id !== profileId),
				);
			} else {
				console.error("Failed to unfollow:", error.message);
			}
		} else {
			const { error } = await followUser(user.id, profileId);
			if (!error) {
				setFollowingIds((prev) => [...prev, profileId]);
			} else {
				console.error("Failed to follow:", error.message);
			}
		}
	};

	const handleRemove = async (followerId: string) => {
		if (!user) return;

		const { error } = await removeFollower(user.id, followerId);
		if (!error) {
			setRemovedFollowerIds((prev) => [...prev, followerId]);
		} else {
			console.error("Failed to remove follower:", error.message);
		}
	};

	return (
		<div className="w-full">
			<div className="mb-4">
				<h3 className="text-lg font-bold">
					{type === "follower" ? "Follower " : "Following"} List
				</h3>
			</div>
            {list.length <= 0 && 
                <div className="text-gray-500 font-[500]">Nothing to show</div>
            }
			<div className="w-full flex flex-col gap-2">
				{list.map((profile) => (
					<div
						key={profile.id}
						className="w-full flex flex-row items-center justify-between"
					>
						<Link href={`/profile/${profile.username}`}>
							<div className="flex flex-row text-gray-900 items-center gap-4 font-[600]">
								<Image
									src={
										`${AVATAR_URL}/${profile.avatar_url}` ||
										NEW_USER_AVATAR
									}
									width={100}
									height={100}
									alt={`${profile.username} avatar`}
									className="w-11 h-11 rounded-full"
								/>
								<span>{profile.username}</span>
							</div>
						</Link>
						{user &&
							user.id === pageProfile.id &&
							(type === "follower" ? (
								removedFollowerIds.includes(profile.id) ? (
									<div className="text-gray-500 font-[500]">
										Removed
									</div>
								) : (
									<Button
										onClick={() => handleRemove(profile.id)}
									>
										Remove
									</Button>
								)
							) : (
								<Button
									onClick={() => handleUnfollow(profile.id)}
								>
									{followingIds.includes(profile.id)
										? "Unfollow"
										: "Follow"}
								</Button>
							))}
					</div>
				))}
			</div>
		</div>
	);
};

export default FollowerList;