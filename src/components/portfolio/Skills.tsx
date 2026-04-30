import { skills } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

export function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-28 bg-secondary/40">
      <div className="container mx-auto px-6 relative">
        <SectionTitle
          title="Skills"
          description="Crafting seamless interfaces, robust backends & intelligent systems."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skills.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.06}>
              <div className="card-pop h-full p-6">
                <div className="flex items-center gap-3">
                  <div className="ink-chip h-9 w-9">
                    <group.icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-base font-bold text-ink">
                    {group.category}
                  </h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((it) => (
                    <span
                      key={it}
                      className="rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs font-medium text-ink-soft hover:text-ink hover:border-ink/30 transition-colors cursor-default"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
