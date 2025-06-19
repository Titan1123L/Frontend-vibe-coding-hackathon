"use client"

import { motion } from "framer-motion"
import { Bell, Gift, Star, Zap, Heart, Award } from "lucide-react"

export default function ScrollPopups() {
  const popupItems = [
    {
      icon: Bell,
      title: "New Feature Alert!",
      description: "Check out our latest updates and improvements.",
      color: "from-blue-500 to-blue-600",
      delay: 0.2,
    },
    {
      icon: Gift,
      title: "Special Offer",
      description: "Limited time discount on all premium plans.",
      color: "from-purple-500 to-purple-600",
      delay: 0.4,
    },
    {
      icon: Star,
      title: "Customer Favorite",
      description: "Most loved feature by our community.",
      color: "from-yellow-500 to-yellow-600",
      delay: 0.6,
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Experience blazing fast performance.",
      color: "from-orange-500 to-orange-600",
      delay: 0.8,
    },
    {
      icon: Heart,
      title: "Made with Love",
      description: "Crafted with attention to every detail.",
      color: "from-pink-500 to-pink-600",
      delay: 1.0,
    },
    {
      icon: Award,
      title: "Award Winner",
      description: "Recognized for excellence in design.",
      color: "from-green-500 to-green-600",
      delay: 1.2,
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Scroll-Triggered Animations</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">Watch elements come to life as you scroll</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popupItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 100,
                scale: 0.8,
                rotate: -10,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: 0,
              }}
              transition={{
                duration: 0.8,
                delay: item.delay,
                type: "spring",
                bounce: 0.4,
              }}
              whileHover={{
                scale: 1.05,
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.6,
                  delay: item.delay + 0.2,
                  type: "spring",
                  bounce: 0.6,
                }}
                className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center mb-4 mx-auto`}
              >
                <item.icon className="w-8 h-8 text-white" />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: item.delay + 0.4 }}
                className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center"
              >
                {item.title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: item.delay + 0.6 }}
                className="text-gray-600 dark:text-gray-300 text-center leading-relaxed"
              >
                {item.description}
              </motion.p>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: item.delay + 0.8, duration: 0.8 }}
                className={`h-1 bg-gradient-to-r ${item.color} rounded-full mt-4`}
              />
            </motion.div>
          ))}
        </div>

        {/* Floating Action Buttons */}
        <div className="mt-16 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex space-x-4"
          >
            {[...Array(3)].map((_, i) => (
              <motion.button
                key={i}
                whileHover={{
                  scale: 1.1,
                  rotate: 360,
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.5,
                }}
                className={`w-16 h-16 rounded-full bg-gradient-to-r ${
                  i === 0
                    ? "from-purple-500 to-pink-500"
                    : i === 1
                      ? "from-blue-500 to-cyan-500"
                      : "from-green-500 to-emerald-500"
                } flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                {i === 0 && <Heart className="w-6 h-6 text-white" />}
                {i === 1 && <Star className="w-6 h-6 text-white" />}
                {i === 2 && <Zap className="w-6 h-6 text-white" />}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
