import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Brain, Cloud, Sparkles } from "lucide-react";

const items = [
  { Icon: Cpu, label: "Local LLMs", value: "Ollama, llama.cpp", color: "#3b82f6" },
  { Icon: Brain, label: "Agentic AI", value: "Multi-agent systems", color: "#a855f7" },
  { Icon: Cloud, label: "Cloud & DevOps", value: "K8s, GitHub Actions", color: "#f97316" },
  { Icon: Sparkles, label: "AI + UX", value: "Intelligent interfaces", color: "#10b981" },
];

const CurrentlyExploring = () => {
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Staggered introductory peek effect
    const peekTimer = setTimeout(() => {
      setExpanded(true);
      
      // Close after 5 seconds
      const closeTimer = setTimeout(() => {
        setExpanded(prev => prev ? false : false);
      }, 5000);
      
      return () => clearTimeout(closeTimer);
    }, 6500);

    return () => clearTimeout(peekTimer);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Background Overlay when expanded */}
      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(false)}
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ 
          borderTopRightRadius: expanded ? 24 : 12,
          borderBottomRightRadius: expanded ? 24 : 12
        }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        className="fixed left-0 top-[30%] z-50 flex border border-l-0 border-border/60 dark:border-white/10 bg-card/95 dark:bg-[#080b11]/95 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.15)] overflow-hidden"
      >
        {/* The expanded content (placed on the left side of the handle) */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{ width: "auto", height: "auto", opacity: 1 }}
              exit={{ width: 0, height: 0, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="max-h-[85vh] overflow-y-auto overflow-x-hidden relative"
            >
              <div className="w-[85vw] sm:w-[500px] p-6 sm:p-8">
                {/* Background ambient glows */}
                <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-pink-500/10 blur-3xl" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 mb-3">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
                    </span>
                    <span className="text-xs font-semibold tracking-widest uppercase text-purple-500 dark:text-purple-400">
                      Growth & Learning
                    </span>
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 whitespace-nowrap">
                    Currently Exploring
                  </h2>
                  <p className="text-sm text-muted-foreground mb-8">
                    Deep-diving into the next frontier of technology and intelligent systems.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {items.map(({ Icon, label, value, color }) => (
                      <div
                        key={label}
                        className="rounded-2xl border border-border/60 dark:border-white/10 bg-background/50 dark:bg-white/[0.02] p-4 hover:-translate-y-1 transition-transform duration-300"
                        style={{ boxShadow: `0 8px 24px -12px ${color}30` }}
                      >
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                          style={{ background: `${color}20`, color }}
                        >
                          <Icon size={18} />
                        </div>
                        <p className="text-[11px] uppercase tracking-wider text-muted-foreground/70 mb-1">
                          {label}
                        </p>
                        <p className="text-sm font-semibold text-foreground">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The tab/handle (placed on the right edge of the content when expanded) */}
        <motion.div 
          onClick={() => !expanded && setExpanded(true)}
          initial={false}
          animate={{ 
            width: expanded ? 0 : 44,
            opacity: expanded ? 0 : 1,
            borderLeftWidth: expanded ? 0 : 1
          }}
          className="relative flex flex-col items-center justify-center py-4 cursor-pointer bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors border-border/20 group shrink-0 overflow-hidden"
        >
          {/* Gentle background pulse animation */}
          {!expanded && (
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute inset-0 bg-purple-500/10 dark:bg-purple-500/20 pointer-events-none"
            />
          )}
          <div 
            className="relative z-10 text-[10px] font-bold tracking-widest text-foreground whitespace-nowrap opacity-80 group-hover:opacity-100 transition-opacity"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            CURRENTLY EXPLORING
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default CurrentlyExploring;
