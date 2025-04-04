import { Canvas } from "@react-three/fiber";
import {
  useMotionValue,
  useScroll,
} from "framer-motion";
import { Suspense } from "react";
import useMeasure from "react-use-measure";
import Scene from "./Scene";

export default function AmieLogo() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  // const containerRef = useRef<HTMLDivElement>(null);
  const [canvasRef, canvasBounds] = useMeasure({ scroll: false });

  console.log("this is the canvas height: ",canvasBounds.height, "this is the canvas width: ", canvasBounds.width, "this is the canvas x: ", canvasBounds.x, "this is the canvas y: ", canvasBounds.y, "this is the canvas top: ", canvasBounds.top, "this is the canvas left: ", canvasBounds.left, "this is the canvas right: ", canvasBounds.right, "this is the canvas bottom: ", canvasBounds.bottom)

  const { scrollYProgress } = useScroll({
    // If the scroll container isn't the window, specify it:
    // target: containerRef,
    // offset: ["start end", "end end"] // Adjust offset if needed
  });

  return (
    <div
      // ref={containerRef}
      // Ensure the parent div allows scrolling if it's not the window default
      className="bg-red-500 h-[200vh] w-screen flex flex-col justify-start items-center pt-20" 
      style={{ overflowY: "auto" }} // Make sure this element scrolls
    >
      <div className="h-[50vh] text-white text-center">Scroll Down...</div>

      <div 
        className="bg-green-500 h-[40vh] w-[30vw] cursor-pointer sticky top-1/4"
        // ref={canvasRef}
      >
        <Suspense fallback={null}>
          <Canvas ref={canvasRef}>
            <Scene
              mouseX={mouseX}
              mouseY={mouseY}
              scrollYProgress={scrollYProgress}
              canvasBounds={canvasBounds}
            />
          </Canvas>
        </Suspense>
      </div>

      <div className="h-[100vh] text-white text-center">Keep Scrolling...</div>
    </div>
  );
}