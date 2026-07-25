import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Smartphone,
  Banknote,
  CheckCircle2,
  XCircle,
  Filter,
  Download,
  TrendingUp,
  Clock,
  CreditCard,
  Wallet,
  Percent,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/payments")({
  head: () => ({
    meta: [
      { title: "Omnichannel Payments · Smart School FinTech" },
      { name: "description", content: "Auto-approved UPI in real-time and offline reconciliation." },
      { property: "og:title", content: "Omnichannel Payments" },
      { property: "og:description", content: "UPI, cash and cheque — all reconciled in one console." },
    ],
  }),
  component: PaymentsPage,
});

const metrics = [
  {
    label: "Today's Collection",
    value: "₹4,82,300",
    change: "+12% vs yesterday",
    changeType: "positive" as const,
    icon: Wallet,
  },
  {
    label: "UPI Transactions",
    value: "326",
    change: "Zero-fee",
    changeType: "neutral" as const,
    icon: Smartphone,
  },
  {
    label: "Pending Offline",
    value: "18",
    change: "Cash + Cheque",
    changeType: "neutral" as const,
    icon: Banknote,
  },
  {
    label: "Auto-Approval",
    value: "98.4%",
    change: "Rules engine active",
    changeType: "positive" as const,
    icon: Percent,
  },
];

const upiFeed = [
  { name: "Aarav Sharma", provider: "PhonePe", id: "TXN-98214", amount: 15000, avatar: "AS", color: "oklch(0.82 0.14 165)" },
  { name: "Isha Reddy", provider: "GPay", id: "TXN-98213", amount: 8600, avatar: "IR", color: "oklch(0.82 0.13 220)" },
  { name: "Kabir Menon", provider: "Paytm", id: "TXN-98212", amount: 22400, avatar: "KM", color: "oklch(0.82 0.12 300)" },
  { name: "Zoya Khan", provider: "BHIM", id: "TXN-98211", amount: 4500, avatar: "ZK", color: "oklch(0.82 0.14 70)" },
];

const providerSplit = [
  { name: "PhonePe", percent: 42, color: "bg-[oklch(0.65_0.18_280)]" },
  { name: "GPay", percent: 31, color: "bg-[oklch(0.65_0.16_155)]" },
  { name: "Paytm", percent: 18, color: "bg-[oklch(0.7_0.17_70)]" },
  { name: "BHIM", percent: 9, color: "bg-[oklch(0.7_0.14_200)]" },
];

type OfflineStatus = "pending" | "approved" | "rejected";
type OfflineRow = {
  id: string;
  name: string;
  grade: string;
  method: string;
  amount: number;
  receipt: string;
  by: string;
  status: OfflineStatus;
};
const initialOffline: OfflineRow[] = [
  { id: "OFF-1042", name: "Nikhil Verma", grade: "9-C", method: "Cash", amount: 12000, receipt: "R-2251", by: "Front Desk · Priya", status: "pending" },
  { id: "OFF-1041", name: "Anaya Bose", grade: "7-A", method: "Cheque", amount: 45000, receipt: "R-2250", by: "Accounts · Ravi", status: "pending" },
  { id: "OFF-1040", name: "Vivaan Rao", grade: "11-A", method: "Cash", amount: 8600, receipt: "R-2249", by: "Front Desk · Priya", status: "pending" },
  { id: "OFF-1039", name: "Sara Fernandes", grade: "5-B", method: "Cheque", amount: 22000, receipt: "R-2248", by: "Accounts · Ravi", status: "pending" },
];

