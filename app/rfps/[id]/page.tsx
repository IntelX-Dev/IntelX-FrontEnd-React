
"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { AccessibilityProvider } from "@/lib/accessibility-context"
import { LanguageProvider } from "@/lib/language-context"
import RFPDetail from "@/src/components/screens/rfp-detail"
import { authService } from "@/src/services/authService"

export default function RFPDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [rfp, setRfp] = useState(null)

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated()
      setIsAuthenticated(authenticated)
      
      if (!authenticated) {
        router.push("/")
        return
      }

      // Mock RFP data - replace with actual API call
      const mockRfp = {
        id: params.id,
        title: `RFP ${params.id}`,
        company: "Sample Company",
        status: "active",
        deadline: "2024-12-31",
        value: "$100,000"
      }
      setRfp(mockRfp)
      setIsLoading(false)
    }
    
    checkAuth()
  }, [router, params.id])

  const handleLogout = async () => {
    try {
      await authService.logout()
    } finally {
      setIsAuthenticated(false)
      router.push("/")
    }
  }

  const handleNavigate = (screen: "dashboard" | "rfps" | "detail" | "team" | "settings", rfpData?: any) => {
    if (screen === "detail" && rfpData) {
      router.push(`/rfps/${rfpData.id}`)
    } else {
      router.push(`/${screen}`)
    }
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!isAuthenticated || !rfp) {
    return null
  }

  return (
    <AccessibilityProvider>
      <LanguageProvider>
        <RFPDetail rfp={rfp} onNavigate={handleNavigate} onLogout={handleLogout} />
      </LanguageProvider>
    </AccessibilityProvider>
  )
}
