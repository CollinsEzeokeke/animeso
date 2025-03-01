"use client";

import { useWindowSize } from "@uidotdev/usehooks";
import { useScroll, useAnimation, motion, useMotionValue } from "framer-motion";
import { Flame } from "lucide-react";
import { useRef, useEffect, useMemo, memo } from "react";

// Memoize button content to prevent unnecessary re-renders
const UpdateButton = memo(({ width }: { width: number | null }) => (
  <motion.a
    href="https://amie.so/changelog"
    target="_blank"
    className={`rounded-3xl h-11 ${width === 1440 ? "w-[12%]" : ""} ${width === 1024 ? "w-[20%] -mt-2" : ""} ${width === 768 ? "w-[25%] -mt-2" : ""} ${width && width < 768 ? "hidden" : ""} bg-[#999999] hover:bg-[#858585] flex items-center justify-center text-sm font-bold text-white font-sans top-7 fixed z-[100]`}
  >
    <Flame className="text-white -mt-1 size-4 font-black stroke-[4px] rotate-[15deg]" />
    <button className="p-1 font-sans">Last Update: Feb 12</button>
  </motion.a>
));

UpdateButton.displayName = "UpdateButton";

// Memoize nav buttons to prevent unnecessary re-renders
const NavButtons = memo(() => (
  <div className="fixed right-0 top-7 pr-6 md:pr-10 flex font-medium gap-6">
    <div className="text-base text-black">
      <a
        href="https://calendar.amie.so/login"
        className="hover:opacity transition-opacity"
      >
        <span className="bg-gradient-to-br animate-backgroundAnimate from-black/60 to-black/30 inline-block text-transparent bg-clip-text">
          Sign in
        </span>
      </a>
    </div>
    <div className="text-base">
      <a
        href="https://calendar.amie.so/login"
        className="hover:opacity-80 transition-opacity bg-black text-white px-4 py-2 rounded-md"
      >
        Get started
      </a>
    </div>
  </div>
));

NavButtons.displayName = "NavButtons";

const DirectionAwareScrollComponent = () => {
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const isScrollingUp = useRef(false);
  const controls = useAnimation();
  const returnThreshold = 100; // Pixels from top to trigger return
  const isHeaderVisible = useMotionValue(true);

  // Spring configuration for natural bounce
  const springConfig = useMemo(() => ({
    type: "spring",
    stiffness: 400,
    damping: 30,
    restDelta: 0.001,
    delay: 0.1,
  }), []);
  
  const { width } = useWindowSize();

  useEffect(() => {
    let animationFrameId: number | null = null;
    let lastTimestamp = 0;
    
    const updateScrollDirection = (timestamp: number) => {
      // Limit updates to 60fps (approx 16ms)
      if (timestamp - lastTimestamp < 16) {
        animationFrameId = requestAnimationFrame(updateScrollDirection);
        return;
      }
      
      lastTimestamp = timestamp;
      const current = scrollY.get();
      
      // Only update when there's a meaningful change
      if (Math.abs(current - lastScrollY.current) < 1) {
        animationFrameId = requestAnimationFrame(updateScrollDirection);
        return;
      }
      
      const wasScrollingUp = isScrollingUp.current;
      isScrollingUp.current = current < lastScrollY.current;
      lastScrollY.current = current;
      
      // Only animate when direction changes or when near top
      if (isScrollingUp.current !== wasScrollingUp || current < returnThreshold) {
        if (isScrollingUp.current) {
          // Only update if header is not already visible
          if (!isHeaderVisible.get()) {
            controls.start({
              y: "0%",
              transition: springConfig,
            });
            isHeaderVisible.set(true);
          }
        } else if (current >= returnThreshold) {
          // Only update if header is visible
          if (isHeaderVisible.get()) {
            controls.start({
              y: "-100%",
              transition: {
                type: "tween",
                ease: "easeOut",
                duration: 0.35,
              },
            });
            isHeaderVisible.set(false);
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(updateScrollDirection);
    };

    animationFrameId = requestAnimationFrame(updateScrollDirection);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [controls, scrollY, springConfig, isHeaderVisible, returnThreshold]);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      className="w-screen h-[9.5vh] bg-[#BFBFBF] fixed top-0 z-30 overflow-hidden"
      style={{ 
        willChange: "transform",
        transform: "translateZ(0)" // Hardware acceleration
      }}
    >
      <motion.nav
        animate={controls}
        className="w-full min-h-[9vh] flex justify-center items-center absolute top-0"
        initial={{ y: "0%" }}
        style={{ 
          willChange: "transform",
          transform: "translateZ(0)" // Hardware acceleration
        }}
      >
        <UpdateButton width={width} />
        <NavButtons />
      </motion.nav>
    </motion.div>
  );
};

export default memo(DirectionAwareScrollComponent);
