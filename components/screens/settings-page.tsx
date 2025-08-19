
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Save, User, Bell, Shield, Palette, Zap, Users2, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Sidebar from "@/components/ui/sidebar"
import Header from "@/components/ui/header"
import { useLanguage } from "@/lib/language-context"
import { authService } from "@/src/services/authService"
import type { User as UserType } from "@/src/types/auth"

interface SettingsPageProps {
  onNavigate?: (screen: "dashboard" | "rfps" | "detail" | "team" | "settings") => void
  onLogout?: () => void
}

export default function SettingsPage({ onNavigate, onLogout }: SettingsPageProps) {
  const { language, setLanguage, t } = useLanguage();
  
  const handleNavigate = (screen: "dashboard" | "rfps" | "detail" | "team" | "settings") => {
    if (onNavigate) {
      onNavigate(screen);
    }
  }
  
  const [showPassword, setShowPassword] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [user, setUser] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(true)
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    twoFactorAuth: false,
    publicProfile: false,
    dataSharing: true,
    aiProcessing: true,
    smartSuggestions: false,
    autoSave: true,
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (authService.isAuthenticated()) {
          const response = await authService.getCurrentUser()
          if (response?.success && response?.data) {
            setUser(response.data)
          }
        }
      } catch (error) {
        console.error('Failed to fetch user:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const handleSave = () => {
    console.log("Settings saved:", settings)
    // Add save logic here
  }

  const settingsSections = [
    {
      id: "profile",
      label: t("profile"),
      icon: User,
      description: "Manage your personal information",
    },
    {
      id: "notifications",
      label: t("notifications"),
      icon: Bell,
      description: "Configure notification preferences",
    },
    {
      id: "security",
      label: t("security"),
      icon: Shield,
      description: "Security and privacy settings",
    },
    {
      id: "preferences",
      label: t("preferences"),
      icon: Palette,
      description: "Customize your experience",
    },
    {
      id: "ai",
      label: t("aiSettings"),
      icon: Zap,
      description: "Configure AI processing options",
    },
    {
      id: "roles",
      label: t("userRoles"),
      icon: Users2,
      description: "Manage users, roles, and permissions",
    },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeItem="settings" />

      <div className="flex-1 flex flex-col">
        <Header onLogout={onLogout || (() => {})} />

        <main className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.button
                    onClick={() => handleNavigate("dashboard")}
                    className="p-2 rounded-xl bg-white shadow-md hover:shadow-lg text-gray-600 hover:text-gray-800 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </motion.button>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {t("settingsTitle")}
                    </h1>
                    <p className="text-gray-600 mt-1">{t("settingsSubtitle")}</p>
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {t("saveChanges")}
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="grid w-full grid-cols-6 bg-gray-50 p-1 rounded-2xl">
                  {settingsSections.map((section) => (
                    <TabsTrigger
                      key={section.id}
                      value={section.id}
                      className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl transition-all duration-300"
                    >
                      <section.icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{section.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Profile Settings */}
                <TabsContent value="profile" className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-white rounded-xl border border-gray-100">
                        <label className="block text-gray-700 text-sm font-medium mb-2">First Name</label>
                        <Input 
                          value={user?.first_name || ""} 
                          onChange={(e) => setUser(prev => prev ? {...prev, first_name: e.target.value} : null)}
                          className="bg-white border-gray-200" 
                          placeholder="Enter your first name" 
                        />
                      </div>
                      <div className="p-4 bg-white rounded-xl border border-gray-100">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Last Name</label>
                        <Input 
                          value={user?.last_name || ""} 
                          onChange={(e) => setUser(prev => prev ? {...prev, last_name: e.target.value} : null)}
                          className="bg-white border-gray-200" 
                          placeholder="Enter your last name" 
                        />
                      </div>
                      <div className="p-4 bg-white rounded-xl border border-gray-100">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                        <Input 
                          value={user?.email || ""} 
                          onChange={(e) => setUser(prev => prev ? {...prev, email: e.target.value} : null)}
                          className="bg-white border-gray-200" 
                          placeholder="Enter your email" 
                        />
                      </div>
                      <div className="p-4 bg-white rounded-xl border border-gray-100">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Role</label>
                        <Input 
                          value={user?.role || "Admin"} 
                          disabled
                          className="bg-gray-50 border-gray-200" 
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Notifications Settings */}
                <TabsContent value="notifications" className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
                        <div>
                          <h4 className="font-medium text-gray-900">Email Notifications</h4>
                          <p className="text-gray-600 text-sm">Receive updates via email</p>
                        </div>
                        <Switch
                          checked={settings.emailNotifications}
                          onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
                        <div>
                          <h4 className="font-medium text-gray-900">Push Notifications</h4>
                          <p className="text-gray-600 text-sm">Get real-time updates</p>
                        </div>
                        <Switch
                          checked={settings.pushNotifications}
                          onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
                        <div>
                          <h4 className="font-medium text-gray-900">Weekly Reports</h4>
                          <p className="text-gray-600 text-sm">Receive weekly summary reports</p>
                        </div>
                        <Switch
                          checked={settings.weeklyReports}
                          onCheckedChange={(checked) => setSettings({ ...settings, weeklyReports: checked })}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Security Settings */}
                <TabsContent value="security" className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
                        <div>
                          <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                          <p className="text-gray-600 text-sm">Add an extra layer of security to your account</p>
                        </div>
                        <Switch
                          checked={settings.twoFactorAuth}
                          onCheckedChange={(checked) => setSettings({ ...settings, twoFactorAuth: checked })}
                        />
                      </div>
                      <div className="p-4 bg-white rounded-xl border border-gray-100">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Change Password</label>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            className="bg-white border-gray-200 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Preferences Settings */}
                <TabsContent value="preferences" className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">General Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-white rounded-xl border border-gray-100">
                        <label className="block text-gray-700 text-sm font-medium mb-2">{t("language")}</label>
                        <Select value={language} onValueChange={setLanguage}>
                          <SelectTrigger className="bg-white border-gray-200">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">{t("english")}</SelectItem>
                            <SelectItem value="es">{t("spanish")}</SelectItem>
                            <SelectItem value="fr">{t("french")}</SelectItem>
                            <SelectItem value="de">{t("german")}</SelectItem>
                            <SelectItem value="kn">{t("kannada")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="p-4 bg-white rounded-xl border border-gray-100">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Theme</label>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 text-sm">Dark Mode</span>
                          <Switch
                            checked={darkMode}
                            onCheckedChange={setDarkMode}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* AI Settings */}
                <TabsContent value="ai" className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">AI & Automation</h3>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
                        <div>
                          <h4 className="font-medium text-gray-900">AI Processing</h4>
                          <p className="text-gray-600 text-sm">Enable AI-powered RFP analysis</p>
                        </div>
                        <Switch
                          checked={settings.aiProcessing}
                          onCheckedChange={(checked) => setSettings({ ...settings, aiProcessing: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
                        <div>
                          <h4 className="font-medium text-gray-900">Smart Suggestions</h4>
                          <p className="text-gray-600 text-sm">Get AI-powered improvement suggestions</p>
                        </div>
                        <Switch
                          checked={settings.smartSuggestions}
                          onCheckedChange={(checked) => setSettings({ ...settings, smartSuggestions: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
                        <div>
                          <h4 className="font-medium text-gray-900">Auto-Save</h4>
                          <p className="text-gray-600 text-sm">Automatically save your work</p>
                        </div>
                        <Switch
                          checked={settings.autoSave}
                          onCheckedChange={(checked) => setSettings({ ...settings, autoSave: checked })}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* User Roles Settings */}
                <TabsContent value="roles" className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">User Management</h3>
                    <div className="p-4 bg-white rounded-xl border border-gray-100">
                      <p className="text-gray-600">Role management features will be available here for administrators.</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
