// components/ScrollLock.tsx
"use client";

// import { useStore } from "@/hooks/store";
import { useEffect } from "react";

export const ScrollLock = () => {
    // const {isScrollAble} = useStore();
  useEffect(() => {
    // Lock scroll on mount
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    // Cleanup on unmount
      return () => {
        document.documentElement.style.overflow = "auto";
        document.body.style.overflow = "auto";
      };
  }, []);

  return null;
};
