"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function ProjectShowcase() {
  const [currentProject, setCurrentProject] = useState(0)

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A modern e-commerce solution with advanced features and seamless user experience.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 2,
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media management with real-time data visualization.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Next.js", "TypeScript", "Chart.js", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 3,
      title: "Mobile Banking App",
      description: "Secure mobile banking application with biometric authentication and real-time transactions.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React Native", "Firebase", "Biometrics", "Encryption"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 4,
      title: "AI-Powered CRM",
      description: "Customer relationship management system with AI-driven insights and automation.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Vue.js", "Python", "TensorFlow", "Redis"],
      liveUrl: "#",
      githubUrl: "#",
    },
  ]

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <section id="portfolio" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Project Showcase</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">Explore our latest work and creative solutions</p>
        </motion.div>

        <div className="relative">
          {/* Main Carousel */}
          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-700 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]"
              >
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="h-full">
                    <Image
                      src={projects[currentProject].image || "/placeholder.svg"}
                      alt={projects[currentProject].title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </motion.div>
                </div>

                {/* Project Details */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {projects[currentProject].title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {projects[currentProject].description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {projects[currentProject].tags.map((tag, index) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      <motion.a
                        href={projects[currentProject].liveUrl}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </motion.a>
                      <motion.a
                        href={projects[currentProject].githubUrl}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300"
                      >
                        <Github className="w-4 h-4" />
                        <span>Source Code</span>
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevProject}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextProject}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </motion.button>
          </div>

          {/* Project Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {projects.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentProject(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentProject
                    ? "bg-purple-500 scale-125"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => setCurrentProject(index)}
              className="cursor-pointer bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48">
                <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-white font-semibold text-lg">{project.title}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
