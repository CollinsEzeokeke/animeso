import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { JSX } from "react/jsx-runtime";

type GLTFResult = GLTF & {
  nodes: {
    ["0309e78c-2629-4355-a846-1ae0fa7398ce"]: THREE.Mesh;
    ["bba32a21-ebb4-473c-84be-2c3413e60b2e"]: THREE.Mesh;
    ["693666d9-ead6-441b-a7fc-eeed149ccf1e"]: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.Material;
  };
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const gltf = useGLTF("/MyCollection1.glb");
  const { nodes } = gltf as unknown as GLTFResult;
  const commonColor = new THREE.MeshStandardMaterial({
    color: "purple",
    roughness: 0.3, // More reflective surface
    metalness: 0.1, // Metallic appearance
  });

  return (
    // formular for calculating pi in code is:

    // number% x 360 / 2 = converted percentage in degrees.............
    <group
      {...props}
      dispose={null}
    >
      <mesh
        geometry={nodes["0309e78c-2629-4355-a846-1ae0fa7398ce"].geometry}
        material={commonColor}
        position={[37.231, 45.131, -273.383]}
        rotation={[0, 0.104, 0]}
      />
      <mesh
        geometry={nodes["bba32a21-ebb4-473c-84be-2c3413e60b2e"].geometry}
        material={commonColor}
        position={[37.231, 45.131, -273.383]}
        rotation={[-0.06, 0.104, 0.006]}
      />
    </group>
  );
}

useGLTF.preload("/MyCollection1.glb");