// components/ScrollLock.tsx
"use client";

import { useScrollStore } from "../hooks/store/scrollStore";
import { useEffect, useRef } from "react";

export const ScrollLock = () => {
  const { isScrollLocked, canScroll } = useScrollStore();
  const hasLockedScroll = useRef(false);
  const originalStyles = useRef({ body: '', html: '' });

  useEffect(() => {
    if (!isScrollLocked || canScroll) {
      // Restore scrolling
      if (hasLockedScroll.current) {
        requestAnimationFrame(() => {
          document.documentElement.style.overflow = originalStyles.current.html;
          document.body.style.overflow = originalStyles.current.body;
          hasLockedScroll.current = false;
        });
      }
    } else if (!hasLockedScroll.current) {
      // Store original styles
      originalStyles.current = {
        body: window.getComputedStyle(document.body).overflow,
        html: window.getComputedStyle(document.documentElement).overflow
      };
      
      // Lock scrolling
      requestAnimationFrame(() => {
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        hasLockedScroll.current = true;
      });
    }

    return () => {
      // Cleanup on unmount
      if (hasLockedScroll.current) {
        requestAnimationFrame(() => {
          document.documentElement.style.overflow = originalStyles.current.html;
          document.body.style.overflow = originalStyles.current.body;
          hasLockedScroll.current = false;
        });
      }
    };
  }, [isScrollLocked, canScroll]);

  return null;
};
