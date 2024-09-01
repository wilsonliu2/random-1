import React from "react";
import Cube from "./Cube";
import { OrbitControls } from "@react-three/drei";

const Scene = () => {
  return (
    <>
      <directionalLight position={[0, 0, 2]} />
      <ambientLight intensity={0.1}></ambientLight>

      <group position={[-1, -1, 0]}>
        <Cube position={[1, 0, 0]} color={"red"} size={[1, 1, 1]} />
        <Cube position={[-1, 0, 0]} color={"blue"} size={[1, 1, 1]} />
        <Cube position={[-1, 2, 0]} color={"green"} size={[1, 1, 1]} />
      </group>
      <OrbitControls />
    </>
  );
};

export default Scene;
