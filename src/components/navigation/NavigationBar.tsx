import Center from "./navitems/Center";
import Left from "./navitems/Left";
import Right from "./navitems/Right";

const NavigationBar = () => {
    return (
        <div className="h-full max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-[2fr_1.5fr_1fr] items-center px-2 transition-all ease-in-out duration-300">
            <Left/>
            <Center/>
            <Right/>
        </div>
    );
};

export default NavigationBar;