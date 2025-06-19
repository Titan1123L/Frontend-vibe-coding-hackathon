"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"

export default function CarbonEmissionsGraph() {
  const [activeTypeFilter, setActiveTypeFilter] = useState("All")
  const [activeStatusFilter, setActiveStatusFilter] = useState("Complete")

  const typeFilters = ["Refurbishment", "New build", "All"]
  const statusFilters = ["Complete", "Estimate"]

  const allData = [
    { name: "Project 1", value: 549, type: "Refurbishment", status: "Complete" },
    { name: "Project 2", value: 278, type: "New build", status: "Complete" },
    { name: "Project 3", value: 875, type: "Refurbishment", status: "Complete" },
    { name: "Project 4", value: 617, type: "New build", status: "Complete" },
    { name: "Project 5", value: 506, type: "Refurbishment", status: "Complete" },
    { name: "Project 6", value: 36, type: "New build", status: "Estimate" },
    { name: "Project 7", value: 185, type: "Refurbishment", status: "Estimate" },
    { name: "Project 8", value: 191, type: "New build", status: "Complete" },
    { name: "Project 9", value: 122, type: "Refurbishment", status: "Estimate" },
    { name: "Project 10", value: 550, type: "New build", status: "Complete" },
    { name: "Project 11", value: 881, type: "Refurbishment", status: "Complete" },
    { name: "Project 12", value: 539, type: "New build", status: "Complete" },
    { name: "Project 13", value: 269, type: "Refurbishment", status: "Complete" },
    { name: "Project 14", value: 29, type: "New build", status: "Estimate" },
    { name: "Project 15", value: 82, type: "Refurbishment", status: "Estimate" },
    { name: "Project 16", value: 44, type: "New build", status: "Estimate" },
    { name: "Project 17", value: 109, type: "Refurbishment", status: "Complete" },
    { name: "Project 18", value: 106, type: "New build", status: "Complete" },
    { name: "Project 19", value: 607, type: "Refurbishment", status: "Complete" },
    { name: "Project 20", value: 528, type: "New build", status: "Complete" },
  ]

  const getFilteredData = () => {
    return allData.filter((item) => {
      const typeMatch = activeTypeFilter === "All" || item.type === activeTypeFilter
      const statusMatch = item.status === activeStatusFilter
      return typeMatch && statusMatch
    })
  }

  const filteredData = getFilteredData()

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-semibold">{`${label}`}</p>
          <p className="text-orange-400">{`Value: ${payload[0].value} kgCO₂e/m²`}</p>
        </div>
      )
    }
    return null
  }

  const downloadData = (format: "json" | "csv" | "pdf") => {
    if (format === "json") {
      const dataStr = JSON.stringify(filteredData, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = "carbon-emissions-data.json"
      link.click()
      URL.revokeObjectURL(url)
    } else if (format === "csv") {
      const csvData = filteredData.map((row) => `${row.name},${row.value},${row.type},${row.status}`).join("\n")
      const csvContent = "Project,Value,Type,Status\n" + csvData
      const dataBlob = new Blob([csvContent], { type: "text/csv" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = "carbon-emissions-data.csv"
      link.click()
      URL.revokeObjectURL(url)
    } else if (format === "pdf") {
      // For PDF export, we'll create a simple text-based PDF
      const pdfContent = `Carbon Emissions Report\n\nFiltered Data:\n${filteredData
        .map((item) => `${item.name}: ${item.value} kgCO₂e/m² (${item.type}, ${item.status})`)
        .join("\n")}`
      const dataBlob = new Blob([pdfContent], { type: "application/pdf" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = "carbon-emissions-report.pdf"
      link.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div className="mb-6 lg:mb-0">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                EMBODIED
                <br />
                <span className="text-orange-600">CARBON</span>
                <br />
                <span className="text-orange-600">EMISSIONS</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300">Intensity measured by kgCO₂e/m²</p>
            </div>

            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => downloadData("json")}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <Download className="w-4 h-4" />
                <span>JSON</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => downloadData("csv")}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <Download className="w-4 h-4" />
                <span>CSV</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => downloadData("pdf")}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <Download className="w-4 h-4" />
                <span>PDF</span>
              </motion.button>
            </div>
          </div>

          {/* Enhanced Filters */}
          <div className="mb-8 space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Advanced Filtering</h3>

            {/* Date Range Filter */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Value Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Carbon Intensity Range: 0 - 1000 kgCO₂e/m²
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Project Type</span>
                <div className="flex flex-wrap gap-2">
                  {typeFilters.map((filter) => (
                    <motion.button
                      key={filter}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTypeFilter(filter)}
                      className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                        activeTypeFilter === filter
                          ? "bg-orange-600 text-white border-orange-600"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-orange-400"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            activeTypeFilter === filter ? "bg-white" : "bg-orange-600"
                          }`}
                        />
                        <span>{filter}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Status</span>
                <div className="flex flex-wrap gap-2">
                  {statusFilters.map((filter) => (
                    <motion.button
                      key={filter}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveStatusFilter(filter)}
                      className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                        activeStatusFilter === filter
                          ? "bg-orange-600 text-white border-orange-600"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-orange-400"
                      }`}
                    >
                      {filter}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Key</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-1 border-t-2 border-dashed border-gray-400"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  500 kgCO₂e/m² - Embodied Carbon Target 2030
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-1 bg-gray-400"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  600 kgCO₂e/m² - Embodied Carbon Target 2025
                </span>
              </div>
            </div>
          </div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-96"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={{ stroke: "#374151" }} />
                <YAxis
                  domain={[0, 1200]}
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  axisLine={{ stroke: "#374151" }}
                  label={{
                    value: "Embodied carbon intensity (kgCO₂e/m²)",
                    angle: -90,
                    position: "insideLeft",
                    style: { textAnchor: "middle", fill: "#6B7280" },
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={500} stroke="#9CA3AF" strokeDasharray="5 5" />
                <ReferenceLine y={600} stroke="#9CA3AF" />
                <Bar dataKey="value" fill="#DC2626" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
