"use client"

import { motion } from "framer-motion"
import { Calendar, Users, DollarSign, Building, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import StatusBadge from "./status-badge"
import PriorityBadge from "./priority-badge"
import ProgressBar from "./progress-bar"

interface RFPCardProps {
  rfp: any
  onNavigate: (screen: "dashboard" | "rfps" | "detail", rfp?: any) => void
}

export default function RFPCard({ rfp, onNavigate }: RFPCardProps) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onNavigate("detail", rfp)}
    >
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{rfp.title}</h3>
            <div className="flex items-center space-x-2 text-gray-600">
              <Building className="w-4 h-4" />
              <span className="text-sm">{rfp.company}</span>
            </div>
          </div>
          <PriorityBadge priority={rfp.priority} />
        </div>

        <div className="flex items-center justify-between">
          <StatusBadge status={rfp.status} />
          <div className="text-right">
            <p className="text-sm text-gray-600">{rfp.completion}/5 Complete</p>
            <ProgressBar progress={(rfp.completion / 5) * 100} size="sm" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Budget</p>
              <p className="font-semibold text-gray-900">{rfp.budget}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Team</p>
              <p className="font-semibold text-gray-900">{rfp.teamMembers} members</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="w-4 h-4 text-purple-600" />
          <div>
            <p className="text-sm text-gray-600">Due: {rfp.due}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {rfp.tags.map((tag: string, index: number) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Action Button */}
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          onClick={(e) => {
            e.stopPropagation()
            onNavigate("detail", rfp)
          }}
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </div>
    </motion.div>
  )
}
