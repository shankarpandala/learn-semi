import Link from "next/link";

const DIFFICULTY_CONFIG = {
  beginner: {
    label: "Beginner",
    dotColor: "bg-green-500",
    className: "border-green-300 bg-green-100 text-green-700 dark:border-green-700/60 dark:bg-green-900/30 dark:text-green-400",
  },
  intermediate: {
    label: "Intermediate",
    dotColor: "bg-yellow-500",
    className: "border-yellow-300 bg-yellow-100 text-yellow-700 dark:border-yellow-700/60 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  advanced: {
    label: "Advanced",
    dotColor: "bg-orange-500",
    className: "border-orange-300 bg-orange-100 text-orange-700 dark:border-orange-700/60 dark:bg-orange-900/30 dark:text-orange-400",
  },
};

export default function SubjectCard({ subject, completedCount = 0, totalCount = 0 }) {
  const progressValue = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const chapterCount = subject.chapters?.length || 0;
  const config = DIFFICULTY_CONFIG[subject.difficulty] || DIFFICULTY_CONFIG.beginner;

  return (
    <Link
      href={`/subjects/${subject.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md hover:scale-[1.02] dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-gray-900/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      aria-label={`${subject.title} — ${progressValue}% complete`}
    >
      {/* Top colored strip */}
      <div
        className="h-1.5 w-full shrink-0"
        style={{ backgroundColor: subject.colorHex }}
        aria-hidden="true"
      />

      <div className="flex flex-1 flex-col p-5 gap-4">
        {/* Icon + title row */}
        <div className="flex items-start gap-3">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-xl font-bold"
            style={{
              backgroundColor: `${subject.colorHex}22`,
              color: subject.colorHex,
            }}
            aria-hidden="true"
          >
            {subject.icon}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 leading-snug line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {subject.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3 flex-1">
          {subject.description}
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <span className="font-medium text-gray-700 dark:text-gray-300">{chapterCount}</span>
            {chapterCount === 1 ? "chapter" : "chapters"}
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              ~{subject.estimatedHours}h
            </span>
          </span>
          <span aria-hidden="true">·</span>
          <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold ${config.className}`}>
            <span className={`h-2 w-2 rounded-full ${config.dotColor}`} aria-hidden="true" />
            {config.label}
          </span>
        </div>

        {/* Progress */}
        {totalCount > 0 && (
          <div className="space-y-1">
            <div className="w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 h-1.5">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${progressValue}%`, backgroundColor: subject.colorHex }}
              />
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">
              {completedCount} / {totalCount} sections complete
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}
