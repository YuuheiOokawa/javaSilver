/* ===== Navigation ===== */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (toggle && navLinks) {
    toggle.addEventListener("click", () => navLinks.classList.toggle("open"));
    document.addEventListener("click", e => {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target))
        navLinks.classList.remove("open");
    });
  }

  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    if (a.getAttribute("href") === page) a.classList.add("active");
  });

  if (document.getElementById("quiz-area"))      QuizApp.init();
  if (document.getElementById("detail-nav"))     DetailApp.init();
  if (document.getElementById("roadmap-area"))   RoadmapApp.init();
});

/* ===== Quiz Application ===== */
const QuizApp = (() => {
  let pool       = [];
  let current    = 0;
  let score      = 0;
  let answered   = false;
  let reviewMode = false;
  let _mode      = "all";

  // exposed so questions.html can read them
  let currentCategory   = "all";
  let currentDifficulty = "all";

  /* ---- init ---- */
  function init() {
    setupFilters();
    startQuiz("all", "all");

    // Keyboard shortcuts
    document.addEventListener("keydown", e => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      const key = e.key;
      if (!answered && ["1","2","3","4"].includes(key)) {
        const idx = parseInt(key) - 1;
        if (idx < pool[current]?.choices?.length) selectChoice(idx);
      }
      if (answered && (key === "Enter" || key === " ")) {
        e.preventDefault();
        const nb = document.getElementById("next-btn");
        if (nb) nextQuestion();
      }
    });
  }

  /* ---- Filters ---- */
  function setupFilters() {
    const catEl  = document.getElementById("cat-filters");
    const diffEl = document.getElementById("diff-filters");
    if (!catEl) return;

    // Clear existing (may be pre-populated in HTML)
    catEl.innerHTML = "";

    const allCatBtn = mkFilterBtn("すべて", true, () => {
      setActive(allCatBtn, catEl);
      currentCategory = "all";
      updateFilteredCount();
      startQuiz(currentCategory, currentDifficulty);
    });
    catEl.appendChild(allCatBtn);

    CATEGORIES.forEach(cat => {
      const btn = mkFilterBtn(cat, false, () => {
        setActive(btn, catEl);
        currentCategory = cat;
        updateFilteredCount();
        startQuiz(currentCategory, currentDifficulty);
      });
      catEl.appendChild(btn);
    });

    // Difficulty buttons
    if (diffEl) {
      diffEl.innerHTML = "";
      const diffs = [["すべて","all"],["🟢 易しい","easy"],["🟡 普通","medium"],["🔴 難しい","hard"]];
      diffs.forEach(([label, diff], i) => {
        const btn = mkFilterBtn(label, i===0, () => {
          setActive(btn, diffEl);
          currentDifficulty = diff;
          updateFilteredCount();
          startQuiz(currentCategory, currentDifficulty);
        });
        diffEl.appendChild(btn);
      });
    }

    updateFilteredCount();
  }

  function mkFilterBtn(label, active, onClick) {
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (active ? " active" : "");
    btn.textContent = label;
    btn.addEventListener("click", onClick);
    return btn;
  }

  function setActive(el, container) {
    container.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    el.classList.add("active");
  }

  function updateFilteredCount() {
    const el = document.getElementById("filtered-count");
    if (!el) return;
    const count = QUESTIONS.filter(q => {
      const catOk  = currentCategory  === "all" || q.category  === currentCategory;
      const diffOk = currentDifficulty === "all" || q.difficulty === currentDifficulty;
      return catOk && diffOk;
    }).length;
    el.textContent = `フィルター結果: ${count}問`;
  }

  /* ---- Mode ---- */
  function setMode(mode) {
    _mode = mode;
    const modeAll   = document.getElementById("mode-all");
    const modeWrong = document.getElementById("mode-wrong");
    const panel     = document.getElementById("filter-panel");
    if (modeAll)   modeAll.classList.toggle("active",   mode === "all");
    if (modeWrong) modeWrong.classList.toggle("active", mode === "wrong");
    if (panel)     panel.style.display = mode === "wrong" ? "none" : "";
    if (mode === "wrong") reviewWrong();
    else startQuiz(currentCategory, currentDifficulty);
  }

  /* ---- Start Quiz ---- */
  function startQuiz(category, difficulty) {
    reviewMode = (category === "wrong");
    currentCategory   = category;
    currentDifficulty = difficulty;

    if (reviewMode) {
      const wrongIds = Storage.getWrongIds();
      pool = QUESTIONS.filter(q => wrongIds.includes(q.id));
    } else {
      pool = QUESTIONS.filter(q => {
        const catOk  = category  === "all" || q.category  === category;
        const diffOk = difficulty === "all" || q.difficulty === difficulty;
        return catOk && diffOk;
      });
    }

    shuffle(pool);
    current  = 0;
    score    = 0;
    answered = false;

    if (pool.length === 0) { showEmpty(); return; }
    renderQuestion();
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  /* ---- Render ---- */
  function renderQuestion() {
    const q   = pool[current];
    const box = document.getElementById("quiz-area");
    if (!box) return;

    updateProgress();

    const diffLabel = { easy:"🟢 易", medium:"🟡 中", hard:"🔴 難" }[q.difficulty];
    const diffCls   = { easy:"badge-easy", medium:"badge-medium", hard:"badge-hard" }[q.difficulty];

    const codeHtml = q.code ? `
      <div class="code-wrap">
        <div class="code-header">
          <div class="code-dots"><span class="d1"></span><span class="d2"></span><span class="d3"></span></div>
          <span class="code-file">Java</span>
        </div>
        <div class="code-block"><pre>${escapeHtml(q.code)}</pre></div>
      </div>` : "";

    const choicesHtml = q.choices.map((c, i) => `
      <li>
        <button class="choice-btn" data-index="${i}" onclick="QuizApp.selectChoice(${i})">
          <span class="choice-label">${"ABCD"[i]}</span>
          <span style="flex:1">${escapeHtml(c)}</span>
          <span class="key-hint">${i+1}</span>
        </button>
      </li>`).join("");

    box.innerHTML = `
      <div class="question-card" id="q-card">
        <div class="question-number">問 ${current + 1} / ${pool.length}</div>
        <div class="question-meta">
          <span class="badge badge-category">${q.category}</span>
          <span class="badge ${diffCls}">${diffLabel}</span>
        </div>
        <p class="question-text">${escapeHtml(q.question)}</p>
        ${codeHtml}
        <ul class="choices" id="choices">${choicesHtml}</ul>
        <div class="explanation" id="explanation">
          <div class="explanation-header">
            <span style="font-size:1.2rem">📖</span>
            <h4>解説</h4>
          </div>
          <pre>${escapeHtml(q.explanation)}</pre>
          ${q.practicalNote ? `<div class="practical-note"><strong>💼 実務ポイント</strong>${escapeHtml(q.practicalNote)}</div>` : ""}
        </div>
        <div class="quiz-controls" id="controls">
          <div id="result-msg" class="result-msg"></div>
          <button class="btn btn-primary hidden" id="next-btn" onclick="QuizApp.nextQuestion()">
            ${current + 1 < pool.length ? "次の問題 →" : "結果を見る 🏁"}
          </button>
        </div>
      </div>`;

    answered = false;
  }

  /* ---- Select Choice ---- */
  function selectChoice(index) {
    if (answered) return;
    answered = true;
    const q       = pool[current];
    const correct = q.answer === index;

    Storage.saveResult(q.id, correct);
    if (correct) score++;

    document.querySelectorAll(".choice-btn").forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.answer)              btn.classList.add("correct");
      else if (i === index && !correct) btn.classList.add("wrong");
    });

    const msg = document.getElementById("result-msg");
    if (correct) {
      msg.innerHTML = "<span style='color:var(--success);font-size:1.1rem'>✅</span> <span style='color:var(--success)'>正解！</span>";
    } else {
      msg.innerHTML = "<span style='color:var(--error);font-size:1.1rem'>❌</span> <span style='color:var(--error)'>不正解</span> — 正解は <strong>" + "ABCD"[q.answer] + "</strong>";
    }

    document.getElementById("explanation").classList.add("show");
    document.getElementById("next-btn").classList.remove("hidden");

    // update progress panel on questions page
    const pa = document.getElementById("progress-area");
    if (pa) {
      const p = Storage.getProgress();
      pa.innerHTML = `
        <div class="stats-grid" style="grid-template-columns:repeat(4,1fr)">
          <div class="stat-card"><span class="stat-num">${p.rate}%</span><span class="stat-label">習得率</span></div>
          <div class="stat-card"><span class="stat-num">${p.correct}/${p.total}</span><span class="stat-label">正解数</span></div>
          <div class="stat-card"><span class="stat-num">${Storage.getStats().accuracy}%</span><span class="stat-label">正解率</span></div>
          <div class="stat-card"><span class="stat-num" style="background:linear-gradient(135deg,#ef4444,#f97316);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">${Storage.getWrongIds().length}</span><span class="stat-label">要復習</span></div>
        </div>`;
    }
  }

  /* ---- Next Question ---- */
  function nextQuestion() {
    current++;
    if (current >= pool.length) showResult();
    else renderQuestion();
  }

  /* ---- Progress bar / text ---- */
  function updateProgress() {
    const bar  = document.getElementById("progress-bar");
    const text = document.getElementById("progress-text");
    const pct  = pool.length ? (current / pool.length) * 100 : 0;
    if (bar)  bar.style.width = pct + "%";
    if (text) text.textContent = `${current + 1} / ${pool.length} 問`;
  }

  /* ---- Result Screen ---- */
  function showResult() {
    const box = document.getElementById("quiz-area");
    const pct = pool.length ? Math.round((score / pool.length) * 100) : 0;
    const circumference = 2 * Math.PI * 52;
    const offset = circumference - (pct / 100) * circumference;
    const [color, emoji, msg] =
      pct >= 80 ? ["var(--success)", "🎉", "合格ライン到達！素晴らしい！"] :
      pct >= 60 ? ["var(--warning)", "💪", "もう少し！復習して再挑戦しましょう"] :
                  ["var(--error)",   "📚", "基礎から見直しましょう"];

    box.innerHTML = `
      <div class="score-display">
        <h2 style="font-size:1.5rem;font-weight:800;letter-spacing:-0.02em;margin-bottom:0.5rem">クイズ完了！</h2>
        <p style="color:var(--gray-500);margin-bottom:2rem">${pool.length}問中 ${score}問正解</p>
        <div class="score-ring" style="margin-bottom:1.5rem">
          <svg viewBox="0 0 120 120" width="160" height="160">
            <circle class="score-ring-bg" cx="60" cy="60" r="52"/>
            <circle class="score-ring-fill" cx="60" cy="60" r="52"
              stroke="${color}"
              stroke-dasharray="${circumference}"
              stroke-dashoffset="${offset}"/>
          </svg>
          <div class="score-ring-text">
            <span class="score-pct" style="color:${color}">${pct}%</span>
            <span class="score-sub">${score}/${pool.length}</span>
          </div>
        </div>
        <p style="font-size:1.1rem;font-weight:600;margin-bottom:2rem">${emoji} ${msg}</p>
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;justify-content:center">
          <button class="btn btn-primary" onclick="QuizApp.startQuiz(QuizApp.currentCategory, QuizApp.currentDifficulty)">🔄 もう一度</button>
          <button class="btn btn-outline"  onclick="QuizApp.reviewWrong()">❌ 間違えた問題を復習</button>
          <a href="index.html" class="btn btn-ghost">🏠 ホームへ</a>
        </div>
      </div>`;

    const bar  = document.getElementById("progress-bar");
    const text = document.getElementById("progress-text");
    if (bar)  bar.style.width = "100%";
    if (text) text.textContent = "完了！";
  }

  /* ---- Empty ---- */
  function showEmpty() {
    const label = reviewMode
      ? "間違えた問題はありません 👍<br><small>全問正解達成！</small>"
      : "該当する問題がありません";
    document.getElementById("quiz-area").innerHTML = `
      <div class="card text-center" style="padding:3rem">
        <p style="font-size:1.1rem;color:var(--gray-500);margin-bottom:1.5rem">${label}</p>
        <button class="btn btn-primary" onclick="QuizApp.startQuiz('all','all')">全問題に戻る</button>
      </div>`;
  }

  /* ---- Review wrong ---- */
  function reviewWrong() {
    reviewMode = true;
    startQuiz("wrong", "all");
  }

  /* ---- HTML escape ---- */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g,"&amp;")
      .replace(/</g,"&lt;")
      .replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;");
  }

  return {
    init, selectChoice, nextQuestion, startQuiz, reviewWrong, setMode,
    get currentCategory()   { return currentCategory; },
    get currentDifficulty() { return currentDifficulty; }
  };
})();

