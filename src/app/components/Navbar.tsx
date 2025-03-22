import Link from "next/link";
import { PiBagDuotone, PiHeartDuotone, PiMagnifyingGlassDuotone } from "react-icons/pi";

const Navbar = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex h-16 w-full items-center justify-center bg-black text-white">
        <div className="flex w-[60vw] items-center justify-between">
          <p>Free shipping, 30-day return or refund guarantee.</p>
          <div className="flex items-center justify-center gap-10 tracking-[.20rem]">
            <Link href={"/sign-in"}>SIGN IN</Link>
            <Link href={"/"}>FAQs</Link>
          </div>
        </div>
      </div>

      <div className="flex h-20 w-full items-center justify-center">
        <div className="flex w-[60vw] items-center justify-between">
          <Link href={"/"} className="text-2xl font-bold tracking-widest">
            E-COM
          </Link>
          <div className="grid grid-cols-4 gap-2 gap-x-4 uppercase tracking-widest">
            <Link className="text-center relative" href={"/"}>
              Home
              <div className="absolute -bottom-2 bg-black w-full h-[2px]"></div>
            </Link>
            <Link className="text-center relative" href={"/"}>
              Shop
              <div className="absolute -bottom-2 bg-black w-full h-[2px] hidden"></div>
            </Link>
            <Link className="text-center relative" href={"/"}>
              Deals
              <div className="absolute -bottom-2 bg-black w-full h-[2px] hidden"></div>
            </Link>
            <Link className="text-center relative" href={"/"}>
              Contact
              <div className="absolute -bottom-2 bg-black w-full h-[2px] hidden"></div>
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
