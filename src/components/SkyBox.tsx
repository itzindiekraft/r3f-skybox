import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import Gibli from "../assets/hdri/gibli.jpg";

let webglAvailable: boolean | undefined;

const canUseWebGL = () => {
  if (webglAvailable === undefined) {
    const canvas = document.createElement("canvas");
    const context =
      canvas.getContext("webgl2") ?? canvas.getContext("webgl");

    webglAvailable = context !== null;
    context?.getExtension("WEBGL_lose_context")?.loseContext();
  }

  return webglAvailable;
};

const SkyBox = () => {
  const { skybox } = useControls({
    skybox: {
      options: {
        Gibli: Gibli,
      },
    },
  });

  if (!canUseWebGL()) {
    return (
      <main className="skybox-preview">
        <img
          className="skybox-preview__image"
          src={skybox}
          alt="Static preview of the selected skybox"
        />
        <p className="skybox-preview__notice">
          Showing a static preview because WebGL is disabled in this browser.
          Enable hardware acceleration or use a browser with WebGL support for
          the interactive 3D view.
        </p>
      </main>
    );
  }

  return (
    <Canvas
      fallback={
        <div className="webgl-fallback" role="status">
          <h1>WebGL is unavailable</h1>
          <p>
            This browser or environment could not start a WebGL context. Enable
            hardware acceleration or try a browser that supports WebGL, then
            reload the page.
          </p>
        </div>
      }
    >
      <OrbitControls maxDistance={2000} minDistance={500} />

      <ambientLight intensity={1} />

      <Environment files={skybox} background />

      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[100, 100, 100]} />
        <meshStandardMaterial color={"orange"} />
      </mesh>
    </Canvas>
  );
};

export default SkyBox;
