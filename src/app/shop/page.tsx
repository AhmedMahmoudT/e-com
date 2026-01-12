"use client";

import { useEffect, useState } from "react";
import ProductDetails from "../_components/Product";
import { AnimatePresence, motion } from "motion/react";
import { INITIAL_SHAPES, ARTIFACTS, type ProductShape } from "~/data/products";
import SpecialProduct from "../_components/SpecialProduct";

export default function ShopPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, index: -1 });
  const [isHovering, setIsHovering] = useState(-1);
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

  const [shapes, setShapes] = useState<ProductShape[]>(INITIAL_SHAPES.map(s => ({ ...s, big: false, animating: false })));

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

  return (
    <main className="min-h-screen pt-24 pb-12">
      {/* Black overlay background when a shape is expanded */}
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
            className="fixed inset-0 bg-black z-[1]"
            style={{ cursor: 'pointer' }}
          />
        )}
      </AnimatePresence>

      <div className={`mx-auto flex flex-col ${currentWidth < 360 ? 'w-[21em]' : currentWidth < 420 ? 'w-[24em]' : currentWidth < 500 ? 'w-[27em]' : currentWidth < 600 ? 'w-[30em]' : currentWidth < 640 ? 'w-[31em]' : currentWidth < 750 ? 'w-[44em]' : currentWidth < 1140 ? 'w-[50em]' : 'w-[75em]'} border border-gray-700 px-[1em] py-[1.5em]`}>
        <section id="collections">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-bold text-[1.8em] text-gray-700 uppercase tracking-widest px-2">Shop All</h1>
            <p className="text-sm text-gray-400 uppercase tracking-widest">{shapes.length + ARTIFACTS.length} Products</p>
          </div>
          <div className={`grid ${currentWidth < 640 ? 'grid-cols-1' : currentWidth < 1140 ? 'grid-cols-2' : 'grid-cols-3'} gap-[1em]`}>
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
        <section id="vault" className="mt-[4em]">
          <div className="flex flex-col mb-12">
            <h2 className="font-bold text-[2em] text-black uppercase tracking-[0.2em]">The Artifact Vault</h2>
            <div className="h-[1px] w-24 bg-black mt-4" />
            <p className="mt-6 text-gray-500 max-w-xl">
              Our most complex digital geometries. Each artifact is a unique procedural sculpture designed for the modern aesthetic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ARTIFACTS.map((artifact) => (
              <SpecialProduct
                key={artifact.id}
                product={artifact}
                currentWidth={currentWidth}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}