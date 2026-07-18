import { motion } from "framer-motion";
import { Github, Linkedin, Calendar, MessageCircle, Twitter, Instagram } from "lucide-react";

const waUrl = `https://wa.me/916304365128?text=${encodeURIComponent(
  "Hi Vishnu, I saw your portfolio and I want to work with you."
)}`;

const contactButtons = [
  {
    label: "Book a Meeting",
    sub: "Schedule on Calendly",
    href: "https://calendly.com/vishnujillala/30min",
    bg: "bg-background border border-border",
    iconBg: "bg-foreground/5 border border-border group-hover:bg-primary/10 group-hover:border-primary/30",
    textColor: "text-foreground",
    subColor: "text-muted-foreground",
    shadow: "shadow-xl hover:shadow-2xl",
    Icon: () => <Calendar className="h-7 w-7" strokeWidth={2} />,
  },
  {
    label: "WhatsApp Me",
    sub: "Chat directly",
    href: waUrl,
    bg: "bg-[#25D366]",
    iconBg: "bg-white/20 group-hover:bg-white/30",
    textColor: "text-white",
    subColor: "text-white/80",
    shadow: "shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.6)]",
    Icon: () => <MessageCircle className="h-7 w-7" strokeWidth={2} />,
  },
];

const socialButtons = [
  {
    name: "GitHub",
    label: "View my repos",
    Icon: () => <Github size={22} />,
    url: "https://github.com/code-with-vishnu26",
    bg: "bg-background border border-border",
    iconColor: "text-foreground",
    textColor: "text-foreground",
    subColor: "text-muted-foreground",
    shadow: "hover:shadow-xl",
  },
  {
    name: "LinkedIn",
    label: "Connect professionally",
    Icon: () => <Linkedin size={22} />,
    url: "https://linkedin.com/in/vishnu-jillala-36479725a",
    bg: "bg-[#0A66C2]",
    iconColor: "text-white",
    textColor: "text-white",
    subColor: "text-white/75",
    shadow: "hover:shadow-[0_8px_30px_rgba(10,102,194,0.5)]",
  },
  {
    name: "Twitter",
    label: "Follow my updates",
    Icon: () => <Twitter size={22} />,
    url: "https://twitter.com",
    bg: "bg-[#1DA1F2]",
    iconColor: "text-white",
    textColor: "text-white",
    subColor: "text-white/75",
    shadow: "hover:shadow-[0_8px_30px_rgba(29,161,242,0.5)]",
  },
  {
    name: "Instagram",
    label: "Check my photos",
    Icon: () => <Instagram size={22} />,
    url: "https://instagram.com",
    bg: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    iconColor: "text-white",
    textColor: "text-white",
    subColor: "text-white/75",
    shadow: "hover:shadow-[0_8px_30px_rgba(238,42,123,0.5)]",
  },
];

const CtaBanner = () => (
  <section className="py-16 sm:py-24 relative z-10 overflow-hidden">
    {/* Ambient glow */}
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="w-[700px] h-[300px] rounded-full bg-primary/10 blur-[120px]" />
    </div>

    <div className="container mx-auto px-4 relative">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
          Follow Me
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mt-2">
          Stay connected and follow my journey across platforms
        </p>
      </motion.div>

      {/* Follow Me social buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-5 flex-wrap">
        {socialButtons.map(({ name, label, Icon, url, bg, iconColor, textColor, subColor, shadow }, i) => (
          <motion.a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center gap-4 px-7 py-4 rounded-2xl ${bg} ${shadow} shadow-lg transition-all duration-300 min-w-[200px] group`}
          >
            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 ${iconColor}`}>
              <Icon />
            </span>
            <div className="text-left">
              <p className={`text-sm font-bold leading-tight ${textColor}`}>{name}</p>
              <p className={`text-xs leading-tight ${subColor}`}>{label}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

export default CtaBanner;
