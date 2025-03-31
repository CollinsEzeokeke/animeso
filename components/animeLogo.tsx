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

  return (
    <div className="bg-red-500 h-screen w-screen flex justify-center items-center">
      <motion.div
        className="bg-green-500 h-screen w-screen"
        // @ts-expect-error - ref type mismatch but works at runtime
        ref={ref}
        onHoverStart={() => {
          resetMousePosition();
          setIsHover(true);
        }}
        onHoverEnd={() => {
          resetMousePosition();
          setIsHover(false);
        }}
        onPointerMove={(e) => {
          const x = e.clientX - bounds.x - bounds.width / 2;
          const y = e.clientY - bounds.y - bounds.height / 2;          
          mouseX.set(x);
          mouseY.set(y);

          // // send mouseX and mouseY to the server
          // fetch("/api/mouseX", {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify({ mouseX: x }),
          // });
          // // send mouseY to the server
          // fetch("/api/mouseY", {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify({ mouseY: y }),
          // });
        }}
        initial={false}
        animate={isHover ? "hover" : "rest"}
        variants={{
          hover: {
            rotateY: mouseX.get() / 10,
            scale: 1.5,
          },
        }}
      >
        <Suspense fallback={null}>
          <Canvas>
            {/* <Camera mouseX={mouseX} mouseY={mouseY} /> */}
            <Scene mouseX={mouseX} mouseY={mouseY} />
          </Canvas>
        </Suspense>
      </motion.div>
    </div>
  );
}

function Scene({
  mouseX,
  mouseY,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const baseRotationX = Math.PI * 0.4;
  const baseRotationY = Math.PI * 0;
  const baseRotationZ = Math.PI * 0.5;

  const positionX = 0;
  const positionY = 0;
  const positionZ = 0;

  useFrame(() => {
    if (groupRef.current) {
      const x = mouseX.get();
      const y = mouseY.get();
      
      const targetRotationX = baseRotationX + normalizeValue(-y) * Math.PI * 0.3;
      const targetRotationY = baseRotationY + normalizeValue(-x) * Math.PI * 0.99;
      
      // Smooth interpolation
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.1;
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.1;
      groupRef.current.rotation.z = baseRotationZ;

      groupRef.current.position.x += normalizeValue(x) * 0.001;
      groupRef.current.position.y += normalizeValue(y) * 0.001;
      groupRef.current.position.z += 0;
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
        scale={0.002}
        rotation={[baseRotationX, baseRotationY, baseRotationZ]}
      >
        <Model />
      </group>
      <ambientLight intensity={4} color="#ffffff" />
    </group>
  );
}
