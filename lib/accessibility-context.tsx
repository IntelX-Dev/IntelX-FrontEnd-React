"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type ColorBlindnessMode = "standard" | "protanopia" | "deuteranopia" | "tritanopia"
type ThemeMode = "light" | "dark"

interface AccessibilityContextType {
  colorBlindnessMode: ColorBlindnessMode
  themeMode: ThemeMode
  setColorBlindnessMode: (mode: ColorBlindnessMode) => void
  setThemeMode: (mode: ThemeMode) => void
  getStatusColors: (status: string) => { bg: string; text: string; border: string; icon: string }
  getPriorityColors: (priority: string) => { bg: string; text: string; border: string }
  getChartColors: () => { primary: string; secondary: string; tertiary: string; quaternary: string }
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null)

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider")
  }
  return context
}

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [colorBlindnessMode, setColorBlindnessMode] = useState<ColorBlindnessMode>("standard")
  const [themeMode, setThemeMode] = useState<ThemeMode>("light")

  // Enhanced color palettes with high contrast and distinct colors
  const colorPalettes = {
    standard: {
      status: {
        open: { bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-200", icon: "bg-emerald-600" },
        "in-review": {
          bg: "bg-amber-100",
          text: "text-amber-800",
          border: "border-amber-200",
          icon: "bg-amber-600",
        },
        pending: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-200", icon: "bg-orange-600" },
        approved: { bg: "bg-sky-100", text: "text-sky-800", border: "border-sky-200", icon: "bg-sky-600" },
        closed: { bg: "bg-rose-100", text: "text-rose-800", border: "border-rose-200", icon: "bg-rose-600" },
        draft: { bg: "bg-slate-100", text: "text-slate-800", border: "border-slate-200", icon: "bg-slate-600" },
      },
      priority: {
        high: { bg: "bg-rose-100", text: "text-rose-800", border: "border-rose-200" },
        medium: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-200" },
        low: { bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-200" },
      },
      chart: {
        primary: "rgba(14, 165, 233, 0.8)", // Sky blue
        secondary: "rgba(251, 146, 60, 0.8)", // Orange
        tertiary: "rgba(34, 197, 94, 0.8)", // Green
        quaternary: "rgba(239, 68, 68, 0.8)", // Red
      },
    },
    protanopia: {
      status: {
        open: { bg: "bg-sky-100", text: "text-sky-800", border: "border-sky-200", icon: "bg-sky-600" },
        "in-review": {
          bg: "bg-amber-100",
          text: "text-amber-800",
          border: "border-amber-200",
          icon: "bg-amber-600",
        },
        pending: { bg: "bg-violet-100", text: "text-violet-800", border: "border-violet-200", icon: "bg-violet-600" },
        approved: { bg: "bg-cyan-100", text: "text-cyan-800", border: "border-cyan-200", icon: "bg-cyan-600" },
        closed: { bg: "bg-slate-100", text: "text-slate-800", border: "border-slate-200", icon: "bg-slate-600" },
        draft: { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200", icon: "bg-gray-600" },
      },
      priority: {
        high: { bg: "bg-slate-100", text: "text-slate-800", border: "border-slate-200" },
        medium: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-200" },
        low: { bg: "bg-sky-100", text: "text-sky-800", border: "border-sky-200" },
      },
      chart: {
        primary: "rgba(14, 165, 233, 0.8)", // Sky blue
        secondary: "rgba(251, 191, 36, 0.8)", // Amber
        tertiary: "rgba(139, 92, 246, 0.8)", // Violet
        quaternary: "rgba(71, 85, 105, 0.8)", // Slate
      },
    },
    deuteranopia: {
      status: {
        open: { bg: "bg-sky-100", text: "text-sky-800", border: "border-sky-200", icon: "bg-sky-600" },
        "in-review": {
          bg: "bg-amber-100",
          text: "text-amber-800",
          border: "border-amber-200",
          icon: "bg-amber-600",
        },
        pending: { bg: "bg-violet-100", text: "text-violet-800", border: "border-violet-200", icon: "bg-violet-600" },
        approved: { bg: "bg-cyan-100", text: "text-cyan-800", border: "border-cyan-200", icon: "bg-cyan-600" },
        closed: { bg: "bg-slate-100", text: "text-slate-800", border: "border-slate-200", icon: "bg-slate-600" },
        draft: { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200", icon: "bg-gray-600" },
      },
      priority: {
        high: { bg: "bg-slate-100", text: "text-slate-800", border: "border-slate-200" },
        medium: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-200" },
        low: { bg: "bg-sky-100", text: "text-sky-800", border: "border-sky-200" },
      },
      chart: {
        primary: "rgba(14, 165, 233, 0.8)", // Sky blue
        secondary: "rgba(251, 191, 36, 0.8)", // Amber
        tertiary: "rgba(139, 92, 246, 0.8)", // Violet
        quaternary: "rgba(71, 85, 105, 0.8)", // Slate
      },
    },
    tritanopia: {
      status: {
        open: { bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-200", icon: "bg-emerald-600" },
        "in-review": { bg: "bg-rose-100", text: "text-rose-800", border: "border-rose-200", icon: "bg-rose-600" },
        pending: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-200", icon: "bg-orange-600" },
        approved: { bg: "bg-pink-100", text: "text-pink-800", border: "border-pink-200", icon: "bg-pink-600" },
        closed: { bg: "bg-slate-100", text: "text-slate-800", border: "border-slate-200", icon: "bg-slate-600" },
        draft: { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200", icon: "bg-gray-600" },
      },
      priority: {
        high: { bg: "bg-rose-100", text: "text-rose-800", border: "border-rose-200" },
        medium: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-200" },
        low: { bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-200" },
      },
      chart: {
        primary: "rgba(34, 197, 94, 0.8)", // Green
        secondary: "rgba(239, 68, 68, 0.8)", // Red
        tertiary: "rgba(251, 146, 60, 0.8)", // Orange
        quaternary: "rgba(236, 72, 153, 0.8)", // Pink
      },
    },
  }

  const getStatusColors = (status: string) => {
    const palette = colorPalettes[colorBlindnessMode]
    return (
      palette.status[status.toLowerCase().replace(/\s+/g, "-") as keyof typeof palette.status] || palette.status.draft
    )
  }

  const getPriorityColors = (priority: string) => {
    const palette = colorPalettes[colorBlindnessMode]
    return palette.priority[priority.toLowerCase() as keyof typeof palette.priority] || palette.priority.medium
  }

  const getChartColors = () => {
    return colorPalettes[colorBlindnessMode].chart
  }

  // Apply theme to document
  useEffect(() => {
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [themeMode])

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem("colorBlindnessMode", colorBlindnessMode)
  }, [colorBlindnessMode])

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode)
  }, [themeMode])

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedColorMode = localStorage.getItem("colorBlindnessMode") as ColorBlindnessMode
    const savedThemeMode = localStorage.getItem("themeMode") as ThemeMode

    if (savedColorMode) {
      setColorBlindnessMode(savedColorMode)
    }
    if (savedThemeMode) {
      setThemeMode(savedThemeMode)
    }
  }, [])

  return (
    <AccessibilityContext.Provider
      value={{
        colorBlindnessMode,
        themeMode,
        setColorBlindnessMode,
        setThemeMode,
        getStatusColors,
        getPriorityColors,
        getChartColors,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}
