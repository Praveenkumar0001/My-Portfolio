"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
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
} from "lucide-react";

// Mock Button component since we don't have access to shadcn/ui
const Button = ({ children, variant = "default", size = "default", className = "", onClick, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
  };
  
  const sizes = {
    default: "h-10 py-2 px-4",
    icon: "h-10 w-10",
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

// Mock theme hook
const useTheme = () => {
  const [theme, setTheme] = useState("light");
  return { theme, setTheme };
};

export function Header() {
  // Add CSS for hiding scrollbar but keeping functionality
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
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }
        .floating {
          animation: float 3s ease-in-out infinite;
        }
        .pulsing {
          animation: pulse 2s ease-in-out infinite;
        }
        .nav-pill:hover .nav-icon {
          transform: translateY(-3px);
          transition: transform 0.3s ease;
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  // typed state & refs
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredSection, setHoveredSection] = useState(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const navRef = useRef(null);
  const headerRef = useRef(null);
  const lastScrollY = useRef(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [mobileNavHeight, setMobileNavHeight] = useState(0);
  const mobileNavRef = useRef(null);
  const ticking = useRef(false);
  const [isPinned, setIsPinned] = useState(false);
  const [animateSticky, setAnimateSticky] = useState(false);

  const navLinks = [
    { href: "#about", label: "About", icon: Home },
    { href: "#education", label: "Education", icon: Book },
    { href: "#skills", label: "Skills", icon: Code },
    { href: "#experience", label: "Experience", icon: Briefcase },
    { href: "#projects", label: "Projects", icon: Layout },
    { href: "#achievements", label: "Achievements", icon: Award },
    { href: "#contact", label: "Contact", icon: Mail },
  ];

  // Memoized scroll handler for better performance
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        // Handle header visibility (hide on scroll down, show on scroll up)
        if (currentScrollY > 150) {
          setHeaderVisible(
            currentScrollY < lastScrollY.current ||
              currentScrollY < 300 ||
              isPinned
          );
        } else {
          setHeaderVisible(true);
        }

        // Check if we've scrolled enough to add the compact style
        if (currentScrollY > 10 && !scrolled) {
          setScrolled(true);
          // Trigger sticky animation
          setAnimateSticky(true);
          setTimeout(() => setAnimateSticky(false), 1000);
        } else if (currentScrollY <= 10 && scrolled) {
          setScrolled(false);
        }

        lastScrollY.current = currentScrollY;

        // Calculate scroll progress percentage
        const totalHeight =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        const progress = totalHeight > 0 ? (currentScrollY / totalHeight) * 100 : 0;
        setScrollProgress(progress);

        // Detect active section for highlighting in nav
        const sections = document.querySelectorAll("section[id]");
        const scrollPosition = currentScrollY + 100;

        let foundActive = false;

        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute("id");

          if (!sectionId) return;

          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            foundActive = true;
            const newActiveSection = `#${sectionId}`;

            if (activeSection !== newActiveSection) {
              setActiveSection(newActiveSection);

              // Update horizontal scroll position in nav to keep active item visible
              if (navRef.current) {
                const navItem = document.querySelector(
                  `a[href="#${sectionId}"]`
                );
                if (navItem) {
                  const navRect = navRef.current.getBoundingClientRect();
                  const itemRect = navItem.getBoundingClientRect();

                  // If item is out of view, scroll it into view
                  if (itemRect.left < navRect.left || itemRect.right > navRect.right) {
                    navRef.current.scrollTo({
                      left:
                        navItem.offsetLeft - navRect.width / 2 + itemRect.width / 2,
                      behavior: "smooth",
                    });
                  }
                }
              }
            }
          }
        });

        // If we're below all sections, set the last section as active
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
    setMounted(true);

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call to set initial states

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Add keyframes for sticky animation
  useEffect(() => {
    if (typeof document !== "undefined") {
      const existingStyle = document.getElementById("sticky-animation-style");

      if (!existingStyle) {
        const style = document.createElement("style");
        style.id = "sticky-animation-style";
        style.textContent = `
          @keyframes stickyReveal {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(0); }
          }
          @keyframes stickyGlow {
            0% { box-shadow: 0 0 0 rgba(124, 58, 237, 0); }
            50% { box-shadow: 0 5px 15px rgba(124, 58, 237, 0.3); }
            100% { box-shadow: 0 2px 10px rgba(124, 58, 237, 0.1); }
          }
          .sticky-reveal {
            animation: stickyReveal 0.5s ease forwards, stickyGlow 2s ease;
          }
        `;
        document.head.appendChild(style);
      }
    }
  }, []);

  // Handle mobile menu height
  useEffect(() => {
    if (isMenuOpen && mobileNavRef.current) {
      setMobileNavHeight(mobileNavRef.current.scrollHeight);
    } else {
      setMobileNavHeight(0);
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((v) => !v);
  };

  const togglePin = () => {
    setIsPinned((v) => !v);
  };

  const handleNavClick = (href) => {
    setIsMenuOpen(false);
    setActiveSection(href);

    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.offsetTop;
      window.scrollTo({
        top: offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  // Calculate active section percentage (how far through current section)
  const getActiveSectionProgress = useCallback(() => {
    if (!activeSection) return 0;

    const currentSection = document.querySelector(activeSection);
    if (!currentSection) return 0;

    const sectionTop = currentSection.offsetTop;
    const sectionHeight = currentSection.offsetHeight;
    const currentPosition = window.scrollY + 100;
    const sectionProgress = ((currentPosition - sectionTop) / sectionHeight) * 100;

    return Math.min(Math.max(sectionProgress, 0), 100);
  }, [activeSection]);

  const activeSectionProgress = getActiveSectionProgress();

  // Get active section title for mobile animation
  const getActiveSectionTitle = () => {
    if (!activeSection) return "";
    const activeLink = navLinks.find((link) => link.href === activeSection);
    return activeLink ? activeLink.label : "";
  };

  // compute highlight position & width safely (so we don't access possibly-null types inline in JSX)
  const highlightLeft = (() => {
    if (!activeSection) return 0;
    const item = document.querySelector(`a[href="${activeSection}"]`);
    return item ? item.offsetLeft - 4 : 0;
  })();

  const highlightWidth = (() => {
    if (!activeSection) return 0;
    const item = document.querySelector(`a[href="${activeSection}"]`);
    return item ? item.offsetWidth + 8 : 0;
  })();

  return (
    <header
      ref={headerRef}
      className={`sticky z-50 transition-all duration-500 mx-4 rounded-b-3xl ${
        headerVisible ? "top-0" : "-top-20"
      } ${
        scrolled
          ? "bg-gradient-to-r from-gray-900/95 via-gray-900/98 to-gray-900/95 border-b shadow-lg py-2"
          : "bg-gray-900/50 backdrop-blur-md py-4"
      } ${animateSticky ? "sticky-reveal" : ""} ${isPinned ? "shadow-lg border-purple-500/30" : ""}`}
    >
      {/* Scroll Progress Indicator - linear gradient that smoothly transitions colors */}
      <div
        className="absolute bottom-0 left-4 right-4 h-1 bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-500 rounded-full"
        style={{ width: `calc(${scrollProgress}% - 2rem)`, left: "1rem" }}
      ></div>

      {/* Glow effect for scroll progress */}
      <div
        className="absolute bottom-0 left-4 right-4 h-2 bg-gradient-to-r from-purple-500/50 via-purple-600/50 to-indigo-500/50 blur-sm rounded-full"
        style={{
          width: `calc(${scrollProgress}% - 2rem)`,
          left: "1rem",
          opacity: scrolled ? 0.6 : 0.3,
        }}
      ></div>

      {/* Semi-transparent overlay when pinned for emphasis */}
      {isPinned && <div className="absolute inset-0 bg-purple-500/5 pointer-events-none rounded-b-3xl"></div>}

      <div className="container flex items-center justify-between px-6">
        {/* Logo with animation - stays on the left */}
        <Link href="/" className="group flex items-center space-x-3 relative z-10" aria-label="Home - Praveen Kumar">
          {/* Avatar Circle with Particle Background */}
          <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-purple-600 text-white font-bold text-lg shadow-lg overflow-hidden floating">
            {/* Particle background effect */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(white,_transparent_60%)] blur-sm"></div>
              <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-white/80 translate-x-1 translate-y-1"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-white/80 -translate-x-1 -translate-y-1"></div>
            </div>

            {/* Monogram */}
            <span className="relative z-10">PK</span>

            {/* Glow effect */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-br from-purple-600 to-purple-600 opacity-30 blur-md group-hover:opacity-70 transition-opacity duration-700 pulsing"></span>
          </div>

          {/* Name Text - Hidden on smaller screens to save space */}
          <div className="overflow-hidden hidden lg:block">
            <div className="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-purple-600 via-purple-600 to-indigo-500">
              <div className="flex flex-wrap items-center">
                {"Praveen Kumar".split("").map((letter, index) => (
                  <span
                    key={index}
                    className={`inline-block transition-transform duration-200 hover:scale-110 ${letter === " " ? "w-2" : ""} text-white`}
                    style={{ animationDelay: `${index * 40}ms` }}
                  >
                    {letter}
                  </span>
                ))}
              </div>

              {/* Animated underline */}
              <div className="mt-1 h-0.5 w-0 bg-gradient-to-r from-purple-600 via-purple-600 to-indigo-500 group-hover:w-full transition-all duration-700 ease-out"></div>
            </div>
          </div>
        </Link>

        {/* Desktop navigation - moved to right side */}
        <nav className="hidden md:flex gap-2 items-center">
          {/* Current active section indicator (tablet and above) */}
          <div className="hidden sm:flex items-center text-sm font-medium text-purple-400/80 mr-4">
            <span className="font-bold text-purple-400">{getActiveSectionTitle()}</span>
          </div>

          {/* Main Navigation Pills */}
          <div
            ref={navRef}
            className="relative bg-gray-900/80 backdrop-blur-md rounded-full border border-purple-500/10 shadow-lg px-2 py-1 flex items-center overflow-x-auto hide-scrollbar"
          >
            {/* Running highlight effect that shows the active section */}
            <div
              className="absolute h-8 bg-gradient-to-r from-purple-600/20 to-purple-600/20 rounded-full transition-all duration-300"
              style={{
                left: activeSection ? `${highlightLeft}px` : "0",
                width: activeSection ? `${highlightWidth}px` : "0",
                opacity: activeSection ? "1" : "0",
              }}
            ></div>

            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href;

              return (
                <div key={link.href} className="relative flex-shrink-0 z-10">
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    onMouseEnter={() => setHoveredSection(link.href)}
                    onMouseLeave={() => setHoveredSection(null)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-300 flex items-center gap-2 nav-pill group ${
                      isActive ? "text-white bg-gradient-to-r from-purple-600 to-purple-600 shadow-md" : "hover:text-purple-400 hover:bg-purple-600/5 text-gray-300"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon className={`h-4 w-4 transition-transform duration-300 nav-icon ${isActive ? "text-white" : "text-gray-400"}`} />
                    <span>{link.label}</span>

                    {/* Progress indicator */}
                    {isActive && (
                      <span className="flex items-center">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
                        <span className="text-xs ml-1 opacity-90">{Math.round(activeSectionProgress)}%</span>
                      </span>
                    )}

                    {/* Hover effect */}
                    <span className={`absolute inset-0 rounded-full bg-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? "hidden" : ""}`}></span>
                  </Link>

                  {/* Tooltip on hover */}
                  {hoveredSection === link.href && !isActive && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 rounded-md bg-gray-900/90 backdrop-blur-sm border border-purple-500/10 shadow-lg text-xs whitespace-nowrap text-white">
                      Go to {link.label}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Control buttons group - after navigation */}
          <div className="flex items-center gap-2 ml-4">
            {/* Pin Button */}
            <div className="relative group">
              <Button
                variant="outline"
                size="icon"
                onClick={togglePin}
                aria-label={isPinned ? "Unpin header" : "Pin header"}
                aria-pressed={isPinned}
                className={`rounded-full border overflow-hidden ${isPinned ? "bg-purple-600 text-white shadow-lg" : "bg-gray-900 text-gray-300 hover:bg-purple-600/10 border-purple-500/20"}`}
              >
                <Pin className={`h-4 w-4 ${isPinned ? "fill-current" : ""}`} />
                <span className={`absolute -inset-1 rounded-full opacity-0 blur group-hover:opacity-30 transition-all duration-300 ${isPinned ? "bg-purple-600" : "bg-purple-600/30"}`}></span>
              </Button>

              <div className="absolute top-full right-0 mt-2 px-2 py-1 rounded-md bg-gray-900/90 backdrop-blur-sm border border-purple-500/10 shadow-lg text-xs whitespace-nowrap opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 text-white">
                {isPinned ? "Unpin header" : "Pin header to top"}
              </div>
            </div>

            {/* Theme Toggle Button */}
            {mounted && (
              <div className="relative group">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                  className={`rounded-full shadow-lg border overflow-hidden ${
                    theme === "dark" ? "bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700" : "bg-gradient-to-br from-amber-50 to-yellow-100 border-yellow-200"
                  }`}
                >
                  {theme === "dark" ? (
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(white,_transparent_60%)] opacity-10"></div>
                      <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-white/70"></div>
                      <div className="absolute top-2 left-2 w-0.5 h-0.5 rounded-full bg-white/60"></div>
                      <div className="absolute bottom-1 left-2 w-0.5 h-0.5 rounded-full bg-white/60"></div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-yellow-300 opacity-40"></div>
                    </div>
                  )}

                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 text-yellow-400 relative z-10 group-hover:rotate-45 transition-transform duration-500" />
                  ) : (
                    <Moon className="h-5 w-5 text-slate-700 relative z-10 group-hover:-rotate-45 transition-transform duration-500" />
                  )}

                  <span className={`absolute -inset-1 rounded-full opacity-0 blur group-hover:opacity-60 transition-all duration-300 ${theme === "dark" ? "bg-yellow-400/30" : "bg-slate-700/20"}`}></span>
                </Button>

                <div className="absolute top-full right-0 mt-2 px-2 py-1 rounded-md bg-gray-900/90 backdrop-blur-sm border border-purple-500/10 shadow-lg text-xs whitespace-nowrap opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 text-white">
                  Switch to {theme === "dark" ? "light" : "dark"} mode
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Section indicators with active animation - moved to bottom right */}
        <div className="hidden lg:flex absolute -bottom-1 right-6 gap-1 opacity-70">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <div
                key={`dot-${link.href}`}
                className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${isActive ? "bg-gradient-to-r from-purple-600 to-purple-600 w-6" : "bg-gray-400/30 hover:bg-gray-400/50 w-2"}`}
                onClick={() => handleNavClick(link.href)}
                aria-label={`Go to ${link.label} section`}
              ></div>
            );
          })}
        </div>

        {/* Mobile controls: Pin + Menu button - stays on the right */}
        <div className="md:hidden flex items-center gap-2">
          {/* Mobile Pin Button */}
          <Button
            variant={isPinned ? "default" : "ghost"}
            size="icon"
            onClick={togglePin}
            className={`relative overflow-hidden rounded-full border ${isPinned ? "bg-purple-600 text-white" : "border-purple-500/20 text-gray-300"} shadow-md`}
            aria-pressed={isPinned}
            aria-label={isPinned ? "Unpin header" : "Pin header"}
          >
            <div className={`absolute inset-0 bg-gradient-to-r from-purple-600/10 to-purple-600/10 opacity-0 ${!isPinned ? "group-hover:opacity-100" : ""} transition-opacity duration-300`}></div>
            <Pin className={`h-5 w-5 ${isPinned ? "fill-current text-white" : "text-purple-400"}`} />
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="relative overflow-hidden rounded-full border border-purple-500/20 shadow-md group"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {isMenuOpen ? <X className="h-6 w-6 text-purple-400 group-hover:scale-110 transition-transform" /> : <Menu className="h-6 w-6 text-purple-400 group-hover:scale-110 transition-transform" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        {/* Mobile navigation */}
        <div
          id="mobile-menu"
          ref={mobileNavRef}
          className={`absolute top-full left-4 right-4 md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-gray-900/95 backdrop-blur-lg border-b border-purple-500/10 shadow-2xl z-50 rounded-b-2xl ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          style={{ maxHeight: isMenuOpen ? `${mobileNavHeight}px` : "0px" }}
          aria-hidden={!isMenuOpen}
        >
          <div className="p-3">
            {/* Active section indicator for mobile */}
            <div className="bg-purple-600/5 rounded-xl p-3 mb-3 flex items-center">
              <div className="mr-3 h-8 w-8 rounded-full bg-purple-600/10 flex items-center justify-center">
                <ChevronRight className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <div className="text-xs text-gray-400">Current section</div>
                <div className="font-bold text-purple-400">{getActiveSectionTitle()}</div>
              </div>
            </div>

            {/* Animated progress indicator for mobile */}
            <div className="mx-2 mb-3 h-1.5 bg-gray-200/20 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-600 via-purple-600 to-indigo-500 rounded-full relative" style={{ width: `${scrollProgress}%` }}>
                {/* Animated shine effect */}
                <div className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[marquee_2s_linear_infinite]"></div>
              </div>
              <div className="mt-1 text-xs text-gray-400 text-right">Overall progress: {Math.round(scrollProgress)}%</div>
            </div>

            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.href;

                // Calculate individual section progress for active section
                const sectionProgressStyle = isActive ? { width: `${activeSectionProgress}%` } : {};

                return (
                  <div key={link.href} className="relative overflow-hidden rounded-xl">
                    {/* Section progress background */}
                    {isActive && <div className="absolute inset-0 bg-purple-600/5 rounded-xl transition-all duration-300 ease-out" style={sectionProgressStyle}></div>}

                    <Link
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className={`p-3 text-sm font-medium flex items-center justify-between rounded-xl transition-all duration-300 relative ${isActive ? "bg-gradient-to-r from-purple-600/90 to-purple-600/90 text-white shadow-md" : "hover:bg-purple-600/10 text-gray-300"}`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {/* Left highlight bar */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-gradient-to-b from-purple-600 via-purple-600 to-indigo-500" style={{ height: isActive ? "100%" : "0%", opacity: isActive ? 1 : 0, transition: "all 0.5s ease" }}></div>

                      <div className="flex items-center">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 transition-all duration-300 ${isActive ? "bg-white text-purple-600 shadow-md" : "bg-purple-600/10 text-gray-300"}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="font-medium">{link.label}</span>
                      </div>

                      <div className="flex items-center">
                        {isActive && <span className="text-xs mr-2 bg-white/20 px-2 py-0.5 rounded-full">{Math.round(activeSectionProgress)}%</span>}
                        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isActive ? "rotate-180" : ""}`} />
                      </div>
                    </Link>
                  </div>
                );
              })}
            </nav>

            {/* Mobile controls section */}
            <div className="mt-3 border-t border-gray-600/50 pt-3 space-y-2">
              {/* Pin header button */}
              <Button variant={isPinned ? "default" : "ghost"} onClick={togglePin} className={`w-full justify-between gap-2 rounded-xl py-3 overflow-hidden relative ${isPinned ? "bg-purple-600 text-white" : "bg-purple-600/5 hover:bg-purple-600/10 text-gray-300"}`}>
                <span className="flex items-center relative z-10">
                  <Pin className={`h-5 w-5 mr-2 ${isPinned ? "fill-current" : ""}`} />
                  {isPinned ? "Header Pinned to Top" : "Pin Header to Top"}
                </span>

                <span className={`px-2 py-0.5 rounded-full text-xs ${isPinned ? "bg-white/20 text-white" : "bg-purple-600/10 text-purple-400"}`}>{isPinned ? "ON" : "OFF"}</span>
              </Button>

              {/* Theme toggle in mobile menu */}
              {mounted && (
                <Button variant="ghost" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className={`w-full justify-between gap-2 rounded-xl py-3 overflow-hidden relative ${theme === "dark" ? "bg-gradient-to-r from-slate-800 to-slate-900 text-yellow-400 hover:from-slate-700" : "bg-gradient-to-r from-amber-50 to-yellow-100 text-slate-800 hover:from-amber-100"}`}>
                  {/* Animated background elements */}
                  {theme === "dark" ? (
                    <div className="absolute inset-0 overflow-hidden opacity-70">
                      <div className="absolute top-1 right-2 w-1 h-1 rounded-full bg-white/70"></div>
                      <div className="absolute top-4 left-5 w-0.5 h-0.5 rounded-full bg-white/60"></div>
                      <div className="absolute bottom-2 left-10 w-0.5 h-0.5 rounded-full bg-white/60"></div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-yellow-300/40 blur-md"></div>
                    </div>
                  )}

                  <span className="flex items-center relative z-10">
                    {theme === "dark" ? <Sun className="h-5 w-5 mr-2" /> : <Moon className="h-5 w-5 mr-2" />}
                    {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                  </span>

                  <span className={`px-2 py-0.5 rounded-full text-xs ${theme === "dark" ? "bg-yellow-400/20" : "bg-slate-700/10"}`}>{theme === "dark" ? "DARK" : "LIGHT"}</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}