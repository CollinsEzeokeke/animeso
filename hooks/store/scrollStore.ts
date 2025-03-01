import { create } from 'zustand';

interface ScrollState {
  isScrollLocked: boolean;
  canScroll: boolean;
  setScrollLock: (locked: boolean) => void;
  setCanScroll: (can: boolean) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  isScrollLocked: true,
  canScroll: false,
  setScrollLock: (locked) => set({ isScrollLocked: locked }),
  setCanScroll: (can) => set({ canScroll: can }),
}));