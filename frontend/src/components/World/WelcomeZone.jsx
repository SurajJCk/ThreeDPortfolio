import { Text } from '@react-three/drei';
import InteractiveObject from './InteractiveObject';
import portfolioData from '../../mock/portfolioData';

const WelcomeZone = () => {
  const zoneData = portfolioData.zones.welcome;
  const { personal } = portfolioData;

  return (
    <group position={[0, 0, 0]}>
      {/* Ground platform */}
      <mesh receiveShadow position={[0, -0.5, 0]}>
        <cylinderGeometry args={[8, 8, 1, 32]} />
        <meshStandardMaterial 
          color={zoneData.color}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Welcome Monument */}
      <group position={[0, 0, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.3, 0.5, 3, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        
        {/* Info Crystal */}
        <InteractiveObject
          position={[0, 3, 0]}
          title="About Me"
          description={personal.bio}
          color="#4a90e2"
          data={personal}
          type="bio"
        />
      </group>

      {/* Direction markers */}
      <Text
        position={[6, 1, -3]}
        rotation={[0, -Math.PI / 4, 0]}
        fontSize={0.5}
        color="#f39c12"
        anchorX="center"
      >
        Projects →
      </Text>

      <Text
        position={[-6, 1, -3]}
        rotation={[0, Math.PI / 4, 0]}
        fontSize={0.5}
        color="#2ecc71"
        anchorX="center"
      >
        ← Connect
      </Text>

      {/* Ambient particles/stars */}
      {[...Array(20)].map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 15,
            Math.random() * 5 + 2,
            (Math.random() - 0.5) * 15
          ]}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#ffffff" opacity={0.6} transparent />
        </mesh>
      ))}
    </group>
  );
};

export default WelcomeZone;