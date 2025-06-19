"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Download, ArrowRight, TrendingUp, TrendingDown } from "lucide-react"

export default function ManagedPortfolioStats() {
  const [animatedValues, setAnimatedValues] = useState({
    carbonFootprint: 0,
    energyIntensity: 0,
    energyConsumption: 0,
  })

  const stats = [
    {
      title: "Managed portfolio carbon footprint",
      value: 45048,
      unit: "tCO₂e",
      change: 16,
      isIncrease: true,
      fromYear: "2019",
      data: [
        { year: "2022", value: 45048, percentage: 100 },
        { year: "2021", value: 14111, percentage: 31 },
        { year: "2020", value: 32813, percentage: 73 },
        { year: "2019", value: 38673, percentage: 86 },
      ],
      actionText: "See full breakdown of carbon footprint",
    },
    {
      title: "Managed portfolio energy intensity",
      value: 123,
      unit: "kWh/m²",
      change: 22,
      isIncrease: false,
      fromYear: "2019",
      data: [
        { year: "2022", value: 123, percentage: 100 },
        { year: "2021", value: 128, percentage: 104 },
        { year: "2020", value: 135, percentage: 110 },
        { year: "2019", value: 157, percentage: 128 },
      ],
      actionText: "Download the data",
    },
    {
      title: "Managed portfolio energy consumption",
      value: 47790662,
      unit: "kWh",
      change: 27,
      isIncrease: false,
      fromYear: "2019",
      data: [
        { year: "2022", value: 47790662, percentage: 100 },
        { year: "2021", value: 49324077, percentage: 103 },
        { year: "2020", value: 48784205, percentage: 102 },
        { year: "2019", value: 65198706, percentage: 136 },
      ],
      actionText: "Download the data",
    },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues({
        carbonFootprint: 45048,
        energyIntensity: 123,
        energyConsumption: 47790662,
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  const downloadData = (statTitle: string) => {
    const stat = stats.find((s) => s.title === statTitle)
    if (stat) {
      const dataStr = JSON.stringify(stat.data, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${statTitle.toLowerCase().replace(/\s+/g, "-")}-data.json`
      link.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Managed Portfolio Statistics</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">Comprehensive environmental impact metrics</p>
        </motion.div>

        {/* Enhanced Filters */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filter & Analysis Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time Range</label>
              <select className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Last 4 Years</option>
                <option>Last 2 Years</option>
                <option>Current Year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Metric Type</label>
              <select className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>All Metrics</option>
                <option>Carbon Only</option>
                <option>Energy Only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">View Mode</label>
              <select className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Detailed View</option>
                <option>Summary View</option>
                <option>Comparison View</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
            >
              {/* Header */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">{stat.title}</h3>

                <div className="flex items-baseline space-x-2 mb-2">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: index * 0.3 }}
                    className="text-4xl font-bold text-gray-900 dark:text-white"
                  >
                    {index === 0
                      ? formatNumber(animatedValues.carbonFootprint)
                      : index === 1
                        ? formatNumber(animatedValues.energyIntensity)
                        : formatNumber(animatedValues.energyConsumption)}
                  </motion.span>
                  <span className="text-lg text-gray-600 dark:text-gray-400">{stat.unit}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">from {stat.fromYear}</span>
                  <div className={`flex items-center space-x-1 ${stat.isIncrease ? "text-red-600" : "text-green-600"}`}>
                    {stat.isIncrease ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span className="text-sm font-semibold">
                      {stat.isIncrease ? "↑" : "↓"} {stat.change}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-4 mb-8">
                {stat.data.map((item, itemIndex) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + itemIndex * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.year}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{formatNumber(item.value)}</span>
                    </div>
                    <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min(item.percentage, 100)}%` }}
                        transition={{ duration: 1, delay: index * 0.2 + itemIndex * 0.1 + 0.5 }}
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  stat.actionText.includes("Download") ? downloadData(stat.title) : console.log("Navigate to breakdown")
                }
                className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 group"
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{stat.actionText}</span>
                {stat.actionText.includes("Download") ? (
                  <Download className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-200" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-200" />
                )}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
