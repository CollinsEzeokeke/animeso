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
import { useRef } from "react";
import { useScaleStore } from "@/hooks/store/store";
// import ScrollOverlay from "./ScrollOverlay";
// import { useStore } from "@/hooks/store/store";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setNowState } = useScaleStore();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const { width, height } = useWindowSize();
  const yIndex = useTransform(scrollYProgress, [0, 0.01], ["-10%", "-10%"]);

  // this is where the basic animation configuration starts for the hero zoom effect

  const zoomIn = useTransform(
    scrollYProgress,
    [
      0.019, 0.027, 0.035, 0.043, 0.051, 0.059, 0.067, 0.075, 0.083, 0.091, 
      0.099, 0.107, 0.115, 0.123, 0.131, 0.139, 0.147, 0.155, 0.163, 0.17
    ],
    [
      1.2, 2.5, 3.5, 4.1, 4.5, 5, 6, 7, 8, 10, 15, 20, 25, 30, 35, 40, 45, 50,
      55, 60
    ]
  );

  const movingAnother = useTransform(
    scrollYProgress,
    [
      0, 0.005, 0.011, 0.019, 0.027, 0.035, 0.043, 0.051, 0.059, 0.067, 0.075,
      0.083, 0.091, 0.099, 0.107, 0.115, 0.123, 0.131, 0.139, 0.147, 0.155,
      0.17,
    ],
    [
      "15%",
      "-10%",
      "-10%",
      "-10%",
      "-50%", //this is the value at 0.027
      "-85%", // this is the value at 0.035
      "-99%", // this is the value at 0.043
      "-110%", // this is the value at 0.051
      "-125%", // this is the value at 0.059
      "-160%", // this is the value at 0.067
      "-190%", // this is the value at 0.075
      "-220%", // this is the value at 0.083
      "-480%", // this is the value at 0.091
      "-680%", // this is the value at 0.099
      "-880%", // this is the value at 0.107
      "-1080%", // this is the value at 0.115
      "-1250%", // this is the value at 0.123
      "-1460%", //this is the value at 0.131
      "-1650%", // this is the value at 0.139
      "-1850%", // this is the value at 0.147
      "-2050%", // this is the Value at 0.155
      "-2300%", // this is the value at 0.17
      // "-2500%", // Keep same value at 0.17
    ]
  );
  const myScale = useTransform(scrollYProgress, [0.131, 0.142], [0, 1]);
  // console.log(typeof(myScale))
  // const x = useTransform(
  //   scrollYProgress,
  //   [
  //     0.035, 0.043, 0.051, 0.059, 0.067, 0.075, 0.083, 0.091, 0.099, 0.107,
  //     0.115, 0.123, 0.131, 0.17,
  //   ],
  //   [0, 0, 0, 0, 0, 10, 100, 390, 550, 725, 870, 1000, 1200, 1850]
  // );

  const marginLeft = useTransform(scrollYProgress, [0.1, 0.2], [0, 40]);

  // const stiffZoom = useSpring(zoomIn, {
  //   stiffness: 300,
  //   damping: 90,
  //   restDelta: 0.001,
  // });
  // const springingAnother = useSpring(movingAnother, {
  //   stiffness: 300,
  //   damping: 90,
  //   // restDelta: 0.001,
  // });

  // const xSpring = useSpring(x, {
  //   stiffness: 500,
  //   damping: 90,
  //   restDelta: 0.01,
  // });
  // Opacity for texts on top
  const reduceOpacity = useTransform(scrollYProgress, [0, 0.01, 0.02], [1, 0.5, 0]);
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
  // const videoWidthTransform = useTransform(scrollYProgress, [0.01, 0.02], [90, 1000]);
  

  // Add width transform that changes from w-8 (32px) to w-10 (40px)
  // const widthTransform = useTransform(
  //   scrollYProgress,
  //   [0.155, 0.16],
  //   ["32px", "40px"]
  // );
  const opacityTransform = useTransform(
    scrollYProgress,
    [0.085, 0.09, 0.185, 0.4],
    [0, 1, 1, 1]
  );
  // Box shadow transform
  // const boxShadowTransform = useTransform(containerBgOpacity, (opacity) =>
  //   opacity === 0
  //     ? "none"
  //     : "var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)"
  // );
  //  this is where the event listener for the scrollYProgress is set for checks and calculations
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("this is the latest value: ", latest);
  });
  useMotionValueEvent(myScale, "change", (latest) => {
    console.log("this is the latest scale value: ", latest);
    setNowState(latest)
  });

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
            {/* this part has all the different styles and animations  */}
            <motion.div
              className={`bg-transparent min-h-[100vh] w-[65vw] flex items-center justify-center z-0 top-0 relative
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
                // x: xSpring,
                // width: 10000,
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
              <VideoLoader visibility={visibilitySpring} y={moveUp} opacityTransform={opacityTransform} backgroundColor={backgroundColor} blackBarSpring={blackBarSpring} heightTransform={heightTransform} />
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

// lock the height at this point since it is where the background forms

// 0.15961945031712474
