"use server";

import { createClient } from "@/utils/supabase/server";

type ActionState = {
	error: string | null;
	success?: boolean;
};

export async function login(_: ActionState, formData: FormData): Promise<ActionState> {
	const supabase = await createClient();

	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	if (error) {
		return { error: error.message };
	}

	return { error: null, success: true };
}

export async function signup(_: ActionState, formData: FormData): Promise<ActionState> {
	const supabase = await createClient();

	const name = formData.get("name") as string;
	const username = formData.get("username") as string;
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				name,
				username,
			},
		},
	});

	if (signUpError) {
		return { error: signUpError.message };
	}

	const user = signUpData.user;

	if (!user) {
		return { error: "User not returned from signUp" };
	}

	const { error: insertError } = await supabase.from("profiles").insert({
		id: user.id,
		email,
		name,
		username,
		joined_at: new Date().toISOString(),
		avatar_url: null,
	});

	if (insertError) {
		return { error: insertError.message };
	}

	return { error: null, success: true };
}

export async function getInitialUser() {
	const supabase = await createClient();
	const { data: { user } } = await supabase.auth.getUser();

	if (!user) return null;

	const { data: profile, error } = await supabase
		.from("profiles")
		.select("id, email, name, username, avatar_url")
		.eq("id", user.id)
		.single();

	if (!error && profile) {
		return {
			id: profile.id,
			email: profile.email || "",
			name: profile.name || "",
			username: profile.username || "",
			avatar_url: profile.avatar_url || null,
		};
	}

	return {
		id: user.id,
		email: user.email || "",
		name: user.user_metadata?.name || "",
		username: user.user_metadata?.username || "",
		avatar_url: null,
	};
}