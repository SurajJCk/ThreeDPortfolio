import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useKeyboard, getMovementInput } from '../../hooks/useKeyboard';
import useGameStore from '../../store/gameStore';
import * as THREE from 'three';

const Player = () => {
  const playerRef = useRef();
  const keys = useKeyboard();
  const { setPlayerPosition, setCurrentZone } = useGameStore();
  
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const speed = 0.1;
  const friction = 0.9;

  useFrame((state) => {
    if (!playerRef.current) return;

    const input = getMovementInput(keys);
    const camera = state.camera;

    // Calculate movement direction based on camera
    direction.current.set(0, 0, 0);

    // Forward/backward movement
    if (input.forward !== 0) {
      const forward = new THREE.Vector3();
      camera.getWorldDirection(forward);
      forward.y = 0;
      forward.normalize();
      direction.current.add(forward.multiplyScalar(input.forward));
    }

    // Left/right movement
    if (input.right !== 0) {
      const right = new THREE.Vector3();
      camera.getWorldDirection(right);
      right.cross(camera.up);
      right.y = 0;
      right.normalize();
      direction.current.add(right.multiplyScalar(input.right));
    }

    // Normalize diagonal movement
    if (direction.current.length() > 0) {
      direction.current.normalize();
    }

    // Apply movement
    velocity.current.x += direction.current.x * speed;
    velocity.current.z += direction.current.z * speed;

    // Apply friction
    velocity.current.multiplyScalar(friction);

    // Update position
    playerRef.current.position.add(velocity.current);

    // Simple boundary check
    const boundary = 30;
    playerRef.current.position.x = Math.max(-boundary, Math.min(boundary, playerRef.current.position.x));
    playerRef.current.position.z = Math.max(-boundary, Math.min(boundary, playerRef.current.position.z));

    // Update camera to follow player
    const idealOffset = new THREE.Vector3(0, 4, 8);
    const idealLookat = new THREE.Vector3(
      playerRef.current.position.x,
      playerRef.current.position.y + 2,
      playerRef.current.position.z
    );

    // Smooth camera follow
    const t = 0.05;
    camera.position.lerp(
      playerRef.current.position.clone().add(idealOffset),
      t
    );
    camera.lookAt(idealLookat);

    // Update store with player position
    setPlayerPosition([
      playerRef.current.position.x,
      playerRef.current.position.y,
      playerRef.current.position.z
    ]);

    // Zone detection
    const pos = playerRef.current.position;
    if (pos.x > 10 && pos.z < 0) {
      setCurrentZone('projects');
    } else if (pos.x < -10 && pos.z < 0) {
      setCurrentZone('connect');
    } else {
      setCurrentZone('welcome');
    }
  });

  return (
    <group ref={playerRef} position={[0, 1, 5]}>
      {/* Simple player representation (can be replaced with 3D model) */}
      <mesh castShadow>
        <capsuleGeometry args={[0.5, 1, 4, 8]} />
        <meshStandardMaterial color="#4a90e2" />
      </mesh>
      {/* Player "head" indicator */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};

export default Player;