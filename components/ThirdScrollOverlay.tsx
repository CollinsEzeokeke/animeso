"use client";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import StackedDesktops from "./stackedDesktops";
import { useThirdScrollOverlay } from "@/hooks/store/store";
import Image from "next/image";

export default function ThirdScrollOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [yValue, setYValue] = useState(140);
  const { setThirdScrollProgress, thirdScrollProgress } =
    useThirdScrollOverlay();

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
      setYValue(140);
    }
    if (Math.abs(latest - 0.7933) < threshold) {
      setThirdScrollProgress(0.7933);
      setYValue(140);
    }
    if (Math.abs(latest - 0.5967) < threshold) {
      setThirdScrollProgress(0.5967);
      setYValue(50);
    }
    if (Math.abs(latest - 0.4) < threshold) {
      setThirdScrollProgress(0.4);
      setYValue(20);
    }
  });

  const renderImageLeft = () => {
    if (thirdScrollProgress >= 0.99) {
      return (
        <div className="w-[15%] h-[50%] flex items-center justify-end"></div>
      );
    } else if (thirdScrollProgress >= 0.7933) {
      return (
        <div className="w-[10%] h-[50%] flex items-center justify-end">
          <Image
            src="/feature-integrations-left.png"
            alt="mailTodos"
            width={700}
            height={600}
            className="translate-x-8"
          />
        </div>
      );
    } else if (thirdScrollProgress >= 0.5967) {
      return (
        <div className="w-[30%] h-[50%] flex items-center justify-end">
          <Image
            src="/feature-bar-event.png"
            alt="mailTodos"
            width={800}
            height={700}
            className="translate-x-10 "
          />
        </div>
      );
    } else if (thirdScrollProgress >= 0.44) {
      return "";
    } else {
      // Default nothing if not in the right range
      return " ";
    }
  };
  const renderImageRight = () => {
    if (thirdScrollProgress >= 0.99) {
      return "";
    } else if (thirdScrollProgress >= 0.7933) {
      return (
        <Image
          src="/feature-integrations-right.png"
          alt="mailTodos"
          width={200}
          height={200}
          className="translate-x-5 "
        />
      );
    } else if (thirdScrollProgress >= 0.5967) {
      return " ";
    } else if (thirdScrollProgress >= 0.4) {
      // side calendar stuff
      return <></>;
    } else {
      // Default nothing if not in the right range
      return " ";
    }
  };

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
        {/* ${
            isFixed ? "fixed top-[13vh] h-[30vh]" : "relative"
          }  */}
        <motion.div
          className={`w-[45%] -mt-20 z-0`}
          style={{ y: yValue }}
        >
          <span className="flex flex-col gap-2 space-y-0 items-start justify-around ">
            <span className="text-3xl font-semibold flex flex-col justify-around h-[10%] gap-2 pt-0">
              <span className={`${thirdScrollProgress >= 0.99 ? "text-white" : "text-[#a4a1a195]"}`}>
                Emails are closer than ever to your todos
              </span>
              <span className={`${thirdScrollProgress >= 0.99 ? "text-white" : "text-[#a4a1a195]"} w-full`}>
                <span>and calendar.</span>
                <span className={`${thirdScrollProgress >= 0.7933 && thirdScrollProgress != 0.99 ? "text-white" : "text-[#a4a1a195]"}`}> No need to break up with</span>
              </span>
            </span>

            <span className="text-3xl font-semibold  mt-0">
              {" "}
              <span className={`${thirdScrollProgress >= 0.7933 && thirdScrollProgress != 0.99 ? "text-white" : "text-[#a4a1a195]"}`}> your apps, just connect them. </span>
              <span className={`${thirdScrollProgress >= 0.5967 && thirdScrollProgress != 0.7933 && thirdScrollProgress != 0.99 ? "text-white" : "text-[#a4a1a195]"}`}>Like to</span>
            </span>
            <span className={`text-3xl font-semibold ${thirdScrollProgress >= 0.5967 && thirdScrollProgress != 0.7933 ? "text-white" : "text-[#a4a1a195]"}`}>
              {" "}
              miss meetings? Not with Amie in the
            </span>
            <span className=" text-3xl font-semibold">
              <span className={`${thirdScrollProgress >= 0.5967 && thirdScrollProgress != 0.7933 ? "text-white" : "text-[#a4a1a195]"}`}>menubar. </span>
              <span className={`${thirdScrollProgress >= 0.4 && thirdScrollProgress != 0.5967 ? "text-white" : "text-[#a4a1a195]"}`}>Share your free slots with</span>
            </span>
            <span className="text-3xl font-semibold justify-self-start">
              <span className={`${thirdScrollProgress >= 0.4 && thirdScrollProgress != 0.5967 ? "text-white" : "text-[#a4a1a195]"}`}>anyone you like.</span>
            </span>
          </span>
        </motion.div>

        <StackedDesktops />
        <div className="h-full flex justify-evenly items-center w-full absolute z-0">
          {/* periodic image on the left */}
          {renderImageLeft()}
          <div className="w-[40%] h-[50%] flex items-center justify-end">
            {/* periodic image on the right */}
            {renderImageRight()}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
