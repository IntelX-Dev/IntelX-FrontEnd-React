"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Users, Shield, Eye, Crown, Search, MoreVertical, UserPlus, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import CreateRoleModal from "./create-role-modal"
import AddUserModal from "./add-user-modal"
import { useLanguage } from "@/lib/language-context"

interface Role {
  id: string
  name: string
  description: string
  userCount: number
  permissions: number
  color: string
}

interface User {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive"
  lastLogin: string
  avatar: string
}

interface UserLog {
  id: string
  user: string
  action: string
  timestamp: string
  details: string
  type: "login" | "logout" | "create" | "edit" | "delete"
}

export default function UserRoleManagement() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<"roles" | "users" | "logs">("roles")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const [roles, setRoles] = useState<Role[]>([
    {
      id: "1",
      name: t("superAdmin"),
      description: "Full system access with all permissions",
      userCount: 1,
      permissions: 12,
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "2",
      name: t("rfpAnalystManager"),
      description: "Manage RFP analysis and oversee compliance",
      userCount: 2,
      permissions: 8,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "3",
      name: t("seniorAnalyst"),
      description: "Perform RFP analysis and create reports",
      userCount: 5,
      permissions: 6,
      color: "from-green-500 to-green-600",
    },
    {
      id: "4",
      name: t("viewer"),
      description: "Read-only access to RFP analysis and reports",
      userCount: 8,
      permissions: 2,
      color: "from-gray-500 to-gray-600",
    },
  ])

  const [users] = useState<User[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@company.com",
      role: "Super Administrator",
      status: "active",
      lastLogin: "2 hours ago",
      avatar: "JS",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "RFP Analyst Manager",
      status: "active",
      lastLogin: "1 day ago",
      avatar: "SJ",
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael.brown@company.com",
      role: "Senior Analyst",
      status: "active",
      lastLogin: "3 hours ago",
      avatar: "MB",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@company.com",
      role: "Senior Analyst",
      status: "inactive",
      lastLogin: "1 week ago",
      avatar: "ED",
    },
    {
      id: "5",
      name: "David Wilson",
      email: "david.wilson@company.com",
      role: "Viewer",
      status: "active",
      lastLogin: "5 minutes ago",
      avatar: "DW",
    },
  ])

  const [userLogs] = useState<UserLog[]>([
    {
      id: "1",
      user: "John Smith",
      action: "User Login",
      timestamp: "2024-03-15 14:30:25",
      details: "Successful login from IP 192.168.1.100",
      type: "login",
    },
    {
      id: "2",
      user: "Sarah Johnson",
      action: "RFP Created",
      timestamp: "2024-03-15 13:45:12",
      details: "Created new RFP: Cloud Migration for Acme Corp",
      type: "create",
    },
    {
      id: "3",
      user: "Michael Brown",
      action: "Report Generated",
      timestamp: "2024-03-15 12:20:08",
      details: "Generated monthly performance report",
      type: "create",
    },
    {
      id: "4",
      user: "Emily Davis",
      action: "User Logout",
      timestamp: "2024-03-14 18:15:33",
      details: "User logged out",
      type: "logout",
    },
    {
      id: "5",
      user: "David Wilson",
      action: "RFP Viewed",
      timestamp: "2024-03-15 11:30:45",
      details: "Viewed RFP: Healthcare Management System",
      type: "edit",
    },
  ])

  const getRoleIcon = (roleName: string) => {
    if (roleName.includes("Super")) return Crown
    if (roleName.includes("Manager")) return Shield
    if (roleName.includes("Analyst")) return Users
    return Eye
  }

  const getLogTypeColor = (type: UserLog["type"]) => {
    switch (type) {
      case "login":
        return "bg-green-100 text-green-800"
      case "logout":
        return "bg-gray-100 text-gray-800"
      case "create":
        return "bg-blue-100 text-blue-800"
      case "edit":
        return "bg-yellow-100 text-yellow-800"
      case "delete":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleCreateRole = (roleData: any) => {
    const newRole: Role = {
      id: Date.now().toString(),
      name: roleData.name,
      description: roleData.description,
      userCount: 0,
      permissions: Object.values(roleData.permissions).filter(Boolean).length,
      color: "from-indigo-500 to-indigo-600",
    }
    setRoles([...roles, newRole])
    setShowCreateModal(false)
  }

  const handleAddUser = (userData: any) => {
    console.log("New user:", userData)
    setShowAddUserModal(false)
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredLogs = userLogs.filter(
    (log) =>
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{t("userRoleManagement")}</h3>
            <p className="text-gray-600 mt-1">{t("manageUsersDesc")}</p>
          </div>
          <div className="flex space-x-3">
            {activeTab === "users" && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => setShowAddUserModal(true)}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  {t("addUser")}
                </Button>
              </motion.div>
            )}
            {activeTab === "roles" && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  {t("addRole")}
                </Button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white rounded-xl p-1 border border-gray-200">
          <button
            onClick={() => setActiveTab("roles")}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "roles" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>{t("roleManagement")}</span>
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "users" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>
              {t("users")} ({users.length})
            </span>
          </button>
          <button
            onClick={() => setActiveTab("logs")}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "logs" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>{t("userLogs")}</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {(activeTab === "users" || activeTab === "logs") && (
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-purple-400 focus:ring-purple-400/20"
            />
          </div>
        </div>
      )}

      {/* Content based on active tab */}
      {activeTab === "roles" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role, index) => {
            const RoleIcon = getRoleIcon(role.name)
            return (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${role.color} rounded-xl flex items-center justify-center`}
                    >
                      <RoleIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{role.name}</h4>
                      <p className="text-gray-600 text-sm">{role.description}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {role.userCount} {t("users").toLowerCase()}
                  </Badge>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">{t("permissions")}</span>
                    <span className="font-semibold text-gray-900">{role.permissions}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {role.permissions === 12 && "All"}
                    {role.permissions === 8 && "RFP Analysis, Reports, User Management"}
                    {role.permissions === 6 && "RFP Analysis, Reports"}
                    {role.permissions === 2 && "View Only"}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50 bg-transparent"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {t("edit")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                    disabled={role.userCount > 0}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {activeTab === "users" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left p-4 text-gray-600 font-semibold">{t("name")}</th>
                  <th className="text-left p-4 text-gray-600 font-semibold">{t("email")}</th>
                  <th className="text-left p-4 text-gray-600 font-semibold">{t("role")}</th>
                  <th className="text-left p-4 text-gray-600 font-semibold">{t("status")}</th>
                  <th className="text-left p-4 text-gray-600 font-semibold">{t("lastLogin")}</th>
                  <th className="text-left p-4 text-gray-600 font-semibold">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {user.avatar}
                        </div>
                        <span className="font-medium text-gray-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{user.email}</td>
                    <td className="p-4">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {user.role}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={user.status === "active" ? "default" : "secondary"}
                        className={
                          user.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }
                      >
                        {t(user.status)}
                      </Badge>
                    </td>
                    <td className="p-4 text-gray-600">{user.lastLogin}</td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "logs" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h4 className="text-lg font-semibold text-gray-900">{t("userLogs")}</h4>
            <p className="text-gray-600 text-sm">Recent user activities and system events</p>
          </div>
          <div className="divide-y divide-gray-100">
            {filteredLogs.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {log.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">{log.user}</span>
                        <Badge className={`text-xs ${getLogTypeColor(log.type)}`}>{log.action}</Badge>
                      </div>
                      <p className="text-gray-600 text-sm">{log.details}</p>
                      <p className="text-gray-400 text-xs mt-1">{log.timestamp}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <CreateRoleModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} onSubmit={handleCreateRole} />
      <AddUserModal isOpen={showAddUserModal} onClose={() => setShowAddUserModal(false)} onSubmit={handleAddUser} />
    </div>
  )
}
