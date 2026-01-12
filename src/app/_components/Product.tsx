import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Text } from "@react-three/drei";
import { useRef } from "react";
import { useCart } from "~/contexts/CartContext";
import type * as THREE from "three";
import { Cube, Cylinder, Pyramid, Sphere, Tetrahedron, Torus } from "./Model";
import { AnimatePresence, motion } from "motion/react";
import {
    PiCheckFatDuotone
} from "react-icons/pi";
import { bgColor, borderColor, hoverColor, textColor } from "~/utils/colors";
import { type ShapeType } from "~/data/products";

type ProductProps = {
    mouseX: number;
    mouseY: number;
    isHovering: boolean;
    shape: ShapeType;
    color: string | undefined;
    args: [number, number, number, number] | [number, number, number] | [number, number];
};

export const Product = ({ mouseX, mouseY, isHovering, shape, color, args }: ProductProps) => {
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

    if (shape === 'Artifact') return null; // Artifacts handled by SpecialProduct component

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
        edges: true
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

type ProductDetailsProps = {
    mousePosition: { x: number; y: number; index: number };
    isHovering: boolean;
    color: string;
    shape: { id: number; animating: boolean; big: boolean; shape: ShapeType; price: number; name: string, args: [number, number, number, number] | [number, number, number] | [number, number] };
    handleClick: (index: number) => void;
    handleAnimationComplete: (index: number) => void;
    handleMouseMove: (e: React.MouseEvent<HTMLDivElement>, index: number) => void;
    handleTouchMove: (e: React.TouchEvent<HTMLDivElement>, index: number) => void;
    handleMouseLeave: (index: number) => void;
    handleTouchEnd: (index: number) => void;
    currentWidth: number;
    index: number;
};

const ProductDetails = ({ mousePosition, isHovering, color, shape, handleClick, handleAnimationComplete, handleMouseMove, handleTouchMove, handleMouseLeave, handleTouchEnd, currentWidth, index }: ProductDetailsProps) => {
    const { addItem, updateQuantity, items } = useCart();

    const addToCart = () => {
        addItem({
            id: shape.id.toString(),
            shape: shape.shape,
            price: shape.price,
            name: shape.name,
            color: color,
        });
    }

    return (
        <div
            onClick={() => !shape.big && handleClick(index)}
            className="flex flex-col items-center justify-center relative"
        >
            {/* Details */}
            <AnimatePresence>
                {shape.big && <motion.div
                    initial={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        position: "fixed",
                        zIndex: 1,
                        width: shape.big ? (currentWidth < 640 ? "25em" : currentWidth < 750 ? "30em" : "30em") : (currentWidth < 640 ? "calc(10em + 40vw)" : currentWidth < 750 ? "20em" : "23em"),
                        height: "16em"
                    }}
                    animate={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, 39%)",
                        position: "fixed",
                        zIndex: 1,
                        width: shape.big ? (currentWidth < 640 ? "25em" : currentWidth < 750 ? "30em" : "30em") : (currentWidth < 640 ? "calc(10em + 40vw)" : currentWidth < 750 ? "20em" : "23em"),
                        height: "16em"
                    }}
                    transition={{
                        top: { duration: 0 },
                        left: { duration: 0 },
                        width: { duration: 0 },
                        height: { duration: 0 },
                        position: { duration: 0 },
                        transform: { duration: .5, type: "spring", stiffness: 50 },
                        default: { duration: .5, ease: "easeInOut" }
                    }}
                    onAnimationComplete={() => handleAnimationComplete(index)}
                    className={`bg-white flex flex-col gap-[1em] p-[2em] text-justify items-center justify-center`}
                >
                    <div className="w-full flex gap-12">
                        <p className="font-bold">{shape.name}</p>
                        <p>{shape.price} ¤</p>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi a porro, repellendus ab fugiat placeat laboriosam iusto similique possimus veniam.</p>
                    <div className="flex w-full justify-between">
                        <motion.button initial={{ width: 120, height: 48 }} whileTap={{ scale: 0.9 }}
                            onClick={addToCart} className={`${hoverColor(color)} hover:text-white border ${textColor(color)} ${borderColor(color)} flex items-center justify-center transition-all`}>
                            <AnimatePresence>
                                {!items.some(item => item.id === shape.id.toString()) && <motion.div initial={{ width: 0 }} animate={{ width: 88, transition: { delay: .25 } }} exit={{ width: 0 }} className="text-nowrap text-center overflow-hidden">
                                    Add To Cart
                                </motion.div>}
                            </AnimatePresence>
                            <AnimatePresence>
                                {items.some(item => item.id === shape.id.toString()) && <motion.div initial={{ width: 0 }} animate={{ width: 88, transition: { delay: .25 } }} exit={{ width: 0 }} className="flex items-center justify-between text-2xl overflow-hidden">
                                    <span className="text-base">Added</span> <PiCheckFatDuotone />
                                </motion.div>}
                            </AnimatePresence>
                        </motion.button>
                        <AnimatePresence>
                            {items.some(item => item.id === shape.id.toString()) && <motion.div initial={{ width: 0 }} animate={{ width: 100, transition: { delay: .25 } }} exit={{ width: 0 }} className={`${textColor(color)} flex items-center justify-between text-2xl overflow-hidden`}>
                                <button onClick={() => updateQuantity(shape.id.toString(), (items.find(item => item.id === shape.id.toString())?.quantity ?? 0) - 1)}>-</button>
                                <span>{items.find(item => item.id === shape.id.toString())?.quantity}</span>
                                <button onClick={() => updateQuantity(shape.id.toString(), (items.find(item => item.id === shape.id.toString())?.quantity ?? 0) + 1)}>+</button>
                            </motion.div>}
                        </AnimatePresence>
                    </div>
                </motion.div>}
            </AnimatePresence>
            {/* Shape Background */}
            <motion.div
                onMouseMove={(e) => handleMouseMove(e, index)}
                onTouchMove={(e) => shape.big && handleTouchMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
                onTouchEnd={() => shape.big && handleTouchEnd(index)}
                initial={{ height: "20vh", width: "100%" }}
                animate={{
                    top: shape.big ? "50%" : "0",
                    left: shape.big ? "50%" : "0",
                    transform: shape.big ? "translate(-50%, -75%)" : "translate(0, 0)",
                    position: shape.big ? "fixed" : "relative",
                    zIndex: shape.big ? 1 : 0,
                    width: shape.big ? (currentWidth < 640 ? "25em" : currentWidth < 750 ? "30em" : "30em") : (currentWidth < 640 ? "calc(10em + 40vw)" : currentWidth < 750 ? "20em" : "23em"),
                    height: shape.big ? (currentWidth < 640 ? "25em" : currentWidth < 750 ? "30em" : "30em") : (currentWidth < 640 ? "calc(10em + 10vw)" : "15em"),
                }}
                transition={{
                    top: { duration: 0 },
                    left: { duration: 0 },
                    width: { duration: 0 },
                    height: { duration: 0 },
                    position: { duration: 0 },
                    transform: { duration: 0 },
                    default: { duration: .5, ease: "easeInOut" }
                }}
                onAnimationComplete={() => handleAnimationComplete(index)}
                className={`${bgColor(color)} ${shape.big ? "touch-none" : ""}`}
            />
            <Canvas
                style={{
                    width: shape.big ? (currentWidth < 640 ? "25em" : currentWidth < 750 ? "30em" : "30em") : (currentWidth < 640 ? "calc(10em + 40vw)" : currentWidth < 750 ? "20em" : "23em"),
                    height: shape.big ? (currentWidth < 640 ? "25em" : currentWidth < 750 ? "30em" : "30em") : (currentWidth < 640 ? "calc(10em + 10vw)" : "15em"),
                    position: shape.big ? "fixed" : "absolute",
                    zIndex: shape.big ? 2 : 0,
                    top: shape.big ? "50%" : "0",
                    left: "50%",
                    transform: shape.big ? "translate(-50%, -75%)" : "translate(-50%, 0)",
                    pointerEvents: "none",
                    opacity: shape.animating ? 0 : 1,
                    transition: "opacity 0"
                }}
            >
                <ambientLight intensity={0.5} />
                <Environment preset="park" />
                <Product
                    shape={shape.shape}
                    color={color}
                    args={shape.args}
                    mouseX={mousePosition.index == index ? mousePosition.x : 0}
                    mouseY={mousePosition.index == index ? mousePosition.y : 0}
                    isHovering={isHovering}
                />
            </Canvas>
        </div>
    );
};

export default ProductDetails;
