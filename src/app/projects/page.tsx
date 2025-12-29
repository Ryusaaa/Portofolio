"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star, GitFork, Code2, ArrowUpRight, Flag, Zap } from "lucide-react";

interface GithubRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    topics: string[];
}

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1] as const, // easeOut cubic-bezier
        },
    },
};

const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1] as const, // easeOut cubic-bezier
        },
    },
};

export default function ProjectsPage() {
    const [repos, setRepos] = useState<GithubRepo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRepos() {
            try {
                const response = await fetch(
                    `https://api.github.com/users/${process.env.NEXT_PUBLIC_GITHUB_USERNAME || "ryusaaa"}/repos?sort=updated&per_page=30`
                );
                const data = await response.json();
                // Sort by stars
                const sorted = data.sort((a: GithubRepo, b: GithubRepo) => b.stargazers_count - a.stargazers_count);
                setRepos(sorted);
            } catch (error) {
                console.error("Failed to fetch repos:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchRepos();
    }, []);

    return (
        <main className="min-h-screen bg-f1-dark text-foreground overflow-x-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 bg-checkered z-0 pointer-events-none" />
            <div className="fixed top-0 right-0 w-1/2 h-full bg-gradient-to-l from-f1-red/5 to-transparent z-0 pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-purple-900/10 to-transparent z-0 pointer-events-none" />

            {/* Header */}
            <motion.header
                initial="hidden"
                animate="visible"
                variants={headerVariants}
                className="relative z-10 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md sticky top-0"
            >
                <div className="container mx-auto px-4 py-4 sm:py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group w-fit"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm sm:text-base">Back to Pit Lane</span>
                        </Link>

                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-xs sm:text-sm text-neutral-500 font-mono uppercase tracking-wider">
                                {repos.length} Projects Online
                            </span>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Hero Section */}
            <section className="relative z-10 py-12 sm:py-16 md:py-24 border-b border-neutral-800">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="max-w-4xl"
                    >
                        <div className="flex items-center gap-2 text-f1-red font-display font-bold text-base sm:text-lg md:text-xl uppercase tracking-widest mb-4 sm:mb-6">
                            <Flag className="w-4 h-4 sm:w-5 sm:h-5" />
                            The Garage
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black font-display leading-[0.9] tracking-tighter italic mb-4 sm:mb-6">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">
                                MY
                            </span>
                            <br />
                            <span className="text-stroke text-transparent">
                                PROJECTS
                            </span>
                        </h1>

                        <p className="text-neutral-400 text-base sm:text-lg md:text-xl max-w-2xl font-light">
                            A collection of my work and experiments. Each project represents countless hours of
                            development, learning, and pushing the boundaries of what&apos;s possible.
                        </p>

                        {/* Stats Row */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="flex flex-wrap gap-6 sm:gap-8 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-neutral-800/50"
                        >
                            <div>
                                <div className="text-2xl sm:text-3xl font-bold font-display text-white">{repos.length}</div>
                                <div className="text-[10px] sm:text-xs text-f1-red font-bold uppercase tracking-widest">Total Projects</div>
                            </div>
                            <div>
                                <div className="text-2xl sm:text-3xl font-bold font-display text-white">
                                    {repos.reduce((acc, repo) => acc + repo.stargazers_count, 0)}
                                </div>
                                <div className="text-[10px] sm:text-xs text-f1-red font-bold uppercase tracking-widest">Total Stars</div>
                            </div>
                            <div>
                                <div className="text-2xl sm:text-3xl font-bold font-display text-white">
                                    {new Set(repos.map(r => r.language).filter(Boolean)).size}
                                </div>
                                <div className="text-[10px] sm:text-xs text-f1-red font-bold uppercase tracking-widest">Languages</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="relative z-10 py-12 sm:py-16 md:py-24 container mx-auto px-4">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-12 h-12 border-2 border-f1-red border-t-transparent rounded-full"
                        />
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
                    >
                        {repos.map((repo, index) => (
                            <motion.div
                                key={repo.id}
                                variants={itemVariants}
                                className="group"
                            >
                                <Link href={`/projects/${repo.name}`} className="block h-full">
                                    <div className="h-full bg-card/50 backdrop-blur-sm border border-neutral-800 rounded-xl overflow-hidden transition-all duration-300 group-hover:border-f1-red group-hover:-translate-y-2 group-hover:shadow-[0_0_40px_rgba(225,6,0,0.15)]">
                                        {/* Card Header Stripe */}
                                        <div className="h-1 w-full bg-gradient-to-r from-f1-red via-red-500 to-transparent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                                        <div className="p-4 sm:p-6 flex flex-col h-full">
                                            {/* Position Badge & Arrow */}
                                            <div className="flex justify-between items-start mb-3 sm:mb-4">
                                                <div className="flex items-center gap-2 sm:gap-3">
                                                    <motion.span
                                                        whileHover={{ scale: 1.1 }}
                                                        className="text-xs font-mono text-neutral-600 group-hover:text-f1-red transition-colors border border-neutral-800 px-1.5 sm:px-2 py-0.5 rounded"
                                                    >
                                                        #{String(index + 1).padStart(2, '0')}
                                                    </motion.span>
                                                    {index < 3 && (
                                                        <span className="text-[10px] bg-f1-red/20 text-f1-red px-1.5 sm:px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                                                            Top
                                                        </span>
                                                    )}
                                                </div>
                                                <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-f1-red transition-all opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                            </div>

                                            {/* Project Name */}
                                            <h3 className="text-lg sm:text-xl font-bold font-display text-white mb-2 group-hover:text-f1-red transition-colors line-clamp-1">
                                                {repo.name}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-neutral-400 text-xs sm:text-sm line-clamp-2 mb-4 sm:mb-6 flex-grow font-light">
                                                {repo.description || "Experimental prototype. Data classified."}
                                            </p>

                                            {/* Topics */}
                                            {repo.topics && repo.topics.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                                                    {repo.topics.slice(0, 3).map((topic) => (
                                                        <span
                                                            key={topic}
                                                            className="text-[10px] sm:text-xs bg-neutral-800/50 text-neutral-400 px-2 py-0.5 rounded-full"
                                                        >
                                                            {topic}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Stats Footer */}
                                            <div className="flex items-center justify-between text-xs text-neutral-500 pt-3 sm:pt-4 border-t border-neutral-800 border-dashed">
                                                <div className="flex items-center gap-1.5 font-mono">
                                                    {repo.language && (
                                                        <span className="flex items-center gap-1">
                                                            <Code2 className="w-3 h-3" />
                                                            <span className="hidden sm:inline">{repo.language}</span>
                                                            <span className="sm:hidden">{repo.language.slice(0, 3)}</span>
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-2 sm:gap-3 font-mono">
                                                    <span className="flex items-center gap-1" title="Stars">
                                                        <Star className="w-3 h-3 group-hover:text-yellow-500 transition-colors" />
                                                        {repo.stargazers_count}
                                                    </span>
                                                    <span className="flex items-center gap-1" title="Forks">
                                                        <GitFork className="w-3 h-3" />
                                                        {repo.forks_count}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hover Glow Effect */}
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-f1-red/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1/2 translate-x-1/2" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </section>

            {/* Footer CTA */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="relative z-10 py-16 sm:py-20 md:py-24 border-t border-neutral-800"
            >
                <div className="container mx-auto px-4 text-center">
                    <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-f1-red mx-auto mb-4" />
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold uppercase italic mb-4">
                        Want to see more?
                    </h2>
                    <p className="text-neutral-400 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">
                        Check out my GitHub profile for all my projects and contributions.
                    </p>
                    <a
                        href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME || "ryusaaa"}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block group relative px-6 sm:px-8 py-3 sm:py-4 bg-f1-red text-white font-bold skew-x-[-12deg] hover:bg-red-700 transition-all shadow-[0_0_20px_rgba(225,6,0,0.3)] hover:shadow-[0_0_40px_rgba(225,6,0,0.5)] overflow-hidden"
                    >
                        <span className="block skew-x-[12deg] tracking-wider text-sm sm:text-base">
                            VIEW GITHUB PROFILE
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out" />
                    </a>
                </div>
            </motion.section>
        </main>
    );
}
