"use client";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState, useMemo, useCallback } from "react";
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

  // Create transform directly
  const orangeHeight = useTransform(
    scrollYProgress,
    [0.99, 0.4], // Input range (from higher to lower scroll value)
    ["15vh", "134.5vh"] // Output range (from lower to higher height)
  );

  // Memoize the scroll event handler for better performance
  const handleScrollProgressChange = useCallback((latest: number) => {
    // Handle fixed state calculation
    if (latest > 0.99 || latest <= 0.4) {
      setIsFixed(false);
    } else {
      setIsFixed(true);
    }

    // Use threshold-based checks instead of exact equality
    const threshold = 0.01; // Adjust this value as needed

    // Optimize with else-if to avoid unnecessary state updates
    if (Math.abs(latest - 0.99) < threshold) {
      setThirdScrollProgress(0.99);
      setYValue(140);
    } 
    else if (Math.abs(latest - 0.7933) < threshold) {
      setThirdScrollProgress(0.7933);
      setYValue(140);
    } 
    else if (Math.abs(latest - 0.5967) < threshold) {
      setThirdScrollProgress(0.5967);
      setYValue(50);
    } 
    else if (Math.abs(latest - 0.4) < threshold) {
      setThirdScrollProgress(0.4);
      setYValue(20);
    }
  }, [setThirdScrollProgress]);

  // Set up the scroll event listener
  useMotionValueEvent(scrollYProgress, "change", handleScrollProgressChange);

  // Memoize the container class
  const containerClassName = useMemo(() => {
    return `h-[80vh] w-[80%] z-[60] flex flex-col items-center justify-start ${
      isFixed
        ? "fixed top-[13vh] left-1/2 -translate-x-1/2"
        : "relative mx-auto"
    }`;
  }, [isFixed]);

  // Memoize the text content class names based on thirdScrollProgress
  const textClasses = useMemo(() => {
    return {
      firstText: thirdScrollProgress >= 0.99 ? "text-white" : "text-[#a4a1a195]",
      secondText: thirdScrollProgress >= 0.7933 && thirdScrollProgress !== 0.99 ? "text-white" : "text-[#a4a1a195]",
      thirdText: thirdScrollProgress >= 0.5967 && thirdScrollProgress !== 0.7933 && thirdScrollProgress !== 0.99 ? "text-white" : "text-[#a4a1a195]",
      fourthText: thirdScrollProgress >= 0.4 && thirdScrollProgress !== 0.5967 && thirdScrollProgress !== 0.7933 && thirdScrollProgress !== 0.99 ? "text-white" : "text-[#a4a1a195]"
    };
  }, [thirdScrollProgress]);

  // Memoize the left image render function
  const renderImageLeft = useCallback(() => {
    if (thirdScrollProgress >= 0.99) {
      return (
        <div className="w-[15%] h-[50%] flex items-center justify-end"></div>
      );
    } else if (thirdScrollProgress >= 0.7933) {
      return (
        <div className="w-[10%] h-[50%] flex items-center justify-start">
          <Image
            src="/feature-integrations-left.png"
            alt="mailTodos"
            width={800}
            height={800}
            className="-translate-x-3"
            priority={true}
          />
        </div>
      );
    } else if (thirdScrollProgress >= 0.5967) {
      return (
        <div className="w-[25%] h-[50%] flex items-center justify-end">
          <Image
            src="/feature-bar-event.png"
            alt="mailTodos"
            width={800}
            height={700}
            className="-translate-x-5"
            priority={true}
          />
        </div>
      );
    } else if (thirdScrollProgress >= 0.44) {
      return "";
    } else {
      // Default nothing if not in the right range
      return " ";
    }
  }, [thirdScrollProgress]);

  // Memoize the right image render function
  const renderImageRight = useCallback(() => {
    if (thirdScrollProgress >= 0.99) {
      return "";
    } else if (thirdScrollProgress >= 0.7933) {
      return (
        <Image
          src="/feature-integrations-right.png"
          alt="mailTodos"
          width={150}
          height={150}
          className="translate-x-5"
          priority={true}
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
  }, [thirdScrollProgress]);

  return (
    <div
      className="h-[240vh] bg-black -mt-[25vh] z-[60] relative"
      ref={containerRef}
    >
      <motion.div
        className="flex items-center justify-center text-white"
        style={{ 
          height: orangeHeight,
          willChange: "height" // Hardware acceleration hint
        }}
      />
      <motion.div
        className={containerClassName}
      >
        <motion.div
          className="w-[45%] -mt-20 z-0"
          style={{ 
            y: yValue,
            willChange: "transform" // Hardware acceleration hint
          }}
        >
          <span className="flex flex-col gap-2 space-y-0 items-start justify-around">
            <span className="text-3xl font-semibold flex flex-col justify-around h-[10%] gap-2 pt-0">
              <span className={textClasses.firstText}>
                Emails are closer than ever to your todos
              </span>
              <span className={`${textClasses.firstText} w-full`}>
                <span>and calendar.</span>
                <span className={textClasses.secondText}> No need to break up with</span>
              </span>
            </span>

            <span className="text-3xl font-semibold mt-0">
              {" "}
              <span className={textClasses.secondText}> your apps, just connect them. </span>
              <span className={textClasses.thirdText}>Like to</span>
            </span>
            <span className={`text-3xl font-semibold ${textClasses.thirdText}`}>
              {" "}
              miss meetings? Not with Amie in the
            </span>
            <span className="text-3xl font-semibold">
              <span className={textClasses.thirdText}>menubar. </span>
              <span className={textClasses.fourthText}>Share your free slots with</span>
            </span>
            <span className="text-3xl font-semibold justify-self-start">
              <span className={textClasses.fourthText}>anyone you like.</span>
            </span>
          </span>
        </motion.div>

        <StackedDesktops />
        <div className="h-full flex justify-evenly items-center w-full absolute -z-10">
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
