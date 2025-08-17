"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu,
  Moon,
  Sun,
  X,
  ChevronDown,
  Home,
  Book,
  Code,
  Briefcase,
  Layout,
  Award,
  Mail,
  ChevronRight,
  Pin,
  Star,
  Zap
} from "lucide-react";

// Enhanced Button component with better visual effects
const Button = ({ children, variant = "default", size = "default", className = "", onClick, ...props }) => {
  const [isPressed, setIsPressed] = useState(false);
  
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden";
  
  const variants = {
    default: "bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 text-white hover:from-purple-700 hover:via-purple-600 hover:to-blue-700 shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95",
    ghost: "hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-700 dark:hover:from-purple-900/30 dark:hover:to-blue-900/30 dark:hover:text-purple-300 backdrop-blur-sm",
    outline: "border-2 border-gradient-to-r from-purple-300 to-blue-300 hover:from-purple-400 hover:to-blue-400 dark:from-purple-600 dark:to-blue-600 dark:hover:from-purple-500 dark:hover:to-blue-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 backdrop-blur-sm",
  };
  
  const sizes = {
    default: "h-10 py-2 px-4",
    icon: "h-10 w-10",
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${isPressed ? 'scale-95' : ''}`}
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      {...props}
    >
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 -top-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      {children}
    </button>
  );
};

export function Header() {
  // Enhanced theme hook with localStorage persistence and SSR safety
  const useTheme = () => {
    const [theme, setTheme] = useState("dark");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem("theme") || "dark";
        setTheme(savedTheme);
        
        if (savedTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    }, []);

    const toggleTheme = () => {
      if (typeof window !== 'undefined') {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        
        if (newTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    };

    return { theme, setTheme: toggleTheme, mounted };
  };

  // Enhanced CSS animations with more sophisticated effects
  useEffect(() => {
    if (typeof document !== "undefined") {
      const style = document.createElement("style");
      style.textContent = `
        .hide-scrollbar::-webkit-scrollbar {
          height: 0px;
          width: 0px;
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        @keyframes rainbow-marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        
        @keyframes enhanced-float {
          0% { transform: translateY(0px) rotate(0deg) scale(1); }
          33% { transform: translateY(-4px) rotate(1deg) scale(1.02); }
          66% { transform: translateY(-8px) rotate(-1deg) scale(1.05); }
          100% { transform: translateY(0px) rotate(0deg) scale(1); }
        }
        
        @keyframes magical-pulse {
          0% { transform: scale(1); opacity: 0.8; box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4); }
          50% { transform: scale(1.05); opacity: 1; box-shadow: 0 0 0 20px rgba(139, 92, 246, 0); }
          100% { transform: scale(1); opacity: 0.8; box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); }
        }
        
        @keyframes aurora-glow {
          0% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.2), 0 0 60px rgba(16, 185, 129, 0.1); }
          33% { box-shadow: 0 0 25px rgba(59, 130, 246, 0.4), 0 0 50px rgba(16, 185, 129, 0.3), 0 0 70px rgba(245, 158, 11, 0.2); }
          66% { box-shadow: 0 0 30px rgba(16, 185, 129, 0.4), 0 0 60px rgba(245, 158, 11, 0.3), 0 0 80px rgba(236, 72, 153, 0.2); }
          100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.2), 0 0 60px rgba(16, 185, 129, 0.1); }
        }
        
        @keyframes crystal-shimmer {
          0% { background-position: -200% 0; opacity: 0; }
          50% { opacity: 1; }
          100% { background-position: 200% 0; opacity: 0; }
        }
        
        @keyframes elegant-slideDown {
          0% { transform: translateY(-100%) scale(0.9); opacity: 0; filter: blur(10px); }
          50% { transform: translateY(-50%) scale(0.95); opacity: 0.5; filter: blur(5px); }
          100% { transform: translateY(0) scale(1); opacity: 1; filter: blur(0px); }
        }
        
        @keyframes luxury-bounceIn {
          0% { transform: scale(0.3) rotate(-10deg); opacity: 0; filter: brightness(0.5); }
          25% { transform: scale(0.7) rotate(-5deg); opacity: 0.7; filter: brightness(0.8); }
          50% { transform: scale(1.1) rotate(2deg); opacity: 0.9; filter: brightness(1.2); }
          75% { transform: scale(0.95) rotate(-1deg); opacity: 1; filter: brightness(1.1); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; filter: brightness(1); }
        }
        
        @keyframes premium-gradient-shift {
          0% { background-position: 0% 50%; filter: hue-rotate(0deg); }
          25% { background-position: 50% 25%; filter: hue-rotate(90deg); }
          50% { background-position: 100% 50%; filter: hue-rotate(180deg); }
          75% { background-position: 50% 75%; filter: hue-rotate(270deg); }
          100% { background-position: 0% 50%; filter: hue-rotate(360deg); }
        }
        
        @keyframes orbit-animation {
          0% { transform: rotate(0deg) translateX(15px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(15px) rotate(-360deg); }
        }
        
        .enhanced-floating { animation: enhanced-float 6s ease-in-out infinite; }
        .magical-pulsing { animation: magical-pulse 3s ease-in-out infinite; }
        .aurora-glowing { animation: aurora-glow 4s ease-in-out infinite; }
        .elegant-slide-down { animation: elegant-slideDown 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .luxury-bounce-in { animation: luxury-bounceIn 1s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        
        .crystal-shimmer-bg {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), rgba(255,255,255,0.6), rgba(255,255,255,0.4), transparent);
          background-size: 200% 100%;
          animation: crystal-shimmer 3s infinite;
        }
        
        .nav-pill:hover .nav-icon {
          transform: translateY(-4px) scale(1.1) rotate(5deg);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .premium-text-gradient {
          background: linear-gradient(45deg, #8B5CF6, #06B6D4, #10B981, #F59E0B, #EC4899, #8B5CF6);
          background-size: 400% 400%;
          animation: premium-gradient-shift 6s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
          letter-spacing: 0.5px;
        }
        
        .glass-effect {
          backdrop-filter: blur(25px) saturate(180%);
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
        }
        
        .dark .glass-effect {
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
        }
        
        .orbiting-dot {
          animation: orbit-animation 8s linear infinite;
        }
        
        .gradient-border {
          position: relative;
          background: linear-gradient(45deg, #8B5CF6, #06B6D4, #10B981, #F59E0B);
          background-size: 400% 400%;
          animation: premium-gradient-shift 6s ease infinite;
          padding: 2px;
          border-radius: inherit;
        }
        
        .gradient-border::before {
          content: '';
          position: absolute;
          inset: 2px;
          background: inherit;
          border-radius: inherit;
          background: var(--bg-color);
        }
        
        .magnetic-hover {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .magnetic-hover:hover {
          transform: translateY(-2px) scale(1.05);
        }
        
        .holographic-effect {
          background: linear-gradient(45deg, 
            rgba(139, 92, 246, 0.1), 
            rgba(59, 130, 246, 0.1), 
            rgba(16, 185, 129, 0.1), 
            rgba(245, 158, 11, 0.1));
          background-size: 400% 400%;
          animation: premium-gradient-shift 8s ease infinite;
        }
      `;
      document.head.appendChild(style);

      return () => {
        if (document.head.contains(style)) {
          document.head.removeChild(style);
        }
      };
    }
  }, []);

  // State management (unchanged)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#about");
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredSection, setHoveredSection] = useState(null);
  const { theme, setTheme, mounted } = useTheme();
  const navRef = useRef(null);
  const headerRef = useRef(null);
  const lastScrollY = useRef(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [mobileNavHeight, setMobileNavHeight] = useState(0);
  const mobileNavRef = useRef(null);
  const ticking = useRef(false);
  const [isPinned, setIsPinned] = useState(false);
  const [animateSticky, setAnimateSticky] = useState(false);

  // Enhanced navigation links with more attractive colors
  const navLinks = [
    { href: "#about", label: "About", icon: Home, color: "from-blue-500 via-cyan-400 to-blue-600" },
    { href: "#education", label: "Education", icon: Book, color: "from-green-500 via-emerald-400 to-green-600" },
    { href: "#skills", label: "Skills", icon: Code, color: "from-purple-500 via-violet-400 to-purple-600" },
    { href: "#experience", label: "Experience", icon: Briefcase, color: "from-orange-500 via-amber-400 to-red-500" },
    { href: "#projects", label: "Projects", icon: Layout, color: "from-pink-500 via-rose-400 to-pink-600" },
    { href: "#achievements", label: "Achievements", icon: Award, color: "from-yellow-500 via-amber-400 to-orange-500" },
    { href: "#contact", label: "Contact", icon: Mail, color: "from-indigo-500 via-purple-400 to-indigo-600" },
  ];

  // Enhanced scroll handler (unchanged functionality)
  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 150) {
          setHeaderVisible(
            currentScrollY < lastScrollY.current ||
            currentScrollY < 300 ||
            isPinned
          );
        } else {
          setHeaderVisible(true);
        }

        if (currentScrollY > 10 && !scrolled) {
          setScrolled(true);
          setAnimateSticky(true);
          setTimeout(() => setAnimateSticky(false), 1000);
        } else if (currentScrollY <= 10 && scrolled) {
          setScrolled(false);
        }

        lastScrollY.current = currentScrollY;

        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = totalHeight > 0 ? (currentScrollY / totalHeight) * 100 : 0;
        setScrollProgress(progress);

        const sections = document.querySelectorAll("section[id]");
        const scrollPosition = currentScrollY + 100;

        let foundActive = false;
        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute("id");

          if (!sectionId) return;

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            foundActive = true;
            const newActiveSection = `#${sectionId}`;

            if (activeSection !== newActiveSection) {
              setActiveSection(newActiveSection);

              if (navRef.current) {
                const navItem = document.querySelector(`a[href="#${sectionId}"]`);
                if (navItem) {
                  const navRect = navRef.current.getBoundingClientRect();
                  const itemRect = navItem.getBoundingClientRect();

                  if (itemRect.left < navRect.left || itemRect.right > navRect.right) {
                    navRef.current.scrollTo({
                      left: navItem.offsetLeft - navRect.width / 2 + itemRect.width / 2,
                      behavior: "smooth",
                    });
                  }
                }
              }
            }
          }
        });

        if (!foundActive && sections.length > 0 && scrollPosition > sections[0].offsetTop) {
          const lastSection = sections[sections.length - 1];
          const lastId = lastSection.getAttribute("id");
          if (lastId) setActiveSection(`#${lastId}`);
        }

        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [activeSection, isPinned, scrolled]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isMenuOpen && mobileNavRef.current) {
      setMobileNavHeight(mobileNavRef.current.scrollHeight);
    } else {
      setMobileNavHeight(0);
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(v => !v);
  const togglePin = () => setIsPinned(v => !v);

  const handleNavClick = (href) => {
    setIsMenuOpen(false);
    setActiveSection(href);

    if (typeof window !== 'undefined') {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const getActiveSectionProgress = useCallback(() => {
    if (typeof window === 'undefined' || !activeSection) return 0;
    const currentSection = document.querySelector(activeSection);
    if (!currentSection) return 0;

    const sectionTop = currentSection.offsetTop;
    const sectionHeight = currentSection.offsetHeight;
    const currentPosition = window.scrollY + 100;
    const sectionProgress = ((currentPosition - sectionTop) / sectionHeight) * 100;

    return Math.min(Math.max(sectionProgress, 0), 100);
  }, [activeSection]);

  const activeSectionProgress = getActiveSectionProgress();

  const getActiveSectionTitle = () => {
    if (!activeSection) return "";
    const activeLink = navLinks.find(link => link.href === activeSection);
    return activeLink ? activeLink.label : "";
  };

  const highlightLeft = (() => {
    if (typeof window === 'undefined' || !activeSection) return 0;
    const item = document.querySelector(`a[href="${activeSection}"]`);
    return item ? item.offsetLeft - 4 : 0;
  })();

  const highlightWidth = (() => {
    if (typeof window === 'undefined' || !activeSection) return 0;
    const item = document.querySelector(`a[href="${activeSection}"]`);
    return item ? item.offsetWidth + 8 : 0;
  })();

  return (
    <>
      {/* Enhanced Top Progress Bar with Rainbow Effect */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200/10 dark:bg-gray-800/10">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 via-blue-500 via-cyan-500 via-green-500 via-yellow-500 via-orange-500 to-pink-500 transition-all duration-300 relative overflow-hidden"
          style={{ width: `${scrollProgress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[rainbow-marquee_2s_linear_infinite]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/60 via-blue-500/60 to-pink-500/60 blur-sm"></div>
          <div className="absolute top-0 right-0 w-4 h-full bg-gradient-to-l from-white/50 to-transparent"></div>
        </div>
      </div>

      {/* Enhanced Header */}
      <header
        ref={headerRef}
        className={`fixed z-40 top-1 left-0 right-0 transition-all duration-700 ${
          headerVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-2 mt-2">
          <div className={`glass-effect rounded-2xl border-2 transition-all duration-700 elegant-slide-down ${
            scrolled ? "shadow-2xl aurora-glowing py-2 border-purple-500/50" : "shadow-xl py-3 border-purple-500/30"
          } ${isPinned ? "ring-4 ring-purple-500/40 magical-pulsing" : ""} ${
            animateSticky ? "holographic-effect" : ""
          }`}>

            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between">
                
                {/* Enhanced Logo Section */}
                <div className="flex items-center space-x-4 group cursor-pointer magnetic-hover" onClick={() => handleNavClick('#about')}>
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-2xl enhanced-floating group-hover:scale-110 transition-all duration-500">
                      <span className="relative z-10 premium-text-gradient">PK</span>
                      
                      {/* Enhanced decorative elements */}
                      <div className="absolute inset-0 opacity-40 pointer-events-none">
                        <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-white/90 magical-pulsing"></div>
                        <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-white/70 magical-pulsing" style={{ animationDelay: '1.5s' }}></div>
                        <div className="absolute top-1 right-1 w-0.5 h-0.5 rounded-full bg-cyan-300/80 orbiting-dot"></div>
                      </div>
                      
                      {/* Enhanced glow effect */}
                      <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-purple-600/30 via-blue-500/30 to-cyan-500/30 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-lg aurora-glowing"></div>
                      
                      {/* Shimmer overlay */}
                      <div className="absolute inset-0 rounded-2xl crystal-shimmer-bg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    
                    {/* Enhanced status indicator */}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-3 border-white dark:border-gray-900 luxury-bounce-in shadow-lg">
                      <div className="w-full h-full bg-green-400 rounded-full animate-ping opacity-75"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-green-300 to-green-500 rounded-full"></div>
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <div className="text-xl font-bold premium-text-gradient mb-1">Praveen Kumar</div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <Star className="w-3 h-3 fill-current text-yellow-400 enhanced-floating" />
                      <span className="font-medium">Full Stack Developer</span>
                      <div className="w-1 h-1 bg-green-400 rounded-full magical-pulsing"></div>
                      <span className="text-green-500 font-semibold">Available</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Desktop Navigation */}
                <div className="hidden lg:flex flex-1 justify-center max-w-3xl mx-6">
                  <nav
                    ref={navRef}
                    className={`relative glass-effect rounded-3xl border-2 border-purple-500/40 shadow-2xl px-3 py-2 flex items-center space-x-1 overflow-x-auto hide-scrollbar aurora-glowing`}
                  >
                    {/* Enhanced active indicator */}
                    <div
                      className="absolute h-9 bg-gradient-to-r from-purple-600/40 via-blue-500/40 to-cyan-500/40 rounded-2xl transition-all duration-700 ease-out blur-sm"
                      style={{
                        left: activeSection ? `${highlightLeft}px` : "0",
                        width: activeSection ? `${highlightWidth}px` : "0",
                        opacity: activeSection ? "1" : "0",
                      }}
                    />

                    {navLinks.map((link, index) => {
                      const Icon = link.icon;
                      const isActive = activeSection === link.href;

                      return (
                        <button
                          key={link.href}
                          onClick={() => handleNavClick(link.href)}
                          onMouseEnter={() => setHoveredSection(link.href)}
                          onMouseLeave={() => setHoveredSection(null)}
                          className={`relative px-4 py-2 rounded-2xl flex items-center space-x-2 transition-all duration-500 nav-pill group z-10 magnetic-hover ${
                            isActive 
                              ? `text-white bg-gradient-to-r ${link.color} shadow-xl transform scale-110 aurora-glowing` 
                              : `hover:text-purple-400 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20 hover:scale-105 ${
                                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                }`
                          }`}
                        >
                          <Icon className={`w-4 h-4 nav-icon transition-all duration-500 ${
                            isActive ? "text-white drop-shadow-lg" : 
                            hoveredSection === link.href ? "text-purple-400" :
                            theme === 'dark' ? "text-gray-400" : "text-gray-500"
                          }`} />
                          <span className="text-sm font-semibold">{link.label}</span>

                          {isActive && (
                            <div className="w-1.5 h-1.5 bg-white rounded-full magical-pulsing drop-shadow-lg"></div>
                          )}

                          {/* Enhanced hover tooltip */}
                          {hoveredSection === link.href && !isActive && (
                            <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-3 px-3 py-2 rounded-xl glass-effect border-2 ${
                              theme === 'dark' ? 'border-purple-500/30 text-white' : 'border-purple-500/40 text-gray-900'
                            } shadow-2xl text-sm whitespace-nowrap luxury-bounce-in z-50`}>
                              <div className="flex items-center space-x-2">
                                <Icon className="w-3 h-3 text-purple-400" />
                                <span className="font-semibold">{link.label}</span>
                              </div>
                              
                              {/* Enhanced tooltip arrow */}
                              <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-3 h-3 rotate-45 ${
                                theme === 'dark' ? 'bg-gray-900/90' : 'bg-white/90'
                              } border-l border-t border-purple-500/30`}></div>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Enhanced Control Buttons */}
                <div className="flex items-center space-x-3">
                  
                  {/* Enhanced status panel */}
                  <div className={`hidden md:flex items-center space-x-2 px-4 py-2 rounded-2xl glass-effect border-2 ${
                    theme === 'dark' ? 'border-purple-500/30' : 'border-purple-500/40'
                  } shadow-xl aurora-glowing`}>
                    <div className="w-2 h-2 bg-green-400 rounded-full magical-pulsing"></div>
                    <span className={`text-sm font-semibold premium-text-gradient`}>
                      {getActiveSectionTitle()}
                    </span>
                    <span className="text-sm font-bold text-purple-500">
                      {Math.round(scrollProgress)}%
                    </span>
                  </div>

                  {/* Enhanced pin button */}
                  <div className="relative group">
                    <Button
                      variant={isPinned ? "default" : "outline"}
                      size="icon"
                      onClick={togglePin}
                      className={`w-10 h-10 rounded-2xl border-2 transition-all duration-500 magnetic-hover ${
                        isPinned 
                          ? "bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 text-white shadow-2xl scale-110 aurora-glowing" 
                          : `glass-effect ${
                              theme === 'dark' 
                                ? 'text-gray-300 hover:text-purple-400 border-purple-500/40' 
                                : 'text-gray-600 hover:text-purple-600 border-purple-500/50'
                            }`
                      }`}
                    >
                      <Pin className={`w-4 h-4 transition-transform duration-500 ${
                        isPinned ? "rotate-45 fill-current drop-shadow-lg" : "group-hover:rotate-12"
                      }`} />
                      
                      {/* Enhanced glow effect */}
                      {isPinned && (
                        <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-purple-500/30 to-cyan-500/30 blur-lg opacity-75"></div>
                      )}
                    </Button>
                  </div>

                  {/* Enhanced theme toggle */}
                  {mounted && (
                    <div className="relative group">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={setTheme}
                        className={`w-10 h-10 rounded-2xl border-2 transition-all duration-700 glass-effect magnetic-hover ${
                          theme === "dark" 
                            ? "bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-slate-500/50 hover:border-yellow-400/50" 
                            : "bg-gradient-to-br from-amber-50/80 to-yellow-100/80 border-yellow-300/50 hover:border-slate-500/50"
                        }`}
                      >
                        {theme === "dark" ? (
                          <Sun className="w-4 h-4 text-yellow-400 relative z-10 group-hover:rotate-180 transition-transform duration-700 enhanced-floating drop-shadow-lg" />
                        ) : (
                          <Moon className="w-4 h-4 text-slate-700 relative z-10 group-hover:-rotate-12 transition-transform duration-500 enhanced-floating drop-shadow-lg" />
                        )}
                        
                        {/* Theme-specific glow */}
                        <div className={`absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-75 transition-all duration-500 blur-lg ${
                          theme === "dark" ? "bg-yellow-400/20" : "bg-slate-500/20"
                        }`}></div>
                      </Button>
                    </div>
                  )}

                  {/* Enhanced mobile menu toggle */}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleMenu}
                    className={`lg:hidden w-10 h-10 rounded-2xl border-2 transition-all duration-500 glass-effect magnetic-hover ${
                      theme === 'dark' 
                        ? 'text-gray-300 hover:text-purple-400 border-purple-500/40' 
                        : 'text-gray-600 hover:text-purple-600 border-purple-500/50'
                    }`}
                  >
                    {isMenuOpen ? (
                      <X className="w-5 h-5 transition-transform duration-500 rotate-90 text-red-400 drop-shadow-lg" />
                    ) : (
                      <Menu className="w-5 h-5 transition-transform duration-500 drop-shadow-lg" />
                    )}
                  </Button>
                </div>

                {/* Enhanced Mobile Menu */}
                <div
                  ref={mobileNavRef}
                  className={`lg:hidden transition-all duration-700 overflow-hidden ${
                    isMenuOpen ? "max-h-[600px] opacity-100 mt-4" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="glass-effect rounded-2xl border-2 border-purple-500/40 shadow-2xl p-4 aurora-glowing">
                    
                    {/* Enhanced mobile status */}
                    <div className="mb-4 p-4 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-xl border border-purple-500/30 luxury-bounce-in">
                      <div className="flex justify-between items-center mb-3">
                        <span className={`text-sm font-semibold premium-text-gradient`}>
                          {getActiveSectionTitle()}
                        </span>
                        <span className="text-sm font-bold text-purple-500 drop-shadow-lg">
                          {Math.round(scrollProgress)}%
                        </span>
                      </div>
                      
                      <div className={`w-full h-2 ${
                        theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-200/50'
                      } rounded-full overflow-hidden shadow-inner`}>
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full transition-all duration-700 relative shadow-lg"
                          style={{ width: `${scrollProgress}%` }}
                        >
                          <div className="h-full crystal-shimmer-bg rounded-full"></div>
                          <div className="absolute top-0 right-0 w-4 h-full bg-gradient-to-l from-white/50 to-transparent rounded-r-full"></div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced mobile navigation */}
                    <nav className="space-y-2 mb-4">
                      {navLinks.map((link, index) => {
                        const Icon = link.icon;
                        const isActive = activeSection === link.href;

                        return (
                          <button
                            key={link.href}
                            onClick={() => handleNavClick(link.href)}
                            className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-500 relative overflow-hidden magnetic-hover ${
                              isActive 
                                ? `bg-gradient-to-r ${link.color} text-white shadow-2xl transform scale-105 aurora-glowing` 
                                : `glass-effect border border-purple-500/20 ${
                                    theme === 'dark' 
                                      ? 'text-gray-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20' 
                                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-purple-100/50 hover:to-blue-100/50'
                                  }`
                            }`}
                          >
                            <div className="flex items-center space-x-4">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                                isActive 
                                  ? "bg-white/20 text-white shadow-lg" 
                                  : "bg-gradient-to-br from-purple-600/10 to-blue-600/10 text-purple-400"
                              }`}>
                                <Icon className="w-5 h-5 enhanced-floating drop-shadow-lg" />
                              </div>
                              <div className="text-left">
                                <div className="font-semibold text-sm">{link.label}</div>
                                <div className={`text-xs opacity-75 ${
                                  isActive ? "text-white/80" : "text-gray-500"
                                }`}>
                                  Section {index + 1}
                                </div>
                              </div>
                            </div>

                            {isActive && (
                              <div className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold shadow-lg luxury-bounce-in">
                                ACTIVE
                              </div>
                            )}

                            {/* Enhanced shimmer effect */}
                            {isActive && (
                              <div className="absolute inset-0 crystal-shimmer-bg rounded-xl"></div>
                            )}
                          </button>
                        );
                      })}
                    </nav>

                    {/* Enhanced mobile controls */}
                    <div className={`border-t-2 ${
                      theme === 'dark' ? 'border-gray-600/30' : 'border-gray-300/30'
                    } pt-4 space-y-3`}>
                      
                      <Button 
                        variant={isPinned ? "default" : "ghost"} 
                        onClick={togglePin} 
                        className={`w-full justify-between rounded-xl py-4 text-sm transition-all duration-500 magnetic-hover ${
                          isPinned 
                            ? "bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 text-white shadow-2xl aurora-glowing" 
                            : `glass-effect border-2 border-purple-500/30 ${
                                theme === 'dark' 
                                  ? 'text-gray-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20' 
                                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-purple-100/50 hover:to-blue-100/50'
                              }`
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Pin className={`w-5 h-5 transition-transform duration-500 ${
                            isPinned ? "fill-current rotate-45 text-white drop-shadow-lg" : "text-purple-400"
                          }`} />
                          <span className="font-semibold">{isPinned ? "Header Pinned" : "Pin Header"}</span>
                        </div>
                        <span className="text-xs font-bold opacity-75">{isPinned ? "ON" : "OFF"}</span>
                      </Button>

                      {mounted && (
                        <Button 
                          variant="ghost" 
                          onClick={setTheme} 
                          className={`w-full justify-between rounded-xl py-4 text-sm border-2 transition-all duration-700 magnetic-hover ${
                            theme === "dark" 
                              ? "glass-effect border-slate-500/30 text-yellow-400 hover:bg-gradient-to-r hover:from-yellow-400/10 hover:to-amber-400/10" 
                              : "glass-effect border-yellow-300/30 text-slate-800 hover:bg-gradient-to-r hover:from-slate-100/50 hover:to-gray-100/50"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            {theme === "dark" ? (
                              <Sun className="w-5 h-5 enhanced-floating drop-shadow-lg" />
                            ) : (
                              <Moon className="w-5 h-5 enhanced-floating drop-shadow-lg" />
                            )}
                            <span className="font-semibold">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                          </div>
                          <span className="text-xs font-bold opacity-75">{theme === "dark" ? "DARK" : "LIGHT"}</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Floating Navigation Orbs */}
      <div className={`fixed z-30 left-1/2 transform -translate-x-1/2 transition-all duration-700 ${
        headerVisible ? "top-24" : "top-6"
      } hidden lg:block`}>
        <div className={`flex items-center space-x-4 px-6 py-3 rounded-3xl glass-effect border-2 ${
          theme === 'dark' ? 'border-purple-500/40' : 'border-purple-500/50'
        } shadow-2xl aurora-glowing`}>
          
          {/* Enhanced progress section */}
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-400 rounded-full magical-pulsing"></div>
            <span className={`text-sm font-bold premium-text-gradient`}>
              Navigation System
            </span>
          </div>

          {/* Enhanced navigation dots */}
          <div className="flex items-center space-x-3">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href;
              return (
                <div key={`enhanced-dot-${link.href}`} className="relative group">
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={`relative flex items-center justify-center transition-all duration-700 cursor-pointer overflow-hidden magnetic-hover ${
                      isActive 
                        ? `w-12 h-12 rounded-2xl bg-gradient-to-br ${link.color} shadow-2xl transform scale-115 aurora-glowing` 
                        : `w-9 h-9 rounded-xl glass-effect border border-purple-400/30 hover:scale-110 hover:shadow-xl hover:border-purple-400/50`
                    }`}
                    aria-label={`Go to ${link.label} section`}
                  >
                    {/* Enhanced icon */}
                    <Icon className={`transition-all duration-500 drop-shadow-lg ${
                      isActive 
                        ? "w-6 h-6 text-white enhanced-floating" 
                        : `w-4 h-4 ${theme === 'dark' ? 'text-gray-400 group-hover:text-purple-400' : 'text-gray-600 group-hover:text-purple-600'}`
                    }`} />
                    
                    {/* Enhanced active effects */}
                    {isActive && (
                      <>
                        <div className="absolute inset-0 bg-white/20 rounded-2xl magical-pulsing"></div>
                        <div className="absolute inset-0 crystal-shimmer-bg rounded-2xl"></div>
                        <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/40 via-blue-500/40 to-cyan-500/40 rounded-2xl blur-lg opacity-75"></div>
                        
                        {/* Orbiting elements */}
                        <div className="absolute -inset-4">
                          <div className="w-1 h-1 bg-white/80 rounded-full orbiting-dot"></div>
                        </div>
                      </>
                    )}
                    
                    {/* Enhanced hover glow */}
                    <div className={`absolute -inset-2 rounded-xl opacity-0 group-hover:opacity-60 transition-all duration-500 bg-gradient-to-r ${link.color} blur-md`}></div>
                  </button>
                  
                  {/* Enhanced tooltip */}
                  <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-4 px-4 py-3 rounded-xl glass-effect border-2 ${
                    theme === 'dark' 
                      ? 'border-purple-500/40 text-white' 
                      : 'border-purple-500/50 text-gray-900'
                  } shadow-2xl text-sm whitespace-nowrap opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 pointer-events-none z-50 luxury-bounce-in`}>
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon className="w-4 h-4 text-purple-400 drop-shadow-lg" />
                      <span className="font-bold text-sm">{link.label}</span>
                      <div className={`px-2 py-1 rounded-lg bg-gradient-to-r ${link.color} text-white text-xs font-bold shadow-lg`}>
                        #{index + 1}
                      </div>
                    </div>
                    <div className="text-xs opacity-75 mb-2">
                      Section {index + 1} of {navLinks.length} • Interactive Navigation
                    </div>
                    {isActive && (
                      <div className="text-green-400 text-xs font-bold flex items-center space-x-1">
                        <div className="w-1 h-1 bg-green-400 rounded-full magical-pulsing"></div>
                        <span>CURRENTLY ACTIVE</span>
                      </div>
                    )}
                    
                    {/* Enhanced tooltip arrow */}
                    <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-4 h-4 rotate-45 ${
                      theme === 'dark' ? 'bg-gray-900/90' : 'bg-white/90'
                    } border-l border-t border-purple-500/40 shadow-lg`}></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Enhanced overall progress */}
          <div className="flex items-center space-x-4 ml-3 pl-4 border-l-2 border-gradient-to-b from-purple-400/40 to-cyan-400/40">
            <div className="flex flex-col items-center">
              <span className="text-sm font-bold premium-text-gradient mb-2">
                {Math.round(scrollProgress)}%
              </span>
              <div className={`w-16 h-2 ${
                theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-200/50'
              } rounded-full overflow-hidden relative shadow-inner`}>
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 via-blue-500 via-cyan-500 to-green-500 rounded-full transition-all duration-700 relative shadow-lg"
                  style={{ width: `${scrollProgress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[rainbow-marquee_2s_linear_infinite] rounded-full"></div>
                  <div className="absolute top-0 right-0 w-4 h-full bg-gradient-to-l from-white/50 to-transparent rounded-r-full"></div>
                </div>
                
                {/* Progress indicators */}
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-around">
                  {Array.from({ length: 7 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-0.5 h-3 rounded-full transition-all duration-300 ${
                        scrollProgress > (i * 100 / 6) ? 'bg-white/80 shadow-lg' : 'bg-gray-500/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}