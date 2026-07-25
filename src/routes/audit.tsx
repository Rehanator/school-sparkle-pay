import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Lock, ShieldCheck, Search, Download, Fingerprint, ChevronDown } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/audit")({
  head: () => ({
    meta: [
      { title: "Audit Trail · Smart School FinTech" },
      { name: "description", content: "Tamper-proof, read-only ledger of every admin action." },
      { property: "og:title", content: "System Audit Log" },
      { property: "og:description", content: "Immutable proof of every financial action, timestamped and IP-verified." },
    ],
  }),
  component: Audit,
});

const logs = [
  { ts: "2026-07-25 14:22:08 IST", adminId: "ADM-001", username: "admin.anita@dpsn", action: "Manually Waived ₹500 Late Fee for Student #104", ip: "10.14.22.8", type: "waive", category: "Waiver", risk: "Medium" },
  { ts: "2026-07-25 13:58:47 IST", adminId: "ADM-004", username: "accountant.meera@dpsn", action: "Approved Offline Cash Payment ₹12,000 (Receipt R-2251)", ip: "10.14.22.19", type: "approve", category: "Approval", risk: "Low" },
  { ts: "2026-07-25 13:41:02 IST", adminId: "ADM-004", username: "accountant.meera@dpsn", action: "Rejected Cheque Entry #OFF-1039 · Reason: Signature mismatch", ip: "10.14.22.19", type: "reject", category: "Approval", risk: "Medium" },
  { ts: "2026-07-25 12:07:33 IST", adminId: "ADM-001", username: "admin.anita@dpsn", action: "Enabled 'First-Time Late Payer Grace Period' rule", ip: "10.14.22.8", type: "rule", category: "Config", risk: "Medium" },
  { ts: "2026-07-25 11:44:15 IST", adminId: "ADM-007", username: "accountant.ravi@dpsn", action: "Split ₹60,000 Annual Fee → 4× ₹15,000 EMI for Student #104", ip: "10.14.22.34", type: "split", category: "Payment", risk: "Low" },
  { ts: "2026-07-25 10:12:59 IST", adminId: "ADM-001", username: "admin.anita@dpsn", action: "Deleted Cash Entry #OFF-1038 · Duplicate", ip: "10.14.22.8", type: "delete", category: "Delete", risk: "High" },
  { ts: "2026-07-25 09:33:07 IST", adminId: "ADM-012", username: "sysadmin.arjun@dpsn", action: "Rotated API key for UPI webhook", ip: "10.14.22.51", type: "system", category: "System", risk: "High" },
  { ts: "2026-07-24 17:52:41 IST", adminId: "ADM-004", username: "accountant.meera@dpsn", action: "Bulk Reminder sent to 34 defaulters via WhatsApp Bot", ip: "10.14.22.19", type: "system", category: "System", risk: "Low" },
  { ts: "2026-07-24 16:18:20 IST", adminId: "ADM-001", username: "admin.anita@dpsn", action: "Created New Fee Head 'Robotics Club' ₹3,500 · Annually", ip: "10.14.22.8", type: "create", category: "Config", risk: "Medium" },
  { ts: "2026-07-24 15:09:11 IST", adminId: "ADM-007", username: "accountant.ravi@dpsn", action: "Exported Q2 Reconciliation Report (CSV)", ip: "10.14.22.34", type: "export", category: "System", risk: "Low" },
];

const categoryStyle: Record<string, string> = {
  Waiver: "text-[oklch(0.85_0.16_85)] bg-[oklch(0.5_0.15_85_/_0.18)] border-[oklch(0.7_0.16_85_/_0.35)]",
  Payment: "text-[oklch(0.85_0.16_155)] bg-[oklch(0.5_0.15_155_/_0.18)] border-[oklch(0.7_0.16_155_/_0.35)]",
  Approval: "text-[oklch(0.85_0.14_200)] bg-[oklch(0.5_0.14_200_/_0.18)] border-[oklch(0.7_0.14_200_/_0.35)]",
  Delete: "text-[oklch(0.8_0.2_25)] bg-[oklch(0.5_0.2_25_/_0.18)] border-[oklch(0.7_0.2_25_/_0.35)]",
  Config: "text-[oklch(0.85_0.14_300)] bg-[oklch(0.5_0.14_300_/_0.2)] border-[oklch(0.7_0.14_300_/_0.35)]",
  System: "text-[oklch(0.85_0.02_255)] bg-[oklch(0.3_0.02_255_/_0.4)] border-[oklch(0.6_0.02_255_/_0.3)]",
};

