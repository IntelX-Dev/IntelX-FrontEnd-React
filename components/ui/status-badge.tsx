"use client"

import { motion } from "framer-motion"

interface StatusBadgeProps {
  status: string
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          border: "border-green-200",
          pulse: "animate-pulse",
        }
      case "in-review":
      case "in review":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-800",
          border: "border-yellow-200",
          pulse: "animate-pulse",
        }
      case "approved":
        return {
          bg: "bg-blue-100",
          text: "text-blue-800",
          border: "border-blue-200",
          pulse: "",
        }
      case "pending":
        return {
          bg: "bg-orange-100",
          text: "text-orange-800",
          border: "border-orange-200",
          pulse: "animate-pulse",
        }
      case "closed":
        return {
          bg: "bg-red-100",
          text: "text-red-800",
          border: "border-red-200",
          pulse: "",
        }
      case "draft":
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          border: "border-gray-200",
          pulse: "",
        }
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          border: "border-gray-200",
          pulse: "",
        }
    }
  }

  const config = getStatusConfig(status)

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border} ${config.pulse}`}
    >
      <div className={`w-2 h-2 rounded-full mr-2 ${config.text.replace("text-", "bg-")}`} />
      {status}
    </motion.span>
  )
}
