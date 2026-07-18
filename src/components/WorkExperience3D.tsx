import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Text } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

interface Milestone {
  year: string;
  title: string;
  place: string;
  role: string;
  desc: string;
  tech: string[];
  color: string;
  building: "university" | "lab" | "ai" | "hub" | "cloud" | "future";
}

const milestones: Milestone[] = [
  {
    year: "2022 – Present",
    title: "Woxsen University",
    place: "Hyderabad, India",
    role: "B.Tech, Computer Science & Engineering",
    desc: "Started my journey in programming, DSA, web development, and software engineering.",
    tech: ["C", "Java", "Python", "DSA", "OS"],
    color: "#3b82f6",
    building: "university",
  },
  {
    year: "2023 – 2024",
    title: "Full Stack Lab",
    place: "Personal Projects",
    role: "Full Stack Developer",
    desc: "Built multiple full-stack web applications with modern frontend and backend technologies.",
    tech: ["React", "Node.js", "Express", "PHP", "MySQL", "MongoDB"],
    color: "#10b981",
    building: "lab",
  },
  {
    year: "2024 – 2025",
    title: "AI Research Center",
    place: "AI & Machine Learning",
    role: "AI/ML Engineer",
    desc: "Worked on AI, ML, data analytics, and LLM-based applications.",
    tech: ["Python", "Scikit-learn", "TensorFlow", "OpenAI", "LangChain"],
    color: "#a855f7",
    building: "ai",
  },
  {
    year: "2025",
    title: "Innovation Hub",
    place: "Hackathons & Enterprise",
    role: "Product Engineer",
    desc: "Built real-world projects and competed in hackathons.",
    tech: ["Industrial Safety AI", "Blockchain PM", "ResumeRanker", "Expense Tracker"],
    color: "#ec4899",
    building: "hub",
  },
  {
    year: "2025 – 2026",
    title: "Cloud Data Center",
    place: "Cloud & DevOps",
    role: "Cloud Engineer",
    desc: "Implemented containerization, CI/CD, and production-ready cloud deployments.",
    tech: ["Docker", "Kubernetes", "AWS", "GitHub Actions", "Vercel", "Netlify"],
    color: "#f59e0b",
    building: "cloud",
  },
  {
    year: "2026 – Present",
    title: "Future Tech Tower",
    place: "Open to Opportunities",
    role: "Software Engineer",
    desc: "Seeking Software Engineer, Full Stack, AI, Backend, or Cloud Engineer roles.",
    tech: ["SWE", "Full Stack", "AI Engineer", "Backend", "Cloud"],
    color: "#06b6d4",
    building: "future",
  },
];

function Building({ type, color, label }: { type: Milestone["building"]; color: string; label: string }) {
  const emissive = new THREE.Color(color);
  const windowMat = (
    <meshStandardMaterial color="#93c5fd" emissive="#60a5fa" emissiveIntensity={0.7} />
  );

  const NameSign = (
    <group position={[0, 2.55, 0.61]}>
      <mesh>
        <boxGeometry args={[1.9, 0.35, 0.06]} />
        <meshStandardMaterial color="#f8fafc" emissive={emissive} emissiveIntensity={0.35} />
      </mesh>
      <Text
        position={[0, 0, 0.05]}
        fontSize={0.18}
        color="#0f172a"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.8}
      >
        {label.toUpperCase()}
      </Text>
    </group>
  );

  switch (type) {
    case "university":
      return (
        <group>
          <mesh position={[0, 1, 0]}>
            <boxGeometry args={[2.4, 2, 1.2]} />
            <meshStandardMaterial color="#e2e8f0" />
          </mesh>
          {[-0.7, 0, 0.7].map((x) => (
            <mesh key={x} position={[x, 1.1, 0.61]}>
              <boxGeometry args={[0.4, 0.5, 0.02]} />
              {windowMat}
            </mesh>
          ))}
          <mesh position={[0, 2.3, 0]}>
            <coneGeometry args={[1.4, 0.7, 4]} />
            <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.5} />
          </mesh>
          {NameSign}
        </group>
      );
    case "lab":
      return (
        <group>
          <mesh position={[0, 1.1, 0]}>
            <boxGeometry args={[2.2, 2.2, 1.2]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          {[0.3, 1.0, 1.7].map((y) =>
            [-0.6, 0, 0.6].map((x) => (
              <mesh key={`${x}-${y}`} position={[x, y, 0.61]}>
                <boxGeometry args={[0.35, 0.35, 0.02]} />
                {windowMat}
              </mesh>
            ))
          )}
          {NameSign}
        </group>
      );
    case "ai":
      return (
        <group>
          <mesh position={[0, 1.1, 0]}>
            <cylinderGeometry args={[1.0, 1.2, 2.2, 8]} />
            <meshStandardMaterial color="#312e81" />
          </mesh>
          <mesh position={[0, 2.6, 0]}>
            <sphereGeometry args={[0.55, 24, 24]} />
            <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.9} />
          </mesh>
          {NameSign}
        </group>
      );
    case "hub":
      return (
        <group>
          <mesh position={[0, 1, 0]}>
            <boxGeometry args={[2, 2, 1.2]} />
            <meshStandardMaterial color="#4c1d95" />
          </mesh>
          <mesh position={[0, 2.4, 0]} rotation={[0, Math.PI / 4, 0]}>
            <boxGeometry args={[1.4, 0.8, 1.4]} />
            <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.55} />
          </mesh>
          {NameSign}
        </group>
      );
    case "cloud":
      return (
        <group>
          <mesh position={[-0.6, 0.9, 0]}>
            <boxGeometry args={[1, 1.8, 1.2]} />
            <meshStandardMaterial color="#78350f" />
          </mesh>
          <mesh position={[0.6, 1.2, 0]}>
            <boxGeometry args={[1, 2.4, 1.2]} />
            <meshStandardMaterial color="#92400e" />
          </mesh>
          <mesh position={[0, 2.9, 0]}>
            <sphereGeometry args={[0.5, 20, 20]} />
            <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.7} />
          </mesh>
          {NameSign}
        </group>
      );
    case "future":
      return (
        <group>
          <mesh position={[0, 1.4, 0]}>
            <cylinderGeometry args={[0.5, 1, 2.8, 6]} />
            <meshStandardMaterial color="#164e63" />
          </mesh>
          <mesh position={[0, 3.1, 0]}>
            <coneGeometry args={[0.4, 0.8, 6]} />
            <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={1} />
          </mesh>
          {NameSign}
        </group>
      );
  }
}

