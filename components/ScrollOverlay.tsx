"use client";
import { motion } from "framer-motion";
import DailyStatus from "./DailyStatus";
import WeatherLocation from "./WeatherLocation";
import NotificationSummary from "./NotificationSummary";
import ActionButtons from "./ActionButtons";

export default function ScrollOverlay() {
  // triggerPoint = 0.26,
  // const { scrollYProgress } = useScroll();
  // const backgroundImage = "/logo-shaded.png";

  // Create transform values for animation
  // Map 0.16-0.25 scroll progress to 0-1 opacity and 100px-0px y translation
  // const opacity = useTransform(
  //   scrollYProgress,
  //   [triggerPoint, triggerPoint + 0.09],
  //   [0, 1]
  // );

  // const yTranslate = useTransform(
  //   scrollYProgress,
  //   [triggerPoint, triggerPoint + 0.09],
  //   ["100px", "0px"]
  // );

  return (
    <section className="relative top-0 left-0 w-full h-full pointer-events-none z-[60] overflow-y-auto">
      <div className="min-h-[100vh]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[65vw] h-full relative">
          {/* Background image container with animation */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            // style={{
            //   backgroundImage: `url('${backgroundImage}')`,
            // }}
          />

          {/* Content container with animation */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-blue-500"
          >
            {/* the contents go into this place */}
            {/* max-w-3xl */}
            <div className=" w-full text-center space-y-6 z-10">
              <DailyStatus />
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
