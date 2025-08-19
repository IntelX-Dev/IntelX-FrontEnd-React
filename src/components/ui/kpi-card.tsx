"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown } from "lucide-react"
import AnimatedCounter from "./animated-counter"

interface KPICardProps {
  value: string | number
  label: string
  change: string
  isActive: boolean
  onClick: () => void
}

export default function KPICard({ value, label, change, isActive, onClick }: KPICardProps) {
  const isPositive = change.startsWith("+")

  return (
    <motion.div
      onClick={onClick}
      className={`bg-white rounded-2xl p-6 border cursor-pointer transition-all duration-300 ${
        isActive
          ? "border-blue-200 shadow-lg shadow-blue-100 bg-gradient-to-br from-blue-50 to-purple-50"
          : "border-gray-100 hover:border-gray-200 hover:shadow-md"
      }`}
      whileHover={{
        scale: 1.02,
        boxShadow: isActive ? "0 20px 40px rgba(59, 130, 246, 0.15)" : "0 10px 30px rgba(0, 0, 0, 0.1)",
      }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-3xl font-bold text-gray-900">
          {typeof value === "number" ? (
            <AnimatedCounter value={value} />
          ) : (
            <motion.span
              key={value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {value}
            </motion.span>
          )}
        </div>
        <div
          className={`flex items-center space-x-1 text-sm font-medium ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{change}</span>
        </div>
      </div>

      <p className="text-gray-600 font-medium">{label}</p>

      {isActive && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full origin-left"
        />
      )}
    </motion.div>
  )
}
