"use client";

import { useActionState, useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { signup } from "@/actions/auth/actions";

const initialState = { error: null };

const RegisterForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const { setFormType } = useAuthModal();

	const [state, formAction] = useActionState(signup, initialState);
	const { setUser } = useAuth();

	useEffect(() => {
		if (state?.success) {
			async function fetchUser() {
				const supabase = createClient();
				const {
				data: { user },
				} = await supabase.auth.getUser();

				if (user) {
					setUser({
						id: user.id,
						email: user.email || "",
						name: user.user_metadata?.name || "",
						username: user.user_metadata?.username || "",
						avatar_url: user.user_metadata?.avatar_url || null,
					});
				}

			
			}
			fetchUser();
			window.location.reload();
		}
	}, [state, setUser]);

	return (
		<div className="px-2">
			<div className="text-center my-6 font-[550] text-[18px]">
				Create an Account
			</div>
			<form action={formAction}>
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-1">
						<label
							htmlFor="name"
							className="text-gray-600 font-medium text-sm"
						>
							Name
						</label>
						<input
							className="border border-gray-300 rounded placeholder:text-sm focus:outline-gray-300 focus:outline-1 py-2 px-3 w-full text-base"
							placeholder="Name"
							id="name"
							name="name"
							type="name"
							required
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label
							htmlFor="username"
							className="text-gray-600 font-medium text-sm"
						>
							Username
						</label>
						<input
							className="border border-gray-300 rounded placeholder:text-sm focus:outline-gray-300 focus:outline-1 py-2 px-3 w-full text-base"
							placeholder="Username"
							id="username"
							name="username"
							type="username"
							required
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label
							htmlFor="email"
							className="text-gray-600 font-[550] text-sm"
						>
							Email Address
						</label>
						<input
							className="border border-gray-300 rounded placeholder:text-sm focus:outline-gray-300 focus:outline-1 py-2 px-3 w-full text-base"
							placeholder="Email"
							id="email"
							name="email"
							type="email"
							required
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label
							htmlFor="password"
							className="text-gray-600 font-[550] text-sm"
						>
							Password
						</label>
						<div className="relative">
							<input
								className="border border-gray-300 rounded placeholder:text-sm focus:outline-gray-300 focus:outline-1 py-2 px-3 w-full text-base pr-15"
								placeholder="Password"
								id="password"
								name="password"
								type={showPassword ? "text" : "password"}
								required
							/>
							<button
								type="button"
								onClick={() => setShowPassword((prev) => !prev)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-900 font-bold text-xs cursor-pointer"
							>
								{showPassword ? "HIDE" : "SHOW"}
							</button>
						</div>
					</div>
				</div>
				<div className="mt-10 mb-6 w-full flex flex-col items-center justify-center gap-4">
					{state.error && (
						<p className="text-left text-red-800 text-sm bg-red-100 rounded-full py-2 px-4 w-full break-words whitespace-pre-wrap">
							{state.error}
						</p>
					)}
					<Button className="w-full" color="blue">
						Login
					</Button>
					<span>
						Already have an account?{" "}
						<span
							onClick={() => setFormType("login")}
							className="cursor-pointer text-blue-800 font-[550] pb-[2px] border-b-2 border-blue-800"
						>
							Login Here
						</span>
					</span>
				</div>
			</form>
		</div>
	);
};

export default RegisterForm;
