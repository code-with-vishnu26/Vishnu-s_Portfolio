import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import { useEffect, useState } from "react";

const testimonials = [
  {
    quote:
      "Vishnu brings unusual clarity to product engineering — from AI research to shipping full-stack apps with confidence.",
    name: "Faculty Mentor",
    role: "Woxsen University",
  },
  {
    quote:
      "One of the sharpest engineers I've worked with on a hackathon team — turned a raw idea into a winning product in 48 hours.",
    name: "DIGITECH Teammate",
    role: "Hackathon 2025",
  },
  {
    quote:
      "Reliable, fast, and genuinely curious. He asks the right questions and ships high-quality code without hand-holding.",
    name: "Peer Reviewer",
    role: "Open-source Collaborator",
  },
];

const Testimonials = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  const active = testimonials[i];

  return (
    <section className="py-10 sm:py-14 relative z-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            What People Say
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-border/60 dark:border-white/10 bg-card/60 dark:bg-white/[0.03] backdrop-blur-xl p-8 sm:p-12 min-h-[280px] flex flex-col justify-between"
        >
          <Quote className="absolute top-6 left-6 text-primary/30" size={40} />
          
          <div className="flex-1 flex flex-col justify-center my-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <p className="text-lg sm:text-xl md:text-2xl text-foreground/90 leading-relaxed italic px-4">
                  “{active.quote}”
                </p>
                <div className="mt-6">
                  <p className="font-semibold text-foreground">{active.name}</p>
                  <p className="text-sm text-muted-foreground">{active.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`View testimonial ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  idx === i ? "w-8 bg-primary" : "w-2 bg-border hover:bg-primary/50"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
