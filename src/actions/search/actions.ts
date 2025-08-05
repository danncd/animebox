
export interface SearchParams {
	page?: string | string[];
	query?: string | string[];
	sort?: string | string[];
	tags?: string | string[];
}


export interface AnimeSearchParams {
	query?: string;
	sort?: string;
	tags: string[];
	page: number;
}

export function parseAnimeSearchParams(params: SearchParams): AnimeSearchParams {
	const getSingle = (val?: string | string[]) => {
		if (Array.isArray(val)) return val[0];
		return val;
	};

	const getAll = (val?: string | string[]) => {
		if (!val) return [];
		return Array.isArray(val) ? val : [val];
	};

	const pageStr = getSingle(params.page);
	const page = pageStr && !isNaN(Number(pageStr)) ? parseInt(pageStr) : 1;

	return {
		query: getSingle(params.query),
		sort: getSingle(params.sort),
		tags: getAll(params.tags),
		page,
	};
}