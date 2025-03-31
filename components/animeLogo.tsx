import { Canvas } from "@react-three/fiber";
import { Model } from "./model";
import { MotionValue, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { Suspense, useState } from "react";
import Camera from "./camera";
import useMeasure from "react-use-measure";
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
          mouseX.set(e.clientX - bounds.x - bounds.width / 2);
          mouseY.set(e.clientY - bounds.y - bounds.height / 2);

          // send mouseX and mouseY to the server
          fetch("/api/mouseX", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ mouseX: mouseX.get() }),
          });
          // send mouseY to the server
          fetch("/api/mouseY", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ mouseY: mouseY.get() }),
          });
        }}
        initial={false}
        animate={isHover ? "hover" : "rest"}
        variants={{
          hover: {
            // rotateX: mouseX.get() / 10,
            rotateY: mouseX.get() / 10,
            scale: 1.5,
          },
        }}
      >
        <Suspense fallback={null}>
          <Canvas>
            <Camera mouseX={mouseX} mouseY={mouseY} />
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
  return (
    <group>
      <gridHelper args={[10, 20]} />
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
      <motion.group
        initial={{
          // rotation: [0, 0, 0],
          rotateX: Math.PI * 0.4,
          rotateY: Math.PI * 0,
          rotateZ: Math.PI * 0.5,
        }}
        // // animate={{ y: 1, x: -3, z: 3 }}
        animate={{
          // y: mouseY,
          // x: -3,
          // z: 3,
          // rotateX: Math.PI * 0.1,
          // rotateY: Math.PI * 0.2,
          // rotateZ: Math.PI * 0.5,
        }}
        // transition={{ duration: 3, ease: "easeInOut" }}
        position={[0, 0, 0]}
        scale={0.002}
      >
        <Model />
      </motion.group>
      <ambientLight intensity={4} color="#ffffff" />
    </group>
  );
}
