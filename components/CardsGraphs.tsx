"use client"

import { motion } from "framer-motion"
import { TrendingUp, Users, DollarSign, Activity, BarChart3, PieChart } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts"

const lineData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 700 },
  { name: "Jun", value: 900 },
]

const barData = [
  { name: "Product A", value: 400 },
  { name: "Product B", value: 300 },
  { name: "Product C", value: 600 },
  { name: "Product D", value: 800 },
]

const pieData = [
  { name: "Desktop", value: 400, color: "#8884d8" },
  { name: "Mobile", value: 300, color: "#82ca9d" },
  { name: "Tablet", value: 200, color: "#ffc658" },
]

export default function CardsGraphs() {
  const stats = [
    { icon: Users, label: "Active Users", value: "12.5K", change: "+12%", color: "from-blue-500 to-blue-600" },
    { icon: DollarSign, label: "Revenue", value: "$45.2K", change: "+8%", color: "from-green-500 to-green-600" },
    { icon: TrendingUp, label: "Growth Rate", value: "23.1%", change: "+5%", color: "from-purple-500 to-purple-600" },
    { icon: Activity, label: "Conversion", value: "3.2%", change: "+2%", color: "from-orange-500 to-orange-600" },
  ]

  return (
    <section id="analytics" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Analytics & Insights</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">Data-driven decisions for better results</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-500 text-sm font-semibold">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
              <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Line Chart */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center mb-6">
              <BarChart3 className="w-6 h-6 text-blue-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Revenue Trend</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  strokeWidth={3}
                  dot={{ fill: "#8884d8", strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center mb-6">
              <BarChart3 className="w-6 h-6 text-green-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Product Performance</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg lg:col-span-2"
          >
            <div className="flex items-center mb-6">
              <PieChart className="w-6 h-6 text-purple-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Device Distribution</h3>
            </div>
            <div className="flex flex-col lg:flex-row items-center">
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="lg:ml-8 mt-4 lg:mt-0">
                {pieData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center mb-2">
                    <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: entry.color }} />
                    <span className="text-gray-700 dark:text-gray-300">
                      {entry.name}: {entry.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
