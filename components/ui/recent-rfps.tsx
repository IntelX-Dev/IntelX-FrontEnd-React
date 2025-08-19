"use client"

import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import StatusBadge from "./status-badge"

interface RecentRFPsProps {
  data: any[]
  onNavigate: (screen: "dashboard" | "rfps" | "detail", rfp?: any) => void
}

export default function RecentRFPs({ data, onNavigate }: RecentRFPsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-xl overflow-hidden"
    >
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Recent RFP's</h3>
        <motion.button
          onClick={() => onNavigate("rfps")}
          className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
          whileHover={{ x: 5 }}
        >
          <span>View more</span>
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left p-4 text-white/80 font-semibold">TITLE</th>
              <th className="text-left p-4 text-white/80 font-semibold">DUE</th>
              <th className="text-left p-4 text-white/80 font-semibold">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((rfp, index) => (
              <motion.tr
                key={rfp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
                onClick={() => onNavigate("detail", rfp)}
              >
                <td className="p-4 text-white">{rfp.title}</td>
                <td className="p-4 text-white/80">{rfp.due}</td>
                <td className="p-4">
                  <StatusBadge status={rfp.status} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
