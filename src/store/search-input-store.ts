import { create } from "zustand";
type SearchInputStore = {
  isOpen: boolean;
  setIsOpen: (isCollapsed: boolean) => void;
};

export const searchInputStore = create<SearchInputStore>((set) => ({
  isOpen: false,
  setIsOpen: (isCollapsed) => set({ isOpen: isCollapsed }),
}));
