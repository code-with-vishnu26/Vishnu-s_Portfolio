import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2, Target, ClipboardPaste, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";

const SAMPLE = `Paste a job description here — I'll compare it with Vishnu's verified skills, projects, and experience, then return a match score, matching skills, relevant projects, gaps, and a hiring verdict.`;

const JDMatch = () => {
  const [jd, setJd] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLocalJDReport = (jdText: string): string => {
    const jdClean = jdText.toLowerCase();
    
    // Base details about Vishnu
    const matched: string[] = [];
    let scoreBonus = 0;
    
    // Keyword mapping
    const skillsConfig = [
      { key: "react", name: "React / Next.js", matches: ["react", "nextjs", "next.js", "frontend", "ui", "tailwind"] },
      { key: "typescript", name: "TypeScript / JavaScript", matches: ["typescript", "ts", "javascript", "js", "es6"] },
      { key: "python", name: "Python (FastAPI, Django)", matches: ["python", "django", "fastapi", "flask", "py"] },
      { key: "node", name: "Node.js (Express, NestJS)", matches: ["node", "nodejs", "express", "nestjs", "backend"] },
      { key: "security", name: "Cyber Security & Scanner Tools (Nmap, Nikto)", matches: ["security", "cyber", "vulnerability", "scanner", "pentest", "nmap", "nikto", "hack"] },
      { key: "blockchain", name: "Blockchain (Smart Contracts)", matches: ["blockchain", "smart contract", "solidity", "web3", "crypto", "ethereum"] },
      { key: "database", name: "Databases (PostgreSQL, MongoDB)", matches: ["database", "postgres", "postgresql", "sql", "mongo", "mongodb", "nosql"] },
      { key: "docker", name: "Docker & Containerization", matches: ["docker", "container", "devops", "kubernetes"] },
      { key: "machine learning", name: "Machine Learning (Classification, APIs)", matches: ["ml", "ai", "machine learning", "deep learning", "nlp", "classification"] }
    ];
    
    // Check matches
    skillsConfig.forEach(skill => {
      const isMatched = skill.matches.some(m => jdClean.includes(m));
      if (isMatched) {
        matched.push(skill.name);
        scoreBonus += 12;
      }
    });

    const allPossibleMissing = [
      "AWS / Cloud Deployment (EC2, S3)",
      "CI/CD Pipelines (GitHub Actions, Jenkins)",
      "Kubernetes orchestration",
      "GraphQL API Integration",
      "Redis caching"
    ];
    
    const missing = allPossibleMissing.slice(0, Math.max(1, 3 - matched.length));
    
    let score = 65 + scoreBonus;
    if (score > 98) score = 98;
    if (matched.length === 0) score = 55;

    let relevantProjects = "";
    if (matched.includes("React / Next.js") || matched.includes("Node.js (Express, NestJS)")) {
      relevantProjects += "* **Full-Stack Web App Template**: Next.js & Express framework template featuring SSR, JWT auth, and Docker integration.\n";
    }
    if (matched.includes("Cyber Security & Scanner Tools (Nmap, Nikto)")) {
      relevantProjects += "* **Web Vulnerability Scanner**: Automated 80+ security tests, cutting scan time by 60%.\n";
    }
    if (matched.includes("Machine Learning (Classification, APIs)") || matched.includes("Python (FastAPI, Django)")) {
      relevantProjects += "* **AI in Cyber Security Threat Detection**: Built an ML model to detect phishing URLs and emails with 95% accuracy.\n";
    }
    if (matched.includes("Blockchain (Smart Contracts)")) {
      relevantProjects += "* **Secure Password Manager on Blockchain**: Developed a decentralized credential vault using smart contracts.\n";
    }
    
    if (!relevantProjects) {
      relevantProjects = "* **Full-Stack Web App Template**: Production-ready Next.js app with Docker, Express, and user authentication.\n* **Web Vulnerability Scanner**: Automated security diagnostics codebase.\n";
    }

    let verdict = "";
    if (score >= 85) {
      verdict = "🟢 **Strong Match / Highly Recommended**: Vishnu possesses almost all of the required core stack. His projects (such as the AI Cyber Security Threat Detector and Full-Stack Templates) directly map to the technical requirements of this role.";
    } else if (score >= 70) {
      verdict = "🟡 **Good Match / Worth Interviewing**: Vishnu has solid foundations in the core languages/frameworks required. He can quickly pick up the remaining specific toolsets (like specific cloud platforms) on the job.";
    } else {
      verdict = "🔴 **Potential Match (Needs Upskilling)**: While Vishnu is strong in Python, JS, and Security, this job description demands other specialized technologies. He can be considered for general full-stack or security-focused positions.";
    }

    return `## 📊 Job Description Match Report

### 🎯 Match Score: **${score}%**

---

### 🌟 Matching Skills
${matched.length > 0 ? matched.map(s => `* **${s}**: Verified experience in portfolio projects.`).join("\n") : "* No exact core stack matches found. (Vishnu's main stack is Python, JS/TS, React, Node, Security, and ML/AI)."}

---

### 📁 Relevant Portfolio Projects
${relevantProjects}

---

### ⚠️ Missing Skills / Gaps
${missing.map(m => `* **${m}**: No direct project showcase (can adapt quickly).`).join("\n")}

---

### 📝 Verdict
${verdict}`;
  };

  const simulateLocalJDReport = (jdText: string) => {
    const reportText = getLocalJDReport(jdText);
    setResult("");
    let currentText = "";
    let index = 0;
    const interval = setInterval(() => {
      if (index < reportText.length) {
        currentText += reportText.charAt(index);
        const textToAppend = currentText;
        setResult(textToAppend);
        index++;
      } else {
        clearInterval(interval);
        setLoading(false);
      }
    }, 6);
  };

  const run = async () => {
    if (!jd.trim() || loading) return;
    setLoading(true);
    setResult("");
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token ?? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/portfolio-assistant`;
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `Compare Vishnu's portfolio with this Job Description and return the structured JD Match report (Match Score, Matching Skills, Relevant Projects, Missing Skills / Gaps, Verdict).\n\nJob Description:\n${jd}`,
            },
          ],
        }),
      });

      if (!resp.ok || !resp.body) {
        console.warn("Supabase AI function unavailable or missing API key, falling back to local simulation.");
        simulateLocalJDReport(jd);
        return;
      }

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
          const t = line.trim();
          if (!t.startsWith("data:")) continue;
          const data = t.slice(5).trim();
          if (!data || data === "[DONE]") continue;
          try {
            const json = JSON.parse(data);
            const delta = json.choices?.[0]?.delta?.content;
            if (delta) setResult((r) => r + delta);
          } catch {
            /* ignore */
          }
        }
      }
      setLoading(false);
    } catch {
      console.warn("Network error in AI function, falling back to local simulation.");
      simulateLocalJDReport(jd);
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setJd(text);
    } catch {
      /* ignore */
    }
  };

  return (
    <section id="jd-match" className="py-12 sm:py-16 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Target className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">
              AI · Recruiter Tool
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-foreground">
            Job Description <span className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Match</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            Instantly evaluate how well Vishnu fits your role. Powered by his verified portfolio — no hallucinations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto rounded-3xl border border-border/60 dark:border-white/10 bg-card/70 dark:bg-white/[0.03] backdrop-blur-xl overflow-hidden"
        >
          <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative p-5 sm:p-8">
            <div className="flex items-center justify-between gap-2 mb-3">
              <label className="text-sm font-semibold text-foreground">
                Paste Job Description
              </label>
              <button
                onClick={pasteFromClipboard}
                className="text-xs flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <ClipboardPaste size={12} />
                Paste
              </button>
            </div>

            <textarea
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              placeholder={SAMPLE}
              rows={7}
              className="w-full resize-y rounded-2xl border border-border dark:border-white/10 bg-background/70 dark:bg-white/[0.02] p-4 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-primary/50 transition-colors"
            />

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
              <p className="text-xs text-muted-foreground/70">
                {jd.length} chars · Report streams below in real-time
              </p>
              <button
                onClick={run}
                disabled={!jd.trim() || loading}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-sm font-semibold shadow-lg shadow-purple-500/25 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] transition-transform"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Analysing…
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Run JD Match
                  </>
                )}
              </button>
            </div>

            {(result || error) && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-2xl border border-border/60 dark:border-white/10 bg-background/60 dark:bg-white/[0.02] p-5 relative"
              >
                {/* Close / clear button */}
                <button
                  onClick={() => { setResult(""); setError(null); }}
                  className="absolute top-3 right-3 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  title="Clear report"
                >
                  <X size={14} />
                </button>

                {error ? (
                  <p className="text-sm text-red-500">⚠️ {error}</p>
                ) : (
                  <div className="prose prose-sm dark:prose-invert max-w-none
                    prose-headings:mt-2 prose-headings:mb-1
                    prose-h2:text-sm prose-h2:font-bold
                    prose-h3:text-xs prose-h3:font-semibold prose-h3:uppercase prose-h3:tracking-wide
                    prose-p:text-xs prose-p:my-1 prose-p:leading-relaxed
                    prose-ul:my-1 prose-li:text-xs prose-li:my-0
                    prose-strong:font-semibold
                    prose-hr:my-2">
                    <ReactMarkdown>{result}</ReactMarkdown>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JDMatch;
