'use client';

import Button from "@/components/ui/Button";
import { useRef, useState } from "react";
import Modal from "@/components/ui/Modal";
import AuthForm from "@/components/auth/AuthForm";
import { AuthModalProvider } from "@/contexts/AuthModalContext";
import Avatar from "@/components/ui/Avatar";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import UserMenu from "../UserMenu";
import { useAuth } from "@/contexts/AuthContext";

const Right = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

	useOutsideClick(menuRef, () => setIsUserMenuOpen(false));

    const { user } = useAuth();

    return (
        <div className="relative h-full flex justify-end items-center">
            
            {user ? (
                <div ref={menuRef} className="relative h-full flex items-center">
                    <Avatar 
                        
                        onClick={() => setIsUserMenuOpen((prev) => !prev)}
                        avatarUrl={user?.avatar_url} className="w-10 h-10"
                    />
                    {isUserMenuOpen && <UserMenu onClose={() => setIsUserMenuOpen(false)} />}
                </div>
            ) : (
                <>
                    <Button color="gray" onClick={openModal}>Login</Button>
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <AuthModalProvider>
                            <AuthForm/>
                        </AuthModalProvider>
                    </Modal>
                </>
            )}
        </div>
    );
};

export default Right;