import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import AuthGate from "@/components/AuthGate";
import AIAssistant from "@/components/AIAssistant";

const ContactPage = () => (
  <AuthGate>
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">
      <Helmet>
        <title>Contact | Vishnu Jillala</title>
        <meta name="description" content="Get in touch with Vishnu Jillala — email, socials, WhatsApp, and meeting booking." />
        <link rel="canonical" href="https://vishnujillala.lovable.app/contact" />
      </Helmet>
      <ScrollProgress />
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10 pt-20">
        <Contact />
      </main>
      <BackToTop />
      <AIAssistant />
    </div>
  </AuthGate>
);

export default ContactPage;
