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
  const baseRotationX = Math.PI * 0.55;
  const baseRotationY = Math.PI * 1;
  const baseRotationZ = Math.PI * -0.7;
  const basePositionX = 0;
  const basePositionY = 0;
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
  const hoverRotX_from_MouseY = useTransform(
    mouseY,
    [-bounds.height / 2, bounds.height / 2],
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
    const hoverOffset = isHover
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
    // restDelta: 0.001 // Keep or adjust if needed
  };

  const smoothRotateX = useSpring(targetRotateX, springConfig);
  const smoothRotateY = useSpring(targetRotateY, springConfig);
  const smoothRotateZ = useSpring(targetRotateZ, springConfig); // Apply spring to Z too
  const smoothPositionX = useSpring(targetPositionX, springConfig);
  const smoothPositionY = useSpring(targetPositionY, springConfig);
  const smoothPositionZ = useSpring(targetPositionZ, springConfig); // Apply spring even if target is static

  return (
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
      {/* Optional Helpers */}
      <axesHelper args={[5]} />
      <gridHelper args={[10, 20]} />
    </motion.group>
  );
}

// import { Canvas } from "@react-three/fiber";
// import { Model } from "./model";
// import {
//   MotionValue,
//   // time,
//   useMotionValue,
//   useScroll,
//   useSpring,
//   useTransform,
// } from "framer-motion";
// import { motion } from "framer-motion-3d";
// import { Suspense, useRef, useState } from "react";
// import useMeasure from "react-use-measure";

// export default function AmieLogo() {
//   const [isHover, setIsHover] = useState(false);
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [ref, bounds] = useMeasure({ scroll: false });

//   const resetMousePosition = () => {
//     mouseX.set(0);
//     mouseY.set(0);
//   };

//   const { scrollYProgress } = useScroll();

//   return (
//     <div
//       ref={containerRef}
//       className="bg-red-500 h-[200vh] w-screen flex flex-col justify-start items-center pt-20"
//       style={{ overflowY: 'auto' }}
//     >
//       <div className="h-[50vh] text-white text-center">Scroll Down...</div>

//       <motion.div
//         className="bg-green-500 h-[29vh] w-[25vw] cursor-pointer sticky top-1/4"
//         // @ts-expect-error ref type mismatch but works at runtime
//         ref={ref}
//         onPointerEnter={() => setIsHover(true)}
//         onPointerMove={(e) => {
//           const x = e.clientX - bounds.x - bounds.width / 2;
//           const y = e.clientY - bounds.y - bounds.height / 2;
//           mouseX.set(x);
//           mouseY.set(y);
//         }}
//         onPointerLeave={() => {
//           resetMousePosition();
//           setIsHover(false);
//         }}
//         whileHover={{ scale: 1.05 }}
//         transition={{ type: "spring", stiffness: 300, damping: 20 }}
//       >
//         <Suspense fallback={null}>
//           <Canvas>
//             <Scene
//               mouseX={mouseX}
//               mouseY={mouseY}
//               bounds={bounds}
//               scrollYProgress={scrollYProgress}
//               isHover={isHover}
//             />
//           </Canvas>
//         </Suspense>
//       </motion.div>

//       <div className="h-[100vh] text-white text-center">Keep Scrolling...</div>
//     </div>
//   );
// }

// // --- Scene Component ---

// function Scene({
//   mouseX,
//   mouseY,
//   bounds,
//   scrollYProgress,
//   isHover,
// }: {
//   mouseX: MotionValue<number>;
//   mouseY: MotionValue<number>;
//   bounds: { width: number; height: number };
//   scrollYProgress: MotionValue<number>;
//   isHover: boolean;
// }) {

//   // --- Base Settings ---
//   const baseRotationX = Math.PI * 0.55;
//   const baseRotationY = Math.PI * 1;
//   const baseRotationZ = Math.PI * -0.7;
//   const basePositionX = 0;
//   const basePositionY = 0;
//   const basePositionZ = 0;

//   // --- Scroll Transformations ---
//   // Map scroll progress to base rotation adjustments
//   const scrollRotateX = useTransform(scrollYProgress, [0, 1], [baseRotationX, baseRotationX + Math.PI / 2.5]);
//   const scrollRotateY = useTransform(scrollYProgress, [0, 1], [baseRotationY, baseRotationY - Math.PI / 5]);
//   // const scrollPosY = useTransform(scrollYProgress, [0, 1], [basePositionY, basePositionY - 0.5]); // Optional scroll position

//   // --- Hover Transformations (Offsets) ---
//   // Define how much mouse movement affects rotation/position offsets.
//   // Renamed for clarity: Mouse X affects Y-axis rotation, Mouse Y affects X-axis rotation.
//   const hoverRotY_from_MouseX = useTransform(mouseX, [-bounds.width / 2, bounds.width / 2], [-Math.PI / 10, Math.PI / 10]); // Slightly increased sensitivity
//   const hoverRotX_from_MouseY = useTransform(mouseY, [-bounds.height / 2, bounds.height / 2], [Math.PI / 10, -Math.PI / 10]); // Inverted Y mouse -> X rotation
//   const hoverPosX_from_MouseX = useTransform(mouseX, [-bounds.width / 2, bounds.width / 2], [-0.18, 0.18]); // Slightly increased sensitivity
//   const hoverPosY_from_MouseY = useTransform(mouseY, [-bounds.height / 2, bounds.height / 2], [0.18, -0.18]); // Inverted Y mouse -> Y position

//   // --- Combining Targets with Idle Motion ---
//   // These MotionValues calculate the *desired instantaneous state*
//   // including base, scroll, idle, and conditional hover effects.

//   const targetRotateX = useTransform(() => {
//     // const time = clock.elapsedTime;
//     // Math.sin(time * 0.6) * 0.02;
//     const idleOffset = 2; // Subtle idle sway on X
//     const hoverOffset = isHover ? hoverRotX_from_MouseY.get() : 0;
//     return scrollRotateX.get() + idleOffset + hoverOffset;
//   });

