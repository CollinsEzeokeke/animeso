import { Canvas } from "@react-three/fiber";
import { Model } from "./model";
import {
  MotionValue,
  // time, // Not using time directly in this approach for now
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { motion } from "framer-motion-3d";
import { Suspense, useRef, useState } from "react";
import useMeasure from "react-use-measure";

export default function AmieLogo() {
  const [isHover, setIsHover] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ref, bounds] = useMeasure({ scroll: false });

  const resetMousePosition = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const { scrollYProgress } = useScroll({
    // If the scroll container isn't the window, specify it:
    // target: containerRef,
    // offset: ["start end", "end start"] // Adjust offset if needed
  });

  return (
    <div
      ref={containerRef}
      // Ensure the parent div allows scrolling if it's not the window default
      className="bg-red-500 h-[200vh] w-screen flex flex-col justify-start items-center pt-20"
      style={{ overflowY: "auto" }} // Make sure this element scrolls
    >
      <div className="h-[50vh] text-white text-center">Scroll Down...</div>

      <motion.div
        className="bg-green-500 h-[29vh] w-[25vw] cursor-pointer sticky top-1/4"
        // @ts-expect-error ref type mismatch but works at runtime
        ref={ref}
        onPointerEnter={() => setIsHover(true)}
        onPointerMove={(e) => {
          // Ensure bounds are valid before calculating relative position
          if (bounds.width > 0 && bounds.height > 0) {
            const x = e.clientX - bounds.x - bounds.width / 2;
            const y = e.clientY - bounds.y - bounds.height / 2;
            mouseX.set(x);
            mouseY.set(y);
          }
        }}
        onPointerLeave={() => {
          resetMousePosition();
          setIsHover(false);
        }}
        whileHover={{ scale: 1.1 }} // Slightly increased hover scale
        transition={{ type: "spring", stiffness: 300, damping: 20 }} // Keep container spring snappy
      >
        <Suspense fallback={null}>
          <Canvas>
            <Scene
              mouseX={mouseX}
              mouseY={mouseY}
              bounds={bounds}
              scrollYProgress={scrollYProgress}
              isHover={isHover}
            />
          </Canvas>
        </Suspense>
      </motion.div>

      <div className="h-[100vh] text-white text-center">Keep Scrolling...</div>
    </div>
  );
}

// --- Scene Component ---

