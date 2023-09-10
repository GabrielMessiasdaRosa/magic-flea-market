import { create } from "zustand";

type Store = {
  status: "idle" | "pending" | "success" | "error";
  updateStatus: (status: "idle" | "pending" | "success" | "error") => void;

  asyncErrors: {
    email?: string;
    password?: string;
  };
  setAsyncErrors: (errors: { email?: string; password?: string }) => void;
};

export const loginRequestStatus = create<Store>()((set) => ({
  status: "idle",
  updateStatus: (status) => set({ status }),
  asyncErrors: {},
  setAsyncErrors: (errors) => set({ asyncErrors: errors }),
}));
