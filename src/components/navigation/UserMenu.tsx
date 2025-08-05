"use client";

import { createClient } from "@/utils/supabase/client";
import Avatar from "../ui/Avatar";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

type UserMenuProps = {
	onClose: () => void;
};

const UserMenu = ({ onClose }: UserMenuProps) => {
	
	const { user } = useAuth();
	const supabase = createClient();

	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			console.error("Logout failed:", error.message);
			return;
		}

        onClose();
		window.location.href = "/";
	};

	return (
		<div onClick={onClose} className="z-40 w-60 bg-white shadow-[0_0px_4px_rgba(0,0,0,0.22)] rounded absolute top-full mt-2 right-0 whitespace-nowrap">
            <Link href={`/profile/${user?.username}`}>
                <div className="flex flex-row gap-4 pr-5 cursor-pointer transition-all duration-300  ease-in-out hover:bg-gray-100 p-4 rounded-t">
                    <Avatar
                        avatarUrl={user?.avatar_url}
                        className="w-12 h-12"
                    />
                    <div className="flex flex-col justify-center">
                        <h3 className="font-[550] text-base">View Profile</h3>
                        <span className="text-gray-600 text-sm">{user?.username}</span>
                    </div>
                </div>
            </Link>
			<div>
				<button
					className="p-4 cursor-pointer font-[550] text-red-600"
					onClick={handleLogout}
				>
					Log out
				</button>
			</div>
		</div>
	);
};

export default UserMenu;
