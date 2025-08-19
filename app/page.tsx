
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AccessibilityProvider } from "@/lib/accessibility-context"
import { LanguageProvider } from "@/lib/language-context"
import LandingPage from "@/src/components/screens/landing-page"
import { authService } from "@/src/services/authService"

export default function HomePage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated()
      setIsAuthenticated(authenticated)
      setIsLoading(false)
      
      if (authenticated) {
        router.push("/dashboard")
      }
    }
    
    checkAuth()
  }, [router])

  const handleNavigate = (screen: "login" | "dashboard") => {
    router.push(`/${screen}`)
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (isAuthenticated) {
    return null
  }

  return (
    <AccessibilityProvider>
      <LanguageProvider>
        <LandingPage onNavigate={handleNavigate} />
      </LanguageProvider>
    </AccessibilityProvider>
  )
}
