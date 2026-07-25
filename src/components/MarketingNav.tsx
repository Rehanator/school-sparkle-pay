import { Link } from "@tanstack/react-router";
import { GraduationCap, ArrowRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/fee-engine", label: "Fee Engine" },
  { to: "/payments", label: "Payments" },
  { to: "/staff", label: "Staff Directory" },
  { to: "/audit", label: "Audit Trail" },
] as const;

export function MarketingNav() {
  return (
    <header className="sticky top-4 z-40 mx-auto mt-4 w-[min(1200px,calc(100%-1.5rem))]">
      <div className="glass flex items-center justify-between gap-4 rounded-2xl px-4 py-2.5 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.88_0.14_165)] to-[oklch(0.82_0.13_220)] text-[oklch(0.2_0.03_260)] shadow-md">
            <GraduationCap className="h-4.5 w-4.5" strokeWidth={2.4} />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold tracking-tight">Smart School</div>
            <div className="-mt-0.5 text-[10px] text-muted-foreground">FinTech Console</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-black/[0.04] hover:text-foreground"
              activeProps={{ className: "rounded-lg px-3 py-1.5 text-sm font-medium text-foreground bg-black/[0.05]" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg shadow-[oklch(0.62_0.14_200_/_0.35)] transition hover:brightness-110"
          >
            Go to Dashboard <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
