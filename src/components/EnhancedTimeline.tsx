import React from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Target, 
  MapPin, 
  Star, 
  Briefcase, 
  Code2, 
  Monitor, 
  Cpu, 
  Database, 
  Cloud, 
  Heart
} from "lucide-react";
import { useTheme } from "next-themes";
import woxsenCampus from "@/assets/woxsen-campus.jpg";

export function EnhancedTimeline() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section className="min-h-screen bg-transparent text-foreground py-16 px-4 sm:px-6 md:px-8 relative overflow-hidden select-none">
      {/* Background soft ambient glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1350px] mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 tracking-tight bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">
            Work Experience
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-6 rounded-full opacity-60" />
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-medium">
            A journey of learning, growth, and building towards a meaningful future.
          </p>
        </motion.div>

        {/* Timeline Axis & Cards Container */}
        <div className="relative">
          {/* Central/Left vertical line */}
          <div className="absolute left-6 md:left-[120px] top-4 bottom-4 w-[3px] bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 rounded-full opacity-20 dark:opacity-35" />

          {/* Milestone 1: Woxsen University */}
          <div className="relative flex flex-col md:flex-row items-stretch mb-12 sm:mb-16">
            {/* Year Pill (Desktop Left) */}
            <div className="hidden md:flex md:w-[120px] justify-end items-start pt-3 pr-6 shrink-0">
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 tracking-wider bg-purple-500/10 border border-purple-500/20 px-3.5 py-1.5 rounded-full whitespace-nowrap">
                2022 – 2026
              </span>
            </div>

            {/* Timeline Circle Node */}
            <div className="absolute left-2.5 md:left-[108.5px] top-2 z-20 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-background border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)] dark:shadow-[0_0_15px_rgba(168,85,247,0.4)] flex items-center justify-center text-purple-600 dark:text-purple-400">
                <GraduationCap size={18} />
              </div>
            </div>

            {/* Card Content (Right Side) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="ml-16 md:ml-12 flex-grow bg-card dark:bg-white/[0.02] border border-border dark:border-white/5 hover:border-purple-500/30 dark:hover:border-purple-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_10px_30px_rgba(168,85,247,0.03)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                {/* Left Column: Info (Col Span 1) */}
                <div className="lg:col-span-1 flex flex-col justify-between">
                  <div>
                    {/* Card Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                          Woxsen University
                        </h2>
                        <p className="text-sm font-semibold text-purple-600 dark:text-purple-300 mt-1">
                          B.Tech, Computer Science & Engineering
                        </p>
                      </div>
                      {/* Year Pill (Mobile / Top Right of Card) */}
                      <div className="self-start sm:self-center shrink-0 md:hidden">
                        <span className="text-xs font-bold text-purple-600 dark:text-purple-400 tracking-wider bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
                          2022 – 2026
                        </span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-semibold mb-6">
                      <MapPin size={12} className="text-purple-500 dark:text-purple-400" />
                      Hyderabad, India
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                      Completed my undergraduate journey at Woxsen University. Built a strong foundation in computer science, explored various technologies, worked on real-world projects, and continuously improved problem-solving and analytical skills.
                    </p>
                  </div>

                  {/* Key Learnings Subsection */}
                  <div className="border-t border-border dark:border-white/5 pt-5">
                    <h4 className="text-sm font-bold text-purple-600 dark:text-purple-400 flex items-center gap-2 mb-4">
                      <Star size={14} className="fill-purple-500/10 dark:fill-purple-400/20" /> Key Learnings
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6 text-sm text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        Computer Science Fundamentals
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        Object Oriented Programming
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        Data Structures & Algorithms
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        Problem Solving & DSA
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        Web Development
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        Software Engineering Basics
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        Database Management
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        Teamwork & Collaboration
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Campus Image Media Banner (Col Span 1) */}
                <div className="lg:col-span-1 h-64 lg:h-auto min-h-[300px] rounded-2xl overflow-hidden border border-border dark:border-white/5 shadow-inner relative group select-none flex items-stretch">
                  <img 
                    src={woxsenCampus} 
                    alt="Woxsen University Campus" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Milestone 2: Future Goal */}
          <div className="relative flex flex-col md:flex-row items-stretch">
            {/* Year Pill (Desktop Left) */}
            <div className="hidden md:flex md:w-[120px] justify-end items-start pt-3 pr-6 shrink-0">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full whitespace-nowrap">
                2026 & Beyond
              </span>
            </div>

            {/* Timeline Circle Node */}
            <div className="absolute left-2.5 md:left-[108.5px] top-2 z-20 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-background border-2 border-blue-500 shadow-[0_0_15px_rgba(14,165,233,0.2)] dark:shadow-[0_0_15px_rgba(14,165,233,0.4)] flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Target size={18} />
              </div>
            </div>

            {/* Card Content (Right Side) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="ml-16 md:ml-12 flex-grow bg-card dark:bg-white/[0.02] border border-border dark:border-white/5 hover:border-blue-500/30 dark:hover:border-blue-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_10px_30px_rgba(14,165,233,0.03)]"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                    Future Goal
                  </h2>
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-300 mt-1">
                    Software Engineer
                  </p>
                </div>
                {/* Year Pill (Mobile / Top Right of Card) */}
                <div className="self-start sm:self-center shrink-0 md:hidden">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                    2026 & Beyond
                  </span>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-semibold mb-6">
                <Briefcase size={12} className="text-blue-500 dark:text-blue-400" />
                Open to Opportunities
              </div>

              {/* Description */}
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Actively seeking opportunities as a Software Engineer where I can apply my skills, solve real-world problems, and contribute to building impactful products. Eager to learn, grow, and create value in a challenging and innovative environment.
              </p>

              {/* What I'm Looking For Subsection */}
              <div className="border-t border-border dark:border-white/5 pt-5 mb-6">
                <h4 className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2 mb-4">
                  <Target size={14} className="fill-blue-500/10 dark:fill-blue-400/20" /> What I'm Looking For
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                    <Code2 size={14} className="text-blue-500 dark:text-blue-400" />
                    Software Engineer
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                    <Monitor size={14} className="text-blue-500 dark:text-blue-400" />
                    Full Stack Developer
                  </div>
                </div>
              </div>

              {/* Footer Note */}
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic">
                <Heart size={14} className="text-blue-500 dark:text-blue-400 shrink-0" />
                Passionate about technology, building scalable solutions, and making a positive impact through code.
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}