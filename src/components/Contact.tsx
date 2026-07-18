import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Send, Calendar, MessageCircle, Twitter, Instagram } from "lucide-react";
import { useState } from "react";
import emailjs from '@emailjs/browser';
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const DiscordIcon = ({ size = 30, className }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
  </svg>
);

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await emailjs.send('service_81xbaw3', 'template_5gwyuas', {
        from_name: formData.name, from_email: formData.email, message: formData.message, to_email: 'soulpaths78@gmail.com'
      }, 'HXeAdtP1KAvEAaYQB');
      toast.success(t('contact.success'));
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error('EmailJS error:', error);
      toast.error(t('contact.error'));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const socialLinks = [
    { name: "GitHub", icon: Github, url: "https://github.com/code-with-vishnu26", color: "hover:text-foreground" },
    { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com/in/vishnu-jillala-36479725a", color: "hover:text-blue-500" }
  ];

  const contactButtons = [
    {
      id: "calendly",
      label: "Book a Meeting on Calendly",
      href: "https://calendly.com/vishnujillala/30min",
      Icon: Calendar,
      className: "bg-transparent border border-foreground/10 dark:border-white/10 text-foreground hover:border-primary/40 hover:bg-primary/5 group",
      iconClassName: "text-foreground group-hover:text-primary transition-colors",
      shadowStyle: "hover:shadow-[0_8px_25px_rgba(59,130,246,0.15)]",
      delay: 0,
    },
    {
      id: "whatsapp",
      label: "WhatsApp Me",
      href: `https://wa.me/916304365128?text=${encodeURIComponent('Hi Vishnu, I saw your portfolio and I want to work with you.')}`,
      Icon: MessageCircle,
      className: "bg-transparent border border-foreground/10 dark:border-white/10 text-[#25D366] hover:border-[#25D366]/40 hover:bg-[#25D366]/5 group",
      iconClassName: "text-[#25D366]",
      shadowStyle: "hover:shadow-[0_8px_25px_rgba(37,211,102,0.25)]",
      delay: 0.2,
    },
    {
      id: "twitter",
      label: "Follow on Twitter (X)",
      href: "https://twitter.com",
      Icon: Twitter,
      className: "bg-transparent border border-foreground/10 dark:border-white/10 text-[#1DA1F2] hover:border-[#1DA1F2]/40 hover:bg-[#1DA1F2]/5 group",
      iconClassName: "text-[#1DA1F2]",
      shadowStyle: "hover:shadow-[0_8px_25px_rgba(29,161,242,0.25)]",
      delay: 0.4,
    },
    {
      id: "instagram",
      label: "Follow on Instagram",
      Icon: Instagram,
      href: "https://instagram.com",
      className: "bg-transparent border border-foreground/10 dark:border-white/10 text-[#ee2a7b] hover:border-[#ee2a7b]/40 hover:bg-[#ee2a7b]/5 group",
      iconClassName: "text-[#ee2a7b]",
      shadowStyle: "hover:shadow-[0_8px_25px_rgba(238,42,123,0.25)]",
      delay: 0.6,
    },
    {
      id: "discord",
      label: "Join Discord",
      href: "https://discord.com",
      Icon: DiscordIcon,
      className: "bg-transparent border border-foreground/10 dark:border-white/10 text-[#5865F2] hover:border-[#5865F2]/40 hover:bg-[#5865F2]/5 group",
      iconClassName: "text-[#5865F2]",
      shadowStyle: "hover:shadow-[0_8px_25px_rgba(88,101,242,0.25)]",
      delay: 0.8,
    },
  ];

  return (
    <section id="contact" className="py-8 sm:py-10 md:py-14 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">{t('contact.title')}</h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">{t('contact.getInTouch')}</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{t('contact.description')}</p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <motion.div whileHover={{ x: 10 }} className="flex items-center space-x-3 sm:space-x-4 text-muted-foreground hover:text-foreground transition-colors duration-200">
                <Mail size={18} className="text-blue-500 dark:text-blue-400 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base break-all">vishnujillala02@gmail.com</span>
              </motion.div>
              <motion.div whileHover={{ x: 10 }} className="flex items-center space-x-3 sm:space-x-4 text-muted-foreground hover:text-foreground transition-colors duration-200">
                <Phone size={18} className="text-green-500 dark:text-green-400 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">+91 6304365128</span>
              </motion.div>
              <motion.div whileHover={{ x: 10 }} className="flex items-center space-x-3 sm:space-x-4 text-muted-foreground hover:text-foreground transition-colors duration-200">
                <MapPin size={18} className="text-red-500 dark:text-red-400 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Nizamabad, Telangana, India</span>
              </motion.div>
            </div>

            {/* Quick contact buttons */}
            <div className="pt-4 sm:pt-6">
              <TooltipProvider>
                <div className="flex flex-wrap gap-4 sm:gap-5">
                  {contactButtons.map(({ id, label, href, Icon, className, iconClassName, shadowStyle, delay }) => (
                    <Tooltip key={id}>
                      <TooltipTrigger asChild>
                        <motion.div
                          animate={{ y: [0, -6, 0] }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: delay
                          }}
                        >
                          <motion.a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex h-20 w-20 items-center justify-center rounded-full transition-all duration-300 ${className} ${shadowStyle}`}
                          >
                            <Icon size={30} strokeWidth={2} className={iconClassName} />
                          </motion.a>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{label}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <form onSubmit={handleSubmit} className="bg-card/70 dark:bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 md:p-8 border border-border/60 dark:border-white/10 space-y-4 sm:space-y-6 shadow-md shadow-primary/5 dark:shadow-none">
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-muted-foreground mb-2">{t('contact.name')}</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-card/80 dark:bg-white/5 border border-border/50 dark:border-white/20 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-sm sm:text-base shadow-sm" placeholder={t('contact.namePlaceholder')} />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-muted-foreground mb-2">{t('contact.email')}</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-card/80 dark:bg-white/5 border border-border/50 dark:border-white/20 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-sm sm:text-base shadow-sm" placeholder={t('contact.emailPlaceholder')} />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-muted-foreground mb-2">{t('contact.message')}</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={4} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-card/80 dark:bg-white/5 border border-border/50 dark:border-white/20 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none text-sm sm:text-base shadow-sm" placeholder={t('contact.messagePlaceholder')} />
              </div>
              <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full flex items-center justify-center space-x-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-sm sm:text-base text-white shadow-md shadow-blue-500/20">
                <Send size={18} className="sm:w-5 sm:h-5" />
                <span>{t('contact.send')}</span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
