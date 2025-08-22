import { Profile } from "@/types/profile";
import { createClient } from "@/utils/supabase/client";
import { notFound } from "next/navigation";
import ProfilePageInfo from "../components/ProfilePageInfo";
import ReviewSection from "@/components/reviews/ReviewSection";
import { ProfileModalProvider } from "@/contexts/ProfileModalContext";

type Props = {
    params: Promise<{ id: string }>;
}

const ProfilePage = async ({ params }: Props) => {

    const { id } = await params;

    const supabase = createClient();

    const { data: userProfile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', id)
        .single<Profile>();

    if (!userProfile) {
        notFound();
    }

    return (
        <ProfileModalProvider>
            <div className='h-full max-w-[1200px] mx-auto px-4'>
                <div className="h-full w-full flex flex-col md:flex-row md:gap-12 items-stretch">
                    <div className="shrink-0">
                        <ProfilePageInfo profile={userProfile}/>
                    </div>
                    <div className="w-full">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold">Review History</h2>
                        </div>
                        <ReviewSection type="user" userProfile={userProfile}/>
                    </div>
                </div>
            </div>
        </ProfileModalProvider>
    );
};

export default ProfilePage;