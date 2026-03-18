"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Menu,
  X,
  BookOpen,
  Home,
} from "lucide-react";
import { phases, subjects, getSubjectsForPhase } from "@/data/curriculum";
import { getProgress, type Progress } from "@/lib/progress";

const phaseColorMap: Record<string, string> = {
  "phase-1": "var(--phase-1)",
  "phase-2": "var(--phase-2)",
  "phase-3": "var(--phase-3)",
  "phase-4": "var(--phase-4)",
  "phase-5": "var(--phase-5)",
};

interface SidebarProps {
  currentSubjectId?: string;
  currentChapterId?: string;
}

export default function Sidebar({ currentSubjectId, currentChapterId }: SidebarProps) {
  const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set());
  const [expandedSubjects, setExpandedSubjects] = useState<Set<string>>(new Set());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progress, setProgress] = useState<Progress>({ completedChapters: {} });

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  // Auto-expand the phase/subject containing the current chapter
  useEffect(() => {
    if (currentSubjectId) {
      const subject = subjects.find((s) => s.id === currentSubjectId);
      if (subject) {
        setExpandedPhases((prev) => new Set(prev).add(subject.phase));
        setExpandedSubjects((prev) => new Set(prev).add(subject.id));
      }
    }
  }, [currentSubjectId]);

  function togglePhase(num: number) {
    setExpandedPhases((prev) => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
  }

  function toggleSubject(id: string) {
    setExpandedSubjects((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const isCompleted = (subjectId: string, chapterId: string) =>
    progress.completedChapters[subjectId]?.includes(chapterId) ?? false;

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-5 border-b" style={{ borderColor: "var(--sidebar-border)" }}>
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
          <BookOpen size={24} style={{ color: "var(--accent)" }} />
          <span className="text-lg font-bold" style={{ color: "var(--foreground)" }}>
            LearnSemi
          </span>
        </Link>
      </div>

      {/* Home link */}
      <Link
        href="/"
        className="flex items-center gap-2.5 px-5 py-3 text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5"
        style={{ color: "var(--muted)" }}
        onClick={() => setMobileOpen(false)}
      >
        <Home size={16} />
        Home
      </Link>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 pb-6">
        {phases.map((phase) => {
          const phaseSubjects = getSubjectsForPhase(phase.number);
          const isExpanded = expandedPhases.has(phase.number);
          const color = phaseColorMap[phase.color] ?? "var(--accent)";

          return (
            <div key={phase.number} className="mt-2">
              {/* Phase header */}
              <button
                onClick={() => togglePhase(phase.number)}
                className="w-full flex items-center gap-2 px-2 py-2.5 rounded-lg text-left text-sm font-semibold transition-colors hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                style={{ color }}
              >
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                <span>
                  Phase {phase.number}: {phase.title}
                </span>
              </button>

              {/* Subjects */}
              {isExpanded && (
                <div className="ml-2">
                  {phaseSubjects.map((subject) => {
                    const isSubjectExpanded = expandedSubjects.has(subject.id);
                    const completedCount =
                      progress.completedChapters[subject.id]?.length ?? 0;
                    const totalCount = subject.chapters.length;

                    return (
                      <div key={subject.id} className="mt-0.5">
                        {/* Subject header */}
                        <button
                          onClick={() => toggleSubject(subject.id)}
                          className="w-full flex items-center gap-2 px-2 py-2 rounded-md text-left text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                          style={{ color: "var(--foreground)" }}
                        >
                          {isSubjectExpanded ? (
                            <ChevronDown size={14} />
                          ) : (
                            <ChevronRight size={14} />
                          )}
                          <span className="flex-1 font-medium truncate">
                            {subject.number}. {subject.title}
                          </span>
                          {totalCount > 0 && (
                            <span
                              className="text-xs px-1.5 py-0.5 rounded-full"
                              style={{
                                backgroundColor:
                                  completedCount === totalCount
                                    ? "var(--success-light)"
                                    : "var(--accent-light)",
                                color:
                                  completedCount === totalCount
                                    ? "var(--success)"
                                    : "var(--muted)",
                              }}
                            >
                              {completedCount}/{totalCount}
                            </span>
                          )}
                        </button>

                        {/* Chapters */}
                        {isSubjectExpanded && (
                          <div className="ml-5 border-l-2 pl-3" style={{ borderColor: color }}>
                            {subject.chapters.map((chapter) => {
                              const isCurrent =
                                currentSubjectId === subject.id &&
                                currentChapterId === chapter.id;
                              const completed = isCompleted(subject.id, chapter.id);

                              return (
                                <Link
                                  key={chapter.id}
                                  href={`/subjects/${subject.id}/chapters/${chapter.id}`}
                                  onClick={() => setMobileOpen(false)}
                                  className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors ${
                                    isCurrent
                                      ? "font-medium"
                                      : "hover:bg-black/5 dark:hover:bg-white/5"
                                  }`}
                                  style={{
                                    color: isCurrent ? "var(--accent)" : "var(--muted)",
                                    backgroundColor: isCurrent
                                      ? "var(--accent-light)"
                                      : "transparent",
                                  }}
                                >
                                  {completed ? (
                                    <CheckCircle
                                      size={14}
                                      className="shrink-0"
                                      style={{ color: "var(--success)" }}
                                    />
                                  ) : (
                                    <span
                                      className="w-3.5 h-3.5 rounded-full border-2 shrink-0"
                                      style={{ borderColor: "var(--card-border)" }}
                                    />
                                  )}
                                  <span className="truncate">{chapter.title}</span>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg lg:hidden cursor-pointer"
        style={{
          backgroundColor: "var(--card-bg)",
          border: "1px solid var(--card-border)",
        }}
        aria-label="Open menu"
      >
        <Menu size={20} style={{ color: "var(--foreground)" }} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="absolute left-0 top-0 bottom-0 w-80 overflow-y-auto"
            style={{ backgroundColor: "var(--sidebar-bg)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-1 cursor-pointer"
              aria-label="Close menu"
            >
              <X size={20} style={{ color: "var(--muted)" }} />
            </button>
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside
        className="hidden lg:block fixed left-0 top-0 bottom-0 w-72 overflow-y-auto border-r"
        style={{
          backgroundColor: "var(--sidebar-bg)",
          borderColor: "var(--sidebar-border)",
        }}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
