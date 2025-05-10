import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiBagDuotone, PiHeartDuotone, PiMagnifyingGlassDuotone } from "react-icons/pi";

const Navbar = () => {
    const currentPath = usePathname()
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex h-12 w-full items-center justify-center bg-black/50 text-white">
        <div className="flex w-[60vw] items-center justify-between">
          <p>Free shipping, 30-day return or refund guarantee.</p>
          <div className="flex items-center justify-center gap-10 tracking-[.20rem]">
            <Link href={"/sign-in"}>SIGN IN</Link>
            <Link href={"/"}>FAQs</Link>
          </div>
        </div>
      </div>

      <div className="flex h-20 w-full items-center justify-center text-white">
        <div className="flex w-[60vw] items-center justify-between">
          <Link href={"/"} className="text-2xl font-bold tracking-widest">
            E-COM
          </Link>
          <div className="flex items-center justify-center gap-8 uppercase tracking-widest">
            <Link className={`text-center relative ${currentPath=="/"&&"font-semibold"} `} href={"/"}>
              Home
              <div className={`absolute -bottom-2 bg-white w-full h-[2px] ${currentPath!=="/"&&"hidden"}`}></div>
            </Link>
            <Link className={`text-center relative ${currentPath=="/shop"&&"font-semibold"} `} href={"/shop"}>
              Shop
              <div className={`absolute -bottom-2 bg-white w-full h-[2px] ${currentPath!=="/shop"&&"hidden"}`}></div>
            </Link>
            <Link className={`text-center relative ${currentPath=="/deals"&&"font-semibold"} `} href={"/deals"}>
              Deals
              <div className={`absolute -bottom-2 bg-white w-full h-[2px] ${currentPath!=="/deals"&&"hidden"}`}></div>
            </Link>
            <Link className={`text-center relative ${currentPath=="/contact"&&"font-semibold"} `} href={"/contact"}>
              Contact
              <div className={`absolute -bottom-2 bg-white w-full h-[2px] ${currentPath!=="/contact"&&"hidden"}`}></div>
            </Link>
          </div>
          <div className="flex items-center justify-between gap-8 text-2xl">
            <PiMagnifyingGlassDuotone/>
            <PiHeartDuotone/>
            <div className="flex gap-3 items-center justify-center">
            <PiBagDuotone/>
            <p className="text-base">$0.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
