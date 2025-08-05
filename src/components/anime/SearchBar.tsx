"use client";

import { fetchTags } from "@/actions/anime/client.actions";
import { useEffect, useState, useRef } from "react";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const SearchBar = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [searchTerm, setSearchTerm] = useState("");
	const queryParam = searchParams.get("query") || "";
    const [filtersVisible, setFiltersVisible] = useState(false);

    const filtersRef = useRef<HTMLDivElement>(null);
    const [maxHeight, setMaxHeight] = useState("0px");

	useEffect(() => {
		setSearchTerm(queryParam);
	}, [queryParam]);

	const [selectedTags, setSelectedTags] = useState<string[]>(
		searchParams.getAll("tags") || [],
	);

	const toggleTag = (tag: string) => {
		setSelectedTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
		);
	};

	const [genres, setGenres] = useState<string[]>([]);
	const [themes, setThemes] = useState<string[]>([]);

	useEffect(() => {
		const loadTags = async () => {
			const [availableGenres, availableThemes] = await fetchTags();
			setGenres(availableGenres);
			setThemes(availableThemes);
		};

		loadTags();
	}, []);

    useEffect(() => {
        if (filtersVisible && filtersRef.current) {
            requestAnimationFrame(() => {
                setMaxHeight(`${filtersRef.current!.scrollHeight}px`);
            });
        } else {
            setMaxHeight("0px");
        }
    }, [filtersVisible, genres, themes]);

    const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		const params = new URLSearchParams(searchParams.toString());

		if (searchTerm) {
			params.set("query", searchTerm);
		} else {
			params.delete("query");
		}

		params.delete("tags");
		selectedTags.forEach(tag => params.append("tags", tag));
		params.set("page", "1");
        setFiltersVisible(false);

		router.push(`?${params.toString()}`);
	};
    useEffect(() => {
        const handleResize = () => {
            if (filtersVisible && filtersRef.current) {
                setMaxHeight(`${filtersRef.current.scrollHeight}px`);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [filtersVisible]);

	return (
		<form onSubmit={handleSearch} className="flex flex-col py-6">
            <div className="flex flex-col md:flex-row gap-2 items-center">
				<input
					type="text"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="border border-gray-300 bg-white rounded-full px-4 py-2 w-full focus:outline-none"
					placeholder="Search anime..."
				/>
                <div className="flex flex-row gap-2 w-full flex-1">
                    <Button
                    type="submit"
                    color="blue"
                    className="!py-2 !min-w-35 w-full"
                >
                        Search
                </Button>
                <Button
                    type="button"
                    onClick={() => setFiltersVisible(!filtersVisible)}
                    className="whitespace-nowrap !py-2 !min-w-35 w-full"
                >
                        {filtersVisible ? "Hide Filters" : "Show Filters"}
                </Button>
                </div>
			</div>
            <div>
				{selectedTags.length > 0 && (
					<div className="flex flex-wrap gap-2 pt-4">
						{selectedTags.map((tag) => (
							<Button key={tag} 
								onClick={() => toggleTag(tag)}
                                color= "blue"
							>x {tag}</Button>
						))}
					</div>
				)}
			</div>
            <div
                ref={filtersRef}
                style={{
                    maxHeight,
                    overflow: "hidden",
                    transition: "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out",
                    opacity: filtersVisible ? 1 : 0,
                }}
                className="flex flex-col"
            >
                <div className="flex flex-col gap-2 py-4">
                    <div>
                        <span className="font-bold text-lg">Genres</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {genres.map((genre) => (
                            <Button
                                onClick={() => toggleTag(genre)}
                                key={genre}
                                color={selectedTags.includes(genre) ? "blue" : "gray"}
                                className="text-sm !px-3"
                            >
                                {genre}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div>
                        <span className="font-bold text-lg">Themes</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {themes.map((themes) => (
                            <Button
                                onClick={() => toggleTag(themes)}
                                key={themes}
                                color={selectedTags.includes(themes) ? "blue" : "gray"}
                                className="text-sm !px-3"
                            >
                                {themes}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </form>
	);
};

export default SearchBar;
