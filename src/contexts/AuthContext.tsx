'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type User = {
	id: string;
	email: string;
	name?: string;
	username?: string;
	avatar_url?: string | null;
	description?: string | null;
};

type AuthContextType = {
	user: User | null;
	setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType>({
	user: null,
	setUser: () => {},
});

export const AuthProvider = ({
	children,
	initialUser,
}: {
	children: React.ReactNode;
	initialUser: User | null;
}) => {

	const [user, setUser] = useState<User | null>(initialUser);
	const [userId, setUserId] = useState<string | null>(initialUser?.id ?? null);

	const supabase = createClient();

	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			if (session?.user) {
				setUserId(session.user.id);
			} else {
				setUser(null);
				setUserId(null);
			}
		});

		return () => subscription.unsubscribe();
	}, []);

	useEffect(() => {
		const fetchProfile = async () => {
			if (!userId) return;

			const { data: profile, error } = await supabase
				.from("profiles")
				.select("*")
				.eq("id", userId)
				.single();

			if (error) {
				console.error("Error fetching profile:", error.message);
				return;
			}

			setUser({
				id: profile.id,
				email: profile.email,
				name: profile.name,
				username: profile.username,
				avatar_url: profile.avatar_url,
				description: profile.description,
			});
		};

		fetchProfile();
	}, [userId]);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);