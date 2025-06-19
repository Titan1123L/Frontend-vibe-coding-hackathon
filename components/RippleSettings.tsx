"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Settings, X, Zap, ZapOff } from "lucide-react"

interface RippleSettingsProps {
  enabled: boolean
  intensity: "low" | "medium" | "high"
  onEnabledChange: (enabled: boolean) => void
  onIntensityChange: (intensity: "low" | "medium" | "high") => void
}

export default function RippleSettings({
  enabled,
  intensity,
  onEnabledChange,
  onIntensityChange,
}: RippleSettingsProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Settings Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 right-6 z-50 w-12 h-12 bg-gray-800/80 backdrop-blur-md rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border border-gray-700"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="settings"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Settings className="w-5 h-5 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
            className="fixed top-36 right-6 z-40 w-72 bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700 p-6"
          >
            <h3 className="text-white font-semibold text-lg mb-4">Ripple Effects</h3>

            {/* Enable/Disable Toggle */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                {enabled ? <Zap className="w-5 h-5 text-purple-400" /> : <ZapOff className="w-5 h-5 text-gray-400" />}
                <span className="text-white font-medium">Enable Effects</span>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => onEnabledChange(!enabled)}
                className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                  enabled ? "bg-purple-600" : "bg-gray-600"
                }`}
              >
                <motion.div
                  animate={{ x: enabled ? 24 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-6 h-6 bg-white rounded-full shadow-md"
                />
              </motion.button>
            </div>

            {/* Intensity Settings */}
            <div className="space-y-3">
              <span className="text-white font-medium block">Intensity Level</span>
              <div className="space-y-2">
                {(["low", "medium", "high"] as const).map((level) => (
                  <motion.button
                    key={level}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onIntensityChange(level)}
                    disabled={!enabled}
                    className={`w-full p-3 rounded-lg border transition-all duration-200 text-left ${
                      intensity === level && enabled
                        ? "bg-purple-600/20 border-purple-500 text-purple-300"
                        : enabled
                          ? "bg-gray-700/50 border-gray-600 text-gray-300 hover:border-gray-500"
                          : "bg-gray-700/30 border-gray-600 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium capitalize">{level}</span>
                      <div className="flex space-x-1">
                        {[...Array(level === "low" ? 1 : level === "medium" ? 2 : 3)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              intensity === level && enabled ? "bg-purple-400" : "bg-gray-500"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs mt-1 opacity-70">
                      {level === "low" && "Subtle ripples, minimal performance impact"}
                      {level === "medium" && "Balanced effects with smooth performance"}
                      {level === "high" && "Maximum visual impact, more frequent ripples"}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Performance Info */}
            <div className="mt-6 p-3 bg-gray-700/50 rounded-lg border border-gray-600">
              <p className="text-xs text-gray-300">
                <span className="font-medium">Performance:</span> Effects are optimized for smooth animations across all
                devices. Disable if experiencing performance issues.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
