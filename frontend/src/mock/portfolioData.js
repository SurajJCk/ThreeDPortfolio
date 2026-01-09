// Mock portfolio data for Suraj J Changkakoti
// This will be replaced with real data integration later

export const portfolioData = {
  personal: {
    name: "Suraj J Changkakoti",
    title: "Creative Technologist & Builder",
    tagline: "Exploring the intersection of code, creativity, and performance",
    bio: "Passionate about building immersive digital experiences and sharing knowledge through content creation. Runner, creator, and perpetual learner.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    linkedIn: "https://www.linkedin.com/in/surajjchangkakoti/",
    youtube: "https://www.youtube.com/@SurajJCk",
    email: "suraj@example.com"
  },

  skills: [
    { name: "React & Three.js", level: 90, category: "frontend" },
    { name: "Node.js & Python", level: 85, category: "backend" },
    { name: "3D Design", level: 75, category: "creative" },
    { name: "Performance Optimization", level: 88, category: "technical" },
    { name: "Content Creation", level: 82, category: "media" },
    { name: "System Design", level: 80, category: "architecture" }
  ],

  projects: [
    {
      id: 1,
      title: "Interactive 3D Portfolio",
      description: "A game-like portfolio experience built with React Three Fiber",
      technologies: ["React", "Three.js", "WebGL"],
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
      link: "#",
      featured: true
    },
    {
      id: 2,
      title: "Performance Runner App",
      description: "Fitness tracking application with real-time analytics",
      technologies: ["React Native", "Firebase", "ML Kit"],
      image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop",
      link: "#",
      featured: true
    },
    {
      id: 3,
      title: "Knowledge Hub Platform",
      description: "Educational content management system with video integration",
      technologies: ["Next.js", "MongoDB", "AWS"],
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",
      link: "#",
      featured: true
    },
    {
      id: 4,
      title: "Real-time Collaboration Tool",
      description: "Team workspace with live updates and file sharing",
      technologies: ["WebSocket", "Redis", "React"],
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
      link: "#",
      featured: false
    }
  ],

  achievements: [
    {
      title: "10K+ YouTube Subscribers",
      description: "Educational tech content",
      icon: "trophy"
    },
    {
      title: "Marathon Runner",
      description: "Completed 5 marathons",
      icon: "award"
    },
    {
      title: "Open Source Contributor",
      description: "500+ contributions",
      icon: "star"
    }
  ],

  zones: {
    welcome: {
      name: "Welcome Plaza",
      description: "Start your journey here",
      position: [0, 0, 0],
      color: "#4a90e2",
      ambientSound: "ambient-welcome"
    },
    projects: {
      name: "Builder's Workshop",
      description: "Explore projects and creations",
      position: [15, 0, -10],
      color: "#f39c12",
      ambientSound: "ambient-creative"
    },
    connect: {
      name: "Connection Hub",
      description: "Let's connect and collaborate",
      position: [-15, 0, -10],
      color: "#2ecc71",
      ambientSound: "ambient-social"
    }
  },

  easterEggs: [
    {
      id: "secret-1",
      position: [20, 2, 20],
      message: "🎮 You found the secret! Thanks for exploring!",
      unlocked: false
    },
    {
      id: "secret-2",
      position: [-20, 2, -20],
      message: "🏃 Keep running, keep building!",
      unlocked: false
    }
  ]
};

export default portfolioData;