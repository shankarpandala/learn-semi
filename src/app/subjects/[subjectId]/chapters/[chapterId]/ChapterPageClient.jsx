"use client";

import { getChapter } from "@/data/curriculum";
import ChapterContent from "@/components/ChapterContent";
import Quiz from "@/components/Quiz";

export default function ChapterPageClient({ subjectId, chapterId }) {
  const chapter = getChapter(subjectId, chapterId);

  if (!chapter) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-lg text-zinc-500 dark:text-zinc-400">Chapter not found.</p>
      </div>
    );
  }

  return (
    <div className="pb-16">
      <ChapterContent subjectId={subjectId} chapterId={chapterId} />

      {chapter.quiz.length > 0 && (
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-50">
            Knowledge Check
          </h2>
          <Quiz questions={chapter.quiz} />
        </div>
      )}
    </div>
  );
}
