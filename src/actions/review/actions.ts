import { createClient } from "@/utils/supabase/client";

export async function fetchReviews({
	mal_id,
	userId,
	sortOrder = "newest",
}: {
	mal_id?: number;
	userId?: string;
	sortOrder?: "newest" | "oldest";
}) {
	const supabase = createClient();

	let query = supabase
		.from("reviews")
		.select(
			`
                *,
                profiles:profiles!fk_profile (
                    username,
                    avatar_url
                ),
                anime:mal_id (title, image_url),
                review_likes:review_likes!review_likes_review_id_fkey (
                    profile_id
                ),
                review_comments(count)
            `
		)
		.order("created_at", { ascending: sortOrder === "oldest" });

	if (mal_id) {
		query = query.eq("mal_id", mal_id);
	}

	if (userId) {
		query = query.eq("profile_id", userId);
	}

	const { data, error } = await query;

	if (error) {
		console.error("Error fetching reviews:", error.message);
		return [];
	}

	return data;
}

export const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	}).format(date);
};

export const getScoreColor = (score: number) => {
	if (score >= 8) return "text-[#5FA711]";
	if (score >= 5) return "text-yellow-400";
	return "text-red-600";
};

export const getOverall = (
	story: number,
	animation: number,
	sounds: number,
) => {
	return parseFloat(((story + animation + sounds) / 3).toFixed(1));
};

export async function fetchAllReviews(sortOrder: "newest" | "oldest" = "newest") {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("reviews")
		.select(
			`
                *,
                profiles:profiles!fk_profile (
                    username,
                    avatar_url
                ),
                anime:mal_id (title, image_url),
                review_likes:review_likes!review_likes_review_id_fkey (
                    profile_id
                ),
                review_comments(count)
            `
		)
		.order("created_at", { ascending: sortOrder === "oldest" });

	if (error) {
		console.error("Error fetching all reviews:", error.message);
		return [];
	}

	return data;
}