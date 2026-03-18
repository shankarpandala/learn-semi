import { subjects } from "@/data/curriculum";
import ChapterPageClient from "./ChapterPageClient";

export function generateStaticParams() {
  const params = [];
  subjects.forEach((subject) => {
    subject.chapters.forEach((chapter) => {
      params.push({ subjectId: subject.id, chapterId: chapter.id });
    });
  });
  return params;
}

export default async function ChapterPage({ params }) {
  const { subjectId, chapterId } = await params;
  return <ChapterPageClient subjectId={subjectId} chapterId={chapterId} />;
}
