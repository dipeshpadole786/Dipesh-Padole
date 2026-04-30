import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

export function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-28">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Projects"
          description="A mix of full-stack, AI, and IoT work shipped recently."
        />

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <article className="card-pop h-full overflow-hidden flex flex-col">
                <div className="relative h-44 bg-secondary border-b border-border overflow-hidden">
                  <div className="absolute inset-0 dotted-bg opacity-70" />
                  <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                    <div className="font-display text-2xl font-extrabold tracking-tight text-ink leading-tight">
                      {p.title}
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-sm text-ink-soft leading-relaxed">
                    {p.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-[11px] font-medium text-ink-soft"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-2.5 pt-4 border-t border-border">
                    <a
                      href={p.github}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-ink hover:border-ink/30 transition"
                    >
                      <Github className="h-3.5 w-3.5" /> GitHub
                    </a>
                    <a
                      href={p.demo}
                      className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-primary-foreground hover:scale-[1.04] transition-transform"
                    >
                      Live Demo <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
