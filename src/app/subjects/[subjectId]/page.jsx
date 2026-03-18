import { subjects } from "@/data/curriculum";
import SubjectPageClient from "./SubjectPageClient";

export function generateStaticParams() {
  return subjects.map((s) => ({ subjectId: s.id }));
}

export default async function SubjectPage({ params }) {
  const { subjectId } = await params;
  return <SubjectPageClient subjectId={subjectId} />;
}
