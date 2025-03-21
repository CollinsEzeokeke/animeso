// import { motion } from "framer-motion";

import EnhancedSmoothCarousel from "./enhanced-smooth-carousel";

export default function FourthScrollOverlay() {
  const cards = [
    { id: "1", title: "NLP Scheduling" },
    { id: "2", title: "Widgets" },
    { id: "3", title: "Multiple accounts" },
    { id: "4", title: "Pomodoro" },
    // { id: "5", title: "Timezones" },
    // { id: "6", title: "Calendar" },
  ];

  // Text labels for the navigation dots
  const dotLabels = [
    { text: "Features", value: "features" },
    { text: "Pricing", value: "pricing" },
    { text: "About", value: "about" },
    { text: "Contact", value: "contact" },
    { text: "FAQ", value: "faq" },
  ];
  return (
    <div className="h-[150vh] bg-blue-500 -mt-[25vh]">
      <div className="flex items-end w-full text-white bg-red-500 h-[100%]">
        <div className="h-[60%] w-full bg-green-500 overflow-hidden">
          <EnhancedSmoothCarousel cards={cards} dotLabels={dotLabels} />
        </div>
      </div>
    </div>
  );
}
