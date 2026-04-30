import { motion } from "framer-motion";
import { ArrowRight, Download, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import { personal, socials } from "@/lib/portfolio-data";
import portrait from "@/assets/final.png";

const ROLES = [
  "Full Stack Developer & AI Builder",
  "MERN Engineer",
  "AI & IoT Innovator",
];

function Typewriter() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[idx];
    const speed = deleting ? 35 : 75;
    const t = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDeleting(true), 1600);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setIdx((i) => (i + 1) % ROLES.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, idx]);

  return (
    <span>
      {text}
      <span className="cursor-blink text-ink-soft">|</span>
    </span>
  );
}

export function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative pt-20 md:pt-24 pb-10 md:pb-14 overflow-hidden"
    >
      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-ink" />
              {personal.intro}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-5 text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[0.95] text-ink"
            >
              Dipesh
              <br />
              Padole
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-xl md:text-2xl font-semibold text-ink leading-tight"
            >
              AI &amp; Data Science Student
              <br />
              <span className="text-ink-soft">
                <Typewriter />
              </span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-5 max-w-md text-base text-ink-soft leading-relaxed"
            >
              {personal.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <button
                onClick={() => scrollTo("projects")}
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:scale-[1.03] transition-transform"
              >
                View Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href={personal.resume}
                className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-6 py-3.5 text-sm font-semibold text-ink hover:border-ink/30 transition-colors"
              >
                Download Resume
                <Download className="h-4 w-4" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-8 flex items-center gap-3"
            >
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-ink-soft hover:text-ink hover:border-ink/30 transition-colors"
                >
                  <s.icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right — portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md"
          >
            {/* Decorative ring + dotted bg */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center">
              <div className="h-[110%] w-[110%] rounded-full dotted-bg opacity-60" />
            </div>
            <div className="absolute inset-6 -z-10 rounded-full border border-border animate-spin-slow" />

            <div className="relative">
              <img
                src={portrait}
                alt="Dipesh Padole — AI & Full Stack Developer"
                width={1024}
                height={1024}
                className="relative w-full max-h-[520px] md:max-h-[560px] h-auto object-contain select-none pointer-events-none"
              />

              {/* Floating CGPA card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 -right-2 md:right-4 card-pop rounded-2xl px-5 py-4 text-center min-w-[120px]"
              >
                <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-ink text-primary-foreground">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-widest text-ink-soft">
                  CGPA
                </div>
                <div className="mt-0.5 text-3xl font-extrabold text-ink leading-none">
                  9.62
                </div>
                <div className="mt-1 text-[11px] text-ink-soft">(Till Sem 3)</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
