"use client";
import {
  useScroll,
  useMotionValueEvent,
  motion,
  useTransform,
} from "framer-motion";
import { useRef, useState, useCallback } from "react";
import PhoneTiltWork from "./phoneTiltWork";
import { useProgressor } from "@/hooks/store/store";
import { useWindowSize } from "@uidotdev/usehooks";
export default function SecondScrollOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);

  // Track scroll progress of the entire red container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end start", "start start"], // From when container enters view to when it leaves
  });

  const { setCurrentProgression } = useProgressor();
  const { height, width } = useWindowSize();

  // Create transform directly (not inside useMemo)
  const orangeHeight = useTransform(
    scrollYProgress,
    [0.99, 0.66], // Input range (from higher to lower scroll value)
    ["15vh", "83.5vh"] // Output range (from lower to higher height)
  );

  // Memoize the scroll event handler for better performance
  const handleScrollProgressChange = useCallback((latest: number) => {
    // Handle fixed state calculation
    if (latest > 0.99 || latest <= 0.66) {
      setIsFixed(false);
    } else {
      setIsFixed(true);
    }

    // Use threshold-based checks instead of exact equality
    const threshold = 0.01; // Adjust this value as needed

    // Optimize state updates by checking if we actually need to update
    if (Math.abs(latest - 0.99) < threshold) {
      setCurrentProgression(0.99);
    }
    else if (Math.abs(latest - 0.825) < threshold) {
      setCurrentProgression(0.825);
    }
    else if (Math.abs(latest - 0.66) < threshold) {
      setCurrentProgression(0.66);
    }
  }, [setCurrentProgression]);

  // Set up the scroll event listener
  useMotionValueEvent(scrollYProgress, "change", handleScrollProgressChange);

  // Memoize the class string to avoid recalculation on every render
  const phoneContainerClassName = () => {
    return `h-[80vh] w-[80%] z-[1000] ${
      isFixed
        ? "fixed top-[14.5vh] left-1/2 -translate-x-1/2"
        : "relative mx-auto"
    }`;
  }
  const responsive = () => {
    if(!height || !width) return;
    if(width > 768 && width <= 1397 && width != 1440) {
     return "mb-[9.5rem]"
    }
    return "mb-60"
   }
  return (
    <div
    // mb-60
      className={`h-[200vh] z-[60] relative bg-black ${responsive()}`}
      ref={containerRef}
    >
      <motion.div
        className="flex items-center bg-inherit justify-center text-white"
        style={{ 
          height: orangeHeight,
          willChange: "height" // Hardware acceleration hint
        }}
      />
      <motion.div
        className={phoneContainerClassName()}
      >
        <PhoneTiltWork />
      </motion.div>
    </div>
  );
}
