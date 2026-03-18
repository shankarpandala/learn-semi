export interface Section {
  id: string;
  title: string;
  content: string; // HTML content
}

export interface Quiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Chapter {
  id: string;
  title: string;
  subtitle: string;
  sections: Section[];
  quiz: Quiz[];
}

export interface Subject {
  id: string;
  number: number;
  title: string;
  description: string;
  phase: number;
  chapters: Chapter[];
}

export interface Phase {
  number: number;
  title: string;
  description: string;
  color: string;
  audienceLevel: string;
}

export const phases: Phase[] = [
  {
    number: 1,
    title: "The Big Picture",
    description: "What chips are, why they matter, and the end-to-end journey from sand to smartphone",
    color: "phase-1",
    audienceLevel: "Complete Beginner",
  },
  {
    number: 2,
    title: "Enough Physics",
    description: "Just enough physics to understand the rest — no more, no less",
    color: "phase-2",
    audienceLevel: "Beginner",
  },
  {
    number: 3,
    title: "Manufacturing Deep Dive",
    description: "Each fab process step in detail — depositing, patterning, etching, wiring",
    color: "phase-3",
    audienceLevel: "Intermediate",
  },
  {
    number: 4,
    title: "Semiconductor Equipment",
    description: "How the machines that build chips actually work",
    color: "phase-4",
    audienceLevel: "Intermediate",
  },
  {
    number: 5,
    title: "AI/ML in Semiconductors",
    description: "Where YOUR data science and ML skills apply — this is where it all connects",
    color: "phase-5",
    audienceLevel: "Intermediate–Advanced",
  },
];

// We import content from separate files to keep this manageable
import { subject1 } from "./subjects/subject1";
import { subject2 } from "./subjects/subject2";
import { subject3 } from "./subjects/subject3";
import { subject4 } from "./subjects/subject4";
import { subject5 } from "./subjects/subject5";
import { subject6 } from "./subjects/subject6";
import { subject7 } from "./subjects/subject7";
import { subject8 } from "./subjects/subject8";
import { subject9 } from "./subjects/subject9";
import { subject10 } from "./subjects/subject10";
import { subject11 } from "./subjects/subject11";
import { subject12 } from "./subjects/subject12";
import { subject13 } from "./subjects/subject13";
import { subject14 } from "./subjects/subject14";
import { subject15 } from "./subjects/subject15";
import { subject16 } from "./subjects/subject16";
import { subject17 } from "./subjects/subject17";
import { subject18 } from "./subjects/subject18";

export const subjects: Subject[] = [
  subject1, subject2, subject3, subject4, subject5, subject6,
  subject7, subject8, subject9, subject10, subject11, subject12,
  subject13, subject14, subject15, subject16, subject17, subject18,
];

export function getSubject(id: string): Subject | undefined {
  return subjects.find((s) => s.id === id);
}

export function getChapter(subjectId: string, chapterId: string): Chapter | undefined {
  const subject = getSubject(subjectId);
  return subject?.chapters.find((c) => c.id === chapterId);
}

export function getPhaseForSubject(subject: Subject): Phase {
  return phases[subject.phase - 1];
}

export function getSubjectsForPhase(phaseNumber: number): Subject[] {
  return subjects.filter((s) => s.phase === phaseNumber);
}

export function getNextChapter(subjectId: string, chapterId: string): { subjectId: string; chapterId: string } | null {
  const subject = getSubject(subjectId);
  if (!subject) return null;
  const chapterIndex = subject.chapters.findIndex((c) => c.id === chapterId);
  if (chapterIndex < subject.chapters.length - 1) {
    return { subjectId, chapterId: subject.chapters[chapterIndex + 1].id };
  }
  // Move to next subject
  const subjectIndex = subjects.findIndex((s) => s.id === subjectId);
  if (subjectIndex < subjects.length - 1) {
    const nextSubject = subjects[subjectIndex + 1];
    return { subjectId: nextSubject.id, chapterId: nextSubject.chapters[0].id };
  }
  return null;
}

export function getPrevChapter(subjectId: string, chapterId: string): { subjectId: string; chapterId: string } | null {
  const subject = getSubject(subjectId);
  if (!subject) return null;
  const chapterIndex = subject.chapters.findIndex((c) => c.id === chapterId);
  if (chapterIndex > 0) {
    return { subjectId, chapterId: subject.chapters[chapterIndex - 1].id };
  }
  const subjectIndex = subjects.findIndex((s) => s.id === subjectId);
  if (subjectIndex > 0) {
    const prevSubject = subjects[subjectIndex - 1];
    return { subjectId: prevSubject.id, chapterId: prevSubject.chapters[prevSubject.chapters.length - 1].id };
  }
  return null;
}
