"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { phases, subjects, getSubjectsForPhase, getSubjectSectionCount } from "@/data/curriculum";
import { getProgress } from "@/lib/progress";
import SubjectCard from "@/components/SubjectCard";

const PHASE_COLORS = {
  1: "#3b82f6",
  2: "#8b5cf6",
  3: "#f59e0b",
  4: "#ef4444",
  5: "#10b981",
};

const LEARNING_PATH = [
  {
    step: 1,
    title: "The Big Picture",
    subjects: ["What Is a Semiconductor?", "The Chip-Making Journey", "The Semiconductor Ecosystem"],
    color: "#6366f1",
  },
  {
    step: 2,
    title: "Enough Physics",
    subjects: ["Atomic Structure & Crystal Lattices", "Band Theory & Electrical Properties", "PN Junctions & Transistors"],
    color: "#10b981",
  },
  {
    step: 3,
    title: "Manufacturing",
    subjects: ["Thin Film Deposition", "Photolithography", "Etching & Ion Implantation", "Metallization"],
    color: "#f97316",
  },
  {
    step: 4,
    title: "Equipment",
    subjects: ["Deposition Equipment", "Lithography Equipment", "Etch & Clean Equipment", "Metrology Equipment"],
    color: "#ef4444",
  },
  {
    step: 5,
    title: "AI/ML in Semicon",
    subjects: ["Virtual Metrology", "Predictive Maintenance", "Defect Detection", "Yield Optimization"],
    color: "#a855f7",
  },
];

export default function HomePage() {
  const [sectionProgress, setSectionProgress] = useState({});

  useEffect(() => {
    const progress = getProgress();
    const sp = {};
    subjects.forEach((s) => {
      const completed = progress.completedChapters[s.id]?.length || 0;
      // Use chapter completion as proxy for section completion
      sp[s.id] = { completed, total: getSubjectSectionCount(s.id) };
    });
    setSectionProgress(sp);
  }, []);

  const totalChapters = subjects.reduce((sum, s) => sum + s.chapters.length, 0);
  const totalSections = subjects.reduce((sum, s) => sum + getSubjectSectionCount(s.id), 0);

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 px-6 py-20 md:py-28 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950/20 -mx-6 -mt-8 lg:-mx-12 lg:-mt-12">
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
            Semiconductor Learning for{" "}
            <span className="bg-gradient-to-r from-blue-500 via-violet-500 to-purple-600 bg-clip-text text-transparent">
              Data Scientists
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            A comprehensive, structured learning path from the physics of silicon
            to applying AI/ML in semiconductor manufacturing. No prior hardware
            knowledge required.
          </p>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
            {[
              { value: "18", label: "Subjects" },
              { value: `${totalChapters}+`, label: "Chapters" },
              { value: `${totalSections}+`, label: "Sections" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/80 px-4 py-1.5 backdrop-blur dark:border-gray-700 dark:bg-gray-800/60"
              >
                <span className="text-base font-bold text-indigo-600 dark:text-indigo-400">
                  {value}
                </span>
                <span>{label}</span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#subjects"
              className="rounded-xl bg-indigo-600 px-7 py-3 text-base font-semibold text-white shadow-md transition-all hover:bg-indigo-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              Start Learning →
            </a>
          </div>
        </div>
      </section>

      {/* ── Recommended Learning Path ── */}
      <section className="bg-gray-50 px-6 py-16 dark:bg-gray-900/50 -mx-6 lg:-mx-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              Recommended Learning Path
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400">
              Follow this order to build a solid foundation progressively.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {LEARNING_PATH.map((phase) => (
              <div
                key={phase.step}
                className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
              >
                <div
                  className="mb-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: phase.color }}
                >
                  {phase.step}
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
                  {phase.title}
                </h3>
                <ul className="space-y-1">
                  {phase.subjects.map((s) => (
                    <li key={s} className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                      <span
                        className="h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: phase.color }}
                        aria-hidden="true"
                      />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── All Subjects Grid ── */}
      <section id="subjects" className="px-6 py-16 -mx-6 lg:-mx-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              All Subjects
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400">
              {subjects.length} subjects covering semiconductor technology from fundamentals to AI/ML applications.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => {
              const sp = sectionProgress[subject.id] || { completed: 0, total: 0 };
              return (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  completedCount={sp.completed}
                  totalCount={sp.total}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="bg-gray-50 px-6 py-16 dark:bg-gray-900/50 -mx-6 lg:-mx-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Built for Data Scientists
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Every chapter is written with clarity — bridging physics and engineering concepts
            to data science language you already know. Analogies to ML concepts, real-world
            industry examples, and knowledge-check quizzes make abstract semiconductor topics
            concrete and memorable. Whether you are entering the semiconductor industry or
            building AI solutions for chip manufacturing, this resource meets you where you are.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              "No Prerequisites",
              "Industry Examples",
              "ML Analogies",
              "Knowledge Quizzes",
              "Progress Tracking",
              "18 Subjects",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:border-indigo-800/60 dark:bg-indigo-900/20 dark:text-indigo-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
