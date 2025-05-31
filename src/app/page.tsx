"use client";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Model from "./_components/Model";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <Image
        src={"/cloudless.png"}
        alt=""
        width={4016}
        height={540}
        className="absolute top-0 -z-10 h-screen w-full"
      />
      <Canvas style={{ width: "100vw", height: "60vh", marginBottom: "10rem" }}>
        <ambientLight intensity={0.5} />
        <Environment 
        preset="park"
        />
        <Model />
      </Canvas>
      <p>Hello</p>
    </main>
  );
}
