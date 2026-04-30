import {
  Code2,
  Cpu,
  Wifi,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Trophy,
  GraduationCap,
  Briefcase,
  Layout,
  Zap,
  Database,
  Brain,
  Wrench,
  Target,
  Lightbulb,
  Rocket,
} from "lucide-react";

export const personal = {
  name: "Dipesh Padole",

  role: "AI & Data Science Student · MERN Developer 🚀",

  intro: "Hey, I’m Dipesh 👋",

  description:
    "I build AI-powered web apps, smart IoT projects, and occasionally fight bugs at 2 AM 😅",
  email: "dipesh.padole@example.com",
  location: "Nagpur, Maharashtra, India",
  linkedin: "https://www.linkedin.com/in/dipesh-padole-358932339",
  graphicLinkLabel: "View Dipesh Padole’s graphic",
  graphicLink: "https://www.linkedin.com/in/dipesh-padole-358932339",
  github: "https://github.com/dipeshpadole786",
  leetcode: "https://leetcode.com/u/dipeshpadole_0067/",
  gfg: "https://www.geeksforgeeks.org/profile/dipeshpadole0067",
  resume: "/resume.pdf",
};

export const socials = [
  { icon: Linkedin, label: "LinkedIn", href: personal.linkedin },
  { icon: Github, label: "GitHub", href: personal.github },
  { icon: Code2, label: "LeetCode", href: personal.leetcode },
  { icon: Cpu, label: "GeeksforGeeks", href: personal.gfg },
  { icon: Mail, label: "Email", href: `mailto:${personal.email}` },
];

/* Service-style cards (matches reference's 4-card grid) */
export const services = [
  {
    icon: Layout,
    title: "Full Stack Web Development",
    desc: "End-to-end MERN apps with clean architecture, REST APIs, authentication, and deployment pipelines.",
    chips: ["MERN Stack", "REST APIs"],
  },
  {
    icon: Code2,
    title: "Frontend Engineering",
    desc: "Pixel-perfect, responsive interfaces using React, Tailwind, and modern animation libraries.",
    chips: ["React.js", "Tailwind CSS"],
  },
  {
    icon: Brain,
    title: "AI & Automation",
    desc: "ML models, LLM agents, and automated workflows built with n8n and modern AI tooling.",
    chips: ["Machine Learning", "n8n + LLMs"],
  },
  {
    icon: Wifi,
    title: "IoT & Smart Systems",
    desc: "Arduino + ESP8266 powered devices integrated with real-time dashboards and APIs.",
    chips: ["Arduino", "ESP8266"],
  },
];

/* "My Approach" steps (matches reference's 01/02/03 grid) */
export const approach = [
  { step: "01", icon: Lightbulb, title: "Understand the problem" },
  { step: "02", icon: Target, title: "Design clean architecture" },
  { step: "03", icon: Rocket, title: "Ship fast, iterate smarter" },
];

export const stats = [
  { value: 15, suffix: "+", label: "Projects Built" },
  { value: 5, suffix: "+", label: "Hackathons" },
  { value: 9.62, suffix: "", label: "CGPA", decimals: 2 },
  { value: 1400, suffix: "+", label: "Followers" },
];

/* Skill cards (matches reference's 4-card category layout) */
export const skills = [
  {
    icon: Code2,
    category: "Core Skills",
    items: ["MERN Stack", "Full Stack Dev", "Responsive Design", "Component Architecture"],
  },
  {
    icon: Layout,
    category: "Frontend Tech",
    items: ["React.js", "HTML", "CSS", "Tailwind", "Bootstrap", "EJS"],
  },
  {
    icon: Database,
    category: "Backend & DB",
    items: ["Node.js", "Express.js", "MongoDB", "Mongoose", "REST APIs"],
  },
  {
    icon: Wrench,
    category: "Tools & AI",
    items: ["Git & GitHub", "n8n", "Arduino", "ESP8266", "ML", "Deployment"],
  },
];

export const projects = [
  {
    title: "Smart Waste Management",
    description:
      "AI + IoT based waste monitoring platform with citizen dashboard, municipal monitoring, complaint system, Leaflet maps, and smart bin integration.",
    tech: ["React", "Node.js", "MongoDB", "Arduino", "ESP8266"],
    github: "https://github.com/dipeshpadole786/Waste-Management-System",
    demo: "#",
  },
  {
    title: "AI Travel Planner",
    description:
      "PNR-based smart travel planner for Nagpur recommending departure timing, metro, bus, auto, and live train tracking.",
    tech: ["React", "APIs", "Node.js", "Maps"],
    github: "https://github.com/dipeshpadole786/Project_Rail",
    demo: "#",
  },
  {
    title: "Jethalal AI Sales Assistant",
    description:
      "AI-powered electronics shop assistant built with n8n workflows, Groq LLM, Telegram bot integration, memory handling, and automated billing.",
    tech: ["n8n", "AI Agents", "JavaScript", "Telegram API"],
    github: "#",
    demo: "#",
  },
  {
    title: "MERN E-Commerce Platform",
    description:
      "Full-stack e-commerce platform with authentication, cart system, admin dashboard, analytics, and order management.",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js"],
    github: "https://github.com/dipeshpadole786/MERN-E-commerce",
    demo: "#",
  },
];

export const education = {
  icon: GraduationCap,
  school: "YCCE Nagpur",
  degree: "B.Tech in Artificial Intelligence & Data Science",
  duration: "2024 – 2028",
  semesters: [
    { sem: "Sem 1", cgpa: "9.12" },
    { sem: "Sem 2", cgpa: "9.50" },
    { sem: "Sem 3", cgpa: "9.62" },
  ],
};

export const experience = {
  icon: Briefcase,
  role: "Frontend Development Intern",
  company: "CodeAlpha",
  date: "June 2025",
};

export const achievements = [
  { icon: Trophy, title: "IIT Bombay Zerve AI Datathon Finalist", year: "2025" },
  { icon: Trophy, title: "Central India Hackathon Participant", year: "2025" },
  { icon: Trophy, title: "TantraFiesta AI Accessibility Hackathon", year: "2025" },
  { icon: Zap, title: "180+ DSA Problems Solved", year: "Ongoing" },
  { icon: Trophy, title: "Rank 43 at YCCE", year: "2024" },
];

export const contactInfo = [
  { icon: MapPin, label: "Nagpur, Maharashtra", href: null },
  { icon: Mail, label: personal.email, href: `mailto:${personal.email}` },
  { icon: Code2, label: "LeetCode", href: personal.leetcode },
  { icon: Cpu, label: "GeeksforGeeks", href: personal.gfg },
  { icon: Github, label: "GitHub", href: personal.github },
  { icon: Linkedin, label: "LinkedIn", href: personal.linkedin },
  { icon: Lightbulb, label: personal.graphicLinkLabel, href: personal.graphicLink },
];

export const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Achievements", id: "achievements" },
  { label: "Contact", id: "contact" },
];
