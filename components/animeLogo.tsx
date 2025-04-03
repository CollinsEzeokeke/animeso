import { Canvas, useFrame } from "@react-three/fiber";
import { Model } from "./model"; // Assuming ./model contains your <Model /> component
import {
  MotionValue,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { motion } from "framer-motion-3d";
import { Suspense, useRef } from "react";
import useMeasure from "react-use-measure";
import * as THREE from "three";

// (No need for normalizeValue anymore, useTransform handles mapping)

export default function AmieLogo() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the scroll container
  const [ref, bounds] = useMeasure({ scroll: false }); // Ref for the hover element bounds

  // Reset mouse position when leaving the hover area
  const resetMousePosition = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Get scroll progress relative to the containerRef
  // If you want page scroll, don't pass target. If scroll is within a specific div, use its ref.
  // Assuming page scroll for now based on h-[200vh] on parent.
  const { scrollYProgress } = useScroll();

  // Add a small effect to see scroll progress (optional debugging)
  // useEffect(() => {
  //   return scrollYProgress.onChange(v => console.log("Scroll Progress:", v));
  // }, [scrollYProgress]);

  return (
    // Assign the ref to the scrollable container if you want scrollYProgress relative to it
    // If you want window scroll, you don't strictly need containerRef here unless for other reasons.
    // Let's keep it for potential future use or clarity.
    <div
        ref={containerRef}
        className="bg-red-500 h-[200vh] w-screen flex flex-col justify-start items-center pt-20" // Adjust layout
        style={{ overflowY: 'auto' }} // Ensure it's scrollable if not window
    >
      {/* Placeholder content to create scroll */}
      <div className="h-[50vh] text-white text-center">Scroll Down...</div>

      <motion.div
        className="bg-green-500 h-[29vh] w-[25vw] cursor-pointer sticky top-1/4" // Make it sticky to keep in view while scrolling
        // @ts-expect-error - ref type mismatch but works at runtime
        ref={ref}
        onPointerMove={(e) => {
          // Calculate position relative to the center of the bounds
          const x = e.clientX - bounds.x - bounds.width / 2;
          const y = e.clientY - bounds.y - bounds.height / 2;
          mouseX.set(x);
          mouseY.set(y);
        }}
        onPointerLeave={() => {
          resetMousePosition();
        }}
      >
        <Suspense fallback={null}>
          <Canvas>
            {/* Pass bounds and scrollYProgress to the Scene */}
            <Scene
              mouseX={mouseX}
              mouseY={mouseY}
              bounds={bounds}
              scrollYProgress={scrollYProgress}
            />
          </Canvas>
        </Suspense>
      </motion.div>

       {/* More placeholder content */}
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
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  bounds: { width: number; height: number }; // Receive bounds
  scrollYProgress: MotionValue<number>; // Receive scroll progress
}) {
  const groupRef = useRef<THREE.Group>(null);
  // const { viewport } = useThree(); // Use viewport for scaling/positioning if needed

  // --- Base Settings ---
  // Define the initial resting state more clearly
  const baseRotationX = Math.PI * 0.55;
  const baseRotationY = Math.PI * 1;
  const baseRotationZ = Math.PI * -0.7;

  const basePositionX = 0; // Centered more naturally
  const basePositionY = 0; // Centered more naturally
  const basePositionZ = 0;

  // --- Scroll Animation ---
  // Map scrollYProgress (0 to 1) to a rotation range on the X-axis
  // Rotate downwards as scroll progresses
  const scrollRotateX = useTransform(
    scrollYProgress,
    [0, 1], // Input range: scroll from top to bottom
    [baseRotationX, baseRotationX + Math.PI / 2] // Output range: Start at base, rotate 90 degrees down
    // Adjust the "+ Math.PI / 2" value to control how much it rotates
  );

  // Optional: Add subtle Y rotation on scroll
   const scrollRotateY = useTransform(
    scrollYProgress,
    [0, 1],
    [baseRotationY, baseRotationY - Math.PI / 4] // Example: slight turn left
  );


  // --- Hover Animation ---
  // Smooth the raw mouse values using spring physics
  const smoothMouseX = useSpring(mouseX, {
    stiffness: 120, // Adjust for desired responsiveness
    damping: 20,    // Adjust for desired bounce/settle
    mass: 0.5,       // Adjust for weight/inertia
  });
  const smoothMouseY = useSpring(mouseY, {
    stiffness: 120,
    damping: 20,
    mass: 0.5,
  });

  // Map smoothed mouse X to Y-axis rotation offset (mouse left/right -> rotate left/right)
  const hoverRotateYOffset = useTransform(
    smoothMouseX,
    [-bounds.width / 2, bounds.width / 2], // Input range: mouse from left edge to right edge
    [-Math.PI / 6, Math.PI / 6] // Output range: rotation offset (adjust sensitivity)
  );

  // Map smoothed mouse Y to X-axis rotation offset (mouse up/down -> rotate up/down)
  // Note: Typically screen Y is inverted relative to 3D X rotation - adjust mapping if needed
  const hoverRotateXOffset = useTransform(
    smoothMouseY,
    [-bounds.height / 2, bounds.height / 2], // Input range: mouse from top edge to bottom edge
    [Math.PI / 6, -Math.PI / 6] // Output range: rotation offset (inverted - adjust sensitivity)
  );

   // Map smoothed mouse X/Y to position offsets (subtle movement)
  const hoverPositionXOffset = useTransform(
    smoothMouseX,
    [-bounds.width / 2, bounds.width / 2],
    [-0.3, 0.3] // Output range: position offset (adjust intensity)
  );
   const hoverPositionYOffset = useTransform(
    smoothMouseY,
    [-bounds.height / 2, bounds.height / 2],
    [0.3, -0.3] // Output range: position offset (inverted - adjust intensity)
  );


  // --- Combine Animations in useFrame ---
  useFrame(() => {
    if (!groupRef.current) return;

    // Get current values from MotionValues
    const currentScrollRotateX = scrollRotateX.get();
    const currentScrollRotateY = scrollRotateY.get(); // Get scroll Y rotation
    const currentHoverRotateXOffset = hoverRotateXOffset.get();
    const currentHoverRotateYOffset = hoverRotateYOffset.get();
    const currentHoverPosXOffset = hoverPositionXOffset.get();
    const currentHoverPosYOffset = hoverPositionYOffset.get();

    // Combine scroll rotation and hover rotation offset
    // Start with the scroll-driven rotation, then add the hover offset
    groupRef.current.rotation.x = currentScrollRotateX + currentHoverRotateXOffset;
    groupRef.current.rotation.y = currentScrollRotateY + currentHoverRotateYOffset; // Combine Y rotations
    groupRef.current.rotation.z = baseRotationZ; // Keep Z rotation base (or add hover effect if desired)

    // Combine base position and hover position offset
    groupRef.current.position.x = basePositionX + currentHoverPosXOffset;
    groupRef.current.position.y = basePositionY + currentHoverPosYOffset;
    groupRef.current.position.z = basePositionZ; // Keep Z position base (or add hover effect if desired)

  });

  return (
    // No need for motion.group here as we drive updates via useFrame
    // If performance becomes an issue, could explore motion components further
    <group ref={groupRef} scale={0.009}>
      {/* Basic Lighting Setup - Keep or enhance as needed */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={3} />
       <directionalLight position={[-5, -5, -2]} intensity={1} color="#ffcccc" />


      {/* Place the Model inside the group that gets animated */}
      <Model />

      {/* Helpers (Optional - Uncomment for debugging) */}
      {/* <axesHelper args={[2]} /> */}
      {/* <gridHelper args={[10, 10]} /> */}
    </group>
  );
}









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
