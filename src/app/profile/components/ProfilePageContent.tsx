import { Profile } from "@/types/profile";
import Image from 'next/image'

const NEW_USER_AVATAR = 'https://bdsfsiocacnfudhoikjs.supabase.co/storage/v1/object/public/avatars/main/newuser.png';
const AVATAR_URL = 'https://bdsfsiocacnfudhoikjs.supabase.co/storage/v1/object/public/avatars'

type Props = {
    profile: Profile;
}

const ProfilePageContent = ({ profile }: Props) => {
    return (
        <div>
            <div className="flex flex-col gap-2 justify-center items-center w-fit">
                <Image
                    src={`${AVATAR_URL}/${profile.avatar_url}` || NEW_USER_AVATAR}
                    alt={`${profile.username} avatar`}
                    width={150}
                    height={150}
                    className="rounded-full"
                />
                <h1>{profile.username}</h1>
            </div>
        </div>
    );
};

export default ProfilePageContent;