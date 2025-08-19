"use client"

import { motion } from "framer-motion"
import { Circle, Square, Triangle, Diamond, Hexagon, Star } from "lucide-react"
import { useAccessibility } from "@/lib/accessibility-context"

interface AccessibleStatusBadgeProps {
  status: string
}

export default function AccessibleStatusBadge({ status }: AccessibleStatusBadgeProps) {
  const { getStatusColors } = useAccessibility()
  const colors = getStatusColors(status)

  // Different shapes for different statuses to aid color blind users
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return Circle
      case "in-review":
      case "in review":
        return Square
      case "pending":
        return Triangle
      case "approved":
        return Diamond
      case "closed":
        return Hexagon
      case "draft":
        return Star
      default:
        return Circle
    }
  }

  const StatusIcon = getStatusIcon(status)

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${colors.bg} ${colors.text} ${colors.border}`}
    >
      <div className={`w-2 h-2 rounded-full mr-2 ${colors.icon}`}>
        <StatusIcon className="w-2 h-2 text-white" />
      </div>
      <span className="uppercase tracking-wide">{status}</span>
    </motion.span>
  )
}
