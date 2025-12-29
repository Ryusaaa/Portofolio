import { EXPERIENCE_DATA } from "@/lib/data";

export function ExperienceSection() {
    return (
        <div className="flex flex-col">
            {EXPERIENCE_DATA.map((item) => (
                <div
                    key={item.id}
                    className="border-t border-white/10 py-12 flex flex-col md:flex-row gap-8 md:gap-16 hover:bg-neutral-900/30 transition-colors px-4 md:px-8"
                >
                    {/* Role & Company */}
                    <div className="md:w-1/3">
                        <h3 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight mb-2 text-white">
                            {item.role}
                        </h3>
                        <p className="text-f1-red font-bold uppercase tracking-wider text-sm md:text-base mb-1">
                            {item.company}
                        </p>
                        <p className="text-neutral-500 font-mono text-xs md:text-sm uppercase">
                            {item.period}
                        </p>
                    </div>

                    {/* Description */}
                    <div className="md:w-2/3">
                        <p className="text-neutral-300 leading-relaxed">
                            {item.description}
                        </p>
                        <div className="mt-4 inline-block text-xs font-mono uppercase bg-white/5 px-2 py-1 rounded text-neutral-400">
                            {item.type}
                        </div>
                    </div>
                </div>
            ))}
            <div className="border-t border-white/10" />
        </div>
    );
}
