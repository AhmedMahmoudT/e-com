"use client"
import React, { useState } from "react"
import Navbar, { NavbarMobile } from "./_components/Navbar"
import { CartProvider } from "~/contexts/CartContext"

const LayoutClient = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <CartProvider>
      <div className="text-sm">
        <div className="block lg:hidden">
          <NavbarMobile cartOpen={cartOpen} setCartOpen={setCartOpen} />
        </div>
        <div className="hidden lg:block">
          <Navbar cartOpen={cartOpen} setCartOpen={setCartOpen} />
        </div>
        <div>{children}</div>
      </div>
    </CartProvider>
  )
}

export default LayoutClient