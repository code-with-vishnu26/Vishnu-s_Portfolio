import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechnicalSkills from "@/components/TechnicalSkills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import MovingLogos from "@/components/MovingLogos";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import ParticleBackground from "@/components/ParticleBackground";
import { LiveChatWidget } from "@/components/LiveChatWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">
      <Helmet>
        <title>Vishnu Jillala | Full Stack Developer Portfolio</title>
        <meta name="description" content="Portfolio of Vishnu Jillala — aspiring full stack developer showcasing projects, skills, and experience in modern web development." />
        <link rel="canonical" href="https://vishnujillala.lovable.app/" />
        <meta property="og:title" content="Vishnu Jillala | Full Stack Developer Portfolio" />
        <meta property="og:description" content="Projects, skills, and experience from Vishnu Jillala — full stack developer building modern web apps." />
        <meta property="og:url" content="https://vishnujillala.lovable.app/" />
        <meta name="twitter:title" content="Vishnu Jillala | Full Stack Developer Portfolio" />
        <meta name="twitter:description" content="Projects, skills, and experience from Vishnu Jillala — full stack developer building modern web apps." />
      </Helmet>
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <TechnicalSkills />
        <MovingLogos />
        <Projects />
        <Certifications />
        <Resume />
        <Contact />
      </main>
      <LiveChatWidget />
    </div>
  );
};

export default Index;
