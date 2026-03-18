export const phases = [
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

// Enrich subjects with display metadata (icon, color, difficulty, estimatedHours)
const SUBJECT_META = [
  { icon: 'Si', colorHex: '#6366f1', difficulty: 'beginner', estimatedHours: 8, shortName: 'Semiconductors' },
  { icon: '⛏', colorHex: '#8b5cf6', difficulty: 'beginner', estimatedHours: 10, shortName: 'Chip-Making' },
  { icon: '🌐', colorHex: '#a855f7', difficulty: 'beginner', estimatedHours: 8, shortName: 'Ecosystem' },
  { icon: '⚛', colorHex: '#3b82f6', difficulty: 'beginner', estimatedHours: 12, shortName: 'Crystal' },
  { icon: 'Eg', colorHex: '#2563eb', difficulty: 'intermediate', estimatedHours: 14, shortName: 'Band Theory' },
  { icon: 'PN', colorHex: '#0ea5e9', difficulty: 'intermediate', estimatedHours: 15, shortName: 'PN Junctions' },
  { icon: '◇', colorHex: '#f59e0b', difficulty: 'intermediate', estimatedHours: 12, shortName: 'Deposition' },
  { icon: 'λ', colorHex: '#eab308', difficulty: 'intermediate', estimatedHours: 14, shortName: 'Lithography' },
  { icon: '⚡', colorHex: '#f97316', difficulty: 'intermediate', estimatedHours: 12, shortName: 'Etching' },
  { icon: 'Cu', colorHex: '#d97706', difficulty: 'intermediate', estimatedHours: 10, shortName: 'Metallization' },
  { icon: '🔧', colorHex: '#ef4444', difficulty: 'intermediate', estimatedHours: 12, shortName: 'Depo Equip' },
  { icon: '🔬', colorHex: '#dc2626', difficulty: 'intermediate', estimatedHours: 14, shortName: 'Litho Equip' },
  { icon: '🧪', colorHex: '#e11d48', difficulty: 'intermediate', estimatedHours: 12, shortName: 'Etch Equip' },
  { icon: '📐', colorHex: '#be123c', difficulty: 'intermediate', estimatedHours: 12, shortName: 'Metrology' },
  { icon: 'VM', colorHex: '#10b981', difficulty: 'advanced', estimatedHours: 16, shortName: 'Virtual Metro' },
  { icon: 'PM', colorHex: '#059669', difficulty: 'advanced', estimatedHours: 14, shortName: 'Predictive' },
  { icon: 'DD', colorHex: '#14b8a6', difficulty: 'advanced', estimatedHours: 14, shortName: 'Defect AI' },
  { icon: 'YO', colorHex: '#0d9488', difficulty: 'advanced', estimatedHours: 16, shortName: 'Yield AI' },
];

const rawSubjects = [
  subject1, subject2, subject3, subject4, subject5, subject6,
  subject7, subject8, subject9, subject10, subject11, subject12,
  subject13, subject14, subject15, subject16, subject17, subject18,
];

export const subjects = rawSubjects.map((s, i) => ({
  ...s,
  ...SUBJECT_META[i],
}));

export function getSubjectSectionCount(subjectId) {
  const subject = subjects.find((s) => s.id === subjectId);
  if (!subject) return 0;
  return subject.chapters.reduce((acc, ch) => acc + ch.sections.length, 0);
}

export function getSubject(id) {
  return subjects.find((s) => s.id === id);
}

export function getChapter(subjectId, chapterId) {
  const subject = getSubject(subjectId);
  return subject?.chapters.find((c) => c.id === chapterId);
}

export function getPhaseForSubject(subject) {
  return phases[subject.phase - 1];
}

export function getSubjectsForPhase(phaseNumber) {
  return subjects.filter((s) => s.phase === phaseNumber);
}

export function getNextChapter(subjectId, chapterId) {
  const subject = getSubject(subjectId);
  if (!subject) return null;
  const chapterIndex = subject.chapters.findIndex((c) => c.id === chapterId);
  if (chapterIndex < subject.chapters.length - 1) {
    return { subjectId, chapterId: subject.chapters[chapterIndex + 1].id };
  }
  const subjectIndex = subjects.findIndex((s) => s.id === subjectId);
  if (subjectIndex < subjects.length - 1) {
    const nextSubject = subjects[subjectIndex + 1];
    return { subjectId: nextSubject.id, chapterId: nextSubject.chapters[0].id };
  }
  return null;
}

export function getPrevChapter(subjectId, chapterId) {
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
