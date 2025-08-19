"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Calendar, Building, ArrowUpDown } from "lucide-react"
import StatusBadge from "./status-badge"
import CountdownTimer from "./countdown-timer"
import { Button } from "@/components/ui/button"

interface F1GridRFPsProps {
  data: any[]
  onNavigate: (screen: "dashboard" | "rfps" | "detail", rfp?: any) => void
}

export default function F1GridRFPs({ data, onNavigate }: F1GridRFPsProps) {
  const [selectedRFP, setSelectedRFP] = useState(data[0])

  // Sort RFPs by most recent first
  const sortedRFPs = [...data].sort(
    (a, b) => new Date(b.createdOn || b.due).getTime() - new Date(a.createdOn || a.due).getTime(),
  )

  const handleRowClick = (rfp: any) => {
    setSelectedRFP(rfp)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Recent RFP's
          </h3>
          <motion.button
            onClick={() => onNavigate("rfps")}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors font-medium"
            whileHover={{ x: 5 }}
          >
            <span>View more</span>
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left Section - Table Layout */}
        <div className="border-r border-gray-100">
          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-100 px-6 py-3">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600 uppercase tracking-wide">
              <div className="col-span-5 flex items-center space-x-1">
                <span>TITLE</span>
                <ArrowUpDown className="w-3 h-3" />
              </div>
              <div className="col-span-3 flex items-center space-x-1">
                <span>DUE</span>
                <ArrowUpDown className="w-3 h-3" />
              </div>
              <div className="col-span-4 flex items-center space-x-1">
                <span>STATUS</span>
                <ArrowUpDown className="w-3 h-3" />
              </div>
            </div>
          </div>

          {/* Table Rows */}
          <div className="max-h-80 overflow-y-auto">
            {sortedRFPs.slice(0, 6).map((rfp, index) => (
              <motion.div
                key={rfp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className={`grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-50 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                  selectedRFP?.id === rfp.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                }`}
                onClick={() => handleRowClick(rfp)}
                whileHover={{ x: 2 }}
              >
                {/* Title */}
                <div className="col-span-5">
                  <h4 className="font-medium text-gray-900 text-sm leading-tight line-clamp-2">{rfp.title}</h4>
                </div>

                {/* Due Date */}
                <div className="col-span-3">
                  <span className="text-gray-600 text-sm">{rfp.due}</span>
                </div>

                {/* Status */}
                <div className="col-span-4 flex items-center space-x-2">
                  <StatusBadge status={rfp.status} />
                  {rfp.isNew && (
                    <span className="bg-purple-500 text-white text-xs font-medium px-2 py-1 rounded-full">new</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Section - Expanded Cards */}
        <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50">
          <AnimatePresence mode="wait">
            {selectedRFP && (
              <motion.div
                key={selectedRFP.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.3, type: "spring", damping: 25 }}
                className="space-y-4"
              >
                {/* First Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{selectedRFP.title}</h3>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Building className="w-4 h-4" />
                        <span className="text-sm">{selectedRFP.company}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    <StatusBadge status={selectedRFP.status} />
                    {selectedRFP.isNew && (
                      <span className="bg-purple-500 text-white text-xs font-medium px-2 py-1 rounded-full">new</span>
                    )}
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl py-3">
                    Check status
                  </Button>

                  {/* Countdown Timer */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <CountdownTimer dueDate={selectedRFP.due} />
                  </div>
                </div>

                {/* Second Card - Another RFP preview */}
                {sortedRFPs[1] && sortedRFPs[1].id !== selectedRFP.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="bg-white/70 rounded-2xl p-4 shadow-md border border-gray-100 cursor-pointer hover:bg-white transition-all duration-200"
                    onClick={() => handleRowClick(sortedRFPs[1])}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Another RFP name</span>
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" />
                        <span>05</span>
                        <span>06</span>
                        <span>0</span>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-3">{sortedRFPs[1].title}</h4>
                    <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
                      Check status
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
