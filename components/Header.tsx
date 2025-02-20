"use client"

import { useScroll, useAnimation, motion } from "framer-motion";
import { Flame } from "lucide-react";
import { useRef, useEffect } from "react";

const DirectionAwareScrollComponent = () => {
    const { scrollY } = useScroll();
    const lastScrollY = useRef(0);
    const isScrollingUp = useRef(false);
    const controls = useAnimation();
    const returnThreshold = 100; // Pixels from top to trigger return
  
    // Spring configuration for natural bounce
    const springConfig = {
      type: "spring",
      stiffness: 400,
      damping: 30,
      restDelta: 0.001,
    };
  
    useEffect(() => {
      const updateScrollDirection = () => {
        const current = scrollY.get();
        isScrollingUp.current = current < lastScrollY.current;
        lastScrollY.current = current;
  
        if (isScrollingUp.current) {
          // Spring upward animation
          controls.start({
            y: "0%",
            transition: springConfig,
          });
        } else {
          // Only return to position when near top
          if (current < returnThreshold) {
            controls.start({
              y: "-100%",
              transition: {
                type: "tween",
                ease: "easeOut",
                duration: 0.35,
              },
            });
          }
        }
      };
  
      const unsubscribe = scrollY.on("change", updateScrollDirection);
      return () => unsubscribe();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollY, controls]);
  
    return (
      <>
      <div className="w-screen h-[9.5vh] bg-[#BCBCBC] fixed top-0 z-[10]">
        <motion.nav animate={controls}  className="w-full min-h-[9vh] flex justify-center items-center fixed top-0 overflow-hidden">
          <a
            href="https://amie.so/changelog"
            target="_blank"
            className="rounded-3xl h-11 w-[12%] bg-[#999999] hover:bg-[#858585] flex items-center justify-center text-sm font-bold text-white font-sans top-7 fixed z-50"
          >
            <Flame className="text-white -mt-1 size-4 font-black stroke-[4px] rotate-[15deg]" />
            <button className="p-1 font-sans">Last Update: Feb 12</button>
          </a>
          <div>
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
          </div>
        </motion.nav>
      </div>
      </>
    );
  };

  export default DirectionAwareScrollComponent;