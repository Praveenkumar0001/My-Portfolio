"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Phone, Heart, ExternalLink, ChevronUp, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [mounted, setMounted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [heartBeat, setHeartBeat] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    if (typeof document !== "undefined") {
      const style = document.createElement("style");
      style.textContent = `
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow {
          0% { box-shadow: 0 0 5px rgba(124, 58, 237, 0.5); }
          50% { box-shadow: 0 0 20px rgba(124, 58, 237, 0.8); }
          100% { box-shadow: 0 0 5px rgba(124, 58, 237, 0.5); }
        }
        .social-icon-hover:hover {
          transform: translateY(-5px);
          transition: transform 0.3s ease;
        }
        .heart-beat {
          animation: pulse 1s ease-in-out;
        }
      `;
      document.head.appendChild(style);
      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    setVisitorCount(Math.floor(Math.random() * 5000) + 10000);
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleHeartClick = () => {
    setHeartBeat(true);
    setTimeout(() => setHeartBeat(false), 1000);
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/PraveenKumar0001",
      color: theme === "dark" ? "#ffffff" : "#333333",
      hoverColor: "#6e5494",
      tooltip: "Check out my repositories"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/in/Praveenkumar0001",
      color: theme === "dark" ? "#ffffff" : "#333333",
      hoverColor: "#0077B5",
      tooltip: "Connect with me on LinkedIn"
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:praveenkumar01.iitism@gmail.com",
      color: theme === "dark" ? "#ffffff" : "#333333",
      hoverColor: "#D44638",
      tooltip: "Send me an email"
    },
    {
      name: "Phone",
      icon: Phone,
      href: "tel:+919198352536",
      color: theme === "dark" ? "#ffffff" : "#333333",
      hoverColor: "#4CAF50",
      tooltip: "Call me"
    }
  ];

  return (
    <footer className="relative border-t py-8 md:py-12 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute top-10 right-10 w-60 h-60 rounded-full bg-purple-600/5 blur-3xl"></div>
      </div>

      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}>
        <Button
          onClick={scrollToTop}
          variant="default"
          size="icon"
          className="rounded-full shadow-lg bg-primary hover:bg-primary/90 hover:scale-110 transition-all duration-300"
          style={{ animation: showScrollTop ? "glow 2s infinite" : "none" }}
        >
          <ChevronUp className="h-5 w-5" />
          <span className="sr-only">Scroll to top</span>
        </Button>
      </div>

      <div className="container">
        <div className="flex justify-center mb-8">
          <div className="h-1 w-40 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Info */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start">
            {/* Logo and name */}
            <Link href="/" className="group flex items-center mb-4" style={{ animation: "fadeInUp 0.5s ease forwards" }}>
              <div className="relative z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-purple-600 text-white font-bold text-lg shadow-md mr-3 overflow-hidden"
                   style={{ animation: "float 3s ease-in-out infinite" }}>
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-[radial-gradient(white,_transparent_60%)] blur-sm"></div>
                  <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-white/80 translate-x-1 translate-y-1"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-white/80 -translate-x-1 -translate-y-1"></div>
                </div>
                <span className="relative z-10">PK</span>
              </div>
              <div className="font-extrabold text-2xl">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-indigo-500">Praveen</span>
                <span>Kumar</span>
                <div className="h-0.5 w-0 bg-gradient-to-r from-primary via-purple-600 to-indigo-500 group-hover:w-full transition-all duration-700"></div>
              </div>
            </Link>

            <p className="text-base mb-2 text-center md:text-left text-muted-foreground" style={{ animation: "fadeInUp 0.6s ease forwards" }}>
              Full-stack developer passionate about creating elegant, user-friendly solutions.
            </p>

            <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground" style={{ animation: "fadeInUp 0.7s ease forwards" }}>
              <Star className="h-4 w-4 text-yellow-500" />
              <span>Thanks for visiting! You're visitor #{visitorCount.toLocaleString()}</span>
            </div>

            <p className="text-sm text-center md:text-left text-muted-foreground flex items-center gap-1" style={{ animation: "fadeInUp 0.8s ease forwards" }}>
              Made with 
              <span className={`inline-block ${heartBeat ? "heart-beat" : ""}`} onClick={handleHeartClick}>
                <Heart className="h-4 w-4 text-red-500 cursor-pointer hover:scale-125 transition-transform" fill="#ef4444" />
              </span>
              in India
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start" style={{ animation: "fadeInUp 0.7s ease forwards" }}>
            <h3 className="font-semibold text-lg mb-4 relative">
              Quick Links
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
            </h3>
            <nav className="flex flex-col space-y-2">
              {["Home", "About", "Experience", "Projects", "Contact"].map((item, index) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                  style={{
                    animation: `fadeInUp ${0.4 + (index * 0.1)}s ease forwards`,
                    animationDelay: `${index * 0.05}s`
                  }}
                >
                  <div className="w-0 h-0.5 bg-primary mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></div>
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social + Newsletter */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start" style={{ animation: "fadeInUp 0.8s ease forwards" }}>
            <h3 className="font-semibold text-lg mb-4 relative">
              Get in Touch
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
            </h3>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <div key={social.name} className="relative group">
                    <Link
                      href={social.href}
                      target={social.href.startsWith("http") ? "_blank" : undefined}
                      rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      aria-label={social.name}
                      style={{
                        animation: `fadeInUp ${0.5 + (index * 0.1)}s ease forwards`,
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-primary/20 social-icon-hover group-hover:border-primary/50 relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Icon
                          className="h-5 w-5 transition-colors duration-300"
                          style={{ color: social.color }}
                          onMouseOver={(e) => { e.currentTarget.style.color = social.hoverColor }}
                          onMouseOut={(e) => { e.currentTarget.style.color = social.color }}
                        />
                        {social.href.startsWith("http") && (
                          <ExternalLink className="absolute bottom-0 right-0 h-3 w-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </Button>
                    </Link>
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-background border border-border rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
                      {social.tooltip}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="w-full p-4 rounded-xl bg-primary/5 border border-primary/10 transition-all hover:border-primary/30 hover:bg-primary/10"
              style={{ animation: "fadeInUp 0.9s ease forwards" }}>
              <h4 className="text-sm font-medium mb-2">Stay Updated</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                <Button size="sm" className="rounded-lg bg-primary hover:bg-primary/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4" style={{ animation: "fadeInUp 1s ease forwards" }}>
          <p className="text-sm text-muted-foreground">
            © {currentYear} Praveen Kumar. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
