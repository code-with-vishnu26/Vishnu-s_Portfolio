import { motion } from "framer-motion";

const ThankYou = () => {
  return (
    <section className="py-20 sm:py-28 relative z-10 overflow-hidden">
      {/* Divider Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-border/60 to-transparent" />

      {/* Background ambient glows */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] h-[250px] rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-[100px] opacity-80" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 tracking-tight bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
        >
          Thanks for Visiting.
        </motion.h2>

        {/* Small Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto mb-8 font-medium leading-relaxed"
        >
          Hope you enjoyed exploring my work.
        </motion.p>

        {/* Let's create something extraordinary together */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative inline-block"
        >
          <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-md" />
          <p className="relative px-6 py-3 rounded-xl border border-primary/20 bg-background/50 dark:bg-white/[0.02] backdrop-blur text-sm sm:text-base font-bold text-foreground tracking-wide">
            Let's create something extraordinary together.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ThankYou;
