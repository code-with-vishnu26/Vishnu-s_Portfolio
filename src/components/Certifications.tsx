import { motion, AnimatePresence } from "framer-motion";
import { Award, Calendar, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import advancedReactCert from "@/assets/advanced-react-cert.png";
import algorithmsCert from "@/assets/algorithms-cert.png";
import probabilityCert from "@/assets/probability-cert.png";
import cloudCert from "@/assets/cloud-cert.png";
import powerbiCert from "@/assets/powerbi-cert.png";
import agenticCert from "@/assets/agentic-cert.png";
import genericCert from "@/assets/generic-cert.png";
import dynamicProgrammingCert from "@/assets/dynamic-programming-cert.png";
import dataStructuresCert from "@/assets/data-structures-cert.png";
import exploratoryDataAnalysisCert from "@/assets/exploratory-data-analysis-cert.png";
import dataMiningMethodsCert from "@/assets/data-mining-methods-cert.png";
import databaseManagementCert from "@/assets/database-management-cert.png";
import ibmRagAgenticAiCert from "@/assets/ibm-rag-agentic-ai-cert.png";
import introJavaCert from "@/assets/intro-java-cert.png";
import introAiCert from "@/assets/intro-ai-cert.png";
import introWebDevCert from "@/assets/intro-web-dev-cert.png";
import introDataAnalyticsCert from "@/assets/intro-data-analytics-cert.png";
import introOopJavaCert from "@/assets/intro-oop-java-cert.png";
import javaClassLibraryCert from "@/assets/java-class-library-cert.png";
import coreJavaSpecializationCert from "@/assets/core-java-specialization-cert.png";
import linearAlgebraCert from "@/assets/linear-algebra-cert.png";
import osFundamentalsCert from "@/assets/os-fundamentals-cert.png";
import oopHierarchiesJavaCert from "@/assets/oop-hierarchies-java-cert.png";
import multivariateCalculusCert from "@/assets/multivariate-calculus-cert.png";
import reactBasicsCert from "@/assets/react-basics-cert.png";
import renewableEnergyCert from "@/assets/renewable-energy-technology-fundamentals-cert.png";
import physics102Cert from "@/assets/physics-102-cert.png";
import developGenerativeAiCert from "@/assets/develop-generative-ai-cert.png";
import vectorDatabasesRagCert from "@/assets/vector-databases-rag-cert.png";
import buildRagApplicationsCert from "@/assets/build-rag-applications-cert.png";
import agenticAiFrameworksCert from "@/assets/agentic-ai-frameworks-cert.png";
import advancedRagCert from "@/assets/advanced-rag-cert.png";
import multimodalGenAiCert from "@/assets/multimodal-gen-ai-cert.png";
import agenticAiLangChainLangGraphCert from "@/assets/agentic-ai-langchain-langgraph-cert.png";
import fundamentalsBuildingAiAgentsCert from "@/assets/fundamentals-building-ai-agents-cert.png";
import buildAiAgentsMcpCert from "@/assets/build-ai-agents-mcp-cert.png";

const Certifications = () => {
  const { t, language } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const certifications = [
    { 
      title: "IBM RAG and Agentic AI", 
      issuer: "IBM", 
      date: "Feb 2026", 
      badge: "🤖", 
      link: "https://coursera.org/verify/professional-cert/MX77TKWHN9UX", 
      description: "Professional Certificate covering RAG, agentic workflows, LangGraph, CrewAI, AutoGen, BeeAI frameworks, and MCP.", 
      image: ibmRagAgenticAiCert 
    },
    { 
      title: "Building AI Agents and Agentic Workflows", 
      issuer: "IBM", 
      date: "Feb 2026", 
      badge: "🤖", 
      link: "https://coursera.org/verify/specialization/C2CNKX4UJRI3", 
      description: "Designing agentic AI systems using LangGraph, CrewAI, AutoGen, and BeeAI frameworks.", 
      image: agenticCert 
    },
    { 
      title: "Develop Generative AI Applications: Get Started", 
      issuer: "IBM", 
      date: "Feb 2026", 
      badge: "🤖", 
      link: "https://coursera.org/verify/GOSMZZWRTEV9", 
      description: "Building generative AI applications, prompt engineering, and working with foundation models.", 
      image: developGenerativeAiCert 
    },
    { 
      title: "Build RAG Applications: Get Started", 
      issuer: "IBM", 
      date: "Feb 2026", 
      badge: "🤖", 
      link: "https://coursera.org/verify/XKRE0YT2AICD", 
      description: "Designing Retrieval-Augmented Generation (RAG) systems to ground LLM responses with external data.", 
      image: buildRagApplicationsCert 
    },
    { 
      title: "Vector Databases for RAG: An Introduction", 
      issuer: "IBM", 
      date: "Feb 2026", 
      badge: "🤖", 
      link: "https://coursera.org/verify/M5ED6JN9FMNM", 
      description: "Understanding vector databases, embeddings, index types, and semantic search techniques.", 
      image: vectorDatabasesRagCert 
    },
    { 
      title: "Agentic AI with LangGraph, CrewAI, AutoGen and BeeAI", 
      issuer: "IBM", 
      date: "Feb 2026", 
      badge: "🤖", 
      link: "https://coursera.org/verify/TZ1XVKLLY91X", 
      description: "Implementing complex agentic workflows, multi-agent frameworks, tool usage, and cognitive loops.", 
      image: agenticAiFrameworksCert 
    },
    { 
      title: "Advanced RAG with Vector Databases and Retrievers", 
      issuer: "IBM", 
      date: "Feb 2026", 
      badge: "🤖", 
      link: "https://coursera.org/verify/43PF81ELQEUK", 
      description: "Advanced semantic search, parent-child retrieval, query expansion, reranking, and hybrid search methods.", 
      image: advancedRagCert 
    },
    { 
      title: "Build Multimodal Generative AI Applications", 
      issuer: "IBM", 
      date: "Feb 2026", 
      badge: "🤖", 
      link: "https://coursera.org/verify/COUTLJ5GP26Q", 
      description: "Developing models and applications processing audio, video, text, and images using modern APIs.", 
      image: multimodalGenAiCert 
    },
    { 
      title: "Agentic AI with LangChain and LangGraph", 
      issuer: "IBM", 
      date: "Feb 2026", 
      badge: "🤖", 
      link: "https://coursera.org/verify/WHR9YNCEZABU", 
      description: "Stateful orchestration, cyclic execution graphs, custom memory structures, and error handling in agentic systems.", 
      image: agenticAiLangChainLangGraphCert 
    },
    { 
      title: "Fundamentals of Building AI Agents", 
      issuer: "IBM", 
      date: "Feb 2026", 
      badge: "🤖", 
      link: "https://coursera.org/verify/SH5CN07ON35H", 
      description: "Core architectures of autonomous systems, planning loops, memory, and functional call integrations.", 
      image: fundamentalsBuildingAiAgentsCert 
    },
    { 
      title: "Build AI Agents using MCP", 
      issuer: "IBM", 
      date: "Feb 2026", 
      badge: "🤖", 
      link: "https://coursera.org/verify/PQK4MQPJ21IW", 
      description: "Developing autonomous AI agents using Model Context Protocol (MCP) to connect tools and data sources dynamically.", 
      image: buildAiAgentsMcpCert 
    },
    { 
      title: "Core Java Specialization", 
      issuer: "LearnQuest", 
      date: "Apr 2023", 
      badge: "☕", 
      link: "https://coursera.org/verify/specialization/49L63PL9C95E", 
      description: "Comprehensive 4-course specialization covering Java syntax, OOP, inheritance, polymorphisms, and class libraries.", 
      image: coreJavaSpecializationCert 
    },
    { 
      title: "Advanced React", 
      issuer: "Meta", 
      date: "Apr 2025", 
      badge: "⚛️", 
      link: "https://coursera.org/verify/PWW8GOWSOYSE", 
      description: "Advanced patterns, hooks, testing, and reusable component architecture in React.", 
      image: advancedReactCert 
    },
    { 
      title: "Exploratory Data Analysis for Machine Learning", 
      issuer: "IBM", 
      date: "Apr 2025", 
      badge: "🔬", 
      link: "https://coursera.org/verify/3TQQ4PIUM00W", 
      description: "Data transformation, feature engineering, and statistical analysis for ML pipelines.", 
      image: exploratoryDataAnalysisCert 
    },
    { 
      title: "Introduction to Data Analytics", 
      issuer: "IBM", 
      date: "Sep 2025", 
      badge: "📊", 
      link: "https://coursera.org/verify/CO9BEGGDT5ZZ", 
      description: "Fundamentals of data analytics, data wrangling, mining, and visualization techniques.", 
      image: introDataAnalyticsCert 
    },
    { 
      title: "Mathematics for ML: Multivariate Calculus", 
      issuer: "Imperial College London", 
      date: "Mar 2025", 
      badge: "📐", 
      link: "https://coursera.org/verify/COHCXIA3YZM7", 
      description: "Derivatives, neural network math, and regression analysis for machine learning.", 
      image: multivariateCalculusCert 
    },
    { 
      title: "React Basics", 
      issuer: "Meta", 
      date: "Apr 2025", 
      badge: "⚛️", 
      link: "https://coursera.org/verify/D4KZWNNYBNGT", 
      description: "Core React concepts including components, props, state, and event-driven programming.", 
      image: reactBasicsCert 
    },
    { 
      title: "Cloud Virtualization, Containers and APIs", 
      issuer: "Duke University", 
      date: "Oct 2024", 
      badge: "☁️", 
      link: "https://coursera.org/verify/4E07AI7CZ63P", 
      description: "Cloud deployment, Kubernetes, Docker containers, and microservices architecture.", 
      image: cloudCert 
    },
    { 
      title: "Data Mining Methods", 
      issuer: "University of Colorado Boulder", 
      date: "Apr 2025", 
      badge: "⛏️", 
      link: "https://coursera.org/verify/P6DP26AMDGC0", 
      description: "Supervised learning, anomaly detection, and data modeling techniques.", 
      image: dataMiningMethodsCert 
    },
    { 
      title: "Data Analysis and Visualization with Power BI", 
      issuer: "Microsoft", 
      date: "Apr 2025", 
      badge: "📈", 
      link: "https://coursera.org/verify/U2DV6TBLFD3Z", 
      description: "Building interactive dashboards, data storytelling, and business intelligence reports.", 
      image: powerbiCert 
    },
    { 
      title: "Operating Systems Fundamentals", 
      issuer: "Akamai Technologies", 
      date: "Apr 2024", 
      badge: "🖥️", 
      link: "https://coursera.org/verify/CBE6JH9UAWZ4", 
      description: "Linux command line, file management, system security, and virtualization.", 
      image: osFundamentalsCert 
    },
    { 
      title: "Mathematics for ML: Linear Algebra", 
      issuer: "Imperial College London", 
      date: "Mar 2025", 
      badge: "🧮", 
      link: "https://coursera.org/verify/RM0PNAU2CG94", 
      description: "Vectors, matrices, eigenvalues, and their applications in ML algorithms.", 
      image: linearAlgebraCert 
    },
    { 
      title: "Introduction to OOP with Java", 
      issuer: "LearnQuest", 
      date: "Apr 2023", 
      badge: "☕", 
      link: "https://coursera.org/verify/B69NLK2YTP4J", 
      description: "Object-oriented programming fundamentals, classes, and encapsulation in Java.", 
      image: introOopJavaCert 
    },
    { 
      title: "Algorithms for Searching, Sorting, and Indexing", 
      issuer: "University of Colorado Boulder", 
      date: "Nov 2023", 
      badge: "🔍", 
      link: "https://coursera.org/verify/843J68BNCBZM", 
      description: "Heap data structures, sorting algorithms, hash functions, and priority queues.", 
      image: algorithmsCert 
    },
    { 
      title: "Dynamic Programming, Greedy Algorithms", 
      issuer: "University of Colorado Boulder", 
      date: "Nov 2023", 
      badge: "🧩", 
      link: "https://coursera.org/verify/F5AK9TX47KLU", 
      description: "Divide and conquer, dynamic programming, and P vs NP problem analysis.", 
      image: dynamicProgrammingCert 
    },
    { 
      title: "An Intuitive Introduction to Probability", 
      issuer: "University of Zurich", 
      date: "Apr 2023", 
      badge: "🎲", 
      link: "https://coursera.org/verify/PL4HSFHGNGQW", 
      description: "Probability distributions, statistical analysis, and risk assessment fundamentals.", 
      image: probabilityCert 
    },
    { 
      title: "Introduction to Artificial Intelligence (AI)", 
      issuer: "IBM", 
      date: "Apr 2024", 
      badge: "🤖", 
      link: "https://coursera.org/verify/5DS4S3KUKBF6", 
      description: "AI concepts, machine learning, deep learning, and generative AI applications.", 
      image: introAiCert 
    },
    { 
      title: "Object-Oriented Hierarchies in Java", 
      issuer: "LearnQuest", 
      date: "Apr 2023", 
      badge: "☕", 
      link: "https://coursera.org/verify/NS7VSQKL6K68", 
      description: "Inheritance, polymorphism, and advanced OOP design patterns in Java.", 
      image: oopHierarchiesJavaCert 
    },
    { 
      title: "Physics 102 - Magnetic Fields and Faraday's Law", 
      issuer: "Rice University", 
      date: "Apr 2023", 
      badge: "🧲", 
      link: "https://coursera.org/verify/NTKVQEUWNJUL", 
      description: "Electromagnetism, magnetic fields, torque, and Faraday's law applications.", 
      image: physics102Cert 
    },
    { 
      title: "Introduction to Web Development", 
      issuer: "UC Davis", 
      date: "Apr 2024", 
      badge: "🌐", 
      link: "https://coursera.org/verify/HZTTSG5CRFSR", 
      description: "HTML, CSS, web servers, version control, and front-end development fundamentals.", 
      image: introWebDevCert 
    },
    { 
      title: "Java Class Library", 
      issuer: "LearnQuest", 
      date: "Apr 2023", 
      badge: "📚", 
      link: "https://coursera.org/verify/EXNZQ7HJVE3N", 
      description: "Java collections, file I/O, data persistence, and application frameworks.", 
      image: javaClassLibraryCert 
    },
    { 
      title: "Database Management Essentials", 
      issuer: "University of Colorado System", 
      date: "Nov 2023", 
      badge: "🗄️", 
      link: "https://coursera.org/verify/5BGWSW4M4QT2", 
      description: "SQL, database design, relational databases, and data modeling principles.", 
      image: databaseManagementCert 
    },
    { 
      title: "Data Structures", 
      issuer: "UC San Diego", 
      date: "Apr 2023", 
      badge: "🏗️", 
      link: "https://coursera.org/verify/BL4NHHXGAWZZ", 
      description: "Arrays, linked lists, trees, and algorithm efficiency for problem solving.", 
      image: dataStructuresCert 
    },
    { 
      title: "Introduction to Java", 
      issuer: "LearnQuest", 
      date: "Apr 2023", 
      badge: "☕", 
      link: "https://coursera.org/verify/9CUG3UDM2WGD", 
      description: "Java syntax, data types, expressions, operators, and control flow statements.", 
      image: introJavaCert 
    },
    { 
      title: "Renewable Energy Technology Fundamentals", 
      issuer: "University of Colorado Boulder", 
      date: "Mar 2023", 
      badge: "🌱", 
      link: "https://coursera.org/verify/EKHPBLZEHX6W", 
      description: "Solar, wind energy technologies, and renewable energy storage systems.", 
      image: renewableEnergyCert 
    },
  ];

  const getCourseCategory = (title: string): 'ai' | 'swe' | 'ds' | 'science' => {
    const t = title.toLowerCase();
    if (
      t.includes("generative ai") ||
      t.includes("rag") ||
      t.includes("agentic") ||
      t.includes("ai agent") ||
      t.includes("artificial intelligence") ||
      t.includes("mcp")
    ) {
      return 'ai';
    }
    if (
      t.includes("probability") ||
      t.includes("calculus") ||
      t.includes("linear algebra") ||
      t.includes("data mining") ||
      t.includes("data analysis") ||
      t.includes("data analytics") ||
      t.includes("algorithms") ||
      t.includes("programming, greedy") ||
      t.includes("data structures")
    ) {
      return 'ds';
    }
    if (
      t.includes("physics 102") ||
      t.includes("renewable energy")
    ) {
      return 'science';
    }
    return 'swe';
  };

  const getCategoryLabel = (catId: string): string => {
    const labels: Record<string, Record<string, string>> = {
      en: {
        all: "All",
        ai: "AI & Agentic Workflows",
        swe: "Software Engineering",
        ds: "Data Science & Math",
        science: "Other Sciences"
      },
      te: {
        all: "అన్నీ",
        ai: "AI & ఏజెంటిక్ వర్క్‌ఫ్లోలు",
        swe: "సాఫ్ట్‌వేర్ ఇంజనీరింగ్",
        ds: "డేటా సైన్స్ & మ్యాథ్స్",
        science: "ఇతర శాస్త్రాలు"
      },
      hi: {
        all: "सभी",
        ai: "एआई और एजेंटिक वर्कफ़्लो",
        swe: "सॉफ्टवेयर इंजीनियरिंग",
        ds: "डेटा विज्ञान और गणित",
        science: "अन्य विज्ञान"
      },
      es: {
        all: "Todos",
        ai: "IA y flujos de trabajo de agentes",
        swe: "Ingeniería de Software",
        ds: "Ciencia de datos y matemáticas",
        science: "Otras Ciencias"
      },
      fr: {
        all: "Tout",
        ai: "IA et flux de travail des agents",
        swe: "Génie Logiciel",
        ds: "Science des données & Mathématiques",
        science: "Autres Sciences"
      },
      de: {
        all: "Alle",
        ai: "KI & Agenten-Workflows",
        swe: "Softwareentwicklung",
        ds: "Datenwissenschaft & Mathematik",
        science: "Andere Wissenschaften"
      }
    };
    return labels[language]?.[catId] || labels.en[catId];
  };

  const getHeaderLabel = (key: 'specializations' | 'courses' | 'achievements'): string => {
    const labels: Record<string, Record<string, string>> = {
      en: {
        specializations: "Specializations",
        courses: "Courses",
        achievements: "Achievements"
      },
      te: {
        specializations: "ప్రత్యేకతలు",
        courses: "కోర్సులు",
        achievements: "విజయాలు"
      },
      hi: {
        specializations: "विशेषज्ञता",
        courses: "पाठ्यक्रम",
        achievements: "उपलब्धियां"
      },
      es: {
        specializations: "Especializaciones",
        courses: "Cursos",
        achievements: "Logros"
      },
      fr: {
        specializations: "Spécialisations",
        courses: "Cours",
        achievements: "Réalisations"
      },
      de: {
        specializations: "Spezialisierungen",
        courses: "Kurse",
        achievements: "Leistungen"
      }
    };
    return labels[language]?.[key] || labels.en[key];
  };

  const achievements = [
    {
      title: "DIGITECH Hackathon Winner",
      issuer: "Woxsen University",
      date: "Mar 2025",
      badge: "🥇",
      description: "Ranked #1 among 50+ teams. Developed an AI-powered resume ranking system utilizing machine learning and natural language processing.",
      link: "https://woxsen.edu.in/"
    },
    {
      title: "Active Competitive Programmer",
      issuer: "LeetCode & CodeChef",
      date: "Ongoing",
      badge: "💻",
      description: "Solved 100+ algorithmic problems covering complex data structures, dynamic programming, and optimization algorithms.",
      link: "https://leetcode.com/"
    },
    {
      title: "Open Source Contributor",
      issuer: "GitHub Community",
      date: "Ongoing",
      badge: "🚀",
      description: "Actively contributing to open-source software, making 200+ commits across 10+ repositories to improve tools and libraries.",
      link: "https://github.com/"
    }
  ];

  const specializations = certifications.filter(cert => 
    cert.title.toLowerCase().includes("specialization") || 
    cert.title.toLowerCase().includes("professional certificate") ||
    cert.link.toLowerCase().includes("specialization") ||
    cert.link.toLowerCase().includes("professional-cert")
  );

  const courses = certifications.filter(cert => !specializations.includes(cert));

  const filteredCourses = activeCategory === 'all'
    ? courses
    : courses.filter(cert => getCourseCategory(cert.title) === activeCategory);

  const visibleCourses = filteredCourses.slice(0, 6);
  const hiddenCourses = filteredCourses.slice(6);

  const CertCard = ({ cert, index }: { cert: typeof certifications[0]; index: number }) => (
    <motion.a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: Math.min(index * 0.03, 0.25) }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="bg-card/60 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-border dark:border-white/10 group cursor-pointer block shadow-sm dark:shadow-none hover:shadow-lg dark:hover:shadow-none transition-all duration-300"
    >
      <div className="flex items-start space-x-3 sm:space-x-4">
        <div className="text-2xl sm:text-3xl md:text-4xl flex-shrink-0">{cert.badge}</div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2 mb-2">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">{cert.title}</h3>
            <div className="flex items-center space-x-1 text-xs sm:text-sm text-muted-foreground flex-shrink-0">
              <Calendar size={12} className="sm:w-[14px] sm:h-[14px]" />
              <span>{cert.date}</span>
            </div>
          </div>
          <p className="text-blue-600 dark:text-blue-300 font-medium mb-1 sm:mb-2 text-sm sm:text-base">{cert.issuer}</p>
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2">{cert.description}</p>
          
          {'image' in cert && cert.image && (
            <div className="w-full h-32 sm:h-36 rounded-xl overflow-hidden mb-4 border border-border dark:border-white/5 shadow-inner relative group/img select-none">
              <img 
                src={cert.image} 
                alt={`${cert.title} Certificate`} 
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          )}

          {cert.link && cert.link.includes("coursera.org") && (
            <div className="flex items-center justify-between border-t border-border/40 dark:border-white/5 pt-3 mt-3">
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                <Award size={14} className="text-yellow-500 dark:text-yellow-400 sm:w-4 sm:h-4" />
                <span>Coursera Verified</span>
              </div>
              <ExternalLink size={14} className="text-muted-foreground/50 group-hover:text-primary transition-colors" />
            </div>
          )}
        </div>
      </div>
    </motion.a>
  );

  return (
    <section id="certifications" className="pt-2 pb-8 sm:pt-4 sm:pb-10 md:pt-6 md:pb-14 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-4 sm:mb-5 md:mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">{t('certifications.title')}</h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 mx-auto rounded-full"></div>
        </motion.div>

        {/* Specialization Section */}
        <div className="mb-8">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 text-foreground/90 border-b border-border dark:border-white/10 pb-2 flex items-center gap-2">
            <Award className="text-blue-500 dark:text-blue-400 w-5 h-5 sm:w-6 sm:h-6" />
            {getHeaderLabel('specializations')}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {specializations.map((cert, index) => (<CertCard key={index} cert={cert} index={index} />))}
          </div>
        </div>

        {/* Course Section */}
        <div className="mb-8">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between border-b border-border dark:border-white/10 pb-4 mb-8 gap-4">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground/90 flex items-center gap-2 flex-shrink-0">
              <Award className="text-purple-500 dark:text-purple-400 w-5 h-5 sm:w-6 sm:h-6" />
              {getHeaderLabel('courses')}
            </h3>
            
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {['all', 'ai', 'swe', 'ds', 'science'].map((catId) => {
                const isActive = activeCategory === catId;
                const count = catId === 'all' 
                  ? courses.length 
                  : courses.filter(c => getCourseCategory(c.title) === catId).length;
                
                return (
                  <button
                    key={catId}
                    onClick={() => {
                      setActiveCategory(catId);
                      setShowAll(false);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                      isActive 
                        ? "bg-primary text-primary-foreground shadow-sm scale-105" 
                        : "bg-muted/50 hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    {getCategoryLabel(catId)} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {visibleCourses.map((cert, index) => (
              <CertCard key={cert.title} cert={cert} index={index} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {showAll && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: "auto" }} 
                exit={{ opacity: 0, height: 0 }} 
                transition={{ duration: 0.5, ease: "easeInOut" }} 
                className="overflow-hidden"
              >
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
                  {hiddenCourses.map((cert, index) => (
                    <CertCard key={cert.title} cert={cert} index={index} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {filteredCourses.length > 6 && (
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-8 sm:mt-10">
              <button 
                onClick={() => setShowAll(!showAll)} 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 border border-blue-500/20 dark:border-blue-400/30 rounded-full text-foreground hover:from-blue-500/20 hover:to-purple-500/20 dark:hover:from-blue-500/30 dark:hover:to-purple-500/30 transition-all duration-300"
              >
                {showAll ? "Show Less" : `View All ${filteredCourses.length} ${getCategoryLabel(activeCategory)} Courses`}
                {showAll ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
            </motion.div>
          )}
        </div>

        {/* Achievements Section */}
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 text-foreground/90 border-b border-border dark:border-white/10 pb-2 flex items-center gap-2">
            <span>🏅</span>
            {getHeaderLabel('achievements')}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {achievements.map((ach, index) => (
              <CertCard key={ach.title} cert={ach} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
