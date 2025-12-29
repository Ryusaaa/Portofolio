import { getRepo, getRepoReadme, getRepos } from "@/lib/github";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { ArrowLeft, ExternalLink, GitFork, Star, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
    const repos = await getRepos();
    return repos.map((repo) => ({
        slug: repo.name,
    }));
}

export default async function ProjectPage({ params }: PageProps) {
    const { slug } = await params;

    if (!slug) return notFound();

    // Parallel fetch
    const repoData = getRepo(slug);
    const readmeData = getRepoReadme(slug);

    const [repo, readme] = await Promise.all([repoData, readmeData]);

    if (!repo || (repo as any).message === "Not Found") {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-f1-dark text-foreground pb-20">
            {/* Header / Hero for Project */}
            <div className="relative border-b border-neutral-800 bg-neutral-900/50">
                <div className="absolute inset-0 bg-checkered opacity-5 pointer-events-none" />

                <div className="container mx-auto px-4 py-16 relative z-10">
                    <Link href="/#projects" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-8 transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Garage
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <span className="text-f1-red font-mono text-sm tracking-widest uppercase font-bold">Project Telemetry</span>
                                <div className="h-px bg-f1-red w-12" />
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4 uppercase italic tracking-tighter">
                                {repo.name}
                            </h1>
                            <p className="text-xl text-neutral-400 max-w-2xl font-light">
                                {repo.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {repo.homepage && (
                                <a
                                    href={repo.homepage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-f1-red text-white font-bold skew-x-[-10deg] hover:bg-red-700 transition shadow-[0_0_15px_rgba(225,6,0,0.3)] hover:shadow-[0_0_30px_rgba(225,6,0,0.5)]"
                                >
                                    <span className="block skew-x-[10deg] flex items-center gap-2">
                                        Live Demo <ArrowUpRight className="w-4 h-4" />
                                    </span>
                                </a>
                            )}
                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 border border-neutral-700 text-white font-bold skew-x-[-10deg] hover:bg-white/10 transition"
                            >
                                <span className="block skew-x-[10deg] flex items-center gap-2">
                                    <ExternalLink className="w-4 h-4" /> GitHub
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Sidebar Stats */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="p-6 border border-neutral-800 rounded-lg bg-card/30 sticky top-8">
                        <h3 className="font-display font-bold text-white text-lg mb-4 uppercase border-b border-neutral-800 pb-2">Specs</h3>
                        <div className="space-y-4">
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
                                <span className="text-white font-mono">{repo.language}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-neutral-500">Updated</span>
                                <span className="text-white font-mono">{formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true })}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content (README) */}
                <div className="lg:col-span-3">
                    <div className="prose prose-invert prose-neutral max-w-none prose-headings:font-display prose-headings:uppercase prose-a:text-f1-red prose-img:rounded-xl">
                        {readme ? (
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {readme}
                            </ReactMarkdown>
                        ) : (
                            <div className="border border-dashed border-neutral-800 rounded-xl p-12 text-center">
                                <p className="text-neutral-500 italic">No detailed telemetry (README) available for this session.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
