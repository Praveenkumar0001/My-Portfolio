"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, ChevronLeft, ChevronRight, Search, X, Star, Code, Users, Award, Zap, BarChart } from "lucide-react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export function Projects() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const [filter, setFilter] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProject, setSelectedProject] = useState(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [hoveredProject, setHoveredProject] = useState(null)
  const carouselRef = useRef(null)
  const [currentTab, setCurrentTab] = useState("overview")
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState({})

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  // Animation variants
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

  const cardVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.03, y: -5 },
  }

  const searchVariants = {
    initial: { width: "100%" },
    focus: { width: "110%", x: "-5%" },
  }

  // Praveen's projects
  const projects = [
    {
      title: "Food Delivery Web",
      description:
        "A food delivery platform with JWT-based authentication, dynamic menu, ordering system, and admin features for managing orders and menu items.",
      image: "/images/food_delivery.jpg",
      tags: ["Javascript","React.js", "Node.js", "JWT", "Express.js", "MongoDB", "Nodemailer"],
      category: "Web",
      liveUrl: "https://food-delivery-web.example.com",
      githubUrl: "https://github.com/PraveenKumar0001/food-delivery-web",
      featured: true,
      longDescription: "This comprehensive food delivery platform features secure user authentication using JWT tokens, an intuitive ordering system with real-time updates, and a dynamic menu management system. The admin dashboard provides powerful tools for order tracking, inventory management, and sales analytics. The platform also includes email notifications for order status updates and account activities using Nodemailer.",
      achievements: ["Reduced order processing time by 40%", "Increased customer retention by 25%", "Improved order accuracy to 99.5%"],
      screenshots: ["/images/project1.png", "/images/project1-2.png", "/images/project1-3.png"],
      stats: {
        users: 5000,
        orders: 25000,
        rating: 4.8,
        revenue: "$150K+"
      },
      codeSnippet: `// Order processing middleware
const processOrder = async (req, res, next) => {
  try {
    const { items, deliveryAddress, paymentMethod } = req.body;
    
    // Calculate total price
    const totalPrice = await calculateOrderTotal(items);
    
    // Create new order
    const order = new Order({
      user: req.user.id,
      items,
      deliveryAddress,
      paymentMethod,
      totalPrice,
      status: 'processing'
    });
    
    await order.save();
    
    // Send confirmation email
    await sendOrderConfirmation(req.user.email, order);
    
    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};`
    },
    {
      title: "MERN E-commerce Website",
      description:
        "A full-stack e-commerce platform with secure user authentication, product management, and Stripe-based payment processing with a 98% success rate.",
      image: "/images/project2.png",
      tags: ["Javascript","Node.js", "Express", "Mongoose", "React", "Redux", "MongoDB"],
      category: "Web",
      liveUrl: "https://mern-ecommerce.example.com",
      githubUrl: "https://github.com/PraveenKumar0001/my-mern-ecommerce-web",
      featured: true,
      longDescription: "This full-stack e-commerce solution offers comprehensive features including secure authentication, shopping cart functionality, wishlist management, and Stripe payment integration. The platform includes an advanced product filtering system, user reviews, and rating functionality. Admin features include inventory management, sales reporting, and user management capabilities.",
      achievements: ["98% payment processing success rate", "35% increase in conversion rate", "Reduced page load time by 60%"],
      screenshots: ["/images/project2.png", "/images/project2-2.png", "/images/project2-3.png"],
      stats: {
        users: 7500,
        products: 1200,
        rating: 4.9,
        revenue: "$250K+"
      },
      codeSnippet: `// Product search and filter functionality
const searchProducts = async (req, res) => {
  try {
    const { keyword, category, minPrice, maxPrice, sort } = req.query;
    
    // Build query
    const query = {};
    
    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ];
    }
    
    if (category) {
      query.category = category;
    }
    
    if (minPrice && maxPrice) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice) {
      query.price = { $gte: minPrice };
    } else if (maxPrice) {
      query.price = { $lte: maxPrice };
    }
    
    // Build sort options
    const sortOptions = {};
    if (sort === 'price-asc') sortOptions.price = 1;
    if (sort === 'price-desc') sortOptions.price = -1;
    if (sort === 'newest') sortOptions.createdAt = -1;
    if (sort === 'rating') sortOptions.rating = -1;
    
    const products = await Product.find(query)
      .sort(sortOptions)
      .limit(req.query.limit || 12);
      
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};`
    },
    {
      title: "AksIT Solutions Website",
      description:
        "Created a comprehensive website with landing page, projects section, payment processing, and contact forms that improved user engagement by 25%.",
      image: "/images/project3.png",
      tags: ["Node.js", "HTML/CSS", "JavaScript", "MySQL"],
      category: "Web",
      liveUrl: "https://aksit-solutions.example.com",
      githubUrl: "https://github.com/Praveenkumar0001/Aks-final-web.io",
      featured: false,
      longDescription: "This corporate website showcases the company's services, projects, and team with a modern, responsive design. Features include integrated payment processing for services, advanced contact forms with validation, and a dynamic projects portfolio. The site incorporates SEO best practices and performance optimization techniques.",
      achievements: ["25% improvement in user engagement", "40% increase in contact form submissions", "15% higher conversion rate for service inquiries"],
      screenshots: ["/images/project3.png", "/images/project3-2.png", "/images/project3-3.png"],
      stats: {
        clients: 120,
        projects: 200,
        rating: 4.7,
        pageViews: "45K/mo"
      },
      codeSnippet: `// Contact form validation and submission
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  
  // Validate inputs
  const errors = [];
  
  if (!name) errors.push('Name is required');
  if (!email) errors.push('Email is required');
  if (!isValidEmail(email)) errors.push('Please enter a valid email');
  if (!message) errors.push('Message is required');
  
  // Display errors if any
  if (errors.length > 0) {
    showErrors(errors);
    return;
  }
  
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, message })
    });
    
    const data = await response.json();
    
    if (data.success) {
      showSuccessMessage('Message sent successfully!');
      resetForm();
    } else {
      showErrors([data.message]);
    }
  } catch (error) {
    showErrors(['Server error. Please try again later.']);
  }
});`
    },
    {
      title: "Event Management System",
      description:
        "Developed a comprehensive fleet management system with real-time tracking, maintenance scheduling, and fuel consumption analytics.",
      image: "/images/image.png",
      tags: ["Javascript","React", "Node.js", "MongoDB", "Google Maps API", "Socket.io"],
      category: "Web",
      liveUrl: "https://fleet-management.example.com",
      githubUrl: "https://github.com/Praveenkumar0001/EventSphere",
      featured: true,
      longDescription: "This fleet management solution provides real-time vehicle tracking, maintenance scheduling, driver management, and fuel consumption analytics. The system includes route optimization, automated maintenance alerts, and comprehensive reporting tools. The dashboard offers customizable views for different user roles.",
      achievements: ["Reduced fuel costs by 18%", "Improved maintenance compliance by 45%", "Decreased route planning time by 30%"],
      screenshots: ["/images/project4.png", "/images/project4-2.png", "/images/project4-3.png"],
      stats: {
        vehicles: 350,
        routes: 1500,
        savings: "$45K/yr",
        efficiency: "+28%"
      },
      codeSnippet: `// Real-time vehicle tracking with Socket.io
// Server-side code
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('join-fleet', async (fleetId) => {
    // Validate user has access to this fleet
    const hasAccess = await validateFleetAccess(socket.userId, fleetId);
    if (!hasAccess) {
      socket.emit('error', { message: 'Access denied' });
      return;
    }
    
    socket.join(\`fleet:\${fleetId}\`);
    console.log(\`User \${socket.userId} joined fleet \${fleetId}\`);
    
    // Send initial vehicle positions
    const vehicles = await Vehicle.find({ fleetId });
    socket.emit('vehicles-initial', vehicles);
  });
  
  socket.on('update-location', async (data) => {
    const { vehicleId, latitude, longitude, speed, heading } = data;
    
    // Update vehicle location in database
    await Vehicle.findByIdAndUpdate(vehicleId, {
      location: {
        type: 'Point',
        coordinates: [longitude, latitude]
      },
      speed,
      heading,
      lastUpdated: new Date()
    });
    
    // Get vehicle fleet ID
    const vehicle = await Vehicle.findById(vehicleId);
    
    // Broadcast to everyone monitoring this fleet
    io.to(\`fleet:\${vehicle.fleetId}\`).emit('vehicle-updated', {
      vehicleId,
      latitude,
      longitude,
      speed,
      heading,
      lastUpdated: new Date()
    });
  });
});`
    },
    {
      title: "SocialSphere",
      description: 
        "A React Native fitness application with workout planning, progress tracking, nutrition monitoring, and social features.",
      image: "/images/Social-sphere.jpg",
      tags: ["React Native", "Firebase", "Redux", "Typescript","Next.js"],
      category: "Mobile",
      liveUrl: "https://fitness-app.example.com",
      githubUrl: "https://github.com/Praveenkumar0001/SocialSphere",
      featured: false,
      longDescription: "This comprehensive fitness application allows users to create custom workout plans, track progress with detailed metrics, monitor nutrition, and connect with other fitness enthusiasts. Features include workout demonstrations, achievement badges, and integration with health tracking devices.",
      achievements: ["4.8/5 app store rating", "85% user retention after 3 months", "Featured in 'Best Fitness Apps 2024'"],
      screenshots: ["/images/project5.png", "/images/project5-2.png", "/images/project5-3.png"],
      stats: {
        users: 25000,
        workouts: 350,
        downloads: "50K+",
        retention: "85%"
      },
      codeSnippet: `// Health metrics tracking integration with React Native
import { useEffect } from 'react';
import { Platform } from 'react-native';
import AppleHealthKit from 'react-native-health';
import GoogleFit from 'react-native-google-fit';
import { useDispatch } from 'react-redux';
import { updateHealthData } from '../redux/actions/healthActions';

export const useHealthTracking = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const initializeHealthTracking = async () => {
      if (Platform.OS === 'ios') {
        // Configure Apple HealthKit
        const permissions = {
          permissions: {
            read: [
              AppleHealthKit.Constants.Permissions.Steps,
              AppleHealthKit.Constants.Permissions.DistanceWalking,
              AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
              AppleHealthKit.Constants.Permissions.HeartRate,
            ],
          },
        };
        
        AppleHealthKit.initHealthKit(permissions, (error) => {
          if (error) {
            console.log('Error initializing Apple HealthKit: ', error);
            return;
          }
          
          // Start fetching health data
          fetchAppleHealthData();
        });
      } else if (Platform.OS === 'android') {
        // Configure Google Fit
        const options = {
          scopes: [
            GoogleFit.Scopes.FITNESS_ACTIVITY_READ,
            GoogleFit.Scopes.FITNESS_BODY_READ,
            GoogleFit.Scopes.HEART_RATE_READ,
          ],
        };
        
        GoogleFit.authorize(options)
          .then((res) => {
            if (res.success) {
              // Start fetching health data
              fetchGoogleFitData();
            } else {
              console.log('Failed to authorize Google Fit');
            }
          })
          .catch((error) => {
            console.log('Google Fit authorization error: ', error);
          });
      }
    };
    
    initializeHealthTracking();
    
    return () => {
      // Cleanup if needed
      if (Platform.OS === 'android') {
        GoogleFit.unsubscribeListeners();
      }
    };
  }, [dispatch]);
  
  const fetchAppleHealthData = () => {
    // Get today's steps
    AppleHealthKit.getStepCount(
      { date: new Date().toISOString() },
      (err, results) => {
        if (err) {
          console.log('Error getting steps: ', err);
          return;
        }
        
        dispatch(updateHealthData({ steps: results.value }));
      }
    );
    
    // Get heart rate
    const options = {
      unit: 'bpm',
      startDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
      endDate: new Date().toISOString(),
      ascending: false,
      limit: 1,
    };
    
    AppleHealthKit.getHeartRateSamples(options, (err, results) => {
      if (err) {
        console.log('Error getting heart rate: ', err);
        return;
      }
      
      if (results.length > 0) {
        dispatch(updateHealthData({ heartRate: results[0].value }));
      }
    });
    
    // Get active calories
    AppleHealthKit.getActiveEnergyBurned(
      {
        startDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
        endDate: new Date().toISOString(),
      },
      (err, results) => {
        if (err) {
          console.log('Error getting calories: ', err);
          return;
        }
        
        const totalCalories = results.reduce((sum, item) => sum + item.value, 0);
        dispatch(updateHealthData({ calories: totalCalories }));
      }
    );
  };
  
  const fetchGoogleFitData = () => {
    const options = {
      startDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
      endDate: new Date().toISOString(),
    };
    
    // Get steps
    GoogleFit.getDailyStepCountSamples(options)
      .then((res) => {
        const stepsEstimate = res.find(
          (source) => source.source === 'com.google.android.gms:estimated_steps'
        );
        
        if (stepsEstimate && stepsEstimate.steps.length > 0) {
          const steps = stepsEstimate.steps[0].value;
          dispatch(updateHealthData({ steps }));
        }
      })
      .catch((err) => {
        console.log('Error getting step count: ', err);
      });
    
    // Get heart rate
    GoogleFit.getHeartRateSamples(options)
      .then((res) => {
        if (res.length > 0) {
          // Get the latest heart rate reading
          const latestReading = res[res.length - 1];
          dispatch(updateHealthData({ heartRate: latestReading.value }));
        }
      })
      .catch((err) => {
        console.log('Error getting heart rate: ', err);
      });
    
    // Get calories
    GoogleFit.getDailyCalorieSamples(options)
      .then((res) => {
        if (res.length > 0) {
          const calories = res.reduce((sum, item) => sum + item.calorie, 0);
          dispatch(updateHealthData({ calories }));
        }
      })
      .catch((err) => {
        console.log('Error getting calories: ', err);
      });
  };
};`
    },
    {
      title: "Job Driver",
      description:
        "Built a scalable RESTful API service with advanced authentication, rate limiting, and comprehensive documentation.",
      image: "/images/project6.png",
      tags: ["Javascript","Node.js", "Express", "MongoDB", "JWT"],
      category: "Backend",
      liveUrl: "https://api-service.example.com",
      githubUrl: "https://github.com/Praveenkumar0001/JobDriver",
      featured: false,
      longDescription: "This robust API service features role-based access control, comprehensive authentication mechanisms, rate limiting, and detailed documentation. The architecture supports horizontal scaling and includes thorough testing. The API handles over 1 million requests daily with 99.9% uptime.",
      achievements: ["99.9% uptime", "60% reduction in response time", "Handles 1M+ daily requests"],
      screenshots: ["/images/project6.png", "/images/project6-2.png", "/images/project6-3.png"],
      stats: {
        endpoints: 75,
        requests: "1M+/day",
        uptime: "99.9%",
        response: "120ms avg."
      },
      codeSnippet: `// Rate limiting middleware for Express
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const Redis = require('ioredis');

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

// Configure different rate limits based on endpoint sensitivity
const createRateLimiter = (windowMs, max, keyGenerator = undefined) => {
  return rateLimit({
    store: new RedisStore({
      // @ts-ignore - Known issue with @types/rate-limit-redis
      sendCommand: (...args) => redisClient.call(...args),
    }),
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: keyGenerator || ((req) => {
      // Use different identifiers based on auth status
      if (req.user) {
        return \`user_\${req.user.id}\`;
      }
      
      // For non-authenticated requests, use IP
      return req.ip;
    }),
    handler: (req, res) => {
      res.status(429).json({
        success: false,
        message: 'Too many requests, please try again later.',
        retryAfter: Math.ceil(windowMs / 1000 / 60),
      });
    },
  });
};

// General API rate limit - 100 requests per minute
const generalLimiter = createRateLimiter(60 * 1000, 100);

// Authentication endpoints - 10 attempts per minute
const authLimiter = createRateLimiter(60 * 1000, 10, (req) => \`auth_\${req.ip}\`);

// Sensitive operations - 5 requests per minute
const sensitiveLimiter = createRateLimiter(60 * 1000, 5);

module.exports = {
  generalLimiter,
  authLimiter,
  sensitiveLimiter,
};`
    }
  ]

  const categories = ["All", "Web", "Mobile", "Backend", "Featured"]
  
  const filteredProjects = projects
    .filter(project => 
      (filter === "All" || 
      (filter === "Featured" && project.featured) || 
      project.category === filter) &&
      (searchTerm === "" || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    )

  const openProjectDetail = (project) => {
    setSelectedProject(project)
    setIsDetailOpen(true)
    setCarouselIndex(0)
  }

  const scrollCarousel = (direction) => {
    if (selectedProject) {
      const maxIndex = selectedProject.screenshots.length - 1
      if (direction === 'left') {
        setCarouselIndex(prev => (prev > 0 ? prev - 1 : maxIndex))
      } else {
        setCarouselIndex(prev => (prev < maxIndex ? prev + 1 : 0))
      }
    }
  }

  const highlightText = (text, term) => {
    if (!term.trim()) return text
    
    const regex = new RegExp(`(${term})`, 'gi')
    return text.split(regex).map((part, index) => 
      regex.test(part) ? <span key={index} className="bg-primary/20 text-primary font-medium">{part}</span> : part
    )
  }

  const toggleFlip = (title) => {
    setIsFlipped(prev => ({
      ...prev,
      [title]: !prev[title]
    }))
  }

  // Custom stats icon components
  const StatIcon = ({ type }) => {
    switch (type) {
      case 'users':
        return <Users className="h-4 w-4" />
      case 'rating':
        return <Star className="h-4 w-4" />
      case 'code':
        return <Code className="h-4 w-4" />
      case 'performance':
        return <Zap className="h-4 w-4" />
      case 'analytics':
        return <BarChart className="h-4 w-4" />
      default:
        return <Award className="h-4 w-4" />
    }
  }

  // Stats mapping for different project types
  const getStatComponents = (project) => {
    const stats = project.stats
    if (!stats) return null
    
    // Define what to render based on project category
    const statItems = []
    
    // First stat
    if (stats.users) {
      statItems.push({
        icon: 'users',
        label: 'Users',
        value: stats.users
      })
    } else if (stats.vehicles) {
      statItems.push({
        icon: 'analytics',
        label: 'Vehicles',
        value: stats.vehicles
      })
    } else if (stats.clients) {
      statItems.push({
        icon: 'users',
        label: 'Clients',
        value: stats.clients
      })
    } else if (stats.endpoints) {
      statItems.push({
        icon: 'code',
        label: 'Endpoints',
        value: stats.endpoints
      })
    }
    
    // Second stat
    if (stats.orders) {
      statItems.push({
        icon: 'analytics',
        label: 'Orders',
        value: stats.orders
      })
    } else if (stats.products) {
      statItems.push({
        icon: 'analytics',
        label: 'Products',
        value: stats.products
      })
    } else if (stats.projects) {
      statItems.push({
        icon: 'analytics',
        label: 'Projects',
        value: stats.projects
      })
    } else if (stats.workouts) {
      statItems.push({
        icon: 'analytics',
        label: 'Workouts',
        value: stats.workouts
      })
    } else if (stats.routes) {
      statItems.push({
        icon: 'analytics',
        label: 'Routes',
        value: stats.routes
      })
    } else if (stats.requests) {
      statItems.push({
        icon: 'performance',
        label: 'Requests',
        value: stats.requests
      })
    }
    
    // Third stat
    if (stats.rating) {
      statItems.push({
        icon: 'rating',
        label: 'Rating',
        value: stats.rating
      })
    } else if (stats.uptime) {
      statItems.push({
        icon: 'performance',
        label: 'Uptime',
        value: stats.uptime
      })
    } else if (stats.retention) {
      statItems.push({
        icon: 'users',
        label: 'Retention',
        value: stats.retention
      })
    }
    
    // Fourth stat
    if (stats.revenue) {
      statItems.push({
        icon: 'analytics',
        label: 'Revenue',
        value: stats.revenue
      })
    } else if (stats.pageViews) {
      statItems.push({
        icon: 'analytics',
        label: 'Views',
        value: stats.pageViews
      })
    } else if (stats.downloads) {
      statItems.push({
        icon: 'analytics',
        label: 'Downloads',
        value: stats.downloads
      })
    } else if (stats.savings) {
      statItems.push({
        icon: 'analytics',
        label: 'Savings',
        value: stats.savings
      })
    } else if (stats.efficiency) {
      statItems.push({
        icon: 'performance',
        label: 'Efficiency',
        value: stats.efficiency
      })
    } else if (stats.response) {
      statItems.push({
        icon: 'performance',
        label: 'Response',
        value: stats.response
      })
    }
    
    return (
      <div className="grid grid-cols-4 gap-2 mt-3">
        {statItems.map((stat, index) => (
          <div key={index} className="flex flex-col items-center justify-center p-2 bg-muted/30 rounded-md">
            <div className="flex items-center justify-center w-8 h-8 mb-1 bg-primary/10 rounded-full text-primary">
              <StatIcon type={stat.icon} />
            </div>
            <span className="text-xs text-muted-foreground">{stat.label}</span>
            <span className="font-semibold text-sm">{stat.value}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <section id="projects" className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-muted/80 overflow-hidden">
      <div className="container px-4 md:px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="space-y-8"
        >
          <motion.div variants={titleVariants} className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Projects</h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto max-w-[700px]">
              Explore my portfolio of web, mobile, and backend projects. Each project demonstrates my skills in different technologies and problem-solving approaches.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Tabs defaultValue="All" className="w-full sm:w-auto" onValueChange={setFilter}>
                <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full sm:w-auto">
                  {categories.map((category) => (
                    <TabsTrigger key={category} value={category}>
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              
              <motion.div 
                initial="initial"
                whileFocus="focus"
                variants={searchVariants}
                className="relative w-full sm:w-[300px]"
              >
                <Input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full pl-10 pr-4"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </motion.div>
            </div>
            
            {filteredProjects.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">No projects found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("")
                    setFilter("All")
                  }}
                >
                  Clear filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.title}
                    initial="initial"
                    whileHover="hover"
                    variants={cardVariants}
                    onMouseEnter={() => setHoveredProject(project.title)}
                    onMouseLeave={() => setHoveredProject(null)}
                    className="relative"
                  >
                    <Card className={cn(
                      "overflow-hidden h-full transition-all duration-300 cursor-pointer transform",
                      isFlipped[project.title] ? "rotate-y-180" : ""
                    )}>
                      {!isFlipped[project.title] ? (
                        <div className="h-full flex flex-col">
                          <div className="relative h-48 bg-muted overflow-hidden">
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              className="object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                            {project.featured && (
                              <Badge className="absolute top-2 right-2 bg-primary">Featured</Badge>
                            )}
                          </div>
                          <CardHeader className="p-4">
                            <CardTitle className="text-xl">
                              {searchTerm ? highlightText(project.title, searchTerm) : project.title}
                            </CardTitle>
                            <CardDescription className="line-clamp-2">
                              {searchTerm ? highlightText(project.description, searchTerm) : project.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="p-4 pt-0 flex-grow">
                            <div className="flex flex-wrap gap-2">
                              {project.tags.slice(0, 4).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {searchTerm ? highlightText(tag, searchTerm) : tag}
                                </Badge>
                              ))}
                              {project.tags.length > 4 && (
                                <Badge variant="outline" className="text-xs">+{project.tags.length - 4} more</Badge>
                              )}
                            </div>
                            {getStatComponents(project)}
                          </CardContent>
                          <CardFooter className="p-4 pt-0 flex justify-between">
                            <Button variant="outline" size="sm" onClick={() => toggleFlip(project.title)}>
                              More Info
                            </Button>
                            <Button size="sm" onClick={() => openProjectDetail(project)}>
                              View Details
                            </Button>
                          </CardFooter>
                        </div>
                      ) : (
                        <div className="h-full flex flex-col rotate-y-180">
                          <CardHeader className="p-4">
                            <CardTitle className="text-xl">{project.title}</CardTitle>
                            <CardDescription>Key Features</CardDescription>
                          </CardHeader>
                          <CardContent className="p-4 pt-0 flex-grow">
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              {project.longDescription.split('. ').slice(0, 4).map((item, idx) => (
                                <li key={idx}>{item}.</li>
                              ))}
                            </ul>
                            <div className="mt-4">
                              <h4 className="text-sm font-semibold mb-2">Achievements</h4>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                {project.achievements.slice(0, 3).map((item, idx) => (
                                  <li key={idx}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                          <CardFooter className="p-4 pt-0 flex justify-between">
                            <Button variant="outline" size="sm" onClick={() => toggleFlip(project.title)}>
                              Back
                            </Button>
                            <Button size="sm" onClick={() => openProjectDetail(project)}>
                              View Details
                            </Button>
                          </CardFooter>
                        </div>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center justify-between">
                  {selectedProject.title}
                  {selectedProject.featured && (
                    <Badge className="ml-2 bg-primary">Featured</Badge>
                  )}
                </DialogTitle>
                <DialogDescription>
                  {selectedProject.description}
                </DialogDescription>
              </DialogHeader>
              
              <Tabs value={currentTab} onValueChange={setCurrentTab}>
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="code">Code Example</TabsTrigger>
                  <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4 pt-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">
                      {selectedProject.longDescription}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Key Achievements</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedProject.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <Button asChild className="flex items-center gap-2">
                      <Link href={selectedProject.liveUrl} target="_blank">
                        <ExternalLink className="h-4 w-4" /> View Live
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="flex items-center gap-2">
                      <Link href={selectedProject.githubUrl} target="_blank">
                        <Github className="h-4 w-4" /> View Code
                      </Link>
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="code" className="pt-4">
                  <h3 className="text-lg font-semibold mb-2">Sample Code</h3>
                  <p className="text-sm text-muted-foreground mb-4">This is a key code sample from the project demonstrating a core feature or implementation detail.</p>
                  <div className="rounded-md bg-muted p-4 overflow-x-auto">
                    <pre className="text-sm">
                      <code>{selectedProject.codeSnippet}</code>
                    </pre>
                  </div>
                </TabsContent>
                
                <TabsContent value="screenshots" className="pt-4">
                  <div className="relative rounded-md overflow-hidden">
                    <div className="aspect-[16/9] bg-muted relative">
                      <Image
                        src={selectedProject.screenshots[carouselIndex]}
                        alt={`${selectedProject.title} screenshot ${carouselIndex + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
                      onClick={() => scrollCarousel('left')}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
                      onClick={() => scrollCarousel('right')}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                      {selectedProject.screenshots.map((_, idx) => (
                        <Button
                          key={idx}
                          variant="ghost"
                          size="sm"
                          className={`w-2 h-2 p-0 rounded-full ${
                            idx === carouselIndex ? 'bg-primary' : 'bg-muted'
                          }`}
                          onClick={() => setCarouselIndex(idx)}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-center text-sm mt-2 text-muted-foreground">
                    {carouselIndex + 1} / {selectedProject.screenshots.length}
                  </p>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}