const riskStyle: Record<string, string> = {
  Low: "text-[oklch(0.85_0.16_155)] bg-[oklch(0.5_0.15_155_/_0.18)] border-[oklch(0.7_0.16_155_/_0.35)]",
  Medium: "text-[oklch(0.85_0.16_75)] bg-[oklch(0.5_0.16_75_/_0.2)] border-[oklch(0.7_0.16_75_/_0.35)]",
  High: "text-[oklch(0.8_0.2_25)] bg-[oklch(0.5_0.2_25_/_0.2)] border-[oklch(0.7_0.2_25_/_0.4)]",
};

const typeColor: Record<string, string> = {
  waive: "text-[oklch(0.55_0.18_70)] bg-[oklch(0.82_0.16_70_/_0.12)] border-[oklch(0.82_0.16_70_/_0.3)]",
  approve: "text-[oklch(0.5_0.15_155)] bg-[oklch(0.82_0.15_155_/_0.12)] border-[oklch(0.82_0.15_155_/_0.3)]",
  reject: "text-[oklch(0.55_0.22_25)] bg-[oklch(0.7_0.2_25_/_0.12)] border-[oklch(0.7_0.2_25_/_0.3)]",
  delete: "text-[oklch(0.55_0.22_25)] bg-[oklch(0.7_0.2_25_/_0.12)] border-[oklch(0.7_0.2_25_/_0.3)]",
  rule: "text-[oklch(0.9_0.13_220)] bg-[oklch(0.82_0.13_220_/_0.12)] border-[oklch(0.82_0.13_220_/_0.3)]",
  split: "text-[oklch(0.9_0.13_220)] bg-[oklch(0.82_0.13_220_/_0.12)] border-[oklch(0.82_0.13_220_/_0.3)]",
  create: "text-[oklch(0.88_0.14_165)] bg-[oklch(0.85_0.12_180_/_0.12)] border-[oklch(0.85_0.12_180_/_0.3)]",
  system: "text-muted-foreground bg-black/[0.04] border-black/[0.07]",
  export: "text-muted-foreground bg-black/[0.04] border-black/[0.07]",
};

const FILTERS: { label: string; types: string[] | null }[] = [
  { label: "All actions", types: null },
  { label: "Waivers", types: ["waive"] },
  { label: "Deletions", types: ["delete"] },
  { label: "Rule changes", types: ["rule"] },
  { label: "System", types: ["system", "export"] },
];

const TIME_OPTIONS = [
  "Last 1 hour",
  "Last 24 hours",
  "Last 7 days",
  "Last 30 days",
  "Custom Range...",
];

function parseLogTs(ts: string) {
  return new Date(ts.replace(" IST", ""));
}

