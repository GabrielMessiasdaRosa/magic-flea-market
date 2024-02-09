import { create } from "zustand";
type NavbarMenuStore = {
  isOpen: boolean;
  setIsOpen: (isCollapsed: boolean) => void;
};

export const navbarMenuStore = create<NavbarMenuStore>((set) => ({
  isOpen: true,
  setIsOpen: (isCollapsed) => set({ isOpen: isCollapsed }),
}));
