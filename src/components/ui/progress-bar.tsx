"use client"

import { motion } from "framer-motion"

interface ProgressBarProps {
  progress: number
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
}

export default function ProgressBar({ progress, size = "md", showLabel = true }: ProgressBarProps) {
  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  }

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-gray-900">{progress}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]}`}>
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
          style={{ height: "100%" }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}
