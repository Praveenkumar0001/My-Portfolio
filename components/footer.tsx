"use client"

import { useState, useEffect, useCallback } from "react";
import { 
  Github, Linkedin, Mail, Phone, Heart, ChevronUp, 
  Sparkles, MessageCircle, Coffee, Eye, Code, Zap, 
  Activity, Clock, MapPin, Rocket, Music, Award
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [mounted, setMounted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [heartBeat, setHeartBeat] = useState(false);
  const [visitorCount, setVisitorCount] = useState(25420);
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionCount, setSubscriptionCount] = useState(3200);
  const [currentTime, setCurrentTime] = useState("");
  const [sparkles, setSparkles] = useState([]);
  const [typingText, setTypingText] = useState("");
  const [expandedSection, setExpandedSection] = useState(null);
  const [activeVisitors] = useState(42);
  const [isPlaying, setIsPlaying] = useState(false);

  const typingTexts = ["Full-stack Developer 💻", "Problem Solver 🔧", "Code Enthusiast 🚀"];

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes float { 
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
      }
      @keyframes pulse { 
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
      @keyframes glow { 
        0%, 100% { box-shadow: 0 0 20px rgba(124, 58, 237, 0.5); }
        50% { box-shadow: 0 0 30px rgba(124, 58, 237, 0.8); }
      }
      @keyframes sparkle { 
        0% { opacity: 0; transform: scale(0) rotate(0deg); }
        50% { opacity: 1; transform: scale(1) rotate(180deg); }
        100% { opacity: 0; transform: scale(0) rotate(360deg); }
      }
      @keyframes gradient { 
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .social-hover:hover { 
        transform: translateY(-4px) scale(1.1) rotate(5deg); 
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55); 
      }
      .heart-beat { animation: pulse 0.8s ease-in-out; }
      .sparkle { animation: sparkle 1.2s ease-in-out; }
      .glass { 
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      .typing-cursor {
        animation: blink 1s infinite;
        font-weight: 100;
      }
      .typing-text {
        animation: slideInUp 0.3s ease-out;
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        letter-spacing: 0.5px;
      }
      .expand-area {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-in-out;
      }
      .expand-area.expanded { max-height: 400px; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    setMounted(true);
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);
    const scrollHandler = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", scrollHandler);
    
    return () => {
      clearInterval(timeInterval);
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  // Improved typing effect
  useEffect(() => {
    if (!mounted) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId;
    
    const typeText = () => {
      const currentFullText = typingTexts[textIndex];
      
      if (isDeleting) {
        // Deleting characters
        setTypingText(currentFullText.substring(0, charIndex - 1));
        charIndex--;
        
        if (charIndex === 0) {
          // Finished deleting, move to next text
          isDeleting = false;
          textIndex = (textIndex + 1) % typingTexts.length;
          timeoutId = setTimeout(typeText, 500); // Pause before typing next
        } else {
          timeoutId = setTimeout(typeText, 50); // Faster deletion
        }
      } else {
        // Typing characters
        setTypingText(currentFullText.substring(0, charIndex + 1));
        charIndex++;
        
        if (charIndex > currentFullText.length) {
          // Finished typing, wait then start deleting
          isDeleting = true;
          timeoutId = setTimeout(typeText, 2000); // Pause to read
        } else {
          // Continue typing with variable speed for more natural feel
          const typingSpeed = currentFullText[charIndex - 1] === ' ' ? 150 : 80 + Math.random() * 50;
          timeoutId = setTimeout(typeText, typingSpeed);
        }
      }
    };
    
    // Start typing after initial delay
    timeoutId = setTimeout(typeText, 1000);
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [mounted]);

  const updateTime = () => {
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Kolkata',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit'
    }));
  };

  const createSparkles = () => {
    const newSparkles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 1500);
  };

  const handleSubscription = async () => {
    if (!email || isSubscribing) return;

    setIsSubscribing(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setEmail("");
    setSubscriptionCount(prev => prev + 1);
    createSparkles();
    setIsSubscribing(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    createSparkles();
  };

  const handleHeartClick = () => {
    setHeartBeat(true);
    createSparkles();
    setTimeout(() => setHeartBeat(false), 800);
  };

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "#", color: "text-gray-300 hover:text-white" },
    { name: "LinkedIn", icon: Linkedin, href: "#", color: "text-blue-300 hover:text-blue-100" },
    { name: "Email", icon: Mail, href: "#", color: "text-red-300 hover:text-red-100" },
    { name: "Phone", icon: Phone, href: "#", color: "text-green-300 hover:text-green-100" }
  ];

  if (!mounted) {
    return <div className="h-32 bg-gray-900/50 animate-pulse mx-4 rounded-t-3xl"></div>;
  }

  return (
    <footer className="relative border-t py-8 overflow-hidden bg-gradient-to-t from-gray-900/80 to-transparent mx-4 rounded-t-3xl">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-r from-purple-600/20 to-purple-600/20 blur-3xl animate-pulse"></div>
        <div className="absolute top-10 -right-10 w-48 h-48 rounded-full bg-gradient-to-l from-blue-500/15 to-indigo-600/15 blur-3xl animate-pulse"></div>
        
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute sparkle"
            style={{ left: `${sparkle.x}%`, top: `${sparkle.y}%` }}
          >
            <Sparkles className="h-4 w-4 text-purple-500" />
          </div>
        ))}
      </div>

      {/* Scroll to Top Button */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        showScrollTop ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
      }`}>
        <button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full shadow-xl bg-gradient-to-r from-purple-600 to-purple-600 hover:scale-110 transition-all duration-300"
          style={{ animation: showScrollTop ? "glow 3s infinite" : "none" }}
        >
          <ChevronUp className="h-5 w-5 text-white mx-auto" />
        </button>
      </div>

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="flex items-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-purple-600 text-white font-bold text-xl mr-3"
                 style={{ animation: "float 3s ease-in-out infinite" }}>
              PK
            </div>
            <div>
              <div className="font-black text-2xl">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-500">Praveen</span>
                <span className="ml-1 text-white">Kumar</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="glass px-3 py-2 rounded-xl flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
              <Activity className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-white">{activeVisitors} online</span>
            </div>
            
            <div className="glass px-3 py-2 rounded-xl flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-mono text-white">{currentTime}</span>
            </div>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`glass p-3 rounded-xl transition-all hover:scale-110 ${
                isPlaying ? 'text-purple-400' : 'text-gray-400'
              }`}
            >
              <Music className={`h-4 w-4 ${isPlaying ? 'animate-pulse' : ''}`} />
            </button>
          </div>
        </div>

        {/* Improved Typing Effect & Stats */}
        <div className="text-center mb-8">
          <div className="text-lg text-purple-400 font-semibold min-h-[32px] mb-4 flex items-center justify-center">
            <span className="typing-text bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {typingText}
            </span>
            <span className="typing-cursor text-purple-400 ml-1">|</span>
          </div>
          
          <div className="flex justify-center gap-6 text-sm flex-wrap">
            <div className="flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
              <Eye className="h-4 w-4 text-blue-500" />
              <span className="font-bold text-white">{visitorCount.toLocaleString()}</span>
              <span className="text-gray-400">visitors</span>
            </div>
            <div className="flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
              <Code className="h-4 w-4 text-yellow-500" />
              <span className="font-bold text-white">47</span>
              <span className="text-gray-400">projects</span>
            </div>
            <div className="flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
              <Zap className="h-4 w-4 text-purple-500" />
              <span className="font-bold text-white">98%</span>
              <span className="text-gray-400">response</span>
            </div>
            <div className="flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
              <Coffee className="h-4 w-4 text-orange-500" />
              <span className="font-bold text-white">∞</span>
              <span className="text-gray-400">coffee</span>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-6">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <button
                key={social.name}
                className={`p-3 rounded-xl glass social-hover group ${social.color} transition-all duration-300`}
                onClick={createSparkles}
              >
                <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </button>
            );
          })}
        </div>

        {/* Newsletter */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setExpandedSection(expandedSection === 'subscribe' ? null : 'subscribe')}
            className="glass hover:scale-105 transition-all px-6 py-3 rounded-xl flex items-center gap-3"
          >
            <MessageCircle className="h-4 w-4 text-purple-400" />
            <span className="font-semibold text-white">Join {subscriptionCount.toLocaleString()} subscribers</span>
            <ChevronUp className={`h-4 w-4 text-white transition-transform ${expandedSection === 'subscribe' ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className={`expand-area ${expandedSection === 'subscribe' ? 'expanded' : ''} mb-6`}>
          <div className="max-w-md mx-auto p-6 rounded-2xl glass">
            <div className="text-center mb-4">
              <Rocket className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <h4 className="font-bold text-lg text-purple-400">Stay Updated</h4>
              <p className="text-sm text-gray-400">Join our growing community!</p>
            </div>
            
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.awesome@email.com"
                  className="w-full px-4 py-3 rounded-xl glass border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white placeholder-gray-400"
                />
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <button 
                onClick={handleSubscription} 
                disabled={isSubscribing}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-600 hover:scale-[1.02] transition-all font-semibold text-white"
              >
                {isSubscribing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Joining...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Join Community
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-600/30">
          <p className="text-sm text-gray-400 flex items-center gap-2">
            © {currentYear} 
            <span className="font-bold text-purple-400">Praveen Kumar</span>
            • Made with 
            <button className={`cursor-pointer ${heartBeat ? "heart-beat" : ""}`} onClick={handleHeartClick}>
              <Heart className="h-4 w-4 text-red-500 hover:scale-125 transition-transform" fill="#ef4444" />
            </button>
          </p>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">Dhanbad, India</span>
            </div>
            
            <div className="px-3 py-1 rounded-full text-xs flex items-center gap-2 bg-green-500/20 text-green-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
              Available
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;