"use client";

import React, { useState } from 'react';
import { useCart } from '~/contexts/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { PiArrowLeft, PiCreditCardDuotone, PiTruckDuotone, PiMoneyDuotone } from 'react-icons/pi';

const CheckoutPage = () => {
    const { items, total, clearCart } = useCart();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postcode: '',
        cardNumber: '',
        expiry: '',
        cvc: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        clearCart();
        router.push('/checkout/success');
    };

    if (items.length === 0 && !isSubmitting) {
        return (
            <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4">
                <h1 className="text-3xl font-bold">Your cart is empty</h1>
                <p className="text-gray-500">Add some items to your cart before checking out.</p>
                <Link href="/" className="rounded-full bg-black px-8 py-3 text-white transition-opacity hover:opacity-80">
                    Return to Shop
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-12 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black">
                        <PiArrowLeft />
                        BACK TO SHOP
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
                    <div className="w-20" /> {/* Spacer */}
                </div>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    {/* Left Column: Form */}
                    <div className="space-y-12">
                        <form onSubmit={handleSubmit} className="space-y-12">
                            {/* Contact Information */}
                            <section>
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white text-xs">
                                        1
                                    </div>
                                    <h2 className="text-xl font-bold">Contact Information</h2>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full border-b border-gray-200 py-3 transition-colors focus:border-black focus:outline-none placeholder:text-gray-400"
                                    />
                                </div>
                            </section>

                            {/* Shipping Details */}
                            <section>
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white text-xs">
                                        2
                                    </div>
                                    <h2 className="text-xl font-bold">Shipping Details</h2>
                                </div>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                                    <input
                                        required
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="border-b border-gray-200 py-3 transition-colors focus:border-black focus:outline-none placeholder:text-gray-400"
                                    />
                                    <input
                                        required
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="border-b border-gray-200 py-3 transition-colors focus:border-black focus:outline-none placeholder:text-gray-400"
                                    />
                                    <input
                                        required
                                        type="text"
                                        name="address"
                                        placeholder="Address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="col-span-2 border-b border-gray-200 py-3 transition-colors focus:border-black focus:outline-none placeholder:text-gray-400"
                                    />
                                    <input
                                        required
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="border-b border-gray-200 py-3 transition-colors focus:border-black focus:outline-none placeholder:text-gray-400"
                                    />
                                    <input
                                        required
                                        type="text"
                                        name="postcode"
                                        placeholder="Postcode"
                                        value={formData.postcode}
                                        onChange={handleChange}
                                        className="border-b border-gray-200 py-3 transition-colors focus:border-black focus:outline-none placeholder:text-gray-400"
                                    />
                                </div>
                            </section>

                            {/* Payment */}
                            <section>
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white text-xs">
                                        3
                                    </div>
                                    <h2 className="text-xl font-bold">Payment Method</h2>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('card')}
                                            className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 py-6 transition-all ${paymentMethod === 'card' ? 'border-black bg-gray-50' : 'border-gray-100 hover:border-gray-200'}`}
                                        >
                                            <PiCreditCardDuotone className={`text-3xl ${paymentMethod === 'card' ? 'text-black' : 'text-gray-400'}`} />
                                            <span className={`text-sm font-bold ${paymentMethod === 'card' ? 'text-black' : 'text-gray-400'}`}>Credit Card</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('cod')}
                                            className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 py-6 transition-all ${paymentMethod === 'cod' ? 'border-black bg-gray-50' : 'border-gray-100 hover:border-gray-200'}`}
                                        >
                                            <PiMoneyDuotone className={`text-3xl ${paymentMethod === 'cod' ? 'text-black' : 'text-gray-400'}`} />
                                            <span className={`text-sm font-bold ${paymentMethod === 'cod' ? 'text-black' : 'text-gray-400'}`}>Cash on Delivery</span>
                                        </button>
                                    </div>

                                    {paymentMethod === 'card' && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="mt-6 space-y-4 overflow-hidden"
                                        >
                                            <div className="relative">
                                                <input
                                                    required={paymentMethod === 'card'}
                                                    type="text"
                                                    name="cardNumber"
                                                    placeholder="Card Number"
                                                    value={formData.cardNumber}
                                                    onChange={handleChange}
                                                    className="w-full border-b border-gray-200 py-3 pr-10 transition-colors focus:border-black focus:outline-none placeholder:text-gray-400"
                                                />
                                                <PiCreditCardDuotone className="absolute right-2 top-4 text-xl text-gray-400" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <input
                                                    required={paymentMethod === 'card'}
                                                    type="text"
                                                    name="expiry"
                                                    placeholder="MM / YY"
                                                    value={formData.expiry}
                                                    onChange={handleChange}
                                                    className="border-b border-gray-200 py-3 transition-colors focus:border-black focus:outline-none placeholder:text-gray-400"
                                                />
                                                <input
                                                    required={paymentMethod === 'card'}
                                                    type="text"
                                                    name="cvc"
                                                    placeholder="CVC"
                                                    value={formData.cvc}
                                                    onChange={handleChange}
                                                    className="border-b border-gray-200 py-3 transition-colors focus:border-black focus:outline-none placeholder:text-gray-400"
                                                />
                                            </div>
                                        </motion.div>
                                    )}

                                    {paymentMethod === 'cod' && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="mt-6 rounded-2xl bg-gray-100 p-6"
                                        >
                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                You will pay the delivery person with cash when your package is delivered. Please ensure you have the correct amount ready.
                                            </p>
                                        </motion.div>
                                    )}
                                </div>
                            </section>

                            <button
                                disabled={isSubmitting}
                                type="submit"
                                className="group relative w-full overflow-hidden rounded-full bg-black py-6 text-xl font-bold text-white transition-all hover:bg-gray-900 disabled:opacity-50"
                            >
                                <span className={isSubmitting ? 'opacity-0' : 'opacity-100'}>
                                    PLACE ORDER — ${total.toFixed(2)}
                                </span>
                                {isSubmitting && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    </div>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:pl-12">
                        <div className="sticky top-12 rounded-2xl bg-gray-50 p-8">
                            <h2 className="mb-8 text-xl font-bold">Order Summary</h2>
                            <div className="max-h-[50vh] space-y-6 overflow-y-auto pr-2">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between">
                                        <div className="flex gap-4">
                                            <div
                                                className="flex h-16 w-16 items-center justify-center rounded-xl bg-white shadow-sm"
                                                style={{ color: item.color }}
                                            >
                                                {item.shape === 'Cube' && <div className="h-8 w-8 border-2 border-current" />}
                                                {/* Add more shape icons if needed, or just a simple placeholder */}
                                                {item.shape !== 'Cube' && <div className="h-8 w-8 rounded-full border-2 border-current" />}
                                            </div>
                                            <div>
                                                <h3 className="font-bold">{item.shape}</h3>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 space-y-4 border-t border-gray-200 pt-8">
                                <div className="flex justify-between text-gray-500">
                                    <span>Subtotal</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-500">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-medium">FREE</span>
                                </div>
                                <div className="flex justify-between pt-4 text-2xl font-bold">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="mt-8 flex items-center gap-3 rounded-xl bg-white p-4 text-sm text-gray-500 shadow-sm">
                                <PiTruckDuotone className="text-xl text-black" />
                                <p>Estimated delivery: 2-4 business days</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
