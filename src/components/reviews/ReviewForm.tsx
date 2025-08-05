"use client";

import { Anime } from "@/types/anime";
import ReviewEditor from "./ReviewEditor";
import { useEffect, useState } from "react";
import { Review } from "@/types/review";
import ReviewRatings from "./ReviewRatings";
import Button from "../ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/utils/supabase/client";

type Props = {
	anime: Anime;
};
const ReviewForm = ({ anime }: Props) => {
	const [story, setStory] = useState<number | "">(0);
	const [animation, setAnimation] = useState<number | "">(0);
	const [sound, setSound] = useState<number | "">(0);
	const [editorContent, setEditorContent] = useState("");
	const [error, setError] = useState("");
	const [existingReview, setExistingReview] = useState<Review | null>(null);

	const { user } = useAuth();
	const supabase = createClient();

	useEffect(() => {
		if (!user) return;

		const fetchReview = async () => {
			const { data } = await supabase
				.from("reviews")
				.select("*")
				.eq("profile_id", user.id)
				.eq("mal_id", anime.mal_id)
				.maybeSingle();

			if (data) {
				setExistingReview(data);
				setStory(data.story_score);
				setAnimation(data.animation_score);
				setSound(data.sound_score);
				setEditorContent(data.content);
			}
		};

		fetchReview();
	}, [user, anime.mal_id, supabase]);

	const handleSubmit = async () => {
		setError("");

		if (!user) {
			setError("You must be logged in.");
			return;
		}

		const isInvalid = [story, animation, sound].some(
			(val) => val === "" || isNaN(Number(val)),
		);
		if (isInvalid) {
			setError("All scores must be numbers between 0 and 10.");
			return;
		}

		const textOnly = editorContent
			.replace(/<[^>]+>/g, "")
			.replace(/&nbsp;/g, "")
			.trim();
		if (!textOnly) {
			setError("Review content is required.");
			return;
		}

		const paragraphBlocks = editorContent.match(/<p>(.*?)<\/p>/g) || [];
		let consecutiveEmpty = 0;
		for (const p of paragraphBlocks) {
			const inner = p
				.replace(/<[^>]+>/g, "")
				.replace(/&nbsp;/g, "")
				.trim();
			if (inner === "") {
				consecutiveEmpty++;
				if (consecutiveEmpty > 1) {
					setError("Too many blank lines between content.");
					return;
				}
			} else {
				consecutiveEmpty = 0;
			}
		}

		const reviewData = {
			profile_id: user.id,
			mal_id: anime.mal_id,
			content: editorContent,
			story_score: Math.min(Number(story), 10),
			animation_score: Math.min(Number(animation), 10),
			sound_score: Math.min(Number(sound), 10),
		};

		let error;
		if (existingReview) {
			({ error } = await supabase
				.from("reviews")
				.update({ ...reviewData, updated_at: new Date().toISOString() })
				.eq("id", existingReview.id));
		} else {
			({ error } = await supabase.from("reviews").insert(reviewData));
		}

		if (error) {
			setError("Error saving review: " + error.message);
		} else {
			window.location.reload();
		}
	};

	const handleDelete = async () => {
		if (!existingReview) return;

		const { error } = await supabase
			.from("reviews")
			.delete()
			.eq("id", existingReview.id);

		if (error) {
			setError("Error deleting review: " + error.message);
		} else {
			window.location.reload();
		}
	};

	return (
		<div>
			<ReviewRatings
				story={story}
				animation={animation}
				sound={sound}
				setStory={setStory}
				setAnimation={setAnimation}
				setSound={setSound}
			/>
			<ReviewEditor
				content={editorContent}
				onChange={setEditorContent}
			/>
			<div className="my-6 flex flex-row items-center justify-end gap-4">
				{error && <p className="text-left text-red-800 text-sm bg-red-100 rounded-full py-2 px-4 w-full break-words whitespace-pre-wrap">
					{error}
				</p>}
				{existingReview && (
					<Button
						color="red"
						className="!py-2 !px-12 flex-0 whitespace-nowrap"
						onClick={handleDelete}
					>
						Delete
					</Button>
				)}
				<Button
					color="blue"
					className="!py-2 !px-12 flex-0 whitespace-nowrap"
					onClick={handleSubmit}
				>
					Save Review
				</Button>
			</div>
		</div>
	);
};

export default ReviewForm;
