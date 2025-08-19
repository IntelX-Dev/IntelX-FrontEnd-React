
"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { AccessibilityProvider } from "@/lib/accessibility-context"
import { LanguageProvider } from "@/lib/language-context"
import RFPDetail from "@/src/components/screens/rfp-detail"
import { authService } from "@/src/services/authService"

export default function RFPDetailPageRoute() {
  const router = useRouter()
  const params = useParams()
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

  const handleBack = () => {
    router.push("/rfps")
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
        <RFPDetail 
          rfpId={params.id as string}
          onNavigate={handleNavigate} 
          onLogout={handleLogout}
          onBack={handleBack}
        />
      </LanguageProvider>
    </AccessibilityProvider>
  )
}
