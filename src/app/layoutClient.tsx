"use client"
import React from "react"
import Navbar, { NavbarMobile } from "./_components/Navbar"

const LayoutClient = ({
    children,
  }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
        <div className="block lg:hidden">
          <NavbarMobile />
        </div>
        <div className="hidden lg:block">
          <Navbar />
        </div>
        <div>{children}</div>
    </div>
  )
}

export default LayoutClient