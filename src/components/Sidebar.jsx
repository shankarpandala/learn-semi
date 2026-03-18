"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { phases, subjects, getSubjectsForPhase } from "@/data/curriculum";
import { getProgress } from "@/lib/progress";
import { useEffect } from "react";

const PHASE_COLORS = {
  1: "#3b82f6",
  2: "#8b5cf6",
  3: "#f59e0b",
  4: "#ef4444",
  5: "#10b981",
};

function ChevronIcon({ open }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-200 ${open ? "rotate-90" : "rotate-0"}`}
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-emerald-500 dark:text-emerald-400 shrink-0"
      aria-label="Completed"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ChapterLink({ chapter, subject, isActive, isDone, onClose }) {
  return (
    <Link
      href={`/subjects/${subject.id}/chapters/${chapter.id}`}
      onClick={onClose}
      className={`group flex items-center gap-2 rounded-md py-1.5 pl-8 pr-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
        isActive
          ? "bg-indigo-50 font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/60 dark:hover:text-gray-200"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      <span className="flex-1 leading-snug truncate">{chapter.title}</span>
      {isDone && <CheckIcon />}
    </Link>
  );
}

function SubjectRow({ subject, activePathname, progress, onClose }) {
  const isSubjectActive = activePathname.includes(`/subjects/${subject.id}`);
  const [open, setOpen] = useState(isSubjectActive);
  const color = PHASE_COLORS[subject.phase] || "#3b82f6";

  const completedCount = progress.completedChapters[subject.id]?.length || 0;
  const total = subject.chapters.length;

  return (
    <div className="border-b border-gray-100 dark:border-gray-800/60 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm font-semibold transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
          isSubjectActive
            ? "text-gray-900 dark:text-gray-50"
            : "text-gray-700 dark:text-gray-300"
        }`}
        aria-expanded={open}
      >
        <span
          className="h-3 w-3 rounded-full shrink-0"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />
        <span className="flex-1 truncate leading-snug">{subject.title}</span>
        {completedCount > 0 && (
          <span className="ml-auto text-xs tabular-nums text-gray-400 dark:text-gray-500 mr-1">
            {completedCount}/{total}
          </span>
        )}
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="pb-2">
          {subject.chapters.map((chapter) => {
            const isActive = activePathname.includes(`/chapters/${chapter.id}`);
            const isDone = progress.completedChapters[subject.id]?.includes(chapter.id) ?? false;
            return (
              <ChapterLink
                key={chapter.id}
                chapter={chapter}
                subject={subject}
                isActive={isActive}
                isDone={isDone}
                onClose={onClose}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const [progress, setProgress] = useState({ completedChapters: {} });

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const sidebarContent = (
    <aside
      className="sidebar flex h-full flex-col bg-white dark:bg-gray-950"
      aria-label="Site navigation"
    >
      {/* Header */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-800">
        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Curriculum
        </span>
        <button
          type="button"
          onClick={onClose}
          className="lg:hidden rounded-md p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          aria-label="Close sidebar"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Subject list */}
      <nav className="flex-1 overflow-y-auto" aria-label="Curriculum subjects">
        {subjects.map((subject) => (
          <SubjectRow
            key={subject.id}
            subject={subject}
            activePathname={pathname}
            progress={progress}
            onClose={onClose}
          />
        ))}
      </nav>
    </aside>
  );

  return (
    <>
      {/* Desktop: fixed sidebar */}
      <div className="hidden lg:block fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-[280px] overflow-hidden border-r border-gray-200 dark:border-gray-800 z-40">
        {sidebarContent}
      </div>

      {/* Mobile: drawer overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
          {/* Drawer */}
          <div className="fixed top-0 left-0 z-50 h-full w-[280px] shadow-2xl lg:hidden">
            {sidebarContent}
          </div>
        </>
      )}
    </>
  );
}
