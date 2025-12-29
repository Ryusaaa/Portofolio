
import { getProfile, getRepos, getRecentActivity } from "@/lib/github";
import { Hero } from "@/components/hero";
import { ProjectList } from "@/components/project-list";
import { ExperienceSection } from "@/components/experience-section";
import { ProjectShowcase } from "@/components/project-showcase";
import { ABOUT_DATA } from "@/lib/data";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";

export const revalidate = 3600; // ISR for the page

export default async function Home() {
  const [profile, repos] = await Promise.all([
    getProfile(),
    getRepos(),
  ]);

  // Sort by stars descending
  const sortedRepos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count);

  return (
    <div className="min-h-screen bg-f1-dark pb-0">
      <Hero profile={profile} />

      {/* 02 - About Section */}
      <section id="about" className="py-24 md:py-32 container mx-auto px-6">
        <FadeIn>
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            <div className="md:w-1/4">
              <span className="text-f1-red font-mono text-xl font-bold">02</span>
            </div>
            <div className="md:w-3/4">
              <h2 className="text-3xl md:text-5xl font-display font-medium uppercase tracking-tight leading-tight mb-8">
                {ABOUT_DATA.title}
              </h2>
              <div className="space-y-6 text-lg md:text-xl text-neutral-400 leading-relaxed max-w-2xl">
                <p>{ABOUT_DATA.description}</p>
                <p>{ABOUT_DATA.subDescription}</p>
              </div>

              <div className="mt-12">
                <Link
                  href="#projects"
                  className="inline-block text-white border-b border-f1-red pb-1 font-mono uppercase text-sm hover:text-f1-red transition-colors"
                >
                  View Projects
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 03 - Projects Section */}
      <section id="projects" className="py-24 md:py-32 container mx-auto px-6">
        <FadeIn delay={0.2}>
          <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-16">
            <div className="md:w-1/4">
              <span className="text-f1-red font-mono text-xl font-bold">03</span>
            </div>
            <div className="md:w-3/4">
              <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter">
                Selected <span className="text-neutral-500">Works</span>
              </h2>
            </div>
          </div>

          <ProjectShowcase />

          <div className="mt-32 mb-16 border-t border-white/10 pt-16">
            <h3 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight mb-8 text-neutral-500">
              Open Source / Repositories
            </h3>
            <ProjectList repos={sortedRepos} />
          </div>

          <div className="flex justify-end mt-12">
            <Link
              href="https://github.com/Ryusaaa?tab=repositories"
              target="_blank"
              className="text-white font-mono uppercase text-sm border border-white/20 px-6 py-3 hover:bg-white hover:text-black transition-all"
            >
              View All Repositories
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* 04 - Experience Section */}
      <section id="experience" className="py-24 md:py-32 container mx-auto px-6">
        <FadeIn delay={0.2}>
          <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-16">
            <div className="md:w-1/4">
              <span className="text-f1-red font-mono text-xl font-bold">04</span>
            </div>
            <div className="md:w-3/4">
              <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter">
                Expe<span className="text-neutral-500">rience</span>
              </h2>
            </div>
          </div>

          <ExperienceSection />
        </FadeIn>
      </section>
    </div>
  );
}
