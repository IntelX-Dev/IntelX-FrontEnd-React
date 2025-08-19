"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Brain, Sparkles, Zap, Shield, Rocket, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { login as authLogin, register } from "@/lib/services/auth"

interface LoginPageProps {
  onLogin: (token?: string, refreshToken?: string, user?: any) => void
  onBack: () => void
}

export default function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Register state
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse tracking for interactive effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  // Transform mouse position to rotation values
  const rotateX = useTransform(springY, [-300, 300], [10, -10])
  const rotateY = useTransform(springX, [-300, 300], [-10, 10])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        mouseX.set(e.clientX - centerX)
        mouseY.set(e.clientY - centerY)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const data = await authLogin(email, password)
      console.log("Login successful:", data)

      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
      }
      setIsLoading(false)
      onLogin(data.access_token as string, (data as any)?.refresh_token as string, (data as any)?.user)
    } catch (err: any) {
      setIsLoading(false)
      console.error("Login error:", err)
      setError(err?.message || "Login failed. Please try again.")
    }

  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords don't match")
      setIsLoading(false)
      return
    }

    try {
      const data = await register(email, password, firstName, lastName)

      if ((data as any)?.access_token) {
        localStorage.setItem("token", (data as any).access_token as string)
      }
      if ((data as any)?.refresh_token) {
        localStorage.setItem("refreshToken", (data as any).refresh_token as string)
      }

      setIsLoading(false)
      onLogin((data as any)?.access_token as string, (data as any)?.refresh_token as string, (data as any)?.user)
    } catch (err: any) {
      setIsLoading(false)
      console.error("Register error:", err)
      setError(err?.message || "Registration failed. Please try again.")
    }
  }

  // Floating icons data
  const floatingIcons = [
    { Icon: Brain, delay: 0, duration: 8 },
    { Icon: Zap, delay: 1, duration: 6 },
    { Icon: Shield, delay: 2, duration: 10 },
    { Icon: Rocket, delay: 3, duration: 7 },
    { Icon: Users, delay: 4, duration: 9 },
    { Icon: Sparkles, delay: 5, duration: 5 },
  ]

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: `${10 + index * 15}%`,
            top: `${20 + index * 10}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: item.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: item.delay,
            ease: "easeInOut",
          }}
        >
          <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl">
            <item.Icon className="w-6 h-6 text-white/70" />
          </div>
        </motion.div>
      ))}

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-pink-500/20" />

      {/* Back Button */}
      <motion.button
        onClick={onBack}
        className="absolute top-8 left-8 z-50 p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
        whileHover={{ scale: 1.05, rotate: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-6 h-6" />
      </motion.button>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center p-8">
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative"
        >
          {/* Glassmorphism Login Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.3 }}
            className="relative w-full max-w-md"
          >
            {/* Card Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur-xl opacity-75 animate-pulse" />

            {/* Main Card */}
            <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              {/* Logo and Title */}
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-center mb-8"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-2xl"
                >
                  <Brain className="w-10 h-10 text-white" />
                </motion.div>

                <motion.h1
                  className="text-4xl font-bold text-white mb-2"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  style={{
                    background: "linear-gradient(90deg, #fff, #a855f7, #ec4899, #fff)",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Bid-Alare
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-white/80 text-lg"
                >
                  Where Every Bid Matters
                </motion.p>
              </motion.div>

            {/* Login/Register Tabs */}
            <Tabs value={isLogin ? "login" : "register"} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/10 border border-white/20 rounded-xl">
                <TabsTrigger value="login" onClick={() => setIsLogin(true)} className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70">Login</TabsTrigger>
                <TabsTrigger value="register" onClick={() => setIsLogin(false)} className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-6">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <Label className="text-white/90 text-sm mb-2 block">Email</Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
                      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="pl-12 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20 h-14 rounded-2xl" required />
                    </div>
                  </div>

                  <div>
                    <Label className="text-white/90 text-sm mb-2 block">Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
                      <Input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="pl-12 pr-12 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20 h-14 rounded-2xl" required />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <Alert className="bg-red-500/20 border-red-500/50">
                      <AlertDescription className="text-white">{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" disabled={isLoading} className="w-full h-14 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
                    {isLoading ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }} className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full" />
                    ) : (
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center space-x-2">
                        <span>Sign In</span>
                        <Sparkles className="w-5 h-5" />
                      </motion.span>
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="space-y-6">
                <form onSubmit={handleRegister} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white/90 text-sm mb-2 block">First Name</Label>
                      <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20 h-14 rounded-2xl" required />
                    </div>
                    <div>
                      <Label className="text-white/90 text-sm mb-2 block">Last Name</Label>
                      <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20 h-14 rounded-2xl" required />
                    </div>
                  </div>

                  <div>
                    <Label className="text-white/90 text-sm mb-2 block">Email</Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
                      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="pl-12 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20 h-14 rounded-2xl" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white/90 text-sm mb-2 block">Password</Label>
                      <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20 h-14 rounded-2xl" required />
                    </div>
                    <div>
                      <Label className="text-white/90 text-sm mb-2 block">Confirm Password</Label>
                      <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20 h-14 rounded-2xl" required />
                    </div>
                  </div>

                  {error && (
                    <Alert className="bg-red-500/20 border-red-500/50">
                      <AlertDescription className="text-white">{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" disabled={isLoading} className="w-full h-14 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
                    {isLoading ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }} className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full" />
                    ) : (
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center space-x-2">
                        <span>Create Account</span>
                        <Sparkles className="w-5 h-5" />
                      </motion.span>
                    )}
                  </Button>
                </form>
              </TabsContent>

            </Tabs>
            {/* End Tabs */}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
    </div>
  )
}