//   const targetRotateY = useTransform(() => {
//     // const time = clock.elapsedTime;
//     // Math.cos(time * 0.5) * 0.025;
//     const idleOffset = 2 // Subtle idle sway on Y (different speed/amplitude)
//     const hoverOffset = isHover ? hoverRotY_from_MouseX.get() : 0;
//     return scrollRotateY.get() + idleOffset + hoverOffset;
//   });

//   // Keep Z rotation simpler for now, just the base
//   const targetRotateZ = useMotionValue(baseRotationZ);
//   // If you wanted idle/hover on Z:
//   // const targetRotateZ = useTransform(() => {
//   //   const time = clock.elapsedTime;
//   //   const idleOffset = Math.sin(time * 0.4) * 0.015;
//   //   const hoverOffset = isHover ? useTransform(mouseX, [-bounds.width / 2, bounds.width / 2], [-Math.PI/16, Math.PI/16]).get() : 0;
//   //   return baseRotationZ + idleOffset + hoverOffset;
//   // });

//   const targetPositionX = useTransform(() => {
//     // const currentScrollPosX = scrollPosX ? scrollPosX.get() : basePositionX;
//     const hoverOffset = isHover ? hoverPosX_from_MouseX.get() : 0;
//     return basePositionX + hoverOffset; // No idle position offset added here, but could be
//   });

//   const targetPositionY = useTransform(() => {
//     // const currentScrollPosY = scrollPosY ? scrollPosY.get() : basePositionY;
//     const hoverOffset = isHover ? hoverPosY_from_MouseY.get() : 0;
//     // Add subtle Y idle bob?
//     // const time = clock.elapsedTime;
//     // const idleBob = Math.sin(time * 0.8) * 0.03;
//     // return currentScrollPosY + idleBob + hoverOffset;
//     return basePositionY + hoverOffset;
//   });

//   const targetPositionZ = useMotionValue(basePositionZ);

//   // --- Applying Spring Physics ---
//   // Use spring to smoothly animate towards the calculated targets.
//   // **Tuning Point:** Adjust these values to change the animation 'feel'.
//   const springConfig = {
//       stiffness: 90,    // Lower = softer/slower spring. Higher = stiffer/faster.
//       damping: 18,      // Lower = more bouncy. Higher = more dampened/less overshoot. (Usually 15-30)
//       mass: 0.8,        // Higher = more inertia, feels 'heavier'. (Usually 0.5-1.5)
//       // restDelta: 0.001 // Threshold for stopping the animation - lower for higher precision
//   };

//   const smoothRotateX = useSpring(targetRotateX, springConfig);
//   const smoothRotateY = useSpring(targetRotateY, springConfig);
//   const smoothRotateZ = useSpring(targetRotateZ, springConfig); // Spring applied even to static targets
//   const smoothPositionX = useSpring(targetPositionX, springConfig);
//   const smoothPositionY = useSpring(targetPositionY, springConfig);
//   const smoothPositionZ = useSpring(targetPositionZ, springConfig);

//   // useFrame can still be used for non-motion-property related things if needed
//   // useFrame((state, delta) => {
//   //   // e.g., custom shader uniform updates
//   // });

//   return (
//     <motion.group
//         // No ref needed here as Framer Motion controls it via props
//         scale={0.009} // Base scale
//         // Bind the sprung values to the group's properties
//         rotation-x={smoothRotateX}
//         rotation-y={smoothRotateY}
//         rotation-z={smoothRotateZ}
//         position-x={smoothPositionX}
//         position-y={smoothPositionY}
//         position-z={smoothPositionZ}
//     >
//       {/* Lighting - Adjust as needed */}
//       <ambientLight intensity={1.2} />
//       <directionalLight position={[8, 10, 5]} intensity={2.5} castShadow />
//       <directionalLight position={[-8, -5, -3]} intensity={0.8} color="#cadbed" /> {/* Cooler fill light */}

//       <Model />

//     </motion.group>
//   );
// }

// import { Canvas } from "@react-three/fiber";
// import { Model } from "./model";
// import {
//   MotionValue,
//   useMotionValue,
//   useScroll,
//   useSpring,
//   useTransform,
// } from "framer-motion";
// import { motion } from "framer-motion-3d";
// import { Suspense, useRef, useState } from "react";
// import useMeasure from "react-use-measure";

// // Removed the custom spring function

// export default function AmieLogo() {
//   const [isHover, setIsHover] = useState(false); // Still useful to know hover state
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [ref, bounds] = useMeasure({ scroll: false });

//   const resetMousePosition = () => {
//     mouseX.set(0);
//     mouseY.set(0);
//   };

//   // Use page scroll progress
//   const { scrollYProgress } = useScroll();

//   return (
//     <div
//       ref={containerRef}
//       className="bg-red-500 h-[200vh] w-screen flex flex-col justify-start items-center pt-20"
//       style={{ overflowY: 'auto' }}
//     >
//       <div className="h-[50vh] text-white text-center">Scroll Down...</div>

//       <motion.div
//         className="bg-green-500 h-[29vh] w-[25vw] cursor-pointer sticky top-1/4"
//         // @ts-expect-error ref type mismatch but works at runtime
//         ref={ref}
//         onPointerEnter={() => setIsHover(true)}
//         onPointerMove={(e) => {
//           const x = e.clientX - bounds.x - bounds.width / 2;
//           const y = e.clientY - bounds.y - bounds.height / 2;
//           mouseX.set(x);
//           mouseY.set(y);
//         }}
//         onPointerLeave={() => {
//           resetMousePosition();
//           setIsHover(false);
//         }}
//         // Simple scale effect remains subtle
//         whileHover={{ scale: 1.05 }}
//         transition={{ type: "spring", stiffness: 300, damping: 20 }}
//       >
//         <Suspense fallback={null}>
//           <Canvas>
//             {/* Pass down necessary values */}
//             <Scene
//               mouseX={mouseX}
//               mouseY={mouseY}
//               bounds={bounds}
//               scrollYProgress={scrollYProgress}
//               isHover={isHover} // Pass hover state
//             />
//           </Canvas>
//         </Suspense>
//       </motion.div>

//       <div className="h-[100vh] text-white text-center">Keep Scrolling...</div>
//     </div>
//   );
// }

