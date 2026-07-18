import { motion } from "framer-motion";
import { Search, Palette, Hammer, TestTube, Rocket, Activity, TrendingUp } from "lucide-react";

const steps = [
  { Icon: Search, label: "Understand", desc: "Clarify goals, users, constraints." },
  { Icon: Palette, label: "Design", desc: "Sketch flows, systems, and APIs." },
  { Icon: Hammer, label: "Build", desc: "Ship focused, tested increments." },
  { Icon: TestTube, label: "Test", desc: "Unit, integration, and edge cases." },
  { Icon: Rocket, label: "Deploy", desc: "CI/CD to cloud with rollback safety." },
  { Icon: Activity, label: "Monitor", desc: "Logs, metrics, and error tracking." },
  { Icon: TrendingUp, label: "Improve", desc: "Iterate on real user feedback." },
];

const HowIWork = () => (
  <section className="py-10 sm:py-14 relative z-10">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 sm:mb-12"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
          <span className="text-foreground">How I </span>
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Work</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        <p className="text-sm sm:text-base text-muted-foreground mt-4 max-w-xl mx-auto">
          A repeatable engineering process I follow on every project.
        </p>
      </motion.div>

      <div className="relative">
        {/* Connecting line - desktop */}
        <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {steps.map(({ Icon, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative flex flex-col items-center text-center group"
            >
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/30 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-primary/10">
                <Icon size={24} />
              </div>
              <div className="mt-3 text-xs font-semibold tracking-widest uppercase text-primary">
                0{i + 1}
              </div>
              <h3 className="text-sm sm:text-base font-bold text-foreground mt-1">{label}</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-snug">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HowIWork;
