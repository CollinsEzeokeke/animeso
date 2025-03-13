// components/VideoLoader.tsx
"use client";

import { MotionValue, motion } from "framer-motion";
import { Search, Plus, Monitor, Settings } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import { useWindowSize } from "@uidotdev/usehooks";

export const VideoLoader = ({
  y,
  visibility,
  opacityTransform,
  backgroundColor,
  blackBarSpring,
  heightTransform,
  // videoWidthTransform,
}: {
  y: MotionValue<string>;
  visibility?: MotionValue<number>;
  opacityTransform: MotionValue<number>;
  backgroundColor: MotionValue<string>;
  blackBarSpring: MotionValue<number>;
  heightTransform: MotionValue<string>;
  // videoWidthTransform: MotionValue<string>;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [canScroll, setCanScroll] = useState(false);

  // Video event handlers
  useEffect(() => {
    // Skip unnecessary work if video ref isn't available
    if (!videoRef.current) return;

    const video = videoRef.current;

    // Use passive event listeners for better performance
    const handleCanPlay = () => {
      // Use requestAnimationFrame to avoid layout thrashing
      requestAnimationFrame(() => {
        video?.play().catch((err) => {
          console.warn("Auto-play failed:", err);
        });
      });
    };

    const handleEnded = () => {
      setCanScroll(true);

      // Batch style changes together
      requestAnimationFrame(() => {
        document.documentElement.style.overflow = "auto";
        document.body.style.overflow = "auto";
      });
    };

    // Add event listeners with passive option when possible
    video.addEventListener("canplaythrough", handleCanPlay, { passive: true });
    video.addEventListener("ended", handleEnded, { passive: true });

    // Cleanup function
    return () => {
      video.removeEventListener("canplaythrough", handleCanPlay);
      video.removeEventListener("ended", handleEnded);

      // Remove references to avoid memory leaks
      video.src = "";
      video.load();
    };
  }, []);

  // Use memoized styles to prevent unnecessary style calculations
  const motionStyles = useMemo(
    () => ({
      y,
      scale: 1.01,
      visibility,
      willChange: "transform, opacity",
      // width: 1000, // from 0.01 to 0.02
      // marginLeft: 100,
      // width: videoWidthTransform,
    }),
    [y, visibility]
  );

  const { width } = useWindowSize();
  if (!width) return;

  // Apply CSS containment for better performance isolation
  return (
    <motion.div
      className="absolute z-10 inset-0 h-full top-[5%] w-full contain-paint"
      style={motionStyles}
    >
      <motion.video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="h-full w-full object-obtain"
        preload="auto"
        // style={{
        //   width: videoWidthTransform,
        //   // marginLeft: 100,
        // }}
      >
        <source src="/minor.mp4" type="video/mp4" />
      </motion.video>

      <div
        className={`absolute bottom-14 left-0 w-full pointer-events-none ${
          width <= 768 ? "flex items-center bg-amber-950 h-[45vh]" : "h-[90vh]"
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
            className={`z-50 w-48 min-h-[40px] rounded-lg shadow-lg pointer-events-auto relative flex items-center justify-between px-2 bg-blue-500 ${
              width <= 768 ? "top-2" : "top-2"
            }`}
            style={{
              // marginLeft: 30, // from 0.04 to 0.08
              // width: 400,
            }}
          >
            {/* Search Icon */}
            <Search className="w-5 h-5 mx-1 text-gray-700" />

            {/* Line Separator */}
            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            {/* Folder Replacement */}
            <motion.div className="relative mr-0">
              <motion.div
                className="w-8 h-6 mx-0 rounded flex items-center justify-center font-semibold text-sm"
                style={{
                  backgroundColor,
                  opacity: blackBarSpring,
                }}
              >
                25℃
              </motion.div>
              <motion.div
                className="w-8 mx-0 rounded absolute top-0 left-0 bg-center bg-cover bg-no-repeat bg-black"
                style={{
                  // backgroundImage: "url('/firstShow.png')",
                  height: heightTransform,
                  // width: widthTransform,
                  opacity: opacityTransform,
                  willChange: "opacity, width, height",
                }}
              />
              {/* <ScrollOverlay /> */}
              {/* </motion.div> */}
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
  );
};
