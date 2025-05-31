import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useRef, useState, type MutableRefObject } from "react";
import type * as THREE from "three";

const Model = () => {
  const mesh = useRef<THREE.Mesh>(null!);
  const [x, setX] = useState(1);
  const [y, setY] = useState(1);
  const [ascending, setAscending] = useState(true);

  useFrame(() => {
    if (x >= 10) {
      setAscending(false);
    }
    if (x <= 1) {
      setAscending(true);
    }
    mesh.current.rotation.x += 0.02;
    mesh.current.rotation.y += 0.02;

    if (ascending) {
      setX((prev) => prev + 0.05);
      setY((prev) => prev + 0.05);
    } else {
      setX((prev) => prev - 0.05);
      setY((prev) => prev - 0.05);
    }
  });
  return (
    <group>
      <Text
        position={[0, 0, -5]}
        fontSize={1.75}
        font="fonts/DelaGothicOne-Regular.ttf"
      >
        Discover your Taest
      </Text>

      <Sphere
        args={[3, x, y]}
        color="#008BDE"
        opacity={0.5}
        transparent={true}
        currentWidth={.75}
        mesh={mesh}
      />

    </group>
  );
};

type GeometryTypes = {
  args: [
    width?: number,
    height?: number,
    depth?: number,
    widthSegments?: number,
    heightSegments?: number,
    depthSegments?: number,
  ];
  color: string;
  opacity: number;
  transparent: boolean;
  currentWidth: number;
  mesh: MutableRefObject<THREE.Mesh>;
};

const Cube = ({ args, color, opacity, transparent, mesh, currentWidth }: GeometryTypes) => {
  return (
    <mesh ref={mesh}>
      <boxGeometry args={args} />
      <meshStandardMaterial
        color={color}
        opacity={opacity}
        transparent={transparent}
      />
    </mesh>
  );
};

const Sphere = ({ args, color, opacity, transparent, mesh, currentWidth }: GeometryTypes) => {
  return (
    <mesh ref={mesh} scale={currentWidth}>
      <sphereGeometry args={args} />
      <meshStandardMaterial
        color={color}
        opacity={opacity}
        transparent={transparent}
      />
    </mesh>
  );
};

export default Model;
