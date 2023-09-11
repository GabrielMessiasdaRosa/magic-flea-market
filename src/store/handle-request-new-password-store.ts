"use client";
import { create } from "zustand";

type Store = {
  status: "idle" | "pending" | "success" | "error";
  updateStatus: (status: "idle" | "pending" | "success" | "error") => void;
  finished: boolean;
  asyncErrors: {
    email?: string;
    password?: string;
  };
  setAsyncErrors: (errors: { email?: string; password?: string }) => void;
};

export const handleRequestNewPasswordStore = create<Store>()((set) => ({
  status: "idle",
  updateStatus: (status) => {
    set({ status });
    if (status === "success" || status === "error") {
      set({ finished: true });
    }
  },
  asyncErrors: {},
  finished: false,
  setAsyncErrors: (errors) => set({ asyncErrors: errors }),
}));
