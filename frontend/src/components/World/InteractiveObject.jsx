import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import useGameStore from '../../store/gameStore';

const InteractiveObject = ({ 
  position, 
  title, 
  description, 
  color = '#4a90e2',
  data,
  type = 'info' 
}) => {
  const meshRef = useRef();
  const { playerPosition, setNearbyInteractable } = useGameStore();
  const [hovered, setHovered] = React.useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Gentle floating animation
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    
    // Rotate
    meshRef.current.rotation.y += 0.01;

    // Check distance to player
    const playerPos = new THREE.Vector3(...playerPosition);
    const objectPos = new THREE.Vector3(...position);
    const distance = playerPos.distanceTo(objectPos);

    if (distance < 3) {
      if (!hovered) {
        setHovered(true);
        setNearbyInteractable({
          title,
          description,
          data,
          type,
          promptText: `Interact with ${title}`,
          onInteract: () => {
            console.log('Interacting with:', title);
          }
        });
      }
    } else {
      if (hovered) {
        setHovered(false);
        setNearbyInteractable(null);
      }
    }
  });

  return (
    <group position={position}>
      {/* Main interactive object */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial 
          color={hovered ? '#ffffff' : color}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Glow effect */}
      {hovered && (
        <pointLight
          position={[0, 0, 0]}
          intensity={2}
          distance={5}
          color={color}
        />
      )}

      {/* Title text */}
      <Text
        position={[0, 2, 0]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000"
      >
        {title}
      </Text>
    </group>
  );
};

export default InteractiveObject;