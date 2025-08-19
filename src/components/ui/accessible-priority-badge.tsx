"use client"

import { motion } from "framer-motion"
import { AlertTriangle, AlertCircle, Info } from "lucide-react"
import { useAccessibility } from "@/lib/accessibility-context"

interface AccessiblePriorityBadgeProps {
  priority: string
}

export default function AccessiblePriorityBadge({ priority }: AccessiblePriorityBadgeProps) {
  const { getPriorityColors } = useAccessibility()
  const colors = getPriorityColors(priority)

  const getPriorityIcon = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return AlertTriangle
      case "medium":
        return AlertCircle
      case "low":
        return Info
      default:
        return AlertCircle
    }
  }

  const PriorityIcon = getPriorityIcon(priority)

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${colors.bg} ${colors.text} ${colors.border}`}
    >
      <PriorityIcon className="w-3 h-3 mr-1" />
      <span className="uppercase tracking-wide">{priority}</span>
    </motion.span>
  )
}
