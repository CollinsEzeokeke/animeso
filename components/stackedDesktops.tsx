import { useThirdScrollOverlay } from "@/hooks/store/store";
import Desktop from "./desktop";
import Image from "next/image";
import { useMemo, useCallback } from "react";
import { useWindowSize } from "@uidotdev/usehooks";

interface StackedDevicesProps {
  count?: number;
  className?: string;
  offset?: number;
}

export default function StackedDesktops({
  count = 3,
  className = "",
}: StackedDevicesProps) {
  const { thirdScrollProgress } = useThirdScrollOverlay();
  const { height, width } = useWindowSize();

  
  const responsiveScaling = useMemo(() => {
    if (!height || !width) return;
    if (width > 768 && width <= 1397 && width != 1440) {
      return "scaleX(1.065)";
    }
    return "scaleX(1) scaleY(1.03)";
  }, [height, width]);
  // Common video props to avoid duplication
  const commonVideoProps = useMemo(
    () => ({
      className: "w-full h-full object-contain translate-y-2 scale-y-full",
      autoPlay: true,
      muted: true,
      loop: true,
      playsInline: true,
      style: { transform: `${responsiveScaling} ` }, // Stretch horizontally by 20%
    }),
    [responsiveScaling]
  );

  // Memoize the video render function
  const renderVideo = useCallback(() => {
    if (thirdScrollProgress >= 0.99) {
      return (
        <div className="relative h-full w-full">
          <video src="/mailTodos.mp4" {...commonVideoProps} />
          <div className="absolute bottom-0 z-[60] h-[5%] w-1/2 left-1/2 -translate-x-full flex items-center -translate-y-full">
            <Image
              src="/stamponvideo.webp"
              alt="mailTodos"
              width={50}
              height={50}
              priority={true}
            />
          </div>
        </div>
      );
    } else if (thirdScrollProgress >= 0.7933) {
      return <video src="/three.mp4" {...commonVideoProps} />;
    } else if (thirdScrollProgress >= 0.5967) {
      return <video src="/two.mp4" {...commonVideoProps} />;
    } else if (thirdScrollProgress >= 0.4) {
      return <video src="/one.mp4" {...commonVideoProps} />;
    } else {
      // Default nothing if not in the right range
      return <video src="/three.mp4" {...commonVideoProps} />;
    }
  }, [thirdScrollProgress, commonVideoProps]);
  const responsiveHeight = useMemo(() => {
    if (!height || !width) return;
    if (width > 768 && width <= 1397 && width != 1440) {
      return "h-[70vh]";
    }
    return "h-[55vh]";
  }, [height, width]);
  const responsiveHeightOther = useMemo(() => {
    if (!height || !width) return;
    if (width > 768 && width <= 1397 && width != 1440) {
      return "h-[70.5vh]";
    }
    return "h-[55.5vh]";
  }, [height, width]);
  const responsiveVideo = useMemo(() => {
    if (!height || !width) return;
    if (width > 768 && width <= 1397 && width != 1440) {
      return "w-[50vw]";
    }
    return "w-[45vw]";
  }, [height, width]);
  // Memoize the array creation
  const deviceArray = useMemo(
    () =>
      Array.from({ length: count }).map((_, index) => {
        // Pre-calculate styles for each device
        const deviceStyle = {
          top: `${index === 1 ? 5 : 10}px`,
          left: "0px",
          zIndex: count - index,
          willChange: index === 1 ? "transform" : undefined, // Only add willChange for animated elements
        };

        // Memoize the device class name
        const deviceClassName = `shadow-xl ${responsiveVideo} ${
          index === 1 ? "border-none" : "border-none border-4"
        } ${index === 1 ? `${responsiveHeight}` : `${responsiveHeightOther}`} ${
          index === 1 ? "bg-transparent" : "bg-white"
        } ${index === 0 && "bg-transparent"}`;

        return {
          index,
          deviceStyle,
          deviceClassName,
          shouldRenderVideo: index === 1,
        };
      }),
    [count, responsiveHeight, responsiveHeightOther, responsiveVideo]
  );

  const responsive = useMemo(() => {
    if (!height || !width) return;
    if (width > 768 && width <= 1397 && width != 1440) {
      return "-translate-y-20  -translate-x-20";
    }
    return "-translate-x-11";
  }, [height, width]);
  // Memoize the container class name
  const containerClassName = useMemo(
    () => `relative h-[70%] w-[50%] ${className} ${responsive}`,
    [className, responsive]
  );

  return (
    <div className={`${containerClassName}`}>
      {deviceArray.map(
        ({ index, deviceStyle, deviceClassName, shouldRenderVideo }) => (
          <div key={index} className="absolute h-full " style={deviceStyle}>
            <Desktop className={deviceClassName}>
              {shouldRenderVideo && (
                <>
                  {/* Conditionally render videos based on thirdScrollProgress */}
                  <div className={`relative ${responsiveVideo} h-full overflow-hidden`}>
                    {renderVideo()}
                  </div>
                </>
              )}
            </Desktop>
          </div>
        )
      )}
    </div>
  );
}
