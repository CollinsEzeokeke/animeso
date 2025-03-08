// // import { motion } from "framer-motion";
// export default function SecondScrollOverlay() {
//   return (
//     <section className="relative w-full bg-pink-800 pointer-events-none z-[60] flex flex-col items-center">
//       <div className="h-[50vh]" />
//       <div className="flex justify-center w-full">
//         <div className="relative bg-purple-950 w-5/6">
//           <div className="h-[100vh]">
//             <div className="sticky top-5 bg-green-500 z-50">
//               <div className="h-[50vh] border-white border-8 bg-black flex items-center justify-center text-white text-2xl">Card 1</div>
//             </div>
//           </div>

//           <div className="h-[100vh]">
//             <div className="sticky top-5 bg-green-500 z-40">
//               <div className="h-[50vh] border-white border-8 bg-black flex items-center justify-center text-white text-2xl">Card 2</div>
//             </div>
//           </div>

//           <div className="h-[100vh]">
//             <div className="sticky top-5 bg-green-500 z-30">
//               <div className="h-[50vh] border-white border-8 bg-black flex items-center justify-center text-white text-2xl">Card 3</div>
//             </div>
//           </div>

//           <div className="h-[100vh]">
//             <div className="sticky top-5 bg-green-500 z-20">
//               <div className="h-[50vh] border-white border-8 bg-black flex items-center justify-center text-white text-2xl">Card 4</div>
//             </div>
//           </div>

//           <div className="h-[100vh]">
//             <div className="sticky top-5 bg-green-500 z-10">
//               <div className="h-[50vh] border-white border-8 bg-black flex items-center justify-center text-white text-2xl">Card 5</div>
//             </div>
//           </div>

//           <div className="h-[30vh]"></div>
//         </div>
//       </div>
//     </section>
//   );
// }

import {
  useScroll,
  useMotionValueEvent,
  motion,
  // useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

export default function SecondScrollOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);

  // Track scroll progress of the entire red container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end start", "start start"], // From when container enters view to when it leaves
  });

  // Transform scroll progress to opacity (for demonstration)
  // const blueContainerOpacity = useTransform(scrollYProgress,
  //   [0, 0.2, 0.8, 1], // Input range - scroll progress values
  //   [0.3, 1, 1, 0.3]   // Output range - opacity values
  // );

  // Monitor scroll progress and set fixed state
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.99 || latest <= 0.66) {
      setIsFixed(false);
    } else {
      setIsFixed(true);
    }

    console.log("Scroll progress:", latest, "Fixed:", isFixed);
  });

  return (
    <div className="h-[130vh] bg-red-500 z-[60] relative" ref={containerRef}>
      {/* Red container contents - you can add more elements here */}
      <div className="h-[25vh] flex items-center justify-center text-white">
        Scroll down to see the fixed blue container
      </div>

      {/* Blue container - conditionally fixed based on scroll */}
      <motion.div
        className={`h-[50vh] bg-blue-500 w-[80%] z-[1000] ${
          isFixed
            ? "fixed top-[20vh] left-1/2 -translate-x-1/2"
            : "relative mx-auto"
        }
         `}
         
        //  ${isFixed2 ? "mt-[50vh]" : ""}
        style={
          {
            // opacity: blueContainerOpacity
          }
        }
      >
        <div className="flex items-center justify-center h-full text-white text-xl">
          {isFixed ? "I'm fixed now!" : "I'm in normal flow"}
        </div>
      </motion.div>

      {/* Placeholder when blue container is fixed */}
      {isFixed && (
        <div className="h-[50vh] w-[80%] mx-auto opacity-0">Placeholder</div>
      )}

      {/* More content for scrolling */}
      <div className="h-[55vh] flex items-end justify-center pb-10 text-white">
        Keep scrolling to unfix the blue container
      </div>
    </div>
  );
}
