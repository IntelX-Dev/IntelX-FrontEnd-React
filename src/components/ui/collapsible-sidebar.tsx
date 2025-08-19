"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LayoutDashboard, FileText, Users, Settings, X, ChevronLeft } from "lucide-react"
import { useAccessibility } from "@/lib/accessibility-context"

interface CollapsibleSidebarProps {
  activeItem: string
  onNavigate: (screen: "dashboard" | "rfps" | "detail" | "team" | "settings") => void
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, route: "/dashboard" },
  { id: "rfps", label: "RFP's", icon: FileText, route: "/rfps" },
  { id: "team", label: "Team", icon: Users, route: "/team" },
  { id: "settings", label: "Settings", icon: Settings, route: "/settings" },
]

export default function CollapsibleSidebar({ activeItem, onNavigate }: CollapsibleSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { themeMode } = useAccessibility()

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{
        x: 0,
        width: isCollapsed ? "4rem" : "16rem",
      }}
      transition={{ duration: 0.3, type: "spring", damping: 25 }}
      className="bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-lg relative"
    >
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 w-6 h-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft
          className={`w-3 h-3 text-gray-600 dark:text-gray-300 transition-transform ${isCollapsed ? "rotate-180" : ""}`}
        />
      </motion.button>

      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <X className="w-5 h-5 text-white rotate-45" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap"
              >
                Bid-Alare
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.id

            return (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id as any)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 relative group ${
                  isActive
                    ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                title={isCollapsed ? item.label : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon className="w-5 h-5 relative z-10 flex-shrink-0" />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="font-medium relative z-10 whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            )
          })}
        </nav>
      </div>
    </motion.div>
  )
}
