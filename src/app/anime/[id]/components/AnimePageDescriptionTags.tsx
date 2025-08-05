import Button from "@/components/ui/Button";
import { Anime } from "@/types/anime";
import Link from "next/link";

type Props = {
    anime: Anime;
};

const AnimePageDescriptionTags = ({ anime }: Props) => {
	return (
		<div className="flex flex-col gap-3">
			<div className="flex flex-col gap-4 py-2">
				<h3 className="font-[550] text-[18px]">Overview</h3>
				<p>{anime.synopsis}</p>
			</div>
			<div className="py-2 flex flex-col gap-3">
				<h3 className="font-[550] text-[18px]">Tags</h3>
				<div className="flex flex-wrap gap-2">
					{[...(anime.genres ?? []), ...(anime.themes ?? [])].map(
						(tag: string, index: number) => (
							<Link
								key={index}
								href={{
									pathname: "/anime/all",
									query: {
									page: 1,
									tags: tag,
									},
								}}
								>
								<Button
									color="gray"
									className="text-sm !text-gray-700"
								>
									{tag}
								</Button>
							</Link>
						),
					)}
				</div>
			</div>
		</div>
	);
};

export default AnimePageDescriptionTags;
