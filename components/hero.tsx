"use client";
import { motion } from "framer-motion";
import DirectionAwareScrollComponent from "@/components/Header";
import { VideoLoader } from "./videoLoader";
import { useScroll, useTransform, useSpring } from "framer-motion";
import { Monitor, Plus, Search, Settings } from "lucide-react";

export default function Hero() {
  const { scrollYProgress } = useScroll();
  // calculations for the scale of the image and moving up
  const rawScale = useTransform(scrollYProgress, [0, 0.25], [1.1, 0.3]);
  const y = useTransform(scrollYProgress, [0, 0.25], ["0%", "-70%"]);
  const yIndex = useTransform(scrollYProgress, [0, 0.25], ["0%", "-35%"]);
  const scale = useSpring(rawScale, { stiffness: 400, damping: 90 });
  const move = useTransform(scrollYProgress, [0.25, 0.5], ["0%", "-10%"]);
  const moveUp = useSpring(move, { stiffness: 400, damping: 90 });
  const moving = useTransform(scrollYProgress, [0.25, 0.5], ["0%", "-9vh"]);
  const movingStiff = useSpring(moving, { stiffness: 500, damping: 90 });

  // calculations for the zoom effect on hero
  // const zoomIn = useTransform(scrollYProgress, [0.30, 0.10], [1, 3])
  const zoomIn = useTransform(
    scrollYProgress,
    [0.29, 0.295, 0.3], // Input scroll ranges
    [1, 1.2, 2] // Corresponding scale values (smooth transition from 1->3 between 0.3-0.4)
  );
  const stiffZoom = useSpring(zoomIn, { stiffness: 500, damping: 60 });
// opacity calculation for text
  const reduceOpacity = useTransform(scrollYProgress, [0.29, 0.295], [1, 0]);
  const stiffOpacity = useSpring(reduceOpacity, {
    stiffness: 500,
    damping: 60,
  });
  // Add this new color transform
  const backgroundColor = useTransform(
    scrollYProgress,
    [0.31, 0.33],
    ["rgb(96, 165, 250)", "transparent"] // from blue-400 to red-500
  ); 
   const border = useTransform(
    scrollYProgress,
    [0.31, 0.33],
    ["none", "0.5px solid gray"] // from blue-400 to red-500
  );
// calculation for the motion that's makes the container move up further
  const movingAnother = useTransform(scrollYProgress, [0.31, 0.33], ["0%", "-30%"]);
  const springingAnother = useSpring(movingAnother, {
    stiffness: 500,
    damping: 60,
  });
// calculation for the second zoom effect into the folder replacement container
  // const anotherZoom = useTransform(scrollYProgress, [0.36, 0.4], [2, 2.5])
  // const anotherZoomSpring = useSpring(anotherZoom, {
  //   stiffness: 500,
  //   damping: 60,
  // })
// combining scales
// const combinedScale = useTransform(
//   [stiffZoom, anotherZoomSpring],
//   (latest: number[]) => Math.max(...latest)
// );
  return (
    <>
      <div className="overflow-x-hidden">
        <DirectionAwareScrollComponent />
        <motion.div
          className="h-[110vh] w-full overflow-x-hidden flex justify-center"
          style={{
            zIndex: 10,
            marginTop: "9.5vh", // Add margin for header space
          }}
        >
          <motion.div
           className="flex justify-center absolute pt-0 top-[4vh] w-full h-screen">
          
            <motion.div
              className="bg-transparent min-h-[100vh] w-[65vw] flex items-center justify-center z-50 top-0 relative"
              style={{ y: springingAnother, scale: stiffZoom }}
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
              <VideoLoader y={moveUp} />
              {/* New wrapper div for bottom placement */}
              <div className="absolute bottom-0 left-0 w-full h-[90vh] pointer-events-none">
                {" "}
                {/* Full container overlay */}
                <div className="relative w-full h-full flex items-end justify-center">
                  {" "}
                  <motion.div
                    className="bg-white z-50 w-48 min-h-[50px] rounded-lg shadow-lg pointer-events-auto relative top-2 flex items-center justify-between px-2"
                    style={{
                      y: movingStiff,
                    }}
                  >
                    {/* Search Icon */}
                    <Search className="w-5 h-5 mx-1 text-gray-700" />

                    {/* Line Separator */}
                    <div className="w-px h-6 bg-gray-300 mx-2"></div>

                    {/* Folder Replacement */}
                    <motion.div
                      className="relative mr-4"
                    >
                      <motion.div
                        className="w-6 h-4 mx-1 rounded"
                        style={{ backgroundColor, border }}
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
