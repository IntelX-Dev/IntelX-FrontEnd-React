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

interface HeaderProps {
  onLogout: () => void;
  onNavigate?: (screen: "dashboard" | "rfps" | "detail" | "team" | "settings") => void;
}

import { useEffect, useState } from "react"
import { getCurrentUser } from "@/lib/services/auth"

import { useRouter } from "next/navigation";

export default function Header({ onLogout, onNavigate }: HeaderProps) {
  const [user, setUser] = useState<{ first_name?: string; last_name?: string; email?: string } | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null
        if (token) {
          const res = await getCurrentUser(token)
          if (res?.success && res?.data) setUser(res.data)
        }
      } catch (e) {
        setUser(null)
      }
    }
    fetchUser()
  }, [])

  const initials = user
    ? (user.first_name?.[0] || "") + (user.last_name?.[0] || "")
    : "?"
  const displayName = user
    ? `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.email || "User"
    : "User"
  const displayEmail = user?.email || "-"

  const router = useRouter();

  const handleProfileClick = () => {
    if (onNavigate) {
      onNavigate("settings");
    } else {
      router.push("/settings");
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-sm border-b border-gray-100 p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome back to Bid-Alare!
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          </motion.button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {initials}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{displayName}</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">{displayEmail}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfileClick}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
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