// // --- Scene Component ---

// function Scene({
//   mouseX,
//   mouseY,
//   bounds,
//   scrollYProgress,
//   isHover,
// }: {
//   mouseX: MotionValue<number>;
//   mouseY: MotionValue<number>;
//   bounds: { width: number; height: number };
//   scrollYProgress: MotionValue<number>;
//   isHover: boolean;
// }) {

//   // --- Base Settings ---
//   const baseRotationX = Math.PI * 0.55;
//   const baseRotationY = Math.PI * 1;
//   const baseRotationZ = Math.PI * -0.7;
//   const basePositionX = 0;
//   const basePositionY = 0; // Adjusted base position for potential centering
//   const basePositionZ = 0;

//   // --- Scroll Transformations ---
//   // Direct mapping from scroll progress to rotation values
//   const scrollRotateX = useTransform(
//     scrollYProgress,
//     [0, 1],
//     [baseRotationX, baseRotationX + Math.PI / 2.5] // Less extreme rotation than before
//   );
//   const scrollRotateY = useTransform(
//     scrollYProgress,
//     [0, 1],
//     [baseRotationY, baseRotationY - Math.PI / 5] // Subtle Y rotation on scroll
//   );
//    // Optional: Add subtle scroll-based position change if desired
//    // const scrollPosY = useTransform(scrollYProgress, [0, 1], [basePositionY, basePositionY - 0.5]);

//   // --- Hover Transformations (Offsets) ---
//   // Map raw mouse values directly to target offsets. The spring will smooth the transition.
//   // We scale the hover effect down slightly compared to previous attempts for subtlety.
//   const hoverRotateXOffset = useTransform(mouseX, [-bounds.width / 2, bounds.width / 2], [Math.PI / 12, -Math.PI / 12]); // Note: Swapped axis mapping based on common interaction patterns (X mouse -> Y rotation)
//   const hoverRotateYOffset = useTransform(mouseY, [-bounds.height / 2, bounds.height / 2], [Math.PI / 12, -Math.PI / 12]); // (Y mouse -> X rotation) - Adjust if needed
//   const hoverPositionXOffset = useTransform(mouseX, [-bounds.width / 2, bounds.width / 2], [-0.15, 0.15]);
//   const hoverPositionYOffset = useTransform(mouseY, [-bounds.height / 2, bounds.height / 2], [0.15, -0.15]); // Inverted Y

//   // --- Combining Targets ---
//   // Create intermediate MotionValues that represent the *instantaneous* target
//   // based on scroll and whether hover is active.

//   // TARGET ROTATION X: Base scroll rotation + hover offset (if active)
//   const targetRotateX = useTransform(() => {
//     return scrollRotateX.get() + (isHover ? hoverRotateYOffset.get() : 0); // Y Mouse affects X rotation
//   });

//   // TARGET ROTATION Y: Base scroll rotation + hover offset (if active)
//   const targetRotateY = useTransform(() => {
//     return scrollRotateY.get() + (isHover ? hoverRotateXOffset.get() : 0); // X Mouse affects Y rotation
//   });

//   // TARGET ROTATION Z: Base Z rotation (or add subtle hover Z rotation if desired)
//   const targetRotateZ = useMotionValue(baseRotationZ);
//   // Example adding hover Z:
//   // const targetRotateZ = useTransform(() => baseRotationZ + (isHover ? useTransform(mouseX, [-bounds.width / 2, bounds.width / 2], [-Math.PI/16, Math.PI/16]).get() : 0));

//   // TARGET POSITION X: Base position + hover offset (if active)
//   const targetPositionX = useTransform(() => {
//     // const currentScrollPosX = scrollPosX ? scrollPosX.get() : basePositionX; // Example if adding scroll position
//     return basePositionX + (isHover ? hoverPositionXOffset.get() : 0);
//   });

//    // TARGET POSITION Y: Base position + hover offset (if active)
//   const targetPositionY = useTransform(() => {
//     // const currentScrollPosY = scrollPosY ? scrollPosY.get() : basePositionY; // Example if adding scroll position
//     return basePositionY + (isHover ? hoverPositionYOffset.get() : 0);
//   });

//   // TARGET POSITION Z: Base Z position
//   const targetPositionZ = useMotionValue(basePositionZ);

//   // --- Applying Spring Physics ---
//   // Apply useSpring to the combined TARGET motion values.
//   // This ensures smooth transitions when hover starts/ends or scroll changes.
//   const springConfig = {
//       stiffness: 100, // Lower stiffness -> softer/slower spring
//       damping: 20,    // Lower damping -> more bounciness
//       mass: 1,        // Higher mass -> more inertia
//       // restDelta: 0.001, // Optional: threshold to stop animation
//   };

//   const smoothRotateX = useSpring(targetRotateX, springConfig);
//   const smoothRotateY = useSpring(targetRotateY, springConfig);
//   const smoothRotateZ = useSpring(targetRotateZ, springConfig); // Apply spring even if target is static for consistency
//   const smoothPositionX = useSpring(targetPositionX, springConfig);
//   const smoothPositionY = useSpring(targetPositionY, springConfig);
//   const smoothPositionZ = useSpring(targetPositionZ, springConfig);

//   // No complex useFrame needed - Framer Motion handles the animation loop
//   // useFrame(() => {
//   //   // Can still be used for effects NOT handled by motion props if needed
//   // });

//   return (
//     // Apply the SMOOTHED (sprung) values directly to the motion.group
//     <motion.group
//         scale={0.009} // Apply base scale here
//         // Pass the sprung motion values to the motion component props
//         rotation-x={smoothRotateX}
//         rotation-y={smoothRotateY}
//         rotation-z={smoothRotateZ}
//         position-x={smoothPositionX}
//         position-y={smoothPositionY}
//         position-z={smoothPositionZ}
//     >
//       {/* Basic Lighting Setup */}
//       <ambientLight intensity={1.5} />
//       <directionalLight position={[5, 5, 5]} intensity={3} />
//       <directionalLight position={[-5, -5, -2]} intensity={1} color="#ffcccc" />

//       <Model />

