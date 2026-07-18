import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import {
  User,
  Code2,
  Layers,
  GraduationCap,
  MapPin,
  Trophy,
  Target,
  Sparkles,
  ArrowUpRight,
  Globe,
  Brain,
  Cloud,
  Star,
  Folder,
  BookOpen,
  Infinity as InfinityIcon,
  Terminal,
  Lightbulb,
  Users,
  Rocket,
  TrendingUp,
  Coffee,
  GitBranch,
  Github,
  Linkedin,
} from "lucide-react";

const MonitorCodeIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="14" x="2" y="3" rx="2" />
    <line x1="12" x2="12" y1="17" y2="21" />
    <line x1="8" x2="16" y1="21" y2="21" />
    <path d="M8 7l-2 3 2 3" />
    <path d="M16 7l2 3-2 3" />
    <line x1="13" y1="7" x2="11" y2="13" />
  </svg>
);

type TabId = "identity" | "expertise" | "toolkit";

const TABS: { id: TabId; label: string; Icon: typeof User; hint: string }[] = [
  { id: "identity", label: "Identity", Icon: User, hint: "Who I am" },
  { id: "expertise", label: "Expertise", Icon: Code2, hint: "What I know" },
  { id: "toolkit", label: "Toolkit", Icon: Layers, hint: "What I use" },
];

const IDENTITY_CARDS = [
  {
    Icon: GraduationCap,
    label: "Education",
    title: "B.Tech · CSE (Core)",
    meta: "Woxsen University · 2022 – 2026",
    accent: "from-blue-500 to-cyan-500",
  },
  {
    Icon: MapPin,
    label: "Based in",
    title: "Nizamabad, Telangana, India",
    meta: "IST (UTC+5:30) · Open to relocate",
    accent: "from-purple-500 to-pink-500",
  },
  {
    Icon: Trophy,
    label: "Signature Win",
    title: "DIGITECH Hackathon #1",
    meta: "50+ teams · Resume Ranker AI",
    accent: "from-amber-500 to-orange-500",
  },
  {
    Icon: Target,
    label: "Passions",
    title: "Building · Shipping · Learning",
    meta: "AI · Full Stack · Open Source",
    accent: "from-emerald-500 to-teal-500",
  },
];

