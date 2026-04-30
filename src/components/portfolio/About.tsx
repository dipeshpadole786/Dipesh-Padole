import { services, approach, stats } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import { Counter } from "./Counter";

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-28">
      <div className="container mx-auto px-6">
        {/* Services-style grid (matches reference) */}
        <SectionTitle
          title="Services"
          description="Designing clean, scalable & responsive digital experiences."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <article className="card-pop h-full p-6 flex flex-col">
                <div className="ink-chip h-11 w-11">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-lg font-bold leading-tight text-ink">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed flex-1">
                  {s.desc}
                </p>
                <div className="mt-5 space-y-2">
                  {s.chips.map((c) => (
                    <div
                      key={c}
                      className="rounded-xl border border-border bg-secondary/50 px-3.5 py-2 text-xs font-medium text-ink-soft"
                    >
                      {c}
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* About Me */}
        <div className="mt-24 max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-ink">
              About Me
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-ink-soft leading-relaxed">
              I'm an Artificial Intelligence &amp; Data Science student at YCCE Nagpur
              with strong experience in Full Stack Web Development, AI-powered
              applications, and IoT systems. I enjoy building real-world solutions
              that combine software, automation, and intelligent systems.
            </p>
          </Reveal>
        </div>

        {/* My Approach (numbered cards — matches reference) */}
        <div className="mt-12">
          <Reveal>
            <h3 className="text-center text-2xl md:text-3xl font-bold text-ink">
              My Approach
            </h3>
          </Reveal>
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {approach.map((a, i) => (
              <Reveal key={a.step} delay={i * 0.08}>
                <div className="card-pop p-5 flex items-center gap-4">
                  <div className="ink-chip h-12 w-12 font-bold text-base">
                    {a.step}
                  </div>
                  <div>
                    <div className="text-base font-semibold text-ink">
                      {a.title}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Stats */}
        <Reveal>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-ink">
                  <Counter
                    value={s.value}
                    suffix={s.suffix}
                    decimals={s.decimals ?? 0}
                  />
                </div>
                <div className="mt-1.5 text-xs md:text-sm text-ink-soft uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