function Scene({ progress }: { progress: React.MutableRefObject<number> }) {
  const globeRef = useRef<THREE.Group>(null);
  const earthRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (earthRef.current) earthRef.current.rotation.y += 0.001;
    if (globeRef.current) {
      const targetRot = -progress.current * Math.PI * 2;
      globeRef.current.rotation.y += (targetRot - globeRef.current.rotation.y) * 0.08;
    }
  });

  const radius = 4;

  return (
    <group position={[0, -3.5, 0]}>
      <group ref={globeRef}>
        {/* Earth core (blue) */}
        <mesh ref={earthRef}>
          <sphereGeometry args={[radius, 64, 64]} />
          <meshStandardMaterial color="#1e3a8a" emissive="#1e40af" emissiveIntensity={0.25} roughness={0.7} />
        </mesh>
        {/* Grass cap on top */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[radius + 0.02, 64, 64, 0, Math.PI * 2, 0, Math.PI / 3.5]} />
          <meshStandardMaterial color="#22c55e" emissive="#16a34a" emissiveIntensity={0.15} />
        </mesh>
        {/* Water patch */}
        <mesh position={[0, radius - 0.05, 1.2]} rotation={[-Math.PI / 2.2, 0, 0]}>
          <circleGeometry args={[0.9, 32]} />
          <meshStandardMaterial color="#3b82f6" emissive="#60a5fa" emissiveIntensity={0.4} />
        </mesh>
        {/* Atmosphere */}
        <mesh>
          <sphereGeometry args={[radius * 1.05, 32, 32]} />
          <meshBasicMaterial color="#60a5fa" transparent opacity={0.06} />
        </mesh>

        {/* Buildings placed around the equator, standing upright */}
        {milestones.map((m, i) => {
          const angle = (i / milestones.length) * Math.PI * 2;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          return (
            <group key={i} position={[x, radius, z]} rotation={[0, angle, 0]}>
              <Building type={m.building} color={m.color} label={m.title} />
            </group>
          );
        })}
      </group>
    </group>
  );
}

const WorkExperience3D = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      scrollProgress.current = p;
      const idx = Math.min(milestones.length - 1, Math.floor(p * milestones.length * 0.999));
      setActiveIndex(idx);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = milestones[activeIndex];

  const scrollTo = (i: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const target = rect.top + window.scrollY + (total * i) / (milestones.length - 1);
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="professional-journey"
      className="relative z-10 bg-[#050914]"
      style={{ height: `${milestones.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Starfield 3D canvas */}
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 2.5, 9], fov: 45 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[6, 8, 6]} intensity={1.4} />
              <pointLight position={[-8, 4, -6]} intensity={0.6} color="#a855f7" />
              <Stars radius={80} depth={50} count={3500} factor={4} fade speed={0.4} />
              <Scene progress={scrollProgress} />
            </Suspense>
          </Canvas>
        </div>

        {/* Header (top-left) */}
        <div className="absolute top-6 sm:top-10 left-4 sm:left-10 max-w-lg pointer-events-none">
          <div className="flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground">
            <span>🏢</span>
            <span>Work Experience</span>
          </div>
          <p className="mt-4 text-base sm:text-lg text-foreground/85 leading-snug">
            Let's{" "}
            <span className="text-blue-400 font-semibold">step back</span>{" "}
            through my experience, and the places I've worked.
          </p>
        </div>

        {/* Milestone info card (right side, like reference) */}
        <div className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 w-[88%] sm:w-[380px] max-w-md pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-5 sm:p-6 shadow-2xl"
            >
              <div
                className="text-2xl sm:text-3xl font-black tracking-tight"
                style={{ color: active.color, textShadow: `0 0 24px ${active.color}55` }}
              >
                {active.year}
              </div>
              <div className="mt-1 text-xl sm:text-2xl font-bold text-white">
                {active.title}
              </div>
              <div className="mt-3 text-sm text-white/70">{active.role}</div>
              <div className="mt-1 text-xs text-white/50">{active.place}</div>

              <div className="mt-4">
                <div className="text-xs font-semibold tracking-wider text-white/60 uppercase mb-2">
                  Core technologies used:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {active.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/5 border border-white/10 text-white/85"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-xs text-white/60 leading-relaxed">{active.desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress dots (bottom) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {milestones.map((m, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to ${m.title}`}
              className={`h-2 rounded-full transition-all ${
                i === activeIndex ? "w-8" : "w-2 bg-white/25 hover:bg-white/50"
              }`}
              style={i === activeIndex ? { backgroundColor: m.color, boxShadow: `0 0 12px ${m.color}` } : undefined}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.3em] text-white/40 pointer-events-none">
          Scroll to travel
        </div>
      </div>
    </section>
  );
};

export default WorkExperience3D;
