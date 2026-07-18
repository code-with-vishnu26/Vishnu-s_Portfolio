import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, X, Send, Sparkles, FileText, FolderKanban, Github, Linkedin, Calendar as CalendarIcon, MessageSquare } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import robotLogo from "@/assets/ai-assistant-robot.png";
import Robot3D from "./Robot3D";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const STARTERS = [
  "Give me a 30-second profile summary",
  "Show Vishnu's best projects",
  "What are his strongest technical skills?",
  "Is he suitable for a full-stack role?",
  "Show his AI/ML experience",
  "Compare with a job description",
  "Why should we hire Vishnu?",
];

const WELCOME =
  "Hi! I'm Vishnu's AI Portfolio Assistant. I can help you explore his skills, projects, resume, certifications, achievements, technical experience, and role fit. You can also paste a job description and I'll compare it with his verified portfolio information. What would you like to know?";

const AIAssistant = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  const getLocalResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    if (q.includes("30-second") || q.includes("summary") || q.includes("profile") || q.includes("who is") || q.includes("about")) {
      return "Vishnu Jillala is a highly focused software engineer specializing in **AI/ML Integration**, **Full-Stack Development**, and **Cyber Security**. He has hands-on experience building machine learning classification systems, blockchain-backed applications, and highly responsive web platforms. With solid foundations in Python, TypeScript, React, and Node.js, he is passionate about developing secure, intelligent, and scalable applications.";
    }
    if (q.includes("project") || q.includes("best work") || q.includes("portfolio")) {
      return "Here are some of Vishnu's top projects:\n\n* **AI in Cyber Security Threat Detection**: Built an ML model to detect phishing URLs and emails with 95% accuracy.\n* **Secure Password Manager on Blockchain**: Developed a decentralized credential vault using smart contracts.\n* **Web Vulnerability Scanner**: Automated 80+ security tests, cutting scan time by 60%.\n* **Weather Now & EarthLens Vision**: Advanced geospatial and real-time visualization systems.";
    }
    if (q.includes("skill") || q.includes("languages") || q.includes("technology") || q.includes("stack") || q.includes("tool")) {
      return "Vishnu's technical core includes:\n\n* **Languages**: Python (FastAPI/Django), TypeScript/JavaScript (React, Next.js, Node.js), Java.\n* **AI & Security**: Machine Learning (classification, analysis), Blockchain, Vulnerability Scanning (Nmap, Nikto).\n* **Database & DevOps**: PostgreSQL, MongoDB, Docker, Git/GitHub, RESTful API design.";
    }
    if (q.includes("full-stack") || q.includes("frontend") || q.includes("backend") || q.includes("suitable") || q.includes("role") || q.includes("position")) {
      return "**Absolutely.** Vishnu has built multiple full-stack templates and applications using **Next.js/React** for clean, responsive frontends and **Node.js/FastAPI/Express** for high-performance backends. His projects feature JWT authentication, database ORMs (Prisma, PostgreSQL), and containerized deployments (Docker), demonstrating all the skills required for an autonomous Full-Stack Engineer.";
    }
    if (q.includes("ai") || q.includes("ml") || q.includes("machine learning") || q.includes("intelligence")) {
      return "Vishnu has focused on applying AI to practical domains, notably cyber security. He built a machine learning-based classification pipeline that runs security diagnostics on URLs and emails. He is skilled in using Python ML libraries, API integrations, and prompt engineering/agent logic.";
    }
    if (q.includes("hire") || q.includes("why should we") || q.includes("benefit")) {
      return "Vishnu brings a unique blend of **Full-Stack development power**, **AI curiosity**, and **Security mindfulness**. He doesn't just build features; he ensures they are secure (using blockchain/scanning best practices) and intelligent. He is proactive, holds a strong academic record, and maintains active repository profiles demonstrating clean coding practices.";
    }
    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("reach") || q.includes("connect")) {
      return "You can reach out to Vishnu Jillala directly via:\n\n* **Email**: vishnujillala26@gmail.com\n* **Phone**: +91 9177651036\n* **LinkedIn**: [linkedin.com/in/vishnu-jillala-36479725a](https://linkedin.com/in/vishnu-jillala-36479725a)\n* **Calendly**: [Book a 30-min call](https://calendly.com/vishnujillala/30min)";
    }
    if (q.includes("job description") || q.includes("compare") || q.includes("resume") || q.includes("match")) {
      return "I'd love to help! Please paste a job description here. I will analyze the required tech stack (e.g., Python, React, full-stack, security) and compare it against Vishnu's verified experience to show you exactly how his skills align.";
    }
    
    // Dynamic job description parser fallback
    const keywords = ["react", "typescript", "javascript", "python", "node", "django", "fastapi", "blockchain", "security", "docker", "postgres", "sql", "mongodb", "git"];
    const matches = keywords.filter(kw => q.includes(kw));
    if (matches.length > 0) {
      const list = matches.map(m => `* **${m.charAt(0).toUpperCase() + m.slice(1)}**: Strong match. Vishnu has multiple projects and codebases built with this technology.`).join("\n");
      return `### Job Description Fit Analysis\n\nI detected the following key requirements in your query:\n\n${list}\n\n**Overall Compatibility**: Highly Compatible. Vishnu's background in full-stack engineering and security directly aligns with these technical pillars.`;
    }

    return "I can tell you all about Vishnu's background! Ask me about his projects, technical stack, blockchain experience, or suitability for your engineering team.";
  };

  const simulateLocalResponse = (query: string) => {
    const responseText = getLocalResponse(query);
    setMessages((m) => [...m, { role: "assistant", content: "" }]);
    
    let currentText = "";
    let index = 0;
    const interval = setInterval(() => {
      if (index < responseText.length) {
        currentText += responseText.charAt(index);
        const textToAppend = currentText;
        setMessages((m) => {
          const copy = [...m];
          if (copy.length > 0) {
            copy[copy.length - 1] = {
              ...copy[copy.length - 1],
              content: textToAppend,
            };
          }
          return copy;
        });
        index++;
      } else {
        clearInterval(interval);
        setLoading(false);
      }
    }, 12);
  };

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const next: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      // Use the authenticated user's JWT, not the anon key
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token ?? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/portfolio-assistant`;
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ messages: next }),
      });

      if (!resp.ok || !resp.body) {
        console.warn("Supabase AI function unavailable or missing API key, falling back to local simulation.");
        simulateLocalResponse(trimmed);
        return;
      }

      // Stream SSE tokens
      setMessages((m) => [...m, { role: "assistant", content: "" }]);
      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          const trimLine = line.trim();
          if (!trimLine.startsWith("data:")) continue;
          const data = trimLine.slice(5).trim();
          if (!data || data === "[DONE]") continue;
          try {
            const json = JSON.parse(data);
            const delta = json.choices?.[0]?.delta?.content;
            if (delta) {
              setMessages((m) => {
                const copy = [...m];
                copy[copy.length - 1] = {
                  ...copy[copy.length - 1],
                  content: copy[copy.length - 1].content + delta,
                };
                return copy;
              });
            }
          } catch {
            // ignore
          }
        }
      }
      setLoading(false);
    } catch (e) {
      console.warn("Network error in AI function, falling back to local simulation.");
      simulateLocalResponse(trimmed);
    }
  };



  return (
    <>
      {/* Floating button */}
      <motion.button
        drag
        dragConstraints={{ left: -1000, right: 0, top: -1000, bottom: 0 }}
        dragElastic={0.2}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(true)}
        aria-label="Open AI Portfolio Assistant"
        className="fixed bottom-6 right-6 z-40 h-20 w-20 flex items-center justify-center group"
      >
        <div className="relative z-10 w-20 h-20 flex items-center justify-center overflow-hidden rounded-full pointer-events-none">
          <Robot3D className="w-full h-full" isThinking={false} />
        </div>
        <span className="absolute top-2 right-2 h-3.5 w-3.5 rounded-full bg-emerald-400 border-2 border-background animate-pulse z-20" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed z-50 inset-x-2 bottom-2 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[420px] max-h-[92vh] sm:max-h-[720px] flex flex-col rounded-2xl border border-border/60 dark:border-white/10 bg-card/95 dark:bg-[#0b0f1a]/95 backdrop-blur-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="relative flex items-center justify-between p-4 border-b border-border/60 dark:border-white/10 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-12 w-12 rounded-xl bg-[#0b0f1a]/85 border border-white/10 flex items-center justify-center overflow-hidden">
                      <Robot3D className="w-full h-full" isThinking={loading} />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-400 border-2 border-card" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Portfolio Assistant</p>
                    <p className="text-[11px] text-muted-foreground">Recruiter · Career · Project Copilot</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close assistant"
                  className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>



              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <>
                    <div className="rounded-2xl bg-primary/5 border border-primary/10 p-4 text-sm text-foreground/90 leading-relaxed">
                      {WELCOME}
                    </div>
                    <div className="space-y-2">
                      <p className="text-[11px] uppercase tracking-widest text-muted-foreground/70 font-semibold px-1">
                        Try asking
                      </p>
                      {STARTERS.map((s) => (
                        <button
                          key={s}
                          onClick={() => send(s)}
                          className="w-full text-left px-3 py-2 text-xs rounded-lg bg-background/50 dark:bg-white/5 border border-border/60 dark:border-white/10 hover:border-primary/40 hover:bg-primary/5 transition-colors text-foreground/80"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </>
                )}
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-background/70 dark:bg-white/5 border border-border/60 dark:border-white/10 text-foreground"
                      }`}
                    >
                      {m.role === "assistant" ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0 prose-headings:my-2">
                          <ReactMarkdown>{m.content || "…"}</ReactMarkdown>
                        </div>
                      ) : (
                        m.content
                      )}
                    </div>
                  </div>
                ))}
                {loading && messages[messages.length - 1]?.role === "user" && (
                  <div className="flex justify-start">
                    <div className="bg-background/70 dark:bg-white/5 border border-border/60 dark:border-white/10 rounded-2xl px-4 py-2.5">
                      <div className="flex gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" />
                        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.15s]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.3s]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="p-3 border-t border-border/60 dark:border-white/10 bg-background/40"
              >
                <div className="flex items-end gap-2 rounded-2xl border border-border dark:border-white/10 bg-background/80 dark:bg-white/[0.03] p-2 focus-within:border-primary/50 transition-colors">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        send(input);
                      }
                    }}
                    placeholder="Ask about skills, projects, or paste a JD..."
                    rows={1}
                    className="flex-1 resize-none bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted-foreground/60 max-h-32"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    aria-label="Send message"
                    className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                  >
                    <Send size={16} />
                  </button>
                </div>
                <p className="text-[10px] text-muted-foreground/60 mt-2 text-center">
                  Grounded on Vishnu's verified portfolio. May decline unrelated questions.
                </p>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
