import { Profile } from "@/types/profile";
import { createClient } from "@/utils/supabase/client";
import { notFound } from "next/navigation";
import ProfilePageContent from "../components/ProfilePageContent";

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
        <div className='max-w-[1200px] mx-auto px-4'>
            <ProfilePageContent profile={userProfile}/>
        </div>
    );
};

export default ProfilePage;