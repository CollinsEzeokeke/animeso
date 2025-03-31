import { Canvas } from "@react-three/fiber";
import { Model } from "./model";
// import { PerspectiveCamera } from "@react-three/drei";
import { useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { Suspense } from "react";
import Camera from "./camera";
// import { PerspectiveCamera } from "@react-three/drei";
export default function AmieLogo() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // const resetMousePosition = () => {
  //   mouseX.set(0);
  //   mouseY.set(0);
  // };
  return (
    <div className="bg-red-500 h-screen w-screen flex justify-center items-center">
      <div className="bg-green-500 w-[calc(100% + 200px)]">
        <Suspense fallback={null}>
          <Canvas>
            <Camera mouseX={mouseX} mouseY={mouseY} />
            <Scene />
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
}

function Scene() {
  return (
    <group>
      {/* <OrbitControls /> */}
      {/* <OrbitControls
          target={[0, 0, 0]} // Orbit around model origin
          maxPolarAngle={Math.PI / 2} // Limit vertical rotation
        /> */}
      <gridHelper args={[10, 20]} />
      <axesHelper args={[5]} />
      {/* <PerspectiveCamera
        makeDefault
        fov={45}
        position={[0, 20, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        near={0.1}
        far={1000}
      /> */}
      {/* <motion.perspectiveCamera position={[0, 0, 0]}/> */}
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
      <motion.group
        initial={{
          y: 0,
          x: 0,
          z: 0,
          // rotation: [0, 0, 0],
          rotateX: Math.PI * 0.1,
          rotateY: Math.PI * 0.5,
          rotateZ: Math.PI * 0.5,
        }}
        // animate={{ y: 1, x: -3, z: 3 }}
        animate={{
          // y: 1,
          // x: -3,
          // z: 3,
          rotateX: Math.PI * 0.1,
          rotateY: Math.PI * 0.2,
          rotateZ: Math.PI * 0.5,
        }}
        transition={{ duration: 3, ease: "easeInOut" }}
        scale={0.05}
      >
        <Model />
      </motion.group>
      <ambientLight intensity={4} color="#ffffff" />
    </group>
  );
}