function PaymentsPage() {
  const [tab, setTab] = useState<"digital" | "offline">("digital");
  const [rows, setRows] = useState(initialOffline);

  const decide = (id: string, status: "approved" | "rejected") =>
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Payments"
        title="Omnichannel Payments"
        description="Auto-approved UPI in real-time and offline reconciliation."
        actions={
          <>
            <button className="inline-flex items-center gap-2 rounded-xl border border-black/[0.07] bg-black/[0.04] px-3 py-2 text-sm hover:bg-black/[0.07]">
              <Filter className="h-4 w-4" /> Filter
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl border border-black/[0.07] bg-black/[0.04] px-3 py-2 text-sm hover:bg-black/[0.07]">
              <Download className="h-4 w-4" /> Export
            </button>
          </>
        }
      />

      {/* Top metric cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="glass rounded-2xl p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-muted-foreground">{m.label}</div>
                <div className="mt-1 text-2xl font-semibold tracking-tight">{m.value}</div>
              </div>
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-black/[0.04]">
                <m.icon className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div
              className={`mt-3 inline-flex items-center gap-1 text-[11px] font-medium ${
                m.changeType === "positive" ? "text-[oklch(0.5_0.15_155)]" : "text-muted-foreground"
              }`}
            >
              {m.changeType === "positive" && <TrendingUp className="h-3 w-3" />}
              {m.change}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="glass inline-flex rounded-xl p-1">
        <TabBtn active={tab === "digital"} onClick={() => setTab("digital")}>
          📱 Digital (UPI)
        </TabBtn>
        <TabBtn active={tab === "offline"} onClick={() => setTab("offline")}>
          💵 Offline
        </TabBtn>
      </div>

      {tab === "digital" ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.54fr] xl:grid-cols-[1fr_0.54fr]">
          {/* Left column - Live UPI Feed */}
          <div className="glass rounded-2xl p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  Live UPI Stream
                  <span className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.82_0.15_155_/_0.3)] bg-[oklch(0.82_0.15_155_/_0.1)] px-2.5 py-1 text-[11px] text-[oklch(0.5_0.15_155)]">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.5_0.15_155)] opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[oklch(0.5_0.15_155)]" />
                    </span>
                    Live
                  </span>
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">Zero platform fee · Settled instantly</div>
              </div>
            </div>
            <div className="space-y-2">
              {upiFeed.map((u, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-4 rounded-xl border border-black/[0.07] bg-white px-4 py-3 transition-colors hover:bg-[oklch(0.82_0.15_155_/_0.06)]"
                >
                  <div
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-xs font-semibold text-[oklch(0.2_0.03_260)] shadow-sm"
                    style={{ backgroundColor: u.color }}
                  >
                    {u.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{u.name}</div>
                    <div className="truncate text-[11px] text-muted-foreground">
                      {u.id} · {u.provider}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-semibold">₹{u.amount.toLocaleString("en-IN")}</div>
                    <span className="inline-flex items-center gap-1 rounded-full border border-[oklch(0.82_0.15_155_/_0.3)] bg-[oklch(0.82_0.15_155_/_0.1)] px-2 py-0.5 text-[11px] text-[oklch(0.5_0.15_155)]">
                      <CheckCircle2 className="h-3 w-3" /> Auto-approved
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Analytics & Insights */}
          <div className="space-y-6">
            {/* Digital Summary */}
            <div className="glass rounded-2xl p-5">
              <div className="mb-4">
                <div className="text-sm font-semibold">Digital Summary</div>
                <div className="text-xs text-muted-foreground">Real-time payment health</div>
              </div>
              <div className="space-y-4">
                <SummaryRow label="Success Rate" value="99.4%" icon={CheckCircle2} />
                <SummaryRow label="Avg Settlement" value="8 sec" icon={Clock} />
                <SummaryRow label="Fees Saved" value="₹4,297" icon={CreditCard} />
              </div>
            </div>

            {/* Provider Split */}
            <div className="glass rounded-2xl p-5">
              <div className="mb-4">
                <div className="text-sm font-semibold">Provider Split</div>
                <div className="text-xs text-muted-foreground">Share by payment app</div>
              </div>
              <div className="space-y-4">
                {providerSplit.map((p) => (
                  <div key={p.name}>
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="font-medium">{p.name}</span>
                      <span className="text-muted-foreground">{p.percent}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-black/[0.06]">
                      <div
                        className={`h-full rounded-full ${p.color} transition-all duration-700 ease-out`}
                        style={{ width: `${p.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass rounded-2xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Offline Reconciliation</div>
              <div className="text-xs text-muted-foreground">Approve or reject manual entries.</div>
            </div>
            <div className="text-xs text-muted-foreground">{rows.filter((r) => r.status === "pending").length} pending</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="pb-3 font-medium">Student</th>
                  <th className="pb-3 font-medium">Method</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Receipt</th>
                  <th className="pb-3 font-medium">Entered by</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04]">
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td className="py-3">
                      <div className="font-medium">{r.name}</div>
                      <div className="text-[11px] text-muted-foreground">
                        {r.id} · {r.grade}
                      </div>
                    </td>
                    <td>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.07] bg-black/[0.04] px-2 py-0.5 text-[11px]">
                        <Banknote className="h-3 w-3" /> {r.method}
                      </span>
                    </td>
                    <td className="font-semibold">₹{r.amount.toLocaleString("en-IN")}</td>
                    <td className="text-muted-foreground">{r.receipt}</td>
                    <td className="text-muted-foreground">{r.by}</td>
                    <td>
                      <StatusPill status={r.status} />
                    </td>
                    <td className="text-right">
                      {r.status === "pending" ? (
                        <div className="inline-flex gap-2">
                          <button
                            onClick={() => decide(r.id, "approved")}
                            className="inline-flex items-center gap-1 rounded-lg border border-[oklch(0.82_0.15_155_/_0.3)] bg-[oklch(0.82_0.15_155_/_0.1)] px-2.5 py-1.5 text-xs text-[oklch(0.5_0.15_155)] hover:brightness-110"
                          >
                            <CheckCircle2 className="h-3 w-3" /> Approve
                          </button>
                          <button
                            onClick={() => decide(r.id, "rejected")}
                            className="inline-flex items-center gap-1 rounded-lg border border-[oklch(0.7_0.2_25_/_0.3)] bg-[oklch(0.7_0.2_25_/_0.1)] px-2.5 py-1.5 text-xs text-[oklch(0.55_0.22_25)] hover:brightness-110"
                          >
                            <XCircle className="h-3 w-3" /> Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-muted-foreground">Resolved</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryRow({ label, value, icon: Icon }: { label: string; value: string; icon: typeof CheckCircle2 }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-black/[0.07] bg-white px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-black/[0.04]">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  icon: Icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon?: typeof Smartphone;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  );
}

function StatusPill({ status }: { status: "pending" | "approved" | "rejected" }) {
  const map = {
    pending: { c: "text-[oklch(0.55_0.18_70)]", b: "border-[oklch(0.82_0.16_70_/_0.3)]", bg: "bg-[oklch(0.82_0.16_70_/_0.1)]", l: "Pending" },
    approved: { c: "text-[oklch(0.5_0.15_155)]", b: "border-[oklch(0.82_0.15_155_/_0.3)]", bg: "bg-[oklch(0.82_0.15_155_/_0.1)]", l: "Approved" },
    rejected: { c: "text-[oklch(0.55_0.22_25)]", b: "border-[oklch(0.7_0.2_25_/_0.3)]", bg: "bg-[oklch(0.7_0.2_25_/_0.1)]", l: "Rejected" },
  }[status];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border ${map.b} ${map.bg} px-2 py-0.5 text-[11px] ${map.c}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" /> {map.l}
    </span>
  );
}
