"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  List,
  ChevronUp,
} from "lucide-react";
import {
  getSubject,
  getChapter,
  getNextChapter,
  getPrevChapter,
} from "@/data/curriculum";
import { isChapterComplete, markChapterComplete } from "@/lib/progress";

interface ChapterContentProps {
  subjectId: string;
  chapterId: string;
}

export default function ChapterContent({
  subjectId,
  chapterId,
}: ChapterContentProps) {
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
        <p className="text-lg" style={{ color: "var(--muted)" }}>
          Chapter not found.
        </p>
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
          className="inline-flex items-center gap-1.5 text-sm font-medium mb-4 transition-colors hover:underline"
          style={{ color: "var(--accent)" }}
        >
          <ChevronLeft size={16} />
          {subject.title}
        </Link>
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "var(--foreground)" }}
        >
          {chapter.title}
        </h1>
        <p className="text-lg" style={{ color: "var(--muted)" }}>
          {chapter.subtitle}
        </p>
      </div>

      {/* Section navigation toggle */}
      {chapter.sections.length > 1 && (
        <div className="mb-8">
          <button
            onClick={() => setShowSectionNav(!showSectionNav)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer"
            style={{
              backgroundColor: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              color: "var(--foreground)",
            }}
          >
            <List size={16} />
            In this chapter ({chapter.sections.length} sections)
            {showSectionNav ? (
              <ChevronUp size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </button>

          {showSectionNav && (
            <nav
              className="mt-3 p-4 rounded-lg"
              style={{
                backgroundColor: "var(--card-bg)",
                border: "1px solid var(--card-border)",
              }}
            >
              <ol className="space-y-2">
                {chapter.sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex items-center gap-2 text-sm transition-colors hover:underline"
                      style={{ color: "var(--accent)" }}
                    >
                      <span
                        className="text-xs font-medium w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: "var(--accent-light)",
                          color: "var(--accent)",
                        }}
                      >
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
          <section key={section.id} id={section.id} className="scroll-mt-8">
            <h2
              className="text-2xl font-bold mb-4 pb-2 border-b"
              style={{
                color: "var(--foreground)",
                borderColor: "var(--card-border)",
              }}
            >
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
          <div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium"
            style={{
              backgroundColor: "var(--success-light)",
              color: "var(--success)",
            }}
          >
            <CheckCircle size={20} />
            Chapter Completed
          </div>
        ) : (
          <button
            onClick={handleMarkComplete}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white text-sm font-medium transition-colors cursor-pointer hover:opacity-90"
            style={{ backgroundColor: "var(--success)" }}
          >
            <CheckCircle size={20} />
            Mark as Complete
          </button>
        )}
      </div>

      {/* Previous / Next navigation */}
      <div
        className="flex items-stretch gap-4 pt-8 mt-8 border-t"
        style={{ borderColor: "var(--card-border)" }}
      >
        {prev ? (
          <Link
            href={`/subjects/${prev.subjectId}/chapters/${prev.chapterId}`}
            className="flex-1 flex items-center gap-3 p-4 rounded-xl transition-colors group"
            style={{
              backgroundColor: "var(--card-bg)",
              border: "1px solid var(--card-border)",
            }}
          >
            <ChevronLeft
              size={20}
              className="shrink-0"
              style={{ color: "var(--muted)" }}
            />
            <div className="min-w-0">
              <div
                className="text-xs font-medium mb-1"
                style={{ color: "var(--muted)" }}
              >
                Previous
              </div>
              <div
                className="text-sm font-medium truncate group-hover:underline"
                style={{ color: "var(--foreground)" }}
              >
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
            className="flex-1 flex items-center justify-end gap-3 p-4 rounded-xl transition-colors group text-right"
            style={{
              backgroundColor: "var(--card-bg)",
              border: "1px solid var(--card-border)",
            }}
          >
            <div className="min-w-0">
              <div
                className="text-xs font-medium mb-1"
                style={{ color: "var(--muted)" }}
              >
                Next
              </div>
              <div
                className="text-sm font-medium truncate group-hover:underline"
                style={{ color: "var(--foreground)" }}
              >
                {getChapter(next.subjectId, next.chapterId)?.title}
              </div>
            </div>
            <ChevronRight
              size={20}
              className="shrink-0"
              style={{ color: "var(--muted)" }}
            />
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </div>
  );
}
