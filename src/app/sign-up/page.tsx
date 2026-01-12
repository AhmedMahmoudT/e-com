"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { PiUserDuotone, PiEnvelopeSimpleDuotone, PiLockKeyDuotone } from 'react-icons/pi';
import { useAuth } from '~/contexts/AuthContext';

const SignUpPage = () => {
    const router = useRouter();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock login
        login(formData.name, formData.email);

        setIsLoading(false);
        router.push('/');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md space-y-8"
            >
                <div>
                    <Link href="/" className="text-3xl font-bold tracking-widest text-black">
                        TAEST
                    </Link>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/sign-in" className="font-medium text-black hover:underline">
                            Sign in instead
                        </Link>
                    </p>
                </div>

                <div className="mt-8 space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <PiUserDuotone className="absolute left-3 top-3 text-xl text-gray-400" />
                            <input
                                required
                                name="name"
                                type="text"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-gray-100 bg-gray-50 py-3 pl-10 pr-4 transition-all focus:border-black focus:bg-white focus:outline-none"
                            />
                        </div>
                        <div className="relative">
                            <PiEnvelopeSimpleDuotone className="absolute left-3 top-3 text-xl text-gray-400" />
                            <input
                                required
                                name="email"
                                type="email"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-gray-100 bg-gray-50 py-3 pl-10 pr-4 transition-all focus:border-black focus:bg-white focus:outline-none"
                            />
                        </div>
                        <div className="relative">
                            <PiLockKeyDuotone className="absolute left-3 top-3 text-xl text-gray-400" />
                            <input
                                required
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-gray-100 bg-gray-50 py-3 pl-10 pr-4 transition-all focus:border-black focus:bg-white focus:outline-none"
                            />
                        </div>

                        <div className="flex items-start">
                            <div className="flex items-center">
                                <input required id="terms" name="terms" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" />
                            </div>
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 leading-tight">
                                I agree to the <a href="#" className="font-bold underline">Terms of Service</a> and <a href="#" className="font-bold underline">Privacy Policy</a>
                            </label>
                        </div>

                        <button
                            disabled={isLoading}
                            type="submit"
                            className="group relative flex w-full justify-center rounded-xl bg-black py-4 text-sm font-bold text-white transition-all hover:bg-gray-800 disabled:opacity-70"
                        >
                            <span className={isLoading ? 'opacity-0' : 'opacity-100'}>CREATE ACCOUNT</span>
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                </div>
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default SignUpPage;
