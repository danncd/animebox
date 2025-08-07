import { NavigationProvider } from "@/contexts/NavigationContext";
import NavigationBar from "./NavigationBar";
import Sidebar from "./Sidebar";

const Navigation = () => {
    return (
        <NavigationProvider>
            <div className="w-full bg-white/85 backdrop-blur-sm h-16 fixed top-0 left-0 shadow-sm z-29">
                <NavigationBar/>
            </div>
            <Sidebar/>
        </NavigationProvider>
    );
};

export default Navigation;