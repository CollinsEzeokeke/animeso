"use client";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
// import StackedDesktops from "./stackedDesktops";
import { useThirdScrollOverlay } from "@/hooks/store/store";

export default function ThirdScrollOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);
  const { setThirdScrollProgress } = useThirdScrollOverlay();

  // Track scroll progress of the entire red container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end start", "start start"], // From when container enters view to when it leaves
  });

  const orangeHeight = useTransform(
    scrollYProgress,
    [0.99, 0.4], // Input range (from higher to lower scroll value)
    ["15vh", "134.5vh"] // Output range (from lower to higher height)
  );
  // Monitor scroll progress and set fixed state
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("this is the latest value: ", latest);
    // equal distances 0.40 ───── 0.5967 ───── 0.7933 ───── 0.99
    if (latest > 0.99 || latest <= 0.4) {
      setIsFixed(false);
    } else {
      setIsFixed(true);
    }

    // Use threshold-based checks instead of exact equality
    const threshold = 0.01; // Adjust this value as needed

    if (Math.abs(latest - 0.99) < threshold) {
      setThirdScrollProgress(0.99);
    }
    if (Math.abs(latest - 0.7933) < threshold) {
      setThirdScrollProgress(0.7933);
    }
    if (Math.abs(latest - 0.5967) < threshold) {
      setThirdScrollProgress(0.5967);
    }
    if (Math.abs(latest - 0.4) < threshold) {
      setThirdScrollProgress(0.4);
    }
  });

  return (
    <div
      className="h-[200vh] bg-black z-[60] relative mb-56"
      ref={containerRef}
    >
      <motion.div
        className=" flex items-center bg-blue-500 justify-center text-white"
        style={{ height: orangeHeight }}
      />
      <motion.div
        className={`h-[80vh] w-[80%] z-[60] flex flex-col items-center justify-center ${
          isFixed
            ? "fixed top-[13vh] left-1/2 -translate-x-1/2"
            : "relative mx-auto"
        }
         `}
      >
        <div
          className={`bg-orange-500 w-[45%] ${
            isFixed ? "fixed top-[13vh] h-[30vh]" : "relative"
          }  z-0`}
        >
          <span className="flex flex-col gap-3 space-y-2">
            {/* <span className="bg-red-500 text-3xl font-semibold ">
              Emails are closer than even to your todos and calendar.
              <span className="text-3xl font-semibold">
                {" "}
                No need to break up with
              </span>
            </span> */}

            <span className="bg-red-500 text-3xl font-semibold space-x-2">
              <span className="bg-blue-500">
                Emails are closer than ever to your todos and calendar.
              </span>
              <span>No need to break up with</span>
            </span>

            <span className="text-3xl font-semibold">
              {" "}
              your apps, just connect them.{" "}
            </span>
            {/* <span> Like to miss meetings? Not with Amie in the menubar.</span>
            <span> Share your free slots with anyone you like.</span> */}
          </span>
        </div>
        {/* <StackedDesktops /> */}
        {/* <div className="bg-pink-500 h-full w-full absolute z-0"/> */}
      </motion.div>
    </div>
  );
}
