import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "three";

const RotatingCube = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[2, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#3b82f6" wireframe />
    </mesh>
  );
};

const FloatingCube = () => {
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const supported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      setWebGlSupported(supported);
    } catch (e) {
      setWebGlSupported(false);
    }
  }, []);

  if (!webGlSupported) {
    // Beautiful CSS fallback: Rotating neon gradient ring matching the theme
    return (
      <div className="absolute top-1/2 right-10 w-64 h-64 opacity-20 flex items-center justify-center pointer-events-none">
        <div className="w-32 h-32 rounded-full border border-dashed border-blue-500/40 animate-[spin_20s_linear_infinite]" />
      </div>
    );
  }

  return (
    <div className="absolute top-1/2 right-10 w-64 h-64 opacity-30">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <RotatingCube />
      </Canvas>
    </div>
  );
};

export default FloatingCube;
