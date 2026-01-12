"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { PiEnvelopeSimpleDuotone, PiLockKeyDuotone, PiGoogleLogoFill, PiGithubLogoFill } from 'react-icons/pi';
import { useAuth } from '~/contexts/AuthContext';

const SignInPage = () => {
    const router = useRouter();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
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

        // Mock login - extracting name from email for demo purposes
        const name = formData.email.split('@')[0] ?? 'User';
        login(name.charAt(0).toUpperCase() + name.slice(1), formData.email);

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
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Or{' '}
                        <Link href="/sign-up" className="font-medium text-black hover:underline">
                            create a new account
                        </Link>
                    </p>
                </div>

                <div className="mt-8 space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
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

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-medium text-black hover:underline">Forgot password?</a>
                            </div>
                        </div>

                        <button
                            disabled={isLoading}
                            type="submit"
                            className="group relative flex w-full justify-center rounded-xl bg-black py-4 text-sm font-bold text-white transition-all hover:bg-gray-800 disabled:opacity-70"
                        >
                            <span className={isLoading ? 'opacity-0' : 'opacity-100'}>SIGN IN</span>
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                </div>
                            )}
                        </button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                        <div className="relative flex justify-center text-sm"><span className="bg-white px-4 text-gray-500 uppercase tracking-widest text-xs">Or continue with</span></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-100 py-3 transition-colors hover:bg-gray-50">
                            <PiGoogleLogoFill className="text-xl text-red-500" />
                            <span className="font-bold text-sm">Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-100 py-3 transition-colors hover:bg-gray-50">
                            <PiGithubLogoFill className="text-xl" />
                            <span className="font-bold text-sm">GitHub</span>
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SignInPage;
