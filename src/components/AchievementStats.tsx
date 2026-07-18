import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Code2, Rocket, Award, Clock } from "lucide-react";

const stats = [
  { value: 25, suffix: "+", label: "Technologies", desc: "Languages & frameworks in production use", icon: Code2 },
  { value: 30, suffix: "+", label: "Projects", desc: "Full-stack, AI & cloud applications built", icon: Rocket },
  { value: 20, suffix: "+", label: "Certifications", desc: "Coursera, Meta, Google, IBM & more", icon: Award },
  { value: 1000, suffix: "+", label: "Coding Hours", desc: "Dedicated learning and development time", icon: Clock },
];

const Counter = ({ to, suffix }: { to: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${Math.floor(v)}${suffix}`);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 1.8, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, to, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const AchievementStats = () => (
  <section id="achievements" className="py-12 sm:py-16 relative z-10">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-10 sm:mb-12"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
          Professional <span className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Achievements</span>
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
          Quantifiable results that reflect my learning journey and hands-on impact.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/70 dark:bg-white/5 backdrop-blur p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-2xl group-hover:from-blue-500/25 group-hover:to-purple-500/25 transition-colors" />
              <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500 dark:text-blue-400 mb-3" />
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm sm:text-base font-semibold text-foreground">{s.label}</div>
              <div className="mt-1 text-xs sm:text-sm text-muted-foreground leading-snug">{s.desc}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default AchievementStats;
