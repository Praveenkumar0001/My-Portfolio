"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Heart, Award, ChevronRight, Users, Trophy, Code, BookOpen, 
  Lightbulb, GraduationCap, Star, Check, ArrowRight, ChevronDown, ChevronUp
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export function Responsibilities() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const [activeTab, setActiveTab] = useState("leadership")
  const [expandedSections, setExpandedSections] = useState({})

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  }

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const responsibilityItems = [
    {
      id: "kartavya",
      title: "Core Member (Active as CMT and SMT)",
      organization: "Kartavya - NGO run by Student body of IIT(ISM) Dhanbad",
      period: "2020 - 2024",
      icon: <Users className="h-5 w-5 text-primary" />,
      description: "Led community service initiatives and educational outreach programs for underprivileged children.",
      details: [
        "Coordinated a team of 15 volunteers for weekly educational sessions",
        "Organized fundraising events that collected over ₹50,000 for school supplies",
        "Developed curriculum for basic computer literacy courses for 100+ children",
        "Managed social media campaigns increasing volunteer participation by 35%",
        "Represented the organization at inter-college social impact conferences"
      ],
      images: ["/images/kartavya1.png", "/images/kartavya2.png"],
      highlights: "Reached 500+ children through educational initiatives"
    },
    {
      id: "sports",
      title: "Sports Team Captain",
      organization: "Institute Sports Teams",
      period: "2021 - 2023",
      icon: <Trophy className="h-5 w-5 text-primary" />,
      description: "Led institute cricket team and actively participated in multiple sports disciplines.",
      details: [
        "Captained the cricket team to inter-college championship finals",
        "Organized weekly practice sessions and strategy meetings",
        "Represented institute in regional badminton tournaments",
        "Participated in chess championships at district level",
        "Conducted sports workshops for junior students"
      ],
      images: ["/images/sports1.png", "/images/sports2.png"],
      highlights: "Secured 2nd place in inter-college cricket tournament"
    },
    {
      id: "tech",
      title: "Technical Coordinator",
      organization: "Computer Science Club",
      period: "2022 - 2023",
      icon: <Code className="h-5 w-5 text-primary" />,
      description: "Organized technical events, workshops, and hackathons for CS department students.",
      details: [
        "Conducted weekly coding sessions attended by 40+ students",
        "Organized 3 technical workshops on web development and cloud computing",
        "Developed and maintained the club's website with event information",
        "Coordinated with industry professionals for guest lectures",
        "Created technical documentation and learning resources"
      ],
      images: ["/images/tech1.png", "/images/tech2.png"],
      highlights: "Organized hackathon with 150+ participants"
    }
  ]

  const achievementItems = [
    {
      id: "cp",
      title: "Competitive Programming",
      icon: <Code className="h-5 w-5 text-primary" />,
      description: "Solved more than 750+ problems in C++ across all Coding Platforms",
      platforms: [
        { name: "Codeforces", rating: "1315+", level: 70 },
        { name: "Codechef", rating: "3 star", level: 60 },
        { name: "Leetcode", count: "400+ problems", level: 75 },
        { name: "Hackerrank", badges: "5 gold badges", level: 65 }
      ],
      highlight: "Ranked in top 10% globally in CodeForces Round #745",
      detail: "Consistently solved challenging algorithmic problems focusing on data structures, dynamic programming, and graph algorithms."
    },
    {
      id: "academic",
      title: "Academic Excellence",
      icon: <GraduationCap className="h-5 w-5 text-primary" />,
      description: "Consistently achieved academic excellence throughout educational journey",
      achievements: [
        "District Rank-9: Achieved 9th rank in the district in class 12th board exams",
        "Secured 95th percentile in JEE Mains",
        "Dean's List: 3 consecutive semesters",
        "Perfect GPA in Core Computer Science courses"
      ],
      highlight: "Top 1% in district board examinations",
      detail: "Maintained academic excellence while actively participating in extracurricular activities and technical competitions."
    },
    {
      id: "hackathons",
      title: "Hackathons & Projects",
      icon: <Lightbulb className="h-5 w-5 text-primary" />,
      description: "Participated and won in multiple technical competitions",
      achievements: [
        "1st Place - University Hackathon 2023",
        "2nd Place - State-level Web Development Contest",
        "Top 5 - National AI Challenge 2022",
        "Best UI/UX Award - College Project Exhibition"
      ],
      highlight: "Winner of 24-hour National Hackathon",
      detail: "Developed innovative solutions for real-world problems under time constraints, demonstrating technical proficiency and teamwork."
    },
    {
      id: "skills",
      title: "Technical Skills Recognition",
      icon: <BookOpen className="h-5 w-5 text-primary" />,
      description: "Received recognition for technical expertise in various domains",
      certifications: [
        "AWS Certified Developer Associate",
        "Google Cloud Platform Fundamentals",
        "Advanced JavaScript Certification",
        "Full Stack Web Development Specialization"
      ],
      highlight: "Featured in college tech magazine for innovative project",
      detail: "Recognized for contributions to open-source projects and developing tools that improved development workflow."
    }
  ]

  return (
    <section id="responsibilities" className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/70">
      <div className="container px-4 md:px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="flex flex-col items-center justify-center space-y-6 text-center"
        >
          <motion.div variants={titleVariants} className="space-y-3">
            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-inset ring-primary/30 mb-4">
              <Star className="h-4 w-4 mr-2 animate-pulse" />
              My Journey
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Leadership & Recognition
            </h2>
            <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl/relaxed">
              Showcasing my roles, responsibilities, and notable achievements throughout my academic and professional journey
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mx-auto max-w-5xl py-12"
        >
          <Tabs 
            defaultValue="leadership" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 w-full max-w-md">
                <TabsTrigger 
                  value="leadership"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full transition-all duration-300"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Leadership Roles
                </TabsTrigger>
                <TabsTrigger 
                  value="achievements"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full transition-all duration-300"
                >
                  <Award className="h-4 w-4 mr-2" />
                  Achievements
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="leadership" className="mt-0">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {responsibilityItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden border-muted-foreground/10 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                      <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-xl">{item.title}</CardTitle>
                            <Badge variant="outline" className="ml-2 text-xs px-2 py-0 border-primary/20">
                              {item.period}
                            </Badge>
                          </div>
                          <CardDescription className="text-sm">{item.organization}</CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="flex-1">
                            <p className="mb-3">{item.description}</p>
                            
                            <AnimatePresence>
                              {expandedSections[item.id] && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="mt-2"
                                >
                                  <ul className="space-y-2 my-4">
                                    {item.details.map((detail, idx) => (
                                      <li key={idx} className="flex items-start">
                                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                        <span className="text-muted-foreground">{detail}</span>
                                      </li>
                                    ))}
                                  </ul>
                                  
                                  <div className="mt-4 p-3 bg-muted/50 rounded-md border border-primary/10">
                                    <div className="flex items-center">
                                      <Trophy className="h-5 w-5 text-primary mr-2" />
                                      <span className="font-medium">Key Achievement:</span>
                                    </div>
                                    <p className="mt-1 text-muted-foreground">{item.highlights}</p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          
                          {expandedSections[item.id] && (
                            <div className="md:w-1/3 mt-3 md:mt-0">
                              <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                                <div className="text-center text-muted-foreground">
                                  <BookOpen className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
                                  <p className="text-sm">Activity photos would appear here</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-3 flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          {expandedSections[item.id] ? "Click to collapse details" : "Click to see details"}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => toggleSection(item.id)}
                          className="text-primary hover:text-primary hover:bg-primary/10"
                        >
                          {expandedSections[item.id] ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="achievements" className="mt-0">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {achievementItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full flex flex-col border-muted-foreground/10 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                      <CardHeader className="flex flex-row items-start gap-4 pb-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
                          {item.icon}
                        </div>
                        <div>
                          <CardTitle>{item.title}</CardTitle>
                          <CardDescription className="mt-1">{item.description}</CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1">
                        {item.id === "cp" && (
                          <div className="space-y-4">
                            {item.platforms.map((platform, idx) => (
                              <div key={idx} className="space-y-1">
                                <div className="flex justify-between items-center text-sm">
                                  <span>{platform.name}</span>
                                  <span className="font-medium text-primary">{platform.rating || platform.count || platform.badges}</span>
                                </div>
                                <Progress value={platform.level} className="h-1.5" />
                              </div>
                            ))}
                          </div>
                        )}

                        {item.id === "academic" && (
                          <ul className="space-y-2 mt-2">
                            {item.achievements.map((achievement, idx) => (
                              <li key={idx} className="flex items-start">
                                <Star className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground text-sm">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {item.id === "hackathons" && (
                          <ul className="space-y-3 mt-2">
                            {item.achievements.map((achievement, idx) => (
                              <li key={idx} className="flex items-center">
                                <div className="mr-3 flex-shrink-0">
                                  {idx === 0 && <Badge className="bg-yellow-500/20 text-yellow-600 hover:bg-yellow-500/20 border-none">🥇 1st</Badge>}
                                  {idx === 1 && <Badge className="bg-gray-300/20 text-gray-600 hover:bg-gray-300/20 border-none">🥈 2nd</Badge>}
                                  {idx === 2 && <Badge className="bg-amber-600/20 text-amber-700 hover:bg-amber-600/20 border-none">🥉 Top 5</Badge>}
                                  {idx === 3 && <Badge className="bg-blue-500/20 text-blue-600 hover:bg-blue-500/20 border-none">🏆 Best</Badge>}
                                </div>
                                <span className="text-muted-foreground text-sm">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {item.id === "skills" && (
                          <ul className="space-y-2 mt-2">
                            {item.certifications.map((cert, idx) => (
                              <li key={idx} className="flex items-start">
                                <Check className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground text-sm">{cert}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        <div className="mt-4 p-3 bg-muted/50 rounded-md border border-primary/10">
                          <div className="flex items-center">
                            <Trophy className="h-4 w-4 text-primary mr-2" />
                            <span className="font-medium text-sm">Highlight:</span>
                          </div>
                          <p className="mt-1 text-muted-foreground text-sm">{item.highlight}</p>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-3">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => toggleSection(item.id)}
                          className="flex items-center text-primary hover:text-primary hover:bg-primary/10 w-full justify-center"
                        >
                          <span>Learn more</span>
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}