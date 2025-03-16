import IconBox from "./IconBox";
import Card from "./Card";
import { motion } from "framer-motion";
import CardTwo from "./CardTwo";

export default function NotificationSummary() {
  return (
    <div className="animate-fade-in delay-300 pt-5">
      <p className="text-6xl font-bold text-white/90 flex flex-wrap items-center justify-center">
        <span className="text-slate-50/90">You got</span>
        <motion.div
          whileHover={{ rotate: -12 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <IconBox className="mx-3 flex w-16 relative">
            <div className="w-full h-20 bg-slate-400/50 rounded-xl rotate-12 absolute -top-1 left-2 z-10" />
            <Card className="relative z-20" />
          </IconBox>
        </motion.div>
        2 emails and have
      </p>
      <p className="text-6xl font-bold text-white/90 flex flex-wrap items-center justify-center">
        <IconBox className="mx-3 w-32 relative">
          <div className="w-full h-16 bg-slate-400/50 rounded-xl -rotate-12 absolute top-1 left-0 z-10" />
          <CardTwo className="relative z-20"/>
        </IconBox>
        2 meetings today.
      </p>
    </div>
  );
}