function Audit() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState(0);
  const [timeFilter, setTimeFilter] = useState("Last 24 hours");
  const [timeOpen, setTimeOpen] = useState(false);
  const timeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (timeRef.current && !timeRef.current.contains(e.target as Node)) {
        setTimeOpen(false);
      }
    }
    if (timeOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [timeOpen]);

  const filteredLogs = useMemo(() => {
    const types = FILTERS[activeFilter].types;
    const q = query.trim().toLowerCase();
    const now = new Date();
    let cutoff: Date | null = null;
    if (timeFilter === "Last 1 hour") cutoff = new Date(now.getTime() - 60 * 60 * 1000);
    else if (timeFilter === "Last 24 hours") cutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    else if (timeFilter === "Last 7 days") cutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    else if (timeFilter === "Last 30 days") cutoff = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    return logs.filter((l) => {
      if (types && !types.includes(l.type)) return false;
      if (cutoff && parseLogTs(l.ts) < cutoff) return false;
      if (!q) return true;
      return (
        l.adminId.toLowerCase().includes(q) ||
        l.username.toLowerCase().includes(q) ||
        l.action.toLowerCase().includes(q) ||
        l.ip.toLowerCase().includes(q)
      );
    });
  }, [query, activeFilter, timeFilter]);

  const handleExport = () => {
    const header = ["Timestamp", "Admin ID", "Username", "Action", "IP", "Type", "Category", "Risk"];
    const rows = filteredLogs.map((l) => [l.ts, `${l.adminId} · ${l.username}`, l.action, l.ip, l.type, l.category, l.risk]);
    const csv = [header, ...rows]
      .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-log-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">

      {/* Live status badge + page header */}
      <div>
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-emerald-950/30 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-emerald-400/90">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Tamper-Proof Ledger
        </span>
        <PageHeader
          eyebrow="Immutable Ledger"
          title="System Audit Log"
          description="Every action, every timestamp, every IP — sealed and unchangeable."
        />
      </div>

      {/* Lock hero */}
      <div className="glass relative overflow-hidden rounded-2xl p-8 text-center">
        <div className="absolute inset-0 -z-10 opacity-40" style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, oklch(0.88 0.14 165 / 0.25), transparent 55%), radial-gradient(circle at 70% 80%, oklch(0.82 0.12 300 / 0.25), transparent 55%)",
        }} />
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-[oklch(0.88_0.14_165)] to-[oklch(0.82_0.13_220)] text-[oklch(0.2_0.03_260)] shadow-[0_0_60px_-10px_oklch(0.85_0.12_180)]">
          <Lock className="h-9 w-9" strokeWidth={2.4} />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[oklch(0.5_0.15_155_/_0.3)] bg-[oklch(0.5_0.15_155_/_0.12)] px-3 py-1 text-xs font-medium text-[oklch(0.5_0.15_155)]">
            <ShieldCheck className="h-3.5 w-3.5" /> SHA-256 chained
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[oklch(0.62_0.14_200_/_0.3)] bg-[oklch(0.62_0.14_200_/_0.12)] px-3 py-1 text-xs font-medium text-[oklch(0.55_0.14_200)]">
            <Fingerprint className="h-3.5 w-3.5" /> IP + Device fingerprinted
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[oklch(0.7_0.14_300_/_0.3)] bg-[oklch(0.7_0.14_300_/_0.12)] px-3 py-1 text-xs font-medium text-[oklch(0.55_0.16_300)]">
            <Lock className="h-3.5 w-3.5" /> Read-only
          </span>
        </div>
        <div className="mt-2 text-lg font-semibold">Tamper-Proof Ledger</div>
        <div className="text-xs text-muted-foreground">
          Every entry is signed and chained to the previous block — the ultimate defence against financial fraud.
        </div>
      </div>

      {/* Filters */}
      <div className="glass relative z-30 flex flex-wrap items-center gap-2 rounded-2xl p-3">
        <div className="flex w-full max-w-xs items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by admin ID, action, IP…"
            className="w-full bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f, i) => (
            <button
              key={f.label}
              onClick={() => setActiveFilter(i)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                i === activeFilter
                  ? "bg-white/15 text-white shadow-[0_0_12px_-4px_rgba(255,255,255,0.25)]"
                  : "bg-white/[0.04] text-muted-foreground hover:bg-white/[0.08] hover:text-white border border-white/10"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div ref={timeRef} className="relative">
            <button
              onClick={() => setTimeOpen((o) => !o)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-white/[0.09] hover:text-white transition-colors"
            >
              {timeFilter}
              <ChevronDown className="h-4 w-4" />
            </button>
            {timeOpen && (
              <div className="absolute right-0 top-full z-[100] mt-2 min-w-[11rem] overflow-hidden rounded-xl border border-white/10 bg-black/90 p-1 shadow-xl backdrop-blur-md">
                {TIME_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setTimeFilter(opt);
                      setTimeOpen(false);
                    }}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      timeFilter === opt
                        ? "bg-white/10 text-white"
                        : "text-muted-foreground hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 rounded-xl bg-[oklch(0.72_0.16_195)] px-3 py-2 text-sm font-semibold text-[oklch(0.18_0.05_240)] hover:bg-[oklch(0.76_0.16_195)]"
          >
            <Download className="h-4 w-4" /> Export CSV
          </button>
        </div>
      </div>


      {/* Log table */}
      <div className="glass relative z-0 overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left text-sm">
            <thead className="bg-black/[0.04] text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-medium">Date & Timestamp</th>
                <th className="px-5 py-3 font-medium">Admin User ID</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Action Taken</th>
                <th className="px-5 py-3 font-medium">IP Address</th>
                <th className="px-5 py-3 font-medium">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04] font-mono">
              {filteredLogs.map((l, i) => (
                <tr key={i} className="hover:bg-black/[0.04]">
                  <td className="whitespace-nowrap px-5 py-3 text-xs text-muted-foreground">{l.ts}</td>
                  <td className="px-5 py-3 text-xs">
                    <div className="font-semibold text-white">{l.adminId}</div>
                    <div className="mt-0.5 text-[11px] font-normal text-muted-foreground">{l.username}</div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${categoryStyle[l.category]}`}>
                      {l.category}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-0.5 text-[11px] ${typeColor[l.type]}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {l.action}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-xs text-muted-foreground">{l.ip}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${riskStyle[l.risk]}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {l.risk}
                    </span>
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
