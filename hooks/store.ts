import { create } from "zustand";

type State = {
  isLocked: boolean;
  setIsLocked: (scrollAble: boolean) => void;
};

export const useStore = create<State>((set) => ({
  isLocked: false,
  setIsLocked: (scrollAble) => set({ isLocked: scrollAble }),
}));
