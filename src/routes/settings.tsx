import { createFileRoute } from "@tanstack/react-router";
import { Building2, Bell, Key, Palette } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings · Smart School FinTech" },
      { name: "description", content: "Configure school profile, notifications, integrations and branding." },
      { property: "og:title", content: "Settings" },
      { property: "og:description", content: "Fine-tune your Smart School FinTech console." },
    ],
  }),
  component: Settings,
});

const sections = [
  { icon: Building2, title: "School Profile", desc: "Name, address, academic year and finance office details." },
  { icon: Bell, title: "Notifications", desc: "WhatsApp, email and SMS reminder cadence for parents and staff." },
  { icon: Key, title: "Integrations", desc: "UPI webhook, accounting exports and identity providers." },
  { icon: Palette, title: "Branding", desc: "Logo, receipt colours and parent-portal theming." },
];

function Settings() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Console"
        title="Settings"
        description="Configure how Smart School FinTech behaves for your institution."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="glass rounded-2xl p-5">
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.88_0.14_165)] to-[oklch(0.82_0.13_220)] text-[oklch(0.2_0.03_260)]">
                  <Icon className="h-5 w-5" strokeWidth={2.4} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold">{s.title}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.desc}</div>
                </div>
              </div>
              <button className="mt-4 rounded-xl border border-black/[0.07] bg-black/[0.04] px-3 py-1.5 text-xs hover:bg-black/[0.07]">
                Configure →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
