export function MarketingBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 -left-40 h-[620px] w-[620px] rounded-full bg-[oklch(0.88_0.14_165)] opacity-50 blur-[160px]" />
      <div className="absolute top-1/4 -right-40 h-[660px] w-[660px] rounded-full bg-[oklch(0.85_0.13_220)] opacity-45 blur-[180px]" />
      <div className="absolute bottom-[-220px] left-1/3 h-[620px] w-[620px] rounded-full bg-[oklch(0.85_0.13_300)] opacity-45 blur-[180px]" />
      <div className="absolute top-1/2 left-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.9_0.11_190)] opacity-35 blur-[140px]" />
    </div>
  );
}
