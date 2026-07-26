import { createFileRoute } from "@tanstack/react-router";
import {
  TrendingUp,
  TrendingDown,
  IndianRupee,
  AlertTriangle,
  Smartphone,
  Sparkles,
  Bell,
  Send,
  MessagesSquare,
  CheckCircle2,
  LineChart,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { TodayCollectionPulse } from "@/components/TodayCollectionPulse";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard · Smart School FinTech" },
      { name: "description", content: "Revenue, dues, defaulters and smart insights at a glance." },
      { property: "og:title", content: "Smart School FinTech · Dashboard" },
      { property: "og:description", content: "Realtime fee analytics for school administrators." },
    ],
  }),
  component: Dashboard,
});

const metrics = [
  {
    label: "Total Revenue",
    value: "₹42.8L",
    delta: "+5.2% this month",
    up: true,
    icon: IndianRupee,
    tint: "from-[oklch(0.88_0.14_165)] to-[oklch(0.82_0.13_220)]",
  },
  {
    label: "Pending Dues",
    value: "₹6.4L",
    delta: "-2.1% vs last month",
    up: false,
    icon: TrendingDown,
    tint: "from-[oklch(0.82_0.16_70)] to-[oklch(0.75_0.2_35)]",
  },
  {
    label: "Active Defaulters",
    value: "34",
    delta: "+3 new this week",
    up: false,
    icon: AlertTriangle,
    tint: "from-[oklch(0.7_0.2_25)] to-[oklch(0.75_0.18_15)]",
  },
  {
    label: "UPI vs Cash",
    value: "78 / 22",
    delta: "UPI adoption ↑",
    up: true,
    icon: Smartphone,
    tint: "from-[oklch(0.82_0.12_300)] to-[oklch(0.82_0.13_220)]",
  },
] as const;

const revenueSources = [
  { name: "Tuition", value: 2850000, color: "oklch(0.88 0.14 165)" },
  { name: "Transport", value: 780000, color: "oklch(0.82 0.13 220)" },
  { name: "Late Fees", value: 220000, color: "oklch(0.82 0.16 70)" },
  { name: "Activities", value: 430000, color: "oklch(0.82 0.12 300)" },
];

const trend = [
  { m: "Apr", v: 320 },
  { m: "May", v: 410 },
  { m: "Jun", v: 380 },
  { m: "Jul", v: 460 },
  { m: "Aug", v: 520 },
  { m: "Sep", v: 610 },
];

