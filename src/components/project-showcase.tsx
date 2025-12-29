"use client";

import Image from "next/image";
import { PROJECTS_DATA } from "@/lib/data";
import { FadeIn } from "./ui/fade-in";
import Link from "next/link";

export function ProjectShowcase() {
    return (
        <div className="flex flex-col gap-24 md:gap-32">
            {PROJECTS_DATA.map((project, index) => (
                <FadeIn key={project.id} delay={index * 0.1}>
                    <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center`}>

                        {/* Image Section */}
                        <div className="w-full md:w-3/5 relative aspect-video group overflow-hidden rounded-sm border border-white/10">
                            <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Content Section */}
                        <div className="w-full md:w-2/5 flex flex-col justify-center">
                            <span className="text-f1-red font-mono text-sm uppercase mb-2 tracking-widest">
                                {project.type} — {project.year}
                            </span>
                            <h3 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tighter mb-6 leading-none">
                                {project.title}
                            </h3>
                            <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-xs font-mono uppercase border border-white/20 px-3 py-1 rounded-full text-neutral-500">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {project.link && (
                                <Link
                                    href={project.link}
                                    className="text-white font-mono uppercase text-sm border-b border-f1-red pb-1 w-fit hover:text-f1-red transition-colors"
                                >
                                    View Project
                                </Link>
                            )}
                        </div>
                    </div>
                </FadeIn>
            ))}
        </div>
    );
}
