
export function getAnimeSeason(date = new Date()) {
	const month = date.getMonth();
	const year = date.getFullYear();

	if (month >= 0 && month <= 2) return { season: "Winter", year };
	if (month >= 3 && month <= 5) return { season: "Spring", year };
	if (month >= 6 && month <= 8) return { season: "Summer", year };
	return { season: "Fall", year };
}