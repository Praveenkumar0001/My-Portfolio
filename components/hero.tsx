'use client';

import { useEffect, useState, useRef, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowDown, 
  ArrowRight, 
  Download, 
  Github, 
  Linkedin, 
  Mail, 
  Phone,
  Code,
  ExternalLink,
  ChevronRight,
  Star,
  Coffee,
  Sparkles,
  Briefcase,
  Cpu,
  Calendar,
  Award,
  Clock,
  Zap,
  Globe,
  MessageCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, useAnimation, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useMotionValue } from "framer-motion"

export function Hero() {
  // State management
  const [isVisible, setIsVisible] = useState(false)
  const [typingComplete, setTypingComplete] = useState(false)
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const [showExperienceBadge, setShowExperienceBadge] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [imageLoaded, setImageLoaded] = useState(false)
  const [activeTechIndex, setActiveTechIndex] = useState(null)
  const [profileHovered, setProfileHovered] = useState(false)
  
  // Refs
  const containerRef = useRef(null)
  const profileRef = useRef(null)
  const cursorRef = useRef(null)
  const controls = useAnimation()
  
  const roles = [
    "Full-Stack Developer",
    "MERN Stack Expert",
    "Entrepreneurial Enthusiast",
    "Problem Solver",
    "Creative Coder"
  ]

  // Mouse move effects
  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event

      if (typeof window !== "undefined") {
        const { innerWidth, innerHeight } = window
        const x = clientX / innerWidth - 0.5
        const y = clientY / innerHeight - 0.5

        setMousePosition({ x, y })
        setCursorPosition({ x: clientX, y: clientY })
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`
    }
  }, [cursorPosition])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowExperienceBadge(true)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        setShowScrollIndicator(window.scrollY <= 200)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Cycle through tech stack highlights
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTechIndex(prev => {
        if (prev === null) return 0
        return (prev + 1) % techStack.length
      })
    }, 2000)
    
    return () => clearInterval(interval)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Profile image transformations with improved calculations
  const profileImageScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85])
  const profileImageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6])
  const profileImageY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const profileRotateZ = useTransform(scrollYProgress, [0, 0.3], [0, 5])
  
  // Tilt transformations with enhanced responsiveness
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const tiltX = useTransform(mouseY, (y) => y * 25)
  const tiltY = useTransform(mouseX, (x) => -x * 25)
  const glowX = useTransform(mouseX, (x) => x * 50)
  const glowY = useTransform(mouseY, (y) => y * 50)

  // Animation control initialization
  useEffect(() => {
    setIsVisible(true)
    controls.start("visible")

    const roleInterval = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length)
    }, 3000)

    return () => clearInterval(roleInterval)
  }, [controls, roles.length])

  // Typing completion effect
  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setTypingComplete(true)
      }, 1500)
    }
  }, [isVisible])

  // Enhanced typing animation
  const nameText = "Praveen Kumar"
  const [displayedName, setDisplayedName] = useState("")

  useEffect(() => {
    if (isVisible) {
      let currentIndex = 0
      const typingDelay = [...nameText].map(() => 40 + Math.random() * 120)
      
      const typeNextChar = () => {
        if (currentIndex <= nameText.length) {
          setDisplayedName(nameText.substring(0, currentIndex))
          currentIndex++
          
          const pause = currentIndex % 4 === 0 ? 180 : 0
          const delay = typingDelay[currentIndex - 1] || 50 + pause
          setTimeout(typeNextChar, delay)
        }
      }
      
      setTimeout(typeNextChar, 500)
    }
  }, [isVisible])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const socialIconVariants = {
    hidden: { scale: 0, rotate: -15 },
    visible: i => ({
      scale: 1,
      rotate: 0,
      transition: { 
        delay: 1.2 + (i * 0.1),
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }),
    hover: {
      scale: 1.2,
      rotate: 15,
      boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  }

  // Enhanced tech stack
  const techStack = [
    { name: "React", color: "bg-blue-500", icon: "⚛️", years: 2, description: "Building interactive UIs" },
    { name: "Node.js", color: "bg-green-500", icon: "🟢", years: 2, description: "Backend development" },
    { name: "MongoDB", color: "bg-emerald-500", icon: "🍃", years: 1.5, description: "NoSQL database" },
    { name: "TypeScript", color: "bg-blue-600", icon: "📘", years: 1, description: "Type-safe JavaScript" },
    { name: "Next.js", color: "bg-black", icon: "▲", years: 1.5, description: "React framework" },
    { name: "JavaScript", color: "bg-yellow-400", icon: "🟨", years: 2, description: "Core web technology" },
    { name: "C++", color: "bg-gray-700", icon: "💻", years: 2.5, description: "System programming" },
    { name: "Python", color: "bg-yellow-500", icon: "🐍", years: 2, description: "Data & automation" },
    { name: "Tailwind", color: "bg-cyan-500", icon: "🌊", years: 1.5, description: "Utility-first CSS" },
    { name: "GraphQL", color: "bg-pink-500", icon: "📊", years: 1, description: "Modern API queries" }
  ];
  
  // Deterministic particles generation to prevent hydration mismatch
  const [particles, setParticles] = useState([])
  
  useEffect(() => {
    // Generate particles only on client side to prevent hydration mismatch
    const generatedParticles = Array.from({ length: 35 }).map((_, i) => {
      // Use seed-based approach for consistent results
      const seed = i * 17 + 42; // Simple seed generation
      const pseudoRandom = (seed) => {
        let x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
      };
      
      return {
        id: i,
        x: pseudoRandom(seed) * 100,
        y: pseudoRandom(seed + 1) * 100,
        size: 1 + pseudoRandom(seed + 2) * 4,
        opacity: 0.3 + pseudoRandom(seed + 3) * 0.5,
        duration: 15 + pseudoRandom(seed + 4) * 40,
        delay: pseudoRandom(seed + 5) * 5
      };
    });
    
    setParticles(generatedParticles);
  }, [])

  // Enhanced achievements
  const achievements = [
    { 
      icon: <Star className="h-4 w-4 text-yellow-500" />, 
      text: "Top Rated", 
      description: "Consistently rated 5 stars by clients",
      animation: { rotate: [0, 15, 0], scale: [1, 1.2, 1], duration: 2 }
    },
    { 
      icon: <Coffee className="h-4 w-4 text-orange-500" />, 
      text: "24/7 Support", 
      description: "Always available for critical issues",
      animation: { y: [0, -3, 0], scale: [1, 1.1, 1], duration: 1.5 }
    },
    { 
      icon: <Briefcase className="h-4 w-4 text-blue-500" />, 
      text: "Enterprise Solutions", 
      description: "Specialized in building scalable solutions",
      animation: { x: [0, 3, 0], opacity: [0.8, 1, 0.8], duration: 2.2 }
    },
    { 
      icon: <Award className="h-4 w-4 text-purple-500" />, 
      text: "Certified", 
      description: "Certified in modern web technologies",
      animation: { scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7], duration: 1.8 }
    }
  ]

  // Project preview
  const projectsPreview = [
    { name: "E-Commerce", tech: "MERN Stack", color: "from-blue-500 to-cyan-400" },
    { name: "AI Dashboard", tech: "Next.js + TensorFlow", color: "from-purple-500 to-pink-400" },
    { name: "Social Platform", tech: "React + Firebase", color: "from-orange-500 to-amber-400" }
  ]

  // Experience calculation
  const startYear = 2022;
  const startMonth = 3;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  
  let yearsOfExperience = currentYear - startYear;
  if (currentMonth < startMonth) {
    yearsOfExperience -= 1;
  }
  const monthsExtra = (currentMonth < startMonth) ? 
    12 - (startMonth - currentMonth) : 
    currentMonth - startMonth;
  
  const experienceText = `${yearsOfExperience}+ Years${monthsExtra > 0 ? ` ${monthsExtra} Months` : ''}`;

  return (
    <section 
      ref={containerRef} 
      className="relative py-12 sm:py-16 md:py-20 lg:py-28 min-h-screen flex items-center overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Custom interactive cursor */}
      <div 
        ref={cursorRef}
        className="fixed w-6 h-6 rounded-full bg-primary/30 pointer-events-none z-50 backdrop-blur-lg border border-primary/40 hidden md:block"
        style={{ 
          transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
          mixBlendMode: "difference",
          transition: "transform 0.1s ease-out, width 0.2s, height 0.2s"
        }}
      >
        <div className="absolute -inset-1 rounded-full bg-primary/20 animate-pulse"></div>
      </div>
      
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/30 via-background to-background"></div>
        
        <div className="absolute inset-0 bg-grid-white/[0.03] -z-10">
          <motion.div 
            className="absolute inset-0"
            style={{ 
              backgroundImage: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(100, 100, 255, 0.1) 0%, rgba(0, 0, 0, 0) 45%)",
              backgroundSize: "100% 100%"
            }}
            animate={{
              '--mouse-x': `${50 + mousePosition.x * 20}%`,
              '--mouse-y': `${50 + mousePosition.y * 20}%`
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-20 left-10 w-80 h-80 rounded-full bg-gradient-to-r from-primary/10 to-blue-500/5 backdrop-blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          style={{ 
            x: useTransform(() => mousePosition.x * -30),
            y: useTransform(() => mousePosition.y * -30)
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-gradient-to-l from-primary/10 to-blue-400/5 backdrop-blur-lg"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          style={{ 
            x: useTransform(() => mousePosition.x * 40),
            y: useTransform(() => mousePosition.y * 40)
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Additional decorative elements */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-primary/5 to-blue-500/5 opacity-30 blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 60,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div 
          className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-blue-400/15 blur-2xl"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -20, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-indigo-500/10 blur-xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.3, 0.1],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", delay: 2 }}
        />
      </div>
      
      {/* Floating particles - only render when particles are loaded */}
      {particles.length > 0 && particles.map((particle, idx) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${idx % 5 === 0 ? 'bg-primary/40' : idx % 3 === 0 ? 'bg-blue-400/30' : 'bg-indigo-300/20'} blur-sm`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity
          }}
          initial={{ opacity: 0 }}
          animate={{
            x: [0, 
               idx % 4 === 0 ? (particle.x % 2 === 0 ? 60 : -60) : 
               idx % 3 === 0 ? (particle.y % 2 === 0 ? -40 : 40) : 
               (particle.x % 2 === 0 ? 50 : -50)
            ],
            y: [0, 
               idx % 5 === 0 ? (particle.y % 2 === 0 ? -60 : 60) : 
               idx % 2 === 0 ? (particle.x % 2 === 0 ? -40 : 40) : 
               (particle.y % 2 === 0 ? -50 : 50)
            ],
            opacity: [0, particle.opacity, 0],
            scale: idx % 3 === 0 ? [0, 1, 0] : undefined,
            rotate: idx % 4 === 0 ? [0, 180, 360] : undefined
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: idx % 2 === 0 ? "easeInOut" : "easeOut",
            delay: particle.delay
          }}
        />
      ))}
      
      {/* Main content container with improved margins */}
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_450px] lg:gap-16 xl:grid-cols-[1fr_550px] xl:gap-20 items-center">
          <motion.div
            className="flex flex-col justify-center space-y-6 lg:space-y-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Status indicator */}
            <motion.div 
              className="inline-flex space-x-2 items-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <motion.span 
                className="flex h-2 w-2 rounded-full bg-green-500"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                  boxShadow: [
                    "0 0 0 0 rgba(72, 187, 120, 0)",
                    "0 0 0 6px rgba(72, 187, 120, 0.3)",
                    "0 0 0 0 rgba(72, 187, 120, 0)"
                  ]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              ></motion.span>
              <motion.div 
                className="rounded-full bg-gradient-to-r from-primary/20 to-blue-500/20 backdrop-blur-md px-4 py-1.5 text-sm font-medium text-primary border border-primary/20 hover:border-primary/40 transition-all"
                whileHover={{ 
                  backgroundColor: "rgba(100, 100, 255, 0.15)",
                  scale: 1.05,
                  boxShadow: "0 5px 15px rgba(0, 0, 255, 0.1)"
                }}
              >
                <motion.span 
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  className="flex items-center gap-1"
                >
                  <Zap className="h-3 w-3" />
                  <span>Available for opportunities</span>
                </motion.span>
              </motion.div>
            </motion.div>
            
            {/* Name section */}
            <motion.div className="space-y-4" variants={itemVariants}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                Hi, I'm <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500 relative">
                    {displayedName}
                    <motion.span
                      className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-blue-500 origin-left rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: typingComplete ? 1 : 0 }}
                      transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
                    />
                  </span>
                  {!typingComplete && (
                    <motion.span 
                      className="absolute -right-1 top-0 bottom-0 w-1 bg-primary"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    ></motion.span>
                  )}
                </span>
              </h1>
              
              {/* Role animation */}
              <div className="h-12 sm:h-12 overflow-hidden perspective-[1000px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    className="flex items-center text-lg sm:text-xl md:text-2xl text-muted-foreground font-light"
                    key={currentRoleIndex}
                    initial={{ opacity: 0, y: 20, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -20, rotateX: 90 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <motion.span 
                      className="text-primary mr-2"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 1, 0.5],
                        rotateZ: [0, 5, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >&lt;</motion.span>
                    {roles[currentRoleIndex]}
                    <motion.span 
                      className="text-primary ml-2"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 1, 0.5],
                        rotateZ: [0, -5, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    >/&gt;</motion.span>
                    <motion.span
                      className="ml-2"
                      animate={{ 
                        opacity: [0, 1, 0], 
                        rotate: [0, 15, 0],
                        scale: [0.8, 1.2, 0.8]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Sparkles className="h-4 w-4 text-yellow-400" />
                    </motion.span>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Description */}
              <motion.p
                className="max-w-[600px] text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed"
                variants={itemVariants}
              >
                Passionate about building
                <motion.span
                  className="ml-1 inline-block"
                  animate={{ 
                    color: ["#4F46E5", "#3B82F6", "#4F46E5"],
                    y: [0, -2, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  modern, responsive
                </motion.span> web applications with cutting-edge technologies.
                <span className="relative inline-block ml-1">
                  <span className="relative z-10"> Specialized in creating </span>
                  <motion.span 
                    className="absolute bottom-0 left-0 right-0 h-3 bg-primary/20 -z-0 rounded-sm" 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 2, duration: 1 }}
                  />
                </span> 
                <span className="bg-gradient-to-r from-primary to-blue-500 text-transparent bg-clip-text font-medium">
                  efficient and scalable solutions
                </span> for businesses and startups.
              </motion.p>
            </motion.div>
            
            {/* Tech stack */}
            <motion.div 
              className="flex flex-wrap gap-3"
              variants={itemVariants}
            >
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className={`group flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-slate-100/80 to-slate-100/50 dark:from-slate-800/80 dark:to-slate-800/50 backdrop-blur-sm text-sm font-medium cursor-pointer hover:shadow-md transition-all border border-slate-200/50 dark:border-slate-700/50 ${activeTechIndex === index ? 'ring-2 ring-primary/50 ring-offset-1 ring-offset-transparent scale-105' : ''}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ 
                    scale: 1.08, 
                    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                    backgroundColor: "rgba(100, 100, 255, 0.1)"
                  }}
                  transition={{ delay: 1.2 + (index * 0.1) }}
                  onMouseEnter={() => setActiveTechIndex(index)}
                  onMouseLeave={() => setActiveTechIndex(null)}
                >
                  <motion.span 
                    className={`w-2 h-2 rounded-full ${tech.color} mr-2 group-hover:scale-150 transition-transform`}
                    animate={activeTechIndex === index ? {
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 1, 0.7]
                    } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  
                  <motion.span 
                    className="mr-1"
                    animate={activeTechIndex === index ? {
                      y: [0, -5, 0],
                      scale: [1, 1.2, 1]
                    } : {}}
                    transition={{ duration: 0.5, repeat: activeTechIndex === index ? Infinity : 0 }}
                  >
                    {tech.icon}
                  </motion.span>
                  
                  {tech.name}
                  
                  <motion.span 
                    className="ml-1.5 opacity-0 group-hover:opacity-100 text-xs font-normal text-muted-foreground transition-opacity duration-200"
                  >
                    {tech.years}y
                  </motion.span>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Experience and achievements */}
            <motion.div 
              className="flex flex-wrap items-center gap-4"
              variants={itemVariants}
            >
              {showExperienceBadge && (
                <motion.div 
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-slate-100/80 to-slate-100/50 dark:from-slate-800/80 dark:to-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50"
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">
                    <span className="text-primary">{experienceText}</span> Experience
                  </span>
                </motion.div>
              )}
              
              {/* Achievement badges */}
              <div className="flex flex-wrap gap-2">
                {achievements.map((achievement, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium bg-gradient-to-r from-slate-100/60 to-slate-100/30 dark:from-slate-800/60 dark:to-slate-800/30 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 cursor-pointer group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ delay: 1.5 + (i * 0.1) }}
                    title={achievement.description}
                  >
                    <motion.div
                      animate={achievement.animation}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    >
                      {achievement.icon}
                    </motion.div>
                    <span>{achievement.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Action buttons */}
            <motion.div 
              className="flex flex-col gap-4 sm:flex-row sm:gap-6"
              variants={itemVariants}
            >
              <Button 
                className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 font-medium group relative overflow-hidden"
                size="lg"
                asChild
              >
                <Link href="#contact" className="gap-2">
                  <motion.span 
                    className="absolute -inset-full top-0 h-full w-1/2 z-5 block transform -translate-x-full bg-gradient-to-r from-white/20 to-transparent opacity-30 filter blur-sm group-hover:animate-[shimmer_1.5s_infinite]"
                  />
                  Contact Me
                  <MessageCircle className="w-4 h-4" />
                </Link>
              </Button>
              
              <Button 
                className="relative bg-gradient-to-r from-background to-background hover:from-slate-50/5 hover:to-slate-900/5 border border-slate-200/10 dark:border-slate-700/30 hover:border-slate-300/30 dark:hover:border-slate-700/50 text-foreground shadow-sm hover:shadow-md shadow-slate-200/20 dark:shadow-slate-900/10 transition-all duration-300 group overflow-hidden"
                size="lg"
                asChild
                variant="outline"
              >
                <Link href="#projects" className="gap-2">
                  <motion.span 
                    className="absolute -inset-full top-0 h-full w-1/2 z-5 block transform -translate-x-full bg-gradient-to-r from-primary/10 to-transparent opacity-30 filter blur-sm group-hover:animate-[shimmer_1.5s_infinite]"
                  />
                  View Projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              {/* Download resume button */}
              <Button 
                variant="ghost" 
                size="icon"
                className="group"
                asChild
              >
                <Link href="/images/Resume_N.pdf" download>
                  <motion.div
                    whileHover={{ 
                      scale: 1.2,
                      rotate: [0, -5, 5, -5, 0],
                      transition: { duration: 0.3 }
                    }}
                    className="text-muted-foreground group-hover:text-primary transition-colors"
                  >
                    <Download className="h-5 w-5" />
                  </motion.div>
                  <span className="sr-only">Download Resume</span>
                </Link>
              </Button>
            </motion.div>
            
            {/* Social media links */}
            <motion.div 
              className="flex items-center gap-4"
              variants={itemVariants}
            >
              {[
                { icon: <Github className="h-5 w-5" />, href: "https://github.com/Praveenkumar0001", label: "GitHub" },
                { icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/in/praveen-kumar-803838261/", label: "LinkedIn" },
                { icon: <Mail className="h-5 w-5" />, href: "mailto:praveenkumar01.iitism@gmail.com", label: "Email" },
                { icon: <Globe className="h-5 w-5" />, href: "https://praveen-kumar.live/", label: "Website" }
              ].map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-slate-100/90 to-slate-100/60 dark:from-slate-800/90 dark:to-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 text-muted-foreground hover:text-primary shadow-sm hover:shadow-md transition-all duration-300"
                  custom={i}
                  variants={socialIconVariants}
                  whileHover="hover"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
            
            {/* Scroll indicator */}
            {showScrollIndicator && (
              <motion.div 
                className="hidden sm:flex items-center mt-8 text-sm text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 0.6 }}
              >
                <ArrowDown className="mr-2 h-4 w-4 animate-bounce" />
                Scroll to explore
              </motion.div>
            )}
          </motion.div>

          {/* Profile image section */}
          <motion.div 
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            ref={profileRef}
            onMouseMove={(e) => {
              if (!profileRef.current) return
              
              const { left, top, width, height } = profileRef.current.getBoundingClientRect()
              const x = (e.clientX - left) / width - 0.5
              const y = (e.clientY - top) / height - 0.5
              
              mouseX.set(x)
              mouseY.set(y)
              
              setProfileHovered(true)
            }}
            onMouseLeave={() => {
              mouseX.set(0)
              mouseY.set(0)
              setProfileHovered(false)
            }}
          >
            {/* 3D rotating card container */}
            <motion.div
              className="relative w-[280px] md:w-[350px] lg:w-[400px] aspect-[3/4] rounded-2xl shadow-2xl shadow-primary/10 overflow-hidden"
              style={{
                rotateX: tiltX,
                rotateY: tiltY,
                transformStyle: "preserve-3d",
                scale: profileImageScale,
                y: profileImageY,
                rotateZ: profileRotateZ
              }}
            >
              {/* Glossy overlay effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-white/10 dark:to-white/5 z-10 pointer-events-none"
                style={{
                  background: `linear-gradient(105deg, 
                    rgba(255,255,255,0) 0%, 
                    rgba(255,255,255,0.12) 40%, 
                    rgba(255,255,255,0.15) 50%, 
                    rgba(255,255,255,0.12) 60%, 
                    rgba(255,255,255,0) 100%)`,
                  left: `calc(${glowX.get()}px)`,
                  top: `calc(${glowY.get()}px)`,
                  transform: 'translateX(-50%) translateY(-50%)',
                  width: '150%',
                  height: '150%',
                  opacity: profileHovered ? 1 : 0.3,
                  transition: 'opacity 0.3s ease-out'
                }}
              />
              
              {/* Profile image overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-primary/30 to-blue-500/30 mix-blend-overlay opacity-40 z-0"
                style={{ 
                  transformStyle: "preserve-3d", 
                  transform: "translateZ(-20px)" 
                }}
              />
              
              <div className="absolute inset-0 overflow-hidden">
                <motion.div 
                  className="w-full h-full"
                  style={{ 
                    opacity: profileImageOpacity,
                    transformStyle: "preserve-3d", 
                    transform: "translateZ(20px)",
                    x: useTransform(mouseX, [-0.5, 0.5], [-10, 10]),
                    y: useTransform(mouseY, [-0.5, 0.5], [-10, 10]),
                  }}
                >
                  <div className="relative w-full h-full">
                    {!imageLoaded && (
                      <motion.div 
                        className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse z-10"
                        animate={{ opacity: imageLoaded ? 0 : 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                    <Image 
                      src="/images/praveen.jpg"
                      alt="Praveen Kumar"
                      fill
                      className="object-cover rounded-2xl"
                      onLoad={() => setImageLoaded(true)}
                      style={{ 
                        opacity: imageLoaded ? 1 : 0,
                        transition: "opacity 0.5s ease-in-out"
                      }}
                    />
                  </div>
                </motion.div>
              </div>
              
              {/* Border glow effect */}
              <motion.div 
                className="absolute inset-0 rounded-2xl border-2 border-white/10 z-20 pointer-events-none"
                animate={profileHovered ? { 
                  boxShadow: ["0 0 0px rgba(99, 102, 241, 0)", "0 0 15px rgba(99, 102, 241, 0.5)", "0 0 0px rgba(99, 102, 241, 0)"] 
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Project mini preview cards */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                {projectsPreview.map((project, idx) => (
                  <motion.div
                    key={project.name}
                    className={`w-16 h-16 rounded-xl overflow-hidden backdrop-blur-sm cursor-pointer relative group`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 + (idx * 0.2) }}
                    whileHover={{ scale: 1.1, y: -5 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center p-1">
                        <p className="text-xs font-bold leading-tight">{project.name}</p>
                        <p className="text-[8px] opacity-80">{project.tech}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Experience badge floating element */}
            <motion.div
              className="absolute top-4 -right-6 md:top-8 md:right-0 bg-white dark:bg-slate-800 shadow-lg rounded-full px-3 py-1 flex items-center gap-2 text-sm font-medium border border-slate-200 dark:border-slate-700 z-30"
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 300, damping: 15 }}
            >
              <Calendar className="w-4 h-4 text-primary" />
              <span>Since <span className="text-primary">2022</span></span>
            </motion.div>
            
            {/* Years experience badge */}
            <motion.div
              className="absolute -right-4 top-1/3 bg-gray-900 shadow-lg px-4 py-2 rounded-xl border border-gray-800"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
            >
              <div className="text-center">
                <span className="text-xl font-bold text-primary">3+</span>
                <p className="text-xs text-gray-400">Years Experience</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}