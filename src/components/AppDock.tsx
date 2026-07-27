import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Wallet,
  CreditCard,
  Users,
  ShieldCheck,
} from "lucide-react";

import { Dock, DockIcon, DockItem, DockLabel } from "./ui/dock";

const items = [
  { title: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-full w-full text-neutral-600 dark:text-neutral-300" /> },
  { title: "Fee Engine", href: "/fee-engine", icon: <Wallet className="h-full w-full text-neutral-600 dark:text-neutral-300" /> },
  { title: "Payments", href: "/payments", icon: <CreditCard className="h-full w-full text-neutral-600 dark:text-neutral-300" /> },
  { title: "Staff Directory", href: "/staff", icon: <Users className="h-full w-full text-neutral-600 dark:text-neutral-300" /> },
  { title: "Audit Trail", href: "/audit", icon: <ShieldCheck className="h-full w-full text-neutral-600 dark:text-neutral-300" /> },
] as const;

const itemClass =
  "aspect-square rounded-full bg-black/[0.05] dark:bg-neutral-800 backdrop-blur-md border border-black/[0.07] dark:border-white/10";

/** Compact dock sized to sit inside the horizontal top header. */
export function AppDock() {
  return (
    <Dock
      panelHeight={44}
      maxHeight={44}
      magnification={54}
      distance={110}
      containerClassName="mx-0 items-center overflow-visible"
      className="items-center gap-2 rounded-full bg-black/[0.03] px-2 dark:bg-neutral-900/70"
    >
      {items.map((item) => (
        <DockItem key={item.href} className={itemClass}>
          <DockLabel className="-top-7">{item.title}</DockLabel>
          <DockIcon>
            <Link to={item.href} aria-label={item.title} className="block h-full w-full p-0.5">
              {item.icon}
            </Link>
          </DockIcon>
        </DockItem>
      ))}
    </Dock>
  );
}
