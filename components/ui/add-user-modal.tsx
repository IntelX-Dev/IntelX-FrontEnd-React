"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, User, Mail, Phone, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/lib/language-context"

interface AddUserModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export default function AddUserModal({ isOpen, onClose, onSubmit }: AddUserModalProps) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    role: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({ firstName: "", lastName: "", email: "", phone: "", position: "", role: "" })
  }

  const roles = [
    { value: "super-admin", label: t("superAdmin") },
    { value: "analyst-manager", label: t("rfpAnalystManager") },
    { value: "senior-analyst", label: t("seniorAnalyst") },
    { value: "viewer", label: t("viewer") },
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
            className="bg-white rounded-3xl border border-gray-100 shadow-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-between">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t("addUser")}
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

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">{t("firstName")}</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="Enter first name"
                      className="pl-12 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-purple-400 focus:ring-purple-400/20"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">{t("lastName")}</label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Enter last name"
                    className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-purple-400 focus:ring-purple-400/20"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">{t("email")}</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email address"
                    className="pl-12 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-purple-400 focus:ring-purple-400/20"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">{t("phone")}</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter phone number"
                    className="pl-12 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-purple-400 focus:ring-purple-400/20"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">{t("position")}</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    placeholder="Enter position"
                    className="pl-12 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-purple-400 focus:ring-purple-400/20"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">{t("role")}</label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-400 focus:ring-purple-400/20">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button
                  type="button"
                  onClick={onClose}
                  variant="outline"
                  className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50 bg-white"
                >
                  {t("cancel")}
                </Button>
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                    disabled={!formData.firstName.trim() || !formData.email.trim() || !formData.role}
                  >
                    {t("addUser")}
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