const defaulters = [
  { id: "STU-104", name: "Aarav Sharma", grade: "10-B", due: "₹48,500", days: 42, level: "high" },
  { id: "STU-217", name: "Isha Reddy", grade: "9-A", due: "₹36,200", days: 31, level: "high" },
  { id: "STU-089", name: "Kabir Menon", grade: "12-C", due: "₹28,900", days: 24, level: "med" },
  { id: "STU-311", name: "Zoya Khan", grade: "8-A", due: "₹19,400", days: 18, level: "med" },
  { id: "STU-402", name: "Rohan Patel", grade: "11-B", due: "₹12,750", days: 9, level: "low" },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Overview"
        title="Good morning, Anita 👋"
        description="Here's what's happening across fees, payments and communications today."
        actions={
          <>
            <span className="hidden items-center gap-2 rounded-full border border-[oklch(0.82_0.15_155_/_0.3)] bg-[oklch(0.82_0.15_155_/_0.1)] px-3 py-1.5 text-[11px] font-medium text-[oklch(0.45_0.15_155)] sm:inline-flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.55_0.2_155)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[oklch(0.55_0.2_155)] shadow-[0_0_8px_oklch(0.55_0.2_155)]" />
              </span>
              Live sync active
            </span>
            <button
              onClick={() =>
                toast.promise(new Promise((r) => setTimeout(r, 1200)), {
                  loading: "Compiling today's collection report…",
                  success: "Report ready — download link sent to your inbox.",
                  error: "Could not generate report.",
                })
              }
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg shadow-[oklch(0.85_0.12_180)_/_0.25] hover:brightness-110"
            >
              <Sparkles className="h-4 w-4" /> Generate Report
            </button>
          </>
        }
      />

      {/* Metric cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="glass rounded-2xl p-5">
              <div className="flex items-start justify-between">
                <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${m.tint} text-[oklch(0.2_0.03_260)]`}>
                  <Icon className="h-5 w-5" strokeWidth={2.4} />
                </div>
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${
                    m.up
                      ? "border-[oklch(0.82_0.15_155_/_0.3)] bg-[oklch(0.82_0.15_155_/_0.1)] text-[oklch(0.5_0.15_155)]"
                      : "border-[oklch(0.82_0.16_70_/_0.3)] bg-[oklch(0.82_0.16_70_/_0.1)] text-[oklch(0.55_0.18_70)]"
                  }`}
                >
                  {m.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {m.delta}
                </span>
              </div>
              <div className="mt-4 text-3xl font-semibold tracking-tight">{m.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{m.label}</div>
            </div>
          );
        })}
      </div>

      {/* Live collection pulse */}
      <TodayCollectionPulse />

      {/* Analytics */}
      <div className="grid gap-4">
        <div className="glass rounded-2xl p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Revenue Breakdown</div>
              <div className="text-xs text-muted-foreground">FY 2025-26 · YTD</div>
            </div>
            <div className="text-xs text-muted-foreground">Total ₹42.8L</div>
          </div>

          {/* Horizontal progress bars */}
          <div className="space-y-3">
            {[
              { name: "Tuition", pct: 68, amount: "₹29.1L", color: "oklch(0.88 0.14 165)" },
              { name: "Transport", pct: 18, amount: "₹7.7L", color: "oklch(0.82 0.13 220)" },
              { name: "Late Fees", pct: 10, amount: "₹4.3L", color: "oklch(0.82 0.16 70)" },
            ].map((s) => (
              <div key={s.name}>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                    {s.name} <span className="text-muted-foreground">({s.pct}%)</span>
                  </span>
                  <span className="font-medium">{s.amount}</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-black/[0.04]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${s.pct}%`,
                      background: `linear-gradient(90deg, ${s.color}, oklch(0.9 0.1 200))`,
                      boxShadow: `0 0 10px ${s.color}`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* Defaulters table */}
      <div className="glass rounded-2xl p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">Prioritized Defaulters</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-[oklch(0.7_0.2_25_/_0.4)] bg-[oklch(0.7_0.2_25_/_0.15)] px-2 py-0.5 text-[10px] font-semibold text-[oklch(0.55_0.22_25)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.55_0.22_25)] shadow-[0_0_6px_oklch(0.55_0.22_25)]" />
                5 Critical
              </span>
            </div>
            <div className="text-xs text-muted-foreground">Highest overdue balances, first</div>
          </div>
          <button
            onClick={() =>
              toast.success(`Bulk reminder queued for ${defaulters.length} families`, {
                description: "WhatsApp + SMS reminders will be delivered within 5 minutes.",
              })
            }
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg shadow-[oklch(0.85_0.12_180)_/_0.25] hover:brightness-110"
          >
            <Send className="h-4 w-4" /> Send Bulk Reminder
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="pb-3 font-medium">Student</th>
                <th className="pb-3 font-medium">Grade</th>
                <th className="pb-3 font-medium">Overdue</th>
                <th className="pb-3 font-medium">Days late</th>
                <th className="pb-3 font-medium">Urgency</th>
                <th className="pb-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04]">
              {defaulters.map((d) => (
                <tr key={d.id} className="group transition-colors hover:bg-black/[0.04]">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-[oklch(0.82_0.12_300)] to-[oklch(0.82_0.13_220)] text-xs font-semibold text-[oklch(0.2_0.03_260)]">
                        {d.name
                          .split(" ")
                          .map((s) => s[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="font-medium">{d.name}</div>
                        <div className="text-[11px] text-muted-foreground">{d.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-muted-foreground">{d.grade}</td>
                  <td className="font-semibold">{d.due}</td>
                  <td className="text-muted-foreground">{d.days}</td>
                  <td>
                    <UrgencyBadge level={d.level} />
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() =>
                        toast.success(`Reminder sent to ${d.name}'s parent`, {
                          description: `WhatsApp payment link for ${d.due} delivered.`,
                        })
                      }
                      className="glass inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition hover:bg-black/[0.07]"
                    >
                      <Bell className="h-3.5 w-3.5 text-[oklch(0.5_0.15_155)]" />
                      Notify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Operational summary widgets */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            icon: MessagesSquare,
            label: "Reminders sent (7d)",
            value: "1,284",
            tint: "from-[oklch(0.88_0.14_165)] to-[oklch(0.82_0.13_220)]",
          },
          {
            icon: CheckCircle2,
            label: "Reconciled today",
            value: "48",
            tint: "from-[oklch(0.82_0.15_155)] to-[oklch(0.85_0.12_180)]",
          },
          {
            icon: LineChart,
            label: "Avg. collection time",
            value: "2.4 days",
            tint: "from-[oklch(0.82_0.12_300)] to-[oklch(0.82_0.13_220)]",
          },
        ].map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="glass flex items-center gap-4 rounded-2xl p-4">
              <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${c.tint} text-[oklch(0.2_0.03_260)]`}>
                <Icon className="h-5 w-5" strokeWidth={2.4} />
              </div>
              <div className="min-w-0">
                <div className="text-xl font-semibold tracking-tight">{c.value}</div>
                <div className="truncate text-[11px] text-muted-foreground">{c.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function UrgencyBadge({ level }: { level: string }) {
  const map = {
    high: { bg: "bg-[oklch(0.7_0.2_25_/_0.15)]", ring: "border-[oklch(0.7_0.2_25_/_0.4)]", text: "text-[oklch(0.55_0.22_25)]", label: "Critical" },
    med: { bg: "bg-[oklch(0.82_0.16_70_/_0.15)]", ring: "border-[oklch(0.82_0.16_70_/_0.4)]", text: "text-[oklch(0.55_0.18_70)]", label: "High" },
    low: { bg: "bg-[oklch(0.82_0.13_220_/_0.15)]", ring: "border-[oklch(0.82_0.13_220_/_0.4)]", text: "text-[oklch(0.9_0.13_220)]", label: "Watch" },
  }[level]!;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border ${map.ring} ${map.bg} px-2 py-0.5 text-[11px] font-medium ${map.text}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" /> {map.label}
    </span>
  );
}
