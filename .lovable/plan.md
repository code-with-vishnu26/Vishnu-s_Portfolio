# Portfolio Feature Additions

Add the following new sections to `src/pages/Portfolio.tsx` (replacing existing counterparts where noted). All content uses your real data — no invented companies.

## 1. Floating "Message Me" (WhatsApp) button
- New `src/components/WhatsAppButton.tsx`
- Fixed bottom-right circular green button (lime/neon accent per your reference)
- Opens `https://wa.me/916304365128?text=Hi%20Vishnu%2C%20I%20saw%20your%20portfolio%20and%20I%20want%20to%20work%20with%20you.`
- Replaces `LiveChatWidget` if it conflicts; otherwise stacks above BackToTop

## 2. "Book a Meeting" (Calendly) button
- New `src/components/BookMeetingButton.tsx`
- Fixed circular white button, stacked next to WhatsApp
- Opens `https://calendly.com/vishnujillala/30min` in new tab

## 3. Professional Achievements stats
- New `src/components/AchievementStats.tsx` with scroll-triggered counters:
  - 25+ Technologies, 18+ Projects, 20+ Certifications, 750+ GitHub Contributions
- Dark card grid, purple gradient numbers, matching current theme tokens

## 4. Currently Exploring section
- New `src/components/CurrentlyExploring.tsx` — 4 cards:
  - Local LLMs (Ollama, llama.cpp), Agentic AI, Cloud & DevOps, AI + UX
- Space-themed background with subtle particles (reusing existing ParticleBackground vibe), semantic tokens only

## 5. GitHub Activity heatmap
- New `src/components/GitHubActivity.tsx`
- Uses `react-github-calendar` (npm) with username `code-with-vishnu26`
- Year toggles (2026/2025/2024/2023), theme-aware colors via semantic tokens

## 6. 3D Scroll Work Experience (replaces `ProfessionalJourney2D`)
- New `src/components/WorkExperience3D.tsx` using existing `@react-three/fiber` + `@react-three/drei`
- A rotating Earth in center; 6 stylized buildings orbit it, one per milestone
- Scroll-driven camera: as user scrolls the section, camera rotates around Earth using `useScroll` + `ScrollControls` from drei; each milestone snaps into focus
- Milestones (your real timeline):
  1. 2022–Present · Woxsen University · University building · DSA, Web, SE
  2. 2023–2024 · Full Stack Journey · Development Lab · React, Node, Express, PHP, MySQL, MongoDB
  3. 2024–2025 · AI & ML · AI Research Center · Python, Scikit-learn, TensorFlow, OpenAI
  4. 2025 · Hackathons & Enterprise · Innovation Hub · Industrial Safety AI, Blockchain PM, ResumeRanker, Expense Tracker
  5. 2025–2026 · Cloud & DevOps · Cloud Data Center · Docker, K8s, AWS, CI/CD, GitHub Actions, Vercel, Netlify
  6. 2026–Present · Open to Opportunities · Future Tech Tower · SWE / Full Stack / AI / Backend / Cloud
- Each building rendered as parametric geometry (boxes + accent meshes, emissive materials matching stage color). Floating HTML labels via drei `<Html>` showing role, dates, tech chips
- Fallback: static vertical timeline for `prefers-reduced-motion` and mobile (<768px) to keep performance

## 7. Cleanup
- Remove `ProfessionalJourney2D` import from Portfolio
- Keep existing About, Skills, Projects, Certifications, Contact intact
- All new components use design tokens (no hardcoded colors), Inter font, mobile-first

## Technical notes
- New dep: `react-github-calendar` (only; three/fiber/drei already installed)
- No backend/schema changes
- SEO metadata unchanged
- Order in Portfolio: Hero → About → CurrentlyExploring → Skills → WorkExperience3D → Projects → AchievementStats → GitHubActivity → Certifications → Contact
- Floating buttons (WhatsApp, BookMeeting, BackToTop) stacked vertically bottom-right

## Questions / assumptions
- Assuming WhatsApp number `+91 6304365128` (India country code)
- Assuming Calendly slug is public and 30min event exists
- Assuming GitHub username `code-with-vishnu26` (from existing Contact.tsx)

Reply with any changes, otherwise approve to build.
