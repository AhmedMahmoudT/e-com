"use client";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Model from "./_components/Model";

export default function HomePage() {
  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center overflow-hidden">
      <Image
        src={"/cloudless.png"}
        alt=""
        width={4016}
        height={540}
        className="absolute top-0 -z-10 h-[50vh] w-[100vw]"
      />
      <Canvas style={{ width: "50vw", height: "25vh", position: "absolute", top:200 }}>
        <ambientLight intensity={0.5} />
        <Environment 
        preset="park"
        />
        <Model />
      </Canvas>
    </main>
  );
}
