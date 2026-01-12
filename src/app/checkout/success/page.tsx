"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { PiCheckCircleDuotone, PiArrowRight } from 'react-icons/pi';

const SuccessPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md text-center"
            >
                <div className="mb-8 flex justify-center text-8xl text-green-500">
                    <PiCheckCircleDuotone />
                </div>
                <h1 className="mb-4 text-4xl font-bold tracking-tight">Order Confirmed</h1>
                <p className="mb-12 text-lg text-gray-500">
                    Thank you for your purchase! We&apos;ve received your order and we&apos;ll notify you as soon as it ships.
                </p>
                <div className="space-y-4">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 rounded-full bg-black px-8 py-4 text-lg font-bold text-white transition-opacity hover:opacity-80"
                    >
                        CONTINUE SHOPPING
                        <PiArrowRight />
                    </Link>
                    <p className="text-sm text-gray-400">
                        Order #TAEST-{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default SuccessPage;
