// --- Scene Component ---
import { useCallback, useState } from "react";
import {
  MotionValue,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
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

    const handleMouseTrackX = useCallback((latest: number) => {
    fetch("/api/mouseX", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mouseX: latest }),
    });
  }, []);

  const handleMouseTrackY = useCallback((latest: number) => {
    fetch("/api/mouseY", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({mouseY: latest})
    })
  }, [])

  useMotionValueEvent(mouseX, "change", (latest) => {
    handleMouseTrackX(latest);
  });
  useMotionValueEvent(mouseY, "change", (latest) => {
    handleMouseTrackY(latest)
  });

  // --- Base Settings (Keep as is) ---
  const baseRotationX = Math.PI * 0.3;
  const baseRotationY = Math.PI * 0.2;
  const baseRotationZ = Math.PI * -0.15;
  const basePositionX = 0.5;
  const basePositionY = -0.9;
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
    [-canvasBounds.width / 2, canvasBounds.width / 2],
    [-Math.PI / 6, Math.PI / 6]
  ); // Increased from PI/10
  // console.log(canvasBounds.height)
  // console.log(Math.PI /6, -Math.PI / 6)
  const hoverRotX_from_MouseY = useTransform(
    mouseY,
    [-canvasBounds.height / 2, canvasBounds.height],
    [Math.PI / 6, -Math.PI / 6]
  ); // Increased from PI/10 (inverted Y still)
  const hoverPosX_from_MouseX = useTransform(
    mouseX,
    [-canvasBounds.width / 2, canvasBounds.width / 2],
    [-0.3, 0.3]
  ); // Increased from 0.18
  const hoverPosY_from_MouseY = useTransform(
    mouseY,
    [-canvasBounds.height / 2, canvasBounds.height / 2],
    [0.3, -0.3]
  ); // Increased from 0.18 (inverted Y still)
  // ADDED: Hover effect for Z rotation
  const hoverRotZ_from_MouseX = useTransform(
    mouseX,
    [-canvasBounds.width / 2, canvasBounds.width / 2],
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
    restDelta: 0.001, // Keep or adjust if needed
  };

  const smoothRotateX = useSpring(targetRotateX, springConfig);
  const smoothRotateY = useSpring(targetRotateY, springConfig);
  const smoothRotateZ = useSpring(targetRotateZ, springConfig); // Apply spring to Z too
  const smoothPositionX = useSpring(targetPositionX, springConfig);
  const smoothPositionY = useSpring(targetPositionY, springConfig);
  const smoothPositionZ = useSpring(targetPositionZ, springConfig); // Apply spring even if target is static

  // Handle interaction with 3D object
  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();

    // Get point from the event
    const point = e.point;

    // Scale factor to make movement more noticeable
    const scaleFactor = 100;

    // Set mouse motion values
    mouseX.set(point.x * scaleFactor);
    mouseY.set(point.y * scaleFactor);
  };
  return (
    <>
      {/* Add helpers outside the scaled group for better visibility */}
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
        scale={0.009}
        rotation-x={smoothRotateX}
        rotation-y={smoothRotateY}
        rotation-z={smoothRotateZ}
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
