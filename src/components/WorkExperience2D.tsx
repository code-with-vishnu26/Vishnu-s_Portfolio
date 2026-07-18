import { motion } from "framer-motion";
import { GraduationCap, Code2, Brain, Rocket, Cloud, Sparkles } from "lucide-react";
import { useState } from "react";

interface Milestone {
  year: string;
  title: string;
  place: string;
  role: string;
  desc: string;
  tech: string[];
  color: string;
  gradient: string;
  Icon: typeof GraduationCap;
  size: "sm" | "md" | "lg";
}

const milestones: Milestone[] = [
  {
    year: "2022 – Present",
    title: "Woxsen University",
    place: "Hyderabad, India",
    role: "B.Tech, Computer Science & Engineering",
    desc: "Started my journey in programming, DSA, web development, and software engineering.",
    tech: ["C", "Java", "Python", "DSA", "OS"],
    color: "#3b82f6",
    gradient: "from-blue-500/20 via-blue-500/5 to-transparent",
    Icon: GraduationCap,
    size: "lg",
  },
  {
    year: "2023 – 2024",
    title: "Full Stack Lab",
    place: "Personal Projects",
    role: "Full Stack Developer",
    desc: "Built multiple full-stack web applications with modern frontend and backend tech.",
    tech: ["React", "Node.js", "Express", "PHP", "MySQL", "MongoDB"],
    color: "#10b981",
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    Icon: Code2,
    size: "md",
  },
  {
    year: "2024 – 2025",
    title: "AI Research Center",
    place: "AI & Machine Learning",
    role: "AI/ML Engineer",
    desc: "Worked on AI, ML, data analytics, and LLM-based applications.",
    tech: ["Python", "Scikit-learn", "TensorFlow", "OpenAI", "LangChain"],
    color: "#a855f7",
    gradient: "from-purple-500/20 via-purple-500/5 to-transparent",
    Icon: Brain,
    size: "md",
  },
  {
    year: "2025",
    title: "Innovation Hub",
    place: "Hackathons & Enterprise",
    role: "Product Engineer",
    desc: "Built real-world projects and competed in hackathons.",
    tech: ["Industrial Safety AI", "Blockchain PM", "ResumeRanker", "Expense Tracker"],
    color: "#ec4899",
    gradient: "from-pink-500/20 via-pink-500/5 to-transparent",
    Icon: Rocket,
    size: "lg",
  },
  {
    year: "2025 – 2026",
    title: "Cloud Data Center",
    place: "Cloud & DevOps",
    role: "Cloud Engineer",
    desc: "Implemented containerization, CI/CD, and production cloud deployments.",
    tech: ["Docker", "Kubernetes", "AWS", "GitHub Actions", "Vercel", "Netlify"],
    color: "#f59e0b",
    gradient: "from-amber-500/20 via-amber-500/5 to-transparent",
    Icon: Cloud,
    size: "md",
  },
  {
    year: "2026 – Present",
    title: "Future Tech Tower",
    place: "Open to Opportunities",
    role: "Software Engineer",
    desc: "Seeking SWE, Full Stack, AI, Backend, or Cloud Engineer roles.",
    tech: ["SWE", "Full Stack", "AI Engineer", "Backend", "Cloud"],
    color: "#06b6d4",
    gradient: "from-cyan-500/20 via-cyan-500/5 to-transparent",
    Icon: Sparkles,
    size: "md",
  },
];

const sizeClass: Record<Milestone["size"], string> = {
  sm: "md:col-span-3 md:row-span-1",
  md: "md:col-span-4 md:row-span-1",
  lg: "md:col-span-6 md:row-span-1",
};

const WorkExperience2D = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="professional-journey" className="relative py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Work Experience
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto text-sm sm:text-base text-center">A chapter-by-chapter walk through the milestones that shaped my engineering journey.</p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[minmax(220px,auto)] gap-4 md:gap-5">
          {milestones.map((m, i) => {
            const Icon = m.Icon;
            const isActive = active === i;
            return (
              <motion.article
                key={m.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className={`group relative overflow-hidden rounded-2xl border border-border/60 dark:border-white/10 bg-card/60 dark:bg-white/[0.03] backdrop-blur-xl p-5 sm:p-6 transition-all duration-500 hover:-translate-y-1 hover:border-transparent ${sizeClass[m.size]}`}
                style={
                  isActive
                    ? { boxShadow: `0 20px 60px -20px ${m.color}55, 0 0 0 1px ${m.color}40` }
                    : undefined
                }
              >
                {/* Gradient wash */}
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${m.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
                {/* Corner glow */}
                <div
                  className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"
                  style={{ background: m.color }}
                />

                <div className="relative flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div
                      className="flex items-center justify-center w-11 h-11 rounded-xl border transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        background: `${m.color}18`,
                        borderColor: `${m.color}40`,
                        color: m.color,
                      }}
                    >
                      <Icon size={20} strokeWidth={2.2} />
                    </div>
                    <span
                      className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border"
                      style={{
                        color: m.color,
                        borderColor: `${m.color}55`,
                        background: `${m.color}12`,
                      }}
                    >
                      {m.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-foreground leading-tight mb-1">
                    {m.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground/90 mb-1">{m.role}</p>
                  <p className="text-[11px] sm:text-xs text-muted-foreground/60 mb-3">{m.place}</p>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {m.desc}
                  </p>

                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {m.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-md bg-background/60 dark:bg-white/5 border border-border/60 dark:border-white/10 text-foreground/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Bottom progress bar */}
                  <div className="mt-4 h-1 w-full rounded-full bg-border/40 dark:bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${((i + 1) / milestones.length) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.05 }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${m.color}, ${m.color}80)` }}
                    />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience2D;