//     </motion.group>
//   );
// }

// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { Model } from "./model";
// import {
//   MotionValue,
//   useMotionValue,
//   useScroll,
//   useSpring,
//   useTransform,
// } from "framer-motion";
// import { motion } from "framer-motion-3d";
// import { Suspense, useRef, useState } from "react"; // Added useState
// import useMeasure from "react-use-measure";
// import * as THREE from "three";

// // Simple Spring function (can be replaced with more complex physics libraries if needed)
// const spring = (
//   current: number,
//   target: number,
//   velocity: number,
//   stiffness: number,
//   damping: number,
//   mass: number = 1 // Add mass for more control
// ): { position: number; velocity: number } => {
//   // Avoid division by zero or unstable behavior with zero mass
//   if (mass <= 0) mass = 0.1;

//   const force = (target - current) * stiffness; // Spring force (Hooke's Law)
//   const dampingForce = -velocity * damping; // Damping force (opposes velocity)
//   const acceleration = (force + dampingForce) / mass; // Newton's Second Law (F=ma)

//   // Integrate velocity and position (simple Euler integration)
//   // Multiply by a small delta time factor if needed, but useFrame handles frame rate implicitly
//   // If jitter occurs, consider passing delta time from useFrame
//   const newVelocity = velocity + acceleration;
//   const newPosition = current + newVelocity;

//   return { position: newPosition, velocity: newVelocity };
// };

// export default function AmieLogo() {
//   const [isHover, setIsHover] = useState(false); // Track hover state
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [ref, bounds] = useMeasure({ scroll: false });

//   const resetMousePosition = () => {
//     mouseX.set(0);
//     mouseY.set(0);
//   };

//   const { scrollYProgress } = useScroll(); // Assuming page scroll

//   return (
//     <div
//       ref={containerRef}
//       className="bg-red-500 h-[200vh] w-screen flex flex-col justify-start items-center pt-20"
//       style={{ overflowY: 'auto' }}
//     >
//       <div className="h-[50vh] text-white text-center">Scroll Down...</div>

//       <motion.div
//         className="bg-green-500 h-[29vh] w-[25vw] cursor-pointer sticky top-1/4"
//         // @ts-expect-error ref type mismatch but works at runtime
//         ref={ref}
//         onPointerEnter={() => setIsHover(true)} // Set hover state
//         onPointerMove={(e) => {
//           const x = e.clientX - bounds.x - bounds.width / 2;
//           const y = e.clientY - bounds.y - bounds.height / 2;
//           mouseX.set(x);
//           mouseY.set(y);
//         }}
//         onPointerLeave={() => {
//           resetMousePosition();
//           setIsHover(false); // Reset hover state
//         }}
//         // Optional: Add subtle scale effect on hover via Framer Motion
//         whileHover={{ scale: 1.05 }}
//         transition={{ type: "spring", stiffness: 300, damping: 20 }}
//       >
//         <Suspense fallback={null}>
//           <Canvas>
//             <Scene
//               mouseX={mouseX}
//               mouseY={mouseY}
//               bounds={bounds}
//               scrollYProgress={scrollYProgress}
//               isHover={isHover} // Pass hover state down
//             />
//           </Canvas>
//         </Suspense>
//       </motion.div>

//       <div className="h-[100vh] text-white text-center">Keep Scrolling...</div>
//     </div>
//   );
// }

// // --- Scene Component ---

// function Scene({
//   mouseX,
//   mouseY,
//   bounds,
//   scrollYProgress,
//   isHover, // Receive hover state
// }: {
//   mouseX: MotionValue<number>;
//   mouseY: MotionValue<number>;
//   bounds: { width: number; height: number };
//   scrollYProgress: MotionValue<number>;
//   isHover: boolean;
// }) {
//   const groupRef = useRef<THREE.Group>(null);
//   const { clock } = useThree(); // Get clock for idle animation

//   // --- Base Settings ---
//   const baseRotationX = Math.PI * 0.55;
//   const baseRotationY = Math.PI * 1;
//   const baseRotationZ = Math.PI * -0.7;
//   const basePositionX = 0;
//   const basePositionY = 0;
//   const basePositionZ = 0;

//   // --- Scroll Animation Targets (using useTransform) ---
//   const targetScrollRotateX = useTransform(
//     scrollYProgress, [0, 1], [0, Math.PI / 2] // Rotation relative to base
//   );
//   const targetScrollRotateY = useTransform(
//      scrollYProgress, [0, 1], [0, -Math.PI / 4] // Rotation relative to base
//   );

//   // --- Hover Animation Targets (using smoothed mouse input) ---
//   // Smooth mouse input slightly before mapping (less aggressive spring)
//   const smoothMouseX = useSpring(mouseX, { stiffness: 200, damping: 25, mass: 0.5 });
//   const smoothMouseY = useSpring(mouseY, { stiffness: 200, damping: 25, mass: 0.5 });

//   const targetHoverRotateXOffset = useTransform(smoothMouseY, [-bounds.height / 2, bounds.height / 2], [Math.PI / 8, -Math.PI / 8]);
//   const targetHoverRotateYOffset = useTransform(smoothMouseX, [-bounds.width / 2, bounds.width / 2], [-Math.PI / 8, Math.PI / 8]);
//   const targetHoverPosXOffset = useTransform(smoothMouseX, [-bounds.width / 2, bounds.width / 2], [-0.2, 0.2]);
//   const targetHoverPosYOffset = useTransform(smoothMouseY, [-bounds.height / 2, bounds.height / 2], [0.2, -0.2]);
//   // Add subtle Z rotation on hover based on horizontal mouse movement
//   const targetHoverRotateZOffset = useTransform(smoothMouseX, [-bounds.width / 2, bounds.width / 2], [-Math.PI / 16, Math.PI / 16]);

//   // --- Physics State (Velocity) ---
//   const physicsState = useRef({
//     vRotX: 0, vRotY: 0, vRotZ: 0,
//     vPosX: 0, vPosY: 0, vPosZ: 0,
//   });

//   // --- Animation Loop (useFrame) ---
//   useFrame(() => { // Pass delta time if needed for spring stability
//     if (!groupRef.current) return;

