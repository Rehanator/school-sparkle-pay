import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

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

  const Icon = theme === "light" ? Moon : Sun;
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={`glass relative grid h-10 w-10 shrink-0 place-items-center rounded-xl transition hover:brightness-110 hover:scale-[1.04] ${className}`}
    >
      {mounted && <Icon className="h-[18px] w-[18px]" strokeWidth={2} />}
    </button>
  );
}
