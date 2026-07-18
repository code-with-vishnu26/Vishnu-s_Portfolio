import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Github, Linkedin, Twitter, MessageCircle, Mail, MapPin, Code2, Cpu, Terminal, Monitor, Cloud, Database, GitBranch, GitCommit, Download } from "lucide-react";

const DiscordIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleNav = (item: string) => {
    const routeMap: { [key: string]: string } = {
      "Projects": "/projects",
      "Journey": "/journey",
      "Certifications": "/certifications",
      "Resume": "/resume",
      "Contact": "/contact",
    };
    if (routeMap[item]) {
      navigate(routeMap[item]);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const sectionMap: { [key: string]: string } = {
      "Home": "hero",
      "Identity": "developer-identity",
      "Process": "how-i-work",
      "Achievements": "achievements",
      "GitHub": "github-activity",
    };
    const targetId = sectionMap[item];
    const goScroll = () => {
      if (targetId === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (targetId) {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      }
    };
    if (window.location.pathname !== "/portfolio") {
      navigate("/portfolio");
      setTimeout(goScroll, 150);
    } else {
      goScroll();
    }
  };

  const socials = [
    { icon: Github, href: "https://github.com/code-with-vishnu26", label: "GitHub", hoverColor: "hover:text-foreground" },
    { icon: Linkedin, href: "https://linkedin.com/in/vishnu-jillala-36479725a", label: "LinkedIn", hoverColor: "hover:text-blue-500" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter", hoverColor: "hover:text-[#1DA1F2]" },
    { icon: MessageCircle, href: "https://wa.me/916304365128", label: "WhatsApp", hoverColor: "hover:text-emerald-500" },
    { icon: DiscordIcon, href: "https://discord.com", label: "Discord", hoverColor: "hover:text-[#5865F2]" },
  ];

  return (
    <footer className="relative z-10 border-t-2 border-border/60 dark:border-t dark:border-white/5 bg-card/30 dark:bg-black/20 backdrop-blur-md pt-16 pb-8">
      {/* Background ambient light */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[150px] rounded-full bg-blue-500/5 blur-[80px]" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[150px] rounded-full bg-purple-500/5 blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-border/40 dark:border-white/5">
          
          {/* Brand/Bio Column */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center overflow-hidden p-1 shadow-sm shrink-0">
                <img src="/logo.png" alt="VJ Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-foreground font-black tracking-tight text-xl leading-none">Vishnu Jillala</span>
                <span className="text-[10px] font-extrabold tracking-widest text-muted-foreground/75 uppercase mt-1 leading-none">Developer</span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Building scalable software, intelligent applications, and modern digital experiences with clean code and innovative technologies.
            </p>


            <div className="mt-2">
              <h4 className="text-xs font-extrabold tracking-widest text-foreground uppercase mb-1">
                Follow Me
              </h4>
              <p className="text-xs text-muted-foreground/80">
                Stay connected and follow my journey across platforms
              </p>
            </div>

            {/* Social media icons */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label, hoverColor }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-9 h-9 rounded-lg border border-border/60 dark:border-white/5 flex items-center justify-center text-muted-foreground bg-background/50 dark:bg-white/[0.02] transition-colors duration-300 ${hoverColor}`}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-1 flex flex-col gap-3">
            <h3 className="text-xs font-extrabold tracking-widest text-foreground uppercase">
              EXPLORE
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-muted-foreground font-medium">
              <li>
                <button onClick={() => handleNav("Home")} className="hover:text-foreground transition-colors text-left uppercase tracking-wider font-semibold text-[10px]">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("Identity")} className="hover:text-foreground transition-colors text-left uppercase tracking-wider font-semibold text-[10px]">
                  Identity
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("Projects")} className="hover:text-foreground transition-colors text-left uppercase tracking-wider font-semibold text-[10px]">
                  Projects
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("Journey")} className="hover:text-foreground transition-colors text-left uppercase tracking-wider font-semibold text-[10px]">
                  Journey
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("Certifications")} className="hover:text-foreground transition-colors text-left uppercase tracking-wider font-semibold text-[10px]">
                  Certificates
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("Resume")} className="hover:text-foreground transition-colors text-left uppercase tracking-wider font-semibold text-[10px]">
                  Resume
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("Contact")} className="hover:text-foreground transition-colors text-left uppercase tracking-wider font-semibold text-[10px]">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Expertise Column */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h3 className="text-xs font-extrabold tracking-widest text-foreground uppercase">
              Expertise
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-muted-foreground font-semibold">
              {[
                { label: "Full Stack Development", icon: Code2, color: "text-orange-500" },
                { label: "AI & Machine Learning", icon: Cpu, color: "text-sky-400" },
                { label: "Backend Development", icon: Terminal, color: "text-purple-500" },
                { label: "Frontend Development", icon: Monitor, color: "text-pink-500" },
                { label: "Cloud & DevOps", icon: Cloud, color: "text-violet-500" },
                { label: "Database Design", icon: Database, color: "text-cyan-500" },
                { label: "API Development", icon: GitBranch, color: "text-teal-500" },
                { label: "System Design", icon: GitCommit, color: "text-yellow-500" }
              ].map(({ label, icon: Icon, color }) => (
                <li key={label} className="flex items-center gap-2.5 text-muted-foreground/80 hover:text-foreground transition-colors cursor-default py-0.5">
                  <Icon size={14} className={`${color} shrink-0`} />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions Column */}
          <div className="md:col-span-4 md:col-start-9 flex flex-row items-center justify-between gap-6 pt-4 w-full">
            <TooltipProvider>
              {/* Action Buttons */}
              <div className="flex flex-col items-start gap-8 relative">
                {/* Let's Talk Item */}
                <div className="flex flex-col items-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleNav("Contact")}
                        aria-label="Let's Talk"
                        className="relative group flex flex-col items-center justify-center gap-1.5 h-32 w-32 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white transition-all duration-300 shadow-[0_4px_15px_rgba(59,130,246,0.2)] hover:shadow-[0_8px_25px_rgba(139,92,246,0.45)] hover:scale-110 active:scale-95 shrink-0"
                      >
                        <MessageCircle size={26} className="group-hover:rotate-12 transition-transform duration-300" />
                        <span className="text-[10px] font-black tracking-wider uppercase">Let's Talk</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-card border border-border text-foreground px-3 py-1.5 rounded-lg shadow-lg">
                      <p className="text-xs font-semibold">LET'S TALK</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                {/* Download Resume Item */}
                <div className="flex flex-col items-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href="/Vishnu_Jillala_Resume.pdf"
                        download="Vishnu_Jillala_Resume.pdf"
                        aria-label="Download Resume"
                        className="relative group flex flex-col items-center justify-center gap-1.5 h-32 w-32 rounded-full border border-blue-500/30 dark:border-purple-500/30 bg-background/50 dark:bg-white/[0.02] text-foreground hover:text-primary transition-all duration-300 hover:border-primary/50 hover:scale-110 active:scale-95 shrink-0 shadow-sm hover:shadow-[0_8px_25px_rgba(59,130,246,0.2)]"
                      >
                        <Download size={26} className="group-hover:-translate-y-0.5 group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="text-[10px] font-black tracking-wider uppercase">Resume</span>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent className="bg-card border border-border text-foreground px-3 py-1.5 rounded-lg shadow-lg">
                      <p className="text-xs font-semibold">Resume</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              {/* Coffee Illustration */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="hidden sm:flex flex-col items-center shrink-0"
              >
                <img
                  src="/coffee.png"
                  alt="Coffee Illustration"
                  className="h-60 w-60 object-contain select-none pointer-events-none drop-shadow-md"
                />
              </motion.div>
            </TooltipProvider>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4 border-t-2 border-border/30 dark:border-t dark:border-border/10">
          <p className="text-xs text-muted-foreground/60 font-medium text-center md:text-left md:w-1/3">
            © {currentYear} Vishnu Jillala. All rights reserved.
          </p>

          {/* Centered Divider Badge */}
          <div className="flex items-center gap-3 justify-center w-full md:w-1/3 my-2 md:my-0">
            <div className="flex items-center flex-1 justify-end max-w-[120px]">
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#9b00ff]/10 to-[#9b00ff]/30 dark:via-blue-500/10 dark:to-blue-500/30" />
              <div className="w-1.5 h-1.5 rotate-45 border border-[#9b00ff]/40 dark:border-blue-500/40 bg-[#9b00ff]/10 dark:bg-blue-500/10 shadow-[0_0_8px_rgba(155,0,255,0.4)] dark:shadow-[0_0_8px_rgba(59,130,246,0.4)] shrink-0" />
            </div>
            
            <div className="px-3.5 py-1 rounded-full border border-[#9b00ff]/30 dark:border-blue-500/30 bg-[#9b00ff]/5 dark:bg-blue-500/5 shadow-[0_0_12px_rgba(155,0,255,0.15)] dark:shadow-[0_0_12px_rgba(59,130,246,0.15)] flex items-center justify-center">
              <span className="font-mono text-[11px] font-bold bg-gradient-to-r from-[#9b00ff] to-blue-500 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent select-none">
                &lt;/&gt;
              </span>
            </div>

            <div className="flex items-center flex-1 justify-start max-w-[120px]">
              <div className="w-1.5 h-1.5 rotate-45 border border-[#9b00ff]/40 dark:border-blue-500/40 bg-[#9b00ff]/10 dark:bg-blue-500/10 shadow-[0_0_8px_rgba(155,0,255,0.4)] dark:shadow-[0_0_8px_rgba(59,130,246,0.4)] shrink-0" />
              <div className="h-[1px] w-full bg-gradient-to-l from-transparent via-[#9b00ff]/10 to-[#9b00ff]/30 dark:via-blue-500/10 dark:to-blue-500/30" />
            </div>
          </div>

          <p className="text-xs text-muted-foreground/60 font-medium tracking-wide text-center md:text-right md:w-1/3">
            Thanks for Visiting
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
