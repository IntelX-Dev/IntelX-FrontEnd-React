"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Shield, FileText, Users, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

interface CreateRoleModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export default function CreateRoleModal({ isOpen, onClose, onSubmit }: CreateRoleModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: {
      // RFP Analysis
      createAnalysis: false,
      editAnalysis: false,
      deleteAnalysis: false,
      viewAnalysis: false,

      // Reports
      createReports: false,
      editReports: false,
      viewReports: false,

      // User Management
      createUsers: false,
      editUsers: false,
      deleteUsers: false,
      viewUsers: false,

      // System
      manageSettings: false,
      systemAdministration: false,
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      name: "",
      description: "",
      permissions: {
        createAnalysis: false,
        editAnalysis: false,
        deleteAnalysis: false,
        viewAnalysis: false,
        createReports: false,
        editReports: false,
        viewReports: false,
        createUsers: false,
        editUsers: false,
        deleteUsers: false,
        viewUsers: false,
        manageSettings: false,
        systemAdministration: false,
      },
    })
  }

  const permissionSections = [
    {
      title: "RFP Analysis",
      icon: FileText,
      permissions: [
        { key: "createAnalysis", label: "Create RFP Analysis" },
        { key: "editAnalysis", label: "Edit RFP Analysis" },
        { key: "deleteAnalysis", label: "Delete RFP Analysis" },
        { key: "viewAnalysis", label: "View RFP Analysis" },
      ],
    },
    {
      title: "Reports",
      icon: Shield,
      permissions: [
        { key: "createReports", label: "Create Reports" },
        { key: "editReports", label: "Edit Reports" },
        { key: "viewReports", label: "View Reports" },
      ],
    },
    {
      title: "User Management",
      icon: Users,
      permissions: [
        { key: "createUsers", label: "Create Users" },
        { key: "editUsers", label: "Edit Users" },
        { key: "deleteUsers", label: "Delete Users" },
        { key: "viewUsers", label: "View Users" },
      ],
    },
    {
      title: "System",
      icon: Settings,
      permissions: [
        { key: "manageSettings", label: "Manage Settings" },
        { key: "systemAdministration", label: "System Administration" },
      ],
    },
  ]

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
            className="bg-white rounded-3xl border border-gray-100 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-between">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Create New Role
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

            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(90vh-140px)] overflow-y-auto">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Role Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter role name"
                    className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-purple-400 focus:ring-purple-400/20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the role's purpose"
                    className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-purple-400 focus:ring-purple-400/20"
                    rows={3}
                  />
                </div>
              </div>

              {/* Permissions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Permissions</h3>
                <div className="space-y-6">
                  {permissionSections.map((section) => (
                    <div key={section.title} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="flex items-center space-x-2 mb-3">
                        <section.icon className="w-5 h-5 text-gray-600" />
                        <h4 className="font-semibold text-gray-900">{section.title}</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {section.permissions.map((permission) => (
                          <div key={permission.key} className="flex items-center space-x-2">
                            <Checkbox
                              id={permission.key}
                              checked={formData.permissions[permission.key as keyof typeof formData.permissions]}
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  permissions: {
                                    ...formData.permissions,
                                    [permission.key]: checked,
                                  },
                                })
                              }
                              className="border-gray-300 data-[state=checked]:bg-purple-600"
                            />
                            <label
                              htmlFor={permission.key}
                              className="text-sm text-gray-700 cursor-pointer select-none"
                            >
                              {permission.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4 pt-4 border-t border-gray-100">
                <Button
                  type="button"
                  onClick={onClose}
                  variant="outline"
                  className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50 bg-white"
                >
                  Cancel
                </Button>
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                    disabled={!formData.name.trim()}
                  >
                    Create Role
                  </Button>
                </motion.div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
