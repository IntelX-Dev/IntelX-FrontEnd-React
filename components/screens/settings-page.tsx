"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, User, Bell, Shield, Palette, Zap, Save, Eye, EyeOff, Moon, Sun, Users2 } from "lucide-react"
import Sidebar from "@/components/ui/sidebar"
import Header from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserRoleManagement from "@/components/ui/user-role-management"
import { useLanguage } from "@/lib/language-context"

interface SettingsPageProps {
  onNavigate?: (screen: "dashboard" | "rfps" | "detail" | "team" | "settings") => void
  onLogout?: () => void
}

import { useRouter } from "next/navigation";

export default function SettingsPage({ onNavigate, onLogout }: SettingsPageProps) {
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();
  const handleNavigate = (screen: "dashboard" | "rfps" | "detail" | "team" | "settings") => {
    if (onNavigate) {
      onNavigate(screen);
    } else {
      // Map screen to route
      const routeMap: Record<string, string> = {
        dashboard: "/dashboard",
        rfps: "/rfps",
        team: "/team",
        settings: "/settings",
      };
      router.push(routeMap[screen] || "/dashboard");
    }
  }
  const [showPassword, setShowPassword] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [settings, setSettings] = useState({
    // Profile
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    position: "Senior Sales Manager",

    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    rfpDeadlines: true,
    teamUpdates: true,
    weeklyReports: false,

    // Security
    twoFactorAuth: false,
    sessionTimeout: "30",

    // Preferences
    timezone: "UTC-5",
    dateFormat: "MM/DD/YYYY",

    // AI Settings
    aiSuggestions: true,
    autoProcessing: false,
    confidenceThreshold: "80",
  })

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
                    onClick={() => onNavigate("dashboard")}
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
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    {t("saveChanges")}
                  </Button>
                </motion.div>
              </div>
            </div>

            <div className="p-6">
              <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="grid w-full grid-cols-6 bg-gray-100 p-1 rounded-2xl">
                  {settingsSections.map((section) => (
                    <TabsTrigger
                      key={section.id}
                      value={section.id}
                      className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl"
                    >
                      <section.icon className="w-4 h-4" />
                      <span className="hidden md:inline">{section.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Profile Settings */}
                <TabsContent value="profile" className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("profileInfo")}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">{t("firstName")}</label>
                        <Input
                          value={settings.firstName}
                          onChange={(e) => setSettings({ ...settings, firstName: e.target.value })}
                          className="bg-white border-gray-200"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">{t("lastName")}</label>
                        <Input
                          value={settings.lastName}
                          onChange={(e) => setSettings({ ...settings, lastName: e.target.value })}
                          className="bg-white border-gray-200"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">{t("email")}</label>
                        <Input
                          type="email"
                          value={settings.email}
                          onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                          className="bg-white border-gray-200"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">{t("phone")}</label>
                        <Input
                          value={settings.phone}
                          onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                          className="bg-white border-gray-200"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-gray-700 text-sm font-medium mb-2">{t("position")}</label>
                        <Input
                          value={settings.position}
                          onChange={(e) => setSettings({ ...settings, position: e.target.value })}
                          className="bg-white border-gray-200"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Notifications Settings */}
                <TabsContent value="notifications" className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                    <div className="space-y-4">
                      {[
                        {
                          key: "emailNotifications",
                          label: "Email Notifications",
                          description: "Receive notifications via email",
                        },
                        {
                          key: "pushNotifications",
                          label: "Push Notifications",
                          description: "Browser push notifications",
                        },
                        { key: "rfpDeadlines", label: "RFP Deadlines", description: "Alerts for upcoming deadlines" },
                        {
                          key: "teamUpdates",
                          label: "Team Updates",
                          description: "Notifications about team activities",
                        },
                        { key: "weeklyReports", label: "Weekly Reports", description: "Weekly performance summaries" },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100"
                        >
                          <div>
                            <h4 className="font-medium text-gray-900">{item.label}</h4>
                            <p className="text-gray-600 text-sm">{item.description}</p>
                          </div>
                          <Switch
                            checked={settings[item.key as keyof typeof settings] as boolean}
                            onCheckedChange={(checked) => setSettings({ ...settings, [item.key]: checked })}
                          />
                        </div>
                      ))}
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
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Session Timeout (minutes)
                        </label>
                        <Select
                          value={settings.sessionTimeout}
                          onValueChange={(value) => setSettings({ ...settings, sessionTimeout: value })}
                        >
                          <SelectTrigger className="bg-white border-gray-200">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="120">2 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="p-4 bg-white rounded-xl border border-gray-100">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Change Password</label>
                        <div className="space-y-3">
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Current password"
                              className="pr-12 bg-white border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                          <Input type="password" placeholder="New password" className="bg-white border-gray-200" />
                          <Input
                            type="password"
                            placeholder="Confirm new password"
                            className="bg-white border-gray-200"
                          />
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
                        <label className="block text-gray-700 text-sm font-medium mb-2">Timezone</label>
                        <Select
                          value={settings.timezone}
                          onValueChange={(value) => setSettings({ ...settings, timezone: value })}
                        >
                          <SelectTrigger className="bg-white border-gray-200">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                            <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                            <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                            <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="p-4 bg-white rounded-xl border border-gray-100">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Date Format</label>
                        <Select
                          value={settings.dateFormat}
                          onValueChange={(value) => setSettings({ ...settings, dateFormat: value })}
                        >
                          <SelectTrigger className="bg-white border-gray-200">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                            <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                            <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="p-4 bg-white rounded-xl border border-gray-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">Dark Mode</h4>
                            <p className="text-gray-600 text-sm">Switch to dark theme</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Sun className="w-4 h-4 text-gray-400" />
                            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                            <Moon className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* AI Settings */}
                <TabsContent value="ai" className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Processing Settings</h3>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
                        <div>
                          <h4 className="font-medium text-gray-900">AI Suggestions</h4>
                          <p className="text-gray-600 text-sm">Enable AI-powered content suggestions</p>
                        </div>
                        <Switch
                          checked={settings.aiSuggestions}
                          onCheckedChange={(checked) => setSettings({ ...settings, aiSuggestions: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
                        <div>
                          <h4 className="font-medium text-gray-900">Auto Processing</h4>
                          <p className="text-gray-600 text-sm">Automatically process incoming RFPs</p>
                        </div>
                        <Switch
                          checked={settings.autoProcessing}
                          onCheckedChange={(checked) => setSettings({ ...settings, autoProcessing: checked })}
                        />
                      </div>

                      <div className="p-4 bg-white rounded-xl border border-gray-100">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          AI Confidence Threshold ({settings.confidenceThreshold}%)
                        </label>
                        <input
                          type="range"
                          min="50"
                          max="95"
                          step="5"
                          value={settings.confidenceThreshold}
                          onChange={(e) => setSettings({ ...settings, confidenceThreshold: e.target.value })}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>50%</span>
                          <span>95%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* User & Role Management */}
                <TabsContent value="roles" className="space-y-6">
                  <UserRoleManagement />
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
