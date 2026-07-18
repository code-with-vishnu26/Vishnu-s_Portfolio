import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const url = `https://wa.me/916304365128?text=${encodeURIComponent(
    "Hi Vishnu, I saw your portfolio and I want to work with you."
  )}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message me on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: "spring" }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgb(37,211,102,0.45)] hover:shadow-[0_10px_40px_rgb(37,211,102,0.65)] transition-shadow"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={2.2} />
      <span className="absolute right-full mr-3 whitespace-nowrap rounded-md bg-foreground/90 px-2.5 py-1 text-xs font-medium text-background opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Message me
      </span>
    </motion.a>
  );
};

export default WhatsAppButton;
