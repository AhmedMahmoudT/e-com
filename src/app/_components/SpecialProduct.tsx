"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useRef, useState, Suspense } from "react";
import { useCart } from "~/contexts/CartContext";
import type * as THREE from "three";
import { Artifact } from "./Model";
import { PiCheckFatDuotone, PiPlusCircleDuotone } from "react-icons/pi";
import { bgColor } from "~/utils/colors";
import { type ProductShape } from "~/data/products";

type SpecialProductProps = {
    product: ProductShape;
    currentWidth: number;
};

const SpecialProductModel = ({ modelPath, isHovering, mouseX, mouseY, scale = 1 }: { modelPath: string; isHovering: boolean; mouseX: number; mouseY: number; scale?: number }) => {
    const mesh = useRef<THREE.Group>(null!);

    useFrame((state) => {
        if (isHovering) {
            // Smoothly interpolate rotation based on mouse position
            // Match Essentials sensitivity: mouseX * Math.PI
            const targetRotationY = mouseX * Math.PI;
            const targetRotationX = mouseY * Math.PI;

            mesh.current.rotation.y += (targetRotationY - mesh.current.rotation.y) * 0.1;
            mesh.current.rotation.x += (targetRotationX - mesh.current.rotation.x) * 0.1;
        } else {
            // Default auto-rotation (Essentials matching)
            mesh.current.rotation.y += 0.01;
            mesh.current.rotation.x += 0.005;
        }
        // Subtle floating animation
        mesh.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
    });

    return (
        <Artifact
            modelPath={modelPath}
            mesh={mesh}
            scale={scale}
        />
    );
};

export const SpecialProduct = ({ product }: SpecialProductProps) => {
    const { addItem, items } = useCart();
    const [isHovering, setIsHovering] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        setMousePosition({ x, y });
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
    };

    const addToCart = () => {
        addItem({
            id: product.id.toString(),
            shape: product.shape,
            name: product.name,
            price: product.price,
            color: product.color,
        });
    };

    const isInCart = items.some(item => item.id === product.id.toString());

    return (
        <div
            className="group relative flex flex-col overflow-hidden border border-gray-800 bg-black transition-all hover:border-gray-400"
            onMouseEnter={() => setIsHovering(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative h-[25em] w-full overflow-hidden">
                <div className={`absolute inset-0 opacity-20 transition-opacity group-hover:opacity-40 ${bgColor(product.color)}`} />
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <Suspense fallback={null}>
                        <SpecialProductModel
                            modelPath={product.modelPath!}
                            isHovering={isHovering}
                            mouseX={mousePosition.x}
                            mouseY={mousePosition.y}
                            scale={product.scale}
                        />
                        <Environment preset="city" />
                    </Suspense>
                </Canvas>

                {/* Premium Tag */}
                <div className="absolute left-4 top-4 bg-white/10 px-3 py-1 text-[0.7em] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                    Premium Artifact
                </div>
            </div>

            <div className="flex flex-col p-6 h-[34vh]">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold tracking-tight text-white">{product.name}</h3>
                        <p className="text-sm text-gray-500 uppercase tracking-widest">{product.shape}</p>
                    </div>
                    <p className="text-lg font-bold text-white">{product.price} ¤</p>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-gray-400">
                    {product.description}
                </p>

                <div className="absolute right-0 bottom-6 w-full flex items-center justify-center">
                    <div className="mt-8 flex gap-4 w-[80%]">
                    <button
                        onClick={addToCart}
                        disabled={isInCart}
                        className={`flex flex-1 items-center justify-center gap-2 py-3 text-sm font-bold uppercase tracking-widest transition-all ${isInCart
                            ? 'bg-gray-800 text-gray-400 cursor-default'
                            : `bg-white text-black hover:bg-gray-200`
                            }`}
                    >
                        {isInCart ? (
                            <>
                                <PiCheckFatDuotone className="text-lg" />
                                Added to Vault
                            </>
                        ) : (
                            <>
                                <PiPlusCircleDuotone className="text-lg" />
                                Acquire Artifact
                            </>
                        )}
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecialProduct;
