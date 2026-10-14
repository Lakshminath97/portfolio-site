/* Lakshminath K — Portfolio
   Vanilla JS: scroll reveals, journey meter, SOP explainer,
   work filters, Engineer's lens toggles, theme toggle. */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme toggle ---------- */
  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#F3F0E8' : '#121416');
    var btn = document.querySelector('.theme-toggle');
    if (btn) {
      var next = theme === 'light' ? 'dark' : 'light';
      btn.setAttribute('aria-label', next === 'light' ? 'Switch to light drawing-paper theme' : 'Switch to dark theme');
      var label = btn.querySelector('.theme-toggle-label');
      if (label) label.textContent = next === 'light' ? 'PAPER' : 'DARK';
    }
  }

  function initTheme() {
    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    setTheme(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      setTheme(next);
      try { localStorage.setItem('lk-theme', next); } catch (e) { /* storage unavailable */ }
    });
  }

  /* ---------- Scroll reveals ---------- */
  function initReveals() {
    var items = document.querySelectorAll('.reveal');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Journey meter (mechanical ↔ XR) ---------- */
  function initMeter() {
    var meter = document.querySelector('.meter');
    var items = Array.prototype.slice.call(document.querySelectorAll('.tl-item'));
    if (!meter || !items.length) return;
    var years = meter.querySelector('.meter-years');
    var ticking = false;
    var lastIndex = -1;

    function update() {
      ticking = false;
      var anchor = window.innerHeight * 0.55;
      var tops = items.map(function (el) { return el.getBoundingClientRect().top; });
      var i = 0;
      for (var k = 0; k < tops.length; k++) { if (tops[k] <= anchor) i = k; }
      var v0 = parseFloat(items[i].getAttribute('data-xr')) || 0;
      var value = v0;
      if (i < items.length - 1 && tops[i] <= anchor) {
        var span = tops[i + 1] - tops[i];
        var t = span > 0 ? Math.min(Math.max((anchor - tops[i]) / span, 0), 1) : 0;
        var v1 = parseFloat(items[i + 1].getAttribute('data-xr')) || v0;
        value = v0 + (v1 - v0) * t;
      }
      meter.style.setProperty('--xr', value.toFixed(3));
      if (i !== lastIndex) {
        lastIndex = i;
        items.forEach(function (el, idx) { el.classList.toggle('is-current', idx === i); });
        var y = items[i].querySelector('.tl-years');
        if (years && y) years.textContent = y.textContent.replace(/\s+/g, ' ').trim();
      }
    }

    function onScroll() {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  /* ---------- Work filters ---------- */
  function initFilters() {
    var buttons = Array.prototype.slice.call(document.querySelectorAll('.filter'));
    var cards = Array.prototype.slice.call(document.querySelectorAll('.card'));
    var empty = document.querySelector('.empty-note');
    if (!buttons.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var f = btn.getAttribute('data-filter');
        buttons.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
        var shown = 0;
        cards.forEach(function (card) {
          var cats = (card.getAttribute('data-cats') || '').split(/\s+/);
          var match = f === 'all' || cats.indexOf(f) !== -1;
          card.hidden = !match;
          if (match) {
            shown++;
            card.classList.add('is-in'); // never leave a filtered-in card invisible
          }
        });
        if (empty) empty.hidden = shown !== 0;
      });
    });
  }

  /* ---------- Engineer's lens toggles ---------- */
  function initLens() {
    document.querySelectorAll('.lens-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var panel = document.getElementById(btn.getAttribute('aria-controls'));
        if (!panel) return;
        var open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', open ? 'false' : 'true');
        panel.hidden = open;
        if (!open && !reduceMotion) {
          panel.classList.remove('is-entering');
          void panel.offsetWidth;
          panel.classList.add('is-entering');
        }
      });
    });
  }

  /* ---------- Active nav link ---------- */
  function initNav() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav a'));
    if (!links.length || !('IntersectionObserver' in window)) return;
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (a) { a.classList.remove('is-active'); });
          var a = map[entry.target.id];
          if (a) a.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) io.observe(s);
    });
  }

  /* ---------- Project images: picked up automatically by file name ----------
     Upload e.g. assets/work/forklift.jpg and the matching card shows it.
     If the file isn't there, the placeholder / schematic stays. */
  function initCardImages() {
    document.querySelectorAll('.card-fig[data-img]').forEach(function (fig) {
      var img = new Image();
      img.alt = fig.getAttribute('data-alt') || '';
      img.decoding = 'async';
      img.onload = function () {
        fig.textContent = '';
        fig.appendChild(img);
        fig.classList.add('has-img');
        fig.removeAttribute('aria-hidden');
      };
      img.src = fig.getAttribute('data-img');
    });
  }

  /* ---------- Copy email to clipboard ---------- */
  function initCopy() {
    document.querySelectorAll('.copy-btn').forEach(function (btn) {
      var status = btn.parentNode.querySelector('.copy-status');
      btn.addEventListener('click', function () {
        var text = btn.getAttribute('data-copy');
        var done = function (ok) {
          if (status) status.textContent = ok ? 'Copied' : 'Press Ctrl+C to copy';
          btn.textContent = ok ? 'Copied' : 'Copy';
          setTimeout(function () { btn.textContent = 'Copy'; if (status) status.textContent = ''; }, 1800);
        };
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
        } else {
          try {
            var ta = document.createElement('textarea');
            ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'absolute'; ta.style.left = '-9999px';
            document.body.appendChild(ta); ta.select();
            var ok = document.execCommand('copy');
            document.body.removeChild(ta); done(ok);
          } catch (e) { done(false); }
        }
      });
    });
  }

  /* ---------- Hero: rotating "I build ___" line + cursor-lit grid ---------- */
  function initHeroV2() {
    var hero = document.querySelector('.hero-v2');
    if (!hero) return;
    var items = Array.prototype.slice.call(hero.querySelectorAll('.rot-item'));
    var rot = hero.querySelector('.rotator');
    var i = 0;
    function underline() { if (rot && items[i]) rot.style.setProperty('--rot-w', items[i].offsetWidth + 'px'); }
    underline();
    window.addEventListener('resize', underline);
    if (items.length > 1 && !reduceMotion) {
      setInterval(function () {
        var cur = items[i];
        cur.classList.remove('is-active'); cur.classList.add('is-leaving');
        setTimeout(function () { cur.classList.remove('is-leaving'); }, 700);
        i = (i + 1) % items.length;
        items[i].classList.add('is-active');
        underline();
      }, 2800);
    }
  }

  function init() {
    initTheme();
    initReveals();
    initMeter();
    initFilters();
    initLens();
    initNav();
    initCardImages();
    initCopy();
    initHeroV2();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
