import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useRef } from "react";
import type * as THREE from "three";
import { Cube, Cylinder, Pyramid, Sphere, Tetrahedron, Torus } from "./Model";

type ProductProps = {
    mouseX: number;
    mouseY: number;
    isHovering: boolean;
    shape: 'Cube' | 'Tetrahedron' | 'Cylinder' | 'Sphere' | 'Torus' | 'Pyramid';
    color: string | undefined;
    args: [number, number, number, number] | [number, number, number] | [number, number];
};

const Product = ({ mouseX, mouseY, isHovering, shape, color, args }: ProductProps) => {
    const mesh = useRef<THREE.Mesh>(null!);

    useFrame(() => {
        if (isHovering) {
            // Smoothly interpolate rotation based on mouse position when hovering
            const targetRotationY = mouseX * Math.PI;
            const targetRotationX = mouseY * Math.PI;

            mesh.current.rotation.y += (targetRotationY - mesh.current.rotation.y) * 0.1;
            mesh.current.rotation.x += (targetRotationX - mesh.current.rotation.x) * 0.1;
        } else {
            // Default auto-rotation when not hovering
            mesh.current.rotation.x += 0.01;
            mesh.current.rotation.y += 0.01;
        }
    });

    const cubeArgs = args as [number, number, number];
    const tetrahedronArgs = args as [number, number];
    const cylinderArgs = args as [number, number, number, number];

    const cubeSphereProps = {
        args: cubeArgs,
        color: color ?? '#008BDE',
        opacity: 0.5,
        transparent: true,
        currentWidth: 1,
        mesh,
        edges:true
    };

    const tetrahedronProps = {
        args: tetrahedronArgs,
        color: color ?? '#DE0088',
        opacity: 0.5,
        transparent: true,
        currentWidth: 1,
        mesh,
    };

    const cylinderProps = {
        args: cylinderArgs,
        color: color ?? '#00DE88',
        opacity: 0.5,
        transparent: true,
        currentWidth: 1,
        mesh,
    };

    return (
        <group>
            <Text
                position={[0, 0, -5]}
                fontSize={1.75}
                font="fonts/DelaGothicOne-Regular.ttf"
            >
                {shape}
            </Text>

            {shape === 'Cube' && <Cube {...cubeSphereProps} />}
            {shape === 'Sphere' && <Sphere {...cubeSphereProps} />}
            {shape === 'Tetrahedron' && <Tetrahedron {...tetrahedronProps} />}
            {shape === 'Cylinder' && <Cylinder {...cylinderProps} />}
            {shape === 'Torus' && <Torus {...cylinderProps} />}
            {shape === 'Pyramid' && <Pyramid {...cubeSphereProps} />}

        </group>
    );
};

export default Product;
