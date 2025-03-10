"use client";
import { motion } from "framer-motion";
import WeatherLocation from "./WeatherLocation";
import NotificationSummary from "./NotificationSummary";
import ActionButtons from "./ActionButtons";

export default function ThirdScrollOverlay() {
  return (
    <section className="relative top-0 left-0 w-full h-full pointer-events-none z-[60] overflow-y-auto">
      <div className="min-h-[80vh]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[70vw] h-full relative bg-green-500">
          {/* Content container with animation */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-blue-500"
          >
            {/* the contents go into this place */}
            {/* max-w-3xl */}
            <div className=" w-full text-center space-y-6 z-10">
                THIS IS THE THIRD SCROLL OVERLAY AND IT SUCKS
              <WeatherLocation />
              <NotificationSummary />
            </div>
           
            {/* ActionButtons component is now rendered outside this container and fixed at the bottom */}
            <ActionButtons />
          </motion.div> 
        </div>
      </div>
    </section>
  );
}
