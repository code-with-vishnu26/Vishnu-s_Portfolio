import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const BookMeetingButton = () => (
  <motion.a
    href="https://calendly.com/vishnujillala/30min"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Book a meeting on Calendly"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.75, type: "spring" }}
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
    className="fixed bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-background border border-border text-foreground shadow-lg hover:shadow-xl transition-shadow"
  >
    <Calendar className="h-6 w-6" strokeWidth={2.2} />
  </motion.a>
);

export default BookMeetingButton;
