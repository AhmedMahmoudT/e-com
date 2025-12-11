import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useRef, useState, type MutableRefObject } from "react";
import type * as THREE from "three";

type ModelProps = {
  mouseX: number;
  isHovering: boolean;
  color: string | undefined;
};

const Model = ({ mouseX, isHovering, color }: ModelProps) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const [x, setX] = useState(1);
  const [y, setY] = useState(1);
  const [ascending, setAscending] = useState(true);

  useFrame(() => {
    mesh.current.rotation.x += 0.02;
    mesh.current.rotation.y += 0.02;

    if (isHovering) {
      // When hovering, control x/y based on cursor position
      // mouseX ranges from -1 (left) to 1 (right)
      // Map it to a target value between 1 and 10
      const targetValue = 1 + (mouseX + 1) * 4.5; // Maps -1..1 to 1..10

      // Smoothly interpolate towards target
      setX((prev) => prev + (targetValue - prev) * 0.5);
      setY((prev) => prev + (targetValue - prev) * 0.5);
    } else {
      // Default animation when not hovering
      if (x >= 10) {
        setAscending(false);
      }
      if (x <= 1) {
        setAscending(true);
      }

      if (ascending) {
        setX((prev) => prev + 0.05);
        setY((prev) => prev + 0.05);
      } else {
        setX((prev) => prev - 0.05);
        setY((prev) => prev - 0.05);
      }
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
        color={color ?? "#008BDE"}
        opacity={0.5}
        transparent={true}
        currentWidth={.75}
        mesh={mesh}
      />

    </group>
  );
};

type SphereCubeTypes = {
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

type TetrahedronTypes = {
    args: [
        radius?: number,
        detail?: number,
    ];
    color: string;
    opacity: number;
    transparent: boolean;
    currentWidth: number;
    mesh: MutableRefObject<THREE.Mesh>;
};

type CylinderTypes = {
    args: [
        radiusTop?: number,
        radiusBottom?: number,
        height?: number,
        radialSegments?: number,
    ];
    color: string;
    opacity: number;
    transparent: boolean;
    currentWidth: number;
    mesh: MutableRefObject<THREE.Mesh>;
};

export const Sphere = ({ args, color, opacity, transparent, mesh, currentWidth }: SphereCubeTypes) => {
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

export const Cube = ({ args, color, opacity, transparent, mesh, currentWidth }: SphereCubeTypes) => {
  return (
    <mesh ref={mesh} scale={currentWidth}>
      <boxGeometry args={args} />
      <meshStandardMaterial
        color={color}
        opacity={opacity}
        transparent={transparent}
      />
    </mesh>
  );
};

export const Tetrahedron = ({ args, color, opacity, transparent, mesh, currentWidth }: TetrahedronTypes) => {
    return (
        <mesh ref={mesh} scale={currentWidth}>
            <tetrahedronGeometry args={args} />
            <meshStandardMaterial
                color={color}
                opacity={opacity}
                transparent={transparent}
            />
        </mesh>
    );
};

export const Cylinder = ({ args, color, opacity, transparent, mesh, currentWidth }: CylinderTypes) => {
    return (
        <mesh ref={mesh} scale={currentWidth}>
            <cylinderGeometry args={args} />
            <meshStandardMaterial
                color={color}
                opacity={opacity}
                transparent={transparent}
            />
        </mesh>
    );
};

export default Model;
