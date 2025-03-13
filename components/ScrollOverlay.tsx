"use client";
import { motion } from "framer-motion";
import DailyStatus from "./DailyStatus";
import WeatherLocation from "./WeatherLocation";
import NotificationSummary from "./NotificationSummary";
import { useScaleStore } from "@/hooks/store/store";

export default function ScrollOverlay() {
  const {nowScale} = useScaleStore()
  return (
    <motion.section
      style={{ scale: nowScale }}
      className="relative top-0 left-0 w-full h-full pointer-events-none z-[60] overflow-y-auto"
    >
      {/* <div className="" /> */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[70vw] h-full relative bg-purple-500">
          {/* Content container with animation */}
          <motion.div className="absolute inset-0 flex items-center justify-center bg-black">
            {/* the contents go into this place */}
            {/* max-w-3xl */}
            <div className=" w-full text-center space-y-6 z-10">
              <DailyStatus />
              <WeatherLocation />
              <NotificationSummary />
            </div>

            {/* ActionButtons component is now rendered outside this container and fixed at the bottom */}
            {/* <ActionButtons /> */}
          </motion.div>
        </div>
      </div>
      <div className="h-[60vh]" />
    </motion.section>
  );
}
