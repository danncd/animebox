'use client';

import { createContext, useContext, useState } from 'react';

type SettingsPageModalContextType = {
  isProfileImageModalOpen: boolean;
  openProfileImageModal: () => void;
  closeProfileImageModal: () => void;
};

const SettingsPageModalContext = createContext<SettingsPageModalContextType | undefined>(undefined);

export const SettingsPageModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isProfileImageModalOpen, setIsProfileImageModalOpen] = useState(false);

  const openProfileImageModal = () => setIsProfileImageModalOpen(true);
  const closeProfileImageModal = () => setIsProfileImageModalOpen(false);

  return (
    <SettingsPageModalContext.Provider
      value={{ isProfileImageModalOpen, openProfileImageModal, closeProfileImageModal }}
    >
      {children}
    </SettingsPageModalContext.Provider>
  );
};

export const useSettingsPageModal = () => {
  const context = useContext(SettingsPageModalContext);
  if (!context) {
    throw new Error('useSettingsPageModal must be used within a SettingsPageModalProvider');
  }
  return context;
};