"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Search, Plus, ArrowLeft } from "lucide-react"
import Sidebar from "@/components/ui/sidebar"
import Header from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import RFPCard from "@/components/ui/rfp-card"
import AddRFPModal from "@/components/ui/add-rfp-modal"
import { getRFPs } from "@/lib/services/rfps"

interface RFPListingProps {
  onNavigate: (screen: "dashboard" | "rfps" | "detail", rfp?: any) => void
  onLogout: () => void
}

export default function RFPListing({ onNavigate, onLogout }: RFPListingProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [rfps, setRfps] = useState<any[]>([])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const data = await getRFPs()
      if (mounted) setRfps(Array.isArray(data) ? data : [])
    })()
    return () => {
      mounted = false
    }
  }, [])

  const filteredRFPs = rfps.filter(
    (rfp) =>
      (rfp?.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (rfp?.company || "").toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddRFP = (data: any) => {
    console.log("New RFP:", data)
    setShowAddModal(false)
    // Navigate to the new RFP detail page
    onNavigate("detail", { ...data, id: Date.now() })
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeItem="rfps" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col">
        <Header onLogout={onLogout} />

        <main className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <motion.button
                    onClick={() => onNavigate("dashboard")}
                    className="p-2 rounded-xl bg-white shadow-md hover:shadow-lg text-gray-600 hover:text-gray-800 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </motion.button>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    RFP Portfolio
                  </h1>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => setShowAddModal(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add RFP
                  </Button>
                </motion.div>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search by title, company, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-purple-400 focus:ring-purple-400/20"
                />
              </div>
            </div>

            {/* RFP Cards Grid */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRFPs.map((rfp, index) => (
                  <motion.div
                    key={rfp.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <RFPCard rfp={rfp} onNavigate={onNavigate} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </main>
      </div>

      <AddRFPModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onSubmit={handleAddRFP} />
    </div>
  )
}
