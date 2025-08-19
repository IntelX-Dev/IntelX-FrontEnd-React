
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AccessibilityProvider } from "@/lib/accessibility-context"
import { LanguageProvider } from "@/lib/language-context"
import LoginPage from "@/src/components/screens/login-page"
import { authService } from "@/src/services/authService"

export default function LoginPageRoute() {
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

  const handleLogin = () => {
    setIsAuthenticated(true)
    router.push("/dashboard")
  }

  const handleBack = () => {
    router.push("/")
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
        <LoginPage onLogin={handleLogin} onBack={handleBack} />
      </LanguageProvider>
    </AccessibilityProvider>
  )
}
