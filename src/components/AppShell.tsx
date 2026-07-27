import { type ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-foreground">
      {/* Pastel gradient blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="pastel-blob absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[oklch(0.88_0.14_165)] opacity-30 blur-[140px]" />
        <div className="pastel-blob absolute top-1/3 -right-40 h-[560px] w-[560px] rounded-full bg-[oklch(0.82_0.13_220)] opacity-25 blur-[160px]" />
        <div className="pastel-blob absolute bottom-[-200px] left-1/3 h-[520px] w-[520px] rounded-full bg-[oklch(0.82_0.12_300)] opacity-25 blur-[160px]" />
        <div className="pastel-blob absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[oklch(0.9_0.1_190)] opacity-15 blur-[120px]" />
      </div>

      <main className="mx-auto min-w-0 max-w-[1400px] px-3 py-6 pb-32 sm:px-6">{children}</main>
    </div>
  );
}
