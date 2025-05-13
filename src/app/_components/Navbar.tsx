import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import {
  PiBagDuotone,
  PiHeartDuotone,
  PiMagnifyingGlassDuotone,
} from "react-icons/pi";
import { useState } from "react";

const Navbar = () => {
  const currentPath = usePathname();
  return (
    <div className="flex w-screen flex-col items-center justify-center">
      <div className="flex h-12 w-full items-center justify-center bg-black/50 text-white">
        <div className="flex w-[70vw] items-center justify-between">
          <p>Free shipping, 30-day return or refund guarantee.</p>
          <div className="flex items-center justify-center gap-10 tracking-[.20rem]">
            <Link href={"/sign-in"}>SIGN IN</Link>
            <Link href={"/"}>FAQs</Link>
          </div>
        </div>
      </div>

      <div className="flex h-20 w-full items-center justify-center text-white">
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
                className={`absolute -bottom-2 h-[2px] w-full bg-white ${currentPath !== "/" && "hidden"}`}
              ></div>
            </Link>
            <Link
              className={`relative text-center ${currentPath == "/shop" && "font-semibold"} `}
              href={"/shop"}
            >
              Shop
              <div
                className={`absolute -bottom-2 h-[2px] w-full bg-white ${currentPath !== "/shop" && "hidden"}`}
              ></div>
            </Link>
            <Link
              className={`relative text-center ${currentPath == "/deals" && "font-semibold"} `}
              href={"/deals"}
            >
              Deals
              <div
                className={`absolute -bottom-2 h-[2px] w-full bg-white ${currentPath !== "/deals" && "hidden"}`}
              ></div>
            </Link>
            <Link
              className={`relative text-center ${currentPath == "/contact" && "font-semibold"} `}
              href={"/contact"}
            >
              Contact
              <div
                className={`absolute -bottom-2 h-[2px] w-full bg-white ${currentPath !== "/contact" && "hidden"}`}
              ></div>
            </Link>
          </div>
          <div className="flex items-center justify-between gap-8 text-2xl">
            <PiMagnifyingGlassDuotone />
            <PiHeartDuotone />
            <div className="flex items-center justify-center gap-3">
              <PiBagDuotone />
              <p className="text-base">$0.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

export const NavbarMobile = () => {
  const [menu, setMenu] = useState(false);
  return (
    <div className="flex w-screen flex-col items-center justify-center text-white overflow-hidden">
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
          <PiBagDuotone />
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
