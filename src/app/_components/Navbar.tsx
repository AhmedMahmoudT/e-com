"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  PiBagDuotone,
  PiHeartDuotone,
  PiMagnifyingGlassDuotone,
  PiMinus,
  PiPlus,
  PiTrashDuotone,
} from "react-icons/pi";
import { useState } from "react";
import { useCart } from "~/contexts/CartContext";
import { textColor } from "~/utils/colors";

const Cart = ({ cartOpen, showCart }: { cartOpen: boolean, showCart: () => void }) => {
  const { items, total, updateQuantity, removeItem } = useCart();
  return (
    <AnimatePresence>
      {cartOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={showCart} className="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50">
          <div onScroll={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()} className="flex h-[50em] w-[26em] flex-col items-center justify-start overflow-hidden bg-white p-10">
            <div className="mb-8 flex w-full items-center justify-between border-b pb-4">
              <h2 className="text-xl text-black font-bold uppercase tracking-widest">Cart ({items.length})</h2>
              <button onClick={showCart} className="text-black hover:text-gray-500">CLOSE</button>
            </div>

            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-4">
                <PiBagDuotone className="text-6xl text-gray-300" />
                <p className="text-xl text-gray-400">Your cart is empty</p>
                <button onClick={showCart} className="mt-4 rounded-full bg-black px-8 py-3 text-white transition-colors hover:bg-gray-800">
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex w-full flex-1 flex-col gap-6">
                  {items.map((item) => (
                    <div key={item.id} className={`flex items-center justify-between border-b pb-6`}>
                      <div className="flex items-center gap-6">
                        <div className="flex flex-col text-black">
                          <h3 className={`text-base font-bold ${textColor(item.color)}`}>{item.shape}</h3>
                          <p className="mt-1 text-xs font-semibold">{item.price} ¤</p>
                        </div>
                      </div>

                      <div className={`flex items-center gap-8 ${textColor(item.color)}`}>
                        <div className="flex items-center gap-4 rounded-full px-4 py-2">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="hover:text-gray-600"><PiMinus /></button>
                          <span className="w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="hover:text-gray-600"><PiPlus /></button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600">
                          <PiTrashDuotone className="text-2xl" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex w-full flex-col gap-6 border-t pt-8">
                  <div className="flex items-center justify-between text-2xl font-bold">
                    <p>Total</p>
                    <p>${total.toFixed(2)}</p>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={showCart}
                    className="w-full rounded-full bg-black py-4 text-center text-white hover:bg-gray-800"
                  >
                    CHECKOUT
                  </Link>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const Navbar = ({ cartOpen, setCartOpen }: { cartOpen: boolean, setCartOpen: (open: boolean) => void }) => {
  const currentPath = usePathname();
  const { total } = useCart();

  const showCart = () => {
    setCartOpen(!cartOpen);
  }
  return (
    <div className="flex w-full flex-col items-center justify-center">
      {/* Cart */}
      <Cart cartOpen={cartOpen} showCart={showCart} />
      <div className="flex h-12 w-full items-center justify-center bg-black/50 text-white">
        <div className="flex w-[70vw] items-center justify-between">
          <p>Free shipping, 30-day return or refund guarantee.</p>
          <div className="flex items-center justify-center gap-10 tracking-[.20rem]">
            <Link href={"/sign-in"}>SIGN IN</Link>
            <Link href={"/"}>FAQs</Link>
          </div>
        </div>
      </div>

      <div className={`flex h-14 w-full items-center justify-center text-white ${currentPath !== "/" && "bg-black"}`}>
        <div className="flex w-[70vw] items-center justify-between">
          <Link href={"/"} className="text-2xl font-bold tracking-widest">
            Taest
          </Link>
          <div className="flex items-center justify-center gap-8 uppercase tracking-widest">
            <Link
              className={`relative text-center ${currentPath == "/" && "font-semibold"} `}
              href={"/"}
            >
              Home
              <div
                className={`absolute -bottom-[16px] h-[4px] w-full bg-white ${currentPath !== "/" && "hidden"}`}
              />
            </Link>
            <Link
              className={`relative text-center ${currentPath == "/shop" && "font-semibold"} `}
              href={"/shop"}
            >
              Shop
              <div
                className={`absolute -bottom-[16px] h-[4px] w-full bg-white ${currentPath !== "/shop" && "hidden"}`}
              />
            </Link>
            <Link
              className={`relative text-center ${currentPath == "/deals" && "font-semibold"} `}
              href={"/deals"}
            >
              Deals
              <div
                className={`absolute -bottom-[16px] h-[4px] w-full bg-white ${currentPath !== "/deals" && "hidden"}`}
              />
            </Link>
            <Link
              className={`relative text-center ${currentPath == "/contact" && "font-semibold"} `}
              href={"/contact"}
            >
              Contact
              <div
                className={`absolute -bottom-[16px] h-[4px] w-full bg-white ${currentPath !== "/contact" && "hidden"}`}
              />
            </Link>
          </div>
          <div className="flex items-center justify-between gap-8 text-2xl">
            <PiMagnifyingGlassDuotone className="cursor-pointer" />
            <PiHeartDuotone className="cursor-pointer" />
            <div onClick={showCart} className="flex items-center justify-center gap-3">
              <PiBagDuotone className="cursor-pointer" />
              <p className="text-base">{total.toFixed(2)} ¤</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

export const NavbarMobile = ({ cartOpen, setCartOpen }: { cartOpen: boolean, setCartOpen: (open: boolean) => void }) => {
  const [menu, setMenu] = useState(false);


  const showCart = () => {
    console.log("showCart: ", cartOpen);
    setCartOpen(!cartOpen);
  };

  return (
    <div className="flex w-screen flex-col items-center justify-center text-white overflow-hidden">
      <Cart cartOpen={cartOpen} showCart={showCart} />
      <div className="flex w-full flex-col items-center justify-between bg-black/50 py-4 text-center">
        <p>Free shipping, 30-day return or refund guarantee.</p>
      </div>
      <div className="flex h-20 w-[90vw] items-center justify-between tracking-widest">
        <Link href={"/"} className="text-2xl font-bold tracking-widest">
          Taest
        </Link>
        <div className="flex items-center justify-center gap-4 text-2xl">
          <PiMagnifyingGlassDuotone />
          <PiHeartDuotone />
          <PiBagDuotone onClick={showCart} />
          <div
            onClick={() => setMenu(!menu)}
            className="flex cursor-pointer flex-col items-center justify-center gap-1"
          >
            <motion.div
              initial={{ rotate: 0, y: 0 }}
              animate={menu ? { rotate: -45, y: 6 } : { rotate: 0, y: 0 }}
              className="h-[2px] w-5 bg-white"
            />
            <motion.div
              initial={{ opacity: 1 }}
              animate={menu ? { opacity: 0 } : { opacity: 1 }}
              className="h-[2px] w-5 bg-white"
            />
            <motion.div
              initial={{ rotate: 0, y: 0 }}
              animate={menu ? { rotate: 45, y: -6 } : { rotate: 0, y: 0 }}
              className="h-[2px] w-5 bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
