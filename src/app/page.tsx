import { getProfile, getRepos, getRecentActivity } from "@/lib/github";
import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { RaceDashboard } from "@/components/race-dashboard";

export const revalidate = 3600; // ISR for the page

export default async function Home() {
  const [profile, repos, activity] = await Promise.all([
    getProfile(),
    getRepos(),
    getRecentActivity()
  ]);

  // Sort by stars descending
  const sortedRepos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count);

  return (
    <main className="min-h-screen bg-f1-dark relative selection:bg-f1-red selection:text-white pb-0">
      <Hero profile={profile} />

      {/* Projects Grid */}
      <section id="projects" className="py-24 container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter italic">
            <span className="text-f1-red mr-2">///</span> Garage
          </h2>
          <p className="text-neutral-500 font-mono mt-2 text-sm md:text-base">
            System Status: ALL SYSTEMS GO
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedRepos.map((repo, index) => (
            <ProjectCard key={repo.id} repo={repo} index={index} />
          ))}
        </div>
      </section>

      {/* Race Dashboard Section */}
      <section className="py-24 bg-neutral-900/40 border-t border-neutral-800 relative z-10">
        <div className="container mx-auto px-4">
          <RaceDashboard activity={activity} />
        </div>
      </section>
    </main>
  );
}
