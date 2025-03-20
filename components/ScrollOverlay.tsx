"use client";
import { motion } from "framer-motion";
import DailyStatus from "./DailyStatus";
import WeatherLocation from "./WeatherLocation";
import NotificationSummary from "./NotificationSummary";
import { useScaleStore } from "@/hooks/store/store";

export default function ScrollOverlay() {
  const { nowScale } = useScaleStore();
  return (
    <motion.section
      style={{
        scale: nowScale,
        transformOrigin: "center",
        willChange: "scale",
      }}
      className="relative -top-0 left-0 w-full h-screen pointer-events-none z-[60] overflow-y-auto bg-black"
    >
      {/* <div className="" /> */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[75vw] h-full relative">
          {/* Content container with animation */}
          <motion.div className="absolute inset-0 flex items-center justify-center">
            {/* the contents go into this place */}
            {/* max-w-3xl */}
            <div className=" w-full text-center space-y-5 z-10 bg-green-500">
              <DailyStatus />
              <WeatherLocation />
              <NotificationSummary />
            </div>
          </motion.div>
        </div>
      </div>
      <div className="h-[60vh]" />
    </motion.section>
  );
}
