import { useState } from "react";
import { Send, MessageCircle } from "lucide-react";
import { contactInfo, personal } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import { DipeshBotChat } from "./DipeshBotChat";
import { toast } from "sonner";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }
    setSending(true);
    const body = `Hi Dipesh,%0D%0A%0D%0A${encodeURIComponent(form.message)}%0D%0A%0D%0A— ${encodeURIComponent(form.name)} (${encodeURIComponent(form.email)})`;
    window.location.href = `mailto:${personal.email}?subject=Portfolio%20Contact%20from%20${encodeURIComponent(form.name)}&body=${body}`;
    setTimeout(() => {
      setSending(false);
      toast.success("Opening your email client…");
      setForm({ name: "", email: "", message: "" });
    }, 600);
  };

  return (
    <section id="contact" className="relative py-24 md:py-28 bg-secondary/40">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Let's Talk"
          description="Open to internships, freelance projects, and collaborations."
        />

        <div className="grid lg:grid-cols-5 gap-5 max-w-5xl mx-auto">
          <Reveal className="lg:col-span-2">
            <div className="card-pop p-7 h-full">
              <h3 className="text-lg font-bold text-ink">Reach out</h3>
              <p className="mt-2 text-sm text-ink-soft">
                Prefer email or DMs? Here's where to find me.
              </p>
              <ul className="mt-6 space-y-2.5">
                {contactInfo.map((c) => {
                  const Inner = (
                    <div className="flex items-center gap-3 rounded-2xl border border-border bg-secondary/40 px-4 py-3 hover:border-ink/30 transition">
                      <div className="ink-chip h-9 w-9 shrink-0">
                        <c.icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm text-ink truncate">{c.label}</span>
                    </div>
                  );
                  return (
                    <li key={c.label}>
                      {c.href ? (
                        <a href={c.href} target="_blank" rel="noreferrer">
                          {Inner}
                        </a>
                      ) : (
                        Inner
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <form onSubmit={submit} className="card-pop p-7 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-ink-soft mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full rounded-2xl border border-border bg-secondary/40 px-4 py-3 text-sm text-ink outline-none focus:border-ink/40 focus:bg-card transition"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-ink-soft mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full rounded-2xl border border-border bg-secondary/40 px-4 py-3 text-sm text-ink outline-none focus:border-ink/40 focus:bg-card transition"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-ink-soft mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full rounded-2xl border border-border bg-secondary/40 px-4 py-3 text-sm text-ink outline-none focus:border-ink/40 focus:bg-card transition resize-none"
                  placeholder="Tell me about your project or opportunity…"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:scale-[1.03] transition-transform disabled:opacity-60"
                >
                  {sending ? "Sending…" : "Send Message"}
                  <Send className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setChatOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold text-ink hover:border-ink/30 hover:scale-[1.03] transition"
                >
                  Chat with Dipesh
                  <MessageCircle className="h-4 w-4" />
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>

      {/* Dipesh Chat Modal */}
      <DipeshBotChat isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </section>
  );
}
