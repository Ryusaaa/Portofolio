"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GithubProfile } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { Download, Flag, X, Clock } from "lucide-react";
import { useState } from "react";

export function Hero({ profile }: { profile: GithubProfile }) {
    const [showModal, setShowModal] = useState(false);

    const handleDownloadCV = () => {
        setShowModal(true);
    };

    return (
        <>
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-f1-dark text-foreground px-4 md:px-8">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-checkered z-0 pointer-events-none" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-f1-gray-dark/20 to-transparent z-0" />

                {/* Decorative Grid Lines - Telemetry feel */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#38383f12_1px,transparent_1px),linear-gradient(to_bottom,#38383f12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

                <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10 pt-20">

                    {/* Left: Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-2 text-f1-red font-display font-bold text-base sm:text-lg md:text-xl uppercase tracking-widest border-b border-f1-red/30 pb-2 w-fit">
                            <Flag className="w-4 h-4 sm:w-5 sm:h-5" />
                            Portfolio
                        </div>

                        <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black font-display leading-[0.9] tracking-tighter italic">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">
                                SATRIA
                            </span>
                            <br />
                            <span className="text-stroke text-transparent block md:ml-1 text-2xl sm:text-4xl md:text-6xl lg:text-7xl">
                                IBNU SAFARUDIN
                            </span>
                        </h1>

                        <p className="text-neutral-400 text-base sm:text-lg md:text-xl max-w-lg font-light">
                            I am a web developer and a teenager who loves exploring technology and really enjoys playing games.
                        </p>

                        <div className="flex flex-wrap gap-3 sm:gap-4 pt-4">
                            <Link
                                href="/projects"
                                className="group relative px-5 sm:px-8 py-3 sm:py-4 bg-f1-red text-white font-bold skew-x-[-12deg] hover:bg-red-700 transition-all shadow-[0_0_20px_rgba(225,6,0,0.3)] hover:shadow-[0_0_40px_rgba(225,6,0,0.5)] overflow-hidden"
                            >
                                <span className="block skew-x-[12deg] tracking-wider text-sm sm:text-base">
                                    VIEW GARAGE
                                </span>
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out" />
                            </Link>

                            <button
                                onClick={handleDownloadCV}
                                className="group px-5 sm:px-8 py-3 sm:py-4 border border-neutral-700 text-white font-bold skew-x-[-12deg] hover:border-white hover:bg-white/5 transition-all cursor-pointer"
                            >
                                <div className="flex items-center gap-2 skew-x-[12deg] tracking-wider text-sm sm:text-base">
                                    <Download className="w-4 h-4" />
                                    <span className="hidden sm:inline">TELEMETRY (CV)</span>
                                    <span className="sm:hidden">CV</span>
                                </div>
                            </button>
                        </div>

                        {/* Quick Stats Dashboard */}
                        <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-neutral-800/50">
                            <div>
                                <div className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-white">{profile.public_repos}</div>
                                <div className="text-[8px] sm:text-[10px] text-f1-red font-bold uppercase tracking-widest">Constructors</div>
                            </div>
                            <div>
                                <div className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-white">{profile.followers}</div>
                                <div className="text-[8px] sm:text-[10px] text-f1-red font-bold uppercase tracking-widest">Grandstand</div>
                            </div>
                            <div>
                                <div className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-white">99<span className="text-xs sm:text-sm">%</span></div>
                                <div className="text-[8px] sm:text-[10px] text-f1-red font-bold uppercase tracking-widest">Reliability</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative flex justify-center items-center"
                    >
                        {/* Decorative Circle / Tire */}
                        <div className="absolute w-[120%] h-[120%] bg-f1-red/5 rounded-full blur-[100px]" />

                        <div className="relative w-72 h-72 md:w-[450px] md:h-[450px] rounded-full p-2">
                            <div className="absolute inset-0 rounded-full border border-neutral-800" />
                            <div className="absolute inset-4 rounded-full border border-dashed border-neutral-700 animate-[spin_10s_linear_infinite]" />
                            <div className="absolute inset-20 rounded-full border border-f1-red/20" />

                            {/* Avatar Container */}
                            <div className="absolute inset-6 rounded-full overflow-hidden border-4 border-neutral-900 shadow-2xl bg-neutral-800">
                                <Image
                                    src={profile.avatar_url}
                                    alt={profile.name}
                                    fill
                                    className="object-cover hover:scale-110 transition-transform duration-700 ease-out"
                                    priority
                                />

                                {/* Gloss overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent pointer-events-none" />
                            </div>

                            {/* Orbiting element */}
                            <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
                                <div className="w-3 h-3 bg-f1-red rounded-full absolute top-4 left-1/2 -translate-x-1/2 shadow-[0_0_10px_#e10600]" />
                            </div>
                        </div>

                        {/* Racing Number Badge */}
                        <div className="absolute -bottom-10 -left-4 md:left-10 bg-gradient-to-br from-f1-red to-red-800 text-white w-24 h-24 md:w-32 md:h-32 flex items-center justify-center font-display font-black text-5xl md:text-6xl skew-x-[-12deg] shadow-xl border-4 border-white/10 z-20">
                            <span className="skew-x-[12deg]">01</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Coming Soon Modal */}
            <AnimatePresence>
                {showModal && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md"
                        >
                            <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
                                {/* Racing Stripes Decoration */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-f1-red via-yellow-500 to-green-500" />

                                {/* Close Button */}
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-full transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="p-8 pt-10 text-center">
                                    {/* Animated Icon */}
                                    <motion.div
                                        initial={{ rotate: 0 }}
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="w-20 h-20 mx-auto mb-6 bg-f1-red/10 rounded-full flex items-center justify-center border-2 border-dashed border-f1-red/30"
                                    >
                                        <Clock className="w-10 h-10 text-f1-red" />
                                    </motion.div>

                                    {/* Title */}
                                    <h3 className="text-3xl font-display font-black uppercase tracking-tight text-white mb-2">
                                        <span className="text-f1-red">///</span> Coming Soon
                                    </h3>

                                    {/* Description */}
                                    <p className="text-neutral-400 mb-6">
                                        The driver telemetry data (CV) is currently being prepared for the next race season. Stay tuned!
                                    </p>

                                    {/* Progress Bar */}
                                    <div className="mb-6">
                                        <div className="flex justify-between text-xs text-neutral-500 uppercase tracking-wider mb-2">
                                            <span>Progress</span>
                                            <span className="text-f1-red">In Development</span>
                                        </div>
                                        <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: "0%" }}
                                                animate={{ width: "65%" }}
                                                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                                                className="h-full bg-gradient-to-r from-f1-red to-yellow-500 rounded-full"
                                            />
                                        </div>
                                    </div>

                                    {/* Close Action */}
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="group relative px-8 py-3 bg-f1-red text-white font-bold skew-x-[-12deg] hover:bg-red-700 transition-all shadow-[0_0_20px_rgba(225,6,0,0.3)] hover:shadow-[0_0_40px_rgba(225,6,0,0.5)] overflow-hidden"
                                    >
                                        <span className="block skew-x-[12deg] tracking-wider text-sm">
                                            BACK TO GRID
                                        </span>
                                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out" />
                                    </button>
                                </div>

                                {/* Bottom Racing Stripe */}
                                <div className="h-1 bg-gradient-to-r from-green-500 via-yellow-500 to-f1-red" />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
