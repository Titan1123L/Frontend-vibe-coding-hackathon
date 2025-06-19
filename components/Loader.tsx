"use client"

import { useState, useEffect } from "react"

interface LoadingAnimationProps {
  onComplete?: () => void
}

export default function Loader({ onComplete }: LoadingAnimationProps = {}) {
  const [stage, setStage] = useState<"loading" | "splitting" | "forming-l" | "zooming">("loading")
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    // Percentage counter animation
    const percentageInterval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(percentageInterval)
          return 100
        }
        return prev + 1
      })
    }, 65) // 6.5 seconds total / 100 = 65ms per increment

    // Stage transitions
    const timer1 = setTimeout(() => setStage("splitting"), 3000)
    const timer2 = setTimeout(() => setStage("forming-l"), 3800)
    const timer3 = setTimeout(() => setStage("zooming"), 4800)
    const timer4 = setTimeout(() => {
      if (onComplete) {
        onComplete()
      }
    }, 6500)

    return () => {
      clearInterval(percentageInterval)
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center overflow-hidden z-50">
      {/* Percentage Counter - Left Bottom */}
      <div className="absolute left-8 bottom-8 z-10">
        <div className="flex items-baseline space-x-1">
          <span className="text-6xl font-bold text-white tabular-nums tracking-tight">
            {percentage.toString().padStart(2, "0")}
          </span>
          <span className="text-2xl font-medium text-white/70">%</span>
        </div>
        <div className="mt-2 w-24 h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="relative w-80 h-20">
        {/* Loading stage */}
        {stage === "loading" && (
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-slate-800 rounded-lg border border-slate-700"></div>
            <div className="absolute inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md animate-loader-fill origin-left"></div>
          </div>
        )}

        {/* Splitting stage */}
        {stage === "splitting" && (
          <>
            {/* Left half */}
            <div className="absolute left-0 top-0 w-1/2 h-full">
              <div className="absolute inset-0 bg-slate-800 rounded-l-lg border border-slate-700 animate-split-left"></div>
              <div className="absolute inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-l-md animate-split-left"></div>
            </div>
            {/* Right half */}
            <div className="absolute right-0 top-0 w-1/2 h-full">
              <div className="absolute inset-0 bg-slate-800 rounded-r-lg border border-slate-700 animate-split-right"></div>
              <div className="absolute inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-r-md animate-split-right"></div>
            </div>
          </>
        )}

        {/* Forming L stage */}
        {stage === "forming-l" && (
          <>
            {/* Vertical part of L (left part rotated) */}
            <div className="absolute left-0 top-0 w-1/2 h-full origin-bottom-right">
              <div className="absolute inset-0 bg-slate-800 rounded-lg border border-slate-700 animate-form-l-vertical"></div>
              <div className="absolute inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md animate-form-l-vertical"></div>
            </div>
            {/* Horizontal part of L (right part moved down) */}
            <div className="absolute right-0 top-0 w-1/2 h-full origin-top-left">
              <div className="absolute inset-0 bg-slate-800 rounded-lg border border-slate-700 animate-form-l-horizontal"></div>
              <div className="absolute inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md animate-form-l-horizontal"></div>
            </div>
          </>
        )}

        {/* Zooming stage - Focus on vertical line */}
        {stage === "zooming" && (
          <div className="relative w-full h-full">
            {/* Vertical line of L - This will be the focus of zoom */}
            <div className="absolute left-1/2 top-1/2 w-5 h-16 origin-center transform -translate-x-1/2 -translate-y-1/2">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-purple-500 rounded-lg animate-zoom-vertical-focus shadow-2xl"></div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-purple-400 rounded-lg animate-zoom-vertical-glow opacity-50 blur-sm"></div>
            </div>

            {/* Horizontal part fades out */}
            <div className="absolute left-1/2 top-1/2 w-16 h-5 origin-center transform -translate-x-1/2 -translate-y-1/2 translate-y-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg animate-fade-out-horizontal"></div>
            </div>

            {/* Zoom particles emanating from vertical line */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-zoom-particles opacity-80"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    transform: `rotate(${i * 30}deg) translateY(-20px)`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Loading text */}
      <div className="absolute bottom-20 text-center">
        <div className="text-white text-sm font-medium tracking-wider opacity-60 animate-pulse">
          {stage === "loading" && "INITIALIZING..."}
          {stage === "splitting" && "PROCESSING..."}
          {stage === "forming-l" && "CONFIGURING..."}
          {stage === "zooming" && "LAUNCHING..."}
        </div>
      </div>

      {/* Zoom overlay effect */}
      {stage === "zooming" && (
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-slate-900 animate-zoom-overlay pointer-events-none" />
      )}
    </div>
  )
}
