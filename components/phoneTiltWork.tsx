"use client";

import Image from "next/image";
import StackedDevices from "./StackedDevices";
import { useProgressor } from "@/hooks/store/store";
import { useMemo } from "react";

export default function PhoneTiltWork() {
  const {currentProgression} = useProgressor();
  
  // Memoize the text classes based on currentProgression to prevent recalculations
  const primaryTextClass = useMemo(() => 
    currentProgression >= 0.99 ? "text-white" : "text-[#a4a1a195]"
  , [currentProgression]);
  
  const secondaryTextClass = useMemo(() => 
    currentProgression === 0.825 ? "text-white" : "text-[#a4a1a195]"
  , [currentProgression]);
  
  const tertiaryTextClass = useMemo(() => 
    currentProgression <= 0.66 ? "text-white" : "text-[#a4a1a195]"
  , [currentProgression]);
  
  return (
    <>
      {/* Main content */}
      <main className="relative z-10 w-full h-full flex flex-col items-center justify-start px-6 pt-10 pb-32 bg-black">
        <div className="w-full flex justify-evenly h-full">
        {/* max-w-7xl */}
          {/* Left column - Text content */}
          <div className="flex items-end justify-end w-1/2">
            <div className="flex flex-col items-center -space-y-1 pt-10 w-4/5 h-2/3">
              {/* Primary heading */}
              <span className="flex items-start gap-0">
                <span className={`text-4xl font-semibold ${primaryTextClass}`}>Enjoy</span>
                <Image
                  src="/email.svg"
                  width={100}
                  height={200}
                  alt=" "
                  className="opacity-100 animate-fadeIn relative -mt-5"
                  style={{ animationDelay: "0.7s" }}
                  priority={true}
                />
                <span className={`text-4xl font-semibold ${primaryTextClass}`}>
                  emails on mobile.
                </span>
              </span>

              {/* Secondary text */}
              <span className={`flex items-start ${secondaryTextClass}`}>
                <span className="text-4xl font-semibold ">
                  Schedule
                </span>
                <Image 
                  src="/email-todos.svg" 
                  width={150} 
                  height={200} 
                  alt="" 
                  className="-mt-5"
                  priority={true}
                />
                <span className={`text-4xl font-semibold ml-3 ${secondaryTextClass}`}>with drag</span>
              </span>

              {/* Tertiary text */}
              <span className="flex items-start gap-3">
                <span className={`text-4xl font-semibold ${secondaryTextClass}`}>and drop. </span>
                <span className={`text-4xl font-semibold ${tertiaryTextClass}`}>Made for you.</span>
              </span>
            </div>
          </div>

          {/* Right column - Device visualization */}
          <div className="relative flex justify-start w-2/5 items-start h-full">
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
