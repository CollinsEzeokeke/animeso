"use client";
import { motion } from "framer-motion";
import DirectionAwareScrollComponent from "@/components/Header";
import { VideoLoader } from "./videoLoader";
import { useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0, 0.25], [1, 0.28]);
  const y = useTransform(scrollYProgress, [0, 0.25], ["0%", "-70%"]);
  return (
    <>
      <motion.div className="h-[150vh] w-full bg-[#BCBCBC] overflow-x-hidden relative z-[10] flex justify-center">
        <DirectionAwareScrollComponent />
        {/* bg-[#BFBFBF] */}
        <div className="flex justify-center relative pt-0 top-[4.5vh] w-full h-screen">
        {/* bg-[#333333]/40 */}
          <div className="bg-transparent absolute h-[100vh] w-[65vw] flex items-center justify-center rounded-sm z-10">
            <div className="flex flex-col h-[15%] -mt-[25%] bg-none w-4/5 items-center justify-center mb-20 z-10">
              <h1 className="text-white font-sans text-6xl font-[650] mb-2">
                Todos, email, calendar.
              </h1>
              <p className="font-sans font-semibold text-gray-50 text-6xl">
                All-in-done.
              </p>
            </div>
            <VideoLoader />
          </div>
        </div>
      </motion.div>


{/* jgfhfmhjf */}

      <div className="flex justify-center w-full z-[50] fixed top-0 h-[9.5vh]">
        <motion.div
          className="bg-cover h-[20vh] bg-center fixed top-[8.5vh] w-[12vw] bg-no-repeat transition-all"
          style={{
            backgroundImage: "url('/logo-shaded.png')",
            scale,
            y,
          }}
        />
        {/* inward Coating */}
        <div className="bg-none fixed top-[9.5vh] left-0 w-full h-screen z-[20] flex flex-col items-center justify-center" />
        {/* Outward Coating */}
      </div>
      {/* <div className="bg-[#BCBCBC] fixed h-screen w-screen top-0 left-0 z-0"/> */}

    </>
  );
}
