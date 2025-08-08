'use client';

import { checkIfFollowing, followUser, getFollowerProfiles, getFollowersCount, getFollowingCount, getFollowingProfiles, getPublicAvatarUrl, getUserReviewCount, unfollowUser } from "@/actions/profile/actions";
import { formatDate } from "@/actions/review/actions";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useAuth } from "@/contexts/AuthContext";
import { useProfileModal } from "@/contexts/ProfileModalContext";
import { Profile } from "@/types/profile";
import Image from 'next/image'
import { useEffect, useState } from "react";
import FollowerList from "./FollowerList";
import Link from "next/link";

export const NEW_USER_AVATAR = 'https://bdsfsiocacnfudhoikjs.supabase.co/storage/v1/object/public/avatars/main/newuser.png';
export const AVATAR_URL = 'https://bdsfsiocacnfudhoikjs.supabase.co/storage/v1/object/public/avatars'

type Props = {
    profile: Profile;
}

const ProfilePageInfo = ({ profile }: Props) => {

    const { user } = useAuth();
	const [followers, setFollowers] = useState(0);
    const [reviewsCount, setReviewsCount] = useState(0);
    const [following, setFollowing] = useState(0);
	const [isFollowing, setIsFollowing] = useState(false);

    const { isOpen, openModal, closeModal } = useProfileModal();
    const [modalType, setModalType] = useState<"followers" | "following" | null>(null);

    const [followerList, setFollowerList] = useState<Profile[]>([]);
    const [followingList, setFollowingList] = useState<Profile[]>([]);

    useEffect(() => {
        const fetchCounts = async () => {
            const [reviewCount, followerCount, followingCount, fetchedFollowerList, fetchedFollowingList] = await Promise.all([
                getUserReviewCount(profile.id),
                getFollowersCount(profile.id),
                getFollowingCount(profile.id),
                getFollowerProfiles(profile.id),
                getFollowingProfiles(profile.id),
            ]);

            setReviewsCount(reviewCount);
            setFollowers(followerCount);
            setFollowing(followingCount);
            setFollowerList(fetchedFollowerList);
            setFollowingList(fetchedFollowingList);
        };

        fetchCounts();
    }, [profile.id]);

	useEffect(() => {
		if (!user) return;

		(async () => {
			const [count, follows] = await Promise.all([
				getFollowersCount(profile.id),
				checkIfFollowing(user.id, profile.id),
			]);

			setFollowers(count);
			setIsFollowing(follows);
		})();
	}, [user?.id, profile.id]);

	const handleToggleFollow = async () => {
		if (!user) return;

		if (isFollowing) {
			await unfollowUser(user.id, profile.id);
			setFollowers((prev) => prev - 1);
		} else {
			await followUser(user.id, profile.id);
			setFollowers((prev) => prev + 1);
		}

		setIsFollowing((prev) => !prev);
	};

    return (
        <div className="sticky top-26 w-full md:w-fit flex flex-row md:flex-col items-start md:items-center justify-center gap-8 mt-4 mb-8">
            <div className="flex flex-col gap-6 justify-center items-start w-fit">
                <Image
                    src={`${getPublicAvatarUrl(profile.avatar_url, profile.avatar_updated_at)}` || NEW_USER_AVATAR}
                    alt={`${profile.username} avatar`}
                    width={150}
                    height={150}
                    className="rounded-full w-25 h-25 md:w-40 md:h-40"
                />
            </div>
            <div className="md:flex md:flex-col md:justify-center md:items-center md:gap-6 flex flex-col gap-4 md:mb-2">
                <div className="md:text-center flex flex-col gap-0">
                    <h1 className="font-bold text-lg">{profile.username}</h1>
                    <span className="text-xs text-gray-600">
                        Joined {formatDate(profile.joined_at)}
                    </span>
                </div>
                <div className="flex flex-row gap-5 w-fit">
                    <div className="flex flex-col items-center justify-center">
                        <span className="text-base font-bold">{reviewsCount}</span>
                        <span className="text-xs font-[500] text-gray-700">reviews</span>
                    </div>
                    <div
                        onClick={() => {
                            setModalType("followers");
                            openModal();
                        }}
                        className="flex flex-col items-center justify-center cursor-pointer"
                    >
                        <span className="text-base font-bold">{followers}</span>
                        <span className="text-xs font-[500] text-gray-700">followers</span>
                    </div>
                    <div 
                        onClick={() => {
                            setModalType("following");
                            openModal();
                        }}
                        className="flex flex-col items-center justify-center cursor-pointer"
                    >
                        <span className="text-base font-bold">{following}</span>
                        <span className="text-xs font-[500] text-gray-700">following</span>
                    </div>
                </div>
                <div className="md:hidden flex flex-row gap-2">
                    {user && user.id !== profile.id && (
                        <Button onClick={handleToggleFollow}>
                            {isFollowing ? "Unfollow" : "Follow"}
                        </Button>
                    )}
                    {user && user.id === profile.id && <Link href={`/profile/settings`}><Button>Edit</Button></Link>}
                </div>
            </div>
            <div className="hidden md:flex flex-row gap-2">
                {user && user.id !== profile.id && (
                    <Button onClick={handleToggleFollow}>
                        {isFollowing ? "Unfollow" : "Follow"}
                    </Button>
                )}
                {user && user.id === profile.id && <Link href={`/profile/settings`}><Button>Edit</Button></Link>}
            </div>
            <Modal isOpen={isOpen} onClose={closeModal}>
                {modalType === "followers" && <FollowerList list={followerList} type="follower" pageProfile={profile}/>}
                {modalType === "following" && <FollowerList list={followingList} type="following" pageProfile={profile}/>}
            </Modal>
        </div>
    );
};

export default ProfilePageInfo;