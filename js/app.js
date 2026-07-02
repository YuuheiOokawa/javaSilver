/* ===== Navigation ===== */
document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (toggle && navLinks) {
    toggle.addEventListener("click", () => navLinks.classList.toggle("open"));
    document.addEventListener("click", e => {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove("open");
      }
    });
  }

  // Active link
  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    if (a.getAttribute("href") === currentPage) a.classList.add("active");
  });

  // Init page-specific modules
  if (document.getElementById("quiz-area")) QuizApp.init();
  if (document.getElementById("progress-area")) ProgressApp.init();
  if (document.getElementById("detail-nav")) DetailApp.init();
  if (document.getElementById("roadmap-area")) RoadmapApp.init();
});

/* ===== Quiz Application ===== */
const QuizApp = (() => {
  let pool = [];
  let current = 0;
  let score = 0;
  let answered = false;
  let wrongThisSession = [];
  let reviewMode = false;

  function init() {
    ProgressApp.renderSummary();
    setupFilters();
    startQuiz("all", "all");
  }

  function setupFilters() {
    const catContainer = document.getElementById("cat-filters");
    const diffContainer = document.getElementById("diff-filters");
    if (!catContainer) return;

    const allBtn = createFilterBtn("すべて", true, () => {
      setActive(allBtn, catContainer);
      currentCategory = "all";
      restartWithFilters();
    });
    catContainer.appendChild(allBtn);

    CATEGORIES.forEach(cat => {
      const btn = createFilterBtn(cat, false, () => {
        setActive(btn, catContainer);
        currentCategory = cat;
        restartWithFilters();
      });
      catContainer.appendChild(btn);
    });

    const wrongBtn = createFilterBtn("❌ 間違えた問題", false, () => {
      setActive(wrongBtn, catContainer);
      currentCategory = "wrong";
      restartWithFilters();
    });
    catContainer.appendChild(wrongBtn);

    ["すべて", "易", "中", "難"].forEach((label, i) => {
      const diff = ["all", "easy", "medium", "hard"][i];
      const btn = createFilterBtn(label, i === 0, () => {
        setActive(btn, diffContainer);
        currentDifficulty = diff;
        restartWithFilters();
      });
      diffContainer.appendChild(btn);
    });
  }

  let currentCategory = "all";
  let currentDifficulty = "all";

  function createFilterBtn(label, active, onClick) {
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

  function restartWithFilters() {
    startQuiz(currentCategory, currentDifficulty);
  }

  function startQuiz(category, difficulty) {
    reviewMode = false;
    if (category === "wrong") {
      const wrongIds = Storage.getWrongIds();
      pool = QUESTIONS.filter(q => wrongIds.includes(q.id));
      reviewMode = true;
    } else {
      pool = QUESTIONS.filter(q => {
        const catOk = category === "all" || q.category === category;
        const diffOk = difficulty === "all" || q.difficulty === difficulty;
        return catOk && diffOk;
      });
    }
    shuffle(pool);
    current = 0;
    score = 0;
    wrongThisSession = [];
    answered = false;

    if (pool.length === 0) {
      showEmpty();
      return;
    }
    renderQuestion();
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  function renderQuestion() {
    const q = pool[current];
    const container = document.getElementById("quiz-area");

    updateProgress();

    const diffLabel = { easy: "易", medium: "中", hard: "難" }[q.difficulty];
    const diffClass = { easy: "badge-easy", medium: "badge-medium", hard: "badge-hard" }[q.difficulty];

    container.innerHTML = `
      <div class="question-card" id="q-card">
        <div class="question-meta">
          <span class="badge badge-category">${q.category}</span>
          <span class="badge ${diffClass}">${diffLabel}</span>
          <span class="badge" style="background:#f3f4f6;color:#6b7280">Q${current + 1}/${pool.length}</span>
        </div>
        <p class="question-text">${q.question}</p>
        ${q.code ? `<div class="code-block"><pre>${escapeHtml(q.code)}</pre></div>` : ""}
        <ul class="choices" id="choices">
          ${q.choices.map((c, i) => `
            <li>
              <button class="choice-btn" data-index="${i}" onclick="QuizApp.selectChoice(${i})">
                <span class="choice-label">${"ABCD"[i]}.</span>
                <span>${escapeHtml(c)}</span>
              </button>
            </li>
          `).join("")}
        </ul>
        <div class="explanation" id="explanation">
          <h4>📖 解説</h4>
          <pre style="white-space:pre-wrap;font-family:inherit;font-size:0.95rem">${escapeHtml(q.explanation)}</pre>
          ${q.practicalNote ? `<div class="box box-info mt-2"><strong>💼 実務ポイント</strong>${escapeHtml(q.practicalNote)}</div>` : ""}
        </div>
        <div class="quiz-controls" id="controls" style="margin-top:1rem">
          <span id="result-msg" style="font-weight:600"></span>
          <button class="btn btn-primary hidden" id="next-btn" onclick="QuizApp.nextQuestion()">
            ${current + 1 < pool.length ? "次の問題 →" : "結果を見る"}
          </button>
        </div>
      </div>
    `;
    answered = false;
  }

  function selectChoice(index) {
    if (answered) return;
    answered = true;
    const q = pool[current];
    const correct = q.answer === index;

    Storage.saveResult(q.id, correct);
    if (!correct) wrongThisSession.push(q.id);
    if (correct) score++;

    const buttons = document.querySelectorAll(".choice-btn");
    buttons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.answer) btn.classList.add("correct");
      else if (i === index && !correct) btn.classList.add("wrong");
    });

    const msg = document.getElementById("result-msg");
    msg.textContent = correct ? "✅ 正解！" : "❌ 不正解";
    msg.style.color = correct ? "var(--success)" : "var(--error)";

    document.getElementById("explanation").classList.add("show");
    document.getElementById("next-btn").classList.remove("hidden");
    ProgressApp.renderSummary();
  }

  function nextQuestion() {
    current++;
    if (current >= pool.length) {
      showResult();
    } else {
      renderQuestion();
    }
  }

  function updateProgress() {
    const bar = document.getElementById("progress-bar");
    const text = document.getElementById("progress-text");
    if (bar) bar.style.width = `${(current / pool.length) * 100}%`;
    if (text) text.textContent = `${current + 1} / ${pool.length} 問`;
  }

  function showResult() {
    const container = document.getElementById("quiz-area");
    const pct = Math.round((score / pool.length) * 100);
    const msg = pct >= 80 ? "素晴らしい！合格ライン到達です 🎉" : pct >= 60 ? "もう少し！復習して再挑戦しましょう 💪" : "基礎から見直しましょう 📚";
    const col = pct >= 80 ? "var(--success)" : pct >= 60 ? "var(--warning)" : "var(--error)";
    container.innerHTML = `
      <div class="score-display">
        <h2 style="margin-bottom:1.5rem">クイズ完了！</h2>
        <div class="score-circle" style="border-color:${col}">
          <span class="score-num" style="color:${col}">${pct}%</span>
          <span class="score-label">${score}/${pool.length}問正解</span>
        </div>
        <p style="font-size:1.1rem;margin-bottom:1.5rem">${msg}</p>
        <div style="display:flex;gap:1rem;flex-wrap:wrap;justify-content:center">
          <button class="btn btn-primary" onclick="QuizApp.restartCurrent()">もう一度</button>
          <button class="btn btn-outline" onclick="QuizApp.reviewWrong()">間違えた問題を復習</button>
        </div>
      </div>
    `;
    document.getElementById("progress-bar").style.width = "100%";
    document.getElementById("progress-text").textContent = "完了";
  }

  function showEmpty() {
    document.getElementById("quiz-area").innerHTML = `
      <div class="card text-center">
        <p style="font-size:1.1rem;color:var(--gray-600);padding:2rem">
          ${reviewMode ? "間違えた問題はありません 👍" : "条件に一致する問題がありません"}</p>
        <button class="btn btn-outline" onclick="QuizApp.startQuiz('all','all')">全問題を表示</button>
      </div>`;
  }

  function restartCurrent() {
    startQuiz(currentCategory, currentDifficulty);
  }

  function reviewWrong() {
    currentCategory = "wrong";
    document.querySelectorAll("#cat-filters .filter-btn").forEach(b => b.classList.remove("active"));
    startQuiz("wrong", "all");
  }

  function escapeHtml(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  return { init, selectChoice, nextQuestion, startQuiz, restartCurrent, reviewWrong };
})();

