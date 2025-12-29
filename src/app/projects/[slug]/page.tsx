import { getRepo, getRepos } from "@/lib/github";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { ArrowLeft, ExternalLink, GitFork, Star, ArrowUpRight, Code2, Calendar, Zap, Target, Rocket, Wrench } from "lucide-react";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

// Allow dynamic params - pages will be generated on-demand if not pre-built
export const dynamicParams = true;

export async function generateStaticParams() {
    try {
        const repos = await getRepos();
        return repos.map((repo) => ({
            slug: repo.name,
        }));
    } catch (error) {
        console.error("Failed to generate static params:", error);
        // Return empty array - pages will be generated on-demand
        return [];
    }
}

// Generate project description based on repo data
function generateProjectDescription(repo: any): {
    overview: string;
    features: string[];
    techHighlights: string[];
    purpose: string;
} {
    const name = repo.name || "Project";
    const language = repo.language || "Various technologies";
    const description = repo.description || "";
    const topics = repo.topics || [];

    // Determine project type based on language and topics
    const isWebProject = ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'Vue', 'PHP'].includes(language) ||
        topics.some((t: string) => ['react', 'nextjs', 'vue', 'angular', 'web', 'frontend', 'backend'].includes(t.toLowerCase()));
    const isMobileProject = ['Kotlin', 'Swift', 'Dart', 'Java'].includes(language) ||
        topics.some((t: string) => ['android', 'ios', 'flutter', 'mobile', 'react-native'].includes(t.toLowerCase()));
    const isGameProject = ['C#', 'C++', 'GDScript'].includes(language) ||
        topics.some((t: string) => ['game', 'unity', 'godot', 'unreal', 'gamedev'].includes(t.toLowerCase()));
    const isAPIProject = topics.some((t: string) => ['api', 'rest', 'graphql', 'backend', 'server'].includes(t.toLowerCase()));
    const isToolProject = topics.some((t: string) => ['cli', 'tool', 'utility', 'automation', 'script'].includes(t.toLowerCase()));

    // Generate overview
    let overview = "";
    if (isWebProject) {
        overview = `${name} is a web application built with ${language}. ${description ? description + '.' : ''} This project showcases modern web development practices and demonstrates proficiency in creating responsive, user-friendly interfaces.`;
    } else if (isMobileProject) {
        overview = `${name} is a mobile application developed using ${language}. ${description ? description + '.' : ''} This project demonstrates cross-platform development skills and mobile UI/UX best practices.`;
    } else if (isGameProject) {
        overview = `${name} is an interactive game project created with ${language}. ${description ? description + '.' : ''} This project combines creative design with technical game development skills.`;
    } else if (isAPIProject) {
        overview = `${name} is a backend service/API built with ${language}. ${description ? description + '.' : ''} This project demonstrates server-side development and data management capabilities.`;
    } else if (isToolProject) {
        overview = `${name} is a utility tool developed in ${language}. ${description ? description + '.' : ''} This project focuses on automation and improving developer productivity.`;
    } else {
        overview = `${name} is a project developed using ${language}. ${description ? description + '.' : ''} This repository showcases various programming concepts and problem-solving approaches.`;
    }

    // Generate features based on topics and language
    const features: string[] = [];

    if (topics.includes('typescript') || language === 'TypeScript') {
        features.push("Type-safe codebase with TypeScript for better developer experience");
    }
    if (topics.includes('react') || topics.includes('nextjs')) {
        features.push("Built with React/Next.js for optimal performance and SEO");
    }
    if (topics.includes('tailwindcss') || topics.includes('tailwind')) {
        features.push("Styled with Tailwind CSS for rapid UI development");
    }
    if (topics.includes('docker') || topics.includes('containerization')) {
        features.push("Containerized with Docker for easy deployment");
    }
    if (topics.includes('testing') || topics.includes('jest') || topics.includes('cypress')) {
        features.push("Comprehensive test coverage for reliability");
    }
    if (topics.includes('api') || topics.includes('rest')) {
        features.push("RESTful API design for scalable architecture");
    }
    if (repo.homepage) {
        features.push("Live demo available for immediate preview");
    }

    // Add generic features based on repo stats
    if (repo.stargazers_count > 0) {
        features.push(`Community validated with ${repo.stargazers_count} stars`);
    }
    if (repo.forks_count > 0) {
        features.push(`Open source with ${repo.forks_count} forks`);
    }

    // Ensure at least 3 features
    const defaultFeatures = [
        "Clean and maintainable code architecture",
        "Well-documented for easy understanding",
        "Actively maintained and updated",
        "Follows industry best practices",
        "Modular design for scalability"
    ];

    while (features.length < 3) {
        features.push(defaultFeatures[features.length]);
    }

    // Tech highlights
    const techHighlights: string[] = [];
    techHighlights.push(`Primary Language: ${language}`);

    if (topics.length > 0) {
        techHighlights.push(`Technologies: ${topics.slice(0, 5).join(', ')}`);
    }

    const createdDate = new Date(repo.created_at);
    const updatedDate = new Date(repo.updated_at);
    const monthsActive = Math.floor((updatedDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24 * 30));

    if (monthsActive > 0) {
        techHighlights.push(`Development Period: ${monthsActive} month${monthsActive > 1 ? 's' : ''} of active development`);
    }

    techHighlights.push(`Last Updated: ${formatDistanceToNow(updatedDate, { addSuffix: true })}`);

    // Purpose statement
    let purpose = "";
    if (isWebProject) {
        purpose = "This project was created to solve real-world problems through intuitive web interfaces and modern development practices.";
    } else if (isMobileProject) {
        purpose = "Developed to explore mobile development paradigms and create seamless user experiences on handheld devices.";
    } else if (isGameProject) {
        purpose = "Built as an exploration of game mechanics, interactive storytelling, and entertainment technology.";
    } else if (isToolProject) {
        purpose = "Created to automate repetitive tasks and enhance productivity in the development workflow.";
    } else {
        purpose = "This project represents a journey of learning, experimentation, and applying programming concepts to practical scenarios.";
    }

    return { overview, features: features.slice(0, 5), techHighlights, purpose };
}

