"use client";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Model from "./_components/Model";
import { useEffect, useState } from "react";
import ProductDetails from "./_components/Product";
import { AnimatePresence, motion } from "motion/react";

import { bgColor } from "~/utils/colors";
import { INITIAL_SHAPES, type ProductShape } from "~/data/products";
import Link from "next/link";

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, index: -1 });
  const [isHovering, setIsHovering] = useState(-1);
  const [colorIndex, setColorIndex] = useState(0);

  const [currentWidth, setCurrentWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setCurrentWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Separate state for Model component
  const [modelMousePosition, setModelMousePosition] = useState({ x: 0, y: 0 });
  const [modelIsHovering, setModelIsHovering] = useState(false);

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

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>, index: number) => {
    if (!e.touches[0]) return;
    setIsHovering(index);
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = (touch.clientX - rect.left) / rect.width;
    const y = (touch.clientY - rect.top) / rect.height;

    setMousePosition({
      x: (x - 0.5) * 2,
      y: (y - 0.5) * 2,
      index,
    });
  };

  const handleModelMouseLeave = () => {
    setModelMousePosition({ x: 0, y: 0 });
    setModelIsHovering(false);
  };

  const [shapes, setShapes] = useState<ProductShape[]>(INITIAL_SHAPES);


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
    <main className="">
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
        className={`h-[18em] sm:h-[25em] lg:h-[35em] xl:h-[42em]`}
        onMouseMove={handleModelMouseMove}
        onMouseLeave={handleModelMouseLeave}
        onTouchEnd={handleModelMouseLeave}
      >
        <div
          className={`absolute top-0 -z-10 min-h-[25em] sm:min-h-[32em] lg:min-h-[39em] xl:min-h-[46em] w-full ${bgColor(shapes[colorIndex]?.color)}`}
        />
        <Canvas style={{ width: "100vw", height: currentWidth < 640 ? "16em" : currentWidth < 1024 ? "23em" : currentWidth < 1280 ? "30em" : "37em", position: "absolute", top: "8em" }}>
          <ambientLight intensity={0.5} />
          <Environment
            preset="park"
          />
          <Model color={shapes[colorIndex]?.color} mouseX={modelMousePosition.x} isHovering={modelIsHovering} />
        </Canvas>
      </div>

      <div className={`mx-auto flex flex-col ${currentWidth < 360 ? 'w-[21em]' : currentWidth < 420 ? 'w-[24em]' : currentWidth < 500 ? 'w-[27em]' : currentWidth < 600 ? 'w-[30em]' : currentWidth < 640 ? 'w-[31em]' : currentWidth < 750 ? 'w-[44em]' : currentWidth < 1140 ? 'w-[50em]' : 'w-[75em]'} mb-[2em] border border-gray-700 px-[1em] py-[1.5em]`}>
        {/* Our Collections */}
        <section>
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-[1.4em] text-gray-700 uppercase tracking-widest">Our Collections</h2>
            <Link href="/shop" className="text-sm font-bold text-gray-400 hover:text-black transition-colors uppercase tracking-widest px-2 border border-gray-200 hover:border-black py-1">View All</Link>
          </div>
          <div className={`mt-[2em] grid ${currentWidth < 640 ? 'grid-cols-1' : currentWidth < 1140 ? 'grid-cols-2' : 'grid-cols-3'} gap-[1em]`}>

            {shapes.map((shape) => (
              <ProductDetails
                currentWidth={currentWidth}
                key={shape.id}
                index={shape.id}
                color={shape.color}
                isHovering={isHovering === shape.id}
                mousePosition={mousePosition}
                handleClick={handleClick}
                handleAnimationComplete={handleAnimationComplete}
                handleMouseMove={handleMouseMove}
                handleTouchMove={handleTouchMove}
                handleMouseLeave={handleMouseLeave}
                handleTouchEnd={handleMouseLeave}
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
