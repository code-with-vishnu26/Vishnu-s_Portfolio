import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import { EnhancedTimeline } from "@/components/EnhancedTimeline";
import AIAssistant from "@/components/AIAssistant";
import ScrollProgress from "@/components/ScrollProgress";
import AuthGate from "@/components/AuthGate";

const JourneyPage = () => {
  return (
    <AuthGate>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">
        <Helmet>
          <title>Journey | Vishnu Jillala</title>
          <meta
            name="description"
            content="Explore Vishnu Jillala's journey."
          />
          <link rel="canonical" href="https://vishnujillala.lovable.app/journey" />
        </Helmet>
        <Navbar />
        <main className="relative z-10 pt-16">
          <EnhancedTimeline />
        </main>
      </div>
    </AuthGate>
  );
};

export default JourneyPage;
