
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AccessibilityProvider } from "@/lib/accessibility-context"
import { LanguageProvider } from "@/lib/language-context"
import EnhancedDashboard from "@/src/components/screens/enhanced-dashboard"
import { authService } from "@/src/services/authService"

export default function DashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated()
      setIsAuthenticated(authenticated)
      setIsLoading(false)
      
      if (!authenticated) {
        router.push("/")
      }
    }
    
    checkAuth()
  }, [router])

  const handleLogout = async () => {
    try {
      await authService.logout()
    } finally {
      setIsAuthenticated(false)
      router.push("/")
    }
  }

  const handleNavigate = (screen: "dashboard" | "rfps" | "detail" | "team" | "settings", rfp?: any) => {
    if (screen === "detail" && rfp) {
      router.push(`/rfps/${rfp.id}`)
    } else {
      router.push(`/${screen}`)
    }
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <AccessibilityProvider>
      <LanguageProvider>
        <EnhancedDashboard onNavigate={handleNavigate} onLogout={handleLogout} />
      </LanguageProvider>
    </AccessibilityProvider>
  )
}
