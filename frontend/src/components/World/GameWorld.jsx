import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Player from './Player';
import WelcomeZone from './WelcomeZone';
import ProjectsZone from './ProjectsZone';
import ConnectZone from './ConnectZone';

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
      <ambientLight intensity={0.5} />
      
      {/* Main directional light */}
      <directionalLight
        position={[10, 20, 10]}
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      
      {/* Fill lights */}
      <pointLight position={[-10, 10, -10]} intensity={0.3} color="#4a90e2" />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#2ecc71" />
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

// Simple starfield using Points for better performance
const Starfield = () => {
  const count = 1000;
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 1] = Math.random() * 50 + 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
  }
  
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#ffffff"
        sizeAttenuation={true}
        transparent={false}
      />
    </points>
  );
};

const Scene = () => {
  return (
    <>
      {/* Background color */}
      <color attach="background" args={['#0a0a0f']} />
      
      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0a0f', 30, 60]} />
      
      <Lighting />
      <Ground />
      <Starfield />
      
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
    </>
  );
};

const GameWorld = () => {
  return (
    <div className="w-full h-screen">
      <Canvas
        shadows
        camera={{ position: [0, 5, 10], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: false,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default GameWorld;