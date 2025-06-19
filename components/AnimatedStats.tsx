"use client"

import { useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Trophy, Users, Coffee, Star } from "lucide-react"

export default function AnimatedStats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const stats = [
    { icon: Trophy, label: "Projects Completed", value: 150, suffix: "+" },
    { icon: Users, label: "Happy Clients", value: 98, suffix: "%" },
    { icon: Coffee, label: "Cups of Coffee", value: 1247, suffix: "" },
    { icon: Star, label: "Awards Won", value: 25, suffix: "+" },
  ]

  return (
    <section ref={ref} className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Our Achievements</h2>
          <p className="text-xl text-purple-100">Numbers that speak for our success</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6"
              >
                <stat.icon className="w-8 h-8 text-white" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                className="text-5xl font-bold text-white mb-2"
              >
                <AnimatedNumber value={stat.value} suffix={stat.suffix} isInView={isInView} delay={index * 0.2 + 0.5} />
              </motion.div>

              <p className="text-purple-100 text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AnimatedNumber({
  value,
  suffix,
  isInView,
  delay,
}: {
  value: number
  suffix: string
  isInView: boolean
  delay: number
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const timer = setTimeout(() => {
      let start = 0
      const end = value
      const duration = 2000
      const increment = end / (duration / 16)

      const counter = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(counter)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(counter)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [isInView, value, delay])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}
