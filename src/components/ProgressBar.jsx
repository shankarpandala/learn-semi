"use client";

export default function ProgressBar({ value, max, label, variant = "linear" }) {
  const percentage = max === 0 ? 0 : Math.round((value / max) * 100);

  if (variant === "circular") {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="flex flex-col items-center gap-2">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              className="stroke-gray-200 dark:stroke-gray-700"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              className="stroke-brand-500"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 0.5s ease-out" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              {percentage}%
            </span>
          </div>
        </div>
        {label && (
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{label}</span>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{label}</span>
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{percentage}%</span>
        </div>
      )}
      <div className="w-full h-2 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out bg-brand-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
