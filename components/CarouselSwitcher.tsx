"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import Image from "next/image"

export default function CarouselSwitcher() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const slides = [
    {
      id: 1,
      title: "Modern Web Design",
      subtitle: "Creating Beautiful Experiences",
      description: "Crafting pixel-perfect designs that engage and convert users across all devices.",
      image: "/placeholder.svg?height=600&width=800",
      color: "from-purple-600 to-blue-600",
    },
    {
      id: 2,
      title: "Mobile Development",
      subtitle: "Apps That Make a Difference",
      description: "Building native and cross-platform mobile applications with exceptional performance.",
      image: "/placeholder.svg?height=600&width=800",
      color: "from-green-600 to-teal-600",
    },
    {
      id: 3,
      title: "E-commerce Solutions",
      subtitle: "Driving Online Success",
      description: "Complete e-commerce platforms that scale with your business and maximize conversions.",
      image: "/placeholder.svg?height=600&width=800",
      color: "from-orange-600 to-red-600",
    },
    {
      id: 4,
      title: "Digital Marketing",
      subtitle: "Amplify Your Reach",
      description: "Strategic digital marketing campaigns that connect with your audience and drive results.",
      image: "/placeholder.svg?height=600&width=800",
      color: "from-pink-600 to-purple-600",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].color}`}
        >
          {/* Background Image */}
          <div className="absolute inset-0 opacity-20">
            <Image
              src={slides[currentSlide].image || "/placeholder.svg"}
              alt={slides[currentSlide].title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-white"
                >
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg mb-4 opacity-90"
                  >
                    {slides[currentSlide].subtitle}
                  </motion.p>

                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                  >
                    {slides[currentSlide].title}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-xl mb-8 opacity-90 leading-relaxed"
                  >
                    {slides[currentSlide].description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex space-x-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300"
                    >
                      Learn More
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
                    >
                      Get Started
                    </motion.button>
                  </motion.div>
                </motion.div>

                {/* Image Content */}
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative"
                >
                  <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={slides[currentSlide].image || "/placeholder.svg"}
                      alt={slides[currentSlide].title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-md rounded-full px-6 py-3">
          {/* Previous Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </motion.button>

          {/* Slide Indicators */}
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          {/* Play/Pause Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300"
          >
            {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white" />}
          </motion.button>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </motion.button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.5 }}
          className="h-full bg-white"
        />
      </div>
    </section>
  )
}
