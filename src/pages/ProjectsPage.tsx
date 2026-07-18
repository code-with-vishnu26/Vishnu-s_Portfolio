import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import AuthGate from "@/components/AuthGate";
import AIAssistant from "@/components/AIAssistant";

const ProjectsPage = () => (
  <AuthGate>
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">
      <Helmet>
        <title>Projects | Vishnu Jillala</title>
        <meta name="description" content="Featured projects by Vishnu Jillala — AI, full-stack, cloud, and cybersecurity work." />
        <link rel="canonical" href="https://vishnujillala.lovable.app/projects" />
      </Helmet>
      <ScrollProgress />
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10 pt-20">
        <Projects />
      </main>
      <BackToTop />
      <AIAssistant />
    </div>
  </AuthGate>
);

export default ProjectsPage;
