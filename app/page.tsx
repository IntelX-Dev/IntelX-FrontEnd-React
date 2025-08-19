
"use client"

import { useState } from "react"
import { AccessibilityProvider } from "@/lib/accessibility-context"
import { LanguageProvider } from "@/lib/language-context"
import LandingPage from "@/src/components/screens/landing-page"
import LoginPage from "@/src/components/screens/login-page"
import EnhancedDashboard from "@/src/components/screens/enhanced-dashboard"
import RFPListing from "@/src/components/screens/rfp-listing"
import RFPDetail from "@/src/components/screens/rfp-detail"
import TeamPage from "@/src/components/screens/team-page"
import SettingsPage from "@/src/components/screens/settings-page"
import { motion, AnimatePresence } from "framer-motion"
import { authService } from "@/src/services/authService"

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    "landing" | "login" | "dashboard" | "rfps" | "detail" | "team" | "settings"
  >("landing")
  const [selectedRFP, setSelectedRFP] = useState<any>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated())

  const handleLogin = () => {
    setIsAuthenticated(true)
    setCurrentScreen("dashboard")
  }

  const handleLogout = async () => {
    try {
      await authService.logout()
    } finally {
      setIsAuthenticated(false)
      setCurrentScreen("landing")
    }
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
