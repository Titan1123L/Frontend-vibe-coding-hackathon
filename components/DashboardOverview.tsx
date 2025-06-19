"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  DollarSign,
  Zap,
  BarChart3,
  PieChart,
  Download,
  RefreshCw,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"

export default function DashboardOverview() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d")
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  const timeRanges = [
    { label: "24H", value: "24h" },
    { label: "7D", value: "7d" },
    { label: "30D", value: "30d" },
    { label: "90D", value: "90d" },
    { label: "1Y", value: "1y" },
  ]

  // Mock real-time data updates
  useEffect(() => {
    if (isRealTimeEnabled) {
      const interval = setInterval(() => {
        setLastUpdated(new Date())
      }, 30000) // Update every 30 seconds

      return () => clearInterval(interval)
    }
  }, [isRealTimeEnabled])

  const kpiData = [
    {
      title: "Total Revenue",
      value: "$2.4M",
      change: 12.5,
      trend: "up",
      icon: DollarSign,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Active Users",
      value: "45.2K",
      change: 8.3,
      trend: "up",
      icon: Users,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Carbon Footprint",
      value: "45.0K tCO₂e",
      change: -16.2,
      trend: "down",
      icon: Activity,
      color: "from-red-500 to-red-600",
    },
    {
      title: "Energy Efficiency",
      value: "123 kWh/m²",
      change: -22.1,
      trend: "down",
      icon: Zap,
      color: "from-yellow-500 to-yellow-600",
    },
  ]

  const chartData = [
    { name: "Jan", revenue: 4000, users: 2400, carbon: 2400, energy: 1800 },
    { name: "Feb", revenue: 3000, users: 1398, carbon: 2210, energy: 1600 },
    { name: "Mar", revenue: 2000, users: 9800, carbon: 2290, energy: 1400 },
    { name: "Apr", revenue: 2780, users: 3908, carbon: 2000, energy: 1200 },
    { name: "May", revenue: 1890, users: 4800, carbon: 1810, energy: 1000 },
    { name: "Jun", revenue: 2390, users: 3800, carbon: 1600, energy: 900 },
    { name: "Jul", revenue: 3490, users: 4300, carbon: 1400, energy: 800 },
  ]

  const pieData = [
    { name: "Refurbishment", value: 65, color: "#8884d8" },
    { name: "New Build", value: 35, color: "#82ca9d" },
  ]

  const exportData = (format: string) => {
    const data = {
      kpis: kpiData,
      chartData: chartData,
      pieData: pieData,
      lastUpdated: lastUpdated.toISOString(),
    }

    if (format === "json") {
      const dataStr = JSON.stringify(data, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = "dashboard-overview.json"
      link.click()
      URL.revokeObjectURL(url)
    } else if (format === "csv") {
      const csvData = chartData
        .map((row) => `${row.name},${row.revenue},${row.users},${row.carbon},${row.energy}`)
        .join("\n")
      const csvContent = "Month,Revenue,Users,Carbon,Energy\n" + csvData
      const dataBlob = new Blob([csvContent], { type: "text/csv" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = "dashboard-overview.csv"
      link.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12"
        >
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Dashboard Overview</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Comprehensive metrics at a glance</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6 lg:mt-0">
            {/* Time Range Selector */}
            <div className="flex bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg">
              {timeRanges.map((range) => (
                <motion.button
                  key={range.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTimeRange(range.value)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedTimeRange === range.value
                      ? "bg-purple-500 text-white shadow-md"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {range.label}
                </motion.button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsRealTimeEnabled(!isRealTimeEnabled)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isRealTimeEnabled
                    ? "bg-green-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${isRealTimeEnabled ? "animate-spin" : ""}`} />
                <span>Real-time</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => exportData("json")}
                className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-gray-500 dark:text-gray-400 mb-8"
        >
          Last updated: {lastUpdated.toLocaleString()}
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${kpi.color}`}>
                  <kpi.icon className="w-6 h-6 text-white" />
                </div>
                <div
                  className={`flex items-center space-x-1 ${kpi.trend === "up" ? "text-green-500" : "text-red-500"}`}
                >
                  {kpi.trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span className="text-sm font-semibold">{Math.abs(kpi.change)}%</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{kpi.value}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{kpi.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Revenue Trend */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Revenue Trend</h3>
              <BarChart3 className="w-6 h-6 text-blue-500" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6B7280" }} />
                <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#F9FAFB",
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#8B5CF6" fill="url(#colorRevenue)" strokeWidth={3} />
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Project Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Project Distribution</h3>
              <PieChart className="w-6 h-6 text-green-500" />
            </div>
            <div className="flex flex-col lg:flex-row items-center">
              <ResponsiveContainer width="100%" height={250}>
                <RechartsPieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${value}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="lg:ml-6 mt-4 lg:mt-0 space-y-3">
                {pieData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {entry.name}: {entry.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Multi-metric Chart */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Multi-Metric Analysis</h3>
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => exportData("csv")}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <Download className="w-4 h-4" />
                <span>CSV</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => exportData("json")}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <Download className="w-4 h-4" />
                <span>JSON</span>
              </motion.button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6B7280" }} />
              <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#F9FAFB",
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8B5CF6"
                strokeWidth={3}
                dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ fill: "#10B981", strokeWidth: 2, r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="carbon"
                stroke="#EF4444"
                strokeWidth={3}
                dot={{ fill: "#EF4444", strokeWidth: 2, r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="energy"
                stroke="#F59E0B"
                strokeWidth={3}
                dot={{ fill: "#F59E0B", strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Revenue</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Carbon</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Energy</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
