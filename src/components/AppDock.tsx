import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Wallet,
  CreditCard,
  Users,
  ShieldCheck,
  SunMoon,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Dock, DockIcon, DockItem, DockLabel } from "./ui/dock";

const items = [
  { title: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-full w-full text-neutral-600 dark:text-neutral-300" /> },
  { title: "Fee Engine", href: "/fee-engine", icon: <Wallet className="h-full w-full text-neutral-600 dark:text-neutral-300" /> },
  { title: "Payments", href: "/payments", icon: <CreditCard className="h-full w-full text-neutral-600 dark:text-neutral-300" /> },
  { title: "Staff Directory", href: "/staff", icon: <Users className="h-full w-full text-neutral-600 dark:text-neutral-300" /> },
  { title: "Audit Trail", href: "/audit", icon: <ShieldCheck className="h-full w-full text-neutral-600 dark:text-neutral-300" /> },
] as const;

const itemClass =
  "aspect-square rounded-full bg-white/10 dark:bg-neutral-800 backdrop-blur-md border border-white/10";

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

export function AppDock() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = (localStorage.getItem("ssft-theme") as "light" | "dark" | null) ?? "light";
    setTheme(stored);
    applyTheme(stored);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
    localStorage.setItem("ssft-theme", next);
  };

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <Dock className="items-end pb-3">
        {items.map((item) => (
          <DockItem key={item.href} className={itemClass}>
            <DockLabel>{item.title}</DockLabel>
            <DockIcon>
              <Link to={item.href} aria-label={item.title} className="block h-full w-full p-1">
                {item.icon}
              </Link>
            </DockIcon>
          </DockItem>
        ))}
        <DockItem className={itemClass}>
          <DockLabel>Theme</DockLabel>
          <DockIcon>
            <button type="button" onClick={toggleTheme} aria-label="Toggle theme" className="block h-full w-full p-1">
              <SunMoon className="h-full w-full text-neutral-600 dark:text-neutral-300" />
            </button>
          </DockIcon>
        </DockItem>
      </Dock>
    </div>
  );
}
