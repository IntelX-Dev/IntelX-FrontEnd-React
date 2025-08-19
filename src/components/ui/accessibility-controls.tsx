"use client"

import { motion } from "framer-motion"
import { Eye, Moon, Sun, Palette } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAccessibility } from "@/lib/accessibility-context"

export default function AccessibilityControls() {
  const { colorBlindnessMode, themeMode, setColorBlindnessMode, setThemeMode } = useAccessibility()

  const colorModeLabels = {
    standard: "Standard Colors",
    protanopia: "Protanopia Safe",
    deuteranopia: "Deuteranopia Safe",
    tritanopia: "Tritanopia Safe",
  }

  return (
    <div className="flex items-center space-x-3">
      {/* Color Blindness Mode Selector */}
      <div className="flex items-center space-x-2">
        <motion.div whileHover={{ scale: 1.1 }} className="p-1 rounded-lg bg-gray-100 dark:bg-gray-700">
          <Palette className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </motion.div>
        <Select value={colorBlindnessMode} onValueChange={setColorBlindnessMode}>
          <SelectTrigger className="w-40 h-8 text-xs bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 font-medium">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <SelectItem value="standard" className="text-gray-900 dark:text-gray-100">
              {colorModeLabels.standard}
            </SelectItem>
            <SelectItem value="protanopia" className="text-gray-900 dark:text-gray-100">
              {colorModeLabels.protanopia}
            </SelectItem>
            <SelectItem value="deuteranopia" className="text-gray-900 dark:text-gray-100">
              {colorModeLabels.deuteranopia}
            </SelectItem>
            <SelectItem value="tritanopia" className="text-gray-900 dark:text-gray-100">
              {colorModeLabels.tritanopia}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Theme Toggle */}
      <motion.button
        onClick={() => setThemeMode(themeMode === "light" ? "dark" : "light")}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={`Switch to ${themeMode === "light" ? "dark" : "light"} mode`}
      >
        {themeMode === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      </motion.button>

      {/* Current mode indicator */}
      <div className="hidden md:flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
        <Eye className="w-3 h-3" />
        <span className="capitalize">{colorBlindnessMode}</span>
      </div>
    </div>
  )
}
