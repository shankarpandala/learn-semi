"use client";

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  variant?: "circular" | "linear";
}

export default function ProgressBar({
  value,
  max,
  label,
  variant = "linear",
}: ProgressBarProps) {
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
              stroke="var(--card-border)"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-500 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold" style={{ color: "var(--foreground)" }}>
              {percentage}%
            </span>
          </div>
        </div>
        {label && (
          <span className="text-sm font-medium" style={{ color: "var(--muted)" }}>
            {label}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
            {label}
          </span>
          <span className="text-sm font-medium" style={{ color: "var(--muted)" }}>
            {percentage}%
          </span>
        </div>
      )}
      <div
        className="w-full h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: "var(--card-border)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: "var(--accent)",
          }}
        />
      </div>
    </div>
  );
}
