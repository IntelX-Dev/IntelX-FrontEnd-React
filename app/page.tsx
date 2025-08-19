"use client"

import { useState } from "react"
import { AccessibilityProvider } from "@/lib/accessibility-context"
import { LanguageProvider } from "@/lib/language-context"
import LandingPage from "@/components/screens/landing-page"
import LoginPage from "@/components/screens/login-page"
import EnhancedDashboard from "@/components/screens/enhanced-dashboard"
import RFPListing from "@/components/screens/rfp-listing"
import RFPDetail from "@/components/screens/rfp-detail"
import TeamPage from "@/components/screens/team-page"
import SettingsPage from "@/components/screens/settings-page"
import { motion, AnimatePresence } from "framer-motion"

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    "landing" | "login" | "dashboard" | "rfps" | "detail" | "team" | "settings"
  >("landing")
  const [selectedRFP, setSelectedRFP] = useState<any>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => {
    setIsAuthenticated(true)
    setCurrentScreen("dashboard")
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentScreen("landing")
  }

  const handleNavigate = (screen: "dashboard" | "rfps" | "detail" | "team" | "settings", rfp?: any) => {
    if (screen === "detail" && rfp) {
      setSelectedRFP(rfp)
    }
    setCurrentScreen(screen)
  }

  const handleGetStarted = () => {
    setCurrentScreen("login")
  }

  return (
    <AccessibilityProvider>
      <LanguageProvider>
        <div className="min-h-screen">
          <AnimatePresence mode="wait">
            {currentScreen === "landing" && (
              <motion.div
                key="landing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <LandingPage onGetStarted={handleGetStarted} />
              </motion.div>
            )}

            {currentScreen === "login" && (
              <motion.div
                key="login"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <LoginPage onLogin={handleLogin} onBack={() => setCurrentScreen("landing")} />
              </motion.div>
            )}

            {currentScreen === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <EnhancedDashboard onNavigate={handleNavigate} onLogout={handleLogout} />
              </motion.div>
            )}

            {currentScreen === "rfps" && (
              <motion.div
                key="rfps"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <RFPListing onNavigate={handleNavigate} onLogout={handleLogout} />
              </motion.div>
            )}

            {currentScreen === "detail" && selectedRFP && (
              <motion.div
                key="detail"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <RFPDetail rfp={selectedRFP} onNavigate={handleNavigate} onLogout={handleLogout} />
              </motion.div>
            )}

            {currentScreen === "team" && (
              <motion.div
                key="team"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <TeamPage onNavigate={handleNavigate} onLogout={handleLogout} />
              </motion.div>
            )}

            {currentScreen === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <SettingsPage onNavigate={handleNavigate} onLogout={handleLogout} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </LanguageProvider>
    </AccessibilityProvider>
  )
}