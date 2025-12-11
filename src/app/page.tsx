"use client";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Model from "./_components/Model";
import { useEffect, useMemo, useState } from "react";
import Product from "./_components/Product";
import { AnimatePresence, motion } from "motion/react";

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, index: -1 });
  const [isHovering, setIsHovering] = useState(-1);
  const [colorIndex, setColorIndex] = useState(0);

  const bgs = useMemo(() => {
    return [
      "bg-[#008BDE]",
      "bg-[#DE0088]",
      "bg-[#00DE88]",
    ];
  }, []);

  const colors = [
    "#008BDE",
    "#DE0088",
    "#00DE88",
  ];

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
    switch (index) {
      case 0:
        setMousePosition({ x: 0, y: 0, index });
        setIsHovering(0);
        break;
      case 1:
        setMousePosition({ x: 0, y: 0, index });
        setIsHovering(1);
        break;
      case 2:
        setMousePosition({ x: 0, y: 0, index });
        setIsHovering(2);
        break;
    }
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

  useEffect(() => {
    setTimeout(() => {
      if (colorIndex >= bgs.length - 1) {
        setColorIndex(0);
      } else {
        setColorIndex(colorIndex + 1);
      }
    }, 3000);
  }, [colorIndex, bgs])

  type Shape = {
    shape: 'Cube' | 'Tetrahedron' | 'Cylinder';
    args: [number, number, number, number] | [number, number, number] | [number, number];
    big: boolean;
    animating: boolean;
    price: number;
  };

  const [Shapes, setShapes] = useState<Shape[]>([
    { shape: "Cube", args: [3, 3, 3], big: false, animating: false, price: 2500 },
    { shape: "Tetrahedron", args: [3, 0], big: false, animating: false, price: 3000 },
    { shape: "Cylinder", args: [1.5, 1.5, 3, 32], big: false, animating: false, price: 1750 }
  ])

  return (
    <main>
      {/* Black overlay background */}
      <AnimatePresence>
        {Shapes.some(shape => shape.big) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              const expandedIndex = Shapes.findIndex(shape => shape.big);
              if (expandedIndex !== -1) {
                handleClick(expandedIndex);
              }
            }}
            className="fixed inset-0 bg-black z-[0]"
            style={{ cursor: 'pointer' }}
          />
        )}
      </AnimatePresence>

      <div
        className="h-[70vh]"
        onMouseMove={handleModelMouseMove}
        onMouseLeave={handleModelMouseLeave}
      >
        <div
          className={`absolute top-0 -z-10 h-[75vh] w-full ${bgs[colorIndex]}`}
        />
        <Canvas style={{ width: "100vw", height: "60vh", position: "absolute", top: "10vh" }}>
          <ambientLight intensity={0.5} />
          <Environment
            preset="park"
          />
          <Model color={colors[colorIndex]} mouseX={modelMousePosition.x} isHovering={modelIsHovering} />
        </Canvas>
      </div>

      <div className="flex flex-col mx-[10vw] gap-10 mb-24 border border-gray-700 rounded-lg p-8">
        {/* Our Collections */}
        <section>
          <h2 className="text-4xl font-bold text-gray-700">Our Collections</h2>
          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">

            {Shapes.map((shape, index) => (
              <div
                onClick={() => handleClick(index)}
                key={index}
                className="flex flex-col items-center justify-center relative"
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                {/* Details */}
                <AnimatePresence>
                  {shape.big && <motion.div
                    initial={{
                      top: "50%",
                      left: "50%",
                      transform: "translate(0%, -50%)",
                      position: "fixed",
                      zIndex: 1,
                      width: "60vh",
                      height: "60vh",
                    }}
                    animate={{
                      top: "50%",
                      left: "50%",
                      transform: "translate(-100%, -50%)",
                      position: "fixed",
                      zIndex: 1,
                      width: "60vh",
                      height: "60vh",
                    }}
                    transition={{
                      top: { duration: 0 },
                      left: { duration: 0 },
                      width: { duration: 0 },
                      height: { duration: 0 },
                      position: { duration: 0 },
                      transform: { duration: .5, type:"spring", stiffness: 50 },
                      default: { duration: .5, ease: "easeInOut" }
                    }}
                    onAnimationComplete={() => handleAnimationComplete(index)}
                    className={`bg-white flex flex-col items-center justify-center gap-10 p-20`}
                  >
                    <div className="w-full flex gap-12">
                      <p className="font-bold">{shape.shape}</p>
                      <p>{shape.price} ¤</p>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi a porro, repellendus ab fugiat placeat laboriosam iusto similique possimus veniam.</p>
                    <button className={`${bgs[index]} text-white py-3 px-6`}>Add To Cart</button>  
                  </motion.div>}
                </AnimatePresence>
                {/* Shape Background */}
                <motion.div
                  initial={{ height: "20vh", width: "100%" }}
                  animate={{
                    top: shape.big ? "50%" : "0",
                    left: shape.big ? "50%" : "0",
                    transform: shape.big ? "translate(0%, -50%)" : "translate(0, 0)",
                    position: shape.big ? "fixed" : "relative",
                    zIndex: shape.big ? 1 : 0,
                    width: shape.big ? "60vh" : "100%",
                    height: shape.big ? "60vh" : "20vh",
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
                  className={`${bgs[index]}`}
                />
                <Canvas
                  style={{
                    width: shape.big ? "60vh" : "100%",
                    height: shape.big ? "60vh" : "20vh",
                    position: shape.big ? "fixed" : "absolute",
                    zIndex: shape.big ? 2 : 0,
                    top: shape.big ? "50%" : "0",
                    left: shape.big ? "50%" : "0",
                    transform: shape.big ? "translate(0%, -50%)" : "translate(0, 0)",
                    pointerEvents: "none",
                    opacity: shape.animating ? 0 : 1,
                    transition: "opacity 0"
                  }}
                >
                  <ambientLight intensity={0.5} />
                  <Environment preset="park" />
                  <Product
                    shape={shape.shape}
                    color={colors[index]}
                    args={shape.args}
                    mouseX={mousePosition.index == index ? mousePosition.x : 0}
                    mouseY={mousePosition.index == index ? mousePosition.y : 0}
                    isHovering={isHovering == index}
                  />
                </Canvas>
              </div>
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
