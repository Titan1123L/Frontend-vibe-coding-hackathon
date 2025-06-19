"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Working with this team was an absolute pleasure. They delivered beyond our expectations and the attention to detail was remarkable.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CTO, InnovateCorp",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "The technical expertise and creative solutions provided helped us scale our platform to millions of users. Highly recommended!",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Marketing Director, GrowthCo",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Their design thinking and user experience focus transformed our conversion rates. The results speak for themselves.",
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Founder, StartupXYZ",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "From concept to launch, they guided us through every step. The final product exceeded all our expectations.",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">Real feedback from real people</p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="relative bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-xl">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              className="absolute top-6 left-6 text-purple-500"
            >
              <Quote className="w-12 h-12" />
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center pt-8"
              >
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star className="w-6 h-6 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </div>

                <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>

                <div className="flex items-center justify-center space-x-4">
                  <motion.div whileHover={{ scale: 1.1 }} className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                      alt={testimonials[currentTestimonial].name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="text-left">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">{testimonials[currentTestimonial].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </motion.button>
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? "bg-purple-500 scale-125"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* All Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => setCurrentTestimonial(index)}
              className="cursor-pointer bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full mr-3"
                />
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white text-sm">{testimonial.name}</h5>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                "{testimonial.text.substring(0, 80)}..."
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