/* ===== Detail Page — sticky nav ===== */
const DetailApp = (() => {
  function init() {
    const nav = document.getElementById("detail-nav");
    if (!nav) return;
    const sections = document.querySelectorAll(".detail-section");
    const links    = nav.querySelectorAll("a");

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.remove("active"));
          const a = nav.querySelector(`a[href="#${entry.target.id}"]`);
          if (a) a.classList.add("active");
        }
      });
    }, { rootMargin: "-60px 0px -70% 0px" });

    sections.forEach(s => obs.observe(s));
  }
  return { init };
})();

/* ===== Roadmap — checkbox persistence ===== */
const RoadmapApp = (() => {
  function init() {
    document.querySelectorAll(".task-check").forEach(cb => {
      const key = "roadmap_" + cb.dataset.key;
      cb.checked = localStorage.getItem(key) === "1";
      cb.addEventListener("change", () => {
        localStorage.setItem(key, cb.checked ? "1" : "0");
        updateRoadmapProgress();
      });
    });
    updateRoadmapProgress();
  }
  function updateRoadmapProgress() {
    const all     = document.querySelectorAll(".task-check");
    const checked = document.querySelectorAll(".task-check:checked").length;
    const bar  = document.getElementById("roadmap-progress-bar");
    const text = document.getElementById("roadmap-progress-text");
    if (bar)  bar.style.width = (all.length ? (checked/all.length)*100 : 0) + "%";
    if (text) text.textContent = `${checked} / ${all.length} 完了`;
  }
  return { init };
})();
