"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js"
import { Bar, Doughnut } from "react-chartjs-2"
import { useAccessibility } from "@/lib/accessibility-context"

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

interface AccessibleAnimatedChartProps {
  title: string
  subtitle?: string
  data: any
  type: "bar" | "doughnut"
}

export default function AccessibleAnimatedChart({ title, subtitle, data, type }: AccessibleAnimatedChartProps) {
  const chartRef = useRef<any>(null)
  const { getChartColors, colorBlindnessMode, themeMode } = useAccessibility()

  // Update chart colors based on accessibility mode
  const chartColors = getChartColors()

  const hasData = !!data && Array.isArray(data.datasets) && data.datasets.length > 0 && Array.isArray(data.labels)

  const updatedData = hasData
    ? {
        ...data,
        datasets: data.datasets.map((dataset: any, index: number) => {
          const colorKeys = Object.keys(chartColors)
          const colorKey = colorKeys[index % colorKeys.length] as keyof typeof chartColors
          const color = chartColors[colorKey]

          return {
            ...dataset,
            backgroundColor: color,
            borderColor: color.replace("0.8", "1"),
            borderWidth: 2,
          }
        }),
      }
    : { labels: [], datasets: [] }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: themeMode === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(75, 85, 99, 1)",
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: "bold" as const,
          },
        },
      },
      tooltip: {
        backgroundColor: themeMode === "dark" ? "rgba(0, 0, 0, 0.9)" : "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: themeMode === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.2)",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.parsed.y || context.parsed}`,
        },
      },
    },
    scales:
      type === "bar"
        ? {
            x: {
              ticks: {
                color: themeMode === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(75, 85, 99, 0.8)",
                font: { weight: "bold" as const },
              },
              grid: {
                color: themeMode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(75, 85, 99, 0.1)",
                lineWidth: 1,
              },
            },
            y: {
              ticks: {
                color: themeMode === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(75, 85, 99, 0.8)",
                font: { weight: "bold" as const },
              },
              grid: {
                color: themeMode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(75, 85, 99, 0.1)",
                lineWidth: 1,
              },
            },
          }
        : undefined,
    animation: {
      duration: 2000,
      easing: "easeInOutQuart" as const,
    },
  }

  // Force chart update when accessibility mode changes
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update()
    }
  }, [colorBlindnessMode, themeMode])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-xl"
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
        {subtitle && <p className="text-gray-600 dark:text-gray-400 text-sm">{subtitle}</p>}

        {/* Accessibility indicator */}
        <div className="mt-2 flex items-center space-x-2">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Mode: <span className="font-semibold capitalize">{colorBlindnessMode}</span>
          </div>
          <div className="flex space-x-1">
            {Object.values(chartColors).map((color, index) => (
              <div
                key={index}
                className="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-600"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative h-80">
        {hasData ? (
          type === "bar" ? (
            <Bar ref={chartRef} data={updatedData} options={options} />
          ) : (
            <Doughnut ref={chartRef} data={updatedData} options={options} />
          )
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">No data available</div>
        )}
      </div>
    </motion.div>
  )
}
