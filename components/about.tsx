"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight, Code, Trophy, Heart, User, Briefcase, 
  Sun, Moon, Book, Globe, Award, Coffee, Sparkles
} from "lucide-react"
import { useTheme } from "next-themes"

export function About() {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [activeTab, setActiveTab] = useState("journey")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Ensure theme is only accessed client-side
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (inView) controls.start("visible")
  }, [controls, inView])

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const { clientX, clientY } = e
        const { left, top, width, height } = containerRef.current.getBoundingClientRect()
        const x = (clientX - left) / width - 0.5
        const y = (clientY - top) / height - 0.5
        setMousePosition({ x, y })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const variants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }
  
  const floatVariants = {
    initial: { y: 0 },
    float: { 
      y: [-8, 8, -8], 
      transition: { 
        repeat: Infinity, 
        duration: 4, 
        ease: "easeInOut" 
      } 
    }
  }

  const interests = [
    { name: "Web Dev", icon: <Globe size={14} />, color: "from-blue-500 to-indigo-600" },
    { name: "MERN Stack", icon: <Code size={14} />, color: "from-green-500 to-emerald-600" },
    { name: "Competitive Coding", icon: <Trophy size={14} />, color: "from-violet-500 to-purple-600" },
    { name: "DSA", icon: <Code size={14} />, color: "from-amber-500 to-yellow-600" },
    { name: "Chess", icon: <Award size={14} />, color: "from-rose-500 to-red-600" },
    { name: "Football", icon: <Award size={14} />, color: "from-blue-500 to-sky-600" },
    { name: "Startups", icon: <Sparkles size={14} />, color: "from-fuchsia-500 to-pink-600" },
    { name: "Node.js", icon: <Code size={14} />, color: "from-green-500 to-teal-600" },
    { name: "React", icon: <Code size={14} />, color: "from-cyan-500 to-blue-600" },
    { name: "MongoDB", icon: <Code size={14} />, color: "from-green-500 to-lime-600" }
  ]

  const skillCategories = [
    {
      title: "Frontend",
      icon: <Code className="text-pink-500 dark:text-pink-400" size={20} />,
      skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
      color: "from-pink-500/20 to-rose-500/20 dark:from-pink-500/40 dark:to-rose-500/40",
      border: "border-pink-500/20 dark:border-pink-500/30"
    },
    {
      title: "Backend",
      icon: <Code className="text-blue-500 dark:text-blue-400" size={20} />,
      skills: ["Node.js", "Express", "MongoDB", "REST APIs"],
      color: "from-blue-500/20 to-indigo-500/20 dark:from-blue-500/40 dark:to-indigo-500/40",
      border: "border-blue-500/20 dark:border-blue-500/30"
    },
    {
      title: "Algorithms",
      icon: <Trophy className="text-amber-500 dark:text-amber-400" size={20} />,
      skills: ["Data Structures", "Problem Solving", "Competitive Programming"],
      color: "from-amber-500/20 to-yellow-500/20 dark:from-amber-500/40 dark:to-yellow-500/40",
      border: "border-amber-500/20 dark:border-amber-500/30"
    },
    {
      title: "Tools",
      icon: <Briefcase className="text-purple-500 dark:text-purple-400" size={20} />,
      skills: ["Git", "VS Code", "Docker", "Figma"],
      color: "from-purple-500/20 to-violet-500/20 dark:from-purple-500/40 dark:to-violet-500/40",
      border: "border-purple-500/20 dark:border-purple-500/30"
    }
  ]

  const hobbies = [
    { name: "Chess", icon: <Award size={14} className="text-amber-500" /> },
    { name: "Football", icon: <Heart size={14} className="text-emerald-500" /> },
    { name: "Startups", icon: <Sparkles size={14} className="text-purple-500" /> },
    { name: "Reading", icon: <Book size={14} className="text-blue-500" /> },
    { name: "Teaching", icon: <User size={14} className="text-pink-500" /> },
    { name: "Coffee", icon: <Coffee size={14} className="text-amber-700" /> }
  ]

  const tabContent = {
    journey: (
      <div className="space-y-4">
        <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
          I'm <span className="font-bold text-indigo-600 dark:text-pink-400">Praveen Kumar</span>, a passionate developer from <span className="font-semibold text-indigo-600 dark:text-pink-400">IIT(ISM) Dhanbad</span>, pursuing B.Tech in Mineral and Metallurgical Engineering. With an undying love for development and problem-solving, I've built scalable MERN stack applications that support thousands of users.
        </p>
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 p-4 rounded-xl border border-indigo-500/20 dark:border-indigo-500/30 flex-1"
          >
            <h4 className="text-md font-semibold flex items-center text-indigo-700 dark:text-indigo-400 mb-2">
              <Trophy size={18} className="mr-2" /> Competitive Edge
            </h4>
            <p className="text-gray-700 dark:text-slate-300 text-sm">
              Active participant in competitive programming contests, having solved over <span className="font-semibold text-indigo-600 dark:text-pink-400">750+ problems</span> across Codeforces, Codechef, and LeetCode.
            </p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 dark:from-pink-500/20 dark:to-rose-500/20 p-4 rounded-xl border border-pink-500/20 dark:border-pink-500/30 flex-1"
          >
            <h4 className="text-md font-semibold flex items-center text-rose-700 dark:text-rose-400 mb-2">
              <Heart size={18} className="mr-2" /> Social Impact
            </h4>
            <p className="text-gray-700 dark:text-slate-300 text-sm">
              Leading initiatives at <span className="font-semibold text-indigo-600 dark:text-pink-400">Kartavya</span>, an NGO dedicated to education and creating sustainable social impact.
            </p>
          </motion.div>
        </div>
      </div>
    ),
    skills: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`bg-gradient-to-br ${category.color} p-4 rounded-xl ${category.border} hover:shadow-lg transition-all duration-300`}
          >
            <div className="flex items-center gap-2 mb-3">
              {category.icon}
              <h4 className="font-semibold text-gray-800 dark:text-white">{category.title}</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, i) => (
                <span 
                  key={i} 
                  className="text-sm bg-white/50 dark:bg-white/10 px-3 py-1 rounded-full text-gray-700 dark:text-slate-200 border border-gray-200 dark:border-white/10"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    ),
    hobbies: (
      <div className="space-y-4">
        <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
          When I'm not coding, you can find me engaged in a strategic game of chess or watching football. I'm also passionate about exploring startup ecosystems and contributing to social causes through my work at Kartavya NGO.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {hobbies.map((hobby, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -3 }}
              className="bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-3 flex items-center gap-2 shadow-sm hover:shadow-md transition-all"
            >
              <div className="bg-gray-100 dark:bg-white/10 rounded-full p-2">
                {hobby.icon}
              </div>
              <span className="text-gray-800 dark:text-white font-medium">
                {hobby.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  }

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  // Only render theme-dependent elements after mounting
  if (!mounted) return null

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-24 bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30 dark:from-[#0c0118] dark:via-[#1b103a] dark:to-[#24183e] overflow-hidden text-gray-800 dark:text-white transition-colors duration-500"
    >
      {/* Theme Toggle Button */}
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/80 dark:bg-black/30 backdrop-blur-md border border-gray-300/30 dark:border-white/10 shadow-lg transition-transform"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <Sun size={20} className="text-yellow-400" />
        ) : (
          <Moon size={20} className="text-indigo-600" />
        )}
      </motion.button>
      
      {/* Particle Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(#4338ca10_1px,transparent_1px)] dark:bg-[radial-gradient(#a855f720_1px,transparent_1px)] [background-size:30px_30px]"></div>
      
      {/* Animated Shapes - lighter in light mode, vibrant in dark mode */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl opacity-10 dark:opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 400 + 100}px`,
              height: `${Math.random() * 400 + 100}px`,
              background: theme === 'dark' 
                ? `linear-gradient(${Math.random() * 360}deg, #4f46e5, #ec4899)`
                : `linear-gradient(${Math.random() * 360}deg, #4f46e5, #8b5cf6)`,
              transformOrigin: 'center',
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
              rotate: [0, Math.random() * 360],
              opacity: theme === 'dark' ? [0.1, 0.3, 0.1] : [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container px-4 md:px-10 mx-auto">
        {/* Animated Heading */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
          className="text-center space-y-5 mb-16"
        >
          <motion.div variants={itemVariants}>
            <motion.h2 
              className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-fuchsia-500 dark:to-pink-400 text-transparent bg-clip-text drop-shadow-sm"
              animate={{ 
                backgroundPosition: ['0% center', '100% center', '0% center'],
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              style={{ backgroundSize: '200% auto' }}
            >
              Who I Am
            </motion.h2>
            <div className="relative">
              <motion.p 
                className="text-gray-600 dark:text-slate-300 max-w-xl mx-auto md:text-lg mt-4"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Let's dive into my journey and passions
              </motion.p>
              <motion.div 
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 h-1 w-32 bg-gradient-to-r from-transparent via-indigo-500 dark:via-pink-500 to-transparent"
                animate={{ 
                  scaleX: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Grid Content */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={variants}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Image with 3D effect */}
          <motion.div
            variants={itemVariants}
            className="relative w-full max-w-md mx-auto h-96 overflow-hidden rounded-3xl perspective-1000"
          >
            {/* Glow effect - adaptive to theme */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 dark:from-pink-500/30 dark:via-indigo-500/30 dark:to-blue-500/30 blur-xl"
              animate={{ 
                opacity: [0.4, 0.7, 0.4],
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            
            {/* 3D Card */}
            <motion.div
              className="relative w-full h-full rounded-3xl overflow-hidden border border-indigo-500/30 dark:border-pink-500/40 shadow-lg dark:shadow-[0_0_40px_#ff00ff33] transition-all duration-700 transform-style-3d"
              style={{
                transform: `perspective(1000px) rotateY(${mousePosition.x * 20}deg) rotateX(${mousePosition.y * -20}deg)`,
                transformStyle: "preserve-3d",
              }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Using a placeholder image */}
              <Image
                src="/images/about.png"
                alt="About"
                width={500}
                height={500}
                className="w-full h-full object-cover rounded-3xl"
              />
              
              {/* Shine effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0"
                animate={{ 
                  left: ['-100%', '200%'],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  repeatDelay: 5,
                  ease: "easeInOut" 
                }}
              />

              {/* Multi-color border */}
              <motion.div
                className="absolute inset-0 rounded-3xl border-4 border-transparent"
                style={{
                  background: `linear-gradient(45deg, #4f46e5, #8b5cf6, #ec4899) border-box`,
                  WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 3,
                }}
              />
            </motion.div>
          </motion.div>

          {/* Text Section */}
          <motion.div
            variants={itemVariants}
            className="bg-white/90 dark:bg-white/5 backdrop-blur-xl rounded-3xl border border-gray-200/80 dark:border-white/10 p-8 shadow-xl transition-colors duration-300"
          >
            {/* Tabs */}
            <div className="flex mb-8 border-b border-gray-200 dark:border-white/10 pb-2">
              {[
                { id: "journey", label: "My Journey", icon: <User size={18} className="mr-2" /> },
                { id: "skills", label: "Skills", icon: <Code size={18} className="mr-2" /> },
                { id: "hobbies", label: "Hobbies", icon: <Heart size={18} className="mr-2" /> }
              ].map((tab) => (
                <motion.button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 rounded-t-lg transition-all ${
                    activeTab === tab.id 
                      ? "text-indigo-600 dark:text-white font-semibold border-b-2 border-indigo-500 dark:border-pink-500" 
                      : "text-gray-500 dark:text-white/70 hover:text-indigo-600 dark:hover:text-white"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.icon} {tab.label}
                </motion.button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="min-h-64"
              >
                {tabContent[activeTab]}
              </motion.div>
            </AnimatePresence>

            {/* Interests Section */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <Briefcase className="mr-2 text-indigo-600 dark:text-pink-400" size={20} />
                Interests & Skills
              </h4>
              <div className="flex flex-wrap gap-3">
                {interests.map((interest, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Badge className={`bg-gradient-to-r ${interest.color} text-white px-3 py-1 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-1`}>
                      {interest.icon} {interest.name}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-pink-500 dark:to-purple-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 font-medium"
            >
              Connect With Me <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}