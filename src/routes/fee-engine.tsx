import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Plus,
  Bus,
  BookOpen,
  Trophy,
  FlaskConical,
  Utensils,
  Palette,
  Split,
  Sparkles,
  Shield,
  X,
  Check,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/fee-engine")({
  head: () => ({
    meta: [
      { title: "Fee Engine · Smart School FinTech" },
      { name: "description", content: "Manage fee heads, EMI splits and automated waiver rules." },
      { property: "og:title", content: "Fee Engine" },
      { property: "og:description", content: "Dynamic fee rules and Edu-EMI splits for schools." },
    ],
  }),
  component: FeeEngine,
});

const feeHeads = [
  { name: "Tuition Fee", category: "ALL GRADES", icon: BookOpen, amount: 45000, cycle: "Quarterly", students: 1240, status: "Active", tint: "from-[oklch(0.88_0.14_165)] to-[oklch(0.82_0.13_220)]" },
  { name: "Transport", category: "ALL GRADES", icon: Bus, amount: 12000, cycle: "Quarterly", students: 860, status: "Active", tint: "from-[oklch(0.82_0.13_220)] to-[oklch(0.82_0.12_300)]" },
  { name: "Sports & Clubs", category: "CLASS X", icon: Trophy, amount: 4500, cycle: "Annually", students: 620, status: "Annual", tint: "from-[oklch(0.82_0.16_70)] to-[oklch(0.75_0.2_35)]" },
  { name: "Lab & Materials", category: "CLASS IX - X", icon: FlaskConical, amount: 3800, cycle: "Annually", students: 980, status: "Active", tint: "from-[oklch(0.82_0.12_300)] to-[oklch(0.85_0.12_180)]" },
  { name: "Meal Plan", category: "ALL GRADES", icon: Utensils, amount: 8600, cycle: "Monthly", students: 540, status: "Draft", tint: "from-[oklch(0.85_0.12_180)] to-[oklch(0.88_0.14_165)]" },
  { name: "Arts & Music", category: "CLASS VI - VIII", icon: Palette, amount: 2900, cycle: "Annually", students: 310, status: "Annual", tint: "from-[oklch(0.75_0.14_320)] to-[oklch(0.82_0.12_300)]" },
];

