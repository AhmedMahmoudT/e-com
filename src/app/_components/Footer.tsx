"use client";

import Link from "next/link";
import {
    PiInstagramLogoDuotone,
    PiTwitterLogoDuotone,
    PiDiscordLogoDuotone,
    PiEnvelopeSimpleDuotone,
    PiPhoneDuotone,
    PiMapPinDuotone
} from "react-icons/pi";

const Footer = () => {
    return (
        <footer id="about" className="mt-[6em] border-t border-gray-800 bg-black py-[4em] text-white">
            <div className="mx-auto flex w-[90vw] flex-col gap-[4em] lg:w-[75em]">
                <div className="grid grid-cols-1 gap-[4em] lg:grid-cols-4">
                    {/* Brand and Mission */}
                    <div className="col-span-1 lg:col-span-2">
                        <Link href="/" className="text-3xl font-bold tracking-widest">
                            Taest
                        </Link>
                        <p className="mt-6 max-w-md text-sm leading-relaxed text-gray-400">
                            Redefining digital aesthetics through a curated collection of procedural sculptures and rare artifacts. We bridge the gap between abstract geometry and premium digital ownership.
                        </p>
                        <div className="mt-8 flex gap-6 text-2xl text-gray-400">
                            <a href="#" className="transition-colors hover:text-white"><PiInstagramLogoDuotone /></a>
                            <a href="#" className="transition-colors hover:text-white"><PiTwitterLogoDuotone /></a>
                            <a href="#" className="transition-colors hover:text-white"><PiDiscordLogoDuotone /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-white">Explore</h4>
                        <div className="flex flex-col gap-4 text-sm text-gray-400">
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
                            <Link href="/shop" className="hover:text-white transition-colors">Special Collections</Link>
                            <Link href="#" className="hover:text-white transition-colors">About Us</Link>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-white">Contact</h4>
                        <div className="flex flex-col gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-3">
                                <PiEnvelopeSimpleDuotone className="text-lg" />
                                <span>hello@taest.art</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <PiPhoneDuotone className="text-lg" />
                                <span>+1 (555) 012-3456</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <PiMapPinDuotone className="text-lg" />
                                <span>Digital Vault #404, Web3</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between border-t border-white/10 pt-8 text-xs text-gray-500 md:flex-row">
                    <p>© 2026 Taest Design. All rights reserved.</p>
                    <div className="mt-4 flex gap-8 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
