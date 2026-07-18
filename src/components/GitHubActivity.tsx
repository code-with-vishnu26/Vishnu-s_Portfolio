import { useState } from "react";
import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import { ArrowUpRight, GitCommit, FolderGit2, Flame, Github } from "lucide-react";

const years = [2026, 2025, 2024, 2023];

const GitHubActivity = () => {
  const [year, setYear] = useState<number>(2026);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section id="github-activity" className="py-12 sm:py-16 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-foreground">
            GitHub <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Activity</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Daily commits and consistency across the years.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto w-full"
        >
          {/* Card Header: Profile pinned left, Year pills truly centered */}
          <div className="relative flex items-center justify-center mb-8 border-b-2 border-border/60 dark:border-b dark:border-border/40 pb-6">
            {/* Left: Profile identity - absolutely pinned */}
            <a
              href="https://github.com/code-with-vishnu26"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-0 flex items-center gap-2 group shrink-0"
            >
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                <Github size={14} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors leading-tight">code-with-vishnu26</h4>
                <p className="text-[10px] text-muted-foreground leading-tight">GitHub Profile</p>
              </div>
            </a>

            {/* Year pills — truly centered in the full row */}
            <div className="flex flex-wrap gap-2 justify-center">
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => setYear(y)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    year === y
                      ? "bg-foreground text-background"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>



          {/* Full-width Calendar */}
          <div className="flex flex-col justify-center p-4 rounded-2xl border border-border/30 bg-background/40 dark:bg-white/[0.005] w-full overflow-hidden mb-4">
            <div className="w-full flex justify-center" style={{ overflowX: "auto" }}>
              <GitHubCalendar
                username="code-with-vishnu26"
                year={year}
                colorScheme={isDark ? "dark" : "light"}
                blockSize={14}
                blockMargin={4}
                fontSize={12}
                theme={{
                  light: ["#eef2ff", "#c7d2fe", "#818cf8", "#4f46e5", "#3730a3"],
                  dark: ["#1e1e2e", "#312e81", "#4f46e5", "#818cf8", "#c7d2fe"],
                }}
              />
            </div>
          </div>

          {/* Stats row below calendar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl border border-border/40 bg-background/30 dark:bg-white/[0.005] flex flex-col justify-between">
              <GitCommit className="text-blue-500 mb-2" size={18} />
              <div>
                <p className="text-xl sm:text-2xl font-bold text-foreground">1K+</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">Total Commits</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border/40 bg-background/30 dark:bg-white/[0.005] flex flex-col justify-between">
              <FolderGit2 className="text-purple-500 mb-2" size={18} />
              <div>
                <p className="text-xl sm:text-2xl font-bold text-foreground">30+</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">Public Repos</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border/40 bg-background/30 dark:bg-white/[0.005] flex flex-col justify-between">
              <Flame className="text-orange-500 mb-2" size={18} />
              <div>
                <p className="text-xl sm:text-2xl font-bold text-foreground">32 Days</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">Max Streak</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border/40 bg-background/30 dark:bg-white/[0.005] flex flex-col justify-between">
              <div className="text-green-500 mb-2 font-bold text-sm">JS/PY</div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-foreground">25+</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">Technologies</p>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default GitHubActivity;
