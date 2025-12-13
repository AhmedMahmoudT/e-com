"use client"
import React from "react"
import Navbar, { NavbarMobile } from "./_components/Navbar"
import { CartProvider } from "~/contexts/CartContext"

const LayoutClient = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <CartProvider>
      <div>
        <div className="block lg:hidden">
          <NavbarMobile />
        </div>
        <div className="hidden lg:block">
          <Navbar />
        </div>
        <div>{children}</div>
      </div>
    </CartProvider>
  )
}

export default LayoutClient