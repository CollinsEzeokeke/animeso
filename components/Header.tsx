"use client";

import { useWindowSize } from "@uidotdev/usehooks";
import { useScroll, motion, useTransform } from "framer-motion";
import { Flame } from "lucide-react";
import { memo, useMemo } from "react";

// Memoize button styling calculation
const UpdateButton = memo(({ width }: { width: number | null }) => {
  // Memoize dynamic class computation to prevent recalculation on renders
  const buttonClasses = useMemo(() => {
    const baseClasses =
      "rounded-3xl h-11 bg-[#999999] hover:bg-[#858585] flex items-center justify-center text-sm font-bold text-white font-sans top-7 fixed z-[100]";

    if (!width) return `${baseClasses} hidden`;
    if (width < 768) return `${baseClasses} hidden`;
    if (width === 768) return `${baseClasses} w-[25%] -mt-2`;
    if (width === 1024) return `${baseClasses} w-[20%] -mt-2`;
    if (width === 1440) return `${baseClasses} w-[12%]`;

    return baseClasses;
  }, [width]);

  return (
    <motion.a
      href="https://amie.so/changelog"
      target="_blank"
      className={buttonClasses}
      // Add performance optimizations
      initial={false}
      layoutDependency={false}
    >
      <Flame className="text-white -mt-1 size-4 font-black stroke-[4px] rotate-[15deg]" />
      <button className="p-1 font-sans">Last Update: Feb 12</button>
    </motion.a>
  );
});

UpdateButton.displayName = "UpdateButton";

// Memoize nav buttons to prevent unnecessary re-renders
const NavButtons = memo(() => (
  <div className="fixed right-0 top-7 pr-6 md:pr-10 flex font-medium gap-6">
    <div className="text-base text-black">
      <a
        href="https://calendar.amie.so/login"
        className="hover:opacity transition-opacity"
      >
        <span className="bg-gradient-to-br animate-backgroundAnimate from-black/60 to-black/30 inline-block text-transparent bg-clip-text">
          Sign in
        </span>
      </a>
    </div>
    <div className="text-base">
      <a
        href="https://calendar.amie.so/login"
        className="hover:opacity-80 transition-opacity bg-black text-white px-4 py-2 rounded-md"
      >
        Get started
      </a>
    </div>
  </div>
));

NavButtons.displayName = "NavButtons";

const DirectionAwareScrollComponent = () => {
  const { width } = useWindowSize();

  // Use the default page scroll tracking when no target is specified
  const { scrollYProgress } = useScroll({
    // This tracks the entire page scroll by default
    offset: ["start start", "end start"],
  });

  // Fix the Hook error by calling useTransform directly in the component
  const y = useTransform(scrollYProgress, [0, 0.005], ["0%", "-100%"]);

  // Memoize spring configuration
  // const springConfig = useMemo(
  //   () => ({
  //     stiffness: 400,
  //     damping: 90,
  //   }),
  //   []
  // );

  // const ySpring = useSpring(y, springConfig);

  // Memoize container style to prevent object recreation on render
  const containerStyle = useMemo(
    () => ({
      y,
      willChange: "transform",
      translateZ: 0, // Hardware acceleration
    }),
    []
  );

  return (
    <motion.div
      className="w-screen h-[9.5vh] fixed top-0 z-[1000] overflow-hidden bg-[#BFBFBF]"
      style={containerStyle}
      // Using document scroll tracking, so no ref needed
      initial={false}
      layoutDependency={false}
    >
      <motion.nav
        className="w-full min-h-[9vh] h-full flex justify-center items-center absolute top-0"
        initial={false}
        layoutDependency={false}
      >
        <UpdateButton width={width} />
        <NavButtons />
      </motion.nav>
    </motion.div>
  );
};

export default memo(DirectionAwareScrollComponent);
