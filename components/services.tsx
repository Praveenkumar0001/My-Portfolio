"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Code, Layout, Lightbulb, Smartphone, Zap } from "lucide-react"

export function Services() {
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

  const services = [
    {
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies.",
      icon: <Layout className="h-12 w-12 text-primary" />,
      features: ["Responsive Design", "SEO Optimization", "Performance Tuning", "CMS Integration"],
      price: "Starting at $2,500",
      popular: true,
    },
    {
      title: "Mobile App Development",
      description: "Cross-platform mobile applications for iOS and Android.",
      icon: <Smartphone className="h-12 w-12 text-primary" />,
      features: ["Native Performance", "Offline Functionality", "Push Notifications", "App Store Submission"],
      price: "Starting at $5,000",
      popular: false,
    },
    {
      title: "UI/UX Design",
      description: "User-centered design solutions that enhance user experience.",
      icon: <Lightbulb className="h-12 w-12 text-primary" />,
      features: ["User Research", "Wireframing", "Prototyping", "Usability Testing"],
      price: "Starting at $1,500",
      popular: false,
    },
    {
      title: "Custom Development",
      description: "Tailored solutions for your specific business needs.",
      icon: <Code className="h-12 w-12 text-primary" />,
      features: ["API Development", "Database Design", "Third-party Integrations", "Maintenance & Support"],
      price: "Starting at $3,000",
      popular: false,
    },
    {
      title: "Performance Optimization",
      description: "Speed up your existing website or application.",
      icon: <Zap className="h-12 w-12 text-primary" />,
      features: ["Load Time Analysis", "Code Optimization", "Image Optimization", "Caching Strategies"],
      price: "Starting at $1,000",
      popular: false,
    },
  ]

  return (
    <section id="services" className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <motion.div variants={itemVariants} className="space-y-2">
            <div className="inline-flex items-center justify-center rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20 mb-4">
              Services
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What I Offer</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Professional services tailored to your needs
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
              <Card className="h-full flex flex-col overflow-hidden relative">
                {service.popular && <Badge className="absolute top-4 right-4 z-10">Popular</Badge>}
                <CardHeader className="pb-4">
                  <div className="mb-4 flex justify-center">{service.icon}</div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="border-t pt-4 flex flex-col items-start">
                  <p className="font-medium text-lg mb-3">{service.price}</p>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
