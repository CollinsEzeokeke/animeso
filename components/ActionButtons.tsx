"use client";
import { Play, Download, DollarSign } from "lucide-react";
import { motion, useTransform, useSpring, useScroll } from "framer-motion";

export default function ActionButtons() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.12, 0.45], ["0", "1"]);
  const opacitySpring = useSpring(opacity, { stiffness: 500, damping: 20 });
  // useMotionValueEvent(scrollYProgress, "change", (latest) => {
  //   console.log("scrollYProgress is :", latest);
  // });
  return (
    <motion.div
      className="fixed bottom-0 left-0 z-[100] right-0 flex items-center justify-center space-x-4 py-6 bg-gradient-to-t bg-transparent"
      style={{ opacity: opacitySpring }}
    >
      <div className="w-[25%] h-[4.5vh] flex bg-[#4a4a4ab5] justify-center items-center rounded-xl">
        <button className="glass-button flex items-center justify-evenly h-[80%] text-white text-base font-semibold w-[30%] -ml-0 hover:bg-[#4a4a4ab5]/50 rounded-md">
          <div className="bg-black h-[45%] w-[15%] flex items-center justify-center rounded-md -ml-2"><Play className="h-2 stroke-[8px]" /></div>
          <p className="">Watch film</p>
        </button>
        <button className="glass-button flex items-center justify-center text-white hover:bg-[#4a4a4ab5]/50  h-[80%] w-[30%] -mr-7 ml-4 rounded-md">
          <DollarSign className="mr-2 h-5 w-5" />
          Pricing
        </button>
        <button className="glass-button flex items-center justify-center text-white hover:bg-[#4a4a4ab5]/50  h-[80%] w-[30%] ml-10 rounded-md">
          <Download className="mr-2 h-5 w-5" />
          Download
        </button>
      </div>
    </motion.div>
  );
}
