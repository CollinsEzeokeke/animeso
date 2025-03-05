"use client";
import { motion } from "framer-motion";
import { useWindowSize } from "@uidotdev/usehooks";
import { VideoLoader } from "./videoLoader";
import { useScroll, useTransform, useSpring } from "framer-motion";
import { Monitor, Plus, Search, Settings } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useStore } from "@/hooks/store/store";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setIsLocked, isLocked } = useStore();
  // const [currentProgress, setCurrentProgress] = useState(0);
  const [freezePoint, setFreezePoint] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isFixed, setIsFixed] = useState(false);

  // Single useScroll hook for better performance
  const { scrollYProgress, scrollY } = useScroll();

  // 2. Calculate freeze point and container height
  useEffect(() => {
    const calculateDimensions = () => {
      const totalScrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setFreezePoint(totalScrollHeight * 0.16); //0.15961945031712474
      if (containerRef.current) {
        setContainerHeight(containerRef.current.offsetHeight);
      }
    };

    calculateDimensions();
    window.addEventListener("resize", calculateDimensions);
    return () => window.removeEventListener("resize", calculateDimensions);
  }, []);

  // 3. Toggle fixed state based on scroll position
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsFixed(latest >= freezePoint);
    });
    return () => unsubscribe();
  }, [freezePoint, scrollY]);
  console.log(
    "these are my fixed boolean, containerHeight and FreezePoints respectively",
    isFixed,
    containerHeight,
    freezePoint
  );

  // Get the window width
  const { width, height } = useWindowSize();

  // console.log("height is: ", height);

  // Create all transform values at the top level of the component
  // Simplified ranges with fewer keyframes for better performance
  const rawScale = useTransform(scrollYProgress, [0, 0.05], [1.1, 0.3]);
  const scale = useSpring(rawScale, { stiffness: 400, damping: 90 });

  const y = useTransform(scrollYProgress, [0, 0.05], ["0%", "-70%"]);
  const yIndex = useTransform(scrollYProgress, [0, 0.05], ["0%", "-35%"]);

  // Simplified zoom effect with fewer keyframes
  // const zoomIn = useTransform(
  //   scrollYProgress,
  //   [0.08, 0.1, 0.12, 0.14, 0.16],
  //   [1, 5, 15, 35, 60]
  // );
  const zoomIn = useTransform(
    scrollYProgress,
    [
      0.08, 0.085, 0.09, 0.095, 0.1, 0.105, 0.11, 0.115, 0.12, 0.125, 0.13,
      0.135, 0.1375, 0.14, 0.1425, 0.145, 0.1475, 0.15, 0.155, 0.16,
    ],
    [
      1, 2.5, 3.5, 4, 4.5, 5, 6, 7, 8, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55,
      60,
    ]
  );
  // Add this new effect to track scroll progress
  // useEffect(() => {
  //   const unsubscribe = scrollYProgress.on("change", (latest) => {
  //     setCurrentProgress(latest);
  //     // Send to backend API endpoint
  //     fetch("/api/log-scroll", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ scrollProgress: latest }),
  //     });
  //   });
  //   return () => unsubscribe();
  // }, [scrollYProgress]);
  // Modify the movingAnother transform to stop at scrollYProgress 0.16
  // console.log("this is my latest scroll positon", currentProgress);
  const movingAnother = useTransform(
    scrollYProgress,
    // 0.11,
    [
      0.08, 0.085, 0.09, 0.095, 0.1, 0.115, 0.12, 0.125, 0.13, 0.135, 0.1375,
      0.14, 0.1425, 0.145, 0.1475, 0.15, 0.155, 0.16, 0.17, 0.18,
    ],
    [
      "0%",
      "-49%",
      "-140%",
      "-149%",
      "-200%",
      // "-185%",
      // "-230%",
      "-250%",
      "-260%",
      "-350%",
      "-550%", // 11th value
      "-750%", // 12th value
      "-950%", // 13th value
      "-1140%", // 14th value
      "-1330%", // 15th value
      "-1530%", // 16th value
      "-1730%", // 17th value
      "-1930%",
      "-2170%",
      "-2400%",
      "-2400%", // Value at 0.16
      "-2500%", // Keep same value at 0.17
    ]
  );
  const x = useTransform(
    scrollYProgress,
    [
      0.105, 0.11, 0.125, 0.13, 0.135, 0.1375, 0.14, 0.1425, 0.145, 0.1475,
      0.15, 0.16, 0.185, 0.19,
    ],
    [0, 100, 300, 350, 580, 800, 890, 1050, 1200, 1345, 1555, 1715, 1730, 1750]
  );
  // Simplified movement animation with fewer keyframes
  // const movingAnother = useTransform(
  //   scrollYProgress,
  //   [0.08, 0.1, 0.12, 0.14, 0.16, 0.17, 0.18],
  //   ["0%", "-180%", "-550%", "-1330%", "-2300%", "-2300%", "-2300%"]
  // );
  // Simplified horizontal movement
  // const x = useTransform(
  //   scrollYProgress,
  //   [0.105, 0.13, 0.145, 0.16],
  //   [0, 350, 1400, 1715]
  // );
  // Create springs for smoother animations with optimized stiffness/damping
  const stiffZoom = useSpring(zoomIn, {
    stiffness: 300,
    damping: 90,
    restDelta: 0.001,
  });
  const springingAnother = useSpring(movingAnother, {
    stiffness: 300,
    damping: 90,
    restDelta: 0.001,
  });
  // Other animations with simplified keyframes
  const visibility = useTransform(scrollYProgress, [0.155, 0.16], [1, 0]);
  const move = useTransform(scrollYProgress, [0.1, 0.12], ["0%", "-10%"]);
  const moving = useTransform(scrollYProgress, [0.1, 0.12], ["0%", "-9vh"]);
  // Springs for smoother animations
  const visibilitySpring = useSpring(visibility, {
    stiffness: 500,
    damping: 50,
  });
  const moveUp = useSpring(move, { stiffness: 400, damping: 90 });
  const movingStiff = useSpring(moving, { stiffness: 500, damping: 90 });
  const xSpring = useSpring(x, {
    stiffness: 500,
    damping: 90,
    restDelta: 0.01,
  });
  // Color and opacity transitions
  // const colorChange = useTransform(
  //   scrollYProgress,
  //   [0.155, 0.16],
  //   ["#fff", "none"]
  // );
  const backgroundColor = useTransform(
    scrollYProgress,
    [0.085, 0.09],
    ["rgb(96, 165, 250)", "transparent"]
  );
  const containerBgOpacity = useTransform(
    scrollYProgress,
    [0.185, 0.19],
    [1, 0]
  );
  const blackBar = useTransform(scrollYProgress, [0.185, 0.19], [1, 1]);
  // Springs for color transitions
  // const colorSpring = useSpring(colorChange, { stiffness: 500, damping: 50 });
  const blackBarSpring = useSpring(blackBar, { stiffness: 500, damping: 50 });
  // Opacity for text
  const reduceOpacity = useTransform(scrollYProgress, [0.29, 0.295], [1, 0]);
  const stiffOpacity = useSpring(reduceOpacity, {
    stiffness: 500,
    damping: 60,
  });
  // Pre-calculate transforms for height, width  and opacity
  const heightTransform = useTransform(
    scrollYProgress,
    [0.155, 0.16],
    ["24px", "40px"]
  );
  // Add width transform that changes from w-8 (32px) to w-10 (40px)
  const widthTransform = useTransform(
    scrollYProgress,
    [0.155, 0.16],
    ["32px", "40px"]
  );
  const opacityTransform = useTransform(
    scrollYProgress,
    [0.085, 0.09, 0.185, 0.4],
    [0, 1, 1, 1]
  );
  // Background color transform for the menu bar
  const bgColorTransform = useTransform(
    containerBgOpacity,
    (opacity) => `rgba(255, 255, 255, ${opacity})`
  );
  // Box shadow transform
  const boxShadowTransform = useTransform(containerBgOpacity, (opacity) =>
    opacity === 0
      ? "none"
      : "var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)"
  );
  // Debounced scroll handler for better performance
  useEffect(() => {
    let lastTimestamp = 0;
    let animationFrameId: number | null = null;
    let isScrollHandlerActive = true;
    // Throttling function to limit execution rate
    const throttledScrollHandler = (currentTimestamp: number) => {
      // Execute at most once every 16ms (~ 60fps)
      if (currentTimestamp - lastTimestamp < 16) {
        return;
      }

      lastTimestamp = currentTimestamp;
      const value = scrollYProgress.get();

      // Only update locked state when threshold is crossed
      if (value >= 0.18 && !isLocked) {
        setIsLocked(true);
      } else if (value < 0.16 && isLocked) {
        setIsLocked(false);
      }

      // Optimize by only setting final values when animation is complete
      if (value >= 0.16 && value < 0.19) {
        // Lock all motion values at final positions - prevents further calculations
        springingAnother.set("-2300%");
        stiffZoom.set(60);
        xSpring.set(1715);
        moveUp.set("-10%");
        movingStiff.set("-9vh");
        scale.set(0.3);
        y.set("-70%");
        yIndex.set("-35%");
      }
    };
    const handleScroll = () => {
      if (!isScrollHandlerActive) return;

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      // Use requestAnimationFrame to sync with browser render cycle
      animationFrameId = requestAnimationFrame((timestamp) => {
        throttledScrollHandler(timestamp);
      });
    };
    const unsubscribe = scrollYProgress.on("change", handleScroll);
    return () => {
      isScrollHandlerActive = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      unsubscribe();
    };
  }, [
    isLocked,
    moveUp,
    movingStiff,
    scale,
    scrollYProgress,
    setIsLocked,
    springingAnother,
    stiffZoom,
    xSpring,
    y,
    yIndex,
  ]);
  // Separate effect for body overflow to avoid unnecessary renders
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isLocked]);
  if (!width) return null;
  if (!height) return null;
  return (
    <>
      <div className="overflow-x-hidden">
        <motion.div
          className="h-[90vh] w-full overflow-x-hidden flex overflow-y-hidden mt-0 justify-center"
          style={{
            zIndex: 10,
            // marginTop: "9.5vh", // Add margin for header space
          }}
        >
          <motion.div className="flex justify-center absolute pt-0 top-[4vh] w-full h-screen">
            <motion.div
              className={`bg-transparent min-h-[100vh] w-[65vw] flex items-center justify-center z-50 top-0 relative
                ${
                  width <= 768 && height <= 679
                    ? "-mt-[20%]"
                    : width <= 596 && height <= 679
                    ? "w-5/6"
                    : width <= 470 && height <= 679
                    ? "w-5/6"
                    : width <= 425 && height <= 679
                    ? "w-5/6"
                    : ""
                }`}
              style={{
                y: springingAnother,
                scale: stiffZoom,
                x: xSpring,
                willChange: "transform", // Hardware acceleration hint
              }}
              ref={containerRef}
            >
              {" "}
              <motion.div
                style={{ y: yIndex, opacity: stiffOpacity }}
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.4, delay: 1 }}
                className={`flex flex-col h-[25%] -mt-[28%] ${
                  width >= 1024 ? "w-5/6" : "w-5/6"
                } items-center justify-center z-50`}
              >
                <h1
                  className={`text-white font-sans ${
                    width >= 1024
                      ? "text-5xl"
                      : width >= 768
                      ? "text-4xl"
                      : width >= 596
                      ? "text-3xl"
                      : width === 470
                      ? "text-2xl"
                      : width >= 426
                      ? "text-2xl"
                      : ""
                  } font-[650] mb-2`}
                >
                  Todos, email, calendar.
                </h1>
                <p
                  className={`font-sans font-semibold text-gray-50 ${
                    width >= 1024
                      ? "text-5xl"
                      : width >= 768
                      ? "text-[2.5rem]"
                      : width >= 596
                      ? "text-3xl"
                      : width === 470
                      ? "text-2xl"
                      : width >= 425
                      ? "text-2xl"
                      : ""
                  }`}
                >
                  All-in-done.
                </p>
              </motion.div>
              <VideoLoader visibility={visibilitySpring} y={moveUp} />
              {/* New wrapper div for bottom placement */}
              <div
                className={`absolute bottom-0 left-0 w-full pointer-events-none ${
                  width <= 768
                    ? "flex items-center bg-amber-950 h-[45vh]"
                    : "h-[90vh]"
                }`}
              >
                {" "}
                {/* Full container overlay */}
                <div
                  className={`relative w-full flex ${
                    width <= 768
                      ? "bg-red-500 justify-center items-center h-full"
                      : "items-end justify-center h-full"
                  }`}
                >
                  {" "}
                  <motion.div
                    className={`z-50 w-48 min-h-[50px] rounded-lg shadow-lg pointer-events-auto relative flex items-center justify-between px-2 bg-blue-500 ${
                      width <= 768 ? "top-2" : "top-2"
                    }`}
                    style={{
                      y: movingStiff,
                      // color: colorSpring,
                      backgroundColor: bgColorTransform,
                      boxShadow: boxShadowTransform,
                      willChange: "transform, background-color, box-shadow",
                    }}
                  >
                    {/* Search Icon */}
                    <Search className="w-5 h-5 mx-1 text-gray-700" />

                    {/* Line Separator */}
                    <div className="w-px h-6 bg-gray-300 mx-2"></div>

                    {/* Folder Replacement */}
                    <motion.div className="relative mr-0">
                      <motion.div
                        className="w-8 h-6 mx-0 rounded"
                        style={{
                          backgroundColor,
                          opacity: blackBarSpring,
                        }}
                      />
                      <motion.div
                        className="w-8 mx-0 rounded absolute top-0 left-0 bg-center bg-cover bg-no-repeat"
                        style={{
                          backgroundImage: "url('/firstShow.png')",
                          height: heightTransform,
                          width: widthTransform,
                          opacity: opacityTransform,
                          willChange: "opacity, width, height",
                        }}
                      />
                    </motion.div>
                    {/* Plus Icon */}
                    <Plus className="w-5 h-5 mx-1 text-gray-700" />

                    {/* Line Separator */}
                    <div className="w-px h-6 bg-gray-300 mx-2"></div>

                    {/* Monitor Icon */}
                    <Monitor className="w-5 h-5 mx-1 text-gray-700" />

                    {/* Settings Icon */}
                    <Settings className="w-5 h-5 mx-2 text-gray-700" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* makes contents unclickable */}
            <div className="h-[100vh] w-[65vw] z-50 absolute bg-none" />
          </motion.div>
        </motion.div>
      </div>

      <div
        className={`${
          width === 1440 ? "w-full" : "w-full"
        } h-full flex justify-center overflow-hidden`}
      >
        <motion.div
          //  ${width >= 1440 && "w-[12vw]"} ${width >= 1024 && "w-[20vw]"} ${width >= 768 && "w-[25vw]"} ${width >= 768 && "-mt-2"} ${width < 768 && width >= 700 && "w-[28vw]"}
          className={`bg-cover h-[20vh] bg-center fixed top-[8.5vh] flex justify-self-center -translate-x-1/2 bg-no-repeat transition-all z-50 ${
            width >= 1440
              ? "w-[12vw]"
              : width >= 1024
              ? "w-[20vw]"
              : width >= 768
              ? "w-[25vw] h-28"
              : width >= 600
              ? "w-[28vw]"
              : width < 600
              ? "w-[35vw]"
              : ""
          }`}
          style={{
            backgroundImage: "url('/logo-shaded.png')",
            scale,
            y,
            willChange: "transform",
          }}
        />
      </div>
    </>
  );
}

// lock the height at this point since it is where the background forms

// 0.15961945031712474
