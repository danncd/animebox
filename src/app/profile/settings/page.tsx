"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import SettingsPageContent from "./components/SettingsPageContent";
import { SettingsPageModalProvider } from "@/contexts/SettingsPageModalContext";

const SettingsPage = () => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/");
        }
    }, [user, router]);

    if (!user) return null;

    return (
        <SettingsPageModalProvider>
            <div className='max-w-[1200px] mx-auto px-4 w-full'>
                <div className="mb-10">
                    <h1 className="font-bold text-2xl">Profile Settings</h1>
                    <h2 className="text-base font-[550] text-gray-500">Edit your account details</h2>
                </div>
                <SettingsPageContent />
            </div>
        </SettingsPageModalProvider>
    );
};

export default SettingsPage;