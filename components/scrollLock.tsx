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


// // components/ScrollLock.tsx
// "use client";

// import { useScrollStore } from "../hooks/store/scrollStore";
// import { useEffect, useRef, useCallback } from "react";
// import { useWindowSize } from "@uidotdev/usehooks";

// export const ScrollLock = () => {
//   const { isScrollLocked, canScroll } = useScrollStore();
//   const hasLockedScroll = useRef(false);
//   // Store original style values to restore them later
//   const originalStyle = useRef<{ overflow?: string; touchAction?: string; height?: string }>({});
//   const { height } = useWindowSize();
  
//   // Memoize functions with useCallback for better performance
//   const lockScroll = useCallback(() => {
//     if (hasLockedScroll.current) return; // Already locked, skip
    
//     // Cache the original styles only once
//     if (!originalStyle.current.overflow) {
//       originalStyle.current = {
//         overflow: document.body.style.overflow,
//         touchAction: document.body.style.touchAction,
//         height: document.body.style.height
//       };
//     }

//     // Direct style manipulation for better performance
//     document.body.style.overflow = "hidden";
//     document.body.style.height = "100%";
    
//     // For mobile devices, disable touch actions on small screens
//     if (height && height <= 800) {
//       document.body.style.touchAction = "none";
//     }
    
//     hasLockedScroll.current = true;
//   }, [height]);
  
//   const unlockScroll = useCallback(() => {
//     if (!hasLockedScroll.current) return; // Not locked, skip
    
//     // Restore original styles
//     document.body.style.overflow = originalStyle.current.overflow || "";
//     document.body.style.touchAction = originalStyle.current.touchAction || "";
//     document.body.style.height = originalStyle.current.height || "";
    
//     hasLockedScroll.current = false;
//   }, []);
  
//   // Use a more optimized scroll locking mechanism
//   useEffect(() => {
//     const shouldLock = isScrollLocked && !canScroll;
    
//     if (!shouldLock && !hasLockedScroll.current) {
//       // Do nothing since we're already in the right state
//       return;
//     }
    
//     if (shouldLock && !hasLockedScroll.current) {
//       lockScroll();
//     } else if (!shouldLock && hasLockedScroll.current) {
//       unlockScroll();
//     }
    
//     // Cleanup on unmount only if needed
//     return () => {
//       if (hasLockedScroll.current) {
//         unlockScroll();
//       }
//     };
//   }, [isScrollLocked, canScroll, lockScroll, unlockScroll]);

//   // No need to render anything
//   return null;
// };

