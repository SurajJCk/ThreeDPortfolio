import { Text } from '@react-three/drei';
import InteractiveObject from './InteractiveObject';
import portfolioData from '../../mock/portfolioData';

const ProjectsZone = () => {
  const zoneData = portfolioData.zones.projects;
  const projects = portfolioData.projects.filter(p => p.featured);

  return (
    <group position={zoneData.position}>
      {/* Ground platform */}
      <mesh receiveShadow position={[0, -0.5, 0]}>
        <boxGeometry args={[12, 1, 12]} />
        <meshStandardMaterial 
          color={zoneData.color}
          metalness={0.4}
          roughness={0.6}
        />
      </mesh>

      {/* Zone title */}
      <Text
        position={[0, 4, 0]}
        fontSize={1}
        color="#ffffff"
        anchorX="center"
      >
        {zoneData.name}
      </Text>

      {/* Project displays */}
      {projects.map((project, index) => {
        const angle = (index / projects.length) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <InteractiveObject
            key={project.id}
            position={[x, 1.5, z]}
            title={project.title}
            description={project.description}
            color="#f39c12"
            data={project}
            type="project"
          />
        );
      })}

      {/* Workshop tools (decorative) */}
      <mesh position={[-4, 0.5, 4]} castShadow>
        <torusGeometry args={[0.5, 0.2, 16, 32]} />
        <meshStandardMaterial color="#e74c3c" metalness={0.8} />
      </mesh>

      <mesh position={[4, 0.5, -4]} castShadow>
        <octahedronGeometry args={[0.6]} />
        <meshStandardMaterial color="#9b59b6" metalness={0.8} />
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

export default ProjectsZone;