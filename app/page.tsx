"use client";
import DirectionAwareScrollComponent from "@/components/Header";
import Hero from "@/components/hero";
import { ScrollLock } from "@/components/scrollLock";
import ScrollOverlay from "@/components/ScrollOverlay";
import { Geiger } from "react-geiger";
import React from "react";
import { motion, useTransform, useSpring, useScroll } from "framer-motion";
import { useWindowSize } from "@uidotdev/usehooks";
import SecondScrollOverlay from "@/components/SecondScrollOverlay";
// import ThirdScrollOverlay from "@/components/ThirdScrollOverlay";

export default function Page() {
  const { width, height } = useWindowSize();
  const { scrollYProgress } = useScroll();

  // Create all transform values at the top level of the component
  // Simplified ranges with fewer keyframes for better performance
  const rawScale = useTransform(scrollYProgress, [0, 0.05], [1.1, 0.3]);
  const scale = useSpring(rawScale, { stiffness: 400, damping: 90 });

  const y = useTransform(scrollYProgress, [0, 0.05], ["0%", "-70%"]);

  if (!width || !height) return;
  return (
    <Geiger
      renderTimeThreshold={1.0}
      enabled={process.env.NODE_ENV === "development"}
    >
      <div className="relative min-h-dvh bg-[#FEFEFE] z-0 overflow-hidden">
        <div
          className={`${
            width === 1440 ? "w-full" : "w-full"
          } h-full flex justify-center overflow-hidden relative`}
        >
          <motion.div
            //  ${width >= 1440 && "w-[12vw]"} ${width >= 1024 && "w-[20vw]"} ${width >= 768 && "w-[25vw]"} ${width >= 768 && "-mt-2"} ${width < 768 && width >= 700 && "w-[28vw]"}
            className={`bg-cover h-[20vh] bg-center fixed top-[8.5vh] flex justify-self-center -translate-x-1/2 bg-no-repeat transition-all z-[1000] ${
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
        <div className="relative z-10 w-full">
          <DirectionAwareScrollComponent />
        </div>
        <div className="w-full bg-[#BFBFBF]">
          <ScrollLock />
          <Hero />
          <section className="relative z-0 bg-none min-h-[100vh]"></section>
        </div>

        {/* Overlay content that animates on scroll */}
        <div className="bg-black relative">
          <ScrollOverlay />
          <SecondScrollOverlay />
          <div className="h-[100vh] bg-purple-500"/>
          {/* <ThirdScrollOverlay /> */}
        </div>

        {/* Post-scroll content */}
        {/* {postScrollContent} */}
      </div>
    </Geiger>
  );
}
