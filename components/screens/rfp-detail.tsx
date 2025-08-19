"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Edit,
  Calendar,
  User,
  Clock,
  DollarSign,
  Users,
  Building,
  FileText,
  Upload,
  Download,
  MessageSquare,
  Star,
  CheckCircle,
} from "lucide-react"
import Sidebar from "@/components/ui/sidebar"
import Header from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import StatusBadge from "@/components/ui/status-badge"
import PriorityBadge from "@/components/ui/priority-badge"
import ProgressBar from "@/components/ui/progress-bar"
import TimelineOverlay from "@/components/ui/timeline-overlay"

interface RFPDetailProps {
  rfp: any
  onNavigate: (screen: "dashboard" | "rfps" | "detail", rfp?: any) => void
}

export default function RFPDetail({ rfp, onNavigate }: RFPDetailProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [rfpName, setRfpName] = useState(rfp.title)
  const [showTimeline, setShowTimeline] = useState(false)

  const handleSave = () => {
    setIsEditing(false)
  }

  const detailData = {
    id: "RFP-2024-001",
    budget: "$250,000",
    teamMembers: 3,
    priority: "HIGH",
    completion: 75,
    createdBy: "John Doe",
    createdDate: "2024-03-01",
    dueDate: "2024-04-15",
    company: "Acme Corporation",
    tags: ["enterprise", "crm", "high-priority"],
    description:
      "Implementation of a comprehensive Enterprise CRM system to streamline customer relationship management across all departments.",
    documents: [
      { name: "Requirements.pdf", size: "2.4 MB", type: "pdf" },
      { name: "Technical Specs.docx", size: "1.8 MB", type: "doc" },
      { name: "Budget Analysis.xlsx", size: "956 KB", type: "excel" },
    ],
    questions: [
      { id: 1, question: "What is your experience with CRM implementations?", status: "answered" },
      { id: 2, question: "Can you provide references from similar projects?", status: "pending" },
      { id: 3, question: "What is your proposed timeline?", status: "answered" },
    ],
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeItem="rfps" />

      <div className="flex-1 flex flex-col">
        <Header />

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
                    onClick={() => onNavigate("rfps")}
                    className="p-2 rounded-xl bg-white shadow-md hover:shadow-lg text-gray-600 hover:text-gray-800 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </motion.button>
                  {isEditing ? (
                    <div className="flex items-center space-x-2">
                      <Input
                        value={rfpName}
                        onChange={(e) => setRfpName(e.target.value)}
                        className="text-2xl font-bold bg-white border-gray-200"
                      />
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {rfpName}
                      </h1>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsEditing(true)}
                        className="p-2 rounded-xl bg-white shadow-md hover:shadow-lg text-gray-600 hover:text-gray-800 transition-all duration-300"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                    </>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <StatusBadge status={rfp.status} />
                  <PriorityBadge priority={detailData.priority} />
                  <Button
                    onClick={() => setShowTimeline(true)}
                    variant="outline"
                    className="border-gray-200 text-gray-700 hover:bg-gray-50"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Timeline
                  </Button>
                </div>
              </div>

              {/* Progress Bar */}
              <ProgressBar progress={detailData.completion} />
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Basic Info */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-gray-600 text-sm">RFP ID</p>
                        <p className="text-gray-900 font-semibold">{detailData.id}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Building className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="text-gray-600 text-sm">Company</p>
                        <p className="text-gray-900 font-semibold">{detailData.company}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-gray-600 text-sm">Created by</p>
                        <p className="text-gray-900 font-semibold">{detailData.createdBy}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="text-gray-600 text-sm">Created date</p>
                        <p className="text-gray-900 font-semibold">{detailData.createdDate}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="text-gray-600 text-sm">Due date</p>
                        <p className="text-gray-900 font-semibold">{detailData.dueDate}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <DollarSign className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="text-gray-600 text-sm">Budget</p>
                        <p className="text-gray-900 font-semibold">{detailData.budget}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-indigo-600" />
                      <div>
                        <p className="text-gray-600 text-sm">Team Members</p>
                        <p className="text-gray-900 font-semibold">{detailData.teamMembers}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {detailData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Detailed Sections */}
              <div className="lg:col-span-2 space-y-6">
                {/* Description */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{detailData.description}</p>
                </div>

                {/* Documents */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Documents</h3>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-gray-200 bg-transparent">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Files
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-200 bg-transparent">
                        <Download className="w-4 h-4 mr-2" />
                        View Files
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {detailData.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-100"
                      >
                        <FileText className="w-8 h-8 text-blue-600" />
                        <div className="flex-1">
                          <p className="text-gray-900 font-medium">{doc.name}</p>
                          <p className="text-gray-500 text-sm">{doc.size}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status & Delegation */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Status & Delegation</h3>
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Status</p>
                      <StatusBadge status={rfp.status} />
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Assigned To</p>
                      <Button size="sm" variant="outline" className="border-gray-200 bg-transparent">
                        Designer
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Questions */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Questions</h3>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      View Questions
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {detailData.questions.map((q) => (
                      <div key={q.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <p className="text-gray-700 flex-1">{q.question}</p>
                        <Badge variant={q.status === "answered" ? "default" : "secondary"}>{q.status}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Evaluation */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Evaluation</h3>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-gray-200 bg-transparent">
                        <Star className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Evaluate Criteria
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4">
                    <p className="text-gray-700">Evaluation criteria and scoring will be displayed here.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>

      <TimelineOverlay
        isOpen={showTimeline}
        onClose={() => setShowTimeline(false)}
        events={[
          {
            time: "07 Aug 2025 10:05AM",
            title: 'Created "Cloud Migration for Acme Corp" RFP',
            user: "Kanaada",
          },
          {
            time: "07 Aug 2025 10:15AM",
            title: "3 Folders and 34 Files were uploaded",
            user: "Kanaada",
          },
        ]}
      />
    </div>
  )
}
