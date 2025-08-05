const Banner = () => {
    return (
        <div className="infinite-scroll-bg transition-all duration-300 ease-in-out -mt-6 relative h-26 sm:h-36 w-full shadow-sm flex flex-row items-center justify-center gap-5 md:gap-5 lg:gap-25 xl:gap-45 px-2 overflow-hidden">
            <img src="/cat.png" alt="" className="transition-all duration-300 ease-in-out hidden sm:block w-21 min-w-21"/>
            <div className="transition-all duration-300 ease-in-out flex flex-col items-center justify-center h-full text-center md:gap-2">
                <h1 className="transition-all duration-300 ease-in-out font-[900] text-3xl sm:text-3xl md:text-5xl">Welcome to ANIMEBOX</h1>
                <p className="transition-all duration-300 ease-in-out font-[600] text-sm md:text-lg">See what others think of your favorite anime!</p>
            </div>
            <img src="/cat2.png" alt="" className="transition-all duration-300 ease-in-out hidden sm:block w-21 min-w-21`"/>
        </div>
    );
};

export default Banner;