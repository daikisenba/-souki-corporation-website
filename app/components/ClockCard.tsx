"use client";
import { useEffect, useState } from "react";

export default function ClockCard() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { 
    const t = setInterval(() => setNow(new Date()), 1000); 
    return () => clearInterval(t); 
  }, []);
  
  return (
    <div className="w-full rounded-3xl p-6 md:p-8 bg-white/70 backdrop-blur-md shadow-xl ring-1 ring-white/60">
      <div className="text-slate-700 text-sm">
        {now.toLocaleDateString("ja-JP", { year:"numeric", month:"long", day:"numeric", weekday:"long" })}
      </div>
      <div className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
        {now.toLocaleTimeString("ja-JP", { hour12:false })}
      </div>
    </div>
  );
}
