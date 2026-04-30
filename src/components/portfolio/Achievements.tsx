import { achievements } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

export function Achievements() {
  return (
    <section id="achievements" className="relative py-24 md:py-28">
      <div className="container mx-auto px-6 relative">
        <SectionTitle
          title="Achievements"
          description="Recognition from hackathons, academics, and problem solving."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {achievements.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.05}>
              <div className="card-pop p-5 h-full flex items-start gap-4">
                <div className="ink-chip h-11 w-11 shrink-0">
                  <a.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-ink text-sm leading-snug">
                    {a.title}
                  </h4>
                  <p className="text-xs text-ink-soft mt-1">{a.year}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
