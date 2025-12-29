import Link from "next/link";
import { GithubRepo } from "@/lib/github";

interface ProjectListProps {
    repos: GithubRepo[];
}

export function ProjectList({ repos }: ProjectListProps) {
    // Use only top 6 repos to keep it clean, or map all if preferred
    const displayRepos = repos.slice(0, 6);

    return (
        <div className="flex flex-col">
            {displayRepos.map((repo, index) => (
                <Link
                    href={repo.html_url}
                    key={repo.id}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group border-t border-white/10 py-12 flex flex-col md:flex-row md:items-center justify-between hover:bg-neutral-900/50 transition-all duration-500 px-4 md:px-8"
                >
                    {/* Left: Title & Description */}
                    <div className="md:w-2/3">
                        <h3 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tighter mb-4 group-hover:text-f1-red transition-colors duration-300">
                            {repo.name.replace(/-/g, ' ')}
                        </h3>
                        <p className="text-neutral-400 font-mono text-sm md:text-base max-w-xl">
                            {repo.description || "No description available."}
                        </p>
                    </div>

                    {/* Right: Tags & Arrow */}
                    <div className="mt-8 md:mt-0 flex flex-col items-start md:items-end gap-4">
                        <div className="flex gap-2 flex-wrap justify-end">
                            {repo.topics.slice(0, 3).map(topic => (
                                <span key={topic} className="text-xs font-mono uppercase border border-white/20 px-2 py-1 rounded text-neutral-500">
                                    {topic}
                                </span>
                            ))}
                        </div>
                        <span className="hidden md:inline-block transform group-hover:translate-x-4 transition-transform duration-300 text-f1-red text-4xl">
                            →
                        </span>
                    </div>
                </Link>
            ))}
            <div className="border-t border-white/10" />
        </div>
    );
}