//     // 1. Calculate Idle Oscillation
//     const time = clock.getElapsedTime();
//     const idleRotX = Math.sin(time * 0.5) * 0.03; // Slow sine wave for subtle drift
//     const idleRotY = Math.cos(time * 0.4) * 0.03;
//     const idlePosX = Math.sin(time * 0.6) * 0.05;

//     // 2. Determine Current Targets
//     // Combine Base + Idle + Scroll + Hover Offset
//     const targetRotX = baseRotationX + idleRotX + targetScrollRotateX.get() + (isHover ? targetHoverRotateXOffset.get() : 0);
//     const targetRotY = baseRotationY + idleRotY + targetScrollRotateY.get() + (isHover ? targetHoverRotateYOffset.get() : 0);
//     const targetRotZ = baseRotationZ + (isHover ? targetHoverRotateZOffset.get() : 0); // Add Z hover offset only when hovering

//     const targetPosX = basePositionX + idlePosX + (isHover ? targetHoverPosXOffset.get() : 0);
//     const targetPosY = basePositionY + (isHover ? targetHoverPosYOffset.get() : 0);
//     const targetPosZ = basePositionZ; // Keep Z position base or add hover effect

//     // 3. Define Spring Parameters (Can vary based on hover state)
//     const stiffness = isHover ? 100 : 50;  // More responsive when hovering
//     const damping = isHover ? 18 : 15;     // Adjust damping for feel
//     const mass = 1;

//     // 4. Apply Spring Physics to Each Axis
//     // Rotation X
//     const sprX = spring(groupRef.current.rotation.x, targetRotX, physicsState.current.vRotX, stiffness, damping, mass);
//     groupRef.current.rotation.x = sprX.position;
//     physicsState.current.vRotX = sprX.velocity;

//     // Rotation Y
//     const sprY = spring(groupRef.current.rotation.y, targetRotY, physicsState.current.vRotY, stiffness, damping, mass);
//     groupRef.current.rotation.y = sprY.position;
//     physicsState.current.vRotY = sprY.velocity;

//     // Rotation Z
//     const sprZ = spring(groupRef.current.rotation.z, targetRotZ, physicsState.current.vRotZ, stiffness, damping, mass);
//     groupRef.current.rotation.z = sprZ.position;
//     physicsState.current.vRotZ = sprZ.velocity;

//     // Position X
//     const sprPosX = spring(groupRef.current.position.x, targetPosX, physicsState.current.vPosX, stiffness, damping, mass);
//     groupRef.current.position.x = sprPosX.position;
//     physicsState.current.vPosX = sprPosX.velocity;

//     // Position Y
//     const sprPosY = spring(groupRef.current.position.y, targetPosY, physicsState.current.vPosY, stiffness, damping, mass);
//     groupRef.current.position.y = sprPosY.position;
//     physicsState.current.vPosY = sprPosY.velocity;

//     // Position Z (If animating Z position)
//     const sprPosZ = spring(groupRef.current.position.z, targetPosZ, physicsState.current.vPosZ, stiffness, damping, mass);
//     groupRef.current.position.z = sprPosZ.position;
//     physicsState.current.vPosZ = sprPosZ.velocity;

//   });

//   return (
//     <group ref={groupRef} scale={0.009}>
//       {/* Restore your preferred lighting */}
//       <ambientLight intensity={1.5} />
//       <directionalLight position={[5, 10, 7]} intensity={3} castShadow />
//       <directionalLight position={[-5, -5, -2]} intensity={1} color="#ffcccc" />
//       {/* Add a subtle backlight maybe? */}
//       <spotLight position={[0, 0, -10]} intensity={2} angle={0.3} penumbra={0.5} color="lightblue" />

//       <Model />

//       {/* Optional Helpers */}
//       {/* <axesHelper args={[2]} /> */}
//       {/* <gridHelper args={[10, 10]} /> */}
//     </group>
//   );
// }

// import { Canvas, useFrame } from "@react-three/fiber";
// import { Model } from "./model"; // Assuming ./model contains your <Model /> component
// import {
//   MotionValue,
//   useMotionValue,
//   useScroll,
//   useSpring,
//   useTransform,
// } from "framer-motion";
// import { motion } from "framer-motion-3d";
// import { Suspense, useRef } from "react";
// import useMeasure from "react-use-measure";
// import * as THREE from "three";

// // (No need for normalizeValue anymore, useTransform handles mapping)

// export default function AmieLogo() {
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
//   const containerRef = useRef<HTMLDivElement>(null); // Ref for the scroll container
//   const [ref, bounds] = useMeasure({ scroll: false }); // Ref for the hover element bounds

//   // Reset mouse position when leaving the hover area
//   const resetMousePosition = () => {
//     mouseX.set(0);
//     mouseY.set(0);
//   };

//   // Get scroll progress relative to the containerRef
//   // If you want page scroll, don't pass target. If scroll is within a specific div, use its ref.
//   // Assuming page scroll for now based on h-[200vh] on parent.
//   const { scrollYProgress } = useScroll();

//   // Add a small effect to see scroll progress (optional debugging)
//   // useEffect(() => {
//   //   return scrollYProgress.onChange(v => console.log("Scroll Progress:", v));
//   // }, [scrollYProgress]);

//   return (
//     // Assign the ref to the scrollable container if you want scrollYProgress relative to it
//     // If you want window scroll, you don't strictly need containerRef here unless for other reasons.
//     // Let's keep it for potential future use or clarity.
//     <div
//         ref={containerRef}
//         className="bg-red-500 h-[200vh] w-screen flex flex-col justify-start items-center pt-20" // Adjust layout
//         style={{ overflowY: 'auto' }} // Ensure it's scrollable if not window
//     >
//       {/* Placeholder content to create scroll */}
//       <div className="h-[50vh] text-white text-center">Scroll Down...</div>

