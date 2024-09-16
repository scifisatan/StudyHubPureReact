import {
  ArrowRight,
  BookOpen,
  FileText,
  MessageCircle,
  Mic,
  Youtube,
} from "lucide-react";

export const HomePageConfig = {
  title: "StudyHub",
  header: {
    icon: <BookOpen />,
    navigation: [
      {
        name: "Features",
        link: "#features",
      },
      {
        name: "Team",
        link: "#team",
      },
    ],
  },
  content: {
    welcomeMessage: " Your Ultimate Study Companion",
    description:
      " Record lectures, organize notes, and interact with your study materials like never before. Boost your learning with AI-powered summaries and a smart chatbot assistant.",
    cta: {
      text: "Get Started Free",
      link: "/lectures",
    },
  },
  features: [
    {
      icon: <Mic className="h-8 w-8 text-blue-600" />,
      title: "Lecture Recording",
      description:
        "Easily record and organize your lectures with our built-in audio recorder.",
    },
    {
      icon: <Youtube className="h-8 w-8 text-blue-600" />,
      title: "YouTube Integration",
      description:
        "Add and manage YouTube videos related to your studies directly in the app.",
    },
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      title: "File Management",
      description:
        "Upload and organize lecture notes, PDFs, and other study materials in one place.",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      title: "AI-Powered Summaries",
      description:
        "Get concise, AI-generated summaries of your lectures and study materials.",
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-blue-600" />,
      title: "Smart Chatbot",
      description:
        "Interact with a chatbot that understands your study materials and answers your questions.",
    },
    {
      icon: <ArrowRight className="h-8 w-8 text-blue-600" />,
      title: "Seamless Integration",
      description:
        "All your study resources in one place, accessible across all your devices.",
    },
  ],

  founders: [
    {
      name: "Abi Shrestha",
      role: "Frontend Developer",
      linkedinUrl: "https://www.linkedin.com/in/39abii/",
      githubUrl: "https://www.github.com/scifisatan",
    },
    {
      name: "Safal Adhikari",
      role: "Backend Developer",
      linkedinUrl: "https://www.linkedin.com/in/saffire/",
      githubUrl: "https://www.github.com/saffirex",
    },
    {
      name: "Arun Shrestha",
      role: "AI Expert",
      linkedinUrl: "https://www.linkedin.com/in/arun-shrestha-400038219/",
      githubUrl: "https://www.github.com/ArunShresthaa",
    },
  ],
  footer: {
    text: "© 2024 StudyHub. All rights reserved",
    links: [
      {
        name: "Privacy Policy",
        link: "/privacy",
      },
      {
        name: "Terms of Service",
        link: "/terms",
      },
    ],
  },
};
