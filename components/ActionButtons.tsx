"use client";
import { Play, Download, DollarSign } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function ActionButtons() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.3, 0.45], ["0", "1"]);
  const opacitySpring = useSpring(opacity, { stiffness: 500, damping: 20 });
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 flex items-center justify-center space-x-4 py-6 bg-gradient-to-t from-black/30 to-transparent backdrop-blur-sm z-50"
      style={{ opacity: opacitySpring }}
    >
      <button className="glass-button flex items-center justify-center px-6 py-3 rounded-full text-white">
        <Play className="mr-2 h-5 w-5" />
        Watch film
      </button>
      <button className="glass-button flex items-center justify-center px-6 py-3 rounded-full text-white">
        <DollarSign className="mr-2 h-5 w-5" />
        Pricing
      </button>
      <button className="glass-button flex items-center justify-center px-6 py-3 rounded-full text-white">
        <Download className="mr-2 h-5 w-5" />
        Download
      </button>
    </motion.div>
  );
}
