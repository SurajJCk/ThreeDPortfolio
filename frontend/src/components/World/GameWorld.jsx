import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky, Stars, Environment } from '@react-three/drei';
import Player from './Player';
import WelcomeZone from './WelcomeZone';
import ProjectsZone from './ProjectsZone';
import ConnectZone from './ConnectZone';
import useGameStore from '../../store/gameStore';

const Ground = () => {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial 
        color="#1a1a2e"
        metalness={0.1}
        roughness={0.9}
      />
    </mesh>
  );
};

const Lighting = () => {
  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.4} />
      
      {/* Main directional light (sun) */}
      <directionalLight
        position={[10, 20, 10]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      
      {/* Fill lights */}
      <pointLight position={[-10, 10, -10]} intensity={0.5} color="#4a90e2" />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#2ecc71" />
      
      {/* Hemisphere light for better ambient */}
      <hemisphereLight
        skyColor="#87CEEB"
        groundColor="#1a1a2e"
        intensity={0.3}
      />
    </>
  );
};

const PathConnector = ({ start, end, color = '#ffffff' }) => {
  const midPoint = [
    (start[0] + end[0]) / 2,
    -0.4,
    (start[2] + end[2]) / 2
  ];
  
  const distance = Math.sqrt(
    Math.pow(end[0] - start[0], 2) + Math.pow(end[2] - start[2], 2)
  );
  
  const angle = Math.atan2(end[2] - start[2], end[0] - start[0]);
  
  return (
    <mesh 
      position={midPoint} 
      rotation={[0, angle, 0]}
      receiveShadow
    >
      <boxGeometry args={[distance, 0.2, 2]} />
      <meshStandardMaterial 
        color={color}
        emissive={color}
        emissiveIntensity={0.2}
        metalness={0.5}
        roughness={0.5}
      />
    </mesh>
  );
};

const Scene = () => {
  return (
    <>
      <Lighting />
      <Ground />
      
      {/* Paths connecting zones */}
      <PathConnector 
        start={[0, 0, 0]} 
        end={[15, 0, -10]} 
        color="#f39c12" 
      />
      <PathConnector 
        start={[0, 0, 0]} 
        end={[-15, 0, -10]} 
        color="#2ecc71" 
      />
      
      {/* Zones */}
      <WelcomeZone />
      <ProjectsZone />
      <ConnectZone />
      
      {/* Player */}
      <Player />
      
      {/* Skybox and environment */}
      <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0.6}
        azimuth={0.25}
      />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
    </>
  );
};

const GameWorld = () => {
  const controlsRef = useRef();
  
  return (
    <div className="w-full h-screen">
      <Canvas
        shadows
        camera={{ position: [0, 5, 10], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor('#0a0a0f');
        }}
      >
        <Suspense fallback={null}>
          <Scene />
          {/* Environment for better reflections */}
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default GameWorld;