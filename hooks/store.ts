import { create } from "zustand";

type State = {
  isScrollAble: boolean;
  setScrollAble: (scrollAble: boolean) => void;
};

export const useStore = create<State>((set) => ({
  isScrollAble: false,
  setScrollAble: (scrollAble) => set({ isScrollAble: scrollAble }),
}));
