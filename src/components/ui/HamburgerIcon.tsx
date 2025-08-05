const HamburgerIcon = () => {
    return (
        <div className="flex flex-col gap-[3px] cursor-pointer p-1">
            <div className="w-4 h-[2.5px] bg-gray-800 rounded" />
            <div className="w-4 h-[2.5px] bg-gray-800 rounded" />
            <div className="w-4 h-[2.5px] bg-gray-800 rounded" />
        </div>
    );
};

export default HamburgerIcon;