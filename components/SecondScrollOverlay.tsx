"use client";
import {
  useScroll,
  useMotionValueEvent,
  motion,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import PhoneTiltWork from "./phoneTiltWork";
import { useProgressor } from "@/hooks/store/store";

export default function SecondScrollOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);

  // Track scroll progress of the entire red container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end start", "start start"], // From when container enters view to when it leaves
  });

  const { setCurrentProgression } = useProgressor();

  //  equal division into three main points and equal at the same time from 0.99 to 0.66
  // is: 0.99 to 0.825 to 0.66

  const orangeHeight = useTransform(
    scrollYProgress,
    [0.99, 0.66], // Input range (from higher to lower scroll value)
    ["15vh", "63.5vh"] // Output range (from lower to higher height)
  );
  // Monitor scroll progress and set fixed state
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.99 || latest <= 0.66) {
      setIsFixed(false);
    } else {
      setIsFixed(true);
    }

    // Use threshold-based checks instead of exact equality
    const threshold = 0.01; // Adjust this value as needed

    if (Math.abs(latest - 0.99) < threshold) {
      setCurrentProgression(0.99);
    }
    if (Math.abs(latest - 0.825) < threshold) {
      setCurrentProgression(0.825);
    }
    if (Math.abs(latest - 0.66) < threshold) {
      setCurrentProgression(0.66);
    }
  });

  return (
    <div
      className="h-[130vh] bg-inherit z-[60] relative mb-56"
      ref={containerRef}
    >
      <motion.div
        className=" flex items-center bg-inherit justify-center text-white"
        style={{ height: orangeHeight }}
      />
      <motion.div
        className={`h-[80vh] bg-blue-500 w-[80%] z-[1000] ${
          isFixed
            ? "fixed top-[14.5vh] left-1/2 -translate-x-1/2"
            : "relative mx-auto"
        }
         `}
      >
        <PhoneTiltWork />
      </motion.div>
    </div>
  );
}
