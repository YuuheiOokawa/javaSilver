const Storage = (() => {
  const KEYS = {
    history: "jsilver_history",
    wrong: "jsilver_wrong",
    progress: "jsilver_progress"
  };

  function getHistory() {
    try { return JSON.parse(localStorage.getItem(KEYS.history)) || {}; }
    catch { return {}; }
  }

  function saveResult(questionId, correct) {
    const history = getHistory();
    if (!history[questionId]) history[questionId] = { attempts: 0, correct: 0 };
    history[questionId].attempts++;
    if (correct) history[questionId].correct++;
    localStorage.setItem(KEYS.history, JSON.stringify(history));

    // 間違えた問題を保存/削除
    const wrong = getWrong();
    if (!correct) {
      wrong[questionId] = true;
    } else {
      delete wrong[questionId];
    }
    localStorage.setItem(KEYS.wrong, JSON.stringify(wrong));
  }

  function getWrong() {
    try { return JSON.parse(localStorage.getItem(KEYS.wrong)) || {}; }
    catch { return {}; }
  }

  function getWrongIds() {
    return Object.keys(getWrong()).map(Number);
  }

  function getProgress() {
    const history = getHistory();
    const total = QUESTIONS.length;
    const tried = Object.keys(history).length;
    const correct = Object.values(history).filter(h => h.correct > 0).length;
    return { total, tried, correct, rate: total > 0 ? Math.round((correct / total) * 100) : 0 };
  }

  function getStats() {
    const history = getHistory();
    let totalAttempts = 0, totalCorrect = 0;
    for (const v of Object.values(history)) {
      totalAttempts += v.attempts;
      totalCorrect += v.correct;
    }
    return { totalAttempts, totalCorrect, accuracy: totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0 };
  }

  function clearAll() {
    localStorage.removeItem(KEYS.history);
    localStorage.removeItem(KEYS.wrong);
    localStorage.removeItem(KEYS.progress);
  }

  function isAnswered(questionId) {
    const history = getHistory();
    return !!history[questionId];
  }

  return { saveResult, getWrongIds, getProgress, getStats, clearAll, isAnswered, getHistory };
})();
