"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Search, Mail, Phone, MoreVertical, UserPlus, Crown, Shield, User } from "lucide-react"
import Sidebar from "@/components/ui/sidebar"
import Header from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import AddTeamMemberModal from "@/components/ui/add-team-member-modal"
import { teamData } from "@/lib/team-data"

interface TeamPageProps {
  onNavigate: (screen: "dashboard" | "rfps" | "detail" | "team" | "settings") => void
  onLogout: () => void
}

export default function TeamPage({ onNavigate, onLogout }: TeamPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedRole, setSelectedRole] = useState("all")

  const filteredMembers = teamData.members.filter(
    (member) =>
      (member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedRole === "all" || member.role.toLowerCase() === selectedRole.toLowerCase()),
  )

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return Crown
      case "manager":
        return Shield
      default:
        return User
    }
  }

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "manager":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeItem="team" />

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
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Team Management
                    </h1>
                    <p className="text-gray-600 mt-1">Manage your RFP team members and their roles</p>
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => setShowAddModal(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Add Member
                  </Button>
                </motion.div>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search team members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-purple-400 focus:ring-purple-400/20"
                  />
                </div>
                <div className="flex space-x-2">
                  {["all", "admin", "manager", "member"].map((role) => (
                    <Button
                      key={role}
                      variant={selectedRole === role ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedRole(role)}
                      className={
                        selectedRole === role
                          ? "bg-purple-600 text-white"
                          : "border-gray-200 text-gray-700 hover:bg-gray-50"
                      }
                    >
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Team Stats */}
            <div className="p-6 border-b border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {teamData.stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 border border-gray-100"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-gray-600 text-sm">{stat.label}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Team Members Grid */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMembers.map((member, index) => {
                  const RoleIcon = getRoleIcon(member.role)
                  return (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{member.name}</h3>
                            <p className="text-gray-600 text-sm">{member.position}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getRoleColor(member.role)}>
                            <RoleIcon className="w-3 h-3 mr-1" />
                            {member.role}
                          </Badge>
                          <Button variant="ghost" size="sm" className="p-1">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span className="text-sm">{member.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span className="text-sm">{member.phone}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Active RFPs</span>
                          <span className="font-semibold text-gray-900">{member.activeRFPs}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm mt-1">
                          <span className="text-gray-600">Win Rate</span>
                          <span className="font-semibold text-green-600">{member.winRate}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-600">Performance</span>
                          <span className="text-gray-900">{member.performance}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${member.performance}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </main>
      </div>

      <AddTeamMemberModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={(data) => {
          console.log("New team member:", data)
          setShowAddModal(false)
        }}
      />
    </div>
  )
}