const SKILL_GROUPS = [
  {
    title: "Languages",
    accent: "#3b82f6",
    items: [
      { name: "Python", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Java", level: 75 },
    ],
  },
  {
    title: "Web & Backend",
    accent: "#a855f7",
    items: [
      { name: "React.js", level: 88 },
      { name: "Node.js", level: 82 },
      { name: "Express.js", level: 78 },
      { name: "REST / API design", level: 82 },
    ],
  },
  {
    title: "Data & AI",
    accent: "#ec4899",
    items: [
      { name: "TensorFlow", level: 70 },
      { name: "Scikit-learn", level: 75 },
      { name: "LangChain / LLMs", level: 78 },
      { name: "SQL / NoSQL", level: 78 },
    ],
  },
  {
    title: "Cloud & DevOps",
    accent: "#10b981",
    items: [
      { name: "Docker", level: 72 },
      { name: "AWS", level: 68 },
      { name: "GitHub Actions", level: 75 },
      { name: "Vercel / Netlify", level: 85 },
    ],
  },
];

const TAG_COLORS: Record<string, { bg: string; border: string; glow: string; text: string }> = {
  Frontend:  { bg: "rgba(59,130,246,0.08)",  border: "rgba(59,130,246,0.35)",  glow: "#3b82f6",  text: "#3b82f6" },
  Language:  { bg: "rgba(168,85,247,0.08)",  border: "rgba(168,85,247,0.35)",  glow: "#a855f7",  text: "#a855f7" },
  Backend:   { bg: "rgba(16,185,129,0.08)",  border: "rgba(16,185,129,0.35)",  glow: "#10b981",  text: "#10b981" },
  "AI/ML":  { bg: "rgba(236,72,153,0.08)",  border: "rgba(236,72,153,0.35)",  glow: "#ec4899",  text: "#ec4899" },
  Database:  { bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.35)",  glow: "#f59e0b",  text: "#f59e0b" },
  DevOps:    { bg: "rgba(14,165,233,0.08)",  border: "rgba(14,165,233,0.35)",  glow: "#0ea5e9",  text: "#0ea5e9" },
  Cloud:     { bg: "rgba(249,115,22,0.08)",  border: "rgba(249,115,22,0.35)",  glow: "#f97316",  text: "#f97316" },
  Tooling:   { bg: "rgba(100,116,139,0.08)", border: "rgba(100,116,139,0.35)", glow: "#64748b",  text: "#64748b" },
  BaaS:      { bg: "rgba(234,179,8,0.08)",   border: "rgba(234,179,8,0.35)",   glow: "#eab308",  text: "#eab308" },
  OS:        { bg: "rgba(20,184,166,0.08)",  border: "rgba(20,184,166,0.35)",  glow: "#14b8a6",  text: "#14b8a6" },
};

const TOOLKIT = [
  { name: "React",      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",                              tag: "Frontend" },
  { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",                    tag: "Language" },
  { name: "Node.js",   url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",                            tag: "Backend" },
  { name: "Python",    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",                            tag: "Language" },
  { name: "TensorFlow",url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",                    tag: "AI/ML" },
  { name: "MongoDB",   url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",                          tag: "Database" },
  { name: "PostgreSQL",url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",                    tag: "Database" },
  { name: "Docker",    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",                            tag: "DevOps" },
  { name: "AWS",       url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", tag: "Cloud" },
  { name: "Git",       url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",                                  tag: "Tooling" },
  { name: "Firebase",  url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",                          tag: "BaaS" },
  { name: "Tailwind",  url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",                  tag: "Frontend" },
  { name: "Next.js",   url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",                            tag: "Frontend" },
  { name: "FastAPI",   url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",                          tag: "Backend" },
  { name: "Kubernetes",url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",                       tag: "DevOps" },
  { name: "MySQL",     url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",                              tag: "Database" },
  { name: "Supabase",  url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",                        tag: "BaaS" },
  { name: "VS Code",   url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",                            tag: "Tooling" },
  { name: "Postman",   url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",                          tag: "Tooling" },
  { name: "Linux",     url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",                              tag: "OS" },
];

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface VelocityRowProps {
  items: typeof TOOLKIT;
  baseVelocity: number;
}

const VelocityRow = ({ items, baseVelocity = 1 }: VelocityRowProps) => {
  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${wrap(-33.33, 0, v)}%`);

  useAnimationFrame((_time, delta) => {
    // Scroll at a constant, fixed speed (independent of page scrolling)
    const moveBy = baseVelocity * (delta / 1000) * 3;
    baseX.set(baseX.get() + moveBy);
  });

  // Repeat items to ensure seamless loop
  const repeatedItems = [...items, ...items, ...items];
  const [localHovered, setLocalHovered] = useState<number | null>(null);

  return (
    <div className="overflow-hidden flex flex-nowrap w-full relative">
      {/* Left/Right Fade overlay for cinematic look */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap gap-4 flex-nowrap py-6"
        style={{ x }}
      >
        {repeatedItems.map((item, idx) => {
          const c = TAG_COLORS[item.tag] ?? TAG_COLORS["Tooling"];
          const isHovered = localHovered === idx;
          return (
            <motion.div
              key={idx}
              onMouseEnter={() => setLocalHovered(idx)}
              onMouseLeave={() => setLocalHovered(null)}
              whileHover={{ y: -6 }}
              style={{
                borderColor: isHovered ? c.border : "rgba(128,128,128,0.15)",
                background: isHovered ? c.bg : "rgba(255,255,255,0.01)",
                boxShadow: isHovered ? `0 0 16px 2px ${c.glow}20` : "none",
              }}
              className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border flex flex-col items-center justify-center p-2.5 overflow-hidden transition-all duration-300 cursor-default select-none"
            >
              {/* Logo/Icon */}
              <img
                src={item.url}
                alt={item.name}
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-all duration-300"
                style={{ filter: isHovered ? "none" : "grayscale(20%)" }}
              />

              {/* Name */}
              <span className="text-[11px] sm:text-xs font-bold text-foreground mt-2 leading-none">
                {item.name}
              </span>

              {/* Tag at the bottom (glowing/visible on hover) */}
              <span
                style={{ color: isHovered ? c.text : "rgba(128,128,128,0.4)" }}
                className="absolute bottom-2 text-[7px] sm:text-[8px] uppercase tracking-widest font-extrabold transition-all duration-300"
              >
                {item.tag}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

const EXPERTISE_STATS = [
  { label: "Technologies", value: "16+", color: "text-blue-500", Icon: Star, bg: "bg-blue-500/10 border-blue-500/20" },
  { label: "Projects", value: "10+", color: "text-purple-500", Icon: Folder, bg: "bg-purple-500/10 border-purple-500/20" },
  { label: "Years Learning", value: "2+", color: "text-cyan-500", Icon: BookOpen, bg: "bg-cyan-500/10 border-cyan-500/20" },
  { label: "Learning", value: "Always", color: "text-pink-500", Icon: InfinityIcon, bg: "bg-pink-500/10 border-pink-500/20" },
];

const QUALITIES = [
  { title: "Problem Solver", desc: "I break down complex problems into simple solutions.", Icon: Target, color: "text-blue-500", bg: "bg-blue-500/5 hover:bg-blue-500/10 border-blue-500/10" },
  { title: "Clean Coder", desc: "I write clean, efficient and maintainable code.", Icon: Terminal, color: "text-purple-500", bg: "bg-purple-500/5 hover:bg-purple-500/10 border-purple-500/10" },
  { title: "Quick Learner", desc: "I adapt fast to new technologies and challenges.", Icon: Lightbulb, color: "text-pink-500", bg: "bg-pink-500/5 hover:bg-pink-500/10 border-pink-500/10" },
  { title: "Team Player", desc: "I collaborate, communicate and contribute to build better together.", Icon: Users, color: "text-emerald-500", bg: "bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/10" },
  { title: "Performance Driven", desc: "I focus on efficiency, scalability and real impact.", Icon: Rocket, color: "text-orange-500", bg: "bg-orange-500/5 hover:bg-orange-500/10 border-orange-500/10" },
  { title: "Always Growing", desc: "I never stop learning and exploring new possibilities.", Icon: TrendingUp, color: "text-teal-500", bg: "bg-teal-500/5 hover:bg-teal-500/10 border-teal-500/10" },
];

const TECH_ICONS = [
  { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", isDark: true },
  { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "AWS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", isDark: true },
  { name: "GitHub", Icon: Github },
  { name: "Next.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", isDark: true },
  { name: "More", label: "... and more" }
];

const TOOLS_PLATFORMS = [
  { name: "VS Code", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Postman", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
  { name: "Figma", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Linux", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Jupyter", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
  { name: "Notion", Icon: Layers, label: "Notion" },
  { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Firebase", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "More", label: "More" }
];

const getSkillIcon = (name: string) => {
  switch (name) {
    case "Python":
      return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="w-5 h-5 object-contain" />;
    case "JavaScript":
      return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" className="w-5 h-5 object-contain" />;
    case "TypeScript":
      return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" className="w-5 h-5 object-contain" />;
    case "Java":
      return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" className="w-5 h-5 object-contain" />;
    case "React.js":
      return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="w-5 h-5 object-contain" />;
    case "Node.js":
      return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node" className="w-5 h-5 object-contain" />;
    case "Express.js":
      return (
        <div className="w-5 h-5 rounded bg-[#1e293b] flex items-center justify-center text-[10px] font-black text-white border border-white/10 font-mono">
          ex
        </div>
      );
    case "REST / API design":
    case "REST / API Design":
      return (
        <div className="w-5 h-5 rounded bg-[#1e293b] flex items-center justify-center text-[8px] font-black text-[#a855f7] border border-[#a855f7]/30 font-mono uppercase">
          API
        </div>
      );
    case "TensorFlow":
      return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" className="w-5 h-5 object-contain" />;
    case "Scikit-learn":
      return <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" alt="Scikit-learn" className="w-5 h-5 object-contain" />;
    case "LangChain / LLMs":
      return (
        <div className="w-5 h-5 rounded bg-pink-500/10 flex items-center justify-center text-pink-400 border border-pink-400/20">
          <Brain className="w-3.5 h-3.5" />
        </div>
      );
    case "SQL / NoSQL":
      return (
        <div className="w-5 h-5 rounded bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-400/20">
          <Layers className="w-3.5 h-3.5" />
        </div>
      );
    case "Docker":
      return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" className="w-5 h-5 object-contain" />;
    case "AWS":
      return (
        <div className="w-5 h-5 rounded bg-[#232f3e] flex items-center justify-center border border-orange-500/20">
          <span className="text-[7px] text-white font-extrabold uppercase">aws</span>
        </div>
      );
    case "GitHub Actions":
      return (
        <div className="w-5 h-5 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-400/20">
          <GitBranch className="w-3.5 h-3.5" />
        </div>
      );
    case "Vercel / Netlify":
      return (
        <div className="w-5 h-5 flex items-center justify-center text-black dark:text-white">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 22.525H0L12 1.475L24 22.525Z"/></svg>
        </div>
      );
    default:
      return <Code2 className="w-4 h-4 text-foreground/50" />;
  }
};

const SkillCard = ({ group, gi, num, className = "" }: { group: typeof SKILL_GROUPS[0]; gi: number; num: string; className?: string }) => {
  const isLeftCard = num === "01" || num === "03";
  
  // Custom pointed polygons: left cards point right, right cards point left
  const wrapperClipPath = isLeftCard
    ? "polygon(16px 0, calc(100% - 24px) 0, calc(100% - 8px) 16px, 100% 50%, calc(100% - 8px) calc(100% - 16px), calc(100% - 24px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)"
    : "polygon(24px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 24px 100%, 8px calc(100% - 16px), 0 50%, 8px 16px)";

  const innerClipPath = isLeftCard
    ? "polygon(15.5px 0, calc(100% - 23.5px) 0, calc(100% - 7.5px) 15.5px, calc(100% - 0.5px) 50%, calc(100% - 7.5px) calc(100% - 15.5px), calc(100% - 23.5px) 100%, 15.5px 100%, 0.5px calc(100% - 15.5px), 0.5px 15.5px)"
    : "polygon(23.5px 0, calc(100% - 15.5px) 0, calc(100% - 0.5px) 15.5px, calc(100% - 0.5px) calc(100% - 15.5px), calc(100% - 15.5px) 100%, 23.5px 100%, 8.5px calc(100% - 15.5px), 0.5px 50%, 8.5px 15.5px)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: gi * 0.08 }}
      className={`relative p-[1.5px] ${className}`}
      style={{
        clipPath: wrapperClipPath,
        background: `linear-gradient(135deg, ${group.accent}, transparent, ${group.accent}50)`
      }}
    >
      <div
        className="bg-background/95 dark:bg-[#080b11]/95 backdrop-blur-md p-4 sm:p-5 pt-5 sm:pt-6 relative flex flex-col justify-between h-full"
        style={{
          clipPath: innerClipPath,
          boxShadow: `inset 0 0 20px -5px ${group.accent}20`
        }}
      >
        {/* Floating ID badge */}
        <div className={`absolute top-2.5 ${isLeftCard ? 'left-4' : 'right-4'} w-6 h-6 flex items-center justify-center font-bold text-[10px] border rounded-lg bg-[#080b11] z-10`}
          style={{
            borderColor: group.accent,
            color: group.accent,
            boxShadow: `0 0 12px ${group.accent}40`,
            clipPath: "polygon(5px 0, calc(100% - 5px) 0, 100% 5px, 100% calc(100% - 5px), calc(100% - 5px) 100%, 5px 100%, 0 calc(100% - 5px), 0 5px)"
          }}
        >
          {num}
        </div>

        {/* Decorative Header */}
        <div className="flex items-center justify-center gap-2 mb-4 pt-1 select-none">
          <span className="h-[1px] w-5 opacity-30" style={{ backgroundColor: group.accent }} />
          <h4 className="text-[11px] sm:text-xs font-extrabold tracking-widest uppercase text-center" style={{ color: group.accent }}>
            {group.title}
          </h4>
          <span className="h-[1px] w-5 opacity-30" style={{ backgroundColor: group.accent }} />
        </div>

        {/* Progress List with Icons */}
        <div className="space-y-3">
          {group.items.map((s, i) => (
            <div key={s.name} className="space-y-1">
              <div className="flex items-center justify-between text-[10px] sm:text-xs font-semibold">
                <div className="flex items-center gap-1.5 [&_img]:w-4 [&_img]:h-4 [&_svg]:w-3.5 [&_svg]:h-3.5 [&_div]:w-4 [&_div]:h-4 [&_div]:text-[8px]">
                  {getSkillIcon(s.name)}
                  <span className="text-foreground/90 text-[10.5px] sm:text-xs">{s.name}</span>
                </div>
                <span className="text-muted-foreground text-[10px] sm:text-[11px]">{s.level}%</span>
              </div>
              <div className="h-1 rounded-full bg-muted/30 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${s.level}%` }}
                  transition={{
                    duration: 1.2,
                    delay: gi * 0.08 + i * 0.05,
                    ease: "easeOut",
                  }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${group.accent}80, ${group.accent})`,
                    boxShadow: `0 0 8px ${group.accent}40`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const DeveloperIdentity = () => {
  const [tab, setTab] = useState<TabId>("identity");
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="developer-identity" className="py-12 sm:py-16 md:py-20 relative z-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10"
        >

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-foreground">
            The Engineer Behind the{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            One space, three lenses — my story, my expertise, and the toolkit I build with.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex gap-1.5 p-1.5 rounded-2xl border border-border/60 dark:border-white/10 bg-card/60 dark:bg-white/[0.03] backdrop-blur">
            {TABS.map(({ id, label, Icon, hint }) => {
              const active = tab === id;
              return (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className="relative px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors"
                >
                  {active && (
                    <motion.span
                      layoutId="dev-id-active"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/25"
                    />
                  )}
                  <span
                    className={`relative flex items-center gap-2 ${
                      active ? "text-white" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon size={14} />
                    {label}
                    <span
                      className={`hidden md:inline text-[10px] font-normal opacity-70 ${
                        active ? "text-white/90" : ""
                      }`}
                    >
                      · {hint}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Panels */}
        <div className="relative overflow-hidden w-full">
          <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-purple-500/15 blur-3xl" />

          <AnimatePresence mode="wait">
            {tab === "identity" && (
              <motion.div
                key="identity"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="relative grid md:grid-cols-5 gap-6 p-6 sm:p-8 md:p-10"
              >
                <div className="md:col-span-2 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400">
                      About Me
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    I build products end-to-end — React on the front, Node & Python on the back, and
                    LLMs where they truly help. My work sits between craft and pragmatism: clean UI,
                    reliable APIs, tests, and a bias for shipping.
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    I recently graduated with a Bachelor of Technology in Computer Science & Engineering from Woxsen University and actively exploring roles in
                    Software, Full-Stack, AI, Backend, and Cloud engineering.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {["Full Stack", "AI / LLM", "Cloud", "DevOps", "Open Source"].map((c) => (
                      <span
                        key={c}
                        className="px-2.5 py-1 text-xs rounded-full bg-primary/10 text-foreground border border-primary/20"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-3 grid sm:grid-cols-2 gap-3 sm:gap-4">
                  {IDENTITY_CARDS.map(({ Icon, label, title, meta, accent }, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      whileHover={{ y: -4 }}
                      className="group relative overflow-hidden rounded-2xl border border-border/60 dark:border-white/10 bg-background/50 dark:bg-white/[0.02] p-5 transition-all hover:border-primary/40"
                    >
                      <div
                        className={`absolute -top-10 -right-10 h-24 w-24 rounded-full bg-gradient-to-br ${accent} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity`}
                      />
                      <div
                        className={`relative w-10 h-10 rounded-xl bg-gradient-to-br ${accent} flex items-center justify-center mb-3 shadow-md`}
                      >
                        <Icon className="text-white" size={18} />
                      </div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 font-bold mb-1">
                        {label}
                      </p>
                      <p className="text-sm sm:text-base font-semibold text-foreground">{title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{meta}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
             {tab === "expertise" && (
              <motion.div
                key="expertise"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="relative p-4 sm:p-6 md:p-8 space-y-8"
              >
                <style>{`
                  @keyframes dash {
                    to {
                      stroke-dashoffset: -40;
                    }
                  }
                `}</style>
                {/* Header Title Block */}
                <div className="text-center max-w-2xl mb-6 sm:mb-8 mx-auto">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-foreground leading-tight tracking-tight mb-2">
                    Skills that{" "}
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Build Solutions.
                    </span>
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mx-auto">
                    A blend of coding, problem solving and curiosity that helps me craft impactful digital experiences.
                  </p>
                  <div className="w-16 h-[2.5px] rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mt-4 mx-auto" />
                </div>

                {/* Symmetric Connected Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  
                  {/* Left Column (col-span-4): Panel 01 & Panel 03 */}
                  <div className="lg:col-span-4 flex flex-col gap-8 md:gap-12">
                    <SkillCard group={SKILL_GROUPS[0]} gi={0} num="01" className="ml-auto w-full max-w-[300px]" />
                    <SkillCard group={SKILL_GROUPS[2]} gi={2} num="03" className="ml-auto w-full max-w-[300px]" />
                  </div>

                  {/* Center Column (col-span-4): Circular Hub */}
                  <div className="lg:col-span-4 relative flex items-center justify-center py-8 md:py-0">
                    
                    {/* Mobile representation (hidden on desktop) */}
                    <div className="md:hidden w-full max-w-[280px] rounded-full border border-dashed border-white/20 bg-background/95 dark:bg-black/90 flex flex-col items-center justify-center text-center p-6 shadow-2xl relative">
                      <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-60 blur animate-[spin_10s_linear_infinite] -z-10" />
                      <Code2 className="text-purple-400 w-7 h-7 mb-2" />
                      <p className="text-[10px] text-foreground font-semibold leading-relaxed px-1">
                        I turn ideas into scalable, efficient and impactful digital solutions.
                      </p>
                    </div>

                    {/* Desktop Connected Circular Hub */}
                    <div className="hidden md:block relative w-full h-[520px] overflow-visible">
                      {/* Connecting SVGs & White Beads & Orbit Nodes */}
                      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                        {/* Top-Left node (Languages) */}
                        <line x1="50" y1="50" x2="18" y2="18" stroke="#00d2ff" strokeWidth="0.35" />
                        <line x1="18" y1="18" x2="-6" y2="18" stroke="#00d2ff" strokeWidth="0.35" />

                        {/* Top-Right node (Web & Backend) */}
                        <line x1="50" y1="50" x2="82" y2="18" stroke="#9b00ff" strokeWidth="0.35" />
                        <line x1="82" y1="18" x2="106" y2="18" stroke="#9b00ff" strokeWidth="0.35" />

                        {/* Bottom-Left node (Data & AI) */}
                        <line x1="50" y1="50" x2="18" y2="82" stroke="#ff007b" strokeWidth="0.35" />
                        <line x1="18" y1="82" x2="-6" y2="82" stroke="#ff007b" strokeWidth="0.35" />

                        {/* Bottom-Right node (Cloud & DevOps) */}
                        <line x1="50" y1="50" x2="82" y2="82" stroke="#00ffd2" strokeWidth="0.35" />
                        <line x1="82" y1="82" x2="106" y2="82" stroke="#00ffd2" strokeWidth="0.35" />

                        {/* Top-Left beads */}
                        <circle cx="39" cy="39" r="0.75" fill="white" style={{ filter: "drop-shadow(0 0 2px white)" }} />
                        <circle cx="29" cy="29" r="0.75" fill="white" style={{ filter: "drop-shadow(0 0 2px white)" }} />
                        <circle cx="21" cy="21" r="0.75" fill="white" style={{ filter: "drop-shadow(0 0 2px white)" }} />
                        <circle cx="-6" cy="18" r="0.75" fill="white" style={{ filter: "drop-shadow(0 0 2px white)" }} />

                        {/* Top-Right beads */}
                        <circle cx="61" cy="39" r="0.75" fill="white" style={{ filter: "drop-shadow(0 0 2px white)" }} />
                        <circle cx="71" cy="29" r="0.75" fill="white" style={{ filter: "drop-shadow(0 0 2px white)" }} />
                        <circle cx="79" cy="21" r="0.75" fill="white" style={{ filter: "drop-shadow(0 0 2px white)" }} />
                        <circle cx="106" cy="18" r="0.75" fill="white" style={{ filter: "drop-shadow(0 0 2px white)" }} />

                        {/* Bottom-Left beads */}
                        <circle cx="39" cy="61" r="0.75" fill="white" style={{ filter: "drop-shadow(0 0 2px white)" }} />
                        <circle cx="29" cy="71" r="0.75" fill="white" style={{ filter: "drop-shadow(0 0 2px white)" }} />
                        <circle cx="21" cy="79" r="0.75" fill="white" style={{ filter: "drop-shadow(0 0 2px white)" }} />
                        <circle cx="-6" cy="82" r="0.75" fill="white" style={{ filter: "drop-shadow(0 0 2px white)" }} />

                        {/* Bottom-Right beads */}
                        <circle cx="61" cy="61" r="0.75" fill="white" style={{ filter: "drop-shadow(0 0 2px white)" }} />
                        <circle cx="71" cy="71" r="0.75" fill="white" style={{ filter: "drop-shadow(0 0 2px white)" }} />
                        <circle cx="79" cy="79" r="0.75" fill="white" style={{ filter: "drop-shadow(0 0 2px white)" }} />
                        <circle cx="106" cy="82" r="0.75" fill="white" style={{ filter: "drop-shadow(0 0 2px white)" }} />

                        {/* 4 Circular Orbit Nodes inside the SVG for perfect 1:1 alignment */}
                        {/* Top-Left: Languages Node */}
                        <foreignObject x="16" y="16" width="4" height="4" className="overflow-visible pointer-events-auto">
                          <div className="w-4 h-4 rounded-full p-[0.5px] bg-[#00d2ff] shadow-[0_0_8px_rgba(0,210,255,0.4)] flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                            <div className="w-full h-full rounded-full bg-[#080b11]/95 backdrop-blur-sm flex items-center justify-center">
                              <span className="text-[4.5px] font-black font-mono text-white select-none">&lt;/&gt;</span>
                            </div>
                          </div>
                        </foreignObject>

                        {/* Top-Right: Web Node */}
                        <foreignObject x="80" y="16" width="4" height="4" className="overflow-visible pointer-events-auto">
                          <div className="w-4 h-4 rounded-full p-[0.5px] bg-[#9b00ff] shadow-[0_0_8px_rgba(155,0,255,0.4)] flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                            <div className="w-full h-full rounded-full bg-[#080b11]/95 backdrop-blur-sm flex items-center justify-center">
                              <Globe className="w-2 h-2 text-white" />
                            </div>
                          </div>
                        </foreignObject>

                        {/* Bottom-Left: AI Node */}
                        <foreignObject x="16" y="80" width="4" height="4" className="overflow-visible pointer-events-auto">
                          <div className="w-4 h-4 rounded-full p-[0.5px] bg-[#ff007b] shadow-[0_0_8px_rgba(255,0,123,0.4)] flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                            <div className="w-full h-full rounded-full bg-[#080b11]/95 backdrop-blur-sm flex items-center justify-center">
                              <Brain className="w-2 h-2 text-white" />
                            </div>
                          </div>
                        </foreignObject>

                        {/* Bottom-Right: DevOps Node */}
                        <foreignObject x="80" y="80" width="4" height="4" className="overflow-visible pointer-events-auto">
                          <div className="w-4 h-4 rounded-full p-[0.5px] bg-[#00ffd2] shadow-[0_0_8px_rgba(0,255,210,0.4)] flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                            <div className="w-full h-full rounded-full bg-[#080b11]/95 backdrop-blur-sm flex items-center justify-center">
                              <Cloud className="w-2 h-2 text-white" />
                            </div>
                          </div>
                        </foreignObject>
                      </svg>

                      {/* Concentric Orbits with Top Star Bead */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                        <div className="absolute w-[440px] h-[440px] rounded-full border border-dotted border-indigo-500/10">
                          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[9px] text-[#00d2ff] select-none drop-shadow-[0_0_4px_rgba(0,210,255,0.7)]">✦</span>
                        </div>
                        <div className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-indigo-500/15 animate-[spin_60s_linear_infinite]" />
                        <div className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-indigo-500/20 animate-[spin_30s_linear_infinite]" />
                      </div>

                      {/* Center Core Glassmorphic Sphere */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full p-[1.5px] bg-gradient-to-tr from-[#00ffd2] via-[#ff007b] to-[#00d2ff] shadow-[0_0_50px_rgba(155,0,255,0.25)] z-10 flex items-center justify-center">
                        <div className="w-full h-full rounded-full bg-[#080b11] flex flex-col items-center justify-center text-center p-6 relative overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.8)]">
                          {/* Radial Glow inside sphere */}
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,_rgba(155,0,255,0.15),_transparent_75%)] pointer-events-none" />
                          
                          {/* Styled Code Symbol </ > */}
                          <div className="text-3xl font-black bg-gradient-to-r from-[#00d2ff] via-[#9b00ff] to-[#ff007b] bg-clip-text text-transparent flex items-center justify-center select-none font-mono mb-2">
                            &lt;/&gt;
                          </div>
                          
                          <p className="text-[10px] text-gray-300 font-semibold leading-relaxed px-1 z-10">
                            I turn ideas into scalable, efficient and impactful digital solutions.
                          </p>
                          
                          {/* 4 Glowing Dots */}
                           <div className="flex gap-2 mt-4 z-10">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.7)]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.7)]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.7)]" />
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Right Column (col-span-4): Panel 02 & Panel 04 */}
                  <div className="lg:col-span-4 flex flex-col gap-8 md:gap-12">
                    <SkillCard group={SKILL_GROUPS[1]} gi={1} num="02" className="mr-auto w-full max-w-[300px]" />
                    <SkillCard group={SKILL_GROUPS[3]} gi={3} num="04" className="mr-auto w-full max-w-[300px]" />
                  </div>

                </div>

              </motion.div>
            )}

            {tab === "toolkit" && (
              <motion.div
                key="toolkit"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="relative p-6 sm:p-8 md:p-10"
              >
                <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-foreground">
                      Daily-driven toolkit
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Infinite auto-scrolling ribbon of tools.
                    </p>
                  </div>
                </div>

                <div className="py-4 md:py-6 overflow-hidden">
                  <VelocityRow items={TOOLKIT} baseVelocity={-1.2} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom floating glass panel: What I Bring to the Table */}
        <div className="mt-8 md:mt-12 relative">
          
          {/* Header with horizontal gradient lines (Moved outside) */}
          <div className="flex items-center justify-center gap-4 mb-6 sm:mb-8">
            <div className="h-[1px] flex-1 max-w-[80px] bg-gradient-to-r from-transparent via-[#9b00ff]/20 to-[#9b00ff]/40" />
            <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#9b00ff] dark:text-[#c084fc] drop-shadow-[0_0_8px_rgba(155,0,255,0.35)]">
              What I Bring to the Table
            </h4>
            <div className="h-[1px] flex-1 max-w-[80px] bg-gradient-to-l from-transparent via-[#9b00ff]/20 to-[#9b00ff]/40" />
          </div>

          <div className="relative">
            {/* Subtle neon glowing backdrop */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-30 blur-lg pointer-events-none" />
            
            <div className="relative w-full py-5 px-4 md:py-6">
              
              {/* Columns layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 relative">
              {[
                {
                  Icon: Target,
                  title: "Problem Solver",
                  desc: "I break down complex problems into simple solutions.",
                  color: "text-cyan-600 dark:text-[#00d2ff]",
                  glow: "dark:drop-shadow-[0_0_6px_rgba(0,210,255,0.4)]"
                },
                {
                  Icon: MonitorCodeIcon,
                  title: "Clean Coder",
                  desc: "I write clean, efficient and maintainable code.",
                  color: "text-purple-600 dark:text-[#9b00ff]",
                  glow: "dark:drop-shadow-[0_0_6px_rgba(155,0,255,0.4)]"
                },
                {
                  Icon: Lightbulb,
                  title: "Quick Learner",
                  desc: "I adapt fast to new technologies and challenges.",
                  color: "text-pink-600 dark:text-[#ff007b]",
                  glow: "dark:drop-shadow-[0_0_6px_rgba(255,0,123,0.4)]"
                },
                {
                  Icon: Users,
                  title: "Team Player",
                  desc: "I collaborate, communicate and contribute to build better together.",
                  color: "text-teal-600 dark:text-[#00ffd2]",
                  glow: "dark:drop-shadow-[0_0_6px_rgba(0,255,210,0.4)]"
                },
                {
                  Icon: Rocket,
                  title: "Performance Driven",
                  desc: "I focus on efficiency, scalability and real impact.",
                  color: "text-orange-600 dark:text-[#ff9d00]",
                  glow: "dark:drop-shadow-[0_0_6px_rgba(255,157,0,0.4)]"
                },
                {
                  Icon: TrendingUp,
                  title: "Always Growing",
                  desc: "I never stop learning and exploring new possibilities.",
                  color: "text-green-600 dark:text-[#39ff14]",
                  glow: "dark:drop-shadow-[0_0_6px_rgba(57,255,20,0.4)]"
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center px-2 relative lg:border-r lg:border-white/5 last:border-r-0 transition-transform duration-300 hover:translate-y-[-2px]"
                >
                  {/* Floating Icon with soft neon drop-shadow filter */}
                  <div className="w-14 h-14 flex items-center justify-center hover:scale-110 transition-transform duration-300 select-none">
                    <item.Icon 
                      className={`w-9 h-9 transition-colors ${item.color} ${item.glow}`}
                    />
                  </div>

                  {/* Title */}
                  <h5 className={`mt-5 mb-2 text-sm font-bold tracking-tight ${item.color}`}>
                    {item.title}
                  </h5>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed px-1">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
};

export default DeveloperIdentity;
