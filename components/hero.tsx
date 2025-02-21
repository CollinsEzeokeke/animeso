"use client";
import { motion } from "framer-motion";
import DirectionAwareScrollComponent from "@/components/Header";
import { VideoLoader } from "./videoLoader";
import { useScroll, useTransform, useSpring } from "framer-motion";

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
        {/* bg-[#BCBCBC] */}
        <motion.div
          className="h-[110vh] w-full bg-blue-500 overflow-x-hidden flex justify-center"
          style={{ zIndex: 10 }}
        >
          {/* bg-[#BFBFBF] */}
          <div className="flex justify-center absolute pt-0 top-[4vh] w-full h-screen">
            {/* bg-[#333333]/40 */}
            <div className="bg-transparent bg-black min-h-[100vh] w-[65vw] flex items-center justify-center z-20 sticky top-0">
              <motion.div
                style={{ y: yIndex }}
                className="flex flex-col h-[25%] -mt-[28%] w-4/5 items-center justify-start z-10"
              >
                <h1 className="text-white font-sans text-6xl font-[650] mb-2">
                  Todos, email, calendar.
                </h1>
                <p className="font-sans font-semibold text-gray-50 text-6xl">
                  All-in-done.
                </p>
              </motion.div>
              <VideoLoader />
            </div>
            <div className="h-[100vh] w-[65vw] z-20 absolute bg-none" />
          </div>
        </motion.div>
      </div>

      {/* jgfhfmhjf */}

      <motion.div
        className="bg-cover bg-red-500 h-[20vh] bg-center fixed top-[8.5vh] w-[12vw] bg-no-repeat transition-all z-20"
        style={{
          backgroundImage: "url('/logo-shaded.png')",
          scale,
          y,
        }}
      />
      {/* inward Coating */}
      {/* Outward Coating */}
      {/* <div className="bg-[#BCBCBC] fixed h-screen w-screen top-0 left-0 z-0"/> */}
    </>
  );
}
