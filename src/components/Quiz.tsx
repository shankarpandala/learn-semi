"use client";

import { useState } from "react";
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from "lucide-react";
import type { Quiz as QuizType } from "@/data/curriculum";

interface QuizProps {
  questions: QuizType[];
}

export default function Quiz({ questions }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (questions.length === 0) return null;

  const current = questions[currentIndex];
  const isCorrect = selectedOption === current.correctIndex;

  function handleSubmit() {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === current.correctIndex) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setIsFinished(true);
    }
  }

  function handleRestart() {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setIsFinished(false);
  }

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div
        className="rounded-xl p-8 text-center"
        style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--card-border)" }}
      >
        <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>
          Quiz Complete!
        </h3>
        <div className="text-5xl font-bold mb-2" style={{ color: percentage >= 70 ? "var(--success)" : "var(--phase-4)" }}>
          {percentage}%
        </div>
        <p className="text-lg mb-6" style={{ color: "var(--muted)" }}>
          You got {score} out of {questions.length} correct
        </p>
        {percentage >= 70 ? (
          <p className="mb-6" style={{ color: "var(--success)" }}>
            Great job! You have a solid understanding of this material.
          </p>
        ) : (
          <p className="mb-6" style={{ color: "var(--muted)" }}>
            Consider reviewing the chapter content and trying again.
          </p>
        )}
        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-colors cursor-pointer"
          style={{ backgroundColor: "var(--accent)" }}
        >
          <RotateCcw size={18} />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl p-6"
      style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--card-border)" }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
          Knowledge Check
        </h3>
        <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ backgroundColor: "var(--accent-light)", color: "var(--accent)" }}>
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      <p className="text-base font-medium mb-5" style={{ color: "var(--foreground)" }}>
        {current.question}
      </p>

      <div className="space-y-3 mb-6">
        {current.options.map((option, i) => {
          let borderColor = "var(--card-border)";
          let bgColor = "transparent";
          if (isSubmitted && i === current.correctIndex) {
            borderColor = "var(--success)";
            bgColor = "var(--success-light)";
          } else if (isSubmitted && i === selectedOption && !isCorrect) {
            borderColor = "var(--phase-4)";
            bgColor = "#fef2f2";
          } else if (selectedOption === i) {
            borderColor = "var(--accent)";
            bgColor = "var(--accent-light)";
          }

          return (
            <label
              key={i}
              className={`flex items-center gap-3 p-4 rounded-lg border transition-colors ${
                !isSubmitted ? "cursor-pointer hover:border-[var(--accent)]" : ""
              }`}
              style={{ borderColor, backgroundColor: bgColor }}
            >
              <input
                type="radio"
                name="quiz-option"
                value={i}
                checked={selectedOption === i}
                onChange={() => !isSubmitted && setSelectedOption(i)}
                disabled={isSubmitted}
                className="w-4 h-4 accent-[var(--accent)]"
              />
              <span className="text-sm" style={{ color: "var(--foreground)" }}>
                {option}
              </span>
              {isSubmitted && i === current.correctIndex && (
                <CheckCircle size={18} className="ml-auto text-green-500" />
              )}
              {isSubmitted && i === selectedOption && !isCorrect && i !== current.correctIndex && (
                <XCircle size={18} className="ml-auto text-red-500" />
              )}
            </label>
          );
        })}
      </div>

      {isSubmitted && (
        <div
          className="p-4 rounded-lg mb-6"
          style={{
            backgroundColor: isCorrect ? "var(--success-light)" : "#fef2f2",
            borderLeft: `4px solid ${isCorrect ? "var(--success)" : "var(--phase-4)"}`,
          }}
        >
          <p className="text-sm font-medium mb-1" style={{ color: isCorrect ? "var(--success)" : "var(--phase-4)" }}>
            {isCorrect ? "Correct!" : "Incorrect"}
          </p>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            {current.explanation}
          </p>
        </div>
      )}

      <div className="flex justify-end">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="px-6 py-2.5 rounded-lg text-white font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-colors cursor-pointer"
            style={{ backgroundColor: "var(--accent)" }}
          >
            {currentIndex < questions.length - 1 ? "Next Question" : "See Results"}
            <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