//       <motion.div
//         className="bg-green-500 h-[29vh] w-[25vw] cursor-pointer sticky top-1/4" // Make it sticky to keep in view while scrolling
//         // @ts-expect-error - ref type mismatch but works at runtime
//         ref={ref}
//         onPointerMove={(e) => {
//           // Calculate position relative to the center of the bounds
//           const x = e.clientX - bounds.x - bounds.width / 2;
//           const y = e.clientY - bounds.y - bounds.height / 2;
//           mouseX.set(x);
//           mouseY.set(y);
//         }}
//         onPointerLeave={() => {
//           resetMousePosition();
//         }}
//       >
//         <Suspense fallback={null}>
//           <Canvas>
//             {/* Pass bounds and scrollYProgress to the Scene */}
//             <Scene
//               mouseX={mouseX}
//               mouseY={mouseY}
//               bounds={bounds}
//               scrollYProgress={scrollYProgress}
//             />
//           </Canvas>
//         </Suspense>
//       </motion.div>

//        {/* More placeholder content */}
//       <div className="h-[100vh] text-white text-center">Keep Scrolling...</div>
//     </div>
//   );
// }

// // --- Scene Component ---

// function Scene({
//   mouseX,
//   mouseY,
//   bounds,
//   scrollYProgress,
// }: {
//   mouseX: MotionValue<number>;
//   mouseY: MotionValue<number>;
//   bounds: { width: number; height: number }; // Receive bounds
//   scrollYProgress: MotionValue<number>; // Receive scroll progress
// }) {
//   const groupRef = useRef<THREE.Group>(null);
//   // const { viewport } = useThree(); // Use viewport for scaling/positioning if needed

//   // --- Base Settings ---
//   // Define the initial resting state more clearly
//   const baseRotationX = Math.PI * 0.55;
//   const baseRotationY = Math.PI * 1;
//   const baseRotationZ = Math.PI * -0.7;

//   const basePositionX = 0; // Centered more naturally
//   const basePositionY = 0; // Centered more naturally
//   const basePositionZ = 0;

//   // --- Scroll Animation ---
//   // Map scrollYProgress (0 to 1) to a rotation range on the X-axis
//   // Rotate downwards as scroll progresses
//   const scrollRotateX = useTransform(
//     scrollYProgress,
//     [0, 1], // Input range: scroll from top to bottom
//     [baseRotationX, baseRotationX + Math.PI / 2] // Output range: Start at base, rotate 90 degrees down
//     // Adjust the "+ Math.PI / 2" value to control how much it rotates
//   );

//   // Optional: Add subtle Y rotation on scroll
//    const scrollRotateY = useTransform(
//     scrollYProgress,
//     [0, 1],
//     [baseRotationY, baseRotationY - Math.PI / 4] // Example: slight turn left
//   );

//   // --- Hover Animation ---
//   // Smooth the raw mouse values using spring physics
//   const smoothMouseX = useSpring(mouseX, {
//     stiffness: 120, // Adjust for desired responsiveness
//     damping: 20,    // Adjust for desired bounce/settle
//     mass: 0.5,       // Adjust for weight/inertia
//   });
//   const smoothMouseY = useSpring(mouseY, {
//     stiffness: 120,
//     damping: 20,
//     mass: 0.5,
//   });

//   // Map smoothed mouse X to Y-axis rotation offset (mouse left/right -> rotate left/right)
//   const hoverRotateYOffset = useTransform(
//     smoothMouseX,
//     [-bounds.width / 2, bounds.width / 2], // Input range: mouse from left edge to right edge
//     [-Math.PI / 6, Math.PI / 6] // Output range: rotation offset (adjust sensitivity)
//   );

//   // Map smoothed mouse Y to X-axis rotation offset (mouse up/down -> rotate up/down)
//   // Note: Typically screen Y is inverted relative to 3D X rotation - adjust mapping if needed
//   const hoverRotateXOffset = useTransform(
//     smoothMouseY,
//     [-bounds.height / 2, bounds.height / 2], // Input range: mouse from top edge to bottom edge
//     [Math.PI / 6, -Math.PI / 6] // Output range: rotation offset (inverted - adjust sensitivity)
//   );

//    // Map smoothed mouse X/Y to position offsets (subtle movement)
//   const hoverPositionXOffset = useTransform(
//     smoothMouseX,
//     [-bounds.width / 2, bounds.width / 2],
//     [-0.3, 0.3] // Output range: position offset (adjust intensity)
//   );
//    const hoverPositionYOffset = useTransform(
//     smoothMouseY,
//     [-bounds.height / 2, bounds.height / 2],
//     [0.3, -0.3] // Output range: position offset (inverted - adjust intensity)
//   );

//   // --- Combine Animations in useFrame ---
//   useFrame(() => {
//     if (!groupRef.current) return;

//     // Get current values from MotionValues
//     const currentScrollRotateX = scrollRotateX.get();
//     const currentScrollRotateY = scrollRotateY.get(); // Get scroll Y rotation
//     const currentHoverRotateXOffset = hoverRotateXOffset.get();
//     const currentHoverRotateYOffset = hoverRotateYOffset.get();
//     const currentHoverPosXOffset = hoverPositionXOffset.get();
//     const currentHoverPosYOffset = hoverPositionYOffset.get();

//     // Combine scroll rotation and hover rotation offset
//     // Start with the scroll-driven rotation, then add the hover offset
//     groupRef.current.rotation.x = currentScrollRotateX + currentHoverRotateXOffset;
//     groupRef.current.rotation.y = currentScrollRotateY + currentHoverRotateYOffset; // Combine Y rotations
//     groupRef.current.rotation.z = baseRotationZ; // Keep Z rotation base (or add hover effect if desired)

//     // Combine base position and hover position offset
//     groupRef.current.position.x = basePositionX + currentHoverPosXOffset;
//     groupRef.current.position.y = basePositionY + currentHoverPosYOffset;
//     groupRef.current.position.z = basePositionZ; // Keep Z position base (or add hover effect if desired)

//   });

//   return (
//     // No need for motion.group here as we drive updates via useFrame
//     // If performance becomes an issue, could explore motion components further
//     <group ref={groupRef} scale={0.009}>
//       {/* Basic Lighting Setup - Keep or enhance as needed */}
//       <ambientLight intensity={1.5} />
//       <directionalLight position={[5, 5, 5]} intensity={3} />
//        <directionalLight position={[-5, -5, -2]} intensity={1} color="#ffcccc" />

