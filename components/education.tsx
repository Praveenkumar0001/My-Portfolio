"use client";

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  Code, 
  ChevronRight, 
  ChevronDown,
  ExternalLink
} from "lucide-react"

export  function Education() {
  const [expandedCourses, setExpandedCourses] = useState(false)
  const [expandedAchievements, setExpandedAchievements] = useState(false)
  const [activeTab, setActiveTab] = useState('education')
  const [showCertifications, setShowCertifications] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const coursesList = [
    { name: "Data Structures and Algorithms", category: "Computer Science" },
    { name: "C Programming", category: "Computer Science" },
    { name: "Numerical Methods", category: "Mathematics" },
    { name: "Engineering Graphics", category: "Engineering" },
    { name: "Mathematics I & II", category: "Mathematics" },
    { name: "Business Strategy", category: "Business" },
    { name: "Market Analysis", category: "Business" },
    { name: "Statistical Methods", category: "Mathematics" },
  ]
  
  const achievements = [
    {
      icon: <Award className="h-5 w-5 text-amber-500" />,
      title: "District Rank - 9",
      description: "Achieved 9th rank in the district in class 12th board exams"
    },
    {
      icon: <Code className="h-5 w-5 text-blue-500" />,
      title: "Competitive Programming",
      description: "Solved more than 750+ problems in C++ across all Coding Platforms",
      details: [
        { platform: "Codeforces", rating: "1315+ rating", color: "text-red-500" },
        { platform: "Codechef", rating: "3 star", color: "text-yellow-500" },
        { platform: "Leetcode", rating: "Regular participant", color: "text-orange-500" },
        { platform: "Hackerrank", rating: "Active contributor", color: "text-green-500" }
      ]
    }
  ]
  
  const certifications = [
    {
      title: "Advanced Data Structures",
      issuer: "Coursera",
      date: "Feb 2024",
      credential: "CRD82629X",
      image: "/api/placeholder/100/60"
    },
    {
      title: "Machine Learning Fundamentals",
      issuer: "Stanford Online",
      date: "Nov 2023",
      credential: "ML21937A",
      image: "/api/placeholder/100/60"
    },
    {
      title: "Web Development Bootcamp",
      issuer: "Udemy",
      date: "Aug 2023",
      credential: "UC78291B",
      image: "/api/placeholder/100/60"
    },
    {
      title: "C++ Programming Mastery",
      issuer: "edX",
      date: "May 2023",
      credential: "CPP5280Z",
      image: "/api/placeholder/100/60"
    }
  ]

  return (
    <section id="education" className="py-16 md:py-24 bg-gradient-to-b from-background to-slate-50 dark:to-slate-900/50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <motion.div variants={itemVariants} className="space-y-2">
            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20 mb-4">
              <GraduationCap className="mr-2 h-4 w-4" />
              Education Journey
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Academic Background</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              My educational journey and academic achievements
            </p>
          </motion.div>
          
          {/* Tabs - Improved with better hover and focus states */}
          <motion.div variants={itemVariants} className="flex space-x-2 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-lg mt-8">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                activeTab === 'education' 
                  ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' 
                  : 'text-muted-foreground hover:bg-white/50 dark:hover:bg-slate-700/50'
              }`}
              onClick={() => setActiveTab('education')}
            >
              <div className="flex items-center">
                <GraduationCap className="mr-2 h-4 w-4" />
                Education
              </div>
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                activeTab === 'achievements' 
                  ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' 
                  : 'text-muted-foreground hover:bg-white/50 dark:hover:bg-slate-700/50'
              }`}
              onClick={() => setActiveTab('achievements')}
            >
              <div className="flex items-center">
                <Award className="mr-2 h-4 w-4" />
                Achievements
              </div>
            </button>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'education' && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mx-auto max-w-3xl py-12"
            >
              <Card className="overflow-hidden border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl">
                <CardHeader className="flex flex-row items-start gap-4 bg-gradient-to-r from-primary/5 to-blue-500/5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 ring-2 ring-primary/20">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl md:text-2xl">Indian Institute of Technology (ISM), Dhanbad</CardTitle>
                    <CardDescription className="text-base">B.Tech - Mineral and Metallurgical Engineering</CardDescription>
                    <div className="flex flex-wrap items-center text-sm text-muted-foreground mt-2 gap-2">
                      <div className="flex items-center bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium">
                        <span>Expected May 2026</span>
                      </div>
                      <div className="hidden md:flex items-center">
                        <span className="mx-2">•</span>
                        <span>Dhanbad, Jharkhand</span>
                      </div>
                      <div className="md:hidden flex items-center">
                        <span>Dhanbad, Jharkhand</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <button 
                    onClick={() => setExpandedCourses(!expandedCourses)}
                    className="flex items-center justify-between w-full py-2 px-4 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                    aria-expanded={expandedCourses}
                    aria-controls="coursework-list"
                  >
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 text-primary mr-2" />
                      <h4 className="font-medium">Relevant Coursework</h4>
                    </div>
                    {expandedCourses ? 
                      <ChevronDown className="h-5 w-5 text-muted-foreground" /> : 
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    }
                  </button>
                  
                  <AnimatePresence>
                    {expandedCourses && (
                      <motion.div 
                        id="coursework-list"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                          {coursesList.map((course, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-200/70 dark:hover:bg-slate-700/70 transition-colors"
                            >
                              <div className="w-2 h-2 rounded-full bg-primary" />
                              <div>
                                <p className="font-medium text-sm">{course.name}</p>
                                <p className="text-xs text-muted-foreground">{course.category}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mx-auto max-w-3xl py-12"
            >
              <Card className="overflow-hidden border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl">
                <CardHeader className="flex flex-row items-start gap-4 bg-gradient-to-r from-primary/5 to-blue-500/5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 ring-2 ring-primary/20">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl md:text-2xl">Academic Achievements</CardTitle>
                    <CardDescription className="text-base">Notable accomplishments in my academic journey</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:border-primary/30 transition-all hover:shadow-md">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-lg">{achievement.title}</h4>
                          <p className="text-muted-foreground">{achievement.description}</p>
                          
                          {achievement.details && (
                            <button 
                              onClick={() => setExpandedAchievements(!expandedAchievements)}
                              className="flex items-center mt-2 text-primary hover:underline text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-md px-2 py-1"
                              aria-expanded={expandedAchievements}
                              aria-controls="achievement-details"
                            >
                              {expandedAchievements ? "Hide details" : "Show details"}
                              {expandedAchievements ? 
                                <ChevronDown className="h-4 w-4 ml-1" /> : 
                                <ChevronRight className="h-4 w-4 ml-1" />
                              }
                            </button>
                          )}
                          
                          <AnimatePresence>
                            {expandedAchievements && achievement.details && (
                              <motion.div 
                                id="achievement-details"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden mt-3"
                              >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                                  {achievement.details.map((detail, idx) => (
                                    <motion.div
                                      key={idx}
                                      initial={{ opacity: 0, y: 5 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: idx * 0.1 }}
                                      className="flex items-center justify-between p-2 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 transition-all"
                                    >
                                      <span className="font-medium text-sm">{detail.platform}</span>
                                      <span className={`text-xs ${detail.color}`}>{detail.rating}</span>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex items-center justify-center mt-6">
                    <button 
                      onClick={() => setShowCertifications(true)}
                      className="group inline-flex items-center gap-1 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                    >
                      <span>View All Certifications</span>
                      <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                  
                  {/* Certifications Modal */}
                  <AnimatePresence>
                    {showCertifications && (
                      <>
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                          onClick={() => setShowCertifications(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 20 }}
                          transition={{ type: "spring", damping: 25, stiffness: 300 }}
                          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl z-50 p-6 overflow-hidden"
                        >
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                              <Award className="h-6 w-6 text-primary" />
                              <h3 className="text-2xl font-bold">My Certifications</h3>
                            </div>
                            <button 
                              onClick={() => setShowCertifications(false)}
                              className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          
                          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                            {certifications.map((cert, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                              >
                                <div className="flex-shrink-0 rounded-md overflow-hidden shadow border border-slate-200 dark:border-slate-700">
                                  <img src={cert.image} alt={cert.title} className="w-16 h-10 object-cover" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium">{cert.title}</h4>
                                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <Award className="h-3 w-3" />
                                      {cert.issuer}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                      </svg>
                                      {cert.date}
                                    </span>
                                  </div>
                                </div>
                                <button className="flex-shrink-0 text-xs bg-slate-100 dark:bg-slate-800 py-1 px-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700">
                                  {cert.credential}
                                </button>
                              </motion.div>
                            ))}
                          </div>
                          
                          <div className="mt-6 flex justify-end">
                            <button
                              onClick={() => setShowCertifications(false)}
                              className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-medium px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                              Close
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}