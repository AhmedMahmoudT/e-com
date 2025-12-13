"use client";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Model from "./_components/Model";
import { useEffect, useState } from "react";
import ProductDetails from "./_components/Product";
import { AnimatePresence, motion } from "motion/react";

import { bgColor } from "~/utils/colors";

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, index: -1 });
  const [isHovering, setIsHovering] = useState(-1);
  const [colorIndex, setColorIndex] = useState(0);

  // Separate state for Model component
  const [modelMousePosition, setModelMousePosition] = useState({ x: 0, y: 0 });
  const [modelIsHovering, setModelIsHovering] = useState(false);

  const [scale, setScale] = useState(1);
  // detect screen size to set scale
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setScale(0.5);
    } else {
      setScale(1);
    }
  }, []);

  const handleClick = (index: number) => {
    setShapes((prev) => {
      return prev.map((shape, i) => {
        if (i === index) {
          return { ...shape, big: !shape.big, animating: true };
        }
        return { ...shape, big: false, animating: false };
      });
    });
  }

  const handleAnimationComplete = (index: number) => {
    setShapes((prev) => {
      return prev.map((shape, i) => {
        if (i === index) {
          return { ...shape, animating: false };
        }
        return shape;
      });
    });
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    setIsHovering(index);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Normalize to -1 to 1 range
    setMousePosition({
      x: (x - 0.5) * 2,
      y: (y - 0.5) * 2,
      index,
    });
  };

  const handleMouseLeave = (index: number) => {
    setMousePosition({ x: 0, y: 0, index });
    setIsHovering(-1);
  };

  // Event handlers for Model component
  const handleModelMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Normalize to -1 to 1 range
    setModelMousePosition({
      x: (x - 0.5) * 2,
      y: (y - 0.5) * 2,
    });
    setModelIsHovering(true);
  };

  const handleModelMouseLeave = () => {
    setModelMousePosition({ x: 0, y: 0 });
    setModelIsHovering(false);
  };

  type Shape = {
    shape: 'Cube' | 'Tetrahedron' | 'Cylinder' | 'Sphere' | 'Torus' | 'Pyramid';
    args: [number, number, number, number] | [number, number, number] | [number, number];
    big: boolean;
    animating: boolean;
    price: number;
    id: number;
    color: string;
  };


  const [shapes, setShapes] = useState<Shape[]>([
    { id: 0, shape: "Cube", args: [3, 3, 3], big: false, color: '#008BDE', animating: false, price: 2500 },
    { id: 1, shape: "Tetrahedron", args: [3, 0], big: false, color: '#DE0088', animating: false, price: 3000 },
    { id: 2, shape: "Cylinder", args: [1.5, 1.5, 3, 32], big: false, color: '#00DE88', animating: false, price: 1750 },
    { id: 3, shape: "Sphere", args: [2.5, 12, 12], big: false, color: '#ffac1c', animating: false, price: 4000 },
    { id: 4, shape: "Torus", args: [2, 1, 32, 32], big: false, color: '#280cc7', animating: false, price: 4500 },
    { id: 5, shape: "Pyramid", args: [3, 3, 4, 3], big: false, color: '#c70a23', animating: false, price: 3000 }
  ])


  useEffect(() => {
    setTimeout(() => {
      if (colorIndex >= shapes.length - 1) {
        setColorIndex(0);
      } else {
        setColorIndex(colorIndex + 1);
      }
    }, 3000);
  }, [colorIndex, shapes])

  return (
    <main>
      {/* Black overlay background */}
      <AnimatePresence>
        {shapes.some(shape => shape.big) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              const expandedIndex = shapes.findIndex(shape => shape.big);
              if (expandedIndex !== -1) {
                handleClick(expandedIndex);
              }
            }}
            className="fixed inset-0 bg-black z-[0]"
            style={{ cursor: 'pointer', zIndex: 1 }}
          />
        )}
      </AnimatePresence>

      <div
        className={`h-[70vh]`}
        onMouseMove={handleModelMouseMove}
        onMouseLeave={handleModelMouseLeave}
      >
        <div
          className={`absolute top-0 -z-10 h-[75vh] w-full ${bgColor(shapes[colorIndex]?.color)}`}
        />
        <Canvas style={{ width: "100vw", height: "60vh", position: "absolute", top: "10vh" }}>
          <ambientLight intensity={0.5} />
          <Environment
            preset="park"
          />
          <Model scale={scale} color={shapes[colorIndex]?.color} mouseX={modelMousePosition.x} isHovering={modelIsHovering} />
        </Canvas>
      </div>

      <div className="flex flex-col mx-[10vw] gap-10 mb-24 border border-gray-700 rounded-lg p-8">
        {/* Our Collections */}
        <section>
          <h2 className="text-4xl font-bold text-gray-700">Our Collections</h2>
          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">

            {shapes.map((shape) => (
              <ProductDetails
                scale={scale}
                key={shape.id}
                index={shape.id}
                color={shape.color}
                isHovering={isHovering === shape.id}
                mousePosition={mousePosition}
                handleClick={handleClick}
                handleAnimationComplete={handleAnimationComplete}
                handleMouseMove={handleMouseMove}
                handleMouseLeave={handleMouseLeave}
                shape={shape}
              />
            ))}
          </div>
        </section>

        {/* subscribe to our newsletter */}
        {/* <section>
          <h2 className="text-4xl font-bold text-gray-700">Subscribe to our newsletter</h2>
          <form action="">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </section> */}
      </div>
    </main>
  );
}
