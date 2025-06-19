"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"

interface RippleButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function RippleButton({ children, className = "", onClick }: RippleButtonProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
  const buttonRef = useRef<HTMLButtonElement>(null)

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return

    const button = buttonRef.current
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    const newRipple = {
      id: Date.now(),
      x,
      y,
    }

    setRipples((prev) => [...prev, newRipple])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
    }, 600)

    if (onClick) {
      onClick()
    }
  }

  return (
    <motion.button
      ref={buttonRef}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={createRipple}
      className={`relative overflow-hidden ${className}`}
    >
      {children}

      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{
            scale: 0,
            opacity: 0.6,
          }}
          animate={{
            scale: 4,
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="absolute bg-white rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 20,
            height: 20,
          }}
        />
      ))}
    </motion.button>
  )
}
