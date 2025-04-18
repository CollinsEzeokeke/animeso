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


type ThirdScrollOverlay = {
  thirdScrollProgress: number;
  setThirdScrollProgress: (progress: number) => void;
};

export const useThirdScrollOverlay = create<ThirdScrollOverlay>((set) => ({
  thirdScrollProgress: 0,
  setThirdScrollProgress: (progress) => set({ thirdScrollProgress: progress }),
}));

type ScaleStoreType = {
  nowScale: number;
  setNowState: (now: number) => void;
}

export const useScaleStore = create<ScaleStoreType>((set) => ({
  nowScale: 0,
  setNowState: (now) => set({nowScale: now})
}))