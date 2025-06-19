"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Settings, Check } from "lucide-react"

export default function BrandKits() {
  const [selectedBrands, setSelectedBrands] = useState<number[]>([3])
  const [showSettings, setShowSettings] = useState<number | null>(null)

  const brandKits = [
    {
      id: 1,
      name: "ECorp",
      icon: "🟢",
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-500",
    },
    {
      id: 2,
      name: "ICorp",
      icon: "🟠",
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-500",
    },
    {
      id: 3,
      name: "The Agency",
      icon: "🔴",
      color: "from-red-400 to-red-600",
      bgColor: "bg-red-500",
    },
  ]

  const toggleBrandSelection = (brandId: number) => {
    setSelectedBrands((prev) => (prev.includes(brandId) ? prev.filter((id) => id !== brandId) : [...prev, brandId]))
  }

  const toggleSettings = (brandId: number) => {
    setShowSettings(showSettings === brandId ? null : brandId)
  }

  return (
    <section className="py-20 bg-gray-900 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Brand Kits</h2>
          <p className="text-xl text-gray-300">Manage your brand assets and configurations</p>
        </motion.div>

        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative bg-gray-800 rounded-2xl p-6 border-2 border-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 bg-clip-border"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              padding: "2px",
              borderRadius: "1rem",
            }}
          >
            <div className="bg-gray-900 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6">Brand Kits</h3>

              <div className="space-y-4">
                {brandKits.map((brand, index) => (
                  <motion.div
                    key={brand.id}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        {/* Custom Checkbox */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleBrandSelection(brand.id)}
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                            selectedBrands.includes(brand.id)
                              ? "bg-purple-600 border-purple-600"
                              : "border-gray-500 hover:border-gray-400"
                          }`}
                        >
                          <AnimatePresence>
                            {selectedBrands.includes(brand.id) && (
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Check className="w-4 h-4 text-white" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.button>

                        {/* Brand Icon and Name */}
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full ${brand.bgColor} flex items-center justify-center`}>
                            <span className="text-white text-sm">☁</span>
                          </div>
                          <span className="text-white font-medium text-lg">{brand.name}</span>
                        </div>
                      </div>

                      {/* Settings Button */}
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleSettings(brand.id)}
                        className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        <Settings className="w-5 h-5" />
                      </motion.button>
                    </motion.div>

                    {/* Settings Dropdown */}
                    <AnimatePresence>
                      {showSettings === brand.id && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg p-4 z-10 shadow-xl"
                        >
                          <h4 className="text-white font-semibold mb-3">{brand.name} Settings</h4>
                          <div className="space-y-2">
                            <button className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors duration-200">
                              Edit Brand Colors
                            </button>
                            <button className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors duration-200">
                              Manage Assets
                            </button>
                            <button className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors duration-200">
                              Export Kit
                            </button>
                            <button className="w-full text-left px-3 py-2 text-red-400 hover:text-red-300 hover:bg-gray-700 rounded transition-colors duration-200">
                              Delete Kit
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
