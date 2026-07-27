import { createFileRoute } from "@tanstack/react-router";
import { Building2, Bell, Key, Palette, School, Save } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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

const quickSections = [
  { icon: Bell, title: "Notifications", desc: "WhatsApp, email and SMS reminder cadence for parents and staff." },
  { icon: Key, title: "Integrations", desc: "UPI webhook, accounting exports and identity providers." },
  { icon: Palette, title: "Branding", desc: "Logo, receipt colours and parent-portal theming." },
];

function InstitutionProfileCard() {
  const [form, setForm] = useState({
    schoolName: "Delhi Public School · North",
    registrationId: "CBSE/2004/1128",
    upiVpa: "dpsnorth@icici",
    currency: "INR (₹)",
    contactEmail: "fees@dpsnorth.in",
    phone: "+91 11 2345 6789",
  });

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = () => {
    toast("Profile saved", { description: "Institution details updated successfully." });
  };

  const fields: { label: string; field: keyof typeof form; type?: string }[] = [
    { label: "School Name", field: "schoolName" },
    { label: "Registration ID", field: "registrationId" },
    { label: "UPI VPA", field: "upiVpa" },
    { label: "Currency", field: "currency" },
    { label: "Contact Email", field: "contactEmail", type: "email" },
    { label: "Phone", field: "phone", type: "tel" },
  ];

  return (
    <Card className="overflow-hidden rounded-xl border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 text-slate-100 shadow-xl">
      <CardHeader className="p-6">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-teal-500/20 text-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.25)] ring-1 ring-teal-400/20">
            <School className="h-6 w-6" strokeWidth={2} />
          </div>
          <div className="min-w-0 flex-1">
            <CardTitle className="text-lg font-semibold text-white">Institution Profile</CardTitle>
            <CardDescription className="mt-1 text-sm text-slate-400">
              Displayed on receipts and parent communications.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <Separator className="bg-slate-800" />
      <CardContent className="p-6 pt-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {fields.map(({ label, field, type = "text" }) => (
            <div key={field} className="flex flex-col">
              <Label className="mb-2 text-xs font-medium text-slate-400">{label}</Label>
              <Input
                type={type}
                value={form[field]}
                onChange={handleChange(field)}
                className="h-11 rounded-full border-slate-700 bg-slate-900/50 px-4 text-sm text-slate-200 shadow-inner transition-all placeholder:text-slate-500 focus-visible:border-teal-500/50 focus-visible:ring-2 focus-visible:ring-teal-500/50 focus-visible:ring-offset-0"
              />
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleSave}
            className="h-10 gap-2 rounded-full bg-teal-500 px-6 text-sm font-semibold text-slate-950 shadow-[0_0_24px_rgba(20,184,166,0.35)] transition-all hover:bg-teal-400 hover:shadow-[0_0_30px_rgba(20,184,166,0.5)]"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Settings() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Console"
        title="Settings"
        description="Configure how Smart School FinTech behaves for your institution."
      />

      <InstitutionProfileCard />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quickSections.map((s) => {
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
              <button
                onClick={() => toast(s.title, { description: s.desc })}
                className="mt-4 rounded-xl border border-black/[0.07] bg-black/[0.04] px-3 py-1.5 text-xs hover:bg-black/[0.07]"
              >
                Configure →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
