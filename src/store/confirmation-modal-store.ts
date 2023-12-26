import { create } from "zustand";
type LogoutConfirmationModalStore = {
  isConfirmationModalOpen: boolean;
  setIsConfirmationModalOpen: (open: boolean) => void;
};

export const logoutConfirmationModalStore =
  create<LogoutConfirmationModalStore>((set) => ({
    isConfirmationModalOpen: false,
    setIsConfirmationModalOpen: (open) =>
      set({ isConfirmationModalOpen: open }),
  }));
