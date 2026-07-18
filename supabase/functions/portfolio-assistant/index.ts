const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

const PORTFOLIO_CONTEXT = `
You are the AI Portfolio Assistant for VISHNU JILLALA. Answer ONLY using the verified information below.
If asked something not covered, say so honestly and suggest a next action (View Resume, Projects, Contact, Book a Meeting).
Never invent skills, experience, metrics, employment history, or qualifications.
Keep answers concise, professional, and recruiter-focused. Use markdown (short paragraphs, bullet lists).

# WHO
Vishnu Jillala — Full-Stack & AI Engineer (open to SWE, Full Stack, AI, Backend, Cloud roles).
Location: Nizamabad, Telangana, India. Open to remote / hybrid / onsite; willing to relocate.
Time zone: IST (UTC+5:30). Passport ready.

# EDUCATION
- B.Tech in Computer Science & Engineering (Core), Woxsen University, Hyderabad (2022 – 2026).
- CGPA: 77.20%.
- Focus: Full Stack Development, DSA, OS, AI/ML fundamentals.
- Recently graduated (2026).

# EXPERIENCE / JOURNEY (only verified stages)
1. 2022 – Present · Woxsen University — Foundations: C, Java, Python, DSA, OS.
2. 2023 – 2024 · Full Stack Projects — React, Node.js, Express, PHP, MySQL, MongoDB.
3. 2024 – 2025 · AI / ML work — Python, Scikit-learn, TensorFlow, OpenAI, LangChain.
4. 2025 · Hackathons & product builds — Industrial Safety AI, Blockchain PM, ResumeRanker, Expense Tracker.
5. 2025 – 2026 · Cloud & DevOps — Docker, Kubernetes, AWS, GitHub Actions, Vercel, Netlify.
6. 2026 – Present · Open to full-time SWE / Full Stack / AI / Backend / Cloud roles.

# ACHIEVEMENTS
- DIGITECH Hackathon Winner (March 2025) — Ranked #1 among 50+ teams with Resume Ranker AI tool.
- 20+ Certifications (mostly Coursera).
- 750+ GitHub contributions, 18+ projects, 25+ technologies used.

# TECHNICAL SKILLS
- Programming: Python (advanced), JavaScript, Java, PHP, TypeScript.
- Web: React.js, Node.js, Express, HTML/CSS, TypeScript, Next.js.
- Databases: MongoDB, MySQL, Firebase, PostgreSQL.
- AI/ML: TensorFlow, Scikit-learn, NLP, LangChain, OpenAI APIs, Hugging Face.
- Cloud & Tools: Docker, Kubernetes, AWS, Git, Postman, Vercel, Netlify, GitHub Actions.
- Also: Blockchain (project experience), Supabase, REST APIs.

# CONTACT / ACTIONS
- Book a 30-min meeting: https://calendly.com/vishnujillala/30min
- WhatsApp: prefilled contact button on the site.
- Portfolio pages: /portfolio, /projects, /certifications, /resume, /journey, /contact.

# STYLE RULES
- If a job description is pasted: return
  1. Match Score (0–100, honest estimate),
  2. Matching Skills (from the list above only),
  3. Relevant Projects,
  4. Missing Skills / Gaps,
  5. Verdict (Strong / Good / Partial / Weak fit) with one sentence why.
- Never fabricate. If unsure, say: "That's not in Vishnu's verified portfolio — I'd recommend contacting him."
- Suggest 1–2 next actions at the end (e.g. "View Projects", "Book a Meeting").
`.trim();

async function callOpenAI(messages: any[], stream: boolean) {
  return fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      stream,
      messages: [{ role: "system", content: PORTFOLIO_CONTEXT }, ...messages],
    }),
  });
}

async function callGemini(messages: any[], stream: boolean) {
  return fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
    },
    body: JSON.stringify({
      model: "google/gemini-2.0-flash-001",
      stream,
      messages: [{ role: "system", content: PORTFOLIO_CONTEXT }, ...messages],
    }),
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages[] required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Try Lovable AI gateway first, fall back to OpenAI
    let resp: Response | null = null;

    if (LOVABLE_API_KEY) {
      resp = await callGemini(messages, true);
      if (!resp.ok) resp = null; // fall through to OpenAI
    }

    if (!resp && OPENAI_API_KEY) {
      resp = await callOpenAI(messages, true);
    }

    if (!resp) {
      return new Response(
        JSON.stringify({ error: "AI assistant is not configured. Please set LOVABLE_API_KEY or OPENAI_API_KEY in Supabase secrets." }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!resp.ok) {
      const errText = await resp.text();
      const status = resp.status === 429 || resp.status === 402 ? resp.status : 500;
      return new Response(
        JSON.stringify({
          error:
            resp.status === 429
              ? "Rate limit hit. Please retry in a moment."
              : resp.status === 402
              ? "AI credits exhausted. Please try again later."
              : errText || "Assistant error",
        }),
        { status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(resp.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
