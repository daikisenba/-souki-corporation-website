"use client";
import { useEffect, useState } from "react";

export default function ClockCard() {
  const [now, setNow] = useState<Date>(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const date = now.toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric", weekday: "long" });
  const time = now.toLocaleTimeString("ja-JP", { hour12: false });

  return (
    <div className="w-full rounded-3xl p-6 md:p-8
                    bg-white/70 backdrop-blur-md shadow-xl
                    ring-1 ring-white/60">
      <div className="text-slate-500 text-sm mb-2">最新技術で常に進化</div>
      <div className="text-slate-700 text-sm">{date}</div>
      <div className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">{time}</div>
    </div>
  );
}
