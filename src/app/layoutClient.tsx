"use client"
import React from "react"
import Navbar from "./components/Navbar"

const LayoutClient = ({
    children,
  }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex flex-col items-center">
        <Navbar />
        <div>{children}</div>
    </div>
  )
}

export default LayoutClient