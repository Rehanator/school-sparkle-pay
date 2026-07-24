import { createFileRoute } from "@tanstack/react-router";
import { Award, Mail, Phone } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/staff")({
  head: () => ({
    meta: [
      { title: "Staff Directory · Smart School FinTech" },
      { name: "description", content: "Meet the accountants, coordinators and administrators behind the finance office." },
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
  { name: "Anita Kapoor", role: "Principal Admin", years: 18, dept: "Leadership", email: "anita.k@smartschool.edu", phone: "+91 99887 12200", tint: "from-[oklch(0.75_0.14_320)] to-[oklch(0.82_0.12_300)]" },
  { name: "Meera Joshi", role: "Fee Reconciliation Officer", years: 8, dept: "Finance", email: "meera.j@smartschool.edu", phone: "+91 98450 78990", tint: "from-[oklch(0.85_0.12_180)] to-[oklch(0.88_0.14_165)]" },
  { name: "Arjun Rathore", role: "IT Systems Admin", years: 5, dept: "Technology", email: "arjun.r@smartschool.edu", phone: "+91 91234 45566", tint: "from-[oklch(0.82_0.13_220)] to-[oklch(0.75_0.14_260)]" },
  { name: "Fatima Sheikh", role: "Scholarship Coordinator", years: 7, dept: "Student Affairs", email: "fatima.s@smartschool.edu", phone: "+91 93450 22110", tint: "from-[oklch(0.9_0.13_190)] to-[oklch(0.82_0.13_220)]" },
  { name: "David Thomas", role: "Cheque Reconciliation Analyst", years: 4, dept: "Finance", email: "david.t@smartschool.edu", phone: "+91 97766 55211", tint: "from-[oklch(0.82_0.12_300)] to-[oklch(0.75_0.14_320)]" },
];

function initials(n: string) {
  return n.split(" ").map((s) => s[0]).slice(0, 2).join("");
}

function Staff() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="People"
        title="Staff Directory"
        description="The finance-side operators who keep every rupee accounted for."
        actions={
          <button className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            Add Staff
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {staff.map((s) => (
          <div key={s.email} className="glass group relative overflow-hidden rounded-2xl p-5">
            <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${s.tint} opacity-25 blur-2xl`} />
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${s.tint} text-base font-semibold text-[oklch(0.2_0.03_260)]`}>
                  {initials(s.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-base font-semibold">{s.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{s.role}</div>
                  <div className="mt-1 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-muted-foreground">
                    {s.dept}
                  </div>
                </div>
              </div>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[oklch(0.85_0.12_180_/_0.3)] bg-[oklch(0.85_0.12_180_/_0.08)] px-3 py-1 text-xs">
                <Award className="h-3.5 w-3.5 text-[oklch(0.85_0.12_180)]" />
                <span className="font-semibold text-foreground">{s.years} Years</span>
                <span className="text-muted-foreground">Experience</span>
              </div>

              <div className="mt-4 space-y-1.5 text-[11px] text-muted-foreground">
                <div className="flex items-center gap-2 truncate">
                  <Mail className="h-3.5 w-3.5 shrink-0" /> <span className="truncate">{s.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 shrink-0" /> {s.phone}
                </div>
              </div>

              <button className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 py-2 text-xs font-medium transition hover:border-[oklch(0.85_0.12_180_/_0.4)] hover:bg-[oklch(0.85_0.12_180_/_0.08)]">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
