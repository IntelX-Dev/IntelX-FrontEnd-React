"use client";
import { useRouter } from "next/navigation";
import RFPListing from "@/components/screens/rfp-listing";

export default function RFPsPage() {
  const router = useRouter();
  const handleNavigate = (screen: "dashboard" | "rfps" | "detail", rfp?: any) => {
    // Add more navigation logic as needed
    if (screen === "dashboard") router.push("/dashboard");
    else if (screen === "rfps") router.push("/rfps");
    else if (screen === "detail" && rfp && rfp.id) router.push(`/rfps/${rfp.id}`);
  };
  const handleLogout = () => {
    // Add logout logic here
    router.push("/login");
  };
  return <RFPListing onNavigate={handleNavigate} onLogout={handleLogout} />;
}
