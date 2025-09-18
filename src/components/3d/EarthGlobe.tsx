import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} args={[2, 100, 200]} scale={1}>
      <MeshDistortMaterial
        color="#22d3ee"
        attach="material"
        distort={0.1}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.8}
      />
    </Sphere>
  );
}

function AirQualityPoints() {
  const pointsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={pointsRef}>
      {/* Simulated air quality monitoring points */}
      <Sphere position={[2.2, 0.5, 0.5]} args={[0.05, 16, 16]}>
        <meshBasicMaterial color="#ef4444" />
      </Sphere>
      <Sphere position={[1.8, -0.8, 1.2]} args={[0.05, 16, 16]}>
        <meshBasicMaterial color="#f59e0b" />
      </Sphere>
      <Sphere position={[-1.5, 1.2, 1.5]} args={[0.05, 16, 16]}>
        <meshBasicMaterial color="#22c55e" />
      </Sphere>
      <Sphere position={[-2.1, -0.3, -0.8]} args={[0.05, 16, 16]}>
        <meshBasicMaterial color="#eab308" />
      </Sphere>
    </group>
  );
}

export default function EarthGlobe() {
  return (
    <div className="w-full h-[400px] relative">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Globe />
        <AirQualityPoints />
      </Canvas>
    </div>
  );
}