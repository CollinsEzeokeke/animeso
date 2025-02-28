"use client";
import { motion } from "framer-motion";
// import DirectionAwareScrollComponent from "@/components/Header";
import { VideoLoader } from "./videoLoader";
import { useScroll, useTransform, useSpring } from "framer-motion";
import { Monitor, Plus, Search, Settings } from "lucide-react";
import { useRef, useEffect } from "react";

export default function Hero() {
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"],
  });
  // Adjust the scroll progress ranges for smoother animations
  const rawScale = useTransform(scrollYProgress, [0, 0.05], [1.1, 0.3]);
  const y = useTransform(scrollYProgress, [0, 0.05], ["0%", "-70%"]);
  const yIndex = useTransform(scrollYProgress, [0, 0.05], ["0%", "-35%"]);

  // Adjust zoom effect ranges
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

  // Add a ref for the container
  const containerRef = useRef(null);

  // Modify the movingAnother transform to stop at scrollYProgress 0.16
  const movingAnother = useTransform(
    scrollYProgress,
    [
      0.08, 0.085, 0.09, 0.095, 0.1, 0.105, 0.11, 0.115, 0.12, 0.125, 0.13,
      0.135, 0.1375, 0.14, 0.1425, 0.145, 0.1475, 0.15, 0.155, 0.16, 0.17, 0.18,
    ],
    [
      "0%",
      "-49%",
      "-140%",
      "-149%",
      "-149%",
      "-180%",
      "-200%",
      "-230%",
      "-260%",
      "-350%",
      "-550%",
      "-750%",
      "-950%",
      "-1140%",
      "-1330%",
      "-1530%",
      "-1730%",
      "-1930%",
      "-2130%",
      "-2300%", // Value at 0.16
      "-2300%", // Keep same value at 0.17
      "-2300%", // Keep same value at 0.18
    ]
  );

  const visibility = useTransform(scrollYProgress, [0.155, 0.16], [1, 0]);
  const visibilitySpring = useSpring(visibility, {
    stiffness: 500,
    damping: 50,
  });

  const colorChange = useTransform(
    scrollYProgress,
    [0.155, 0.16],
    ["#fff", "none"]
  );
  const colorSpring = useSpring(colorChange, { stiffness: 500, damping: 50 });

  const scale = useSpring(rawScale, { stiffness: 400, damping: 90 });
  const move = useTransform(scrollYProgress, [0.1, 0.12], ["0%", "-10%"]);
  const moveUp = useSpring(move, { stiffness: 400, damping: 90 });
  const moving = useTransform(scrollYProgress, [0.1, 0.12], ["0%", "-9vh"]);
  const movingStiff = useSpring(moving, { stiffness: 500, damping: 90 });

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

  const x = useTransform(
    scrollYProgress,
    [
      0.105, 0.11, 0.125, 0.13, 0.135, 0.1375, 0.14, 0.1425, 0.145, 0.1475,
      0.15, 0.16, 0.185, 0.19,
    ],
    [0, 100, 300, 350, 580, 800, 890, 1050, 1200, 1345, 1555, 1715, 1730, 1750]
  );
  const xSpring = useSpring(x, { stiffness: 500, damping: 90 });

  // opacity calculation for text
  const reduceOpacity = useTransform(scrollYProgress, [0.29, 0.295], [1, 0]);
  const stiffOpacity = useSpring(reduceOpacity, {
    stiffness: 500,
    damping: 60,
  });
  // Add this new color transform
  const backgroundColor = useTransform(
    scrollYProgress,
    [0.085, 0.09],
    ["rgb(96, 165, 250)", "transparent"] // from blue-400 to red-500
  );
  // Create a transform specifically for the container's background
  const containerBgOpacity = useTransform(
    scrollYProgress,
    [0.185, 0.19],
    [1, 0] // From visible to invisible
  );

  // keeping the black bar visible
  const blackBar = useTransform(scrollYProgress, [0.185, 0.19], [1, 1]);
  const blackBarSpring = useSpring(blackBar, {
    stiffness: 500,
    damping: 50,
  });

  // Add effect to monitor scroll position
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      if (value >= 0.16 && containerRef.current) {
        // Optional: You could add additional control here if needed
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

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
          <motion.div
            className="flex justify-center absolute pt-0 top-[4vh] w-full h-screen"
            // ref={containerRef}
          >
            <motion.div
              className="bg-transparent min-h-[100vh] w-[65vw] flex items-center justify-center z-50 top-0 relative"
              style={{ y: springingAnother, scale: stiffZoom, x: xSpring }}
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
                  {/* <motion.div
                    className="bg-white z-50 w-48 min-h-[50px] rounded-lg shadow-lg pointer-events-auto relative top-2 flex items-center justify-between px-2"
                    style={{
                      y: movingStiff,
                      color: colorSpring,
                      opacity: opacitySpring,
                    }}
                  > */}
                  <motion.div
                    className="z-50 w-48 min-h-[50px] rounded-lg shadow-lg pointer-events-auto relative top-2 flex items-center justify-between px-2"
                    style={{
                      y: movingStiff,
                      color: colorSpring,
                      backgroundColor: useTransform(
                        containerBgOpacity,
                        (opacity) => `rgba(255, 255, 255, ${opacity})` // Make white background transparent
                      ),
                      // Keep the shadow visible or fade it with the background
                      boxShadow: useTransform(containerBgOpacity, (opacity) =>
                        opacity === 0
                          ? "none"
                          : "var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)"
                      ),
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
                          // border,
                          opacity: blackBarSpring,
                        }}
                      />
                      {/* <motion.div
                        className="w-8 h-6 mx-0 rounded absolute top-0 left-0"
                        style={{
                          backgroundColor: "black",
                          opacity: useTransform(
                            scrollYProgress,
                            [0.085, 0.09],
                            [0, 1]
                          ),
                        }}
                      /> */}
                      <motion.div
                        className="w-8 h-6 mx-0 rounded absolute top-0 left-0"
                        style={{
                          backgroundColor: "black",
                          opacity: useTransform(
                            scrollYProgress,
                            [0.085, 0.09, 0.185, 0.4],
                            [0, 1, 1, 1] // Stays visible
                          ),
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

      <div className="w-full h-full flex justify-center overflow-hidden">
        <motion.div
          className="bg-cover h-[20vh] bg-center fixed top-[8.5vh] flex justify-self-center -translate-x-1/2 w-[12vw] bg-no-repeat transition-all z-50"
          style={{
            backgroundImage: "url('/logo-shaded.png')",
            scale,
            y,
          }}
        />
      </div>
    </>
  );
}
