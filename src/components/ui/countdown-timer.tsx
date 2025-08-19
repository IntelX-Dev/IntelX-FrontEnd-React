"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CountdownTimerProps {
  dueDate: string
}

export default function CountdownTimer({ dueDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(dueDate) - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 60000)

    return () => clearInterval(timer)
  }, [dueDate])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center space-x-2 text-xs"
    >
      <div className="text-center">
        <div className="bg-purple-100 text-purple-800 font-bold px-2 py-1 rounded">
          {timeLeft.days.toString().padStart(2, "0")}
        </div>
        <p className="text-gray-500 mt-1">Days</p>
      </div>
      <div className="text-center">
        <div className="bg-blue-100 text-blue-800 font-bold px-2 py-1 rounded">
          {timeLeft.hours.toString().padStart(2, "0")}
        </div>
        <p className="text-gray-500 mt-1">Hours</p>
      </div>
      <div className="text-center">
        <div className="bg-green-100 text-green-800 font-bold px-2 py-1 rounded">
          {timeLeft.minutes.toString().padStart(2, "0")}
        </div>
        <p className="text-gray-500 mt-1">Min</p>
      </div>
    </motion.div>
  )
}
