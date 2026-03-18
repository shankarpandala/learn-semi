const STORAGE_KEY = "learn-semi-progress";

function defaultProgress() {
  return { completedChapters: {} };
}

export function getProgress() {
  if (typeof window === "undefined") return defaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    return JSON.parse(raw);
  } catch {
    return defaultProgress();
  }
}

function saveProgress(progress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function markChapterComplete(subjectId, chapterId) {
  const progress = getProgress();
  if (!progress.completedChapters[subjectId]) {
    progress.completedChapters[subjectId] = [];
  }
  if (!progress.completedChapters[subjectId].includes(chapterId)) {
    progress.completedChapters[subjectId].push(chapterId);
  }
  saveProgress(progress);
}

export function isChapterComplete(subjectId, chapterId) {
  const progress = getProgress();
  return progress.completedChapters[subjectId]?.includes(chapterId) ?? false;
}

export function getSubjectProgress(subjectId, totalChapters) {
  const progress = getProgress();
  const completed = progress.completedChapters[subjectId]?.length ?? 0;
  if (totalChapters === 0) return 0;
  return Math.round((completed / totalChapters) * 100);
}

export function getOverallProgress(subjectChapterCounts) {
  const progress = getProgress();
  let totalChapters = 0;
  let completedChapters = 0;
  for (const [subjectId, count] of Object.entries(subjectChapterCounts)) {
    totalChapters += count;
    completedChapters += progress.completedChapters[subjectId]?.length ?? 0;
  }
  if (totalChapters === 0) return 0;
  return Math.round((completedChapters / totalChapters) * 100);
}
