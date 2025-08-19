import { apiFetch } from "@/lib/api";

export type DashboardSummary = {
  total: number;
  won: number;
  pending: number;
  rate: number; // percentage 0-100
  chartData: any[]; // structure consumed by chart components
  pieData: any[];
  recentRFPs: any[]; // structure consumed by F1GridRFPs
};

export async function getDashboardSummary(): Promise<DashboardSummary> {
  try {
    const res = await apiFetch("/dashboard/summary", { method: "GET" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    // Normalize with safe defaults
    return {
      total: Number(data?.total) || 0,
      won: Number(data?.won) || 0,
      pending: Number(data?.pending) || 0,
      rate: Number(data?.rate) || 0,
      chartData: Array.isArray(data?.chartData) ? data.chartData : [],
      pieData: Array.isArray(data?.pieData) ? data.pieData : [],
      recentRFPs: Array.isArray(data?.recentRFPs) ? data.recentRFPs : [],
    };
  } catch (e) {
    // Fallback to zeros/empties
    return { total: 0, won: 0, pending: 0, rate: 0, chartData: [], pieData: [], recentRFPs: [] };
  }
}

export async function getRFPs(): Promise<any[]> {
  try {
    const res = await apiFetch("/rfps", { method: "GET" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : Array.isArray(data?.items) ? data.items : [];
  } catch (e) {
    return [];
  }
}
