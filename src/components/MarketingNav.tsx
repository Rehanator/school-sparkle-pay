import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import fynoraLogo from "@/assets/fynora-logo.png.asset.json";
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
          <img
            src={fynoraLogo.url}
            alt="FYNORA logo"
            className="h-9 w-auto object-contain"
          />
          <span className="text-lg font-bold uppercase tracking-widest">FYNORA</span>
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
        </div>
      </div>
    </header>
  );
}
