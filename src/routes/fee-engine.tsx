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
  { name: "Tuition Fee", icon: BookOpen, amount: 45000, cycle: "Quarterly", students: 1240, tint: "from-[oklch(0.88_0.14_165)] to-[oklch(0.82_0.13_220)]" },
  { name: "Transport", icon: Bus, amount: 12000, cycle: "Quarterly", students: 860, tint: "from-[oklch(0.82_0.13_220)] to-[oklch(0.82_0.12_300)]" },
  { name: "Sports & Clubs", icon: Trophy, amount: 4500, cycle: "Annually", students: 620, tint: "from-[oklch(0.82_0.16_70)] to-[oklch(0.75_0.2_35)]" },
  { name: "Lab & Materials", icon: FlaskConical, amount: 3800, cycle: "Annually", students: 980, tint: "from-[oklch(0.82_0.12_300)] to-[oklch(0.85_0.12_180)]" },
  { name: "Meal Plan", icon: Utensils, amount: 8600, cycle: "Monthly", students: 540, tint: "from-[oklch(0.85_0.12_180)] to-[oklch(0.88_0.14_165)]" },
  { name: "Arts & Music", icon: Palette, amount: 2900, cycle: "Annually", students: 310, tint: "from-[oklch(0.75_0.14_320)] to-[oklch(0.82_0.12_300)]" },
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
            return (
              <div key={f.name} className="glass group rounded-2xl p-5 transition hover:-translate-y-0.5">
                <div className="flex items-start justify-between">
                  <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${f.tint} text-[oklch(0.2_0.03_260)]`}>
                    <Icon className="h-5 w-5" strokeWidth={2.4} />
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-muted-foreground">
                    {f.cycle}
                  </span>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">{f.name}</div>
                <div className="mt-1 text-2xl font-semibold">₹{f.amount.toLocaleString("en-IN")}</div>
                <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{f.students} students enrolled</span>
                  <button className="rounded-lg px-2 py-1 opacity-0 transition group-hover:opacity-100 hover:bg-white/10">
                    Edit
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
        <div className="relative grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-muted-foreground">
              <Sparkles className="h-3 w-3" /> Innovation · Edu-EMI
            </div>
            <h2 className="mt-3 text-xl font-semibold">Smart Split — turn big fees into micro-EMIs</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Pick a student, choose the number of installments, and instantly break down heavy annual
              fees into interest-free monthly slices.
            </p>

            <div className="mt-5 space-y-3">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Student</label>
                <div className="mt-1 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
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
                  <span className="text-xs font-medium">{installments} months</span>
                </div>
                <div className="mt-2 flex gap-2">
                  {[2, 3, 4, 6].map((n) => (
                    <button
                      key={n}
                      onClick={() => setInstallments(n)}
                      className={`flex-1 rounded-lg border px-3 py-2 text-sm transition ${
                        installments === n
                          ? "border-[oklch(0.85_0.12_180)] bg-[oklch(0.85_0.12_180_/_0.15)] text-foreground"
                          : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {n}×
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSplit(true)}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:brightness-110"
              >
                <Split className="h-4 w-4" /> Split ₹{total.toLocaleString("en-IN")} into {installments} EMIs
              </button>
            </div>
          </div>

          {/* Result panel */}
          <div className="rounded-2xl border border-white/10 bg-[oklch(0.15_0.02_260_/_0.5)] p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Payment Plan Preview</div>
              {split && (
                <span className="inline-flex items-center gap-1 rounded-full border border-[oklch(0.82_0.15_155_/_0.3)] bg-[oklch(0.82_0.15_155_/_0.12)] px-2 py-0.5 text-[10px] text-[oklch(0.85_0.15_155)]">
                  <Check className="h-3 w-3" /> Plan Generated
                </span>
              )}
            </div>
            <div className="mt-4 grid gap-2">
              {Array.from({ length: installments }).map((_, i) => {
                const amount = Math.round(total / installments);
                const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                    style={{
                      opacity: split ? 1 : 0.35,
                      transform: split ? "translateY(0)" : "translateY(4px)",
                      transition: `all 300ms ${i * 60}ms`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/5 text-xs font-semibold">
                        {i + 1}
                      </div>
                      <div>
                        <div className="text-sm font-medium">EMI #{i + 1}</div>
                        <div className="text-[11px] text-muted-foreground">Due {months[i]} 5</div>
                      </div>
                    </div>
                    <div className="text-sm font-semibold">₹{amount.toLocaleString("en-IN")}</div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex items-center justify-between rounded-xl border border-[oklch(0.85_0.12_180_/_0.3)] bg-[oklch(0.85_0.12_180_/_0.08)] px-4 py-3 text-sm">
              <span>Zero interest · Auto-reminded</span>
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
        on ? "border-[oklch(0.85_0.12_180_/_0.4)] bg-[oklch(0.85_0.12_180_/_0.06)]" : "border-white/10 bg-white/5"
      }`}
    >
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium">{title}</div>
        <div className="mt-1 text-xs text-muted-foreground">{desc}</div>
      </div>
      <span
        className={`relative mt-1 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${
          on ? "bg-[oklch(0.85_0.12_180)]" : "bg-white/15"
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
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-white/10">
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
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm hover:border-[oklch(0.85_0.12_180_/_0.4)] hover:bg-[oklch(0.85_0.12_180_/_0.08)]"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm">
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
        className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:border-[oklch(0.85_0.12_180_/_0.5)] focus:outline-none"
      />
    </div>
  );
}
