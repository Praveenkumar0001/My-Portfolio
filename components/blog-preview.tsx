"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Clock } from "lucide-react"

export function BlogPreview() {
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

  const blogPosts = [
    {
      title: "How to Build a Responsive Website with Tailwind CSS",
      excerpt:
        "Learn how to create a fully responsive website using Tailwind CSS, a utility-first CSS framework that makes styling your projects a breeze.",
      image: "/images/blog1.png",
      date: "May 15, 2023",
      readTime: "8 min read",
      category: "Web Development",
      slug: "responsive-website-tailwind-css",
    },
    {
      title: "The Future of JavaScript: What's Coming in 2023",
      excerpt:
        "Explore the upcoming features and improvements in JavaScript that will shape the way we write code in the coming year.",
      image: "/images/blog2.png",
      date: "April 22, 2023",
      readTime: "6 min read",
      category: "JavaScript",
      slug: "future-of-javascript-2023",
    },
    {
      title: "Optimizing Website Performance: A Comprehensive Guide",
      excerpt:
        "Discover practical techniques and best practices to improve your website's loading speed and overall performance.",
      image: "/images/blog3.png",
      date: "March 10, 2023",
      readTime: "10 min read",
      category: "Performance",
      slug: "optimizing-website-performance",
    },
  ]

  return (
    <section id="blog" className="py-16 md:py-24">
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
              Blog
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Latest Articles</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Insights, tutorials, and thoughts on web development and design
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"
        >
          {blogPosts.map((post, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
              <Card className="h-full flex flex-col overflow-hidden">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={600}
                    height={340}
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <Badge className="absolute top-2 right-2">{post.category}</Badge>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Link href={`/blog/${post.slug}`} className="w-full">
                    <Button variant="outline" className="w-full group">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center mt-8">
          <Link href="/blog">
            <Button size="lg" variant="outline" className="group">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
