"use client"

import { useEffect, useState, useRef } from "react"
import { ExternalLink, Github, ChevronLeft, ChevronRight, Search, X, Star, Code, Users, Award, Zap, BarChart } from "lucide-react"

export function Projects() {
  const [filter, setFilter] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProject, setSelectedProject] = useState(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [hoveredProject, setHoveredProject] = useState(null)
  const carouselRef = useRef(null)
  const [currentTab, setCurrentTab] = useState("overview")
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState({})

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
      screenshots: ["/api/placeholder/800/450", "/api/placeholder/800/450", "/api/placeholder/800/450"],
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
      screenshots: ["/api/placeholder/800/450", "/api/placeholder/800/450", "/api/placeholder/800/450"],
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
    }
    
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
      message: "Server error"
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
      screenshots: ["/api/placeholder/800/450", "/api/placeholder/800/450", "/api/placeholder/800/450"],
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
      screenshots: ["/api/placeholder/800/450", "/api/placeholder/800/450", "/api/placeholder/800/450"],
      stats: {
        vehicles: 350,
        routes: 1500,
        savings: "$45K/yr",
        efficiency: "+28%"
      },
      codeSnippet: `// Real-time vehicle tracking with Socket.io
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('join-fleet', async (fleetId) => {
    const hasAccess = await validateFleetAccess(socket.userId, fleetId);
    if (!hasAccess) {
      socket.emit('error', { message: 'Access denied' });
      return;
    }
    
    socket.join(\`fleet:\${fleetId}\`);
    
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
      screenshots: ["/api/placeholder/800/450", "/api/placeholder/800/450", "/api/placeholder/800/450"],
      stats: {
        users: 25000,
        workouts: 350,
        downloads: "50K+",
        retention: "85%"
      },
      codeSnippet: `// Health metrics tracking integration
import { useEffect } from 'react';
import { Platform } from 'react-native';
import AppleHealthKit from 'react-native-health';
import GoogleFit from 'react-native-google-fit';

