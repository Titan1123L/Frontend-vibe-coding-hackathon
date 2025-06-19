"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Ripple {
  id: number
  x: number
  y: number
  timestamp: number
}

interface MouseRippleEffectProps {
  maxRipples?: number
  rippleDuration?: number
  rippleSize?: number
  enabled?: boolean
  intensity?: "low" | "medium" | "high"
}

export default function MouseRippleEffect({
  maxRipples = 5,
  rippleDuration = 1000,
  rippleSize = 100,
  enabled = true,
  intensity = "medium",
}: MouseRippleEffectProps) {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseMoving, setIsMouseMoving] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseTimeoutRef = useRef<NodeJS.Timeout>()
  const lastRippleTime = useRef(0)

  // Throttle ripple creation based on intensity
  const getThrottleDelay = () => {
    switch (intensity) {
      case "low":
        return 200
      case "medium":
        return 100
      case "high":
        return 50
      default:
        return 100
    }
  }

  useEffect(() => {
    if (!enabled) return

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      const throttleDelay = getThrottleDelay()

      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsMouseMoving(true)

      // Clear existing timeout
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current)
      }

      // Set timeout to detect when mouse stops moving
      mouseTimeoutRef.current = setTimeout(() => {
        setIsMouseMoving(false)
      }, 150)

      // Throttle ripple creation
      if (now - lastRippleTime.current > throttleDelay) {
        createRipple(e.clientX, e.clientY)
        lastRippleTime.current = now
      }
    }

    const handleMouseClick = (e: MouseEvent) => {
      if (!enabled) return
      // Create a larger ripple on click
      createRipple(e.clientX, e.clientY, true)
    }

    const createRipple = (x: number, y: number, isClick = false) => {
      const newRipple: Ripple = {
        id: Date.now() + Math.random(),
        x,
        y,
        timestamp: Date.now(),
      }

      setRipples((prev) => {
        const updated = [...prev, newRipple]
        // Keep only the most recent ripples
        return updated.slice(-maxRipples)
      })

      // Remove ripple after animation completes
      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
      }, rippleDuration + 100)
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("click", handleMouseClick, { passive: true })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("click", handleMouseClick)
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current)
      }
    }
  }, [enabled, maxRipples, rippleDuration, intensity])

  if (!enabled) return null

  return (
    <>
      {/* Ripple Container */}
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
        style={{ mixBlendMode: "screen" }}
      >
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.div
              key={ripple.id}
              initial={{
                scale: 0,
                opacity: 0.8,
                x: ripple.x - rippleSize / 2,
                y: ripple.y - rippleSize / 2,
              }}
              animate={{
                scale: [0, 1.5, 3],
                opacity: [0.8, 0.4, 0],
                x: ripple.x - rippleSize / 2,
                y: ripple.y - rippleSize / 2,
              }}
              exit={{
                scale: 3,
                opacity: 0,
              }}
              transition={{
                duration: rippleDuration / 1000,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="absolute rounded-full"
              style={{
                width: rippleSize,
                height: rippleSize,
                background: `
                  radial-gradient(
                    circle,
                    rgba(139, 92, 246, 0.3) 0%,
                    rgba(59, 130, 246, 0.2) 30%,
                    rgba(147, 51, 234, 0.1) 60%,
                    transparent 100%
                  )
                `,
                boxShadow: `
                  0 0 20px rgba(139, 92, 246, 0.3),
                  0 0 40px rgba(59, 130, 246, 0.2),
                  inset 0 0 20px rgba(147, 51, 234, 0.1)
                `,
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Mouse Cursor Enhancement */}
      <motion.div
        className="fixed pointer-events-none z-40 mix-blend-difference"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isMouseMoving ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        <div className="w-3 h-3 bg-white rounded-full opacity-80" />
      </motion.div>

      {/* Larger cursor ring */}
      <motion.div
        className="fixed pointer-events-none z-39 mix-blend-difference"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isMouseMoving ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 0.8,
        }}
      >
        <div className="w-10 h-10 border border-white rounded-full opacity-40" />
      </motion.div>
    </>
  )
}
