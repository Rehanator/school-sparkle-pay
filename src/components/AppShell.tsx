import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Wallet,
  CreditCard,
  Users,
  ShieldCheck,
  Settings,
  Search,
  Bell,
  Menu,
  GraduationCap,
  MessageCircle,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/fee-engine", label: "Fee Engine", icon: Wallet },
  { to: "/payments", label: "Payments", icon: CreditCard },
  { to: "/staff", label: "Staff Directory", icon: Users },
  { to: "/audit", label: "Audit Trail", icon: ShieldCheck },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="relative min-h-screen overflow-x-hidden text-foreground">
      {/* Pastel gradient blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[oklch(0.88_0.14_165)] opacity-30 blur-[140px]" />
        <div className="absolute top-1/3 -right-40 h-[560px] w-[560px] rounded-full bg-[oklch(0.82_0.13_220)] opacity-25 blur-[160px]" />
        <div className="absolute bottom-[-200px] left-1/3 h-[520px] w-[520px] rounded-full bg-[oklch(0.82_0.12_300)] opacity-25 blur-[160px]" />
        <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[oklch(0.9_0.1_190)] opacity-15 blur-[120px]" />
      </div>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`glass sticky top-0 z-30 flex h-screen shrink-0 flex-col transition-all duration-300 ${
            collapsed ? "w-[76px]" : "w-[248px]"
          }`}
        >
          <div className="flex items-center gap-3 px-5 pt-6 pb-5">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.88_0.14_165)] to-[oklch(0.82_0.13_220)] text-[oklch(0.2_0.03_260)] shadow-lg">
              <GraduationCap className="h-5 w-5" strokeWidth={2.4} />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold tracking-tight">Smart School</div>
                <div className="truncate text-[11px] text-muted-foreground">FinTech Console</div>
              </div>
            )}
          </div>

          <nav className="flex-1 space-y-1 px-3">
            {nav.map((item) => {
              const active = pathname === item.to || pathname.startsWith(item.to + "/");
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                    active
                      ? "bg-black/[0.07] text-foreground shadow-inner"
                      : "text-muted-foreground hover:bg-black/[0.04] hover:text-foreground"
                  }`}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-gradient-to-b from-[oklch(0.88_0.14_165)] to-[oklch(0.82_0.13_220)]" />
                  )}
                  <Icon className="h-[18px] w-[18px] shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="space-y-2 p-3">
            {!collapsed && (
              <div className="rounded-xl border border-black/[0.07] bg-black/[0.04] p-3 backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-[oklch(0.88_0.14_165)] to-[oklch(0.82_0.13_220)] text-[oklch(0.2_0.03_260)]">
                    <MessageCircle className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </div>
                  <div className="text-[11px] font-semibold">Need help?</div>
                </div>
                <div className="mt-2 text-[10.5px] leading-snug text-muted-foreground">
                  Reach our support desk 24/7
                </div>
                <button className="mt-2 w-full rounded-lg border border-black/[0.07] bg-black/[0.04] px-2 py-1.5 text-[10.5px] font-medium text-foreground hover:bg-black/[0.07]">
                  Contact support
                </button>
              </div>
            )}
            <button
              onClick={() => setCollapsed((v) => !v)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-black/[0.07] bg-black/[0.04] px-3 py-2 text-xs text-muted-foreground hover:text-foreground"
            >
              <Menu className="h-4 w-4" />
              {!collapsed && "Collapse"}
            </button>
          </div>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <header className="glass sticky top-3 z-20 mx-3 mt-3 flex items-center gap-3 rounded-2xl px-4 py-2.5 sm:mx-6">
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-black/[0.07] bg-black/[0.04] px-3 py-2">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                placeholder="Search students, staff, transactions…"
                className="min-w-0 flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
              />
              <kbd className="hidden rounded border border-black/[0.09] bg-black/[0.04] px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline">
                ⌘K
              </kbd>
            </div>
            <button className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-black/[0.07] bg-black/[0.04] hover:bg-black/[0.07]">
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[oklch(0.82_0.16_70)] shadow-[0_0_8px_oklch(0.82_0.16_70)]" />
            </button>
            <div className="flex shrink-0 items-center gap-3 rounded-xl border border-black/[0.07] bg-black/[0.04] py-1.5 pr-3 pl-1.5">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[oklch(0.82_0.12_300)] to-[oklch(0.82_0.13_220)] text-xs font-semibold text-[oklch(0.2_0.03_260)]">
                AK
              </div>
              <div className="hidden text-left sm:block">
                <div className="text-xs font-medium leading-tight">Anita Kapoor</div>
                <div className="text-[10px] leading-tight text-muted-foreground">Principal Admin</div>
              </div>
            </div>
          </header>

          <main className="min-w-0 flex-1 px-3 py-6 sm:px-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
