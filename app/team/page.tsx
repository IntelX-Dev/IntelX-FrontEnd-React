"use client";
import { useRouter } from "next/navigation";
import TeamPage from "@/components/screens/team-page";

export default function TeamPageRoute() {
  const router = useRouter();
  const handleNavigate = (screen: "dashboard" | "rfps" | "detail" | "team" | "settings") => {
    if (screen === "dashboard") router.push("/dashboard");
    else if (screen === "rfps") router.push("/rfps");
    else if (screen === "team") router.push("/team");
    else if (screen === "settings") router.push("/settings");
    // 'detail' would need an rfp object if used
  };
  const handleLogout = () => {
    router.push("/login");
  };
  return <TeamPage onNavigate={handleNavigate} onLogout={handleLogout} />;
}
