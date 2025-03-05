"use client";
import { motion } from "framer-motion";

interface ScrollOverlayProps {
  // The scroll progress at which the overlay should start appearing
  triggerPoint?: number;
  // Background image URL
  backgroundImage?: string;
  // Custom content for the overlay
  children?: React.ReactNode;
}

export default function ScrollOverlay({
  // triggerPoint = 0.26,
  backgroundImage = "/logo-shaded.png",
  children,
}: ScrollOverlayProps) {
  // const { scrollYProgress } = useScroll();
  
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
    <section className="relative top-0 left-0 w-full h-full pointer-events-none z-[60] bg-red-500 overflow-y-auto">
      <div className="min-h-[300vh] bg-blue-500" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[65vw] h-full relative">
          {/* Background image container with animation */}
          <motion.div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url('${backgroundImage}')`,
              // opacity,
              // y: yTranslate
            }}
          />
          
          {/* Content container with animation */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ 
              // opacity,
              // y: yTranslate
            }}
          >
            {children || (
              <div className="text-white text-center">
                <h2 className="text-4xl font-bold mb-4">Your Content Here</h2>
                <p className="text-xl">Content that slides up as you scroll</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 