import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DeveloperIdentity from "@/components/DeveloperIdentity";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollProgress from "@/components/ScrollProgress";

import GitHubActivity from "@/components/GitHubActivity";
import AchievementStats from "@/components/AchievementStats";
import AvailabilityCard from "@/components/AvailabilityCard";
import HowIWork from "@/components/HowIWork";
import AIAssistant from "@/components/AIAssistant";
import Footer from "@/components/Footer";


const Portfolio = () => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const enforce = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (cancelled) return;
      if (!session) {
        navigate("/auth");
        return;
      }
      // Ensure user came through the PIN gate, not via direct URL
      if (!sessionStorage.getItem("pin_verified")) {
        navigate("/profiles");
        return;
      }
      setAuthorized(true);
    };

    enforce();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/auth");
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [navigate]);

  if (!authorized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">
      <Helmet>
        <title>Portfolio | Vishnu Jillala</title>
        <meta name="description" content="Explore Vishnu Jillala's projects, technical skills, certifications, and work experience." />
        <link rel="canonical" href="https://vishnujillala.lovable.app/portfolio" />
        <meta property="og:title" content="Portfolio | Vishnu Jillala" />
        <meta property="og:description" content="Projects, skills, certifications, and work experience of Vishnu Jillala." />
        <meta property="og:url" content="https://vishnujillala.lovable.app/portfolio" />
        <meta name="twitter:title" content="Portfolio | Vishnu Jillala" />
        <meta name="twitter:description" content="Projects, skills, certifications, and work experience of Vishnu Jillala." />
      </Helmet>
      <ScrollProgress />
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <DeveloperIdentity />
        <HowIWork />
        <AchievementStats />
        <AvailabilityCard />
        <GitHubActivity />
        <Footer />
      </main>

      <AIAssistant />
    </div>
  );
};

export default Portfolio;
