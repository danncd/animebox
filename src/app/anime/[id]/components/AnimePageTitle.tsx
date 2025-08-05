type Props = {
	title: string;
	alt_titles: string[];
};

const AnimePageTitle = ({ title, alt_titles }: Props) => {
	return (
		<div className="mb-6">
			<h1 className="font-[600] text-2xl">{title}</h1>
			<h2 className="text-base font-[550] text-gray-500">
				{alt_titles?.length > 0 && alt_titles.join(", ")}
			</h2>
		</div>
	);
};

export default AnimePageTitle;
