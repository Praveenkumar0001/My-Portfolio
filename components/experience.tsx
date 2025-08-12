"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, MapPin } from "lucide-react"

export function Experience() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  // Praveen's work experience
  const experiences = [
    {
      title: "Full-Stack Web Development Intern",
      company: "AuctionX",
      location: "Remote",
      period: "Oct 2024 - Present",
      description:
        "Working on Admin panel (profile updation, auto time increment, configure page debugging). Currently working on Auction creation in different conditions.",
      technologies: ["React", "Node.js", "MongoDB", "Express.js"],
    },
    {
      title: "Full-Stack Web Development Intern (Team Leader)",
      company: "JMD Groups",
      location: "Remote",
      period: "Oct 2023 - Nov 2023",
      description:
        "Led the development of both frontend and backend components, improving team efficiency by 25% and project performance by 20%. Improved project efficiency by 20% through management consulting.",
      technologies: ["JavaScript", "HTML/CSS", "Node.js", "React"],
    },
  ]

  return (
    <section
      id="experience"
      className="py-24 md:py-32 bg-gradient-to-b from-[#f8fafc] via-muted/30 to-[#e2e8f0] dark:from-[#0f172a] dark:to-[#1e293b] relative z-0"
    >
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <motion.div variants={itemVariants} className="space-y-2">
            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-5 py-1.5 text-sm font-medium text-primary ring-1 ring-inset ring-primary/30 shadow-md backdrop-blur-sm">
              Work Experience
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary drop-shadow-sm">
              Professional Journey
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              Real-world experience building impactful applications.
            </p>
          </motion.div>
        </motion.div>
  
        <div className="mx-auto max-w-4xl pt-20 relative px-4 sm:px-6">
          <div className="absolute top-0 left-5 sm:left-9 w-1 h-full bg-gradient-to-b from-primary to-transparent opacity-30 rounded-full"></div>
  
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              initial="hidden"
              animate={controls}
              transition={{ delay: index * 0.2 }}
              className="relative pl-12 sm:pl-16 pr-4 sm:pr-6 mb-16 sm:mb-20 group"
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 sm:left-4 top-4 h-10 w-10 rounded-full bg-background border-4 border-primary shadow-xl flex items-center justify-center transition-all group-hover:scale-105 group-hover:shadow-primary/40">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
  
              {/* Timeline Card */}
              <motion.div
                whileHover={{ scale: 1.03, rotateX: 2, rotateY: 2 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-full"
              >
                <Card className="bg-white/70 dark:bg-slate-900/80 border border-border backdrop-blur-md shadow-xl rounded-3xl overflow-hidden transition-all hover:shadow-2xl hover:border-primary/30">
                  <CardHeader className="px-6 sm:px-8">
                    <CardTitle className="text-xl font-bold text-foreground">
                      {experience.title}
                    </CardTitle>
                    <CardDescription className="flex flex-wrap items-center gap-4 mt-2 text-muted-foreground">
                      <span className="font-medium">{experience.company}</span>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        <span>{experience.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        <span>{experience.period}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 px-6 sm:px-8 pb-6 sm:pb-8">
                    <p className="text-muted-foreground leading-relaxed">{experience.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="px-3 py-1 text-sm font-medium bg-secondary/70 hover:bg-primary/10 hover:text-primary transition duration-200 rounded-xl shadow-sm"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )   
}