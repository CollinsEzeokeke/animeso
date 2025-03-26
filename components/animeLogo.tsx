import { Canvas } from "@react-three/fiber";
import { Model } from "./model";
import { OrbitControls } from "@react-three/drei";

export default function AmieLogo() {
    return(
        <div className="bg-red-500 h-screen w-screen flex justify-center items-center">
            <Canvas className="bg-green-500 w-[5vw] h-[10vh]">
                <Scene />
            </Canvas>
        </div>
    )
}

function Scene () {
    return(
     <group>
        <OrbitControls />
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
        <Model/>
        <ambientLight intensity={4} color="#ffffff"/>
     </group>
    )
}