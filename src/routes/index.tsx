import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Achievements } from "@/components/portfolio/Achievements";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { ScrollToTop } from "@/components/portfolio/ScrollToTop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Dipesh Padole — AI & Data Science Student · Full Stack Developer",
      },
      {
        name: "description",
        content:
          "Portfolio of Dipesh Padole — AI & Data Science student at YCCE Nagpur, Full Stack MERN developer, AI builder, and IoT innovator. Explore projects, skills, and achievements.",
      },
      {
        name: "keywords",
        content:
          "Dipesh Padole, AI Developer, Full Stack Developer, MERN Stack, Machine Learning, IoT, YCCE Nagpur, React Developer, Portfolio",
      },
      {
        property: "og:title",
        content: "Dipesh Padole — AI & Full Stack Developer Portfolio",
      },
      {
        property: "og:description",
        content:
          "Premium portfolio showcasing AI, MERN, and IoT projects by Dipesh Padole.",
      },
      { property: "og:type", content: "website" },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground noise">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <Toaster />
    </div>
  );
}
