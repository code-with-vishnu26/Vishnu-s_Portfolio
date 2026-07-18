import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Resume from "@/components/Resume";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import AuthGate from "@/components/AuthGate";
import AIAssistant from "@/components/AIAssistant";

const ResumePage = () => (
  <AuthGate>
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">
      <Helmet>
        <title>Resume | Vishnu Jillala</title>
        <meta name="description" content="Download or preview Vishnu Jillala's up-to-date resume." />
        <link rel="canonical" href="https://vishnujillala.lovable.app/resume" />
      </Helmet>
      <ScrollProgress />
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10 pt-20">
        <Resume />
      </main>
      <BackToTop />
      <AIAssistant />
    </div>
  </AuthGate>
);

export default ResumePage;
