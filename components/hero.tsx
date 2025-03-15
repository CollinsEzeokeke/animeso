"use client";
import { motion } from "framer-motion";
import { useWindowSize } from "@uidotdev/usehooks";
import { VideoLoader } from "./videoLoader";
import {
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion"; // add if you wish to track the scrollYProgress then uncomment line 156
import { useEffect, useRef, useState } from "react";
import { useScaleStore } from "@/hooks/store/store";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setNowState } = useScaleStore();
  const [zoomIng, setZoomIng] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const { width, height } = useWindowSize();
  const yIndex = useTransform(scrollYProgress, [0, 0.01], ["-10%", "-10%"]);
  const widthCheckRef = useRef<HTMLDivElement>(null);
  const [isLatest, setIsLatest] = useState(0);
  const [baseWidth, setBaseWidth] = useState(0);

  // Measure the initial width of the container
  useEffect(() => {
    setTimeout(() => {
      if (widthCheckRef.current) {
        const width = widthCheckRef.current.offsetWidth;
        setBaseWidth(width);
      }
    }, 1); // Even a 0ms timeout pushes execution to after paint
  }, []);

  // this is where the basic animation configuration starts for the hero zoom effect

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
      "-500%", // this is the value at 0.099
      "-695%", // this is the value at 0.107
      "-885%", // this is the value at 0.115
      "-1075%", // this is the value at 0.123
      "-1270%", //this is the value at 0.131
      "-1460%", // this is the value at 0.139
      "-1650%", // this is the value at 0.147
      "-1850%", // this is the Value at 0.155
      "-2300%", // this is the value at 0.17
    ]
  );
  const marging = useTransform(scrollYProgress, [0.017, 0.045], [0, 20]);
  const myScale = useTransform(scrollYProgress, [0.131, 0.142], [0, 1]);
  const marginLeft = useTransform(scrollYProgress, [0.1, 0.2], [0, -210]); //intended to make the zooming push towards the right direction without being detected by zooming controls
  //  const marginRight = useTransform(scrollYProgress, [0.1, 0.2], [0, -210]);
  // opacity for the text
  const reduceOpacity = useTransform(
    scrollYProgress,
    [0, 0.01, 0.02],
    [1, 0.5, 0]
  );
  const stiffOpacity = useSpring(reduceOpacity, {
    stiffness: 500,
    damping: 60,
  });
  // end of basic animation configuration for the hero zoom effect

  // For the video component holder
  const visibility = useTransform(scrollYProgress, [0.155, 0.16], [1, 0]);
  const move = useTransform(scrollYProgress, [0.1, 0.12], ["-9.5%", "-10%"]);
  // Springs for smoother animations
  const visibilitySpring = useSpring(visibility, {
    stiffness: 500,
    damping: 50,
  });
  const moveUp = useSpring(move, { stiffness: 400, damping: 90 });

  //  for the menu bar
  const backgroundColor = useTransform(
    scrollYProgress,
    [0.085, 0.09],
    ["rgb(96, 165, 250)", "transparent"]
  );
  //  folder changes
  const blackBar = useTransform(scrollYProgress, [0.185, 0.19], [1, 1]);
  const blackBarSpring = useSpring(blackBar, { stiffness: 500, damping: 50 });
  // Pre-calculate transforms for height, width  and opacity
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
  useMotionValueEvent(myScale, "change", (latest) => {
    setNowState(latest);
  });
  useMotionValueEvent(zoomIn, "change", (latest) => {
    if (latest != 0) {
      setIsLatest(20);
    }
    setZoomIng(Math.min(latest, 5.6));
  });
  const zoomingE = baseWidth + zoomIng + isLatest;

  if (!width) return null;
  if (!height) return null;
  return (
    <>
      <div className="overflow-x-hidden">
        <motion.div
          className="h-[90vh] w-full overflow-x-hidden flex overflow-y-hidden mt-0 justify-center"
          style={{
            zIndex: 10,
          }}
        >
          <motion.div
            className="flex justify-center absolute pt-0 top-[4vh] w-[65vw] h-screen"
            ref={widthCheckRef}
          >
            {/* this part has all the different styles and animations  */}
            <motion.div
              className={`bg-transparent min-h-[100vh] w-full flex items-center justify-center z-0 top-0 relative
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
                className={`flex flex-col h-[25%] -mt-[40%] ${
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
              {/* New wrapper div for bottom placement */}
            </motion.div>

            {/* makes contents unclickable */}
            <div className="h-[100vh] w-[65vw] z-50 absolute bg-none" />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
