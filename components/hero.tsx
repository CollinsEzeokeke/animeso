"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useWindowSize } from "@uidotdev/usehooks";
import { VideoLoader } from "./videoLoader";
import {
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion"; // add if you wish to track the scrollYProgress then uncomment line 156
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useScaleStore } from "@/hooks/store/store";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setNowState } = useScaleStore();
  const [zoomIng, setZoomIng] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    axis: "y",
    // layoutEffect: false,
  });
  const { width, height } = useWindowSize();
  const widthCheckRef = useRef<HTMLDivElement>(null);
  const [isLatest, setIsLatest] = useState(0);
  const [isPosition, setIsPosition] = useState("");
  const [baseWidth, setBaseWidth] = useState(0);
  const IsWidth = width || 0;
  const IsHeight = height || 0;

  // Measure the initial width of the container - optimized with useCallback
  useEffect(() => {
    const measureWidth = () => {
      if (widthCheckRef.current) {
        setBaseWidth(widthCheckRef.current.offsetWidth);
      }
    };

    // Use requestAnimationFrame for better timing
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(measureWidth);
    }, 0.1);

    return () => clearTimeout(timeoutId);
  }, []);

  const yIndex = useTransform(scrollYProgress, [0, 0.01], ["-10%", "-10%"]);

  const zoomIn = useTransform(
    scrollYProgress,
    [
      0.019, 0.027, 0.067, 0.075, 0.083, 0.091, 0.099, 0.107, 0.115, 0.123,
      0.131, 0.139, 0.147, 0.155, 0.163, 0.17,
    ],
    [1.2, 5, 7, 7.5, 8, 12, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]
  );
  const movingAnother = useTransform(
    scrollYProgress,
    [
      0, 0.005, 0.011, 0.019, 0.027, 0.059, 0.067, 0.075, 0.083, 0.091, 0.099,
      0.107, 0.115, 0.123, 0.131, 0.139, 0.147, 0.155, 0.17,
    ],
    [
      "15%",
      "-10%",
      "-10%",
      "-10%",
      "-155%", //this is the value at 0.027
      "-200%", // this is the value at 0.059
      "-211%", // this is the value at 0.067
      "-228%", // this is the value at 0.075
      "-245%", // this is the value at 0.083
      "-395%", // this is the value at 0.091
      `-${IsWidth <= 1394 && IsHeight <= 697 ? "500%" : IsWidth <= 1600 && IsHeight <= 800 ? "400%" : "500%"}`, // this is the value at 0.099
      "-695%", // this is the value at 0.107
      "-885%", // this is the value at 0.115
      "-1070%", // this is the value at 0.123
      "-1260%", //this is the value at 0.131
      "-1440%", // this is the value at 0.139
      "-1620%", // this is the value at 0.147
      "-1820%", // this is the Value at 0.155
      "-2280%", // this is the value at 0.17
    ]
  );

  const marging = useTransform(scrollYProgress, [0.017, 0.045], [0, 20]);
  const myScale = useTransform(scrollYProgress, [0.005, 0.2], [0, 1]);
  const marginLeft = useTransform(scrollYProgress, [0.1, 0.2], [0, -210]);
  const reduceOpacity = useTransform(
    scrollYProgress,
    [0, 0.01, 0.02],
    [1, 0.5, 0]
  );
  const stiffOpacity = useSpring(reduceOpacity, {
    stiffness: 500,
    damping: 60,
  });

  // Video component holder transforms
  const visibility = useTransform(scrollYProgress, [0.155, 0.16], [1, 0]);
  const move = useTransform(scrollYProgress, [0.1, 0.12], ["-9.5%", "-10%"]);
  const visibilitySpring = useSpring(visibility, {
    stiffness: 500,
    damping: 50,
  });
  const moveUp = useSpring(move, { stiffness: 400, damping: 90 });

  // Menu bar transforms
  const backgroundColor = useTransform(
    scrollYProgress,
    [0.085, 0.09],
    ["rgb(96, 165, 250)", "transparent"]
  );
  const blackBar = useTransform(scrollYProgress, [0.185, 0.19], [1, 1]);
  const blackBarSpring = useSpring(blackBar, { stiffness: 500, damping: 50 });
  const heightTransform = useTransform(
    scrollYProgress,
    [0.155, 0.16],
    ["24px", "40px"]
  );
  const opacityTransform = useTransform(
    scrollYProgress,
    [0.085, 0.09, 0.185, 0.4],
    [0, 1, 1, 1]
  );

  // Use memoized callbacks for event handlers
  const handleScaleChange = useCallback(
    (latest: number) => {
      setNowState(latest);
    },
    [setNowState]
  );

  const handleZoomChange = useCallback((latest: number) => {
    if (latest !== 0) {
      setIsLatest(20);
    }
    setZoomIng(Math.min(latest, 5.6));
  }, []);
  const handleMovingAnotherChange = useCallback((latest: string) => {
    if (latest === "0") {
      setIsPosition("0");
    }
  }, []);
  // const handleScrollChange = useCallback((latest: number) => {
  //   fetch("/api/log-scroll", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ scrollProgress: latest }),
  //   });
  // }, []);

  // useEffect(() => {
  //   fetch("/api/log-scroll", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ width: width, height: height  }),
  //   });
  // }, [width, height]);

  // Setup motion value event listeners
  
  // Cleanup motion values

  useMotionValueEvent(myScale, "change", (latest) => {
    handleScaleChange(latest);
  });
  useMotionValueEvent(zoomIn, "change", (latest) => {
    handleZoomChange(latest);
  });
  useMotionValueEvent(movingAnother, "change", (latest) => {
    handleMovingAnotherChange(latest);
  });
  // useMotionValueEvent(scrollYProgress, "change", handleScrollChange)
  // Memoize the zoom calculation to avoid recalculations
  const zoomingE = useMemo(() => {
    if (isPosition === "0") {
      return baseWidth;
    }
    return baseWidth + zoomIng + isLatest;
  }, [baseWidth, zoomIng, isLatest, isPosition]);




  if (!width || !height) return null;

  // Calculate responsive classes with safe null checks
  const containerClass = () => {
    if (width <= 768 && height <= 679) return "-mt-[20%]";
    if (width <= 596 && height <= 679) return "w-5/6";
    if (width <= 470 && height <= 679) return "w-5/6";
    if (width <= 425 && height <= 679) return "w-5/6";
    return "";
  };

  const titleSizeClass = () => {
    if (width >= 1024) return "text-5xl";
    if (width >= 768) return "text-4xl";
    if (width >= 596) return "text-3xl";
    if (width === 470) return "text-2xl";
    if (width >= 426) return "text-2xl";
    return "text-5xl";
  };

  const subtitleSizeClass = () => {
    if (width >= 1024) return "text-5xl";
    if (width >= 768) return "text-[2.5rem]";
    if (width >= 596) return "text-3xl";
    if (width === 470) return "text-2xl";
    if (width >= 425) return "text-2xl";
    return "";
  }

  const containerPullDown = () => {
    if (width <= 1394 && height <= 697) return "mt-[10vh]";
    if (width <= 1600 && height <= 800) return "mt-[12vh]";
    return "";
  }

  // Early return optimization

  return (
    <>
     <AnimatePresence mode="wait">
     {width && height && (
      <div className="overflow-x-hidden">
        <motion.div
          className={`h-[90vh] w-full overflow-x-hidden flex overflow-y-hidden mt-4 justify-center`}
          style={{
            zIndex: 10,
          }}
        >
          <motion.div
            className={`flex justify-center absolute pt-0 top-[4vh] w-[65vw] h-screen ${containerPullDown()}`}
            ref={widthCheckRef}
          >
            {/* this part has all the different styles and animations  */}
            <motion.div
              className={`bg-transparent min-h-[100vh] w-full flex items-center justify-center z-0 top-0 relative ${containerClass()}`}
              style={{
                y: movingAnother,
                scale: zoomIn,
                marginLeft,
                transformOrigin: "center",
                height: 400,
                willChange: "transform", // Hardware acceleration hint
              }}
              ref={containerRef}
            >
              {" "}
              <motion.div
                style={{ opacity: stiffOpacity, y: yIndex }}
                initial={{ y: -20 }}
                animate={{ y: -10 }}
                transition={{ duration: 0.4, delay: 2 }}
                className={`flex flex-col h-[25%]  ${
                  width >= 1024 ? "w-5/6" : "w-5/6"
                } 
                ${
                  width <= 1397 && width != 1024 && height <= 1000 
                    ? "-mt-[29%] ml-6 items-center justify-end z-50"
                    : "-mt-[42%] items-center justify-center z-50"
                }
                `}
              >
                {/* ${width <= 1397 ? "-mt-[30%]" : "-mt-[40%]" } */}

                <h1
                  className={`text-white font-sans ${titleSizeClass()} font-[650] mb-2`}
                >
                  Todos, email, calendar.
                </h1>
                <p
                  className={`font-sans font-semibold text-gray-50 ${subtitleSizeClass()}`}
                >
                  All-in-done.
                </p>
              </motion.div>
              <VideoLoader
                visibility={visibilitySpring}
                zoomingE={zoomingE}
                y={moveUp}
                opacityTransform={opacityTransform}
                backgroundColor={backgroundColor}
                blackBarSpring={blackBarSpring}
                heightTransform={heightTransform}
                marging={marging}
              />
              {/* makes contents unclickable */}
            </motion.div>
            <div className="h-[100vh] w-[65vw] z-50 absolute bg-none" />
          </motion.div>
        </motion.div>
      </div>
      )}
      </AnimatePresence>
    </>
  );
}
