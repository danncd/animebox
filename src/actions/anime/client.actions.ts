import { createClient } from "@/utils/supabase/client";

export async function fetchTags() {
    const supabase = createClient();
    const { data: tagRows } = await supabase
		.from("anime")
		.select("themes, genres")
		.not("themes", "is", null)
		.not("genres", "is", null);

	const genreSet = new Set<string>();
	const themeSet = new Set<string>();

	tagRows?.forEach((row) => {
		const themes =
			typeof row.themes === "string"
				? JSON.parse(row.themes)
				: row.themes;
		const genres =
			typeof row.genres === "string"
				? JSON.parse(row.genres)
				: row.genres;

		if (Array.isArray(themes))
			themes.forEach((tag: string) => themeSet.add(tag));
		if (Array.isArray(genres))
			genres.forEach((tag: string) => genreSet.add(tag));
	});

    const availableGenres = Array.from(genreSet).sort();
	const availableThemes = Array.from(themeSet).sort();

    return ([availableGenres, availableThemes]);

}

const PAGE_SIZE = 42;

export async function fetchSearchedAnime(
	query: string,
	sort: string,
	tags: string[],
	page: number
): Promise<{ data: any[]; count: number }> {
	const supabase = createClient();

	const from = (page - 1) * PAGE_SIZE;
	const to = from + PAGE_SIZE - 1;

	if (query) {
		const { data, error, count } = await supabase
			.rpc("search_anime", {	
				q: query,
				genre_tags: tags,
				theme_tags: tags,
			}, {
				count: "exact",
				head: false
			})
			.range(from, to);

		if (error) {
			console.error("Error fetching anime (RPC):", error);
			return { data: [], count: 0 };
		}

		return { data: data || [], count: count ?? 0 };
	}

	let queryBuilder = supabase
		.from("anime")
		.select("*", { count: "exact" })
		.range(from, to)
		.eq("is_active", true);

	if (tags.length > 0) {
		const conditions = tags.flatMap((tag) => [
			`genres.cs.{${tag}}`,
			`themes.cs.{${tag}}`,
		]);
		queryBuilder = queryBuilder.or(conditions.join(","));
	}

	switch (sort) {
		case "score":
			queryBuilder = queryBuilder.order("score", { ascending: false, nullsFirst: false });
			break;
		case "year":
			queryBuilder = queryBuilder.order("year", { ascending: false, nullsFirst: false });
			break;
		case "updated":
			queryBuilder = queryBuilder.order("updated_at", { ascending: false, nullsFirst: false });
			break;
		default:
			queryBuilder = queryBuilder.order("score", { ascending: false, nullsFirst: false });
			break;
	}

	const { data, count, error } = await queryBuilder;

	if (error) {
		console.error("Error fetching anime:", error);
		return { data: [], count: 0 };
	}

	return { data: data || [], count: count ?? 0 };
}
import { Anime } from "@/types/anime";

export async function fetchTrendingAnime(): Promise<Anime[]> {
	try {
		const res = await fetch("https://api.jikan.moe/v4/seasons/now");

		if (!res.ok) throw new Error("Failed to fetch anime");

		const json = await res.json();

		const uniqueMap = new Map<number, any>();
		for (const anime of json.data) {
			uniqueMap.set(anime.mal_id, anime);
		}

		const trendingRaw = Array.from(uniqueMap.values())
			.sort((a, b) => (b.members ?? 0) - (a.members ?? 0))
			.slice(0, 10);

		const trending: Anime[] = trendingRaw.map((anime: any) => ({
			mal_id: anime.mal_id,
			title: anime.title,
			synopsis: anime.synopsis ?? null,
			image_url: anime.images?.jpg?.large_image_url ?? null, // large image here
			score: anime.score ?? null,
			episodes: anime.episodes ?? null,
			year: anime.year ?? null,
			genres: anime.genres?.map((g: any) => g.name) ?? null,
			themes: anime.themes?.map((t: any) => t.name) ?? null,
			alt_titles: [
				anime.title_english,
				anime.title_japanese,
				...(anime.title_synonyms ?? []),
			].filter(Boolean),
			studio_name: anime.studios?.[0]?.name ?? null,
			studio_id: anime.studios?.[0]?.mal_id ?? null,
			status: anime.status ?? null,
			aired: anime.aired?.string ?? null,
			premiered: anime.season ? `${anime.season} ${anime.year}` : null,
			duration: anime.duration ?? null,
			rating: anime.rating ?? null,
			start_date: anime.aired?.from ?? null,
			is_active: true,
			updated_at: new Date().toISOString(),
		}));

		return trending;
	} catch (error) {
		console.error("Error fetching trending anime:", error);
		return [];
	}
}