/* ===== Progress Summary ===== */
const ProgressApp = (() => {
  function renderSummary() {
    const area = document.getElementById("progress-area");
    if (!area) return;
    const p = Storage.getProgress();
    const s = Storage.getStats();
    const wrongCount = Storage.getWrongIds().length;
    area.innerHTML = `
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-num">${p.rate}%</div>
          <div class="stat-label">習得率</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">${p.correct}/${p.total}</div>
          <div class="stat-label">正解問題数</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">${s.accuracy}%</div>
          <div class="stat-label">解答正解率</div>
        </div>
        <div class="stat-card">
          <div class="stat-num" style="color:var(--error)">${wrongCount}</div>
          <div class="stat-label">要復習問題</div>
        </div>
      </div>
      <div class="progress-bar-wrap">
        <div class="progress-bar" style="width:${p.rate}%"></div>
      </div>
    `;
  }

  function init() { renderSummary(); }
  return { init, renderSummary };
})();

/* ===== Detail Page ===== */
const DetailApp = (() => {
  function init() {
    const nav = document.getElementById("detail-nav");
    if (!nav) return;
    const sections = document.querySelectorAll(".detail-section");
    const links = nav.querySelectorAll("a");

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.remove("active"));
          const id = entry.target.id;
          const active = nav.querySelector(`a[href="#${id}"]`);
          if (active) active.classList.add("active");
        }
      });
    }, { rootMargin: "-60px 0px -70% 0px" });

    sections.forEach(s => observer.observe(s));
  }
  return { init };
})();

/* ===== Roadmap ===== */
const RoadmapApp = (() => {
  function init() {
    // チェックボックス状態をlocalStorageで保存
    document.querySelectorAll(".task-check").forEach(cb => {
      const key = "roadmap_" + cb.dataset.key;
      cb.checked = localStorage.getItem(key) === "1";
      cb.addEventListener("change", () => localStorage.setItem(key, cb.checked ? "1" : "0"));
    });
  }
  return { init };
})();
