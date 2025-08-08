"use client";

import { Profile } from "@/types/profile";
import { createClient } from "@/utils/supabase/client";

export async function checkIfFollowing(
	currentUserId: string,
	profileId: string,
) {
	const supabase = createClient();
	const { data, error } = await supabase
		.from("follows")
		.select("follower_id")
		.eq("follower_id", currentUserId)
		.eq("following_id", profileId)
		.single();

	return !!data;
}

export async function followUser(currentUserId: string, profileId: string) {
	const supabase = createClient();
	return supabase.from("follows").insert({
		follower_id: currentUserId,
		following_id: profileId,
	});
}

export async function unfollowUser(currentUserId: string, profileId: string) {
	const supabase = createClient();
	return supabase
		.from("follows")
		.delete()
		.eq("follower_id", currentUserId)
		.eq("following_id", profileId);
}

export async function getFollowersCount(profileId: string) {
	const supabase = createClient();

	const { count, error } = await supabase
		.from("follows")
		.select("*", { count: "exact", head: true })
		.eq("following_id", profileId);

	if (error) {
		console.error("Error fetching followers count:", error.message);
		return 0;
	}

	return count || 0;
}

export async function getFollowingCount(profileId: string) {
	const supabase = createClient();

	const { count, error } = await supabase
		.from("follows")
		.select("*", { count: "exact", head: true })
		.eq("follower_id", profileId);

	if (error) {
		console.error("Error fetching followers count:", error.message);
		return 0;
	}

	return count || 0;
}

export async function getUserReviewCount(userId: string) {
	const supabase = createClient();

	const { count, error } = await supabase
		.from("reviews")
		.select("*", { count: "exact", head: true })
		.eq("profile_id", userId);

	if (error) {
		console.error("Error fetching review count:", error.message);
		return 0;
	}

	return count || 0;
}

export async function getFollowingProfiles(
	profileId: string,
): Promise<Profile[]> {
	const supabase = createClient();

	const { data, error } = await supabase
		.from("follows")
		.select(
			"following:following_id(id, username, name, email, joined_at, avatar_url, description, avatar_updated_at)",
		)
		.eq("follower_id", profileId);

	if (error || !data) {
		console.error("Error fetching following profiles:", error?.message);
		return [];
	}

	return data.flatMap((entry) => entry.following);
}

export async function getFollowerProfiles(
	profileId: string,
): Promise<Profile[]> {
	const supabase = createClient();

	const { data, error } = await supabase
		.from("follows")
		.select(
			"follower:follower_id(id, username, name, email, joined_at, avatar_url, description, avatar_updated_at)",
		)
		.eq("following_id", profileId);

	if (error || !data) {
		console.error("Error fetching follower profiles:", error?.message);
		return [];
	}

	return data.flatMap((entry) => entry.follower);
}

export async function removeFollower(
	currentUserId: string,
	followerId: string,
) {
	const supabase = createClient();
	return supabase
		.from("follows")
		.delete()
		.eq("follower_id", followerId)
		.eq("following_id", currentUserId);
}

export const getPublicAvatarUrl = (
	filePath?: string | null,
	updatedAt?: string | null,
) => {
	if (!filePath) return null;

	const supabase = createClient();
	const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

	if (!data?.publicUrl) return null;

	const version = updatedAt ? new Date(updatedAt).getTime() : "";
	return version ? `${data.publicUrl}?v=${version}` : data.publicUrl;
};
