"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Timer } from "lucide-react";

interface CVModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CVModal({ isOpen, onClose }: CVModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 flex items-center justify-center z-[70] pointer-events-none p-4">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                            className="bg-neutral-900 border border-white/10 p-6 md:p-8 rounded-2xl max-w-md w-full shadow-2xl pointer-events-auto relative overflow-hidden"
                        >
                            {/* Decorative gradient */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-f1-red/20 blur-3xl rounded-full pointer-events-none" />

                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 text-f1-red">
                                    <Timer size={32} />
                                </div>

                                <h3 className="font-display text-2xl font-bold uppercase text-white mb-2">
                                    Coming Soon
                                </h3>
                                <p className="text-neutral-400 mb-8 leading-relaxed">
                                    My curriculum vitae is currently being updated to reflect my latest projects and skills. Please check back later.
                                </p>

                                <div className="flex flex-col gap-3 w-full">
                                    <button
                                        className="flex items-center justify-center gap-2 bg-white/5 text-neutral-500 font-bold py-3 px-6 rounded-lg uppercase tracking-wide text-sm cursor-not-allowed"
                                        disabled
                                    >
                                        <Download size={18} />
                                        Download Not Available
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="text-white hover:text-f1-red text-sm py-2 transition-colors uppercase tracking-wider font-mono mt-2"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
