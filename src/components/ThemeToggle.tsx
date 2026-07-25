import { useEffect, useState } from "react";
import SkyToggle from "./ui/sky-toggle";

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = (localStorage.getItem("ssft-theme") as "light" | "dark" | null) ?? "light";
    setTheme(stored);
    applyTheme(stored);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
    localStorage.setItem("ssft-theme", next);
  };

  if (!mounted) {
    return <div className={`inline-block h-[30px] w-[68px] ${className}`} aria-hidden />;
  }

  return (
    <div className={`inline-flex shrink-0 items-center ${className}`}>
      <SkyToggle checked={theme === "dark"} onChange={toggle} ariaLabel="Toggle theme" />
    </div>
  );
}
