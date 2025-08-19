"use client"

import { motion } from "framer-motion"

interface PriorityBadgeProps {
  priority: string
}

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
  const getPriorityConfig = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return {
          bg: "bg-red-100",
          text: "text-red-800",
          border: "border-red-200",
        }
      case "medium":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-800",
          border: "border-yellow-200",
        }
      case "low":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          border: "border-green-200",
        }
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          border: "border-gray-200",
        }
    }
  }

  const config = getPriorityConfig(priority)

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}
    >
      {priority}
    </motion.span>
  )
}
