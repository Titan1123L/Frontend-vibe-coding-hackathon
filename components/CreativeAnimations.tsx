"use client"

import { motion } from "framer-motion"
import { Zap, Sparkles, Star, Heart, Diamond, Hexagon } from "lucide-react"

export default function CreativeAnimations() {
  const floatingObjects = [
    { icon: Zap, color: "text-yellow-400", delay: 0 },
    { icon: Sparkles, color: "text-purple-400", delay: 0.5 },
    { icon: Star, color: "text-blue-400", delay: 1 },
    { icon: Heart, color: "text-pink-400", delay: 1.5 },
    { icon: Diamond, color: "text-green-400", delay: 2 },
    { icon: Hexagon, color: "text-orange-400", delay: 2.5 },
  ]

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              rotate: [0, 360],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Creative Animations</h2>
          <p className="text-xl text-gray-300">Bringing life to digital experiences</p>
        </motion.div>

        {/* Floating Objects */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {floatingObjects.map((obj, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: obj.delay }}
              whileHover={{
                scale: 1.2,
                rotate: 360,
                transition: { duration: 0.5 },
              }}
              className="flex justify-center"
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: obj.delay,
                }}
                className={`p-6 bg-gray-800 rounded-2xl shadow-xl cursor-pointer ${obj.color}`}
              >
                <obj.icon className="w-12 h-12" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Elements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Morphing Shape */}
          <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-800 rounded-2xl p-8 text-center">
            <motion.div
              animate={{
                borderRadius: ["20%", "50%", "20%"],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-white mb-2">Morphing Shapes</h3>
            <p className="text-gray-300">Dynamic shape transformations</p>
          </motion.div>

          {/* Pulsing Element */}
          <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-800 rounded-2xl p-8 text-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center"
            >
              <Heart className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-xl font-semibold text-white mb-2">Pulsing Effects</h3>
            <p className="text-gray-300">Rhythmic animations that captivate</p>
          </motion.div>

          {/* Spinning Element */}
          <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-800 rounded-2xl p-8 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg mx-auto mb-4 flex items-center justify-center"
            >
              <Zap className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-xl font-semibold text-white mb-2">Continuous Motion</h3>
            <p className="text-gray-300">Smooth, endless animations</p>
          </motion.div>
        </div>

        {/* Interactive Playground */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 bg-gray-800 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Interactive Animation Playground</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Hover Effects */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Hover Effects</h4>
              <div className="grid grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{
                      scale: 1.1,
                      rotate: 15,
                      backgroundColor: `hsl(${i * 60}, 70%, 50%)`,
                    }}
                    className="w-16 h-16 bg-gray-700 rounded-lg cursor-pointer"
                  />
                ))}
              </div>
            </div>

            {/* Click Effects */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Click Effects</h4>
              <div className="grid grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    whileTap={{
                      scale: 0.8,
                      rotate: -15,
                      backgroundColor: `hsl(${i * 60 + 30}, 70%, 50%)`,
                    }}
                    className="w-16 h-16 bg-gray-700 rounded-full cursor-pointer"
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
