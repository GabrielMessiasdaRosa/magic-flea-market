import { create } from "zustand";
type SearchCollapsableInputStore = {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
};

export const searchCollapsableInputStore = create<SearchCollapsableInputStore>(
  (set) => ({
    isCollapsed: true,
    setIsCollapsed: (isCollapsed) => set({ isCollapsed }),
  }),
);
