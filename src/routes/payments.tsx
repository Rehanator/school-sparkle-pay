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
  CreditCard,
  Wallet,
  Percent,
  type LucideIcon,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/payments")({
  head: () => ({
    meta: [
      { title: "Omnichannel Payments · Smart School FinTech" },
      { name: "description", content: "Live UPI collections and manual reconciliation in one console." },
      { property: "og:title", content: "Omnichannel Payments" },
      { property: "og:description", content: "Live UPI collections and manual reconciliation in one console." },
    ],
  }),
  component: PaymentsPage,
});

const metrics = [
  {
    label: "Today's Collection",
    value: "₹4,82,300",
    change: "↑ +12% vs yesterday",
    changeType: "positive" as const,
    icon: Wallet,
  },
  {
    label: "UPI Transactions",
    value: "326",
    change: "Zero-fee routed",
    changeType: "neutral" as const,
    icon: Smartphone,
  },
  {
    label: "Offline Earning",
    value: "₹1,12,800",
    change: "Awaiting bank deposit",
    changeType: "neutral" as const,
    icon: Banknote,
  },
  {
    label: "Pending Offline",
    value: "18",
    change: "Requires reconciliation",
    changeType: "warning" as const,
    icon: Percent,
  },
];

type UpiRow = {
  payer: string;
  student: string;
  grade: string;
  vpa: string;
  txnId: string;
  amount: number;
  icon: "bolt" | "incoming";
  iconBg: string;
  time: string;
};

const upiFeed: UpiRow[] = [
  {
    payer: "Mrs. Sharma",
    student: "Riya Sharma",
    grade: "Class IX-B",
    vpa: "priya.k@okhdfc",
    txnId: "TXN-9821245",
    amount: 15000,
    icon: "bolt",
    iconBg: "oklch(0.88 0.14 165)",
    time: "12s ago",
  },
  {
    payer: "Mr. Reddy",
    student: "Isha Reddy",
    grade: "Class VII-A",
    vpa: "rahul.m@ybl",
    txnId: "TXN-9821244",
    amount: 8600,
    icon: "incoming",
    iconBg: "oklch(0.82 0.13 220)",
    time: "34s ago",
  },
  {
    payer: "Mrs. Menon",
    student: "Kabir Menon",
    grade: "Class XI-C",
    vpa: "anita.m@paytm",
    txnId: "TXN-9821243",
    amount: 22400,
    icon: "bolt",
    iconBg: "oklch(0.82 0.12 300)",
    time: "1m ago",
  },
  {
    payer: "Mr. Khan",
    student: "Zoya Khan",
    grade: "Class V-B",
    vpa: "zafar.k@upi",
    txnId: "TXN-9821242",
    amount: 4500,
    icon: "incoming",
    iconBg: "oklch(0.82 0.14 70)",
    time: "2m ago",
  },
];

