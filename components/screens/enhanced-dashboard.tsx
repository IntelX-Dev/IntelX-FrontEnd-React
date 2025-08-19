"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import CollapsibleSidebar from "@/components/ui/collapsible-sidebar"
import EnhancedHeader from "@/components/ui/enhanced-header"
import KPICard from "@/components/ui/kpi-card"
import AccessibleAnimatedChart from "@/components/ui/accessible-animated-chart"
import AccessibleF1GridRFPs from "@/components/ui/accessible-f1-grid-rfps"
import { useAccessibility } from "@/lib/accessibility-context"
import { getDashboardSummary } from "@/lib/services/rfps"

interface EnhancedDashboardProps {
  onNavigate: (screen: "dashboard" | "rfps" | "detail" | "team" | "settings", rfp?: any) => void
  onLogout: () => void
}

export default function EnhancedDashboard({ onNavigate, onLogout }: EnhancedDashboardProps) {
  const [activeMetric, setActiveMetric] = useState("total")
  const { themeMode } = useAccessibility()
  const [summary, setSummary] = useState({
    total: 0,
    won: 0,
    pending: 0,
    rate: 0,
    chartData: [] as any[],
    pieData: [] as any[],
    recentRFPs: [] as any[],
  })

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const data = await getDashboardSummary()
      if (mounted) setSummary(data)
    })()
    return () => {
      mounted = false
    }
  }, [])

  const kpiData = {
    total: { value: summary.total, label: "Total RFPs", change: "" },
    won: { value: summary.won, label: "RFPs Won", change: "" },
    pending: { value: summary.pending, label: "Pending Review", change: "" },
    rate: { value: `${summary.rate}%`, label: "Win Rate", change: "" },
  }

  return (
    <div className={`flex min-h-screen ${themeMode === "dark" ? "dark" : ""}`}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen w-full flex">
        <CollapsibleSidebar activeItem="dashboard" onNavigate={onNavigate} />

        <div className="flex-1 flex flex-col">
          <EnhancedHeader onLogout={onLogout} />

          <main className="flex-1 p-6 space-y-6">
            {/* KPI Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {Object.entries(kpiData).map(([key, data], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <KPICard {...data} isActive={activeMetric === key} onClick={() => setActiveMetric(key)} />
                </motion.div>
              ))}
            </motion.div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="lg:col-span-2"
              >
                <AccessibleAnimatedChart
                  title="RFPs intake vs. submitted vs. won"
                  data={summary.chartData}
                  type="bar"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <AccessibleAnimatedChart
                  title="Win Rate"
                  subtitle="RFPs won vs. submitted"
                  data={summary.pieData}
                  type="doughnut"
                />
              </motion.div>
            </div>

            {/* Accessible F1 Grid Recent RFPs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <AccessibleF1GridRFPs data={summary.recentRFPs || []} onNavigate={onNavigate} />
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  )
}
