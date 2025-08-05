import Link from "next/link";

const Center = () => {
    return (
        <div className="hidden flex-row justify-center items-center md:flex">
            <Link href={`/anime/all`} className="font-[600]">Anime</Link>
        </div>
    );
};

export default Center;