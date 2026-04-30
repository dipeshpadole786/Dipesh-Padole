import { socials } from "@/lib/portfolio-data";

export function Footer() {
  return (
    <footer className="relative border-t border-border py-10 bg-background">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-ink-soft">
          Built by <span className="text-ink font-semibold">Dipesh Padole</span>{" "}
          © 2026
        </p>
        <div className="flex items-center gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-ink-soft hover:text-ink hover:border-ink/30 transition"
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
