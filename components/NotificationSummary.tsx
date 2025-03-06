import IconBox from "./IconBox";
import Card from "./Card";
import { motion } from "framer-motion";
import CardTwo from "./CardTwo";

export default function NotificationSummary() {
  return (
    <div className="animate-fade-in delay-300 mt-12">
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

{
  /* <div
            className="h-full bg-white rounded-sm p-[6px] box-border shadow-[1px_0px_2px_rgba(0,0,0,0.2),0_9px_18px_rgba(0,0,0,0.3)]"
            style={{ transform: "translateZ(20px)" }}
          >
            <div className="flex gap-[2px] items-center">
              <Image
                src="/avatar.png"
                fill
                alt="avatar"
                className="rounded-full size-3"
              />
              <div className="flex-grow flex gap-[2px] flex-col">
                <div className="rounded-full bg-black opacity-25 h-[5px]"></div>
                <div className="rounded-full bg-black opacity-10 h-[3px]"></div>
              </div>
            </div>
            <div className="mt-[6px] flex flex-col gap-[3px]">
              <div className="rounded-[2px] bg-black opacity-15 h-[20px]"></div>
              <div className="rounded-full bg-black opacity-10 h-[3px]"></div>
              <div className="rounded-full bg-black opacity-10 h-[3px]"></div>
              <div className="bg-white absolute inset-x-[6px] bottom-[4px] h-[8px] shadow-[0_0.5px_2px_rgba(0,0,0,0.1),0_1px_4px_rgba(0,0,0,0.15)] rounded-[2px]"></div>
            </div>
          </div> */
}
