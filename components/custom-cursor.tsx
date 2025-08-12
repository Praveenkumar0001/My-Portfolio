'use client'
import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const cursorRef = useRef(null)
  
  useEffect(() => {
    // Skip for touch devices or server-side rendering
    if (typeof window === 'undefined' || window.matchMedia?.('(pointer: coarse)').matches) {
      return
    }
    
    const cursor = cursorRef.current
    if (!cursor) return
    
    // Handle mouse movement with single element
    const handleMouseMove = (e) => {
      requestAnimationFrame(() => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      })
    }
    
    // Handle interactive elements
    const handleInteraction = (e) => {
      const isClickable = 
        e.target.tagName === 'A' || 
        e.target.tagName === 'BUTTON' || 
        e.target.getAttribute('role') === 'button' ||
        e.target.classList.contains('clickable')
        
      cursor.classList.toggle('expanded', isClickable)
    }
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleInteraction)
    
    // Hide default cursor
    document.body.style.cursor = 'none'
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleInteraction)
      document.body.style.cursor = 'auto'
    }
  }, [])
  
  return (
    <div 
      ref={cursorRef}
      className="fixed top-0 left-0 z-50 pointer-events-none hidden md:block"
      style={{
        width: '40px',
        height: '40px',
        marginLeft: '-20px',
        marginTop: '-20px',
        borderRadius: '50%',
        border: '1px solid rgba(var(--color-primary), 0.3)',
        transition: 'width 0.2s, height 0.2s, background-color 0.2s',
      }}
    >
      <div 
        className="absolute top-1/2 left-1/2 w-5 h-5 -ml-2.5 -mt-2.5 rounded-full bg-primary opacity-50"
      />
    </div>
  )
}