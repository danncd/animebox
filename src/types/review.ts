export type Review = {
	id: string;
	profile_id: string;
	mal_id: number;
	content: string;
	story_score: number;
	animation_score: number;
	sound_score: number;
	created_at: string;
	updated_at: string | null;
	profiles: {
		username: string;
		avatar_url: string | null;
		avatar_updated_at: string | null;
	} | null;
	review_likes: {
		profile_id: string;
	}[];
	review_comments: { count: number }[];
	anime?: {
		title: string;
		image_url: string;
	} | null;
};