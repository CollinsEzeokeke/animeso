import { useRef, useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { MotionValue } from "framer-motion";
import { useSmoothTransform } from "../hooks/designHooks/useSmoothTransform";
import { PerspectiveCamera } from "three";
import { ThreeElements } from "@react-three/fiber";
import React from "react";

interface CameraProps extends Omit<ThreeElements['perspectiveCamera'], 'ref'> {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

const spring = { stiffness: 600, damping: 30 };

export default function Camera({ mouseX, mouseY, ...props }: CameraProps) {
  const cameraX = useSmoothTransform(mouseX, spring, (x: number) => x / 350) as unknown as MotionValue<number>;
  const cameraY = useSmoothTransform(mouseY, spring, (y: number) => (-1 * y) / 350)as unknown as MotionValue<number>;

  const set = useThree(({ set }) => set);
  const camera = useThree(({ camera }) => camera);
  const size = useThree(({ size }) => size);
  const scene = useThree(({ scene }) => scene);
  const cameraRef = useRef<PerspectiveCamera>(null);

  useLayoutEffect(() => {
    const { current: cam } = cameraRef;
    if (cam) {
      cam.aspect = size.width / size.height;
      cam.updateProjectionMatrix();
    }
  }, [size, props]);

  useLayoutEffect(() => {
    if (cameraRef.current) {
      const oldCam = camera;
      set(() => ({ camera: cameraRef.current as PerspectiveCamera }));
      return () => set(() => ({ camera: oldCam }));
    }
  }, [camera, cameraRef, set]);

  useLayoutEffect(() => {
    return cameraX.onChange(() => camera.lookAt(scene.position));
  }, [cameraX, camera, scene.position]);

  return (
    <motion.perspectiveCamera
      // @ts-expect-error - ref type mismatch but works at runtime
      ref={cameraRef}
      fov={90}
      position-x={cameraX}
      position-y={cameraY}
      position-z={3.8}
      makeDefault
      {...props}
    />
  );
}








// import { useRef, useLayoutEffect } from "react";
// import { useThree } from "@react-three/fiber";
// import { motion } from "framer-motion-3d";
// import { MotionValue } from "framer-motion";
// import { useSmoothTransform } from "../hooks/designHooks/useSmoothTransform";
// import * as THREE from "three";

// // Adapted from https://github.com/pmndrs/drei/blob/master/src/core/PerspectiveCamera.tsx
// interface CameraProps {
//   mouseX: MotionValue<number>;
//   mouseY: MotionValue<number>;
//   [key: string]: unknown;
// }

// const spring = { stiffness: 600, damping: 30 };

// export default function Camera({ mouseX, mouseY, ...props }: CameraProps) {
//   const cameraX = useSmoothTransform(mouseX, spring, (x: number) => x / 350);
//   const cameraY = useSmoothTransform(mouseY, spring, (y: number) => (-1 * y) / 350);

//   const set = useThree(({ set }) => set);
//   const camera = useThree(({ camera }) => camera);
//   const size = useThree(({ size }) => size);
//   const scene = useThree(({ scene }) => scene);
//   const cameraRef = useRef<THREE.PerspectiveCamera>(null);

//   useLayoutEffect(() => {
//     const { current: cam } = cameraRef;
//     if (cam) {
//       cam.aspect = size.width / size.height;
//       cam.updateProjectionMatrix();
//     }
//   }, [size, props]);

//   useLayoutEffect(() => {
//     if (cameraRef.current) {
//       const oldCam = camera;
//       set(() => ({ camera: cameraRef.current }));
//       return () => set(() => ({ camera: oldCam }));
//     }
//   }, [camera, cameraRef, set]);

//   useLayoutEffect(() => {
//     return cameraX.onChange(() => camera.lookAt(scene.position));
//   }, [cameraX, camera, scene.position]);

//   return (
//     <motion.perspectiveCamera
//       ref={cameraRef}
//       fov={90}
//       position={[cameraX, cameraY, 3.8]}
//       {...props}
//     />
//   );
// }



// import { useRef, useLayoutEffect } from "react";
// import { useThree } from "@react-three/fiber";
// import { motion } from "framer-motion-3d";
// import { MotionValue } from "framer-motion";
// import { useSmoothTransform } from "../hooks/designHooks/useSmoothTransform";
// import * as THREE from "three";

// // Adapted from https://github.com/pmndrs/drei/blob/master/src/core/PerspectiveCamera.tsx
// interface CameraProps {
//   mouseX: MotionValue<number>;
//   mouseY: MotionValue<number>;
//   [key: string]: unknown;
// }
// const spring = { stiffness: 600, damping: 30 };

// export default function Camera({ mouseX, mouseY, ...props }: CameraProps) {
//   // const cameraX = useSmoothTransform(mouseX, spring, (x: number) => x / 350);
//   // const cameraY = useSmoothTransform(
//   //   mouseY,
//   //   spring,
//   //   (y: number) => (-1 * y) / 350
//   // );


//   const cameraX = useSmoothTransform(mouseX, spring, (x: number) => x / 350)
//   const cameraY = useSmoothTransform(mouseY, spring, (y: number) => (-1 * y) / 350)

//   const set = useThree(({ set }) => set);
//   const camera = useThree(({ camera }) => camera);
//   const size = useThree(({ size }) => size);
//   const scene = useThree(({ scene }) => scene);
//   const cameraRef = useRef<THREE.PerspectiveCamera>(null)

//   useLayoutEffect(() => {
//     const { current: cam } = cameraRef;
//     if (cam) {
//       cam.aspect = size.width / size.height;
//       cam.updateProjectionMatrix();
//     }
//   }, [size, props]);

//   useLayoutEffect(() => {
//     if (cameraRef.current) {
//       const oldCam = camera;
//       set(() => ({ camera: cameraRef.current }));
//       return () => set(() => ({ camera: oldCam }));
//     }
//   }, [camera, cameraRef, set]);

//   useLayoutEffect(() => {
//     return cameraX.onChange(() => camera.lookAt(scene.position));
//   }, [cameraX]);

//   return (
//     <motion.perspectiveCamera
//       ref={cameraRef}
//       fov={90}
//       position={[cameraX, cameraY, 3.8]}
//     />
//   );
// }

// import { useRef, useLayoutEffect } from "react";
// import { useThree } from "@react-three/fiber";
// import { motion, MotionValue } from "framer-motion";
// import { useSmoothTransform } from "../hooks/designHooks/useSmoothTransform";

// export default function Camera({})
