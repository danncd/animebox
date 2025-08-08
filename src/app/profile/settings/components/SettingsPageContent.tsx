'use client';

import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useAuth } from "@/contexts/AuthContext";
import { useSettingsPageModal } from "@/contexts/SettingsPageModalContext";
import ImageCropper from "./ImageCropper";

const SettingsPageContent = () => {

    const { user } = useAuth();
    const {
        isProfileImageModalOpen,
        openProfileImageModal,
        closeProfileImageModal,
    } = useSettingsPageModal();

    return (
        <div className="w-full">
            <div className="my-4 h-20 md:h-30 flex flex-row gap-4 md:gap-6">
                <Avatar
                    avatarUrl={user?.avatar_url || ""}
                    className="w-20 h-20 md:w-30 md:h-30"
                />
                <div className="h-full flex flex-col py-2">
                    <h3 className="font-bold text-base">Change your profile picture</h3>
                    <div className="flex-grow flex items-center justify-center">
                        <Button onClick={openProfileImageModal}>Change Photo</Button>
                    </div>
                </div>
            </div>
            <Modal isOpen={isProfileImageModalOpen} onClose={closeProfileImageModal}>
                <ImageCropper closeModal={closeProfileImageModal}/>
            </Modal>
        </div>
    );
};

export default SettingsPageContent;