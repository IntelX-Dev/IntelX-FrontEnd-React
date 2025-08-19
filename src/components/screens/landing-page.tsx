"use client"

import { motion } from "framer-motion"
import { ArrowRight, Zap, Brain, Users, BarChart3, Shield, Rocket, CheckCircle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import FloatingElements from "@/components/ui/floating-elements"

interface LandingPageProps {
  onNavigate: (screen: "login" | "dashboard") => void
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Processing",
      description:
        "Advanced AI algorithms automatically parse and analyze RFP documents, extracting key requirements and generating intelligent responses.",
    },
    {
      icon: Zap,
      title: "Lightning Fast Turnaround",
      description:
        "Reduce response time from weeks to hours with automated workflows and intelligent content generation.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Seamless collaboration tools enable teams to work together efficiently on RFP responses with real-time updates.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Comprehensive dashboards and KPIs provide insights into win rates, team performance, and process optimization.",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security ensures your sensitive RFP data is protected with end-to-end encryption.",
    },
    {
      icon: Rocket,
      title: "Scalable Platform",
      description:
        "Built to grow with your business, handling everything from small proposals to enterprise-level RFPs.",
    },
  ]

  const benefits = [
    "Reduce manual effort by 80%",
    "Improve response accuracy by 95%",
    "Faster decision-making process",
    "Enhanced team productivity",
    "Better win rate tracking",
    "Automated compliance checking",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      <FloatingElements />

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 p-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Bid-Alare</span>
          </div>
          <Button
            onClick={() => onNavigate("login")}
            className="bg-white/20 backdrop-blur-xl border border-white/30 text-white hover:bg-white/30 transition-all duration-300"
          >
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              AI-Powered
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                RFP Processing
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Transform your pre-sales process with intelligent automation. Reduce manual effort, improve accuracy, and
              win more proposals with our comprehensive AI-powered platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
          >
            <Button
              onClick={() => onNavigate("login")}
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-xl px-8 py-4 rounded-2xl bg-transparent"
            >
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
            {[
              { number: "80%", label: "Reduction in Manual Effort" },
              { number: "95%", label: "Improved Accuracy" },
              { number: "10x", label: "Faster Processing" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 bg-white/10 backdrop-blur-xl border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Powerful Features</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Everything you need to streamline your RFP process and win more business
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-white/80 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Why Choose Bid-Alare?</h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of pre-sales teams who have transformed their RFP process with our AI-powered platform.
            </p>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-white/90">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
              <div className="flex items-center space-x-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
                <span className="text-white/80 ml-2">4.9/5 Customer Rating</span>
              </div>
              <blockquote className="text-white/90 text-lg italic mb-6">
                "Bid-Alare has revolutionized our proposal process. We've reduced our response time by 75% and improved
                our win rate significantly. The AI-powered insights are game-changing."
              </blockquote>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold">
                  JS
                </div>
                <div>
                  <div className="text-white font-semibold">John Smith</div>
                  <div className="text-white/70">VP of Sales, TechCorp</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 bg-white/10 backdrop-blur-xl border-t border-white/20">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your RFP Process?</h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of teams already using Bid-Alare to win more business faster.
            </p>
            <Button
              onClick={() => onNavigate("login")}
              size="lg"
              className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-semibold px-12 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
