'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export function CustomCursor() {
  // Environment checks
  const isBrowser = typeof window !== 'undefined'
  const isTouch = isBrowser && window.matchMedia?.('(pointer: coarse)').matches

  // Early return for touch devices or server-side rendering
  if (isTouch || !isBrowser) {
    return null
  }

  // State & refs
  const [cursorVariant, setCursorVariant] = useState('default')
  const [cursorText, setCursorText] = useState('')
  const cursorRef = useRef(null)
  const cursorRingRef = useRef(null)
  const particlesRef = useRef([])
  const isClickAnimating = useRef(false)
  const positionCache = useRef({ x: 0, y: 0 })
  
  // Magnetism effect variables
  const magnetStrength = useRef(0)
  const magnetTarget = useRef({ x: 0, y: 0 })
  
  // Constants
  const PARTICLES_COUNT = 8
  const THROTTLE_MS = 5
  
  // Motion values with improved performance
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Spring config with improved responsiveness
  const springConfig = { damping: 35, stiffness: 1200, mass: 0.1 }
  const ringSpringConfig = { damping: 40, stiffness: 300, mass: 0.2 }
  
  // Use built-in framer-motion springs for better performance
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)
  const ringX = useSpring(mouseX, ringSpringConfig)
  const ringY = useSpring(mouseY, ringSpringConfig)
  
  // Rotation based on velocity for more natural movement
  const rotateX = useTransform(mouseY, (value, prev) => {
    const diff = value - prev
    return diff * 0.5
  })
  
  const rotateY = useTransform(mouseX, (value, prev) => {
    const diff = value - prev
    return diff * -0.5
  })

  // Debounced variant setter for better performance
  const setVariantDebounced = useCallback(
    (() => {
      let timeout
      return (variant, text = '') => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
          setCursorVariant(variant)
          setCursorText(text)
        }, 5)
      }
    })(),
    []
  )

  // Enhanced cursor variants
  const variants = useMemo(() => ({
    default: {
      width: 24,
      height: 24,
      backgroundColor: 'rgba(var(--primary-rgb), 0.2)',
      border: '2px solid rgba(var(--primary-rgb), 0.5)',
      mixBlendMode: 'difference'
    },
    hover: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(var(--primary-rgb), 0.15)',
      border: '2px solid rgba(var(--primary-rgb), 0.7)',
      mixBlendMode: 'normal'
    },
    image: {
      width: 100,
      height: 100,
      backgroundColor: 'transparent',
      border: '2px solid rgba(255, 255, 255, 0.8)',
      mixBlendMode: 'exclusion'
    },
    video: {
      width: 90,
      height: 90,
      backgroundColor: 'rgba(255, 50, 50, 0.1)',
      border: '2px solid rgba(255, 50, 50, 0.7)',
      mixBlendMode: 'normal'
    },
    text: {
      width: 8,
      height: 28,
      backgroundColor: 'rgba(var(--primary-rgb), 0.9)',
      border: '0px solid transparent',
      borderRadius: '1px',
      mixBlendMode: 'difference'
    },
    draggable: {
      width: 60,
      height: 60,
      backgroundColor: 'rgba(var(--primary-rgb), 0.15)',
      border: '2px dashed rgba(var(--primary-rgb), 0.7)',
      mixBlendMode: 'normal'
    },
    // New variant for code blocks
    code: {
      width: 16,
      height: 16,
      backgroundColor: 'rgba(80, 250, 120, 0.25)',
      border: '2px solid rgba(80, 250, 120, 0.7)',
      mixBlendMode: 'normal'
    },
    // New variant for form inputs
    input: {
      width: 14,
      height: 26,
      backgroundColor: 'rgba(var(--primary-rgb), 0.6)',
      border: '1px solid rgba(var(--primary-rgb), 0.8)',
      borderRadius: '1px',
      mixBlendMode: 'difference'
    },
  }), [])

  // Ring variants
  const ringVariants = useMemo(() => ({
    default: {
      width: 40,
      height: 40,
      border: '1px solid rgba(var(--primary-rgb), 0.3)',
      opacity: 0.6
    },
    hover: {
      width: 100,
      height: 100,
      border: '1px solid rgba(var(--primary-rgb), 0.4)',
      opacity: 0.8
    },
    image: {
      width: 130,
      height: 130,
      border: '1px solid rgba(255, 255, 255, 0.4)',
      opacity: 0.7
    },
    video: {
      width: 120,
      height: 120,
      border: '1px solid rgba(255, 50, 50, 0.4)',
      opacity: 0.6
    },
    text: {
      width: 14,
      height: 35,
      borderRadius: '2px',
      border: '1px solid rgba(var(--primary-rgb), 0.6)',
      opacity: 0.4
    },
    draggable: {
      width: 80,
      height: 80,
      border: '1px dashed rgba(var(--primary-rgb), 0.5)',
      opacity: 0.7
    },
    code: {
      width: 28,
      height: 28,
      border: '1px solid rgba(80, 250, 120, 0.4)',
      opacity: 0.6
    },
    input: {
      width: 22,
      height: 34,
      borderRadius: '2px',
      border: '1px solid rgba(var(--primary-rgb), 0.4)',
      opacity: 0.5
    }
  }), [])

  // Create enhanced particle effect on click
  const createParticles = useCallback((x, y) => {
    // Generate random hue for particles
    const baseHue = Math.floor(Math.random() * 360)
    
    for (let i = 0; i < PARTICLES_COUNT; i++) {
      const particle = particlesRef.current[i]
      if (!particle) continue
      
      // Random angle and speed with improved distribution
      const angle = Math.random() * Math.PI * 2
      const speed = 1 + Math.random() * 4
      const size = 2 + Math.random() * 5
      const lifetime = 300 + Math.random() * 700
      
      // Slightly randomize color for each particle
      const hue = (baseHue + Math.random() * 40 - 20) % 360
      const saturation = 80 + Math.random() * 20
      const lightness = 60 + Math.random() * 20
      
      // Set initial position and style
      particle.style.left = `${x}px`
      particle.style.top = `${y}px`
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.opacity = '1'
      particle.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`
      
      // Animate with smooth easing
      const dx = Math.cos(angle) * speed
      const dy = Math.sin(angle) * speed
      
      let startTime = performance.now()
      
      const animate = (now) => {
        const elapsed = now - startTime
        if (elapsed >= lifetime) {
          particle.style.opacity = '0'
          return
        }
        
        // Non-linear decay for more natural movement
        const progress = elapsed / lifetime
        const easeOutProgress = 1 - Math.pow(1 - progress, 3)
        const opacityProgress = 1 - easeOutProgress
        
        const left = parseFloat(particle.style.left)
        const top = parseFloat(particle.style.top)
        
        // Add slight gravity effect
        const gravityEffect = 0.05 * Math.pow(progress, 2)
        
        particle.style.left = `${left + dx * (1 - progress * 0.5)}px`
        particle.style.top = `${top + dy * (1 - progress * 0.5) + gravityEffect}px`
        particle.style.opacity = `${opacityProgress}`
        
        requestAnimationFrame(animate)
      }
      
      requestAnimationFrame(animate)
    }
  }, [PARTICLES_COUNT])

  useEffect(() => {
    if (isTouch) return
    
    let lastUpdateTime = 0
    let rafId = null
    let isUpdatePending = false
    
    // Track magnet elements
    const magnetElements = new Set()
    
    const applyMagnetism = (x, y) => {
      if (magnetStrength.current > 0) {
        // Apply magnetism effect with smooth easing
        const strength = magnetStrength.current
        x = x + (magnetTarget.current.x - x) * strength
        y = y + (magnetTarget.current.y - y) * strength
      }
      return { x, y }
    }
    
    const updateCursorPositions = (x, y) => {
      // Apply magnetism if active
      const adjustedPos = applyMagnetism(x, y)
      
      // Update position cache
      positionCache.current = adjustedPos
      
      // Update main cursor positions
      mouseX.set(adjustedPos.x)
      mouseY.set(adjustedPos.y)
      
      if (!isUpdatePending) {
        isUpdatePending = true
        rafId = requestAnimationFrame(() => {
          isUpdatePending = false
        })
      }
    }
    
    const handleMouseMove = (e) => {
      const now = performance.now()
      if (now - lastUpdateTime < THROTTLE_MS) return
      
      lastUpdateTime = now
      updateCursorPositions(e.clientX, e.clientY)
    }
    
    const handleMouseDown = () => {
      if (isClickAnimating.current) return
      isClickAnimating.current = true
      
      // Create particles at click position
      createParticles(positionCache.current.x, positionCache.current.y)
      
      // Apply scale directly to cursor element
      const cursor = cursorRef.current
      if (cursor) {
        cursor.style.transform = `translate(-50%, -50%) scale(0.8)`
        
        // Reset scale after animation
        setTimeout(() => {
          if (cursor) {
            cursor.style.transform = `translate(-50%, -50%) scale(1)`
          }
          isClickAnimating.current = false
        }, 70)
      }
    }
    
    // Fast element type lookup with enhanced categories
    const HOVER_ELEMENTS = new Set(['A', 'BUTTON', 'INPUT[type="button"]', 'INPUT[type="submit"]', 'SELECT'])
    const TEXT_ELEMENTS = new Set(['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'LI', 'LABEL'])
    const FORM_ELEMENTS = new Set(['INPUT[type="text"]', 'INPUT[type="email"]', 'INPUT[type="password"]', 'INPUT[type="search"]', 'TEXTAREA'])
    const CODE_ELEMENTS = new Set(['PRE', 'CODE'])
    
    // Apply magnetism to interactive elements
    const setupMagnetism = () => {
      // Find all interactive elements
      const magneticElements = document.querySelectorAll('a, button, [role="button"], .magnetic')
      
      magneticElements.forEach(el => {
        // Add data attribute to track these elements
        el.setAttribute('data-magnetic', 'true')
        magnetElements.add(el)
        
        const handleMouseEnterMagnetic = () => {
          const rect = el.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          
          magnetTarget.current = { x: centerX, y: centerY }
          
          // Start with gentle magnetism
          magnetStrength.current = 0
          
          // Gradually increase strength for smoother effect
          let strength = 0
          const targetStrength = 0.3
          const incrementStrength = () => {
            strength += 0.05
            magnetStrength.current = Math.min(strength, targetStrength)
            
            if (strength < targetStrength) {
              requestAnimationFrame(incrementStrength)
            }
          }
          
          requestAnimationFrame(incrementStrength)
        }
        
        const handleMouseLeaveMagnetic = () => {
          // Gradually decrease strength for smoother exit
          let strength = magnetStrength.current
          const decrementStrength = () => {
            strength -= 0.05
            magnetStrength.current = Math.max(0, strength)
            
            if (strength > 0) {
              requestAnimationFrame(decrementStrength)
            }
          }
          
          requestAnimationFrame(decrementStrength)
        }
        
        el.addEventListener('mouseenter', handleMouseEnterMagnetic)
        el.addEventListener('mouseleave', handleMouseLeaveMagnetic)
      })
    }
    
    // Set up magnetism with a small delay to ensure DOM is ready
    const magnetismSetupTimeout = setTimeout(setupMagnetism, 300)
    
    // Enhanced element detection with better type checking
    const getElementType = (target) => {
      const tagName = target.tagName
      const dataType = target.getAttribute('data-cursor-type')
      
      // First check for custom data attribute
      if (dataType) {
        return {
          type: dataType,
          text: target.getAttribute('data-cursor-text') || ''
        }
      }
      
      // Check for code elements
      if (CODE_ELEMENTS.has(tagName) || target.classList.contains('code') || target.closest('pre, code')) {
        return { type: 'code', text: '' }
      }
      
      // Check for input elements
      if (FORM_ELEMENTS.has(tagName) || 
          (tagName === 'INPUT' && ['text', 'email', 'password', 'search'].includes(target.type)) || 
          tagName === 'TEXTAREA') {
        return { type: 'input', text: '' }
      }
      
      // Check for images and videos
      if (tagName === 'IMG' || target.classList.contains('image')) {
        return { type: 'image', text: 'VIEW' }
      }
      
      if (tagName === 'VIDEO' || target.classList.contains('video-player')) {
        return { type: 'video', text: 'PLAY' }
      }
      
      // Check for text elements
      if (TEXT_ELEMENTS.has(tagName) && target.textContent?.trim().length > 0) {
        return { type: 'text', text: '' }
      }
      
      // Check for interactive elements
      if (HOVER_ELEMENTS.has(tagName) || 
          target.getAttribute('role') === 'button' ||
          target.classList.contains('interactive') ||
          (target.hasAttribute('tabindex') && target.getAttribute('tabindex') !== '-1') ||
          target.classList.contains('clickable')) {
        
        let buttonText = ''
        if (target.getAttribute('data-cursor-text')) {
          buttonText = target.getAttribute('data-cursor-text')
        } else if (target.textContent?.trim().length <= 10) {
          buttonText = target.textContent.trim()
        } else if (tagName === 'A') {
          buttonText = 'LINK'
        } else {
          buttonText = 'CLICK'
        }
        
        return { type: 'hover', text: buttonText }
      }
      
      // Check for draggable elements
      if (target.draggable || target.classList.contains('draggable')) {
        return { type: 'draggable', text: 'DRAG' }
      }
      
      return { type: 'default', text: '' }
    }
    
    // Implement event delegation for better performance
    const handleMouseOverOut = (e) => {
      if (isClickAnimating.current) return
      
      const isEnter = e.type === 'mouseover'
      
      if (!isEnter && e.relatedTarget === null) {
        setVariantDebounced('default')
        return
      }
      
      const target = e.target
      
      if (isEnter) {
        const { type, text } = getElementType(target)
        setVariantDebounced(type, text)
      } else {
        // Only reset if we're not entering another element with the same type
        if (e.relatedTarget) {
          const currentType = getElementType(target).type
          const nextType = getElementType(e.relatedTarget).type
          
          if (currentType !== nextType) {
            setVariantDebounced('default', '')
          }
        } else {
          setVariantDebounced('default', '')
        }
      }
    }
    
    // Add event listeners with improved performance
    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mousedown', handleMouseDown, { passive: true })
    document.addEventListener('mouseover', handleMouseOverOut, { passive: true })
    document.addEventListener('mouseout', handleMouseOverOut, { passive: true })
    
    // Initialize position
    if (isBrowser) {
      updateCursorPositions(window.innerWidth / 2, window.innerHeight / 2)
    }
    
    // Track cursor visibility with smoother transitions
    const handleVisibilityChange = () => {
      const cursor = cursorRef.current
      const ring = cursorRingRef.current
      
      if (document.hidden) {
        if (cursor) cursor.style.opacity = '0'
        if (ring) ring.style.opacity = '0'
      } else {
        setTimeout(() => {
          if (cursor) cursor.style.opacity = '1'
          if (ring) ring.style.opacity = '1'
        }, 300)
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    // Handle mouse leaving/entering the window with smooth transitions
    const handleMouseLeave = () => {
      const cursor = cursorRef.current
      const ring = cursorRingRef.current
      
      if (cursor) {
        cursor.style.transition = 'opacity 0.3s ease'
        cursor.style.opacity = '0'
      }
      if (ring) {
        ring.style.transition = 'opacity 0.3s ease'
        ring.style.opacity = '0'
      }
    }
    
    const handleMouseEnter = () => {
      const cursor = cursorRef.current
      const ring = cursorRingRef.current
      
      if (cursor) {
        cursor.style.transition = 'opacity 0.3s ease'
        cursor.style.opacity = '1'
      }
      if (ring) {
        ring.style.transition = 'opacity 0.3s ease'
        ring.style.opacity = '1'
      }
    }
    
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseover', handleMouseOverOut)
      document.removeEventListener('mouseout', handleMouseOverOut)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      
      // Clean up magnetic elements
      magnetElements.forEach(el => {
        el.removeAttribute('data-magnetic')
      })
      
      clearTimeout(magnetismSetupTimeout)
      
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [mouseX, mouseY, isTouch, setVariantDebounced, createParticles, THROTTLE_MS])

  return (
    <>
      {/* Cursor particles system with enhanced styling */}
      {Array(PARTICLES_COUNT).fill().map((_, index) => (
        <div
          key={`particle-${index}`}
          ref={el => particlesRef.current[index] = el}
          className="fixed z-50 rounded-full pointer-events-none"
          style={{
            position: 'fixed',
            width: '3px',
            height: '3px',
            backgroundColor: 'rgba(var(--primary-rgb), 0.8)',
            opacity: 0,
            transform: 'translate(-50%, -50%)',
            willChange: 'transform, opacity, left, top',
            transition: 'opacity 0.2s ease',
          }}
        />
      ))}
      
      {/* Main cursor ring with lag */}
      <motion.div
        ref={cursorRingRef}
        className="fixed top-0 left-0 z-40 hidden md:block pointer-events-none rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: 'transparent',
          willChange: 'transform, width, height',
          transition: 'opacity 0.3s ease',
        }}
        animate={cursorVariant}
        variants={ringVariants}
        transition={{
          type: "spring",
          bounce: 0.1,
          duration: 0.3,
        }}
      />
      
      {/* Main cursor element with rotation effect */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 z-50 hidden md:block pointer-events-none rounded-full"
        style={{
          x: smoothX,
          y: smoothY,
          rotateX: rotateX,
          rotateY: rotateY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform, width, height',
          transition: 'opacity 0.3s ease',
        }}
        animate={cursorVariant}
        variants={variants}
        transition={{
          type: "spring",
          bounce: 0.1,
          duration: 0.25,
        }}
      >
        {/* Text content for certain cursor types */}
        {(cursorVariant === 'hover' || cursorVariant === 'video' || cursorVariant === 'draggable' || cursorVariant === 'image') && cursorText && (
          <div className="w-full h-full rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-medium tracking-wide select-none opacity-90">
              {cursorText}
            </span>
          </div>
        )}
      </motion.div>
    </>
  )
}