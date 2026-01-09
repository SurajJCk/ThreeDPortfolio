import { Text } from '@react-three/drei';
import InteractiveObject from './InteractiveObject';
import portfolioData from '../../mock/portfolioData';

const ConnectZone = () => {
  const zoneData = portfolioData.zones.connect;
  const { personal } = portfolioData;

  const socialLinks = [
    { title: 'LinkedIn', color: '#0077b5', url: personal.linkedIn },
    { title: 'YouTube', color: '#ff0000', url: personal.youtube },
    { title: 'Email', color: '#34a853', url: `mailto:${personal.email}` }
  ];

  return (
    <group position={zoneData.position}>
      {/* Ground platform */}
      <mesh receiveShadow position={[0, -0.5, 0]}>
        <cylinderGeometry args={[6, 8, 1, 6]} />
        <meshStandardMaterial 
          color={zoneData.color}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Zone title */}
      <Text
        position={[0, 4, 0]}
        fontSize={1}
        color="#ffffff"
        anchorX="center"
        outlineWidth={0.05}
        outlineColor="#000000"
      >
        {zoneData.name}
      </Text>

      {/* Social connection nodes */}
      {socialLinks.map((link, index) => {
        const angle = (index / socialLinks.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <InteractiveObject
            key={link.title}
            position={[x, 1.5, z]}
            title={link.title}
            description={`Connect on ${link.title}`}
            color={link.color}
            data={link}
            type="social"
          />
        );
      })}

      {/* Connection lines (visual effect) */}
      {socialLinks.map((_, index) => {
        const angle = (index / socialLinks.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <mesh key={`line-${index}`} position={[x / 2, 1, z / 2]}>
            <cylinderGeometry args={[0.05, 0.05, 3, 8]} />
            <meshStandardMaterial 
              color="#ffffff" 
              emissive="#2ecc71"
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}

      {/* Central hub */}
      <mesh position={[0, 1, 0]} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color="#ffffff"
          emissive={zoneData.color}
          emissiveIntensity={0.5}
          metalness={0.8}
        />
      </mesh>

      {/* Ambient glow */}
      <pointLight
        position={[0, 3, 0]}
        intensity={1.5}
        distance={15}
        color={zoneData.color}
      />
    </group>
  );
};

export default ConnectZone;