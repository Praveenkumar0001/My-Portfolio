"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Mail, MapPin, Phone, Send, Check, Loader2, ExternalLink, ArrowRight, ChevronRight } from "lucide-react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export function Contact() {
  const { toast } = useToast()
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStep, setFormStep] = useState(0)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [activeContact, setActiveContact] = useState(null)
  const [typingEffect, setTypingEffect] = useState(false)
  const messageRef = useRef(null)

  // Time-based greeting
  const [greeting, setGreeting] = useState("")
  
  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")
  }, [])

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  // Auto-focusing inputs when changing form steps
  useEffect(() => {
    const stepInputs = document.querySelectorAll(`.form-step-${formStep} input, .form-step-${formStep} textarea`)
    if (stepInputs[0]) {
      setTimeout(() => {
        stepInputs[0].focus()
      }, 500)
    }
  }, [formStep])

  // Handle message typing animation
  useEffect(() => {
    if (formStep === 2 && messageRef.current) {
      setTypingEffect(true)
      const timer = setTimeout(() => {
        setTypingEffect(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [formStep])

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

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  }

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: { duration: 1.5, repeat: Infinity }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const nextStep = () => {
    // Validate current step
    if (formStep === 0 && !formData.name) {
      toast({
        title: "Please enter your name",
        variant: "destructive",
      })
      return
    }
    
    if (formStep === 1 && !formData.email) {
      toast({
        title: "Please enter your email",
        variant: "destructive",
      })
      return
    }
    
    setFormStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setFormStep((prev) => prev - 1)
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    
    // Final validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (!validateEmail(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return
    }
    
    setIsSubmitting(true)

    try {
      // Send email using a backend API route
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: "praveenkumar01.iitism@gmail.com",
          from: formData.email,
          subject: formData.subject || `New contact from ${formData.name}`,
          name: formData.name,
          message: formData.message,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
        variant: "default",
      })
      
      setFormSubmitted(true)
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later or contact directly via email.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({ name: "", email: "", subject: "", message: "" })
    setFormStep(0)
    setFormSubmitted(false)
  }

  const contactMethods = [
    { 
      icon: <Mail className="h-5 w-5 text-primary" />, 
      title: "Email", 
      value: "praveenkumar01.iitism@gmail.com",
      action: "Copy email",
      onClick: () => {
        navigator.clipboard.writeText("praveenkumar01.iitism@gmail.com")
        toast({ title: "Email copied to clipboard!" })
      }
    },
    { 
      icon: <Phone className="h-5 w-5 text-primary" />, 
      title: "Phone", 
      value: "+91 9198352536",
      action: "Call me",
      onClick: () => {
        window.location.href = "tel:+919198352536"
      }
    },
    { 
      icon: <MapPin className="h-5 w-5 text-primary" />, 
      title: "Location", 
      value: "Dhanbad, Jharkhand, India",
      action: "View map",
      onClick: () => {
        window.open("https://maps.google.com/?q=Dhanbad,Jharkhand,India", "_blank")
      }
    }
  ]

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-primary/5 blur-3xl"></div>
      </div>
      
      {/* Enhanced container with proper left and right margins */}
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 max-w-7xl">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <motion.div variants={itemVariants} className="space-y-2">
            <motion.div 
              className="inline-flex items-center justify-center rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20 mb-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Connect
            </motion.div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get In Touch</h2>
            <motion.p 
              className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {greeting}! Have a project in mind or want to collaborate? Let's make something amazing together.
            </motion.p>
          </motion.div>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mx-auto grid max-w-6xl gap-8 py-12 lg:grid-cols-2 lg:gap-12"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <Card className="bg-card/50 backdrop-blur transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Here's how you can reach me</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 cursor-pointer ${activeContact === index ? 'bg-primary/10' : 'hover:bg-primary/5'}`}
                    whileHover={{ x: 5 }}
                    onClick={() => setActiveContact(index === activeContact ? null : index)}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      {method.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{method.title}</p>
                      <p className="text-sm text-muted-foreground truncate">{method.value}</p>
                    </div>
                    <AnimatePresence>
                      {activeContact === index && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Button 
                            size="sm" 
                            variant="secondary"
                            className="text-xs"
                            onClick={(e) => {
                              e.stopPropagation()
                              method.onClick()
                            }}
                          >
                            {method.action}
                            <ChevronRight className="ml-1 h-3 w-3" />
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
            
            <motion.div
              animate={pulseVariants.pulse}
            >
              <Card className="bg-card/50 backdrop-blur border-primary/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-30"></div>
                <CardHeader>
                  <CardTitle>Availability</CardTitle>
                  <CardDescription>Current status and working hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="relative">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></div>
                    </div>
                    <p className="text-sm">
                      Currently <span className="font-medium text-primary">available</span> for internships and collaborations
                    </p>
                  </div>
                  <div className="flex flex-col space-y-1 text-sm text-muted-foreground">
                    <p>• Working hours: 9 AM - 6 PM IST</p>
                    <p>• Response time: Within 24 hours</p>
                    <p>• Available for video calls by appointment</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="group text-xs w-full justify-center">
                    Schedule a meeting
                    <ExternalLink className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="h-full bg-card/50 backdrop-blur transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
              <CardHeader>
                <CardTitle>Send Me a Message</CardTitle>
                <CardDescription>I'd love to hear from you about your project</CardDescription>
              </CardHeader>
              <CardContent>
                {formSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-64 space-y-4"
                  >
                    <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <Check className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-medium">Thank you!</h3>
                    <p className="text-center text-muted-foreground px-4">
                      Your message has been sent successfully. I'll get back to you as soon as possible.
                    </p>
                    <Button onClick={resetForm} className="mt-4">
                      Send another message
                    </Button>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    <AnimatePresence mode="wait" custom={formStep}>
                      {formStep === 0 && (
                        <motion.div
                          key="step0"
                          custom={1}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="space-y-4 form-step-0"
                        >
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium">
                              What's your name? <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              placeholder="Enter your full name"
                              value={formData.name}
                              onChange={handleChange}
                              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                            />
                          </div>
                          <div className="flex justify-end">
                            <Button 
                              type="button" 
                              onClick={nextStep}
                              className="group"
                              disabled={!formData.name}
                            >
                              Continue
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                          </div>
                        </motion.div>
                      )}
                      
                      {formStep === 1 && (
                        <motion.div
                          key="step1"
                          custom={formStep > 0 ? -1 : 1}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="space-y-4 form-step-1"
                        >
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">
                              What's your email? <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="your.email@example.com"
                              value={formData.email}
                              onChange={handleChange}
                              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="subject" className="text-sm font-medium">
                              Subject (optional)
                            </Label>
                            <Input
                              id="subject"
                              name="subject"
                              placeholder="What is this regarding?"
                              value={formData.subject}
                              onChange={handleChange}
                              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                            />
                          </div>
                          <div className="flex justify-between">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={prevStep}
                            >
                              Back
                            </Button>
                            <Button 
                              type="button" 
                              onClick={nextStep}
                              className="group"
                              disabled={!formData.email}
                            >
                              Continue
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                          </div>
                        </motion.div>
                      )}
                      
                      {formStep === 2 && (
                        <motion.div
                          key="step2"
                          custom={-1}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="space-y-4 form-step-2"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="message" className="text-sm font-medium">
                                Your message <span className="text-red-500">*</span>
                              </Label>
                              {typingEffect && (
                                <span className="text-xs text-muted-foreground animate-pulse">
                                  Typing...
                                </span>
                              )}
                            </div>
                            <Textarea
                              ref={messageRef}
                              id="message"
                              name="message"
                              placeholder="Tell me about your project or idea..."
                              className="min-h-[150px] transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                              value={formData.message}
                              onChange={handleChange}
                            />
                            <p className="text-xs text-muted-foreground">
                              {formData.message.length} characters 
                              {formData.message.length > 0 && formData.message.length < 10 && " (could you provide more details?)"}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={prevStep}
                            >
                              Back
                            </Button>
                            <Button 
                              type="submit" 
                              className="group" 
                              onClick={handleSubmit}
                              disabled={isSubmitting || !formData.message}
                            >
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Sending...
                                </>
                              ) : (
                                <>
                                  Send Message
                                  <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </>
                              )}
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {/* Progress indicator */}
                    <div className="flex justify-center space-x-2 pt-4">
                      {[0, 1, 2].map((step) => (
                        <motion.div
                          key={step}
                          className={`h-2 rounded-full ${
                            step === formStep
                              ? "bg-primary w-8"
                              : step < formStep
                              ? "bg-primary/60 w-4"
                              : "bg-primary/20 w-4"
                          }`}
                          initial={false}
                          animate={{
                            width: step === formStep ? 32 : 16,
                            backgroundColor: 
                              step === formStep 
                                ? "rgba(var(--primary-rgb), 1)" 
                                : step < formStep 
                                  ? "rgba(var(--primary-rgb), 0.6)" 
                                  : "rgba(var(--primary-rgb), 0.2)"
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}