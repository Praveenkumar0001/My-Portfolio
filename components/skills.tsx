"use client"

import { useEffect, useState, useRef } from "react"
import { 
  Code, Database, Layout, Palette, Server, 
  Smartphone, Trophy, TrendingUp, Zap,
  Star, ChevronRight, Info, Book, ArrowRight
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"

export function Skills() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [selectedSkill, setSelectedSkill] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [activeTab, setActiveTab] = useState("Frontend Development")
  const [showTip, setShowTip] = useState(false)
  const [isHoveringOverTabs, setIsHoveringOverTabs] = useState(false)
  
  const tipTimeoutRef = useRef(null)

  useEffect(() => {
    if (inView) {
      controls.start("visible")
      // Show tip after 2 seconds
      tipTimeoutRef.current = setTimeout(() => {
        setShowTip(true)
        // Hide the tip after 4 seconds
        setTimeout(() => {
          setShowTip(false)
        }, 4000)
      }, 2000)
    }
    
    return () => {
      if (tipTimeoutRef.current) {
        clearTimeout(tipTimeoutRef.current)
      }
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const pulseVariants = {
    inactive: { scale: 1 },
    active: { 
      scale: [1, 1.05, 1],
      transition: { 
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  }

  const glowVariants = {
    inactive: { 
      boxShadow: "0 0 0 rgba(59, 130, 246, 0)" 
    },
    active: { 
      boxShadow: [
        "0 0 5px rgba(59, 130, 246, 0.3)",
        "0 0 20px rgba(59, 130, 246, 0.7)",
        "0 0 5px rgba(59, 130, 246, 0.3)"
      ],
      transition: { 
        duration: 2,
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  }

  // Skill level descriptors with detailed descriptions
  const getSkillLevel = (level) => {
    if (level >= 90) return { 
      label: "Expert", 
      icon: <Trophy className="h-4 w-4 text-yellow-500" />,
      description: "Deep knowledge and extensive experience. Can solve complex problems and innovate new solutions."
    }
    if (level >= 80) return { 
      label: "Advanced", 
      icon: <TrendingUp className="h-4 w-4 text-blue-500" />,
      description: "Strong understanding with practical implementation experience. Can handle most challenges effectively."
    }
    if (level >= 70) return { 
      label: "Proficient", 
      icon: <Zap className="h-4 w-4 text-green-500" />,
      description: "Solid grasp of concepts with ability to apply knowledge in various situations."
    }
    return { 
      label: "Intermediate", 
      icon: <Star className="h-4 w-4 text-gray-500" />,
      description: "Working knowledge with foundational understanding. Comfortable with basic implementations."
    }
  }

  // Get experience years (fictional data for demo)
  const getExperienceYears = (skill) => {
    const experienceMap = {
      "HTML5/CSS3": 7, "JavaScript": 6, "React": 4, "Next.js": 2, "Tailwind CSS": 3, "TypeScript": 2,
      "Node.js": 4, "Express": 3, "C/C++": 8, "RESTful APIs": 5, "JWT": 3, "Authentication": 4,
      "MongoDB": 4, "PostgreSQL": 2, "MySQL": 5, "Mongoose": 3, "SQL": 5, "NoSQL": 4,
      "Data Structures": 8, "Algorithms": 7, "OOP": 6, "Competitive Programming": 5, "Problem Solving": 8, "Git & GitHub": 5,
      "VS Code": 5, "Postman": 4, "Apache JMeter": 2, "Katalon Studio": 1, "API Testing": 3, "Performance Testing": 2,
      "Teamwork": 8, "Leadership": 6, "Communication": 7, "Creative Thinking": 8, "Analytical Skills": 7, "Adaptiveness": 8
    }
    
    return experienceMap[skill] || Math.floor(Math.random() * 5) + 2 // Fallback 2-7 years
  }

  // Get random projects (fictional data for demo)
  const getRelatedProjects = (skill) => {
    const projectMap = {
      "React": ["E-commerce Dashboard", "Social Media App", "Portfolio Website"],
      "Next.js": ["Company Website", "Blog Platform", "SaaS Dashboard"],
      "Node.js": ["REST API Service", "Authentication System", "Real-time Chat"],
      "MongoDB": ["Customer Database", "Content Management System", "Analytics Platform"],
      "Data Structures": ["Algorithm Visualizer", "Sorting Algorithms", "Path Finding Demo"],
      "Leadership": ["Team Lead - Project X", "Scrum Master", "Mentorship Program"]
    }
    
    return projectMap[skill] || ["Project Alpha", "Project Beta"]
  }

  // Praveen's skills with enhanced categorization and visuals
  const skillCategories = [
    {
      title: "Frontend Development",
      description: "Creating responsive and interactive user interfaces",
      icon: <Layout className="h-10 w-10 text-primary" />,
      skills: [
        { name: "HTML5/CSS3", level: 95, key: "html-css" },
        { name: "JavaScript", level: 90, key: "javascript" },
        { name: "React", level: 85, key: "react" },
        { name: "Next.js", level: 80, key: "nextjs" },
        { name: "Tailwind CSS", level: 90, key: "tailwind" },
        { name: "TypeScript", level: 75, key: "typescript" },
      ],
      color: "bg-gradient-to-r from-blue-500/20 to-purple-500/20",
      hoverColor: "hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-purple-500/30",
      borderColor: "border-blue-500/30",
      accentColor: "text-blue-500",
      progressColor: "from-blue-600 to-purple-600"
    },
    {
      title: "Backend Development",
      description: "Building robust server-side applications",
      icon: <Server className="h-10 w-10 text-primary" />,
      skills: [
        { name: "Node.js", level: 85, key: "nodejs" },
        { name: "Express", level: 80, key: "express" },
        { name: "C/C++", level: 90, key: "cpp" },
        { name: "RESTful APIs", level: 85, key: "rest" },
        { name: "JWT", level: 80, key: "jwt" },
        { name: "Authentication", level: 85, key: "auth" },
      ],
      color: "bg-gradient-to-r from-green-500/20 to-teal-500/20",
      hoverColor: "hover:bg-gradient-to-r hover:from-green-500/30 hover:to-teal-500/30",
      borderColor: "border-green-500/30",
      accentColor: "text-green-500",
      progressColor: "from-green-600 to-teal-600"
    },
    {
      title: "Database",
      description: "Managing and optimizing data storage",
      icon: <Database className="h-10 w-10 text-primary" />,
      skills: [
        { name: "MongoDB", level: 85, key: "mongodb" },
        { name: "PostgreSQL", level: 75, key: "postgres" },
        { name: "MySQL", level: 80, key: "mysql" },
        { name: "Mongoose", level: 85, key: "mongoose" },
        { name: "SQL", level: 75, key: "sql" },
        { name: "NoSQL", level: 80, key: "nosql" },
      ],
      color: "bg-gradient-to-r from-amber-500/20 to-orange-500/20",
      hoverColor: "hover:bg-gradient-to-r hover:from-amber-500/30 hover:to-orange-500/30",
      borderColor: "border-amber-500/30",
      accentColor: "text-amber-500",
      progressColor: "from-amber-600 to-orange-600"
    },
    {
      title: "Programming",
      description: "Core programming skills and problem solving",
      icon: <Code className="h-10 w-10 text-primary" />,
      skills: [
        { name: "Data Structures", level: 90, key: "ds" },
        { name: "Algorithms", level: 85, key: "algo" },
        { name: "OOP", level: 85, key: "oop" },
        { name: "Competitive Programming", level: 80, key: "cp" },
        { name: "Problem Solving", level: 90, key: "ps" },
        { name: "Git & GitHub", level: 85, key: "git" },
      ],
      color: "bg-gradient-to-r from-red-500/20 to-pink-500/20",
      hoverColor: "hover:bg-gradient-to-r hover:from-red-500/30 hover:to-pink-500/30",
      borderColor: "border-red-500/30",
      accentColor: "text-red-500",
      progressColor: "from-red-600 to-pink-600"
    },
    {
      title: "Tools & Technologies",
      description: "Development tools and technologies",
      icon: <Smartphone className="h-10 w-10 text-primary" />,
      skills: [
        { name: "VS Code", level: 90, key: "vscode" },
        { name: "Postman", level: 85, key: "postman" },
        { name: "Apache JMeter", level: 75, key: "jmeter" },
        { name: "Katalon Studio", level: 70, key: "katalon" },
        { name: "API Testing", level: 80, key: "api" },
        { name: "Performance Testing", level: 75, key: "perf" },
      ],
      color: "bg-gradient-to-r from-purple-500/20 to-indigo-500/20",
      hoverColor: "hover:bg-gradient-to-r hover:from-purple-500/30 hover:to-indigo-500/30",
      borderColor: "border-purple-500/30",
      accentColor: "text-purple-500",
      progressColor: "from-purple-600 to-indigo-600"
    },
    {
      title: "Soft Skills",
      description: "Professional and interpersonal abilities",
      icon: <Palette className="h-10 w-10 text-primary" />,
      skills: [
        { name: "Teamwork", level: 95, key: "team" },
        { name: "Leadership", level: 90, key: "lead" },
        { name: "Communication", level: 85, key: "comm" },
        { name: "Creative Thinking", level: 90, key: "creative" },
        { name: "Analytical Skills", level: 85, key: "analytics" },
        { name: "Adaptiveness", level: 90, key: "adapt" },
      ],
      color: "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20",
      hoverColor: "hover:bg-gradient-to-r hover:from-emerald-500/30 hover:to-cyan-500/30",
      borderColor: "border-emerald-500/30",
      accentColor: "text-emerald-500",
      progressColor: "from-emerald-600 to-cyan-600"
    },
  ]

  // Find current category 
  const currentCategory = skillCategories.find(cat => cat.title === activeTab)

  // Handle skill click
  const handleSkillClick = (category, skill) => {
    if (selectedSkill && selectedSkill.name === skill.name && selectedSkill.category === category.title) {
      setSelectedSkill(null)
    } else {
      setSelectedSkill({
        name: skill.name,
        level: skill.level,
        category: category.title,
        experience: getExperienceYears(skill.name),
        projects: getRelatedProjects(skill.name),
        levelInfo: getSkillLevel(skill.level),
        color: category.accentColor
      })
    }
  }

  // Handle tab change
  const handleTabChange = (value) => {
    setIsAnimating(true)
    setActiveTab(value)
    setSelectedSkill(null)
    
    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  return (
    <section id="skills" className="py-16 md:py-24 bg-gradient-to-b from-background/80 via-background to-background/90 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        <motion.div 
          className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        ></motion.div>
      </div>
      
      <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10 max-w-7xl">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <motion.div variants={itemVariants} className="space-y-2">
            <motion.div 
              className="inline-flex items-center justify-center rounded-md bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20 mb-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Star className="h-4 w-4 mr-1" /> My Skills
            </motion.div>
            <motion.h2 
              className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
              whileHover={{ letterSpacing: "0.03em", transition: { duration: 0.3 } }}
            >
              Technical Expertise
            </motion.h2>
            <motion.p 
              className="mx-auto max-w-[800px] text-muted-foreground md:text-xl/relaxed px-4"
              variants={itemVariants}
            >
              Technologies and tools I've mastered to build exceptional digital experiences
            </motion.p>
          </motion.div>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mx-auto max-w-6xl py-12"
        >
          {/* Tip/Hint for first-time users */}
          <AnimatePresence>
            {showTip && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 mx-4 p-3 bg-primary/10 rounded-lg text-sm flex items-center justify-center space-x-2 border border-primary/20"
              >
                <Info className="h-4 w-4 text-primary" />
                <span>Click on any skill to see more details or hover for quick info!</span>
              </motion.div>
            )}
          </AnimatePresence>
          
          <Tabs 
            value={activeTab} 
            onValueChange={handleTabChange} 
            className="w-full"
          >
            <motion.div 
              className="relative rounded-xl p-1 bg-muted/70 backdrop-blur-sm mb-8 mx-4"
              whileHover={{ boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)" }}
              transition={{ duration: 0.3 }}
              onHoverStart={() => setIsHoveringOverTabs(true)}
              onHoverEnd={() => setIsHoveringOverTabs(false)}
              variants={glowVariants}
              animate={isHoveringOverTabs ? "active" : "inactive"}
            >
              <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full h-auto bg-transparent gap-1">
                {skillCategories.map((category) => (
                  <TabsTrigger 
                    key={category.title} 
                    value={category.title} 
                    className={`text-xs md:text-sm relative z-10 py-3 px-2 rounded-lg transition-all ${
                      activeTab === category.title ? category.color : "hover:bg-muted"
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0.8 }}
                      whileHover={{ scale: 1.05, opacity: 1 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <motion.div 
                        className={`p-2 rounded-full ${activeTab === category.title ? "bg-primary/20" : "bg-background/50"} transition-colors`}
                        animate={activeTab === category.title ? "active" : "inactive"}
                        variants={pulseVariants}
                      >
                        {category.icon}
                      </motion.div>
                      <span className="hidden md:inline font-medium">{category.title}</span>
                      <span className="inline md:hidden font-medium text-xs">{category.title.split(" ")[0]}</span>
                    </motion.div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </motion.div>
            
            <AnimatePresence mode="wait">
              {skillCategories.map((category) => (
                <TabsContent key={category.title} value={category.title} className="outline-none ring-0 mx-4">
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className={`border-2 ${category.borderColor} ${category.color} backdrop-blur-sm shadow-xl overflow-hidden rounded-xl`}>
                      <CardHeader className={`flex flex-row items-center gap-4 pb-4 border-b border-${category.borderColor}`}>
                        <motion.div
                          variants={pulseVariants}
                          animate={activeTab === category.title && !isAnimating ? "active" : "inactive"}
                          className="bg-background/80 p-3 rounded-full shadow-inner"
                        >
                          {category.icon}
                        </motion.div>
                        <div>
                          <CardTitle className="text-2xl font-bold">{category.title}</CardTitle>
                          <CardDescription className="text-base">{category.description}</CardDescription>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="grid gap-6 pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {category.skills.map((skill, index) => (
                            <motion.div
                              key={`${category.title}-${skill.key}`}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              whileHover={{ scale: 1.02 }}
                              onHoverStart={() => setHoveredSkill(`${category.title}-${skill.name}`)}
                              onHoverEnd={() => setHoveredSkill(null)}
                              onClick={() => handleSkillClick(category, skill)}
                              className={`relative p-4 rounded-lg cursor-pointer transition-all ${category.hoverColor} ${
                                selectedSkill?.name === skill.name ? `${category.color} border border-${category.borderColor}` : ""
                              }`}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{skill.name}</span>
                                  {hoveredSkill === `${category.title}-${skill.name}` && (
                                    <motion.div 
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0.8 }}
                                      className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-background/80"
                                    >
                                      {getSkillLevel(skill.level).icon}
                                      <span>{getSkillLevel(skill.level).label}</span>
                                    </motion.div>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">{skill.level}%</span>
                                  <motion.div
                                    animate={{ rotate: selectedSkill?.name === skill.name ? 90 : 0 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <ChevronRight className={`h-4 w-4 ${category.accentColor}`} />
                                  </motion.div>
                                </div>
                              </div>
                              <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-primary/10 group">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: isAnimating ? 0 : `${skill.level}%` }}
                                  transition={{ duration: 1, delay: index * 0.1 + 0.2, ease: "easeOut" }}
                                  className={`absolute h-full bg-gradient-to-r ${category.progressColor} rounded-full group-hover:opacity-90`}
                                />
                              </div>
                              
                              {/* Experience years label */}
                              <div className="mt-2 text-xs text-muted-foreground">
                                <span>{getExperienceYears(skill.name)} years experience</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                      
                      {/* Animated arrows showing users should click */}
                      {activeTab === category.title && !selectedSkill && !isAnimating && (
                        <motion.div 
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary/40 opacity-50 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 0.5, 0] }}
                          transition={{ duration: 2, repeat: 2, repeatType: "loop", delay: 1 }}
                        >
                          <div className="flex flex-col items-center">
                            <ArrowRight className="h-8 w-8" />
                            <span className="text-xs font-medium mt-1">Click for details</span>
                          </div>
                        </motion.div>
                      )}
                    </Card>
                    
                    {/* Skill Detail Expansions */}
                    <AnimatePresence>
                      {selectedSkill && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-6"
                        >
                          <Card className="border border-primary/20 bg-gradient-to-b from-background to-primary/5 shadow-lg">
                            <CardHeader>
                              <CardTitle className="flex justify-between items-center">
                                <span className={`${selectedSkill.color}`}>{selectedSkill.name}</span>
                                <div className="flex items-center gap-2 text-sm font-normal">
                                  {selectedSkill.levelInfo.icon}
                                  <span>{selectedSkill.levelInfo.label} Level</span>
                                </div>
                              </CardTitle>
                              <CardDescription className="text-base mt-2">
                                {selectedSkill.levelInfo.description}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                                      <Book className="h-4 w-4" /> Experience
                                    </h4>
                                    <p className="font-semibold text-lg">{selectedSkill.experience} years</p>
                                  </div>
                                  
                                  <div>
                                    <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                                      <Trophy className="h-4 w-4" /> Proficiency
                                    </h4>
                                    <div className="w-full bg-primary/10 rounded-full h-2.5 mb-1">
                                      <motion.div 
                                        className="bg-primary h-2.5 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${selectedSkill.level}%` }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                      />
                                    </div>
                                    <div className="flex justify-between text-xs">
                                      <span>Beginner</span>
                                      <span>Intermediate</span>
                                      <span>Advanced</span>
                                      <span>Expert</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                                    <Code className="h-4 w-4" /> Related Projects
                                  </h4>
                                  <ul className="space-y-2">
                                    {selectedSkill.projects.map((project, i) => (
                                      <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-2"
                                      >
                                        <div className={`h-2 w-2 rounded-full ${selectedSkill.color}`}></div>
                                        <span>{project}</span>
                                      </motion.li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="border-t border-primary/10 pt-4 mt-2">
                              <div className="w-full flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Category: {selectedSkill.category}</span>
                                <button 
                                  onClick={() => setSelectedSkill(null)}
                                  className="text-sm flex items-center gap-1 hover:text-primary transition-colors"
                                >
                                  <span>Close details</span>
                                </button>
                              </div>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}