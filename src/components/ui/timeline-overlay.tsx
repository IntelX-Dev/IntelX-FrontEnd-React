"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Clock } from "lucide-react"

interface TimelineEvent {
  time: string
  title: string
  user: string
}

interface TimelineOverlayProps {
  isOpen: boolean
  onClose: () => void
  events: TimelineEvent[]
}

export default function TimelineOverlay({ isOpen, onClose, events }: TimelineOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-between">
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Timeline
              </h2>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg text-gray-600 hover:text-gray-800 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600" />

                {events.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    className="relative flex items-start space-x-4 pb-6"
                  >
                    {/* Timeline Dot */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.2 + 0.3, duration: 0.3 }}
                      className="relative z-10 w-3 h-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mt-2"
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [1, 0.5, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: index * 0.5,
                        }}
                        className="absolute inset-0 rounded-full bg-purple-400"
                      />
                    </motion.div>

                    {/* Event Content */}
                    <div className="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="flex items-center space-x-2 text-gray-600 text-sm mb-2">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>

                      <h3 className="text-gray-900 font-medium mb-2">{event.title}</h3>

                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
                          {event.user.charAt(0)}
                        </div>
                        <span className="text-gray-700 text-sm">{event.user}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
