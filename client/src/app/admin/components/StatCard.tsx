"use client";

export function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: any;
  label: string;
  value: number | string;
  color: string;
}) {
  const colors: Record<string, string> = {
    violet: "bg-violet-50 text-violet-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
  };

  return (
    <div className="bg-white p-8 rounded-[40px] shadow-2xl shadow-slate-100 border border-slate-50">
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${colors[color]}`}
      >
        {icon}
      </div>
      <p className="text-4xl font-black mb-1 leading-none">{value}</p>
      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
        {label}
      </p>
    </div>
  );
}
