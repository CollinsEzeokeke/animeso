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
  zoomingE,
  marging,
}: // videoWidthTransform,
{
  y: MotionValue<string>;
  visibility?: MotionValue<number>;
  opacityTransform: MotionValue<number>;
  backgroundColor: MotionValue<string>;
  blackBarSpring: MotionValue<number>;
  heightTransform: MotionValue<string>;
  zoomingE: number;
  marging: MotionValue<number>;
  // videoWidthTransform: MotionValue<string>;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [canScroll, setCanScroll] = useState(false);
  
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
      width: zoomingE,
      // width: 1000, // from 0.01 to 0.02
      marginLeft: marging,
      // width: videoWidthTransform,
    }),
    [y, visibility, zoomingE, marging]
  );

  const { width, height } = useWindowSize();
  
  // Memoize conditional classes to avoid recalculation
  const overlayClass = useMemo(() => {
    if (!width) return "h-[90vh]";
    return width <= 768 ? "flex items-center bg-amber-950 h-[45vh]" : "h-[90vh]";
  }, [width]);
  
  const containerClass = useMemo(() => {
    if (!width) return "items-end justify-center h-full";
    return width <= 768 ? "bg-red-500 justify-center items-center h-full" : "items-end justify-center h-full";
  }, [width]);
  
  const topPositionClass = useMemo(() => {
    if (!width) return "top-2";
    return width <= 1024 ? "-top-14" : "top-2";
  }, [width]);

  const Containerresponsive = useMemo(() => {
    if (!width || !height) return "";
    if (width <= 1394 && height <= 697) return "top-[10%]";
    return "top-[5%]";
  }, [width, height]);

  if (!width) return null;

  // Apply CSS containment for better performance isolation
  return (
    <motion.div
      className={`absolute z-10 inset-0 h-full w-full contain-paint ${Containerresponsive}`}
      style={motionStyles}
      ref={containerRef}
    >
      <motion.video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="h-full w-full object-obtain"
        preload="auto"
      >
        <source src="/minor.mp4" type="video/mp4" />
      </motion.video>

      <div
        className={`absolute bottom-14 left-0 w-full pointer-events-none ${overlayClass}`}
      >
        {" "}
        {/* Full container overlay */}
        <div
          className={`relative w-full flex ${containerClass}`}
        >
          {" "}
          <motion.div
            className={`z-50 w-48 min-h-[40px] rounded-lg shadow-lg pointer-events-auto relative flex items-center justify-between px-2 bg-white 
              ${topPositionClass}

              `}
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
                  height: heightTransform,
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
  );
};
