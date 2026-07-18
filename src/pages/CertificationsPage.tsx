import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Certifications from "@/components/Certifications";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import AuthGate from "@/components/AuthGate";
import AIAssistant from "@/components/AIAssistant";

const CertificationsPage = () => (
  <AuthGate>
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">
      <Helmet>
        <title>Certifications & Achievements | Vishnu Jillala</title>
        <meta name="description" content="Certifications, courses, and professional achievements by Vishnu Jillala." />
        <link rel="canonical" href="https://vishnujillala.lovable.app/certifications" />
      </Helmet>
      <ScrollProgress />
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10 pt-16">
        
        <Certifications />
      </main>
      <BackToTop />
      <AIAssistant />
    </div>
  </AuthGate>
);

export default CertificationsPage;
