"use client";
import { motion } from "framer-motion";
import DirectionAwareScrollComponent from "@/components/Header";
import { VideoLoader } from "./videoLoader";
import { useScroll, useTransform, useSpring } from "framer-motion";
import { Monitor, Plus, Search, Settings } from "lucide-react";

export default function Hero() {
  const { scrollYProgress } = useScroll();

  const rawScale = useTransform(scrollYProgress, [0, 0.25], [1.1, 0.3]);
  const y = useTransform(scrollYProgress, [0, 0.25], ["0%", "-70%"]);
  const yIndex = useTransform(scrollYProgress, [0, 0.25], ["0%", "-40%"]);
  const scale = useSpring(rawScale, { stiffness: 400, damping: 90 });
  return (
    <>
      <div>
        <DirectionAwareScrollComponent />
        <motion.div
          className="h-[110vh] w-full overflow-x-hidden flex justify-center"
          style={{
            zIndex: 10,
            marginTop: "9.5vh", // Add margin for header space
          }}
        >
          <div className="flex justify-center absolute pt-0 top-[4vh] w-full h-screen">
            <div className="bg-transparent min-h-[100vh] w-[65vw] flex items-center justify-center z-50 top-0 relative">
              {" "}
              <motion.div
                style={{ y: yIndex }}
                className="flex flex-col h-[25%] -mt-[28%] w-4/5 items-center justify-center z-50"
              >
                <h1 className="text-white font-sans text-6xl font-[650] mb-2">
                  Todos, email, calendar.
                </h1>
                <p className="font-sans font-semibold text-gray-50 text-6xl">
                  All-in-done.
                </p>
              </motion.div>
              <VideoLoader />
              {/* New wrapper div for bottom placement */}
              <div className="absolute bottom-0 left-0 w-full h-[90vh] pointer-events-none bg-purple-500">
                {" "}
                {/* Full container overlay */}
                <div className="relative w-full h-full flex items-end justify-center bg-red-500">
                  {" "}
                  <div className="bg-white z-50 w-48 min-h-[50px] rounded-lg shadow-lg pointer-events-auto relative top-2 flex items-center justify-between px-2">
                    {/* Search Icon */}
                    <Search className="w-5 h-5 mx-1 text-gray-700" />

                    {/* Line Separator */}
                    <div className="w-px h-6 bg-gray-300 mx-2"></div>

                    {/* Folder Replacement */}
                    <div className="w-5 h-5 mx-1 bg-blue-400 rounded"></div>
                    {/* Plus Icon */}
                    <Plus className="w-5 h-5 mx-1 text-gray-700" />

                    {/* Line Separator */}
                    <div className="w-px h-6 bg-gray-300 mx-2"></div>

                    {/* Monitor Icon */}
                    <Monitor className="w-5 h-5 mx-1 text-gray-700" />

                    {/* Settings Icon */}
                    <Settings className="w-5 h-5 mx-2 text-gray-700" />
                  </div>
                </div>
              </div>
            </div>

            {/* makes contents unclickable */}
            <div className="h-[100vh] w-[65vw] z-50 absolute bg-none" />
          </div>
        </motion.div>
      </div>

      <div className="w-screen h-full flex justify-center">
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