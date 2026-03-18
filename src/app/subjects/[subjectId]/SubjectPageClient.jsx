"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getSubject, getPhaseForSubject } from "@/data/curriculum";
import { isChapterComplete, getSubjectProgress } from "@/lib/progress";
import ProgressBar from "@/components/ProgressBar";

const PHASE_COLORS = {
  1: "#3b82f6",
  2: "#8b5cf6",
  3: "#f59e0b",
  4: "#ef4444",
  5: "#10b981",
};

export default function SubjectPageClient({ subjectId }) {
  const subject = getSubject(subjectId);
  const [progress, setProgress] = useState(0);
  const [completionMap, setCompletionMap] = useState({});

  useEffect(() => {
    if (!subject) return;
    setProgress(getSubjectProgress(subjectId, subject.chapters.length));
    const map = {};
    subject.chapters.forEach((ch) => {
      map[ch.id] = isChapterComplete(subjectId, ch.id);
    });
    setCompletionMap(map);
  }, [subjectId, subject]);

  if (!subject) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-lg text-zinc-500 dark:text-zinc-400">Subject not found.</p>
      </div>
    );
  }

  const phase = getPhaseForSubject(subject);
  const color = subject.colorHex || PHASE_COLORS[phase.number] || "#3b82f6";
  const completedCount = Object.values(completionMap).filter(Boolean).length;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 transition-colors hover:underline text-brand-600 dark:text-brand-400"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        All Subjects
      </Link>

      {/* Subject header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ backgroundColor: `${color}18`, color }}
          >
            Phase {phase.number}: {phase.title}
          </span>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
            Subject {subject.number}
          </span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold mb-3 text-zinc-900 dark:text-zinc-50">
          {subject.title}
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400">{subject.description}</p>
      </div>

      {/* Progress overview */}
      <div className="rounded-xl p-6 mb-10 border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Your Progress</h2>
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {completedCount} of {subject.chapters.length} chapters complete
          </span>
        </div>
        <ProgressBar value={completedCount} max={subject.chapters.length} variant="linear" />
      </div>

      {/* Chapter list */}
      <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">Chapters</h2>
      <div className="space-y-3">
        {subject.chapters.map((chapter, index) => {
          const completed = completionMap[chapter.id] ?? false;

          return (
            <Link
              key={chapter.id}
              href={`/subjects/${subjectId}/chapters/${chapter.id}`}
              className="flex items-center gap-4 p-5 rounded-xl transition-all hover:scale-[1.01] group border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900/50"
            >
              {completed ? (
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-emerald-100 dark:bg-emerald-900/40">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600 dark:text-emerald-400"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                  {index + 1}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold mb-0.5 group-hover:underline text-zinc-900 dark:text-zinc-50">
                  {chapter.title}
                </h3>
                <p className="text-sm truncate text-zinc-500 dark:text-zinc-400">{chapter.subtitle}</p>
              </div>

              <div className="hidden sm:flex items-center gap-4 shrink-0">
                {chapter.sections.length > 0 && (
                  <span className="text-xs flex items-center gap-1 text-zinc-400 dark:text-zinc-500">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                    {chapter.sections.length} section{chapter.sections.length !== 1 ? "s" : ""}
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
