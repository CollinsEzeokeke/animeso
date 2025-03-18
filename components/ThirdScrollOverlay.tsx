"use client";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState, useCallback } from "react";
import StackedDesktops from "./stackedDesktops";
import { useThirdScrollOverlay } from "@/hooks/store/store";
import Image from "next/image";
import { useWindowSize } from "@uidotdev/usehooks";

export default function ThirdScrollOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [yValue, setYValue] = useState(140);
  const { width, height } = useWindowSize();
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
    ["15vh", "157vh"] // Output range (from lower to higher height)
  );

  // Memoize the scroll event handler for better performance
  const handleScrollProgressChange = useCallback(
    (latest: number) => {
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
      } else if (Math.abs(latest - 0.7933) < threshold) {
        setThirdScrollProgress(0.7933);
        setYValue(140);
      } else if (Math.abs(latest - 0.5967) < threshold) {
        setThirdScrollProgress(0.5967);
        setYValue(50);
      } else if (Math.abs(latest - 0.4) < threshold) {
        setThirdScrollProgress(0.4);
        setYValue(20);
      }
    },
    [setThirdScrollProgress]
  );

  // Set up the scroll event listener
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    handleScrollProgressChange(latest);
  });
  const responsive3 = () => {
    if (!height || !width) return;
    if (width > 768 && width <= 1397 && width != 1440) {
      return "-mt-20";
    }
    return "";
  }
  // Memoize the container class
  const containerClassName = () => {
    return `h-[80vh] w-[80%] z-[60] flex flex-col items-center justify-start ${responsive3()} ${
      isFixed
        ? "fixed top-[13vh] left-1/2 -translate-x-1/2"
        : "relative mx-auto"
    }`;
  }

  // Memoize the text content class names based on thirdScrollProgress
  const textClasses = () => {
    return {
      firstText:
        thirdScrollProgress >= 0.99 ? "text-white" : "text-[#a4a1a195]",
      secondText:
        thirdScrollProgress >= 0.7933 && thirdScrollProgress !== 0.99
          ? "text-white"
          : "text-[#a4a1a195]",
      thirdText:
        thirdScrollProgress >= 0.5967 &&
        thirdScrollProgress !== 0.7933 &&
        thirdScrollProgress !== 0.99
          ? "text-white"
          : "text-[#a4a1a195]",
      fourthText:
        thirdScrollProgress >= 0.4 &&
        thirdScrollProgress !== 0.5967 &&
        thirdScrollProgress !== 0.7933 &&
        thirdScrollProgress !== 0.99
          ? "text-white"
          : "text-[#a4a1a195]",
    };
  }

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
    } else if (thirdScrollProgress >= 0.4) {
      return (
        <div className="w-[12vw] h-[50%] flex items-start justify-start">
          <div className="w-full h-[70%] flex flex-col justify-center">
            <div className="bg-white w-[80%] h-[25%] rounded-3xl flex flex-col items-center rotate-12 px-10  shadow-md shadow-black/25">
              <div className="w-full flex justify-start items-center h-[50%] text-2xl text-gray-500/90 font-medium">
                Mon
              </div>
              <div className="w-full flex justify-start items-center h-[50%] text-xl text-black font-bold px-3">
                12
              </div>
            </div>
            <div className="bg-white w-[80%] h-[25%] rounded-3xl flex flex-col items-center -rotate-12 px-10  shadow-md shadow-black/25">
              <div className="w-full flex justify-start items-center h-[50%] text-2xl text-gray-500/90 font-medium">
                Tue
              </div>
              <div className="w-full flex justify-start items-center h-[50%] text-xl text-black font-bold px-3">
                13
              </div>
            </div>
          </div>
        </div>
      );
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
      return (
        <div className="h-full w-full flex justify-end items-end">
          <div className="w-1/2 h-[70%] flex flex-col items-end justify-end relative -translate-x-2">
            <div className="bg-white w-[70%] h-[25%] rounded-3xl flex flex-col items-end -rotate-6 -pl-3 relative z-10 shadow-md shadow-black/25 ">
              <div className="w-1/2 flex justify-center items-center h-[50%] text-2xl text-gray-500/90 font-medium">
                Wed
              </div>
              <div className="w-1/2 flex justify-center items-center h-[50%] text-xl text-black font-bold">
                14
              </div>
            </div>
            <div className="bg-white w-[70%] h-[25%] rounded-3xl flex flex-col items-end rotate-6 relative z-0 pl-0 shadow-md shadow-black/25 -mt-2 ">
              <div className="w-1/2 flex justify-center items-center h-[50%] text-2xl text-gray-500/90 font-medium">
                Thu
              </div>
              <div className="w-1/2 flex justify-center items-center h-[50%] text-xl text-black font-bold">
                15
              </div>
            </div>
            <div className="bg-white w-[70%] h-[25%] rounded-3xl flex flex-col items-end -rotate-6 -pl-3 relative z-10 mt-3 shadow-md shadow-black/25 ">
              <div className="w-1/2 flex justify-center items-center h-[50%] text-2xl text-gray-500/90 font-medium">
                Fri
              </div>
              <div className="w-1/2 flex justify-center items-center h-[50%] text-xl text-black font-bold">
                16
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      // Default nothing if not in the right range
      return " ";
    }
  }, [thirdScrollProgress]);

  const responsive = () => {
    if (!height || !width) return;
    if (width > 768 && width <= 1397 && width != 1440) {
      return "w-[54.5%] -mt-20  h-full";
    }
    return "w-[45%] -mt-20";
  };
  const responsive2 = () => {
    if (!height || !width) return;
    if (width > 768 && width <= 1397 && width != 1440) {
      return "items-end";
    }
    return "items-center";
  };
  const responsive4 = () => {
    if (!height || !width) return;
    if (width > 768 && width <= 1397 && width != 1440) {
      return "w-[50%]";
    }
    return "w-[40%]";
  };
  return (
    <div
      className="h-[240vh] bg-black -mt-[25vh] z-[60] relative"
      ref={containerRef}
    >
      <motion.div
        className="flex items-center justify-center text-white"
        style={{
          height: orangeHeight,
          willChange: "height", // Hardware acceleration hint
        }}
      />
      <motion.div className={containerClassName()}>
        <motion.div
          className={`z-0 ${responsive()}`}
          style={{
            y: yValue,
            willChange: "transform", // Hardware acceleration hint
          }}
        >
          <span className="flex flex-col gap-2 space-y-0 items-start justify-around ">
            <span className="text-3xl font-semibold flex flex-col justify-around h-[10%] gap-2 pt-0">
              <span className={textClasses().firstText}>
                Emails are closer than ever to your todos
              </span>
              <span className={`${textClasses().firstText} w-full`}>
                <span>and calendar.</span>
                <span className={textClasses().secondText}>
                  {" "}
                  No need to break up with
                </span>
              </span>
            </span>

            <span className="text-3xl font-semibold mt-0">
              {" "}
              <span className={textClasses().secondText}>
                {" "}
                your apps, just connect them.{" "}
              </span>
              <span className={textClasses().thirdText}>Like to</span>
            </span>
            <span className={`text-3xl font-semibold ${textClasses().thirdText}`}>
              {" "}
              miss meetings? Not with Amie in the
            </span>
            <span className="text-3xl font-semibold">
              <span className={textClasses().thirdText}>menubar. </span>
              <span className={textClasses().fourthText}>
                Share your free slots with
              </span>
            </span>
            <span className="text-3xl font-semibold justify-self-start">
              <span className={textClasses().fourthText}>anyone you like.</span>
            </span>
          </span>
        </motion.div>

        <StackedDesktops />
        <div
          className={`h-full flex justify-evenly w-full absolute -z-10 ${responsive2()}`}
        >
          {/* periodic image on the left */}
          {renderImageLeft()}
          <div
            className={`h-[50%] flex items-center justify-end  ${responsive4()}`}
          >
            {/* periodic image on the right */}
            {renderImageRight()}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
