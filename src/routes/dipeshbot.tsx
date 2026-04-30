import { createFileRoute, Link } from "@tanstack/react-router";
import { DipeshBotChatPanel } from "@/components/portfolio/DipeshBotChatPanel";

export const Route = createFileRoute("/dipeshbot")({
  head: () => ({
    meta: [
      { title: "Dipesh — Chat" },
      {
        name: "description",
        content: "Chat with Dipesh, Dipesh Padole’s portfolio AI assistant.",
      },
    ],
  }),
  component: DipeshBotPage,
});

function DipeshBotPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground noise">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between gap-4 px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink/30"
          >
            ← Back to portfolio
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <DipeshBotChatPanel className="mx-auto h-[calc(100vh-160px)] w-full max-w-5xl" />
      </main>
    </div>
  );
}
