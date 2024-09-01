import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshWobbleMaterial } from "@react-three/drei";

const Cube = ({ position, size, color }) => {
  const ref = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  /*
  useFrame((state, delta) => {
    if (ref.current) {
      const speed = isHovered ? 2 : 1;
      ref.current.rotation.x += delta;
      ref.current.rotation.y += delta * speed;
      // ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2;
    }
  });
  */

  return (
    <mesh
      position={position}
      ref={ref}
      onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
      onPointerLeave={(event) => (event.stopPropagation(), setIsHovered(false))}
      onClick={(event) => (event.stopPropagation(), setIsClicked(!isClicked))}
      scale={isClicked ? 1.5 : 1}
    >
      <boxGeometry args={size} />
      {/*<meshStandardMaterial color={isHovered ? "orange" : "blue"} />*/}
      <MeshWobbleMaterial />
    </mesh>
  );
};

export default Cube;
