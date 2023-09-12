import { create } from "zustand";
type MobileNavbarMenuStore = {
  isOpen: boolean;
  setIsOpen: (isCollapsed: boolean) => void;
};

export const mobileNavbarMenuStore = create<MobileNavbarMenuStore>((set) => ({
  isOpen: true,
  setIsOpen: (isCollapsed) => set({ isOpen: isCollapsed }),
}));
