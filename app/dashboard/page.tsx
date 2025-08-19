"use client";
import { useRouter } from "next/navigation";
import Dashboard from "@/components/screens/dashboard";

export default function DashboardPage() {
  const router = useRouter();
  const handleNavigate = (screen: "dashboard" | "rfps" | "detail", rfp?: any) => {
    if (screen === "dashboard") router.push("/dashboard");
    else if (screen === "rfps") router.push("/rfps");
    else if (screen === "detail" && rfp && rfp.id) router.push(`/rfps/${rfp.id}`);
  };
  return <Dashboard onNavigate={handleNavigate} />;
}
