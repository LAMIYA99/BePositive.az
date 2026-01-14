"use client";

import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  Filler,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

interface NotificationOption {
  label: { en: string; az: string };
  value: string;
}

interface ResponseEntry {
  value: string;
  createdAt: string;
}

interface NotificationWithStats {
  _id: string;
  options: NotificationOption[];
  stats?: { counts: Record<string, number>; total: number };
  responses?: ResponseEntry[];
}

export const NotificationCharts: React.FC<{
  notification: NotificationWithStats;
}> = ({ notification }) => {
  const labels = notification.options.map((o) => o.label.en);
  const counts = notification.options.map(
    (o) => notification.stats?.counts?.[o.value] || 0
  );

  // prepare sparkline data for last 7 days
  const sparkData = useMemo(() => {
    const days = 7;
    const now = new Date();
    const buckets: number[] = Array(days).fill(0);
    if (notification.responses && notification.responses.length > 0) {
      notification.responses.forEach((r) => {
        const date = new Date(r.createdAt);
        // compute day index from now back to 6 days ago (0 => 6 days ago, days-1 => today)
        const diff = Math.floor(
          (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (diff >= 0 && diff < days) {
          const idx = days - 1 - diff;
          buckets[idx] += 1;
        }
      });
    }
    // labels for sparkline
    const dayLabels = Array.from({ length: days }).map((_, i) => {
      const d = new Date(now.getTime() - (days - 1 - i) * 24 * 60 * 60 * 1000);
      return `${d.getMonth() + 1}/${d.getDate()}`;
    });
    return { labels: dayLabels, buckets };
  }, [notification.responses]);

  const barData = {
    labels,
    datasets: [
      {
        label: "Responses",
        data: counts,
        backgroundColor: "rgba(79,70,229,0.85)",
        borderRadius: 6,
      },
    ],
  };

  const barOptions: any = {
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
    maintainAspectRatio: false,
  };

  const lineData = {
    labels: sparkData.labels,
    datasets: [
      {
        data: sparkData.buckets,
        fill: true,
        backgroundColor: "rgba(99,102,241,0.12)",
        borderColor: "rgba(99,102,241,0.95)",
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  };

  const lineOptions: any = {
    plugins: { legend: { display: false } },
    scales: {
      x: { display: false },
      y: { display: false },
    },
    elements: { line: { borderWidth: 2 } },
    maintainAspectRatio: false,
  };

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-2xl border border-slate-50 shadow-sm h-40">
        <div className="text-sm font-bold text-slate-600 mb-2">
          Distribution
        </div>
        <div className="h-28">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-50 shadow-sm h-40 flex flex-col justify-between">
        <div className="text-sm font-bold text-slate-600 mb-2">Last 7 days</div>
        <div className="h-24">
          <Line data={lineData} options={lineOptions} />
        </div>
        <div className="text-xs text-slate-500 mt-2">
          Total responses: {notification.stats?.total ?? 0}
        </div>
      </div>
    </div>
  );
};
