// components/ScrollLock.tsx
"use client";

import { useScrollStore } from "../hooks/store/scrollStore";
import { useEffect, useRef } from "react";

export const ScrollLock = () => {
  const { isScrollLocked, canScroll } = useScrollStore();
  const hasLockedScroll = useRef(false);
  const originalStyles = useRef({ body: '', html: '' });
  
  // Use a more optimized scroll locking mechanism
  useEffect(() => {
    // Skip state changes that don't affect the lock state
    const shouldLock = isScrollLocked && !canScroll;
    
    if (!shouldLock && !hasLockedScroll.current) {
      // Already in the correct state
      return;
    }
    
    if (shouldLock && !hasLockedScroll.current) {
      // Cache original values only once
      if (!originalStyles.current.body && !originalStyles.current.html) {
        originalStyles.current = {
          body: window.getComputedStyle(document.body).overflow,
          html: window.getComputedStyle(document.documentElement).overflow
        };
      }
      
      // Use direct style manipulation instead of requestAnimationFrame
      // Only update if needed
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      hasLockedScroll.current = true;
    } else if (!shouldLock && hasLockedScroll.current) {
      // Only update if needed
      document.documentElement.style.overflow = originalStyles.current.html;
      document.body.style.overflow = originalStyles.current.body;
      hasLockedScroll.current = false;
    }
    
    return () => {
      // Cleanup on unmount - only if needed
      if (hasLockedScroll.current) {
        document.documentElement.style.overflow = originalStyles.current.html;
        document.body.style.overflow = originalStyles.current.body;
        hasLockedScroll.current = false;
      }
    };
  }, [isScrollLocked, canScroll]);

  // Return null - this component has no UI
  return null;
};
