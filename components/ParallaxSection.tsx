"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Cloud, Mountain, Trees } from "lucide-react"

export default function ParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300])

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-gradient-to-b from-blue-400 to-blue-600"
    >
      {/* Background Layer */}
      <motion.div style={{ y: y3 }} className="absolute inset-0 bg-gradient-to-b from-purple-400 to-blue-500">
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [0, Math.random() * 50 - 25],
                y: [0, Math.random() * 50 - 25],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <Cloud className="w-8 h-8 text-white" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Middle Layer */}
      <motion.div style={{ y: y2 }} className="absolute inset-0 flex items-end justify-center">
        <div className="flex space-x-8 mb-20">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
              }}
            >
              <Mountain className="w-16 h-16 text-gray-700" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Foreground Layer */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 flex items-end justify-around">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.3,
            }}
            className="mb-10"
          >
            <Trees className="w-12 h-12 text-green-600" />
          </motion.div>
        ))}
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          <h2 className="text-5xl font-bold mb-4">Parallax Magic</h2>
          <p className="text-xl opacity-90">Experience depth through motion</p>
        </motion.div>
      </div>
    </section>
  )
}
