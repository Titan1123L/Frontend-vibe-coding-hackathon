"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Loader from "@/components/Loader"
import Navigation from "@/components/Navigation"
import Hero from "@/components/Hero"
import ParallaxSection from "@/components/ParallaxSection"
import CardsGraphs from "@/components/CardsGraphs"
import FeaturesServices from "@/components/FeaturesServices"
import ProjectShowcase from "@/components/ProjectShowcase"
import AnimatedStats from "@/components/AnimatedStats"
import Testimonials from "@/components/Testimonials"
import CarouselSwitcher from "@/components/CarouselSwitcher"
import CreativeAnimations from "@/components/CreativeAnimations"
import ScrollPopups from "@/components/ScrollPopups"
import ChatWidget from "@/components/ChatWidget"
import { ThemeProvider } from "@/components/ThemeProvider"
import EnhancedBrandKits from "@/components/EnhancedBrandKits"
import CarbonEmissionsGraph from "@/components/CarbonEmissionsGraph"
import ManagedPortfolioStats from "@/components/ManagedPortfolioStats"
import Contact from "@/components/Contact"
import MouseRippleEffect from "@/components/MouseRippleEffect"
import RippleSettings from "@/components/RippleSettings"
import Footer from "@/components/Footer"
import DashboardOverview from "@/components/DashboardOverview"
export default function Home() {
  const [loading, setLoading] = useState(true)
    const [rippleEnabled, setRippleEnabled] = useState(true)
  const [rippleIntensity, setRippleIntensity] = useState<"low" | "medium" | "high">("medium")
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 6500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300"
          >
             <MouseRippleEffect
              enabled={rippleEnabled}
              intensity={rippleIntensity}
              maxRipples={6}
              rippleDuration={1200}
              rippleSize={120}
            />

            {/* Ripple Settings Control */}
            <RippleSettings
              enabled={rippleEnabled}
              intensity={rippleIntensity}
              onEnabledChange={setRippleEnabled}
              onIntensityChange={setRippleIntensity}
            />

            <Navigation />
            <Hero />
            <ParallaxSection />
            <CardsGraphs />
            <DashboardOverview />
            <EnhancedBrandKits />
            <CarbonEmissionsGraph />
            <ManagedPortfolioStats />
            <FeaturesServices />
            <ProjectShowcase />
            <AnimatedStats />
            <Testimonials />
            <CarouselSwitcher />
            <CreativeAnimations />
            <ScrollPopups />
            <ChatWidget />
            <Contact />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  )
}