//       {/* Place the Model inside the group that gets animated */}
//       <Model />

//       {/* Helpers (Optional - Uncomment for debugging) */}
//       {/* <axesHelper args={[2]} /> */}
//       {/* <gridHelper args={[10, 10]} /> */}
//     </group>
//   );
// }

// import { Canvas, useFrame } from "@react-three/fiber";
// import { Model } from "./model";
// import { MotionValue, useMotionValue } from "framer-motion";
// import { motion } from "framer-motion-3d";
// import { Suspense, useState, useRef } from "react";
// // import { PerspectiveCamera } from "@react-three/drei";
// // import Camera from "./camera";
// import useMeasure from "react-use-measure";
// import * as THREE from "three";

// // Normalize value between -1 and 1
// function normalizeValue(value: number, max: number = 1000): number {
//   return Math.max(-1, Math.min(1, value / max));
// }

// export default function AmieLogo() {
//   const [isHover, setIsHover] = useState(false);
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [ref, bounds] = useMeasure({ scroll: false });

//   const resetMousePosition = () => {
//     mouseX.set(0);
//     mouseY.set(0);
//   };

//   // Add debug effect to monitor hover state
//   // useEffect(() => {
//   //   console.log("Hover state changed:", isHover);
//   // }, [isHover]);

//   return (
//     <div className="bg-red-500 h-[200vh] w-screen flex justify-center items-center"
//     ref={containerRef}
//     >
//       <motion.div
//         className="bg-green-500 h-[29vh] w-[25vw] cursor-pointer"
//         // @ts-expect-error - ref type mismatch but works at runtime
//         ref={ref}
//         onMouseEnter={() => {
//           // console.log("Mouse enter detected");
//           setIsHover(true);
//         }}
//         onMouseLeave={() => {
//           // console.log("Mouse leave detected");
//           resetMousePosition();
//           setIsHover(false);
//         }}
//         onPointerMove={(e) => {
//           const x = e.clientX - bounds.x - bounds.width / 2;
//           const y = e.clientY - bounds.y - bounds.height / 2;
//           mouseX.set(x);
//           mouseY.set(y);
//           // console.log("Mouse position:", x, y);
//         }}
//         initial={false}
//         animate={isHover ? "hover" : "rest"}
//         variants={{
//           hover: {
//             scale: 1.1,
//           },
//           rest: {
//             scale: 1.0,
//           },
//         }}
//       >
//         <Suspense fallback={null}>
//           <Canvas>
//             {/* <Camera mouseX={mouseX} mouseY={mouseY} /> */}
//             <Scene mouseX={mouseX} mouseY={mouseY} isHover={isHover} />
//           </Canvas>
//         </Suspense>
//       </motion.div>
//     </div>
//   );
// }

// function Scene({
//   mouseX,
//   mouseY,
//   isHover,
// }: {
//   mouseX: MotionValue<number>;
//   mouseY: MotionValue<number>;
//   isHover: boolean;
// }) {
//   const groupRef = useRef<THREE.Group>(null);
//   const baseRotationX = Math.PI * 0.55;
//   const baseRotationY = Math.PI * 1;
//   const baseRotationZ = Math.PI * -0.7;

//   const positionX = 0.5;
//   const positionY = 2;
//   const positionZ = 0;

//   // Spring physics values
//   const springRef = useRef({
//     // Velocities
//     vRotX: 0,
//     vRotY: 0,
//     vRotZ: 0,
//     vPosX: 0,
//     vPosY: 0,
//     vPosZ: 0,
//     // Previous targets for smooth transition
//     prevTargetRotX: baseRotationX,
//     prevTargetRotY: baseRotationY,
//     prevTargetRotZ: baseRotationZ,
//     prevTargetPosX: positionX,
//     prevTargetPosY: positionY,
//     prevTargetPosZ: positionZ,
//   });

//   // Simple LERP function for smooth transitions
//   const lerp = (start: number, end: number, t: number): number => {
//     return start * (1 - t) + end * t;
//   };

//   // Spring function for smoother, bouncy motion
//   const spring = (
//     current: number,
//     target: number,
//     velocity: number,
//     stiffness: number,
//     damping: number
//   ): { position: number; velocity: number } => {
//     // Calculate spring force
//     const force = (target - current) * stiffness;
//     // Apply damping to velocity
//     const newVelocity = (velocity + force) * damping;
//     // Calculate new position
//     const newPosition = current + newVelocity;

//     return { position: newPosition, velocity: newVelocity };
//   };

//   useFrame(() => {
//     if (!groupRef.current) return;

//     const x = mouseX.get();
//     const y = mouseY.get();

//     // Spring physics constants
//     const stiffness = isHover ? 0.08 : 0.009; // Spring strength
//     const damping = isHover ? 0.85 : 0.8; // Damping factor (lower = more bounce)
//     const smoothing = isHover ? 0.5 : 0.1; // Target interpolation smoothing

//     if (!isHover) {
//       // When not hovering, smoothly transition target back to base values
//       springRef.current.prevTargetRotX = lerp(
//         springRef.current.prevTargetRotX,
//         baseRotationX,
//         smoothing
//       );
//       springRef.current.prevTargetRotY = lerp(
//         springRef.current.prevTargetRotY,
//         baseRotationY,
//         smoothing
//       );
//       springRef.current.prevTargetRotZ = lerp(
//         springRef.current.prevTargetRotZ,
//         baseRotationZ,
//         smoothing
//       );

//       springRef.current.prevTargetPosX = lerp(
//         springRef.current.prevTargetPosX,
//         positionX,
//         smoothing
//       );
//       springRef.current.prevTargetPosY = lerp(
//         springRef.current.prevTargetPosY,
//         positionY,
//         smoothing
//       );
//       springRef.current.prevTargetPosZ = lerp(
//         springRef.current.prevTargetPosZ,
//         positionZ,
//         smoothing
//       );

