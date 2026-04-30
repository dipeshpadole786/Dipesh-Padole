import { education, experience } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

export function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-28 bg-secondary/40">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Experience & Education"
          description="Academic foundation paired with real-world internship experience."
        />

        <div className="grid lg:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {/* Education */}
          <Reveal>
            <div className="card-pop p-7 h-full">
              <div className="flex items-start gap-4">
                <div className="ink-chip h-11 w-11">
                  <education.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-ink-soft">
                    Education
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-ink">
                    {education.school}
                  </h3>
                  <p className="text-sm text-ink-soft">{education.degree}</p>
                  <p className="mt-1 text-xs text-ink-soft">{education.duration}</p>
                </div>
              </div>

              <div className="mt-6 space-y-2.5">
                {education.semesters.map((s) => (
                  <div
                    key={s.sem}
                    className="flex items-center justify-between rounded-2xl border border-border bg-secondary/40 px-4 py-3"
                  >
                    <span className="text-sm text-ink-soft">{s.sem}</span>
                    <span className="font-bold text-ink">{s.cgpa} CGPA</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Experience */}
          <Reveal delay={0.1}>
            <div className="card-pop p-7 h-full">
              <div className="flex items-start gap-4">
                <div className="ink-chip h-11 w-11">
                  <experience.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-ink-soft">
                    Experience
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-ink">
                    {experience.role}
                  </h3>
                  <p className="text-sm text-ink-soft">{experience.company}</p>
                  <p className="mt-1 text-xs text-ink-soft">{experience.date}</p>
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-border bg-secondary/40 p-5">
                <p className="text-sm text-ink-soft leading-relaxed">
                  Worked on production-grade frontend modules using React.js,
                  focused on responsive UI, performance, and component reusability —
                  shipping features under tight deadlines.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
