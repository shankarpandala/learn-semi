"use client";

import { getChapter } from "@/data/curriculum";
import ChapterContent from "@/components/ChapterContent";
import Quiz from "@/components/Quiz";

interface ChapterPageClientProps {
  subjectId: string;
  chapterId: string;
}

export default function ChapterPageClient({ subjectId, chapterId }: ChapterPageClientProps) {
  const chapter = getChapter(subjectId, chapterId);

  if (!chapter) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-lg" style={{ color: "var(--muted)" }}>
          Chapter not found.
        </p>
      </div>
    );
  }

  return (
    <div className="pb-16">
      <ChapterContent subjectId={subjectId} chapterId={chapterId} />

      {/* Quiz section */}
      {chapter.quiz.length > 0 && (
        <div className="max-w-4xl mx-auto mt-16">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: "var(--foreground)" }}
          >
            Knowledge Check
          </h2>
          <Quiz questions={chapter.quiz} />
        </div>
      )}
    </div>
  );
}
