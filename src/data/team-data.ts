
import { Users, UserCheck, Crown, Activity } from "lucide-react"

export const teamData = {
  members: [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      role: "Admin",
      position: "Senior Project Manager",
      avatar: "/placeholder-user.jpg",
      status: "active",
      activeRFPs: 12,
      winRate: "85%",
      performance: 92
    },
    {
      id: "2", 
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 234-5678",
      role: "Manager",
      position: "RFP Coordinator",
      avatar: "/placeholder-user.jpg",
      status: "active",
      activeRFPs: 8,
      winRate: "78%",
      performance: 88
    },
    {
      id: "3",
      name: "Mike Johnson", 
      email: "mike.johnson@example.com",
      phone: "+1 (555) 345-6789",
      role: "Member",
      position: "Business Analyst",
      avatar: "/placeholder-user.jpg",
      status: "active",
      activeRFPs: 5,
      winRate: "72%",
      performance: 85
    },
    {
      id: "4",
      name: "Sarah Chen",
      email: "sarah.chen@example.com", 
      phone: "+1 (555) 456-7890",
      role: "Member",
      position: "Technical Writer",
      avatar: "/placeholder-user.jpg",
      status: "active",
      activeRFPs: 6,
      winRate: "80%",
      performance: 90
    }
  ],
  stats: [
    {
      icon: Users,
      value: "4",
      label: "Total Members"
    },
    {
      icon: UserCheck,
      value: "4",
      label: "Active Members"
    },
    {
      icon: Crown,
      value: "1",
      label: "Admins"
    },
    {
      icon: Activity,
      value: "31",
      label: "Active RFPs"
    }
  ]
}
