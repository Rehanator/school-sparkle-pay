import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Smartphone, Banknote, CheckCircle2, XCircle, Filter, Download } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/payments")({
  head: () => ({
    meta: [
      { title: "Payments · Smart School FinTech" },
      { name: "description", content: "Realtime UPI feed and offline reconciliation workflow." },
      { property: "og:title", content: "Omnichannel Payments" },
      { property: "og:description", content: "UPI, cash and cheque — all reconciled in one console." },
    ],
  }),
  component: PaymentsPage,
});

const upiFeed = [
  { name: "Aarav Sharma", ref: "yesbnk@upi · TXN 89231", amount: 15000, at: "just now" },
  { name: "Isha Reddy", ref: "hdfc@upi · TXN 89224", amount: 8600, at: "12s ago" },
  { name: "Kabir Menon", ref: "gpay@okaxis · TXN 89218", amount: 22400, at: "48s ago" },
  { name: "Zoya Khan", ref: "phonepe@ybl · TXN 89211", amount: 4500, at: "1m ago" },
  { name: "Rohan Patel", ref: "paytm@paytm · TXN 89204", amount: 12000, at: "3m ago" },
  { name: "Meera Iyer", ref: "hdfc@upi · TXN 89197", amount: 3800, at: "6m ago" },
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
        eyebrow="Omnichannel"
        title="Payments"
        description="Auto-approved UPI in real-time, and a clean workflow for offline reconciliation."
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

      {/* Tabs */}
      <div className="glass inline-flex rounded-xl p-1">
        <TabBtn active={tab === "digital"} onClick={() => setTab("digital")} icon={Smartphone}>
          Digital · UPI
        </TabBtn>
        <TabBtn active={tab === "offline"} onClick={() => setTab("offline")} icon={Banknote}>
          Offline · Cash & Cheque
        </TabBtn>
      </div>

      {tab === "digital" ? (
        <div className="glass rounded-2xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Live UPI Feed</div>
              <div className="text-xs text-muted-foreground">Zero-fee, auto-reconciled</div>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.82_0.15_155_/_0.3)] bg-[oklch(0.82_0.15_155_/_0.1)] px-3 py-1 text-xs text-[oklch(0.5_0.15_155)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.5_0.15_155)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[oklch(0.5_0.15_155)]" />
              </span>
              Live
            </span>
          </div>
          <div className="space-y-2">
            {upiFeed.map((u, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border border-black/[0.07] bg-black/[0.04] px-4 py-3"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.88_0.14_165)] to-[oklch(0.82_0.13_220)] text-[oklch(0.2_0.03_260)]">
                  <Smartphone className="h-4 w-4" strokeWidth={2.4} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{u.name}</div>
                  <div className="truncate text-[11px] text-muted-foreground">{u.ref}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">₹{u.amount.toLocaleString("en-IN")}</div>
                  <div className="text-[11px] text-muted-foreground">{u.at}</div>
                </div>
                <span className="hidden shrink-0 items-center gap-1 rounded-full border border-[oklch(0.82_0.15_155_/_0.3)] bg-[oklch(0.82_0.15_155_/_0.1)] px-2 py-0.5 text-[11px] text-[oklch(0.5_0.15_155)] sm:inline-flex">
                  <CheckCircle2 className="h-3 w-3" /> Auto-approved
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="glass rounded-2xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Offline Reconciliation</div>
              <div className="text-xs text-muted-foreground">Approve or reject manual entries.</div>
            </div>
            <div className="text-xs text-muted-foreground">
              {rows.filter((r) => r.status === "pending").length} pending
            </div>
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

function TabBtn({
  active,
  onClick,
  icon: Icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof Smartphone;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition ${
        active
          ? "bg-black/[0.07] text-foreground shadow-inner"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      <Icon className="h-4 w-4" />
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
