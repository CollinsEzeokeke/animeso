// components/ScrollLock.tsx
"use client";

// import { useStore } from "@/hooks/store";
import { useEffect, useRef } from "react";

export const ScrollLock = () => {
    // const {isScrollAble} = useStore();
  // Use a ref to track whether we've already locked the scroll
  const hasLockedScroll = useRef(false);

  useEffect(() => {
    // Avoid re-locking if already locked
    if (hasLockedScroll.current) return;
    
    // Store original styles to restore them later
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const htmlOriginalStyle = window.getComputedStyle(document.documentElement).overflow;
    
    // Use requestAnimationFrame to batch style changes together
    // This prevents layout thrashing and improves performance
    requestAnimationFrame(() => {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      hasLockedScroll.current = true;
    });

    // Cleanup on unmount
    return () => {
      // Use requestAnimationFrame for cleanup as well
      requestAnimationFrame(() => {
        document.documentElement.style.overflow = htmlOriginalStyle;
        document.body.style.overflow = originalStyle;
        hasLockedScroll.current = false;
      });
    };
  }, []);

  return null;
};
