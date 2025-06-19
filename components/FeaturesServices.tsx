"use client"

import { motion } from "framer-motion"
import { Code, Palette, Smartphone, Globe, Zap, Shield, Headphones, Rocket } from "lucide-react"

export default function FeaturesServices() {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Custom websites built with modern technologies and best practices.",
      features: ["React/Next.js", "TypeScript", "Responsive Design"],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful, intuitive designs that enhance user experience.",
      features: ["User Research", "Prototyping", "Design Systems"],
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications.",
      features: ["iOS & Android", "React Native", "Flutter"],
      color: "from-green-500 to-green-600",
    },
    {
      icon: Globe,
      title: "E-commerce",
      description: "Complete online store solutions with payment integration.",
      features: ["Shopping Cart", "Payment Gateway", "Inventory Management"],
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Lightning-fast websites optimized for speed and SEO.",
      features: ["Core Web Vitals", "SEO Optimization", "CDN Integration"],
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: Shield,
      title: "Security",
      description: "Robust security measures to protect your digital assets.",
      features: ["SSL Certificates", "Data Encryption", "Security Audits"],
      color: "from-red-500 to-red-600",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock support to keep your business running.",
      features: ["Live Chat", "Phone Support", "Email Support"],
      color: "from-indigo-500 to-indigo-600",
    },
    {
      icon: Rocket,
      title: "Deployment",
      description: "Seamless deployment and hosting solutions.",
      features: ["Cloud Hosting", "CI/CD Pipeline", "Monitoring"],
      color: "from-pink-500 to-pink-600",
    },
  ]

  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Features & Services</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive solutions to bring your digital vision to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                y: -10,
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-16 h-16 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:shadow-lg transition-all duration-300`}
              >
                <service.icon className="w-8 h-8 text-white" />
              </motion.div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{service.title}</h3>

              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{service.description}</p>

              <div className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                    className="flex items-center text-sm text-gray-500 dark:text-gray-400"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-2" />
                    {feature}
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Learn More
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