export default async function ProjectPage({ params }: PageProps) {
    const { slug } = await params;

    if (!slug) return notFound();

    const repo = await getRepo(slug);

    if (!repo || (repo as any).message === "Not Found") {
        return notFound();
    }

    const projectInfo = generateProjectDescription(repo);

    return (
        <main className="min-h-screen bg-f1-dark text-foreground pb-20">
            {/* Header / Hero for Project */}
            <div className="relative border-b border-neutral-800 bg-neutral-900/50">
                <div className="absolute inset-0 bg-checkered opacity-5 pointer-events-none" />

                <div className="container mx-auto px-4 py-12 sm:py-16 relative z-10">
                    <Link href="/projects" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-6 sm:mb-8 transition-colors group text-sm sm:text-base">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Garage
                    </Link>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <span className="text-f1-red font-mono text-xs sm:text-sm tracking-widest uppercase font-bold">Project Telemetry</span>
                                <div className="h-px bg-f1-red w-8 sm:w-12" />
                            </div>
                            <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold text-white mb-4 uppercase italic tracking-tighter">
                                {repo.name}
                            </h1>
                            <p className="text-base sm:text-xl text-neutral-400 max-w-2xl font-light">
                                {repo.description || "A unique project showcasing innovative solutions"}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3 sm:gap-4">
                            {repo.homepage && (
                                <a
                                    href={repo.homepage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 sm:px-6 py-2 sm:py-3 bg-f1-red text-white font-bold skew-x-[-10deg] hover:bg-red-700 transition shadow-[0_0_15px_rgba(225,6,0,0.3)] hover:shadow-[0_0_30px_rgba(225,6,0,0.5)]"
                                >
                                    <span className="block skew-x-[10deg] flex items-center gap-2 text-sm sm:text-base">
                                        Live Demo <ArrowUpRight className="w-4 h-4" />
                                    </span>
                                </a>
                            )}
                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 sm:px-6 py-2 sm:py-3 border border-neutral-700 text-white font-bold skew-x-[-10deg] hover:bg-white/10 transition"
                            >
                                <span className="block skew-x-[10deg] flex items-center gap-2 text-sm sm:text-base">
                                    <ExternalLink className="w-4 h-4" /> GitHub
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-4 gap-8 sm:gap-12">
                {/* Sidebar Stats */}
                <div className="lg:col-span-1 space-y-6 sm:space-y-8">
                    <div className="p-4 sm:p-6 border border-neutral-800 rounded-lg bg-card/30 lg:sticky lg:top-8">
                        <h3 className="font-display font-bold text-white text-base sm:text-lg mb-4 uppercase border-b border-neutral-800 pb-2">Specs</h3>
                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-neutral-500">Stars</span>
                                <span className="flex items-center gap-1 text-white font-mono"><Star className="w-3 h-3 text-yellow-500" /> {repo.stargazers_count}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-neutral-500">Forks</span>
                                <span className="flex items-center gap-1 text-white font-mono"><GitFork className="w-3 h-3" /> {repo.forks_count}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-neutral-500">Language</span>
                                <span className="flex items-center gap-1 text-white font-mono"><Code2 className="w-3 h-3 text-f1-red" /> {repo.language || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-neutral-500">Updated</span>
                                <span className="text-white font-mono text-xs" suppressHydrationWarning>{formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true })}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-neutral-500">Created</span>
                                <span className="text-white font-mono text-xs" suppressHydrationWarning>{formatDistanceToNow(new Date(repo.created_at), { addSuffix: true })}</span>
                            </div>
                        </div>

                        {/* Topics */}
                        {repo.topics && repo.topics.length > 0 && (
                            <div className="mt-6 pt-4 border-t border-neutral-800">
                                <h4 className="text-xs text-neutral-500 uppercase tracking-wider mb-3">Topics</h4>
                                <div className="flex flex-wrap gap-2">
                                    {repo.topics.map((topic: string) => (
                                        <span key={topic} className="text-xs bg-f1-red/10 text-f1-red px-2 py-1 rounded">
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content - Generated Description */}
                <div className="lg:col-span-3 space-y-8 sm:space-y-12">
                    {/* Overview Section */}
                    <section>
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <div className="p-2 bg-f1-red/10 rounded-lg">
                                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-f1-red" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-display font-bold uppercase text-white">Overview</h2>
                        </div>
                        <div className="bg-card/30 border border-neutral-800 rounded-xl p-4 sm:p-6">
                            <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                                {projectInfo.overview}
                            </p>
                        </div>
                    </section>

                    {/* Purpose Section */}
                    <section>
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <div className="p-2 bg-purple-500/10 rounded-lg">
                                <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-display font-bold uppercase text-white">Purpose</h2>
                        </div>
                        <div className="bg-card/30 border border-neutral-800 rounded-xl p-4 sm:p-6">
                            <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                                {projectInfo.purpose}
                            </p>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section>
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <div className="p-2 bg-green-500/10 rounded-lg">
                                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-display font-bold uppercase text-white">Key Features</h2>
                        </div>
                        <div className="grid gap-3 sm:gap-4">
                            {projectInfo.features.map((feature, index) => (
                                <div key={index} className="bg-card/30 border border-neutral-800 rounded-xl p-4 sm:p-5 flex items-start gap-3 sm:gap-4 hover:border-green-500/30 transition-colors">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500/10 rounded-lg flex items-center justify-center shrink-0">
                                        <span className="text-green-500 font-bold text-xs sm:text-sm">{index + 1}</span>
                                    </div>
                                    <p className="text-neutral-300 text-sm sm:text-base">{feature}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Tech Highlights Section */}
                    <section>
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <div className="p-2 bg-yellow-500/10 rounded-lg">
                                <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-display font-bold uppercase text-white">Technical Details</h2>
                        </div>
                        <div className="bg-card/30 border border-neutral-800 rounded-xl p-4 sm:p-6">
                            <div className="space-y-3 sm:space-y-4">
                                {projectInfo.techHighlights.map((highlight, index) => (
                                    <div key={index} className="flex items-center gap-3 text-sm sm:text-base">
                                        <div className="w-2 h-2 bg-yellow-500 rounded-full shrink-0" />
                                        <span className="text-neutral-300" suppressHydrationWarning={highlight.includes('Updated') || highlight.includes('Period')}>
                                            {highlight}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Call to Action */}
                    <section className="bg-gradient-to-r from-f1-red/10 to-purple-500/10 border border-neutral-800 rounded-xl p-6 sm:p-8 text-center">
                        <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-3">Interested in this project?</h3>
                        <p className="text-neutral-400 mb-6 text-sm sm:text-base">
                            Check out the source code on GitHub or view the live demo to see it in action.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-3 bg-white text-neutral-900 font-bold rounded-lg hover:bg-neutral-200 transition text-sm sm:text-base"
                            >
                                <ExternalLink className="w-4 h-4" />
                                View Source Code
                            </a>
                            {repo.homepage && (
                                <a
                                    href={repo.homepage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-3 bg-f1-red text-white font-bold rounded-lg hover:bg-red-700 transition text-sm sm:text-base"
                                >
                                    <Rocket className="w-4 h-4" />
                                    Live Demo
                                </a>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
