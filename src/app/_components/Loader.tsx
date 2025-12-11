"use client";
import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export default function Loader() {
    const { active, progress } = useProgress();
    const [show, setShow] = useState(true);

    useEffect(() => {
        if (!active && progress === 100) {
            // Add a small delay before hiding to ensure smooth transition
            const timer = setTimeout(() => {
                setShow(false);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [active, progress]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
                >
                    <div className="flex flex-col items-center gap-6">
                        {/* Animated spinner */}
                        {/* <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full"
                        /> */}

                        {/* Progress text */}
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-xl font-semibold text-gray-700">
                                Loading...
                            </p>
                            <p className="text-sm text-gray-500">
                                {Math.round(progress)}%
                            </p>
                        </div>

                        {/* Progress bar */}
                        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.3 }}
                                className="h-full bg-black"
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
