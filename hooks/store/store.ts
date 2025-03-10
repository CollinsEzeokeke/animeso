import { create } from "zustand";

type State = {
  isLocked: boolean;
  setIsLocked: (scrollAble: boolean) => void;
};

export const useStore = create<State>((set) => ({
  isLocked: false,
  setIsLocked: (scrollAble) => set({ isLocked: scrollAble }),
}));

type SectionProgressor = {
  currentProgression: number;
  setCurrentProgression: (progress: number) => void;
};

export const useProgressor = create<SectionProgressor>((set) => ({
  currentProgression: 0.99,
  setCurrentProgression: (progress) => set({ currentProgression: progress }),
}));
