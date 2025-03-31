import { Canvas, useFrame } from "@react-three/fiber";
import { Model } from "./model";
import { MotionValue, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { Suspense, useState, useRef } from "react";
// import { PerspectiveCamera } from "@react-three/drei";
// import Camera from "./camera";
import useMeasure from "react-use-measure";
import * as THREE from "three";

// Normalize value between -1 and 1
function normalizeValue(value: number, max: number = 1000): number {
  return Math.max(-1, Math.min(1, value / max));
}

export default function AmieLogo() {
  const [isHover, setIsHover] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [ref, bounds] = useMeasure({ scroll: false });

  const resetMousePosition = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Add debug effect to monitor hover state
  // useEffect(() => {
  //   console.log("Hover state changed:", isHover);
  // }, [isHover]);

  return (
    <div className="bg-red-500 h-screen w-screen flex justify-center items-center">
      <motion.div
        className="bg-green-500 h-1/2 w-1/2 cursor-pointer"
        // @ts-expect-error - ref type mismatch but works at runtime
        ref={ref}
        onMouseEnter={() => {
          // console.log("Mouse enter detected");
          setIsHover(true);
        }}
        onMouseLeave={() => {
          // console.log("Mouse leave detected");
          resetMousePosition();
          setIsHover(false);
        }}
        onPointerMove={(e) => {
          const x = e.clientX - bounds.x - bounds.width / 2;
          const y = e.clientY - bounds.y - bounds.height / 2;
          mouseX.set(x);
          mouseY.set(y);
          // console.log("Mouse position:", x, y);
        }}
        initial={false}
        animate={isHover ? "hover" : "rest"}
        variants={{
          hover: {
            scale: 1.1
          },
          rest: {
            scale: 1.0
          }
        }}
      >
        <Suspense fallback={null}>
          <Canvas>
            {/* <Camera mouseX={mouseX} mouseY={mouseY} /> */}
            <Scene mouseX={mouseX} mouseY={mouseY} isHover={isHover} />
          </Canvas>
        </Suspense>
      </motion.div>
    </div>
  );
}

function Scene({
  mouseX,
  mouseY,
  isHover,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  isHover: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const baseRotationX = Math.PI * 0.4;
  const baseRotationY = Math.PI * 0;
  const baseRotationZ = Math.PI * 0.5;

  const positionX = 0;
  const positionY = 0;
  const positionZ = 0;
  
  // Spring physics values
  const springRef = useRef({
    // Velocities
    vRotX: 0,
    vRotY: 0,
    vRotZ: 0,
    vPosX: 0,
    vPosY: 0,
    vPosZ: 0,
    // Previous targets for smooth transition
    prevTargetRotX: baseRotationX,
    prevTargetRotY: baseRotationY,
    prevTargetRotZ: baseRotationZ,
    prevTargetPosX: positionX,
    prevTargetPosY: positionY,
    prevTargetPosZ: positionZ
  });
  
  // Simple LERP function for smooth transitions
  const lerp = (start: number, end: number, t: number): number => {
    return start * (1 - t) + end * t;
  };

  // Spring function for smoother, bouncy motion
  const spring = (
    current: number,
    target: number,
    velocity: number,
    stiffness: number,
    damping: number
  ): { position: number; velocity: number } => {
    // Calculate spring force
    const force = (target - current) * stiffness;
    // Apply damping to velocity
    const newVelocity = (velocity + force) * damping;
    // Calculate new position
    const newPosition = current + newVelocity;
    
    return { position: newPosition, velocity: newVelocity };
  };

  useFrame(() => {
    if (!groupRef.current) return;
    
    const x = mouseX.get();
    const y = mouseY.get();
    
    // Spring physics constants
    const stiffness = isHover ? 0.08 : 0.06;      // Spring strength
    const damping = isHover ? 0.85 : 0.8;         // Damping factor (lower = more bounce)
    const smoothing = isHover ? 0.2 : 0.1;        // Target interpolation smoothing
    
    if (!isHover) {
      // When not hovering, smoothly transition target back to base values
      springRef.current.prevTargetRotX = lerp(springRef.current.prevTargetRotX, baseRotationX, smoothing);
      springRef.current.prevTargetRotY = lerp(springRef.current.prevTargetRotY, baseRotationY, smoothing);
      springRef.current.prevTargetRotZ = lerp(springRef.current.prevTargetRotZ, baseRotationZ, smoothing);
      
      springRef.current.prevTargetPosX = lerp(springRef.current.prevTargetPosX, positionX, smoothing);
      springRef.current.prevTargetPosY = lerp(springRef.current.prevTargetPosY, positionY, smoothing);
      springRef.current.prevTargetPosZ = lerp(springRef.current.prevTargetPosZ, positionZ, smoothing);

      // Apply spring physics to rotation
      const rotX = spring(
        groupRef.current.rotation.x,
        springRef.current.prevTargetRotX,
        springRef.current.vRotX,
        stiffness,
        damping
      );
      groupRef.current.rotation.x = rotX.position;
      springRef.current.vRotX = rotX.velocity;
      
      const rotY = spring(
        groupRef.current.rotation.y,
        springRef.current.prevTargetRotY,
        springRef.current.vRotY,
        stiffness,
        damping
      );
      groupRef.current.rotation.y = rotY.position;
      springRef.current.vRotY = rotY.velocity;
      
      const rotZ = spring(
        groupRef.current.rotation.z,
        springRef.current.prevTargetRotZ,
        springRef.current.vRotZ,
        stiffness,
        damping
      );
      groupRef.current.rotation.z = rotZ.position;
      springRef.current.vRotZ = rotZ.velocity;
      
      // Apply spring physics to position
      const posX = spring(
        groupRef.current.position.x,
        springRef.current.prevTargetPosX,
        springRef.current.vPosX,
        stiffness,
        damping
      );
      groupRef.current.position.x = posX.position;
      springRef.current.vPosX = posX.velocity;
      
      const posY = spring(
        groupRef.current.position.y,
        springRef.current.prevTargetPosY,
        springRef.current.vPosY,
        stiffness,
        damping
      );
      groupRef.current.position.y = posY.position;
      springRef.current.vPosY = posY.velocity;
      
      const posZ = spring(
        groupRef.current.position.z,
        springRef.current.prevTargetPosZ,
        springRef.current.vPosZ,
        stiffness,
        damping
      );
      groupRef.current.position.z = posZ.position;
      springRef.current.vPosZ = posZ.velocity;
      
    } else {
      // Calculate target values based on mouse position with stronger effect
      const targetRotationX = baseRotationX + normalizeValue(-y) * Math.PI * 0.9;
      const targetRotationY = baseRotationY + normalizeValue(-x) * Math.PI * 1.2;
      
      // Smoothly update target values to prevent sudden jumps
      springRef.current.prevTargetRotX = lerp(springRef.current.prevTargetRotX, targetRotationX, smoothing);
      springRef.current.prevTargetRotY = lerp(springRef.current.prevTargetRotY, targetRotationY, smoothing);
      springRef.current.prevTargetRotZ = baseRotationZ;
      
      // Apply spring physics to rotation
      const rotX = spring(
        groupRef.current.rotation.x,
        springRef.current.prevTargetRotX,
        springRef.current.vRotX,
        stiffness,
        damping
      );
      groupRef.current.rotation.x = rotX.position;
      springRef.current.vRotX = rotX.velocity;
      
      const rotY = spring(
        groupRef.current.rotation.y,
        springRef.current.prevTargetRotY,
        springRef.current.vRotY,
        stiffness,
        damping
      );
      groupRef.current.rotation.y = rotY.position;
      springRef.current.vRotY = rotY.velocity;
      
      // Hold Z rotation steady
      groupRef.current.rotation.z = baseRotationZ;
      springRef.current.vRotZ = 0;
      
      // Calculate target positions with larger offset
      const targetPositionX = positionX + normalizeValue(x) * 0.01;
      const targetPositionY = positionY + normalizeValue(y) * 0.01;
      
      // Smoothly update target position
      springRef.current.prevTargetPosX = lerp(springRef.current.prevTargetPosX, targetPositionX, smoothing);
      springRef.current.prevTargetPosY = lerp(springRef.current.prevTargetPosY, targetPositionY, smoothing);
      springRef.current.prevTargetPosZ = positionZ;
      
      // Apply spring physics to position
      const posX = spring(
        groupRef.current.position.x,
        springRef.current.prevTargetPosX,
        springRef.current.vPosX,
        stiffness,
        damping
      );
      groupRef.current.position.x = posX.position;
      springRef.current.vPosX = posX.velocity;
      
      const posY = spring(
        groupRef.current.position.y,
        springRef.current.prevTargetPosY,
        springRef.current.vPosY,
        stiffness,
        damping
      );
      groupRef.current.position.y = posY.position;
      springRef.current.vPosY = posY.velocity;
      
      // Keep Z position steady
      groupRef.current.position.z = positionZ;
      springRef.current.vPosZ = 0;
    }
  });

  return (
    <group>
      <gridHelper args={[10, 20]} />
      {/* <PerspectiveCamera
        // makeDefault
        fov={45}
        position={[-0.5, 0.6, 3]}
        rotation={[-Math.PI / 2, 0, 0]}
        near={0.1}
        far={1000}
      /> */}
      <axesHelper args={[5]} />
      <directionalLight
        intensity={5}
        position={[200, 150, 100]}
        rotation={[-0.818, 1.364, 0.667]}
      />
      <rectAreaLight
        width={300}
        height={300}
        intensity={5}
        position={[-500, 500, 500]}
        lookAt={[0, 0, 0]}
        color="#ffd700"
      />

      {/* Fill Light (Shadow softening) */}
      <rectAreaLight
        width={300}
        height={300}
        intensity={2}
        position={[500, 300, 500]}
        color="#4090ff"
      />

      {/* Rim Light (Backlight) */}
      <directionalLight
        intensity={15}
        position={[0, 500, -500]}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <group
        ref={groupRef}
        position={[positionX, positionY, positionZ]}
        scale={0.005}
        rotation={[baseRotationX, baseRotationY, baseRotationZ]}
      >
        <Model />
      </group>
      <ambientLight intensity={4} color="#ffffff" />
    </group>
  );
}
