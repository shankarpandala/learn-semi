"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getSubject,
  getChapter,
  getNextChapter,
  getPrevChapter,
} from "@/data/curriculum";
import { isChapterComplete, markChapterComplete } from "@/lib/progress";

export default function ChapterContent({ subjectId, chapterId }) {
  const [completed, setCompleted] = useState(false);
  const [showSectionNav, setShowSectionNav] = useState(false);

  const subject = getSubject(subjectId);
  const chapter = getChapter(subjectId, chapterId);
  const next = getNextChapter(subjectId, chapterId);
  const prev = getPrevChapter(subjectId, chapterId);

  useEffect(() => {
    setCompleted(isChapterComplete(subjectId, chapterId));
  }, [subjectId, chapterId]);

  if (!subject || !chapter) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-lg text-zinc-500 dark:text-zinc-400">Chapter not found.</p>
      </div>
    );
  }

  function handleMarkComplete() {
    markChapterComplete(subjectId, chapterId);
    setCompleted(true);
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Chapter header */}
      <div className="mb-8">
        <Link
          href={`/subjects/${subjectId}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium mb-4 transition-colors hover:underline text-brand-600 dark:text-brand-400"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          {subject.title}
        </Link>
        <h1 className="text-3xl font-bold mb-2 text-zinc-900 dark:text-zinc-50">
          {chapter.title}
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400">{chapter.subtitle}</p>
      </div>

      {/* Section navigation toggle */}
      {chapter.sections.length > 1 && (
        <div className="mb-8">
          <button
            onClick={() => setShowSectionNav(!showSectionNav)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer border border-gray-200 bg-white text-zinc-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-zinc-100 dark:hover:bg-gray-800"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            In this chapter ({chapter.sections.length} sections)
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${showSectionNav ? "rotate-90" : ""}`}><polyline points="9 18 15 12 9 6"/></svg>
          </button>

          {showSectionNav && (
            <nav className="mt-3 p-4 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
              <ol className="space-y-2">
                {chapter.sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex items-center gap-2 text-sm transition-colors hover:underline text-brand-600 dark:text-brand-400"
                    >
                      <span className="text-xs font-medium w-6 h-6 rounded-full flex items-center justify-center shrink-0 bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                        {index + 1}
                      </span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
        </div>
      )}

      {/* Section content */}
      <div className="space-y-12">
        {chapter.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-zinc-900 dark:text-zinc-50">
              {section.title}
            </h2>
            <div
              className="content-prose"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </section>
        ))}
      </div>

      {/* Mark complete button */}
      <div className="mt-12 mb-8 flex justify-center">
        {completed ? (
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            Chapter Completed
          </div>
        ) : (
          <button
            onClick={handleMarkComplete}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white text-sm font-medium transition-colors cursor-pointer hover:opacity-90 bg-emerald-600 hover:bg-emerald-700"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            Mark as Complete
          </button>
        )}
      </div>

      {/* Previous / Next navigation */}
      <div className="flex items-stretch gap-4 pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
        {prev ? (
          <Link
            href={`/subjects/${prev.subjectId}/chapters/${prev.chapterId}`}
            className="flex-1 flex items-center gap-3 p-4 rounded-xl transition-colors group border border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-zinc-400"><path d="m15 18-6-6 6-6"/></svg>
            <div className="min-w-0">
              <div className="text-xs font-medium mb-1 text-zinc-500 dark:text-zinc-400">Previous</div>
              <div className="text-sm font-medium truncate group-hover:underline text-zinc-900 dark:text-zinc-100">
                {getChapter(prev.subjectId, prev.chapterId)?.title}
              </div>
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {next ? (
          <Link
            href={`/subjects/${next.subjectId}/chapters/${next.chapterId}`}
            className="flex-1 flex items-center justify-end gap-3 p-4 rounded-xl transition-colors group text-right border border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
          >
            <div className="min-w-0">
              <div className="text-xs font-medium mb-1 text-zinc-500 dark:text-zinc-400">Next</div>
              <div className="text-sm font-medium truncate group-hover:underline text-zinc-900 dark:text-zinc-100">
                {getChapter(next.subjectId, next.chapterId)?.title}
              </div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-zinc-400"><path d="m9 18 6-6-6-6"/></svg>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </div>
  );
}
