import { Canvas } from "@react-three/fiber";
import { Model } from "./model";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

export default function AmieLogo() {
  return (
    <div className="bg-red-500 h-screen w-screen flex justify-center items-center">
      <Canvas className="bg-green-500 w-[5vw] h-[10vh]">
        <Scene />
      </Canvas>
    </div>
  );
}

function Scene() {
  return (
    <group>
      {/* <OrbitControls /> */}
      <OrbitControls
        target={[0, 0, 0]} // Orbit around model origin
        maxPolarAngle={Math.PI / 2} // Limit vertical rotation
      />

      {/* <PerspectiveCamera
        makeDefault
        fov={45}
        position={[10, 5, 10]} // Front-right position
        near={0.1}
        far={10000}
      /> */}
      
      <gridHelper args={[10, 20]} />
      <axesHelper args={[5]} />
      <PerspectiveCamera
        makeDefault
        fov={45}
        position={[5, 10, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        near={0.1}
        far={1000}
      />
      <directionalLight
        intensity={10}
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
        rotation-x={Math.PI * 0.1}
        rotation-y={Math.PI * 0.5}
        rotation-z={Math.PI * 0.5}
      >
        <Model />
      </group>
      <ambientLight intensity={4} color="#ffffff" />
    </group>
  );
}
