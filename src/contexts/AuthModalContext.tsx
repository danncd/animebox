"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type AuthModalType = "login" | "register";

type AuthModalContextType = {
	formType: AuthModalType;
	setFormType: (type: AuthModalType) => void;
	toggleForm: () => void;
};

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
	const [formType, setFormType] = useState<AuthModalType>("login");

	const toggleForm = () => {
		setFormType((prev) => (prev === "login" ? "register" : "login"));
	};

	return (
		<AuthModalContext.Provider value={{ formType, setFormType, toggleForm }}>
			{children}
		</AuthModalContext.Provider>
	);
};

export const useAuthModal = () => {
	const context = useContext(AuthModalContext);
	if (!context) throw new Error("useAuthModal must be used within AuthModalProvider");
	return context;
};