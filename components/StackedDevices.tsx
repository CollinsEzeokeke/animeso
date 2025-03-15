import Device from "./device";
import { useProgressor } from "@/hooks/store/store";
import { useInView } from "framer-motion";
import { useRef, useMemo, useCallback } from "react";

interface StackedDevicesProps {
  count?: number;
  className?: string;
  offset?: number;
}

export default function StackedDevices({
  count = 3,
  className = "",
}: StackedDevicesProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    margin: "100% 0px 0px 0px", // Start loading when one full viewport away
    once: true // Only trigger once
  });
  
  const {currentProgression} = useProgressor();

  // Memoize the video render function to optimize performance
  const renderVideo = useCallback(() => {
    if (!isInView) return null; // Don't render anything if not in view

    // Common video props to prevent duplication
    const commonVideoProps = {
      className: "w-full h-full object-fill scale-x-100 origin-left",
      autoPlay: true,
      muted: true,
      loop: true,
      playsInline: true,
      preload: "auto",
    };

    if (currentProgression >= 0.99) {
      return (
        <video
          src="/phoneVidOne.mov"
          {...commonVideoProps}
        />
      );
    } else if (currentProgression >= 0.825) {
      return (
        <video
          src="/phoneVidTwo.mp4"
          {...commonVideoProps}
        />
      );
    } else if (currentProgression <= 0.66) {
      return (
        <video
          src="/phoneVidOne.mov"
          {...commonVideoProps}
        />
      );
    } else {
      // Default video or fallback
      return (
        <video
          src="/phoneVidOne.mov"
          {...commonVideoProps}
        />
      );
    }
  }, [isInView, currentProgression]);

  // Memoize the array creation to prevent recreation on every render
  const deviceArray = useMemo(() => 
    Array.from({ length: count }).map((_, index) => {
      // Pre-calculate styles for each device
      const deviceStyle = {
        top: `${index === 1 ? 5 : 0}px`,
        left: `0px`,
        zIndex: count - index,
        opacity: index === 0 ? 0 : 1,
      };

      const deviceClassName = `shadow-xl ${
        index === 1 ? "border-none" : "border-white border-4"
      } ${index === 1 ? " h-[65vh]" : "h-[66.5vh]"}`;

      const transformStyle = {
        opacity: `${index === 0 ? 0 : 1}`,
        transform: `perspective(1500px) 
                   rotateX(${
                     index === 0
                       ? 0
                       : index === 1
                       ? 2
                       : index === -0.5
                       ? -0.5
                       : 0
                   }deg) 
                   rotateY(${-50 + index * 3}deg) 
                   rotateZ(${10 - index * 1}deg) 
                   translateZ(${30 - index * 5}px)`,
        willChange: "transform" // Hardware acceleration hint
      };

      return {
        index,
        deviceStyle,
        deviceClassName,
        transformStyle,
        shouldRenderVideo: index === 1
      };
    }),
    [count]
  );

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {deviceArray.map(({index, deviceStyle, deviceClassName, transformStyle, shouldRenderVideo}) => (
        <div
          key={index}
          className="absolute"
          style={deviceStyle}
        >
          <Device
            className={deviceClassName}
            style={transformStyle}
          >
            {shouldRenderVideo && (
              <>
                {/* Conditionally render videos based on currentProgression */}
                <div className="relative w-[20vw] h-[65vh] overflow-hidden">
                  {renderVideo()}
                </div>
              </>
            )}
          </Device>
        </div>
      ))}
    </div>
  );
}