const snapshotItems = [
  { label: "Collected Today", value: "₹2,14,850", icon: Wallet },
  { label: "Total Transactions", value: "86", icon: CheckCircle2 },
  { label: "Avg. Ticket Size", value: "₹2,498", icon: TrendingUp },
  { label: "Convenience Fees Saved", value: "₹4,297", icon: CreditCard },
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
        description="Live UPI collections and manual reconciliation in one console."
        actions={
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1.5 text-xs font-medium text-success">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              🟢 Gateway Health: Online (99.99% uptime)
            </span>
            <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary px-3 py-2 text-sm font-medium transition hover:bg-secondary/80">
              <Filter className="h-4 w-4" /> Filter
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary px-3 py-2 text-sm font-medium transition hover:bg-secondary/80">
              <Download className="h-4 w-4" /> Export
            </button>
          </div>
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
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-secondary">
                <m.icon className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div
              className={`mt-3 inline-flex items-center gap-1 text-[11px] font-medium ${
                m.changeType === "positive"
                  ? "text-success"
                  : m.changeType === "warning"
                    ? "text-warning"
                    : "text-muted-foreground"
              }`}
            >
              {m.changeType === "positive" && <TrendingUp className="h-3 w-3" />}
              {m.change}
            </div>
          </div>
        ))}
      </div>

      {/* Full-width segmented tabs */}
      <div className="glass grid w-full grid-cols-2 rounded-xl p-1">
        <TabBtn active={tab === "digital"} onClick={() => setTab("digital")}>
          📱 Digital (UPI)
        </TabBtn>
        <TabBtn active={tab === "offline"} onClick={() => setTab("offline")}>
          💵 Offline · Reconciliation
        </TabBtn>
      </div>

      {tab === "digital" ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.538fr]">
          {/* Left column - Live UPI Feed */}
          <div className="glass rounded-2xl p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  Live UPI Feed
                  <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-[11px] text-success">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                    </span>
                    Live
                  </span>
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">Zero platform fee · Settled instantly</div>
              </div>
            </div>
            <div className="space-y-3">
              {upiFeed.map((u, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-4 rounded-xl border border-border bg-card/60 px-4 py-3 transition hover:bg-secondary/60"
                >
                  <div
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-semibold shadow-sm"
                    style={{ backgroundColor: u.iconBg }}
                  >
                    {u.icon === "bolt" ? "⚡" : "↘"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-foreground">
                      {u.payer} → {u.student} · {u.grade}
                    </div>
                    <div className="truncate text-[11px] text-muted-foreground">
                      {u.vpa} · {u.txnId}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-semibold text-foreground">₹{u.amount.toLocaleString("en-IN")}</div>
                    <div className="mt-0.5 flex items-center justify-end gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-success px-2 py-0.5 text-[11px] font-medium text-success-foreground">
                        <CheckCircle2 className="h-3 w-3" /> Auto approved
                      </span>
                      <span className="text-[11px] text-muted-foreground">{u.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Today's UPI Collection */}
          <div className="glass flex flex-col rounded-2xl p-6">
            <div className="mb-5">
              <div className="text-sm font-semibold">Today's UPI Collection</div>
              <div className="text-xs text-muted-foreground">Real-time settlement summary</div>
            </div>
            <div className="flex-1 divide-y divide-border">
              {snapshotItems.map((item) => (
                <SnapshotRow key={item.label} label={item.label} value={item.value} icon={item.icon} />
              ))}
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
              <tbody className="divide-y divide-border">
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td className="py-3">
                      <div className="font-medium">{r.name}</div>
                      <div className="text-[11px] text-muted-foreground">
                        {r.id} · {r.grade}
                      </div>
                    </td>
                    <td>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-2 py-0.5 text-[11px]">
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
                            className="inline-flex items-center gap-1 rounded-lg border border-success/30 bg-success/10 px-2.5 py-1.5 text-xs font-medium text-success transition hover:brightness-110"
                          >
                            <CheckCircle2 className="h-3 w-3" /> Approve
                          </button>
                          <button
                            onClick={() => decide(r.id, "rejected")}
                            className="inline-flex items-center gap-1 rounded-lg border border-destructive/30 bg-destructive/10 px-2.5 py-1.5 text-xs font-medium text-destructive transition hover:brightness-110"
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

function SnapshotRow({ label, value, icon: Icon }: { label: string; value: string; icon: LucideIcon }) {
  return (
    <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-secondary">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <span className="text-xl font-semibold tracking-tight">{value}</span>
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function StatusPill({ status }: { status: OfflineStatus }) {
  const map = {
    pending: { c: "text-warning", b: "border-warning/30", bg: "bg-warning/10", l: "Pending" },
    approved: { c: "text-success", b: "border-success/30", bg: "bg-success/10", l: "Approved" },
    rejected: { c: "text-destructive", b: "border-destructive/30", bg: "bg-destructive/10", l: "Rejected" },
  }[status];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border ${map.b} ${map.bg} px-2 py-0.5 text-[11px] font-medium ${map.c}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" /> {map.l}
    </span>
  );
}
