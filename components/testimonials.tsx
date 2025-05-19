"use client"

import { useEffect } from "react"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export function Testimonials() {
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

  // Replace with actual testimonials
  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "CEO, TechStart",
      image: "/images/testimonial1.png",
      content:
        "Working with this developer was an absolute pleasure. They delivered our project on time and exceeded our expectations. Their attention to detail and problem-solving skills are impressive.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      position: "Marketing Director, GrowthBrand",
      image: "/images/testimonial2.png",
      content:
        "Our website redesign was a huge success thanks to this talented developer. They understood our vision perfectly and created a beautiful, functional site that has significantly increased our conversions.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      position: "Founder, CreativeStudio",
      image: "/images/testimonial3.png",
      content:
        "I've worked with many developers, but none have been as thorough and communicative. They took our outdated platform and transformed it into a modern, user-friendly experience.",
      rating: 4,
    },
    {
      name: "David Kim",
      position: "Product Manager, SoftSolutions",
      image: "/images/testimonial4.png",
      content:
        "An exceptional developer who delivers quality work consistently. They're not just technically skilled but also bring creative solutions to the table. I highly recommend their services.",
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="py-16 md:py-24">
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
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Clients Say</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Feedback from people I've worked with
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mx-auto max-w-5xl py-12"
        >
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 p-2">
                  <motion.div variants={itemVariants} className="h-full">
                    <Card className="h-full flex flex-col">
                      <CardContent className="pt-6 flex-1">
                        <div className="flex mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating
                                  ? "fill-primary text-primary"
                                  : "fill-muted text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                      </CardContent>
                      <CardFooter className="border-t p-6">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full overflow-hidden h-12 w-12 border">
                            <Image
                              src={testimonial.image || "/placeholder.svg"}
                              alt={testimonial.name}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex">
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  )
}