export const useHealthTracking = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const initializeHealthTracking = async () => {
      if (Platform.OS === 'ios') {
        const permissions = {
          permissions: {
            read: [
              AppleHealthKit.Constants.Permissions.Steps,
              AppleHealthKit.Constants.Permissions.HeartRate,
            ],
          },
        };
        
        AppleHealthKit.initHealthKit(permissions, (error) => {
          if (error) {
            console.log('Error initializing Apple HealthKit: ', error);
            return;
          }
          fetchAppleHealthData();
        });
      } else if (Platform.OS === 'android') {
        const options = {
          scopes: [
            GoogleFit.Scopes.FITNESS_ACTIVITY_READ,
            GoogleFit.Scopes.HEART_RATE_READ,
          ],
        };
        
        GoogleFit.authorize(options)
          .then((res) => {
            if (res.success) {
              fetchGoogleFitData();
            }
          })
          .catch((error) => {
            console.log('Google Fit authorization error: ', error);
          });
      }
    };
    
    initializeHealthTracking();
  }, [dispatch]);
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
    }
    
    // Third stat
    if (stats.rating) {
      statItems.push({
        icon: 'rating',
        label: 'Rating',
        value: stats.rating
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
      {/* Enhanced container with better margins */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="space-y-8">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Projects</h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto max-w-[700px]">
              Explore my portfolio of web, mobile, and backend projects. Each project demonstrates my skills in different technologies and problem-solving approaches.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      filter === category
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className="relative w-full sm:w-[300px]">
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
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
              </div>
            </div>
            
            {filteredProjects.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">No projects found matching your criteria.</p>
                <button 
                  className="mt-4 px-4 py-2 border border-input bg-background rounded-md text-sm hover:bg-accent hover:text-accent-foreground"
                  onClick={() => {
                    setSearchTerm("")
                    setFilter("All")
                  }}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {filteredProjects.map((project) => (
                  <div
                    key={project.title}
                    className={`relative transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:-translate-y-1 ${
                      isFlipped[project.title] ? 'rotate-y-180' : ''
                    }`}
                    onMouseEnter={() => setHoveredProject(project.title)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <div className="overflow-hidden h-full rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-shadow duration-300">
                      {!isFlipped[project.title] ? (
                        <div className="h-full flex flex-col">
                          <div className="relative h-48 bg-muted overflow-hidden">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                            {project.featured && (
                              <span className="absolute top-2 right-2 inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                                Featured
                              </span>
                            )}
                          </div>
                          <div className="p-6">
                            <div className="space-y-1.5">
                              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                                {searchTerm ? highlightText(project.title, searchTerm) : project.title}
                              </h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {searchTerm ? highlightText(project.description, searchTerm) : project.description}
                              </p>
                            </div>
                          </div>
                          <div className="p-6 pt-0 flex-grow">
                            <div className="flex flex-wrap gap-2">
                              {project.tags.slice(0, 4).map((tag) => (
                                <span key={tag} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                  {searchTerm ? highlightText(tag, searchTerm) : tag}
                                </span>
                              ))}
                              {project.tags.length > 4 && (
                                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                  +{project.tags.length - 4} more
                                </span>
                              )}
                            </div>
                            {getStatComponents(project)}
                          </div>
                          <div className="flex items-center p-6 pt-0 justify-between">
                            <button 
                              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                              onClick={() => toggleFlip(project.title)}
                            >
                              More Info
                            </button>
                            <button 
                              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                              onClick={() => openProjectDetail(project)}
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex flex-col rotate-y-180">
                          <div className="p-6">
                            <div className="space-y-1.5">
                              <h3 className="text-2xl font-semibold leading-none tracking-tight">{project.title}</h3>
                              <p className="text-sm text-muted-foreground">Key Features</p>
                            </div>
                          </div>
                          <div className="p-6 pt-0 flex-grow">
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
                          </div>
                          <div className="flex items-center p-6 pt-0 justify-between">
                            <button 
                              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                              onClick={() => toggleFlip(project.title)}
                            >
                              Back
                            </button>
                            <button 
                              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                              onClick={() => openProjectDetail(project)}
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {isDetailOpen && selectedProject && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 rounded-lg max-h-[90vh] overflow-y-auto">
            <div className="flex flex-col space-y-1.5 text-center sm:text-left">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center">
                  {selectedProject.title}
                  {selectedProject.featured && (
                    <span className="ml-2 inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                      Featured
                    </span>
                  )}
                </h2>
                <button
                  onClick={() => setIsDetailOpen(false)}
                  className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground">
                {selectedProject.description}
              </p>
            </div>
            
            <div className="w-full">
              <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground w-full">
                <button
                  onClick={() => setCurrentTab("overview")}
                  className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex-1 ${
                    currentTab === "overview" ? "bg-background text-foreground shadow-sm" : ""
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setCurrentTab("code")}
                  className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex-1 ${
                    currentTab === "code" ? "bg-background text-foreground shadow-sm" : ""
                  }`}
                >
                  Code Example
                </button>
                <button
                  onClick={() => setCurrentTab("screenshots")}
                  className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex-1 ${
                    currentTab === "screenshots" ? "bg-background text-foreground shadow-sm" : ""
                  }`}
                >
                  Screenshots
                </button>
              </div>
              
              <div className="mt-4">
                {currentTab === "overview" && (
                  <div className="space-y-4 pt-4">
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
                          <span key={tag} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4 flex flex-col sm:flex-row gap-4">
                      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 gap-2">
                        <ExternalLink className="h-4 w-4" /> View Live
                      </button>
                      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-2">
                        <Github className="h-4 w-4" /> View Code
                      </button>
                    </div>
                  </div>
                )}
                
                {currentTab === "code" && (
                  <div className="pt-4">
                    <h3 className="text-lg font-semibold mb-2">Sample Code</h3>
                    <p className="text-sm text-muted-foreground mb-4">This is a key code sample from the project demonstrating a core feature or implementation detail.</p>
                    <div className="rounded-md bg-muted p-4 overflow-x-auto">
                      <pre className="text-sm">
                        <code>{selectedProject.codeSnippet}</code>
                      </pre>
                    </div>
                  </div>
                )}
                
                {currentTab === "screenshots" && (
                  <div className="pt-4">
                    <div className="relative rounded-md overflow-hidden">
                      <div className="aspect-[16/9] bg-muted relative">
                        <img
                          src={selectedProject.screenshots[carouselIndex]}
                          alt={`${selectedProject.title} screenshot ${carouselIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input bg-background/80 hover:bg-background/90 hover:text-accent-foreground h-10 w-10"
                        onClick={() => scrollCarousel('left')}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input bg-background/80 hover:bg-background/90 hover:text-accent-foreground h-10 w-10"
                        onClick={() => scrollCarousel('right')}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {selectedProject.screenshots.map((_, idx) => (
                          <button
                            key={idx}
                            className={`w-2 h-2 p-0 rounded-full transition-colors ${
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
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}