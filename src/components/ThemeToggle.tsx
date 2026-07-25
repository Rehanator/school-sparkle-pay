import { useEffect, useState } from "react";
import type { ComponentType, ChangeEvent } from "react";

type SkyToggleProps = {
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  ariaLabel?: string;
};

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const [SkyToggle, setSkyToggle] = useState<ComponentType<SkyToggleProps> | null>(null);

  useEffect(() => {
    const stored = (localStorage.getItem("ssft-theme") as "light" | "dark" | null) ?? "light";
    setTheme(stored);
    applyTheme(stored);
    setMounted(true);

    let active = true;
    import("./ui/sky-toggle")
      .then((mod) => {
        if (active) setSkyToggle(() => mod.default as ComponentType<SkyToggleProps>);
      })
      .catch(() => {
        // fallback: leave as null, placeholder remains
      });
    return () => {
      active = false;
    };
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
    localStorage.setItem("ssft-theme", next);
  };

  if (!mounted || !SkyToggle) {
    return <div className={`inline-block h-[30px] w-[68px] ${className}`} aria-hidden />;
  }

  return (
    <div className={`inline-flex shrink-0 items-center ${className}`}>
      <SkyToggle checked={theme === "dark"} onChange={toggle} ariaLabel="Toggle theme" />
    </div>
  );
}
