"use client";

import Image from "next/image";
import StackedDevices from "./StackedDevices";
import { useProgressor } from "@/hooks/store/store";
// import { useMemo } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
export default function PhoneTiltWork() {
  const {currentProgression} = useProgressor();
  const {width, height} = useWindowSize();
  const notInRange = "text-white"
  const inRange = "text-[#a4a1a195]"
  // Memoize the text classes based on currentProgression to prevent recalculations
  const primaryTextClass = () => {
   return currentProgression >= 0.99 ? notInRange : inRange

  }
  
  const secondaryTextClass = () => {
    return currentProgression === 0.825 ? notInRange : inRange
  }
  
  const tertiaryTextClass = () => {
    return currentProgression <= 0.66 ? notInRange : inRange
  }
 
  const responsive = () => {
   if(!height || !width) return;
   if(width > 768 && width <= 1397 && width != 1440) {
    return "w-[100%]"
   }
   return "w-4/5"
  }
  
  return (
    <>
      {/* Main content */}
      <main className="relative z-10 w-full h-full flex flex-col items-center justify-start px-6 pt-10 pb-32">
        <div className="w-full flex justify-evenly h-full ">
          {/* Left column - Text content */}
          <div className="flex items-end justify-end w-1/2 ">
            <div className={`flex flex-col items-center -space-y-1 pt-10 h-2/3  ${responsive()}`}>
              {/* Primary heading */}
              <span className="flex items-start gap-0 w-full ">
                <span className={`text-4xl font-semibold ${primaryTextClass()}`}>Enjoy</span>
                <Image
                  src="/email.svg"
                  width={100}
                  height={200}
                  alt=" "
                  className={`opacity-100 animate-fadeIn relative -mt-5 ${currentProgression === 0.99 ? "opacity-100" : "opacity-45"}`}
                  style={{ animationDelay: "0.7s" }}
                  priority={true}
                />
                <span className={`text-4xl font-semibold ${primaryTextClass()}`}>
                  emails on mobile.
                </span>
              </span>

              {/* Secondary text */}
              <span className={`flex items-start ${secondaryTextClass()}`}>
                <span className="text-4xl font-semibold ">
                  Schedule
                </span>
                <Image 
                  src="/email-todos.svg" 
                  width={150} 
                  height={200} 
                  alt="" 
                  className={`-mt-5 ${currentProgression === 0.825 ? "opacity-100" : "opacity-45"}`}
                  priority={true}
                />
                <span className={`text-4xl font-semibold ml-3 ${secondaryTextClass()}`}>with drag</span>
              </span>

              {/* Tertiary text */}
              <span className="flex items-start gap-3">
                <span className={`text-4xl font-semibold ${secondaryTextClass()}`}>and drop. </span>
                <span className={`text-4xl font-semibold ${tertiaryTextClass()}`}>Made for you.</span>
              </span>
            </div>
          </div>

          {/* Right column - Device visualization */}
          <div className="relative flex justify-start w-[30%] items-start h-full">
            <div
              className="transform transition-all duration-1000 opacity-100 translate-y-0"
            >
              <StackedDevices />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