function Scene({
  mouseX,
  mouseY,
  bounds,
  scrollYProgress,
  isHover,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  bounds: { width: number; height: number };
  scrollYProgress: MotionValue<number>;
  isHover: boolean;
}) {
  // --- Base Settings (Keep as is) ---
  const baseRotationX = Math.PI * 0.4;
  const baseRotationY = Math.PI * 1.5;
  const baseRotationZ = Math.PI * -0.7;
  const basePositionX = 0.5;
  const basePositionY = 1;
  const basePositionZ = 0;

  // --- Scroll Transformations (WIDER RANGE) ---
  // Increase the difference between start and end values for more rotation during scroll
  const scrollRotateX = useTransform(
    scrollYProgress,
    [0, 1],
    [baseRotationX, baseRotationX + Math.PI / 1.5]
  ); // Increased from PI/2.5
  const scrollRotateY = useTransform(
    scrollYProgress,
    [0, 1],
    [baseRotationY, baseRotationY - Math.PI / 2]
  ); // Increased from PI/5
  const scrollPosY = useTransform(
    scrollYProgress,
    [0, 1],
    [basePositionY, basePositionY - 1.0]
  ); // Optional: Increase scroll position change if desired
  const scrollPosX = useTransform(
    scrollYProgress,
    [0, 1],
    [basePositionX, basePositionX - 1.0]
  ); // Optional: Increase scroll position change if desired

  // --- Hover Transformations (Offsets - WIDER RANGE / MORE SENSITIVITY) ---
  // Increase the output range (e.g., -Math.PI/6 to Math.PI/6) to make hover rotation more pronounced.
  // Increase position offsets (e.g., -0.3 to 0.3) for wider movement on hover.
  const hoverRotY_from_MouseX = useTransform(
    mouseX,
    [-bounds.width / 2, bounds.width / 2],
    [-Math.PI / 6, Math.PI / 6]
  ); // Increased from PI/10
  // console.log(bounds.height)
  // console.log(Math.PI /6, -Math.PI / 6)
  const hoverRotX_from_MouseY = useTransform(
    mouseY,
    [-bounds.height / 2, bounds.height],
    [Math.PI / 6, -Math.PI / 6]
  ); // Increased from PI/10 (inverted Y still)
  const hoverPosX_from_MouseX = useTransform(
    mouseX,
    [-bounds.width / 2, bounds.width / 2],
    [-0.3, 0.3]
  ); // Increased from 0.18
  const hoverPosY_from_MouseY = useTransform(
    mouseY,
    [-bounds.height / 2, bounds.height / 2],
    [0.3, -0.3]
  ); // Increased from 0.18 (inverted Y still)
  // ADDED: Hover effect for Z rotation
  const hoverRotZ_from_MouseX = useTransform(
    mouseX,
    [-bounds.width / 2, bounds.width / 2],
    [-Math.PI / 12, Math.PI / 12]
  ); // Subtle Z rotation on hover

  // --- Calculating Target Values ---
  // Combine base, scroll, and hover effects to determine the instantaneous target state.
  // No explicit idle motion added here yet, the "freer" feel comes from the spring and wider ranges.

  const targetRotateX = useTransform(() => {
    const hoverOffset = isHover ? hoverRotX_from_MouseY.get() : 0;
    return scrollRotateX.get() + hoverOffset;
  });

  const targetRotateY = useTransform(() => {
    const hoverOffset = isHover ? hoverRotY_from_MouseX.get() : 0;
    return scrollRotateY.get() + hoverOffset;
  });

  // Apply hover effect to Z rotation as well
  const targetRotateZ = useTransform(() => {
    const hoverOffset = isHover ? hoverRotZ_from_MouseX.get() : 0;
    return baseRotationZ + hoverOffset;
  });
  // Previous simpler version:
  // const targetRotateZ = useMotionValue(baseRotationZ);

  const targetPositionX = useTransform(() => {
    const currentScrollPosX = scrollPosX ? scrollPosX.get() : basePositionX; // If using scroll position
    const hoverOffset = !isHover
      ? hoverPosX_from_MouseX.get() + currentScrollPosX
      : 0;
    return basePositionX + hoverOffset;
  });

  const targetPositionY = useTransform(() => {
    const currentScrollPosY = scrollPosY ? scrollPosY.get() : basePositionY; // If using scroll position
    const hoverOffset = isHover
      ? hoverPosY_from_MouseY.get() + currentScrollPosY
      : 0;
    return basePositionY + hoverOffset;
  });

  const targetPositionZ = useMotionValue(basePositionZ);

  // --- Applying Spring Physics (ADJUSTED FOR FREER FEEL) ---
  // Lower stiffness makes the spring softer and take longer to reach the target.
  // Lower damping allows for more oscillation/overshoot (bounciness).
  // Mass influences inertia; slightly higher mass can make it feel less "snappy" and more "weighty".
  // **EXPERIMENT WITH THESE VALUES!**
  const springConfig = {
    stiffness: 60, // Lowered from 90 (Softer, slower response)
    damping: 12, // Lowered from 18 (More bouncy / overshoot)
    mass: 1, // Slightly increased from 0.8 (More inertia)
    restDelta: 0.001 // Keep or adjust if needed
  };

  const smoothRotateX = useSpring(targetRotateX, springConfig);
  const smoothRotateY = useSpring(targetRotateY, springConfig);
  const smoothRotateZ = useSpring(targetRotateZ, springConfig); // Apply spring to Z too
  const smoothPositionX = useSpring(targetPositionX, springConfig);
  const smoothPositionY = useSpring(targetPositionY, springConfig);
  const smoothPositionZ = useSpring(targetPositionZ, springConfig); // Apply spring even if target is static

  return (
    <>
      {/* Add helpers outside the scaled group for better visibility */}
      <gridHelper 
        args={[50, 50]} 
        position={[0, 0, -10]} 
        rotation={[Math.PI/2, 0, 0]}
        userData={{ helper: true }}
      />
      <axesHelper 
        args={[30]} 
        position={[0, 0, -10]}
        userData={{ helper: true }}
      />
    
      <motion.group
        scale={0.009} // Base scale
        // Bind the sprung values to the group's properties
        rotation-x={smoothRotateX}
        rotation-y={smoothRotateY}
        rotation-z={smoothRotateZ} // Added Z rotation
        position-x={smoothPositionX}
        position-y={smoothPositionY}
        position-z={smoothPositionZ}
      >
        {/* --- Lighting (Adjust intensity/position if needed with wider movement) --- */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[8, 10, 5]} intensity={2.5} castShadow />
        <directionalLight
          position={[-8, -5, -3]}
          intensity={1.0}
          color="#cadbed"
        />{" "}
        {/* Slightly increased fill intensity */}
        <Model />
      </motion.group>
    </>
  );
}
