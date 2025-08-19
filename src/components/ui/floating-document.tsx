"use client"

import { motion } from "framer-motion"
import { Shield } from "lucide-react"

export default function FloatingDocument() {
  return (
    <motion.div
      animate={{
        rotateY: [0, 10, 0, -10, 0],
        rotateX: [0, 5, 0, -5, 0],
      }}
      transition={{
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      className="relative"
      style={{ perspective: "1000px" }}
    >
      <div className="relative w-32 h-40 transform-gpu">
        {/* Main Document */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-2xl border border-gray-200"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Document Lines */}
          <div className="p-4 space-y-2">
            <div className="h-2 bg-blue-300 rounded w-3/4" />
            <div className="h-2 bg-gray-300 rounded w-full" />
            <div className="h-2 bg-gray-300 rounded w-5/6" />
            <div className="h-2 bg-gray-300 rounded w-2/3" />
            <div className="h-2 bg-red-300 rounded w-1/2" />
          </div>
        </motion.div>

        {/* Shield Icon */}
        <motion.div
          className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Shield className="w-6 h-6 text-white" />
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-400"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/60 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
