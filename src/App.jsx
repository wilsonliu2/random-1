import { Canvas, useFrame } from "@react-three/fiber";
import Scene from "./components/Scene";
import Button from "./components/Button";

const App = () => {
  return (
    <>
      <Button />
      <div className="flex h-screen items-center justify-center">
        <Canvas>
          <Scene />
        </Canvas>
      </div>
    </>
  );
};

export default App;
