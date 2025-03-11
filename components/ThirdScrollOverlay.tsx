"use client";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import StackedDesktops from "./stackedDesktops";

export default function ThirdScrollOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);

  // Track scroll progress of the entire red container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end start", "start start"], // From when container enters view to when it leaves
  });

  const orangeHeight = useTransform(
    scrollYProgress,
    [0.99, 0.66], // Input range (from higher to lower scroll value)
    ["15vh", "63.5vh"] // Output range (from lower to higher height)
  );
  // Monitor scroll progress and set fixed state
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("this is the latest value: ", latest)
    if (latest > 0.99 || latest <= 0.66) {
      setIsFixed(false);
    } else {
      setIsFixed(true);
    }
  });

  return (
    <div
      className="h-[200vh] bg-black z-[60] relative mb-56"
      ref={containerRef}
    >
      <motion.div
        className=" flex items-center bg-inherit justify-center text-white"
        style={{ height: orangeHeight }}
      />
      <motion.div
        className={`h-[80vh] w-[80%] z-[1000] flex items-center justify-center ${
          isFixed
            ? "fixed top-[14.5vh] left-1/2 -translate-x-1/2"
            : "relative mx-auto"
        }
         `}
      > 
        <StackedDesktops />
      </motion.div>
    </div>
  );
}
