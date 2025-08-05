import { createClient } from "@/utils/supabase/server";

export async function fetchAnimeById(id: number | string) {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("anime")
		.select("*")
		.eq("mal_id", id)
		.maybeSingle();

	if (error) {
		console.error(`Error fetching anime with ID ${id}:`, error.message);
		return null;
	}

	return data;
}