"use client"

import { motion } from "framer-motion"
import { Brain, Zap, Users, BarChart3, Shield, Rocket } from "lucide-react"

export default function FloatingElements() {
  const elements = [
    { icon: Brain, delay: 0, x: "10%", y: "20%" },
    { icon: Zap, delay: 0.5, x: "80%", y: "15%" },
    { icon: Users, delay: 1, x: "15%", y: "70%" },
    { icon: BarChart3, delay: 1.5, x: "85%", y: "75%" },
    { icon: Shield, delay: 2, x: "5%", y: "50%" },
    { icon: Rocket, delay: 2.5, x: "90%", y: "45%" },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: element.x, top: element.y }}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{
            opacity: [0, 0.6, 0.3, 0.8, 0.2],
            scale: [0, 1.2, 0.8, 1.5, 0.5],
            rotate: [0, 360, 180, 720, 0],
            x: [0, 50, -30, 80, -20],
            y: [0, -40, 60, -80, 40],
          }}
          transition={{
            duration: 20,
            delay: element.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20">
            <element.icon className="w-8 h-8 text-white/70" />
          </div>
        </motion.div>
      ))}

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 bg-white/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.3, 1, 0.3],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}
