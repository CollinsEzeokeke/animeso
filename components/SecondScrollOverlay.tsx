"use client";
import {
  useScroll,
  useMotionValueEvent,
  motion,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import PhoneTiltWork from "./phoneTiltWork";


export default function SecondScrollOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);

  // Track scroll progress of the entire red container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end start", "start start"], // From when container enters view to when it leaves
  });

  //  equal division into three main points and equal at the same time from 0.99 to 0.66
  // 

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

    console.log("Scroll progress:", latest, "Fixed:", isFixed);
  });

  return (
    <div className="h-[130vh] bg-red-500 z-[60] relative mb-56" ref={containerRef}>
      {/* Red container contents - you can add more elements here */}
      {/* h-[25vh]  */}
      <motion.div
        className=" flex items-center bg-orange-300 justify-center text-white"
        style={{ height: orangeHeight }}
      >
        Scroll down to see the fixed blue container
      </motion.div>

      {/* Blue container - conditionally fixed based on scroll */}
      <motion.div
        className={`h-[80vh] bg-blue-500 w-[80%] z-[1000] ${
          isFixed
            ? "fixed top-[14.5vh] left-1/2 -translate-x-1/2"
            : "relative mx-auto"
        }
         `}
        //  ${isFixed2 ? "mt-[50vh]" : ""}
        style={
          {
            // opacity: blueContainerOpacity
          }
        }
      >
       <PhoneTiltWork />
      </motion.div>

      {/* Placeholder when blue container is fixed */}
      {isFixed && (
        <div className="h-[50vh] w-[80%] mx-auto opacity-0">Placeholder</div>
      )}

      {/* More content for scrolling
      <div className="h-[55vh] flex items-end justify-center pb-10 text-white">
        Keep scrolling to unfix the blue container
      </div> */}
    </div>
  );
}
