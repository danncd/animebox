"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type ProfileModalContextType = {
	isOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
};

const ProfileModalContext = createContext<ProfileModalContextType | undefined>(
	undefined,
);

export const ProfileModalProvider = ({ children }: { children: ReactNode }) => {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);

	return (
		<ProfileModalContext.Provider value={{ isOpen, openModal, closeModal }}>
			{children}
		</ProfileModalContext.Provider>
	);
};

export const useProfileModal = (): ProfileModalContextType => {
	const context = useContext(ProfileModalContext);
	if (!context) {
		throw new Error(
			"useProfileModal must be used within a ProfileModalProvider",
		);
	}
	return context;
};
