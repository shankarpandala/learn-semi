"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  CheckCircle,
  BookOpen,
  Clock,
} from "lucide-react";
import {
  getSubject,
  getPhaseForSubject,
} from "@/data/curriculum";
import { isChapterComplete, getSubjectProgress } from "@/lib/progress";
import ProgressBar from "@/components/ProgressBar";

const phaseColorMap: Record<string, string> = {
  "phase-1": "var(--phase-1)",
  "phase-2": "var(--phase-2)",
  "phase-3": "var(--phase-3)",
  "phase-4": "var(--phase-4)",
  "phase-5": "var(--phase-5)",
};

interface SubjectPageClientProps {
  subjectId: string;
}

export default function SubjectPageClient({ subjectId }: SubjectPageClientProps) {
  const subject = getSubject(subjectId);
  const [progress, setProgress] = useState(0);
  const [completionMap, setCompletionMap] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    if (!subject) return;
    setProgress(getSubjectProgress(subjectId, subject.chapters.length));
    const map: Record<string, boolean> = {};
    subject.chapters.forEach((ch) => {
      map[ch.id] = isChapterComplete(subjectId, ch.id);
    });
    setCompletionMap(map);
  }, [subjectId, subject]);

  if (!subject) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-lg" style={{ color: "var(--muted)" }}>
          Subject not found.
        </p>
      </div>
    );
  }

  const phase = getPhaseForSubject(subject);
  const color = phaseColorMap[phase.color] ?? "var(--accent)";
  const completedCount = Object.values(completionMap).filter(Boolean).length;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 transition-colors hover:underline"
        style={{ color: "var(--accent)" }}
      >
        <ChevronLeft size={16} />
        All Subjects
      </Link>

      {/* Subject header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{
              backgroundColor: `${color}15`,
              color,
            }}
          >
            Phase {phase.number}: {phase.title}
          </span>
          <span
            className="text-xs font-medium px-2 py-1 rounded-full"
            style={{
              backgroundColor: "var(--accent-light)",
              color: "var(--accent)",
            }}
          >
            Subject {subject.number}
          </span>
        </div>
        <h1
          className="text-3xl lg:text-4xl font-bold mb-3"
          style={{ color: "var(--foreground)" }}
        >
          {subject.title}
        </h1>
        <p className="text-lg" style={{ color: "var(--muted)" }}>
          {subject.description}
        </p>
      </div>

      {/* Progress overview */}
      <div
        className="rounded-xl p-6 mb-10"
        style={{
          backgroundColor: "var(--card-bg)",
          border: "1px solid var(--card-border)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-lg font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            Your Progress
          </h2>
          <span className="text-sm font-medium" style={{ color: "var(--muted)" }}>
            {completedCount} of {subject.chapters.length} chapters complete
          </span>
        </div>
        <ProgressBar
          value={completedCount}
          max={subject.chapters.length}
          variant="linear"
        />
      </div>

      {/* Chapter list */}
      <h2
        className="text-xl font-bold mb-4"
        style={{ color: "var(--foreground)" }}
      >
        Chapters
      </h2>
      <div className="space-y-3">
        {subject.chapters.map((chapter, index) => {
          const completed = completionMap[chapter.id] ?? false;

          return (
            <Link
              key={chapter.id}
              href={`/subjects/${subjectId}/chapters/${chapter.id}`}
              className="flex items-center gap-4 p-5 rounded-xl transition-all hover:scale-[1.01] group"
              style={{
                backgroundColor: "var(--card-bg)",
                border: "1px solid var(--card-border)",
              }}
            >
              {/* Chapter number or check */}
              {completed ? (
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: "var(--success-light)",
                  }}
                >
                  <CheckCircle
                    size={20}
                    style={{ color: "var(--success)" }}
                  />
                </div>
              ) : (
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
                  style={{
                    backgroundColor: "var(--accent-light)",
                    color: "var(--accent)",
                  }}
                >
                  {index + 1}
                </div>
              )}

              {/* Chapter info */}
              <div className="flex-1 min-w-0">
                <h3
                  className="font-semibold mb-0.5 group-hover:underline"
                  style={{ color: "var(--foreground)" }}
                >
                  {chapter.title}
                </h3>
                <p
                  className="text-sm truncate"
                  style={{ color: "var(--muted)" }}
                >
                  {chapter.subtitle}
                </p>
              </div>

              {/* Meta */}
              <div className="hidden sm:flex items-center gap-4 shrink-0">
                {chapter.sections.length > 0 && (
                  <span
                    className="text-xs flex items-center gap-1"
                    style={{ color: "var(--muted)" }}
                  >
                    <BookOpen size={14} />
                    {chapter.sections.length} section
                    {chapter.sections.length !== 1 ? "s" : ""}
                  </span>
                )}
                {chapter.quiz.length > 0 && (
                  <span
                    className="text-xs flex items-center gap-1"
                    style={{ color: "var(--muted)" }}
                  >
                    <Clock size={14} />
                    {chapter.quiz.length} question
                    {chapter.quiz.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
