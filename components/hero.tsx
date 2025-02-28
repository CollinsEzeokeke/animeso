"use client";
import { motion } from "framer-motion";
import { useWindowSize } from "@uidotdev/usehooks";
import { VideoLoader } from "./videoLoader";
import { useScroll, useTransform, useSpring } from "framer-motion";
import { Monitor, Plus, Search, Settings } from "lucide-react";
import { useRef, useEffect } from "react";
import { useStore } from "@/hooks/store";

export default function Hero() {
  const containerRef = useRef(null);
  const { setIsLocked, isLocked } = useStore();

  // Single useScroll hook for better performance
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"],
  });

  // Get the window width
  const { width } = useWindowSize();

  // Create all transform values at the top level of the component
  // Simplified ranges with fewer keyframes for better performance
  const rawScale = useTransform(scrollYProgress, [0, 0.05], [1.1, 0.3]);
  const scale = useSpring(rawScale, { stiffness: 400, damping: 90 });

  const y = useTransform(scrollYProgress, [0, 0.05], ["0%", "-70%"]);
  const yIndex = useTransform(scrollYProgress, [0, 0.05], ["0%", "-35%"]);

  // Simplified zoom effect with fewer keyframes
  const zoomIn = useTransform(
    scrollYProgress,
    [0.08, 0.1, 0.12, 0.14, 0.16],
    [1, 5, 15, 35, 60]
  );

  // Simplified movement animation with fewer keyframes
  const movingAnother = useTransform(
    scrollYProgress,
    [0.08, 0.1, 0.12, 0.14, 0.16, 0.17, 0.18],
    ["0%", "-180%", "-550%", "-1330%", "-2300%", "-2300%", "-2300%"]
  );

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

  // Simplified horizontal movement
  const x = useTransform(
    scrollYProgress,
    [0.105, 0.13, 0.145, 0.16],
    [0, 350, 1200, 1715]
  );

  // Springs for smoother animations
  const visibilitySpring = useSpring(visibility, {
    stiffness: 500,
    damping: 50,
  });
  const moveUp = useSpring(move, { stiffness: 400, damping: 90 });
  const movingStiff = useSpring(moving, { stiffness: 500, damping: 90 });
  const xSpring = useSpring(x, { stiffness: 500, damping: 90 });

  // Color and opacity transitions
  const colorChange = useTransform(
    scrollYProgress,
    [0.155, 0.16],
    ["#fff", "none"]
  );
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
  const colorSpring = useSpring(colorChange, { stiffness: 500, damping: 50 });
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
    let timeoutId: NodeJS.Timeout | null = null;
    let isScrollHandlerActive = true;

    // Reset any existing state
    setIsLocked(false);
    document.body.style.overflow = "auto";

    const handleScroll = () => {
      if (!isScrollHandlerActive) return;

      const value = scrollYProgress.get();

      // Debounce expensive operations
      if (timeoutId) clearTimeout(timeoutId);

      // Handle threshold crossing immediately for better UX
      if (value >= 0.18 && !isLocked) {
        requestAnimationFrame(() => {
          setIsLocked(true);
          // Allow scrolling when content should be visible
          document.body.style.overflow = "auto";
        });
      } else if (value < 0.16 && isLocked) {
        requestAnimationFrame(() => {
          setIsLocked(false);
          document.body.style.overflow = "auto";
        });
      }

      // Debounce the animation locking
      timeoutId = setTimeout(() => {
        if (value >= 0.16) {
          // Lock all motion values at final positions
          springingAnother.set("-2300%");
          stiffZoom.set(60);
          xSpring.set(1715);
          moveUp.set("-10%");
          movingStiff.set("-9vh");
          scale.set(0.3);
          y.set("-70%");
          yIndex.set("-35%");

          // Dispatch event only once when crossing threshold
          if (!isLocked) {
            const event = new CustomEvent("heroAnimationComplete", {
              detail: { complete: true },
            });
            window.dispatchEvent(event);
          }
        }
      }, 16); // ~1 frame at 60fps
    };

    const unsubscribe = scrollYProgress.on("change", handleScroll);

    return () => {
      isScrollHandlerActive = false;
      if (timeoutId) clearTimeout(timeoutId);
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
  if (!width) return "w-[12vw]";

  return (
    <>
      <div className="overflow-x-hidden">
        <motion.div
          className="h-[90vh] w-full overflow-x-hidden flex overflow-y-hidden justify-center"
          style={{
            zIndex: 10,
            marginTop: "9.5vh", // Add margin for header space
          }}
        >
          <motion.div className="flex justify-center absolute pt-0 top-[4vh] w-full h-screen">
            <motion.div
              className="bg-transparent min-h-[100vh] w-[65vw] flex items-center justify-center z-50 top-0 relative"
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
                className="flex flex-col h-[25%] -mt-[28%] w-4/5 items-center justify-center z-50"
              >
                <h1 className="text-white font-sans text-6xl font-[650] mb-2">
                  Todos, email, calendar.
                </h1>
                <p className="font-sans font-semibold text-gray-50 text-6xl">
                  All-in-done.
                </p>
              </motion.div>
              <VideoLoader visibility={visibilitySpring} y={moveUp} />
              {/* New wrapper div for bottom placement */}
              <div className="absolute bottom-0 left-0 w-full h-[90vh] pointer-events-none">
                {" "}
                {/* Full container overlay */}
                <div className="relative w-full h-full flex items-end justify-center">
                  {" "}
                  <motion.div
                    className="z-50 w-48 min-h-[50px] rounded-lg shadow-lg pointer-events-auto relative top-2 flex items-center justify-between px-2"
                    style={{
                      y: movingStiff,
                      color: colorSpring,
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
                        className="w-8 mx-0 rounded absolute top-0 left-0"
                        style={{
                          backgroundColor: "black",
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
              ? "w-[25vw]"
              : width >= 500
              ? "w-[28vw]"
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
