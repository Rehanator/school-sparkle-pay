import { createFileRoute } from "@tanstack/react-router";
import { Award, Mail, Phone, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/staff")({
  head: () => ({
    meta: [
      { title: "Staff Directory · Smart School FinTech" },
      { name: "description", content: "Trusted finance professionals managing every school transaction with accuracy and transparency." },
      { property: "og:title", content: "Staff Directory" },
      { property: "og:description", content: "Every staff card, every specialization, every year of experience." },
    ],
  }),
  component: Staff,
});

const staff = [
  { name: "Ravi Narayanan", role: "Senior Accountant", years: 12, dept: "Finance", email: "ravi.n@smartschool.edu", phone: "+91 98765 12345", tint: "from-[oklch(0.88_0.14_165)] to-[oklch(0.82_0.13_220)]" },
  { name: "Priya Menon", role: "Front Desk Lead", years: 6, dept: "Reception", email: "priya.m@smartschool.edu", phone: "+91 98213 55401", tint: "from-[oklch(0.82_0.12_300)] to-[oklch(0.82_0.13_220)]" },
  { name: "Suresh Iyer", role: "Bus Coordinator", years: 10, dept: "Transport", email: "suresh.i@smartschool.edu", phone: "+91 90234 66112", tint: "from-[oklch(0.82_0.16_70)] to-[oklch(0.75_0.2_35)]" },
  { name: "Anita Kapoor", role: "Principal Admin", years: 18, dept: "Administration", email: "anita.k@smartschool.edu", phone: "+91 99887 12200", tint: "from-[oklch(0.75_0.14_320)] to-[oklch(0.82_0.12_300)]" },
  { name: "Meera Joshi", role: "Fee Reconciliation Officer", years: 8, dept: "Finance", email: "meera.j@smartschool.edu", phone: "+91 98450 78990", tint: "from-[oklch(0.85_0.12_180)] to-[oklch(0.88_0.14_165)]" },
  { name: "Arjun Rathore", role: "IT Systems Admin", years: 5, dept: "Technology", email: "arjun.r@smartschool.edu", phone: "+91 91234 45566", tint: "from-[oklch(0.82_0.13_220)] to-[oklch(0.75_0.14_260)]" },
  { name: "Fatima Sheikh", role: "Scholarship Coordinator", years: 7, dept: "HR", email: "fatima.s@smartschool.edu", phone: "+91 93450 22110", tint: "from-[oklch(0.9_0.13_190)] to-[oklch(0.82_0.13_220)]" },
  { name: "David Thomas", role: "Cheque Reconciliation Analyst", years: 4, dept: "Compliance", email: "david.t@smartschool.edu", phone: "+91 97766 55211", tint: "from-[oklch(0.82_0.12_300)] to-[oklch(0.75_0.14_320)]" },
];

const FILTERS = ["All", "Finance", "Administration", "Transport", "Reception", "Technology", "Compliance", "HR"] as const;
type Filter = (typeof FILTERS)[number];

function initials(n: string) {
  return n.split(" ").map((s) => s[0]).slice(0, 2).join("");
}

function Staff() {
  const [active, setActive] = useState<Filter>("All");

  const filtered = useMemo(
    () => (active === "All" ? staff : staff.filter((s) => s.dept === active)),
    [active],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="People"
        title="Staff Directory"
        description="Trusted finance professionals managing every school transaction with accuracy and transparency."
        actions={
          <button className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90">
            Add Staff
          </button>
        }
      />

      {/* Category filters */}
      <div className="-mx-1 mb-8 overflow-x-auto px-1 pb-1">
        <div className="flex w-max items-center gap-2">
          {FILTERS.map((f) => {
            const isActive = f === active;
            return (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-cyan-400 text-black shadow-[0_0_16px_-4px_rgba(34,211,238,0.55)]"
                    : "border border-neutral-800 bg-neutral-900/80 text-neutral-400 hover:border-neutral-700 hover:bg-neutral-800 hover:text-neutral-200"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {filtered.map((s) => (
          <div
            key={s.email}
            className="staff-card glass group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-[0_18px_40px_-18px_oklch(0_0_0_/_0.18)]"
          >
            <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${s.tint} opacity-25 blur-2xl transition-opacity duration-300 group-hover:opacity-40`} />
            <div className="relative">
              <div className="flex items-start gap-4">
                <div
                  className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${s.tint} text-base font-semibold text-[oklch(0.2_0.03_260)] shadow-[0_6px_18px_-8px_oklch(0_0_0_/_0.35)] ring-1 ring-white/40 transition-transform duration-300 group-hover:scale-[1.03]`}
                >
                  {initials(s.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-base font-semibold tracking-tight">{s.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{s.role}</div>
                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-black/[0.09] bg-black/[0.03] px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-muted-foreground">
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
                    {s.dept}
                  </div>
                </div>
              </div>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[oklch(0.85_0.12_180_/_0.3)] bg-[oklch(0.85_0.12_180_/_0.08)] px-3 py-1 text-xs shadow-[inset_0_0_0_1px_oklch(1_0_0_/_0.3)]">
                <Award className="h-3.5 w-3.5 text-[oklch(0.6_0.14_195)]" />
                <span className="font-semibold text-foreground">{s.years} Years</span>
                <span className="text-muted-foreground">Experience</span>
              </div>

              {/* Divider */}
              <div className="my-4 h-px w-full bg-black/[0.06]" />

              <div className="space-y-2 text-[11px] text-muted-foreground">
                <div className="flex items-center gap-2 truncate">
                  <Mail className="h-3.5 w-3.5 shrink-0" /> <span className="truncate">{s.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 shrink-0" /> {s.phone}
                </div>
              </div>

              <button className="group/btn mt-5 flex w-full items-center justify-center gap-1.5 rounded-xl border border-black/[0.08] bg-black/[0.02] py-2 text-xs font-medium transition-all duration-250 ease-out hover:border-primary/30 hover:bg-primary/[0.06] hover:shadow-[0_0_0_3px_oklch(from_var(--primary)_l_c_h_/_0.08)]">
                <span>View Profile</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-250 ease-out group-hover/btn:translate-x-0.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
