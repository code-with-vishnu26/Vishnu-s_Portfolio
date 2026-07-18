import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import DeveloperIdentity from "@/components/DeveloperIdentity";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import AuthGate from "@/components/AuthGate";
import AIAssistant from "@/components/AIAssistant";

const AboutPage = () => (
  <AuthGate>
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">
      <Helmet>
        <title>About | Vishnu Jillala</title>
        <meta name="description" content="The engineer behind the portfolio — learn about Vishnu Jillala's background, skills, and journey." />
        <link rel="canonical" href="https://vishnujillala.lovable.app/about" />
      </Helmet>
      <ScrollProgress />
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10 pt-20">
        <DeveloperIdentity />
      </main>
      <BackToTop />
      <AIAssistant />
    </div>
  </AuthGate>
);

export default AboutPage;
