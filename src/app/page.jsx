"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { phases, subjects, getSubjectsForPhase } from "@/data/curriculum";
import { getOverallProgress, getSubjectProgress } from "@/lib/progress";
import ProgressBar from "@/components/ProgressBar";

const PHASE_COLORS = {
  1: "#3b82f6",
  2: "#8b5cf6",
  3: "#f59e0b",
  4: "#ef4444",
  5: "#10b981",
};

const PHASE_ICONS = {
  1: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
  ),
  2: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
  ),
  3: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 12h.01"/><path d="M17 12h.01"/><path d="M7 12h.01"/></svg>
  ),
  4: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>
  ),
  5: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
  ),
};

export default function HomePage() {
  const [overallProgress, setOverallProgress] = useState(0);
  const [phaseProgress, setPhaseProgress] = useState({});

  useEffect(() => {
    const chapterCounts = {};
    subjects.forEach((s) => {
      chapterCounts[s.id] = s.chapters.length;
    });
    setOverallProgress(getOverallProgress(chapterCounts));

    const pp = {};
    phases.forEach((phase) => {
      const phaseSubjects = getSubjectsForPhase(phase.number);
      let totalChapters = 0;
      let completedChapters = 0;
      phaseSubjects.forEach((s) => {
        totalChapters += s.chapters.length;
        const progress = getSubjectProgress(s.id, s.chapters.length);
        completedChapters += Math.round((progress / 100) * s.chapters.length);
      });
      pp[phase.number] = totalChapters === 0 ? 0 : Math.round((completedChapters / totalChapters) * 100);
    });
    setPhaseProgress(pp);
  }, []);

  const totalChapters = subjects.reduce((sum, s) => sum + s.chapters.length, 0);
  const firstSubject = subjects[0];
  const firstChapter = firstSubject?.chapters[0];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero section */}
      <div className="text-center mb-16 pt-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-brand-100 dark:bg-brand-900/40">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600 dark:text-brand-400">
            <rect x="4" y="4" width="16" height="16" rx="2"/>
            <rect x="9" y="9" width="6" height="6"/>
            <path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/>
            <path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>
          </svg>
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight text-zinc-900 dark:text-zinc-50">
          Semiconductor Learning
          <br />
          <span className="bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent">
            for Data Scientists & ML Engineers
          </span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-8 text-zinc-500 dark:text-zinc-400">
          A structured, comprehensive learning path from the physics of
          silicon to applying AI/ML in semiconductor manufacturing. No prior
          hardware knowledge required.
        </p>

        {firstSubject && firstChapter && (
          <Link
            href={`/subjects/${firstSubject.id}/chapters/${firstChapter.id}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold text-lg transition-all hover:opacity-90 hover:scale-[1.02] bg-brand-500 hover:bg-brand-600"
          >
            Start Learning
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        )}
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
        {[
          { value: "5", label: "Learning Phases" },
          { value: subjects.length, label: "Subjects" },
          { value: `~${totalChapters}`, label: "Chapters" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="text-center p-6 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900/50"
          >
            <div className="text-3xl font-bold mb-1 text-brand-500">{stat.value}</div>
            <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Overall progress */}
      <div className="flex justify-center mb-16">
        <ProgressBar value={overallProgress} max={100} label="Overall Progress" variant="circular" />
      </div>

      {/* Phase cards */}
      <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-50">
        Learning Path
      </h2>
      <div className="space-y-4 mb-16">
        {phases.map((phase) => {
          const phaseSubjects = getSubjectsForPhase(phase.number);
          const color = PHASE_COLORS[phase.number] || "#3b82f6";
          const icon = PHASE_ICONS[phase.number];
          const progress = phaseProgress[phase.number] ?? 0;

          return (
            <div
              key={phase.number}
              className="rounded-xl p-6 transition-colors border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900/50"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${color}18`, color }}
                >
                  {icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                      Phase {phase.number}: {phase.title}
                    </h3>
                    <span
                      className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: `${color}18`, color }}
                    >
                      {phase.audienceLevel}
                    </span>
                  </div>
                  <p className="text-sm mb-4 text-zinc-500 dark:text-zinc-400">
                    {phase.description}
                  </p>

                  {/* Phase progress bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-zinc-500 dark:text-zinc-400">
                        {phaseSubjects.length} subject{phaseSubjects.length !== 1 ? "s" : ""}
                      </span>
                      <span className="text-zinc-500 dark:text-zinc-400">{progress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${progress}%`, backgroundColor: color }}
                      />
                    </div>
                  </div>

                  {/* Subject links */}
                  <div className="flex flex-wrap gap-2">
                    {phaseSubjects.map((s) => (
                      <Link
                        key={s.id}
                        href={`/subjects/${s.id}`}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors hover:opacity-80 bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300"
                      >
                        {s.number}. {s.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
