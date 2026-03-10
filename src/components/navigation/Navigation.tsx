import { NavigationProvider } from "@/contexts/NavigationContext";
import NavigationBar from "./NavigationBar";
import Sidebar from "./Sidebar";

const Navigation = () => {
    return (
        <NavigationProvider>
            <div className="max-w-190 mx-auto h-16 z-29 mb-4">
                <NavigationBar/>
            </div>
            <Sidebar/>
        </NavigationProvider>
    );
};

export default Navigation;