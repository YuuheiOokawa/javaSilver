(function () {
  var KEY = 'java-silver-theme';

  function apply(dark) {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    try { localStorage.setItem(KEY, dark ? 'dark' : 'light'); } catch(e){}
    var btn = document.querySelector('.theme-toggle');
    if (btn) btn.textContent = dark ? '☀️' : '🌙';
  }

  // Apply before paint to avoid flash
  var saved = '';
  try { saved = localStorage.getItem(KEY) || ''; } catch(e){}
  var dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  apply(dark);

  document.addEventListener('DOMContentLoaded', function () {
    // Theme toggle
    var btn = document.querySelector('.theme-toggle');
    if (btn) btn.addEventListener('click', function () {
      apply(document.documentElement.getAttribute('data-theme') !== 'dark');
    });

    // Mobile nav
    var toggle = document.querySelector('.nav-toggle');
    var links  = document.querySelector('.nav-links');
    if (toggle && links) {
      toggle.addEventListener('click', function () { links.classList.toggle('open'); });
      document.addEventListener('click', function (e) {
        if (!toggle.contains(e.target) && !links.contains(e.target)) links.classList.remove('open');
      });
    }
  });
})();