//       // Apply spring physics to rotation
//       const rotX = spring(
//         groupRef.current.rotation.x,
//         springRef.current.prevTargetRotX,
//         springRef.current.vRotX,
//         stiffness,
//         damping
//       );
//       groupRef.current.rotation.x = rotX.position;
//       springRef.current.vRotX = rotX.velocity;

//       const rotY = spring(
//         groupRef.current.rotation.y,
//         springRef.current.prevTargetRotY,
//         springRef.current.vRotY,
//         stiffness,
//         damping
//       );
//       groupRef.current.rotation.y = rotY.position;
//       springRef.current.vRotY = rotY.velocity;

//       const rotZ = spring(
//         groupRef.current.rotation.z,
//         springRef.current.prevTargetRotZ,
//         springRef.current.vRotZ,
//         stiffness,
//         damping
//       );
//       groupRef.current.rotation.z = rotZ.position;
//       springRef.current.vRotZ = rotZ.velocity;

//       // Apply spring physics to position
//       const posX = spring(
//         groupRef.current.position.x,
//         springRef.current.prevTargetPosX,
//         springRef.current.vPosX,
//         stiffness,
//         damping
//       );
//       groupRef.current.position.x = posX.position;
//       springRef.current.vPosX = posX.velocity;

//       const posY = spring(
//         groupRef.current.position.y,
//         springRef.current.prevTargetPosY - 3,
//         springRef.current.vPosY,
//         stiffness,
//         damping
//       );
//       groupRef.current.position.y = posY.position;
//       springRef.current.vPosY = posY.velocity;

//       const posZ = spring(
//         groupRef.current.position.z,
//         springRef.current.prevTargetPosZ,
//         springRef.current.vPosZ,
//         stiffness,
//         damping
//       );
//       groupRef.current.position.z = posZ.position;
//       springRef.current.vPosZ = posZ.velocity;
//     } else {
//       // Calculate target values based on mouse position with stronger effect
//       const targetRotationX = baseRotationX + normalizeValue(-y) * Math.PI * 10;
//       const targetRotationY = baseRotationY + normalizeValue(-x) * Math.PI * 9;

//       // Smoothly update target values to prevent sudden jumps
//       springRef.current.prevTargetRotX = lerp(
//         springRef.current.prevTargetRotX,
//         targetRotationX,
//         smoothing
//       );
//       springRef.current.prevTargetRotY = lerp(
//         springRef.current.prevTargetRotY,
//         targetRotationY,
//         smoothing
//       );
//       springRef.current.prevTargetRotZ = baseRotationZ;

//       // Apply spring physics to rotation
//       const rotX = spring(
//         groupRef.current.rotation.x,
//         springRef.current.prevTargetRotX,
//         springRef.current.vRotX,
//         stiffness,
//         damping
//       );
//       groupRef.current.rotation.x = rotX.position;
//       springRef.current.vRotX = rotX.velocity;

//       const rotY = spring(
//         groupRef.current.rotation.y,
//         springRef.current.prevTargetRotY,
//         springRef.current.vRotY,
//         stiffness,
//         damping
//       );
//       groupRef.current.rotation.y = rotY.position;
//       springRef.current.vRotY = rotY.velocity;

//       // Hold Z rotation steady
//       groupRef.current.rotation.z = baseRotationZ;
//       springRef.current.vRotZ = 0;

//       // Calculate target positions with larger offset
//       const targetPositionX = positionX + normalizeValue(x) * 10;
//       const targetPositionY = positionY + normalizeValue(-y) * 10;

//       // Smoothly update target position
//       springRef.current.prevTargetPosX = lerp(
//         springRef.current.prevTargetPosX,
//         targetPositionX,
//         smoothing
//       );
//       springRef.current.prevTargetPosY = lerp(
//         springRef.current.prevTargetPosY,
//         targetPositionY,
//         smoothing
//       );
//       springRef.current.prevTargetPosZ = positionZ;

//       // Apply spring physics to position
//       const posX = spring(
//         groupRef.current.position.x,
//         springRef.current.prevTargetPosX,
//         springRef.current.vPosX,
//         stiffness,
//         damping
//       );
//       groupRef.current.position.x = posX.position;
//       springRef.current.vPosX = posX.velocity;

//       const posY = spring(
//         groupRef.current.position.y,
//         springRef.current.prevTargetPosY,
//         springRef.current.vPosY,
//         stiffness,
//         damping
//       );
//       groupRef.current.position.y = posY.position;
//       springRef.current.vPosY = posY.velocity;

//       // Keep Z position steady
//       groupRef.current.position.z = positionZ;
//       springRef.current.vPosZ = 0;
//     }
//   });

//   return (
//     <group>
//       {/* <gridHelper args={[10, 20]} /> */}
//       {/* <PerspectiveCamera
//         // makeDefault
//         fov={45}
//         position={[-0.5, 0.6, 3]}
//         rotation={[-Math.PI / 2, 0, 0]}
//         near={0.1}
//         far={1000}
//       /> */}
//       {/* <axesHelper args={[5]} /> */}
//       <directionalLight
//         intensity={5}
//         position={[200, 150, 100]}
//         rotation={[-0.818, 1.364, 0.667]}
//       />
//       <rectAreaLight
//         width={300}
//         height={300}
//         intensity={5}
//         position={[-500, 500, 500]}
//         lookAt={[0, 0, 0]}
//         color="#ffd700"
//       />

//       {/* Fill Light (Shadow softening) */}
//       <rectAreaLight
//         width={300}
//         height={300}
//         intensity={2}
//         position={[500, 300, 500]}
//         color="#4090ff"
//       />

//       {/* Rim Light (Backlight) */}
//       <directionalLight
//         intensity={15}
//         position={[0, 500, -500]}
//         color="#ffffff"
//         castShadow
//         shadow-mapSize-width={2048}
//         shadow-mapSize-height={2048}
//       />
//       <group
//         ref={groupRef}
//         position={[positionX, positionY, positionZ]}
//         scale={0.009}
//         rotation={[baseRotationX, baseRotationY, baseRotationZ]}
//       >
//         <Model />
//       </group>
//       <ambientLight intensity={4} color="#ffffff" />
//     </group>
//   );
// }
