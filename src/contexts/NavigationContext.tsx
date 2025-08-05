"use client";

import { createContext, useContext, useState } from "react";

const NavigationContext = createContext<{
	isSidebarOpen: boolean;
	openSidebar: () => void;
	closeSidebar: () => void;
	isLoginOpen: boolean;
	openLogin: () => void;
	closeLogin: () => void;
}>({
	isSidebarOpen: false,
	openSidebar: () => {},
	closeSidebar: () => {},
	isLoginOpen: false,
	openLogin: () => {},
	closeLogin: () => {},
});

export const NavigationProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isLoginOpen, setIsLoginOpen] = useState(false);

	return (
		<NavigationContext.Provider
			value={{
				isSidebarOpen,
				openSidebar: () => setIsSidebarOpen(true),
				closeSidebar: () => setIsSidebarOpen(false),
				isLoginOpen,
				openLogin: () => setIsLoginOpen(true),
				closeLogin: () => setIsLoginOpen(false),
			}}
		>
			{children}
		</NavigationContext.Provider>
	);
};

export const useNavigation = () => useContext(NavigationContext);