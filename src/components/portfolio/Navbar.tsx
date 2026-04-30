import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { navItems } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      let current = "home";
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 140) {
          current = item.id;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "py-3 bg-background/80 backdrop-blur-xl border-b border-border" : "py-5",
      )}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between gap-4">
        <button
          onClick={() => go("home")}
          className="flex items-center gap-2.5 group"
          aria-label="Dipesh Padole — Home"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-primary-foreground font-bold text-sm tracking-tight">
            DP
          </span>
          <span className="font-display font-bold text-lg tracking-tight text-ink">
            Dipesh Padole
          </span>
        </button>

        <ul className="hidden lg:flex items-center gap-1 card-soft rounded-full px-1.5 py-1.5">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => go(item.id)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-full transition-colors",
                  active === item.id ? "text-primary-foreground" : "text-ink-soft hover:text-ink",
                )}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-ink-soft hover:text-ink hover:border-ink/30 transition-colors"
          >
            {mounted ? (
              theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )
            ) : (
              <span className="h-5 w-5" />
            )}
          </button>
          <Link
            to="/dipeshbot"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:scale-[1.03] transition-transform"
          >
            Let's Talk
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden card-soft rounded-full p-2.5"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mx-6 mt-3 card-soft rounded-3xl p-3"
          >
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="mb-2 w-full flex items-center justify-between rounded-2xl border border-border bg-secondary/40 px-4 py-3 text-sm font-medium text-ink-soft hover:text-ink hover:border-ink/30 transition-colors"
            >
              <span>{mounted ? (theme === "dark" ? "Light mode" : "Dark mode") : "Theme"}</span>
              {mounted ? (
                theme === "dark" ? (
                  <Sun className="h-4.5 w-4.5" />
                ) : (
                  <Moon className="h-4.5 w-4.5" />
                )
              ) : (
                <span className="h-4.5 w-4.5" />
              )}
            </button>
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => go(item.id)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-2xl text-sm font-medium transition-colors",
                      active === item.id
                        ? "bg-ink text-primary-foreground"
                        : "text-ink-soft hover:bg-secondary",
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <Link
                  to="/dipeshbot"
                  onClick={() => setOpen(false)}
                  className="mt-2 block w-full rounded-2xl bg-ink text-primary-foreground px-4 py-3 text-sm font-semibold text-center"
                >
                  Let's Talk
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
