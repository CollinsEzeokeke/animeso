// --- Scene Component ---
import {
  //  useCallback,
   useState } from "react";
import {
  MotionValue,
  useTransform,
  useSpring,
  useMotionValue,
  // useMotionValueEvent,
} from "framer-motion";
import { ThreeEvent } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { Model } from "./model";

export default function Scene({
  mouseX,
  mouseY,
  scrollYProgress,
  canvasBounds,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  canvasBounds: { width: number; height: number };
}) {
  const [isHover, setIsHover] = useState(false);

  const resetMousePosition = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // --- API Callbacks (Keep as is) ---
  // const handleMouseTrackX = useCallback((latest: number) => {
  //   fetch("/api/mouseX", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ mouseX: latest }),
  //   });
  // }, []);

  // const handleMouseTrackY = useCallback((latest: number) => {
  //   fetch("/api/mouseY", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ mouseY: latest }),
  //   });
  // }, []);

  // useMotionValueEvent(mouseX, "change", handleMouseTrackX);
  // useMotionValueEvent(mouseY, "change", handleMouseTrackY);
  // ---

  // --- Base Settings ---
 
  const baseRotationX = Math.PI * 0.3;
  const baseRotationY = Math.PI * 0.2;
  const baseRotationZ = Math.PI * -0.15;
  const basePositionX = 0.5;
  const basePositionY = -3; // Base Y position (start point)
  const basePositionZ = 0;

  // --- Scroll Transformations ---
  const scrollRotateX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],  // Add intermediate points for smoother interpolation
    [baseRotationX, baseRotationX + Math.PI / 4, baseRotationX + Math.PI / 2, baseRotationX + Math.PI / 1]
  );
  const scrollRotateZ = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],  // Add intermediate points for smoother interpolation
    [baseRotationZ, baseRotationZ + Math.PI / 4, baseRotationZ + Math.PI / 2, baseRotationZ + Math.PI / 1]
  );
  const scrollRotateY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],  // Add intermediate points for smoother interpolation
    [baseRotationY, baseRotationY - Math.PI / 6, baseRotationY - Math.PI / 3, baseRotationY - Math.PI / 2]
  );
  const scrollPosX = useTransform(
    scrollYProgress,
    [0, 0.4, 1],  // Add intermediate point for smoother interpolation
    [basePositionX, basePositionX - 1.0, basePositionX - 3.0]
  );

  // *** MODIFIED: Create smoother Y position animation during scroll ***
  const scrollPosY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1.5],  // More granular steps for smoother interpolation
    [basePositionY, basePositionY + 3, basePositionY + 6, 8]  // More gradual progression
  );

  // --- Console Logs (Keep for debugging) ---
  // useMotionValueEvent(scrollYProgress, "change", (latest) => {
  //   console.log("scrollYprogress", latest);
  // });
  // useMotionValueEvent(scrollPosY, "change", (latest) => {
  //   console.log("scrollPosY (raw transform output)", latest);
  // });
  // ---

  // --- Hover Transformations (Keep as is) ---
  const hoverRotY_from_MouseX = useTransform(
    mouseX,
    [-canvasBounds.width / 2, canvasBounds.width / 2],
    [-Math.PI / 6, Math.PI / 6]
  );
  const hoverRotX_from_MouseY = useTransform(
    mouseY,
    [-canvasBounds.height / 2, canvasBounds.height / 2],
    [Math.PI / 6, -Math.PI / 6]
  ); // Inverted Y is common
  const hoverPosX_from_MouseX = useTransform(
    mouseX,
    [-canvasBounds.width / 2, canvasBounds.width / 2],
    [-0.3, 0.3]
  );
  const hoverPosY_from_MouseY = useTransform(
    mouseY,
    [-canvasBounds.height / 2, canvasBounds.height / 2],
    [0.3, -0.3]
  ); // Inverted Y is common
  const hoverRotZ_from_MouseX = useTransform(
    mouseX,
    [-canvasBounds.width / 2, canvasBounds.width / 2],
    [-Math.PI / 12, Math.PI / 12]
  );
  // ---

  // --- Calculating Target Values (CORRECTED LOGIC) ---

  // Target Rotations: Combine scroll effect and hover offset
  const targetRotateX = useTransform(() => {
    const scrollEffect = scrollRotateX.get();
    const hoverEffect = isHover ? hoverRotX_from_MouseY.get() : 0;
    return scrollEffect + hoverEffect;
  });

  const targetRotateY = useTransform(() => {
    const scrollEffect = scrollRotateY.get();
    const hoverEffect = isHover ? hoverRotY_from_MouseX.get() : 0;
    return scrollEffect + hoverEffect;
  });

  const targetRotateZ = useTransform(() => {
    const scrollEffect = scrollRotateZ.get(); // scrollRotateZ already includes baseRotationZ
    const hoverEffect = isHover ? hoverRotZ_from_MouseX.get() : 0;
    return scrollEffect + hoverEffect;
  });

  // Target Positions: Combine scroll effect and hover offset
  // *** CORRECTED LOGIC ***
  const targetPositionX = useTransform(() => {
    const scrollEffect = scrollPosX.get(); // scrollPosX already includes basePositionX
    const hoverEffect = isHover ? hoverPosX_from_MouseX.get() : 0;
    return scrollEffect + hoverEffect;
  });

  // *** CORRECTED LOGIC ***
  const targetPositionY = useTransform(() => {
    // Start with the position determined by scroll
    const scrollEffect = scrollPosY.get(); // This now ranges from basePositionY to 15
    // Add the hover offset if applicable
    const hoverEffect = isHover ? hoverPosY_from_MouseY.get() : 0;
    // The final target combines the base, the scroll effect, and the hover effect.
    // Since scrollPosY starts at basePositionY, we just need scrollEffect + hoverEffect
    return scrollEffect + hoverEffect;
  });

  // Z Position doesn't currently change with scroll or hover in your transforms
  const targetPositionZ = useMotionValue(basePositionZ); // Keep as is unless you want Z movement

  // --- Applying Spring Physics - Separate configs for scrolling and hover ---
  // Slow, relaxed springs for scroll-based animation
  const scrollSpringConfig = {
    stiffness: 25,     // Very low stiffness for slower movement
    damping: 20,       // Higher damping for less bounce
    mass: 2.5,         // Higher mass for more inertia 
    restDelta: 0.0005  // More precise resting point
  };

  // More responsive springs for hover interactions
  const hoverSpringConfig = {
    stiffness: 80,     // Higher stiffness for responsive movement
    damping: 12,       // Lower damping for slight bounce
    mass: 1.0,         // Lower mass for quicker response
    restDelta: 0.001   // Standard precision
  };

  // Choose config based on interaction state
  const springConfig = isHover ? hoverSpringConfig : scrollSpringConfig;

  const smoothRotateX = useSpring(targetRotateX, springConfig);
  const smoothRotateY = useSpring(targetRotateY, springConfig);
  const smoothRotateZ = useSpring(targetRotateZ, springConfig);
  const smoothPositionX = useSpring(targetPositionX, springConfig);
  const smoothPositionY = useSpring(targetPositionY, springConfig);
  const smoothPositionZ = useSpring(targetPositionZ, springConfig);

  // --- Pointer Handling (Keep as is) ---
  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    // Using intersection point coordinates relative to the object's local origin
    const point = e.point;
    const scaleFactor = 100; // Adjust sensitivity if needed
    mouseX.set(point.x * scaleFactor);
    mouseY.set(point.y * scaleFactor);
  };
  // ---

  return (
    <>
      {/* Helpers (Keep as is) */}
      <gridHelper
        args={[50, 50]}
        position={[0, 0, -10]}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{ helper: true }}
      />
      <axesHelper
        args={[30]}
        position={[0, 0, -10]}
        userData={{ helper: true }}
      />

      <motion.group
        // Scale significantly affects visual movement distance
        scale={0.003} // Keep or adjust if overall size/movement needs tuning
        rotation-x={smoothRotateX}
        rotation-y={smoothRotateY}
        rotation-z={smoothRotateZ}
        position-x={smoothPositionX}
        position-y={smoothPositionY} // This will now use the corrected logic and increased range
        position-z={smoothPositionZ}
      >
        {/* Lighting (Keep as is) */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[8, 10, 5]} intensity={2.5} castShadow />
        <directionalLight
          position={[-8, -5, -3]}
          intensity={1.0}
          color="#cadbed"
        />
        {/* Model and Pointer Events (Keep as is) */}
        <Model
          onPointerEnter={(e) => {
            e.stopPropagation();
            setIsHover(true);
          }}
          onPointerMove={handlePointerMove}
          onPointerLeave={(e) => {
            e.stopPropagation();
            resetMousePosition();
            setIsHover(false);
          }}
        />
      </motion.group>
    </>
  );
}
