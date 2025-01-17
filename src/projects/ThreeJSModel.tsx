import { Environment } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Model } from "../components/Model";

function SetCameraPosition() {
  const { camera } = useThree();
  camera.position.set(0, -900, 0); // Desired camera position
  camera.lookAt(0, 0, 0); // Esure the camera looks at the center
  return null;
}

export default function ThreeJSModel() {
  const modelRef = useRef<{ flyAnimation: () => void }>(null);

  const handleFlyClick = () => {
    if (modelRef.current) {
      modelRef.current.flyAnimation();
    }
  };
  return (
    <div className=" p-5 border rounded-lg gap-5 flex flex-col">
      <div>
        <h1 className="font-bold text-3xl">
          Interactive 3D Animation with Three.js
        </h1>
        <p className="text-gray-500">
          Dive into a real-time 3D experience showcasing dynamic object
          animations. Built using Three.js, React Three Fiber, and GSAP, this
          demo highlights smooth transitions and powerful 3D rendering
          capabilities, creating an immersive and interactive experience.
        </p>
      </div>
      <div className="bg-black rounded-lg h-[90vh] relative">
        <Canvas>
          <SetCameraPosition />

          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 10]}
            intensity={1}
            color="white"
          />
          <directionalLight
            position={[-10, 10, 10]}
            intensity={1}
            color="white"
          />
          <directionalLight
            position={[10, -10, 10]}
            intensity={1}
            color="white"
          />
          <directionalLight
            position={[-10, -10, -10]}
            intensity={1}
            color="white"
          />

          <Environment preset="sunset" />
          <Model ref={modelRef} />
        </Canvas>
      </div>
      <div  className="flex">
        <div className="flex flex-col gap-3 w-full">
          <h5 className="font-semibold text-xl">How it works:</h5>
          <ol className="list-decimal list-inside text-gray-500">
            <li>Ensure the 3D model is fully loaded</li>
            <li>Click the "Fly" button to trigger the animation</li>
            <li>Watch the seamless 3D model animation unfold</li>
            <li>Enjoy real-time interaction with the 3D scene</li>
          </ol>
          <div className="flex gap-3 flex-wrap">
            <span className="flex items-center gap-1 text-sm bg-black text-white w-fit p-1 px-3 rounded-2xl font-medium ">
              Three.js
            </span>

            <span className="flex items-center gap-1 text-sm bg-black text-white w-fit p-1 px-3 rounded-2xl font-medium">
              GSAP
            </span>
            <span className="flex items-center gap-1 text-sm bg-black text-white w-fit p-1 px-3 rounded-2xl font-medium">
              Real-Time 3D Animation
            </span>
          </div>
        </div>
          <div className="flex items-center">
            <button
              className="border-black  border rounded-lg px-4 py-2 w-fit h-fit  font-semibold"
              onClick={handleFlyClick}
            >
              Fly
            </button>
          </div>
      </div>
    </div>
  );
}
