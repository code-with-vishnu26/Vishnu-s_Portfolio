import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Globe2, Zap, MapPin, Cpu, Brain, Cloud, Sparkles, X } from "lucide-react";

const availabilityItems = [
  { Icon: Briefcase, label: "Full-Time Roles", value: "Open", color: "#10b981" },
  { Icon: Zap, label: "Internships", value: "Open", color: "#3b82f6" },
  { Icon: Globe2, label: "Work Mode", value: "Remote / Hybrid / Onsite", color: "#a855f7" },
  { Icon: MapPin, label: "Location", value: "India · Open to relocate", color: "#ec4899" },
];

const exploringItems = [
  { Icon: Cpu, label: "Local LLMs", value: "Ollama, llama.cpp", color: "#3b82f6" },
  { Icon: Brain, label: "Agentic AI", value: "Multi-agent systems", color: "#a855f7" },
  { Icon: Cloud, label: "Cloud & DevOps", value: "K8s, GitHub Actions", color: "#f97316" },
  { Icon: Sparkles, label: "AI + UX", value: "Intelligent interfaces", color: "#10b981" },
];

const AvailabilityCard = () => {
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"availability" | "exploring">("availability");

  useEffect(() => {
    setMounted(true);

    // Introductory peek effect
    const peekTimer = setTimeout(() => {
      setExpanded(true);

      // Close after 5 seconds
      const closeTimer = setTimeout(() => {
        setExpanded(prev => prev ? false : false);
      }, 5000);

      return () => clearTimeout(closeTimer);
    }, 1000);

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
          borderTopLeftRadius: expanded ? 24 : 12,
          borderBottomLeftRadius: expanded ? 24 : 12
        }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        className="fixed right-0 top-1/4 z-50 flex border border-r-0 border-border/60 dark:border-white/10 bg-card/95 dark:bg-[#080b11]/95 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.15)] overflow-hidden"
      >
        {/* The Tab/Handle on the right edge */}
        <motion.div 
          onClick={() => !expanded && setExpanded(true)}
          initial={false}
          animate={{ 
            width: expanded ? 0 : 44,
            opacity: expanded ? 0 : 1,
            borderRightWidth: expanded ? 0 : 1
          }}
          className="relative flex flex-col items-center justify-center py-4 cursor-pointer bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 transition-all border-l border-red-500/20 group shrink-0 overflow-hidden shadow-[0_0_20px_5px_rgba(239,68,68,0.35)] dark:shadow-[0_0_25px_8px_rgba(239,68,68,0.25)]"
        >
          {/* Gentle background pulse animation using a white glow on the red backdrop */}
          {!expanded && (
            <motion.div
              animate={{ opacity: [0, 0.4, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute inset-0 bg-white pointer-events-none"
            />
          )}
          <div 
            className="relative z-10 text-xs sm:text-[13px] font-extrabold tracking-[0.25em] text-white whitespace-nowrap group-hover:text-white/90 transition-colors duration-300"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            STATUS
          </div>
        </motion.div>

        {/* The expanded content */}
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
                <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl" />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                        Status
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        Real-time status updates on availability and focus.
                      </p>
                    </div>
                    <button
                      onClick={() => setExpanded(false)}
                      className="p-1.5 rounded-lg bg-foreground/5 dark:bg-white/5 hover:bg-foreground/10 dark:hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Tab Selector Buttons */}
                  <div className="flex gap-2 p-1.5 bg-black/5 dark:bg-white/5 rounded-xl mb-6">
                    <button
                      onClick={() => setActiveTab("availability")}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === "availability"
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      Availability
                    </button>
                    <button
                      onClick={() => setActiveTab("exploring")}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === "exploring"
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      Tech Focus
                    </button>
                  </div>

                  {/* Tab Contents */}
                  <div className="min-h-[200px]">
                    <AnimatePresence mode="wait">
                      {activeTab === "availability" ? (
                        <motion.div
                          key="availability-tab"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ duration: 0.2 }}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        >
                          {availabilityItems.map(({ Icon, label, value, color }) => (
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
                        </motion.div>
                      ) : (
                        <motion.div
                          key="exploring-tab"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        >
                          {exploringItems.map(({ Icon, label, value, color }) => (
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
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default AvailabilityCard;
