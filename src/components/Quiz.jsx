"use client";

import { useState } from "react";

export default function Quiz({ questions }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
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
      <div className="rounded-xl p-8 text-center border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900/50">
        <h3 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">Quiz Complete!</h3>
        <div className={`text-5xl font-bold mb-2 ${percentage >= 70 ? "text-emerald-500" : "text-red-500"}`}>
          {percentage}%
        </div>
        <p className="text-lg mb-6 text-zinc-500 dark:text-zinc-400">
          You got {score} out of {questions.length} correct
        </p>
        {percentage >= 70 ? (
          <p className="mb-6 text-emerald-600 dark:text-emerald-400">Great job! You have a solid understanding of this material.</p>
        ) : (
          <p className="mb-6 text-zinc-500 dark:text-zinc-400">Consider reviewing the chapter content and trying again.</p>
        )}
        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-colors cursor-pointer bg-brand-500 hover:bg-brand-600"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl p-6 border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900/50">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Knowledge Check</h3>
        <span className="text-sm font-medium px-3 py-1 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      <p className="text-base font-medium mb-5 text-zinc-900 dark:text-zinc-50">{current.question}</p>

      <div className="space-y-3 mb-6">
        {current.options.map((option, i) => {
          let classes = "border-gray-200 dark:border-gray-700";
          let bg = "";
          if (isSubmitted && i === current.correctIndex) {
            classes = "border-emerald-500";
            bg = "bg-emerald-50 dark:bg-emerald-900/30";
          } else if (isSubmitted && i === selectedOption && !isCorrect) {
            classes = "border-red-500";
            bg = "bg-red-50 dark:bg-red-900/30";
          } else if (selectedOption === i) {
            classes = "border-brand-500";
            bg = "bg-brand-50 dark:bg-brand-900/30";
          }

          return (
            <label
              key={i}
              className={`flex items-center gap-3 p-4 rounded-lg border transition-colors ${classes} ${bg} ${!isSubmitted ? "cursor-pointer hover:border-brand-400" : ""}`}
            >
              <input
                type="radio"
                name="quiz-option"
                value={i}
                checked={selectedOption === i}
                onChange={() => !isSubmitted && setSelectedOption(i)}
                disabled={isSubmitted}
                className="w-4 h-4 accent-blue-500"
              />
              <span className="text-sm text-zinc-800 dark:text-zinc-200">{option}</span>
              {isSubmitted && i === current.correctIndex && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-auto text-emerald-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              )}
              {isSubmitted && i === selectedOption && !isCorrect && i !== current.correctIndex && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto text-red-500"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
              )}
            </label>
          );
        })}
      </div>

      {isSubmitted && (
        <div
          className={`p-4 rounded-lg mb-6 border-l-4 ${
            isCorrect
              ? "bg-emerald-50 border-emerald-500 dark:bg-emerald-900/30"
              : "bg-red-50 border-red-500 dark:bg-red-900/30"
          }`}
        >
          <p className={`text-sm font-medium mb-1 ${isCorrect ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}>
            {isCorrect ? "Correct!" : "Incorrect"}
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{current.explanation}</p>
        </div>
      )}

      <div className="flex justify-end">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="px-6 py-2.5 rounded-lg text-white font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-brand-500 hover:bg-brand-600"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-colors cursor-pointer bg-brand-500 hover:bg-brand-600"
          >
            {currentIndex < questions.length - 1 ? "Next Question" : "See Results"}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        )}
      </div>
    </div>
  );
}