function FeeEngine() {
  const [modal, setModal] = useState(false);
  const [split, setSplit] = useState(false);
  const [installments, setInstallments] = useState(4);
  const total = 60000;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Rules & Structures"
        title="Fee Engine"
        description="Design fee heads, split large payments into micro-EMIs, and automate waivers."
        actions={
          <button
            onClick={() => setModal(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:brightness-110"
          >
            <Plus className="h-4 w-4" /> Create New Fee
          </button>
        }
      />

      {/* Active fees grid */}
      <div>
        <div className="mb-3 text-sm font-semibold">Active Fee Heads</div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {feeHeads.map((f) => {
            const Icon = f.icon;
            const statusStyle =
              f.status === "Active"
                ? "border-[oklch(0.55_0.16_155_/_0.35)] bg-[oklch(0.55_0.16_155_/_0.10)] text-[oklch(0.45_0.15_155)]"
                : f.status === "Draft"
                ? "border-black/[0.08] bg-black/[0.05] text-muted-foreground"
                : "border-[oklch(0.62_0.14_200_/_0.35)] bg-[oklch(0.62_0.14_200_/_0.10)] text-[oklch(0.5_0.13_200)]";
            return (
              <div key={f.name} className="glass group flex flex-col rounded-2xl p-4 transition hover:-translate-y-0.5">
                <div className="flex items-start justify-between">
                  <div className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${f.tint} text-[oklch(0.2_0.03_260)]`}>
                    <Icon className="h-5 w-5" strokeWidth={2.4} />
                  </div>
                  <span className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${statusStyle}`}>
                    {f.status}
                  </span>
                </div>
                <div className="mt-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{f.category}</div>
                  <div className="mt-0.5 text-sm font-medium text-foreground">{f.name}</div>
                </div>
                <div className="mt-1 text-2xl font-semibold">₹{f.amount.toLocaleString("en-IN")}</div>
                <div className="mt-auto flex items-center justify-between pt-3 text-[11px] text-muted-foreground">
                  <span>{f.students} students · {f.cycle}</span>
                  <button className="rounded-lg px-2 py-1 text-xs font-medium text-primary transition hover:bg-primary/10">
                    Manage →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edu-EMI Smart Split */}
      <div className="glass relative overflow-hidden rounded-2xl p-6">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[oklch(0.88_0.14_165)] opacity-15 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-[oklch(0.82_0.12_300)] opacity-10 blur-3xl" />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-black/[0.04] px-3 py-1 text-[11px] text-muted-foreground">
              <Sparkles className="h-3 w-3" /> Innovation · Edu-EMI
            </div>
            <h2 className="mt-3 text-xl font-semibold">Smart Split — turn big fees into micro-EMIs</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Pick a student, choose the number of installments, and instantly break down heavy annual
              fees into interest-free monthly slices.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[oklch(0.85_0.12_180_/_0.4)] bg-[oklch(0.85_0.12_180_/_0.12)] px-3 py-1 text-[11px] font-medium text-[oklch(0.45_0.12_180)]">
            <Sparkles className="h-3 w-3" /> AI-Assisted / Innovation Feature
          </span>
        </div>

        <div className="relative mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-3">
            <div>
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Student</label>
              <div className="mt-1 flex items-center gap-3 rounded-xl border border-black/[0.07] bg-black/[0.04] px-3 py-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[oklch(0.82_0.12_300)] to-[oklch(0.82_0.13_220)] text-xs font-semibold text-[oklch(0.2_0.03_260)]">
                  AS
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">Aarav Sharma · 10-B</div>
                  <div className="text-[11px] text-muted-foreground">Annual bundled fee</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">₹{total.toLocaleString("en-IN")}</div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Installments</label>
                <button className="text-[11px] font-medium text-primary hover:underline">✨ AI Auto-Suggest</button>
              </div>
              <div className="mt-3">
                <input
                  type="range"
                  min={2}
                  max={12}
                  step={1}
                  value={installments}
                  onChange={(e) => setInstallments(Number(e.target.value))}
                  className="w-full accent-[oklch(0.62_0.14_200)]"
                  style={{ accentColor: "oklch(0.62 0.14 200)" }}
                />
                <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
                  <span>2 months</span>
                  <span className="font-medium text-foreground">{installments} months</span>
                  <span>12 months</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSplit(true)}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:brightness-105"
            >
              <Split className="h-4 w-4" /> Generate Plan & Notify Parent →
            </button>
            <button
              onClick={() => { setSplit(false); setInstallments(4); }}
              className="w-full text-center text-xs text-muted-foreground hover:text-foreground"
            >
              Reset Split
            </button>
          </div>

          {/* Result panel */}
          <div className="rounded-2xl border border-black/[0.07] bg-[oklch(0.98_0.005_250_/_0.7)] p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Payment Plan Preview</div>
              {split ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-[oklch(0.55_0.16_155_/_0.35)] bg-[oklch(0.55_0.16_155_/_0.12)] px-2 py-0.5 text-[10px] font-medium text-[oklch(0.45_0.15_155)]">
                  <Check className="h-3 w-3" /> Ready to notify parent via WhatsApp
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full border border-black/[0.08] bg-black/[0.04] px-2 py-0.5 text-[10px] text-muted-foreground">
                  Awaiting generation
                </span>
              )}
            </div>
            <div
              className={`mt-4 grid gap-3 ${
                installments <= 4 ? "grid-cols-2" : "grid-cols-3"
              }`}
            >
              {Array.from({ length: installments }).map((_, i) => {
                const amount = Math.round(total / installments);
                const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
                return (
                  <div
                    key={i}
                    className="glass flex flex-col items-center justify-center rounded-2xl p-4 text-center"
                    style={{
                      opacity: split ? 1 : 0.35,
                      transform: split ? "translateY(0)" : "translateY(4px)",
                      transition: `all 300ms ${i * 60}ms`,
                    }}
                  >
                    <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">EMI {i + 1}</div>
                    <div className="mt-1 text-lg font-semibold text-foreground">₹{amount.toLocaleString("en-IN")}</div>
                    <div className="mt-1 text-[11px] text-muted-foreground">Due {months[i]} 5</div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex items-center justify-between rounded-xl border border-[oklch(0.85_0.12_180_/_0.3)] bg-[oklch(0.85_0.12_180_/_0.08)] px-4 py-3 text-sm">
              <span>0% Interest · Zero hidden charges</span>
              <span className="font-semibold">Total ₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Waiver Rules */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.82_0.12_300)] to-[oklch(0.82_0.13_220)] text-[oklch(0.2_0.03_260)]">
            <Shield className="h-5 w-5" strokeWidth={2.4} />
          </div>
          <div>
            <div className="text-sm font-semibold">Waiver Rules Engine</div>
            <div className="text-xs text-muted-foreground">Fair, automated penalties and grace periods.</div>
          </div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <RuleToggle
            title="First-Time Late Payer Grace Period"
            desc="Waive the late-fee automatically for parents on their first delayed payment (up to 5 days)."
            defaultOn
          />
          <RuleToggle
            title="Strict Penalty for Habitual Defaulters"
            desc="After 3 late payments in 6 months, apply escalating penalties and lock EMI splits."
            defaultOn
          />
          <RuleToggle
            title="Scholarship Auto-Waive"
            desc="Skip transport and activity fees for merit and need-based scholarship holders."
          />
          <RuleToggle
            title="Sibling Discount"
            desc="Automatically deduct 8% from tuition when a sibling is enrolled in the same academic year."
            defaultOn
          />
        </div>
      </div>

      {modal && <CreateFeeModal onClose={() => setModal(false)} />}
    </div>
  );
}

function RuleToggle({ title, desc, defaultOn }: { title: string; desc: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className={`flex items-start justify-between gap-4 rounded-xl border p-4 text-left transition ${
        on ? "border-[oklch(0.85_0.12_180_/_0.4)] bg-[oklch(0.85_0.12_180_/_0.06)]" : "border-black/[0.07] bg-black/[0.04]"
      }`}
    >
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium">{title}</div>
        <div className="mt-1 text-xs text-muted-foreground">{desc}</div>
      </div>
      <span
        className={`relative mt-1 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${
          on ? "bg-[oklch(0.85_0.12_180)]" : "bg-black/[0.09]"
        }`}
      >
        <span
          className={`absolute h-5 w-5 rounded-full bg-white shadow transition ${on ? "left-[22px]" : "left-0.5"}`}
        />
      </span>
    </button>
  );
}

function CreateFeeModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="glass-strong w-full max-w-lg rounded-2xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm font-semibold">Create New Fee</div>
            <div className="text-xs text-muted-foreground">Define a new fee head for your school.</div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-black/[0.07]">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-5 space-y-3">
          <Field label="Fee Name" placeholder="e.g. Robotics Club" />
          <Field label="Amount (₹)" placeholder="e.g. 3500" />
          <div>
            <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Cycle</label>
            <div className="mt-1 grid grid-cols-3 gap-2">
              {["Monthly", "Quarterly", "Annually"].map((c) => (
                <button
                  key={c}
                  className="rounded-lg border border-black/[0.07] bg-black/[0.04] px-3 py-2 text-sm hover:border-[oklch(0.85_0.12_180_/_0.4)] hover:bg-[oklch(0.85_0.12_180_/_0.08)]"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-xl border border-black/[0.07] bg-black/[0.04] px-4 py-2 text-sm">
            Cancel
          </button>
          <button
            onClick={onClose}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Create Fee
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-black/[0.07] bg-black/[0.04] px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:border-[oklch(0.85_0.12_180_/_0.5)] focus:outline-none"
      />
    </div>
  );
}
