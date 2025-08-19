"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js"
import { Bar, Doughnut } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

interface AnimatedChartProps {
  title: string
  subtitle?: string
  data: any
  type: "bar" | "doughnut"
}

export default function AnimatedChart({ title, subtitle, data, type }: AnimatedChartProps) {
  const chartRef = useRef<any>(null)

  const isValidData = !!data && Array.isArray(data.datasets) && data.datasets.length > 0 && Array.isArray(data.labels)

  const safeData = isValidData
    ? data
    : {
        labels: [],
        datasets: [],
      }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "rgba(75, 85, 99, 1)",
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderWidth: 1,
      },
    },
    scales:
      type === "bar"
        ? {
            x: {
              ticks: { color: "rgba(75, 85, 99, 0.8)" },
              grid: { color: "rgba(75, 85, 99, 0.1)" },
            },
            y: {
              ticks: { color: "rgba(75, 85, 99, 0.8)" },
              grid: { color: "rgba(75, 85, 99, 0.1)" },
            },
          }
        : undefined,
    animation: {
      duration: 2000,
      easing: "easeInOutQuart" as const,
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xl"
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
      </div>

      <div className="relative h-80">
        {isValidData ? (
          type === "bar" ? (
            <Bar ref={chartRef} data={safeData} options={options} />
          ) : (
            <Doughnut ref={chartRef} data={safeData} options={options} />
          )
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">No data available</div>
        )}
      </div>
    </motion.div>
  )
}
