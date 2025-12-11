"use client";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Model from "./_components/Model";
import { useEffect, useMemo, useState } from "react";
import Product from "./_components/Product";

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

  return (
    <main>
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
            <div
              className="flex flex-col items-center justify-center relative"
              onMouseMove={(e) => handleMouseMove(e, 0)}
              onMouseLeave={() => handleMouseLeave(0)}
            >
              <div className={`h-[20vh] w-full ${bgs[0]}`}></div>
              <Canvas style={{ width: "100%", height: "20vh", position: "absolute" }}>
                <ambientLight intensity={0.5} />
                <Environment
                  preset="park"
                />
                <Product shape="Cube" color={colors[0]} args={[3, 3, 3]} mouseX={mousePosition.index == 0 ? mousePosition.x : 0} mouseY={mousePosition.index == 0 ? mousePosition.y : 0} isHovering={isHovering == 0} />
              </Canvas>
            </div>
            <div
              className="flex flex-col items-center justify-center relative"
              onMouseMove={(e) => handleMouseMove(e, 1)}
              onMouseLeave={() => handleMouseLeave(1)}
            >
              <div className={`h-[20vh] w-full ${bgs[1]}`}></div>
              <Canvas style={{ width: "100%", height: "20vh", position: "absolute" }}>
                <ambientLight intensity={0.5} />
                <Environment
                  preset="park"
                />
                <Product shape="Tetrahedron" color={colors[1]} args={[3, 0]} mouseX={mousePosition.index == 1 ? mousePosition.x : 0} mouseY={mousePosition.index == 1 ? mousePosition.y : 0} isHovering={isHovering == 1} />
              </Canvas>
            </div>
            <div
              className="flex flex-col items-center justify-center relative"
              onMouseMove={(e) => handleMouseMove(e, 2)}
              onMouseLeave={() => handleMouseLeave(2)}
            >
              <div className={`h-[20vh] w-full ${bgs[2]}`}></div>
              <Canvas style={{ width: "100%", height: "20vh", position: "absolute" }}>
                <ambientLight intensity={0.5} />
                <Environment
                  preset="park"
                />
                <Product shape="Cylinder" color={colors[2]} args={[1.5, 1.5, 3, 32]} mouseX={mousePosition.index == 2 ? mousePosition.x : 0} mouseY={mousePosition.index == 2 ? mousePosition.y : 0} isHovering={isHovering == 2} />
              </Canvas>
            </div>
          </div>
        </section>

        {/* subscribe to our newsletter */}
        <section>
          <h2 className="text-4xl font-bold text-gray-700">Subscribe to our newsletter</h2>
        </section>
      </div>
    </main>
  );
}
