"use client";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import StackedDesktops from "./stackedDesktops";
import { useThirdScrollOverlay } from "@/hooks/store/store";
import Image from "next/image";

export default function ThirdScrollOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);
  const { setThirdScrollProgress, thirdScrollProgress } = useThirdScrollOverlay();

  // Track scroll progress of the entire red container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end start", "start start"], // From when container enters view to when it leaves
  });

  const orangeHeight = useTransform(
    scrollYProgress,
    [0.99, 0.4], // Input range (from higher to lower scroll value)
    ["15vh", "134.5vh"] // Output range (from lower to higher height)
  );
  // Monitor scroll progress and set fixed state
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("this is the latest value: ", latest);
    // equal distances 0.40 ───── 0.5967 ───── 0.7933 ───── 0.99
    if (latest > 0.99 || latest <= 0.4) {
      setIsFixed(false);
    } else {
      setIsFixed(true);
    }

    // Use threshold-based checks instead of exact equality
    const threshold = 0.01; // Adjust this value as needed

    if (Math.abs(latest - 0.99) < threshold) {
      setThirdScrollProgress(0.99);
    }
    if (Math.abs(latest - 0.7933) < threshold) {
      setThirdScrollProgress(0.7933);
    }
    if (Math.abs(latest - 0.5967) < threshold) {
      setThirdScrollProgress(0.5967);
    }
    if (Math.abs(latest - 0.4) < threshold) {
      setThirdScrollProgress(0.4);
    }
  });

  const renderImageLeft = () => {
    if (thirdScrollProgress >= 0.99) {
      return " ";
    } else if (thirdScrollProgress >= 0.7933) {
      return (
        <Image src="/feature-integrations-left.png" alt="mailTodos" width={50} height={50} />
      );
    } else if (thirdScrollProgress >= 0.5967) {
      return (
       <Image src="/feature-bar-event.png" alt="mailTodos" width={50} height={50} />
      );
    } else {
      // Default nothing if not in the right range
      return " ";
    }
  };
  // const renderImageRight = () => {
  //   if (thirdScrollProgress >= 0.99) {
  //     return (
  //       <div className="relative h-full w-full">
  //         <video
  //           src="/mailTodos.mp4"
  //           className="w-full h-full object-contain"
  //           autoPlay
  //           muted
  //           loop
  //           playsInline
  //         />
  //         <div className="absolute bottom-0 z-[60] h-[18%] w-1/2 left-1/2 -translate-x-full flex items-center -translate-y-full">
  //           <Image
  //             src="/stamponvideo.webp"
  //             alt="mailTodos"
  //             width={50}
  //             height={50}
  //           />
  //         </div>
  //       </div>
  //     );
  //   } else if (thirdScrollProgress >= 0.7933) {
  //     return (
  //       <video
  //         src="/three.mp4"
  //         className="w-full h-full object-contain "
  //         autoPlay
  //         muted
  //         loop
  //         playsInline
  //       />
  //     );
  //   } else if (thirdScrollProgress >= 0.5967) {
  //     return (
  //       <video
  //         src="/two.mp4"
  //         className="w-full h-full object-contain "
  //         autoPlay
  //         muted
  //         loop
  //         playsInline
  //       />
  //     );
  //   } else if (thirdScrollProgress >= 0.4) {
  //     return (
  //       <video
  //         src="/one.mp4"
  //         className="w-full h-full object-contain "
  //         autoPlay
  //         muted
  //         loop
  //         playsInline
  //       />
  //     );
  //   } else {
  //     // Default nothing if not in the right range
  //     return " ";
  //   }
  // };


  return (
    <div
      className="h-[200vh] bg-black z-[60] relative mb-56"
      ref={containerRef}
    >
      <motion.div
        className=" flex items-center bg-blue-500 justify-center text-white"
        style={{ height: orangeHeight }}
      />
      <motion.div
        className={`h-[80vh] w-[80%] z-[60] flex flex-col items-center justify-center ${
          isFixed
            ? "fixed top-[13vh] left-1/2 -translate-x-1/2"
            : "relative mx-auto"
        }
         `}
      >
{/*         
        <div
          className={`bg-orange-500 w-[45%] -mt-20 ${
            isFixed ? "fixed top-[13vh] h-[30vh]" : "relative"
          }  z-0`}
        >
          <span className="flex flex-col gap-2 space-y-0 items-start justify-around ">
            <span className="text-3xl font-semibold flex flex-col justify-around h-[10%] gap-2 pt-0">
              <span className="">
                Emails are closer than ever to your todos
              </span>
              <span className="w-full">
                <span>and calendar.</span>
                <span className="">{" "} No need to break up with</span>
              </span>
            </span>

            <span className="text-3xl font-semibold  mt-0">
              {" "}
             <span>{" "}your apps, just connect them.{" "}</span> 
             <span>Like to</span>
            </span>
            <span className="text-3xl font-semibold">
            {" "}miss meetings? Not with Amie in the
            </span>
            <span className=" text-3xl font-semibold">
              <span>menubar. {" "}</span>
              <span>Share your free slots with</span>
            </span>
            <span className="text-3xl font-semibold justify-self-start">
              <span>anyone you like.</span>
            </span>
          </span>
        </div> 
       */}

        <StackedDesktops />
        <div className="bg-pink-500 h-full flex justify-evenly items-center w-full absolute z-0">
          <div className="bg-red-500 w-[40%] h-[50%]">
            {/* periodic image on the left */}
            {renderImageLeft()}
          </div>
          <div className="bg-purple-500 w-[40%] h-[50%]">
            {/* periodic image on the right */}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
