import { motion } from "framer-motion";
import { ChevronDown, Download, Github, Linkedin, Twitter } from "lucide-react";
import FloatingCube from "./FloatingCube";
import RotatingText3D from "./RotatingText3D";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import profileDark from "@/assets/vishnu-profile-dark.png";
import profileLight from "@/assets/vishnu-profile.png";



const Hero = () => {
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const profileImg = resolvedTheme === "light" ? profileLight : profileDark;

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-20 md:py-0">
      <div className="absolute inset-0 z-0">
        <FloatingCube />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-3 md:space-y-4 text-center lg:text-left order-2"
          >
            <motion.p
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {t('hero.greeting')}
            </motion.p>

            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent leading-tight"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              {t('hero.name')}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex justify-center lg:justify-start mt-2"
            >
              <RotatingText3D />
            </motion.div>

            <motion.p
              className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {t('hero.tagline')}
            </motion.p>

            {/* Follow Me Social Links Section */}
            <motion.div
              className="mt-6 flex flex-col items-center lg:items-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4">
                Socials
              </h3>
              <div className="flex gap-6 mt-2">
                <div className="flex flex-col items-center gap-2 group">
                  <a
                    href="https://github.com/code-with-vishnu26"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-foreground/10 dark:border-white/10 flex items-center justify-center text-muted-foreground group-hover:text-foreground group-hover:border-foreground/30 group-hover:bg-foreground/5 dark:group-hover:bg-white/5 transition-all duration-300 transform group-hover:scale-105"
                    title="GitHub"
                  >
                    <Github size={20} />
                  </a>
                  <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    GitHub
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2 group">
                  <a
                    href="https://linkedin.com/in/vishnu-jillala-36479725a"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-foreground/10 dark:border-white/10 flex items-center justify-center text-muted-foreground group-hover:text-blue-500 group-hover:border-blue-500/30 group-hover:bg-blue-500/5 transition-all duration-300 transform group-hover:scale-105"
                    title="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                  <span className="text-xs font-semibold text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                    LinkedIn
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2 group">
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-foreground/10 dark:border-white/10 flex items-center justify-center text-muted-foreground group-hover:text-[#1DA1F2] group-hover:border-[#1DA1F2]/30 group-hover:bg-[#1DA1F2]/5 transition-all duration-300 transform group-hover:scale-105"
                    title="Twitter"
                  >
                    <Twitter size={20} />
                  </a>
                  <span className="text-xs font-semibold text-muted-foreground group-hover:text-[#1DA1F2] transition-colors duration-300">
                    Twitter
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center order-1 mb-6 lg:mb-0 w-full lg:w-auto"
          >
            <div className="relative w-full max-w-[460px] lg:max-w-[500px] h-[500px] lg:h-[550px] flex items-center justify-center select-none overflow-visible">

              {/* === BACKGROUND ART WORK === */}
              {resolvedTheme === "dark" ? (
                <>
                  {/* 1. Large blurred blue glow (#3B82F6) */}
                  <div className="absolute w-[400px] h-[400px] rounded-full bg-[#3B82F6]/15 blur-[100px] -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

                  {/* 2. Purple radial glow (#7C3AED) */}
                  <div
                    className="absolute w-[560px] h-[560px] rounded-full -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70 pointer-events-none"
                    style={{
                      background: "radial-gradient(circle, rgba(124,58,237,0.16) 0%, rgba(0,0,0,0) 70%)"
                    }}
                  />

                  {/* 3. Cyan accent light (#06B6D4) */}
                  <div className="absolute w-[260px] h-[260px] rounded-full bg-[#06B6D4]/20 blur-[60px] -z-10 bottom-8 right-8" />

                  {/* 4. Soft gradient blob */}
                  <div className="absolute w-[340px] h-[340px] rounded-full bg-gradient-to-tr from-[#3B82F6]/10 to-[#7C3AED]/10 blur-[80px] -z-10 top-10 left-10" />

                  {/* 5. Thin geometric lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10" viewBox="0 0 360 400">
                    <circle cx="180" cy="200" r="170" fill="none" stroke="rgba(128,128,128,0.06)" strokeWidth="1" strokeDasharray="4 6" />
                    <circle cx="180" cy="200" r="135" fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="1.5" />
                    <circle cx="180" cy="200" r="100" fill="none" stroke="rgba(124,58,237,0.05)" strokeWidth="1" strokeDasharray="20 4" />
                    <line x1="20" y1="200" x2="340" y2="200" stroke="rgba(128,128,128,0.03)" strokeWidth="1" />
                    <line x1="180" y1="20" x2="180" y2="380" stroke="rgba(128,128,128,0.03)" strokeWidth="1" />
                  </svg>

                  {/* 6. Floating particles */}
                  {[...Array(6)].map((_, idx) => (
                    <motion.div
                      key={`part-${idx}`}
                      className="absolute w-1.5 h-1.5 rounded-full bg-[#3B82F6]/30 -z-10"
                      initial={{
                        x: Math.random() * 260 - 130,
                        y: Math.random() * 300 - 100,
                        opacity: 0.1 + Math.random() * 0.4,
                        scale: 0.8 + Math.random() * 0.5,
                      }}
                      animate={{
                        y: [-100, -200],
                        opacity: [0, 0.6, 0],
                      }}
                      transition={{
                        duration: 5 + Math.random() * 4,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </>
              ) : (
                // In Light Mode, keep the background clean to match the light page colour
                <div className="absolute inset-0 bg-[#f8f9fc]/10 rounded-[24px] -z-10 pointer-events-none" />
              )}

              {/* === PORTRAIT === */}
              {/* Image Wrapper with 8px TranslateY Float */}
              <motion.div
                className="w-full h-full bg-transparent rounded-[24px] relative z-10 overflow-visible flex items-center justify-center"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* 8. Subtle glass reflection overlay */}
                <div className="absolute inset-0 rounded-[24px] pointer-events-none overflow-hidden z-20">
                  <div className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/5 to-transparent rotate-45 translate-y-[-50%] animate-[pulse_8s_infinite] opacity-30" />
                </div>

                <img
                  src={profileImg}
                  alt="Vishnu Jillala"
                  className="w-full h-full object-contain rounded-[24px]"
                  style={{
                    filter: resolvedTheme === "light"
                      ? "drop-shadow(0 15px 25px rgba(0,0,0,0.08))"
                      : "drop-shadow(0 20px 30px rgba(0,0,0,0.45))"
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={24} className="text-muted-foreground sm:w-8 sm:h-8" />
      </motion.div>
    </section>
  );
};

export default Hero;
