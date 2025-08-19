"use client"

import { motion } from "framer-motion"
import { Bell, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AccessibilityControls from "./accessibility-controls"
import { useAccessibility } from "@/lib/accessibility-context"

interface EnhancedHeaderProps {
  onLogout: () => void
}

import { useEffect, useState } from "react";
import { authService } from "@/src/services/authService";

import { useRouter } from "next/navigation";

export default function EnhancedHeader({ onLogout }: EnhancedHeaderProps) {
  const { themeMode } = useAccessibility();
  const router = useRouter();
  const [user, setUser] = useState<{ first_name?: string; last_name?: string; email?: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (authService.isAuthenticated()) {
          const response = await authService.getCurrentUser();
          if (response?.success && response?.data) {
            setUser(response.data);
          }
        }
      } catch (e) {
        console.error('Failed to fetch user:', e);
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const initials = user
    ? (user.first_name?.[0] || "") + (user.last_name?.[0] || "")
    : "?"
  const displayName = user
    ? `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.email || "User"
    : "User"
  const displayEmail = user?.email || "-"

  

  const handleLogout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      onLogout()
    }
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700 p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome back to Bid-Alare!
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          {/* Accessibility Controls */}
          <AccessibilityControls />

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          </motion.button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold">
  {initials}
</div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              align="end"
              forceMount
            >
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium text-gray-900 dark:text-gray-100">{displayName}</p>
                  <p className="w-[200px] truncate text-sm text-gray-600 dark:text-gray-400">{displayEmail}</p>
                </div>
              </div>
              <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
              <DropdownMenuItem className="text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700" onClick={() => router.push("/settings")}> 
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  )
}