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
  
  // Simple LERP function for smooth transitions
  const lerp = (start: number, end: number, t: number): number => {
    return start * (1 - t) + end * t;
  };

  // For debugging
  // useEffect(() => {
  //   console.log("Scene received hover state change:", isHover);
  // }, [isHover]);

  useFrame(() => {
    if (!groupRef.current) return;
    
    const x = mouseX.get();
    const y = mouseY.get();
    
    if (!isHover) {
      // When not hovering, smoothly return to base values
      groupRef.current.rotation.x = lerp(groupRef.current.rotation.x, baseRotationX, 0.05);
      groupRef.current.rotation.y = lerp(groupRef.current.rotation.y, baseRotationY, 0.05);
      groupRef.current.rotation.z = lerp(groupRef.current.rotation.z, baseRotationZ, 0.05);
      
      groupRef.current.position.x = lerp(groupRef.current.position.x, positionX, 0.05);
      groupRef.current.position.y = lerp(groupRef.current.position.y, positionY, 0.05);
      groupRef.current.position.z = lerp(groupRef.current.position.z, positionZ, 0.05);
    } else {
      // Calculate target values based on mouse position with stronger effect
      const targetRotationX = baseRotationX + normalizeValue(-y) * Math.PI * 0.9;
      const targetRotationY = baseRotationY + normalizeValue(-x) * Math.PI * 1.2;
      
      // Smoothly interpolate current rotation to target rotation (faster)
      groupRef.current.rotation.x = lerp(groupRef.current.rotation.x, targetRotationX, 0.15);
      groupRef.current.rotation.y = lerp(groupRef.current.rotation.y, targetRotationY, 0.15);
      groupRef.current.rotation.z = baseRotationZ;
      
      // Calculate target positions with larger offset
      const targetPositionX = positionX + normalizeValue(x) * 0.01;
      const targetPositionY = positionY + normalizeValue(y) * 0.01;
      
      // Smoothly interpolate current position to target position (faster)
      groupRef.current.position.x = lerp(groupRef.current.position.x, targetPositionX, 0.15);
      groupRef.current.position.y = lerp(groupRef.current.position.y, targetPositionY, 0.15);
      groupRef.current.position.z = positionZ;
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
