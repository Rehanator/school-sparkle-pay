import React, { useMemo, useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Activity } from "lucide-react";

interface HourlyCollection {
  time: string;
  amount: number;
}

const INITIAL_DATA: HourlyCollection[] = [
  { time: "8 AM", amount: 45000 },
  { time: "10 AM", amount: 120000 },
  { time: "12 PM", amount: 185000 },
  { time: "2 PM", amount: 240000 },
  { time: "Now", amount: 284500 },
];

function formatINR(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function TodayCollectionPulse() {
  const [data, setData] = useState<HourlyCollection[]>(INITIAL_DATA);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const next = [...prev];
        const lastIndex = next.length - 1;
        const bump = Math.floor(Math.random() * 5001); // ₹0 to ₹5,000
        next[lastIndex] = {
          ...next[lastIndex],
          amount: next[lastIndex].amount + bump,
        };
        return next;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const total = useMemo(
    () => data.reduce((sum, point) => sum + point.amount, 0),
    [data]
  );

  return (
    <Card className="w-full overflow-hidden border border-border/60 bg-card/80 backdrop-blur-md shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold tracking-tight">
              Today&apos;s Collection Pulse
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Live fee collections across the school day
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            Live
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight text-emerald-500">
            {formatINR(total)}
          </span>
          <span className="text-xs text-muted-foreground">collected today</span>
        </div>

        <div className="h-[260px] w-full rounded-xl border border-border/40 bg-muted/30 p-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 12, right: 16, left: 8, bottom: 8 }}>
              <defs>
                <linearGradient id="collectionPulse" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="4 4"
                stroke="currentColor"
                className="text-border"
                vertical={false}
              />
              <XAxis
                dataKey="time"
                tick={{ fill: "currentColor", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                className="text-muted-foreground"
              />
              <YAxis
                tick={{ fill: "currentColor", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value: number) => `₹${value / 1000}K`}
                className="text-muted-foreground"
              />
              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  boxShadow: "0 10px 30px -10px oklch(0 0 0 / 0.2)",
                }}
                itemStyle={{ color: "var(--foreground)", fontSize: 13 }}
                formatter={(value: number) => [formatINR(value), "Collected"]}
                labelStyle={{ color: "var(--muted-foreground)", fontSize: 11 }}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4, stroke: "#3b82f6", strokeWidth: 2, fill: "hsl(var(--card))" }}
                activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2, fill: "#3b82f6" }}
                isAnimationActive={true}
                animationDuration={800}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
