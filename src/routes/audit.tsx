import { createFileRoute } from "@tanstack/react-router";
import { Lock, ShieldCheck, Search, Download } from "lucide-react";
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
  { ts: "2026-07-24 14:22:08 IST", user: "ADM-001 · anita.kapoor", action: "Manually Waived ₹500 Late Fee for Student #104", ip: "10.14.22.8", type: "waive" },
  { ts: "2026-07-24 13:58:47 IST", user: "ADM-004 · meera.joshi", action: "Approved Offline Cash Payment ₹12,000 (Receipt R-2251)", ip: "10.14.22.19", type: "approve" },
  { ts: "2026-07-24 13:41:02 IST", user: "ADM-004 · meera.joshi", action: "Rejected Cheque Entry #OFF-1039 · Reason: Signature mismatch", ip: "10.14.22.19", type: "reject" },
  { ts: "2026-07-24 12:07:33 IST", user: "ADM-001 · anita.kapoor", action: "Enabled 'First-Time Late Payer Grace Period' rule", ip: "10.14.22.8", type: "rule" },
  { ts: "2026-07-24 11:44:15 IST", user: "ADM-007 · ravi.narayanan", action: "Split ₹60,000 Annual Fee → 4× ₹15,000 EMI for Student #104", ip: "10.14.22.34", type: "split" },
  { ts: "2026-07-24 10:12:59 IST", user: "ADM-001 · anita.kapoor", action: "Deleted Cash Entry #OFF-1038 · Duplicate", ip: "10.14.22.8", type: "delete" },
  { ts: "2026-07-24 09:33:07 IST", user: "ADM-012 · arjun.rathore", action: "Rotated API key for UPI webhook", ip: "10.14.22.51", type: "system" },
  { ts: "2026-07-23 17:52:41 IST", user: "ADM-004 · meera.joshi", action: "Bulk Reminder sent to 34 defaulters via WhatsApp Bot", ip: "10.14.22.19", type: "system" },
  { ts: "2026-07-23 16:18:20 IST", user: "ADM-001 · anita.kapoor", action: "Created New Fee Head 'Robotics Club' ₹3,500 · Annually", ip: "10.14.22.8", type: "create" },
  { ts: "2026-07-23 15:09:11 IST", user: "ADM-007 · ravi.narayanan", action: "Exported Q2 Reconciliation Report (CSV)", ip: "10.14.22.34", type: "export" },
];

const typeColor: Record<string, string> = {
  waive: "text-[oklch(0.9_0.16_70)] bg-[oklch(0.82_0.16_70_/_0.12)] border-[oklch(0.82_0.16_70_/_0.3)]",
  approve: "text-[oklch(0.85_0.15_155)] bg-[oklch(0.82_0.15_155_/_0.12)] border-[oklch(0.82_0.15_155_/_0.3)]",
  reject: "text-[oklch(0.85_0.2_25)] bg-[oklch(0.7_0.2_25_/_0.12)] border-[oklch(0.7_0.2_25_/_0.3)]",
  delete: "text-[oklch(0.85_0.2_25)] bg-[oklch(0.7_0.2_25_/_0.12)] border-[oklch(0.7_0.2_25_/_0.3)]",
  rule: "text-[oklch(0.9_0.13_220)] bg-[oklch(0.82_0.13_220_/_0.12)] border-[oklch(0.82_0.13_220_/_0.3)]",
  split: "text-[oklch(0.9_0.13_220)] bg-[oklch(0.82_0.13_220_/_0.12)] border-[oklch(0.82_0.13_220_/_0.3)]",
  create: "text-[oklch(0.88_0.14_165)] bg-[oklch(0.85_0.12_180_/_0.12)] border-[oklch(0.85_0.12_180_/_0.3)]",
  system: "text-muted-foreground bg-white/5 border-white/10",
  export: "text-muted-foreground bg-white/5 border-white/10",
};

function Audit() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Immutable Ledger"
        title="System Audit Log"
        description="Every action, every timestamp, every IP — sealed and unchangeable."
      />

      {/* Lock hero */}
      <div className="glass relative overflow-hidden rounded-2xl p-8 text-center">
        <div className="absolute inset-0 -z-10 opacity-40" style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, oklch(0.88 0.14 165 / 0.25), transparent 55%), radial-gradient(circle at 70% 80%, oklch(0.82 0.12 300 / 0.25), transparent 55%)",
        }} />
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-[oklch(0.88_0.14_165)] to-[oklch(0.82_0.13_220)] text-[oklch(0.2_0.03_260)] shadow-[0_0_60px_-10px_oklch(0.85_0.12_180)]">
          <Lock className="h-9 w-9" strokeWidth={2.4} />
        </div>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-[oklch(0.85_0.15_155)]" /> Tamper-proof · Hash-chained · Read-only
        </div>
        <div className="mt-2 text-lg font-semibold">This ledger cannot be edited or deleted.</div>
        <div className="text-xs text-muted-foreground">
          Every entry is signed and chained to the previous block — the ultimate defence against financial fraud.
        </div>
      </div>

      {/* Filters */}
      <div className="glass flex flex-wrap items-center gap-2 rounded-2xl p-3">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search by admin ID, action, IP…"
            className="w-full bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm">
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      {/* Log table */}
      <div className="glass overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-medium">Date & Timestamp</th>
                <th className="px-5 py-3 font-medium">Admin User ID</th>
                <th className="px-5 py-3 font-medium">Action Taken</th>
                <th className="px-5 py-3 font-medium">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {logs.map((l, i) => (
                <tr key={i} className="hover:bg-white/[0.03]">
                  <td className="whitespace-nowrap px-5 py-3 text-xs text-muted-foreground">{l.ts}</td>
                  <td className="px-5 py-3 text-xs">{l.user}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-0.5 text-[11px] ${typeColor[l.type]}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {l.action}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-xs text-muted-foreground">{l.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
