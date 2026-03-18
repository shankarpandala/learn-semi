"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Cpu,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Layers,
  Sparkles,
} from "lucide-react";
import {
  phases,
  subjects,
  getSubjectsForPhase,
} from "@/data/curriculum";
import { getOverallProgress, getSubjectProgress } from "@/lib/progress";
import ProgressBar from "@/components/ProgressBar";

const phaseColorMap: Record<string, string> = {
  "phase-1": "var(--phase-1)",
  "phase-2": "var(--phase-2)",
  "phase-3": "var(--phase-3)",
  "phase-4": "var(--phase-4)",
  "phase-5": "var(--phase-5)",
};

const phaseIcons = [BookOpen, Sparkles, Layers, Cpu, GraduationCap];

export default function HomePage() {
  const [overallProgress, setOverallProgress] = useState(0);
  const [phaseProgress, setPhaseProgress] = useState<Record<number, number>>(
    {}
  );

  useEffect(() => {
    const chapterCounts: Record<string, number> = {};
    subjects.forEach((s) => {
      chapterCounts[s.id] = s.chapters.length;
    });
    setOverallProgress(getOverallProgress(chapterCounts));

    const pp: Record<number, number> = {};
    phases.forEach((phase) => {
      const phaseSubjects = getSubjectsForPhase(phase.number);
      let totalChapters = 0;
      let completedChapters = 0;
      phaseSubjects.forEach((s) => {
        totalChapters += s.chapters.length;
        const progress = getSubjectProgress(s.id, s.chapters.length);
        completedChapters += Math.round(
          (progress / 100) * s.chapters.length
        );
      });
      pp[phase.number] =
        totalChapters === 0
          ? 0
          : Math.round((completedChapters / totalChapters) * 100);
    });
    setPhaseProgress(pp);
  }, []);

  const totalChapters = subjects.reduce(
    (sum, s) => sum + s.chapters.length,
    0
  );

  // Find the first incomplete chapter for the CTA
  const firstSubject = subjects[0];
  const firstChapter = firstSubject?.chapters[0];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero section */}
      <div className="text-center mb-16 pt-8">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
          style={{ backgroundColor: "var(--accent-light)" }}
        >
          <Cpu size={32} style={{ color: "var(--accent)" }} />
        </div>
        <h1
          className="text-4xl lg:text-5xl font-bold mb-4 leading-tight"
          style={{ color: "var(--foreground)" }}
        >
          Semiconductor Learning
          <br />
          <span style={{ color: "var(--accent)" }}>
            for Data Scientists & ML Engineers
          </span>
        </h1>
        <p
          className="text-lg max-w-2xl mx-auto mb-8"
          style={{ color: "var(--muted)" }}
        >
          A structured, comprehensive learning path from the physics of
          silicon to applying AI/ML in semiconductor manufacturing. No prior
          hardware knowledge required.
        </p>

        {firstSubject && firstChapter && (
          <Link
            href={`/subjects/${firstSubject.id}/chapters/${firstChapter.id}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold text-lg transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Start Learning
            <ArrowRight size={20} />
          </Link>
        )}
      </div>

      {/* Quick stats */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16"
      >
        <div
          className="text-center p-6 rounded-xl"
          style={{
            backgroundColor: "var(--card-bg)",
            border: "1px solid var(--card-border)",
          }}
        >
          <div
            className="text-3xl font-bold mb-1"
            style={{ color: "var(--accent)" }}
          >
            5
          </div>
          <div className="text-sm font-medium" style={{ color: "var(--muted)" }}>
            Learning Phases
          </div>
        </div>
        <div
          className="text-center p-6 rounded-xl"
          style={{
            backgroundColor: "var(--card-bg)",
            border: "1px solid var(--card-border)",
          }}
        >
          <div
            className="text-3xl font-bold mb-1"
            style={{ color: "var(--accent)" }}
          >
            {subjects.length}
          </div>
          <div className="text-sm font-medium" style={{ color: "var(--muted)" }}>
            Subjects
          </div>
        </div>
        <div
          className="text-center p-6 rounded-xl"
          style={{
            backgroundColor: "var(--card-bg)",
            border: "1px solid var(--card-border)",
          }}
        >
          <div
            className="text-3xl font-bold mb-1"
            style={{ color: "var(--accent)" }}
          >
            ~{totalChapters}
          </div>
          <div className="text-sm font-medium" style={{ color: "var(--muted)" }}>
            Chapters
          </div>
        </div>
      </div>

      {/* Overall progress */}
      <div className="flex justify-center mb-16">
        <ProgressBar
          value={overallProgress}
          max={100}
          label="Overall Progress"
          variant="circular"
        />
      </div>

      {/* Phase cards */}
      <h2
        className="text-2xl font-bold mb-6"
        style={{ color: "var(--foreground)" }}
      >
        Learning Path
      </h2>
      <div className="space-y-4 mb-16">
        {phases.map((phase) => {
          const phaseSubjects = getSubjectsForPhase(phase.number);
          const color = phaseColorMap[phase.color] ?? "var(--accent)";
          const Icon = phaseIcons[phase.number - 1] || BookOpen;
          const progress = phaseProgress[phase.number] ?? 0;

          return (
            <div
              key={phase.number}
              className="rounded-xl p-6 transition-colors"
              style={{
                backgroundColor: "var(--card-bg)",
                border: "1px solid var(--card-border)",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${color}15`, color }}
                >
                  <Icon size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3
                      className="text-lg font-bold"
                      style={{ color: "var(--foreground)" }}
                    >
                      Phase {phase.number}: {phase.title}
                    </h3>
                    <span
                      className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: `${color}15`,
                        color,
                      }}
                    >
                      {phase.audienceLevel}
                    </span>
                  </div>
                  <p
                    className="text-sm mb-4"
                    style={{ color: "var(--muted)" }}
                  >
                    {phase.description}
                  </p>

                  {/* Phase progress bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span style={{ color: "var(--muted)" }}>
                        {phaseSubjects.length} subject
                        {phaseSubjects.length !== 1 ? "s" : ""}
                      </span>
                      <span style={{ color: "var(--muted)" }}>
                        {progress}%
                      </span>
                    </div>
                    <div
                      className="w-full h-2 rounded-full overflow-hidden"
                      style={{
                        backgroundColor: "var(--card-border)",
                      }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${progress}%`,
                          backgroundColor: color,
                        }}
                      />
                    </div>
                  </div>

                  {/* Subject links */}
                  <div className="flex flex-wrap gap-2">
                    {phaseSubjects.map((s) => (
                      <Link
                        key={s.id}
                        href={`/subjects/${s.id}`}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors hover:opacity-80"
                        style={{
                          backgroundColor: "var(--accent-light)",
                          color: "var(--accent)",
                        }}
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
