import { createFileRoute } from "@tanstack/react-router";
import {
  TrendingUp,
  TrendingDown,
  IndianRupee,
  AlertTriangle,
  Users2,
  Smartphone,
  ArrowUpRight,
  MessageCircle,
  CheckCheck,
  Sparkles,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
} from "recharts";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/")({
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
        title="Good morning, Anita"
        description="Here's what's happening across fees, payments and communications today."
        actions={
          <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg shadow-[oklch(0.85_0.12_180)_/_0.25] hover:brightness-110">
            <Sparkles className="h-4 w-4" /> Generate Report
          </button>
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
                      ? "border-[oklch(0.82_0.15_155_/_0.3)] bg-[oklch(0.82_0.15_155_/_0.1)] text-[oklch(0.85_0.15_155)]"
                      : "border-[oklch(0.82_0.16_70_/_0.3)] bg-[oklch(0.82_0.16_70_/_0.1)] text-[oklch(0.88_0.16_70)]"
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

      {/* Analytics + WhatsApp */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass rounded-2xl p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Revenue Breakdown</div>
              <div className="text-xs text-muted-foreground">FY 2025-26 · YTD</div>
            </div>
            <div className="text-xs text-muted-foreground">Total ₹42.8L</div>
          </div>
          <div className="grid gap-4 md:grid-cols-[220px_1fr]">
            <div className="h-[220px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={revenueSources}
                    dataKey="value"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    stroke="none"
                  >
                    {revenueSources.map((s) => (
                      <Cell key={s.name} fill={s.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "oklch(0.22 0.035 260 / 0.95)",
                      border: "1px solid oklch(1 0 0 / 0.15)",
                      borderRadius: 12,
                      color: "white",
                    }}
                    formatter={(v: number) => `₹${(v / 100000).toFixed(1)}L`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {revenueSources.map((s) => {
                const total = revenueSources.reduce((a, b) => a + b.value, 0);
                const pct = ((s.value / total) * 100).toFixed(0);
                return (
                  <div key={s.name}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                        {s.name}
                      </span>
                      <span className="text-muted-foreground">
                        ₹{(s.value / 100000).toFixed(1)}L · {pct}%
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/5">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: s.color }} />
                    </div>
                  </div>
                );
              })}
              <div className="mt-4 h-[90px]">
                <ResponsiveContainer>
                  <BarChart data={trend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" vertical={false} />
                    <XAxis dataKey="m" tick={{ fill: "oklch(0.72 0.02 255)", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Bar dataKey="v" radius={[6, 6, 0, 0]} fill="oklch(0.85 0.12 180)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Bot */}
        <div className="glass relative overflow-hidden rounded-2xl p-5">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[oklch(0.88_0.14_165)] opacity-20 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.88_0.14_165)] to-[oklch(0.82_0.13_220)] text-[oklch(0.2_0.03_260)]">
                <MessageCircle className="h-4 w-4" strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-sm font-semibold">Smart Communications</div>
                <div className="text-[11px] text-muted-foreground">WhatsApp Bot · Live</div>
              </div>
              <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-[oklch(0.82_0.15_155_/_0.3)] bg-[oklch(0.82_0.15_155_/_0.12)] px-2 py-0.5 text-[10px] text-[oklch(0.85_0.15_155)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.85_0.15_155)] shadow-[0_0_6px_oklch(0.85_0.15_155)]" />
                Online
              </span>
            </div>

            <div className="mt-4 space-y-2 rounded-2xl border border-white/10 bg-[oklch(0.15_0.02_260_/_0.5)] p-3">
              <Bubble side="in">Hi</Bubble>
              <Bubble side="out">
                Hello Mr. Sharma 👋 — Aarav's pending fee is <b>₹48,500</b> (due 22 Sep). Tap to pay via UPI.
              </Bubble>
              <Bubble side="out">
                <span className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-2 py-1 text-xs">
                  <IndianRupee className="h-3 w-3" /> Pay ₹48,500 via UPI
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </Bubble>
              <Bubble side="in">
                <span className="inline-flex items-center gap-1">
                  Paid ✅ <CheckCheck className="h-3 w-3" />
                </span>
              </Bubble>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>2,341 auto-replies this month</span>
              <span>Avg response · 1.2s</span>
            </div>
          </div>
        </div>
      </div>

      {/* Defaulters table */}
      <div className="glass rounded-2xl p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">Prioritized Defaulters</div>
            <div className="text-xs text-muted-foreground">Highest overdue balances, first</div>
          </div>
          <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10">
            View all
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="pb-3 font-medium">Student</th>
                <th className="pb-3 font-medium">Grade</th>
                <th className="pb-3 font-medium">Overdue</th>
                <th className="pb-3 font-medium">Days late</th>
                <th className="pb-3 font-medium">Urgency</th>
                <th className="pb-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {defaulters.map((d) => (
                <tr key={d.id} className="group">
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
                    <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs opacity-0 transition group-hover:opacity-100 hover:bg-white/10">
                      Remind
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Bubble({ side, children }: { side: "in" | "out"; children: React.ReactNode }) {
  return (
    <div className={`flex ${side === "in" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs ${
          side === "in"
            ? "rounded-br-sm bg-[oklch(0.6_0.14_155_/_0.35)] text-foreground"
            : "rounded-bl-sm bg-white/10 text-foreground"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function UrgencyBadge({ level }: { level: string }) {
  const map = {
    high: { bg: "bg-[oklch(0.7_0.2_25_/_0.15)]", ring: "border-[oklch(0.7_0.2_25_/_0.4)]", text: "text-[oklch(0.85_0.2_25)]", label: "Critical" },
    med: { bg: "bg-[oklch(0.82_0.16_70_/_0.15)]", ring: "border-[oklch(0.82_0.16_70_/_0.4)]", text: "text-[oklch(0.9_0.16_70)]", label: "High" },
    low: { bg: "bg-[oklch(0.82_0.13_220_/_0.15)]", ring: "border-[oklch(0.82_0.13_220_/_0.4)]", text: "text-[oklch(0.9_0.13_220)]", label: "Watch" },
  }[level]!;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border ${map.ring} ${map.bg} px-2 py-0.5 text-[11px] font-medium ${map.text}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" /> {map.label}
    </span>
  );
}
