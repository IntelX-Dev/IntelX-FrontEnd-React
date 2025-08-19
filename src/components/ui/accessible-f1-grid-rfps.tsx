"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Calendar, Building, ArrowUpDown, Clock, DollarSign, Users } from "lucide-react"
import AccessibleStatusBadge from "./accessible-status-badge"
import AccessiblePriorityBadge from "./accessible-priority-badge"
import CountdownTimer from "./countdown-timer"
import { Button } from "@/components/ui/button"
import { useAccessibility } from "@/lib/accessibility-context"

interface AccessibleF1GridRFPsProps {
  data: any[]
  onNavigate: (screen: "dashboard" | "rfps" | "detail", rfp?: any) => void
}

export default function AccessibleF1GridRFPs({ data, onNavigate }: AccessibleF1GridRFPsProps) {
  const [selectedRFP, setSelectedRFP] = useState(data[0])
  const { themeMode } = useAccessibility()

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
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Recent RFP's
          </h3>
          <motion.button
            onClick={() => onNavigate("rfps")}
            className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium"
            whileHover={{ x: 5 }}
          >
            <span>View more</span>
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left Section - Table Layout */}
        <div className="border-r border-gray-100 dark:border-gray-700">
          {/* Table Header */}
          <div className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700 px-6 py-3">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
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
                className={`grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-50 dark:border-gray-700/50 cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/30 ${
                  selectedRFP?.id === rfp.id
                    ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500 dark:border-l-blue-400"
                    : ""
                }`}
                onClick={() => handleRowClick(rfp)}
                whileHover={{ x: 2 }}
              >
                {/* Title */}
                <div className="col-span-5">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm leading-tight line-clamp-2">
                    {rfp.title}
                  </h4>
                </div>

                {/* Due Date */}
                <div className="col-span-3">
                  <span className="text-gray-600 dark:text-gray-300 text-sm">{rfp.due}</span>
                </div>

                {/* Status */}
                <div className="col-span-4 flex items-center space-x-2">
                  <AccessibleStatusBadge status={rfp.status} />
                  {rfp.isNew && (
                    <span className="bg-purple-500 dark:bg-purple-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                      new
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Section - Expanded Cards */}
        <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20">
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
                {/* Primary Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 leading-tight">
                        {selectedRFP.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 mb-3">
                        <Building className="w-4 h-4" />
                        <span className="text-sm font-medium">{selectedRFP.company}</span>
                      </div>
                    </div>
                    <AccessiblePriorityBadge priority={selectedRFP.priority} />
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    <AccessibleStatusBadge status={selectedRFP.status} />
                    {selectedRFP.isNew && (
                      <span className="bg-purple-500 dark:bg-purple-600 text-white text-xs font-medium px-2 py-1 rounded-full animate-pulse">
                        new
                      </span>
                    )}
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-3 border border-purple-100 dark:border-purple-800/30">
                      <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 mb-1">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-bold text-sm">{selectedRFP.budget}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-xs">Budget</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-3 border border-blue-100 dark:border-blue-800/30">
                      <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 mb-1">
                        <Users className="w-4 h-4" />
                        <span className="font-bold text-sm">{selectedRFP.teamMembers}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-xs">Team Size</p>
                    </div>
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white rounded-xl py-3 font-semibold">
                    Check Status
                  </Button>

                  {/* Countdown Timer */}
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 mb-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">Time Remaining</span>
                    </div>
                    <CountdownTimer dueDate={selectedRFP.due} />
                  </div>
                </div>

                {/* Secondary Card Preview */}
                {sortedRFPs[1] && sortedRFPs[1].id !== selectedRFP.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="bg-white/70 dark:bg-gray-800/70 rounded-2xl p-4 shadow-md border border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-white dark:hover:bg-gray-800 transition-all duration-200"
                    onClick={() => handleRowClick(sortedRFPs[1])}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Another RFP
                      </span>
                      <div className="flex items-center space-x-2 text-xs text-gray-400 dark:text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>Due: {sortedRFPs[1].due}</span>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-sm line-clamp-2">
                      {sortedRFPs[1].title}
                    </h4>
                    <Button
                      size="sm"
                      className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white rounded-xl"
                    >
                      Check Status
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
