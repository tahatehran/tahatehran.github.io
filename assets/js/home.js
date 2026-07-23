// Homepage slider, animations, and counters

// === From index.html (Persian) ===
(function () {
  /* ── Hero Slider ────────────────────────────────────────── */
  var slides = document.querySelectorAll('.hero-slide');
  var dots = document.querySelectorAll('.hero-dot');
  var pauseBtn = document.getElementById('heroPauseBtn');
  var pauseIcon = document.getElementById('heroPauseIcon');
  var slider = document.getElementById('heroSlider');

  // Only run if this page has the Persian slider elements
  if (slides.length === 0 || !slider) return;

  var current = 0;
  var interval = null;
  var paused = false;
  var INTERVAL_MS = 5000;

  function goTo(idx) {
    if (!slides[current] || !dots[current]) return;
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() { goTo(current + 1); }

  function startAuto() {
    stopAuto();
    if (!paused) interval = setInterval(next, INTERVAL_MS);
  }

  function stopAuto() { clearInterval(interval); interval = null; }

  dots.forEach(function (d) {
    d.addEventListener('click', function () {
      var idx = parseInt(d.dataset.slide);
      goTo(idx);
      startAuto();
    });
  });

  if (pauseBtn) {
    pauseBtn.addEventListener('click', function () {
      paused = !paused;
      if (pauseIcon) pauseIcon.className = paused ? 'fas fa-play' : 'fas fa-pause';
      if (paused) { stopAuto(); } else { startAuto(); }
    });
  }

  /* Touch swipe support */
  var touchStartX = 0;
  var touchEndX = 0;
  slider.addEventListener('touchstart', function (e) { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  slider.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    var diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      // RTL: swipe left = next, swipe right = prev
      if (diff > 0) { goTo(current + 1); } else { goTo(current - 1); }
      startAuto();
    }
  }, { passive: true });

  startAuto();

  /* ── Stats Counter Animation ─────────────────────────────── */
  var counters = document.querySelectorAll('.stat-number[data-target]');
  var countersAnimated = false;

  // Persian digits map
  var persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  function toPersianNum(n) {
    return String(n).replace(/\d/g, function (d) { return persianDigits[parseInt(d)]; });
  }

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;
    counters.forEach(function (el) {
      var target = parseInt(el.dataset.target);
      var suffix = el.dataset.suffix || '';
      var duration = 1800;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        // ease-out cubic
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = Math.floor(eased * target);
        el.textContent = toPersianNum(value) + (suffix ? ' ' + suffix : '');
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  /* ── Scroll Reveal ───────────────────────────────────────── */
  var revealElements = document.querySelectorAll('.reveal-section');

  function checkReveal() {
    var triggerBottom = window.innerHeight * 0.88;
    revealElements.forEach(function (el) {
      var top = el.getBoundingClientRect().top;
      if (top < triggerBottom) {
        el.classList.add('revealed');
      }
    });

    // Check if stats are in view
    if (countersAnimated) return;
    var statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      var top = statsSection.getBoundingClientRect().top;
      if (top < triggerBottom) animateCounters();
    }
  }

  window.addEventListener('scroll', checkReveal, { passive: true });
  // Initial check
  setTimeout(checkReveal, 100);
})();

// === From en/index.html (English) ===
(function () {
  'use strict';

  /* ---- Hero Slider ---- */
  var slides = document.querySelectorAll('.hero-slide');
  var dots = document.querySelectorAll('.hero-slider__dot');
  var sliderEl = document.querySelector('.hero-slider');

  // Only run if this page has the English slider elements
  if (slides.length === 0 || !sliderEl || dots.length === 0) return;

  var currentSlide = 0;
  var autoSlideTimer = null;
  var touchStartX = 0;
  var touchEndX = 0;
  var SLIDE_INTERVAL = 5000;

  function goToSlide(index) {
    if (!slides[currentSlide] || !dots[currentSlide]) return;
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(nextSlide, SLIDE_INTERVAL);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  // Dot click navigation
  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      goToSlide(parseInt(this.dataset.index));
      startAutoSlide();
    });
  });

  // Touch swipe support
  sliderEl.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  sliderEl.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    var diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        goToSlide(currentSlide - 1);
      }
      startAutoSlide();
    }
  }, { passive: true });

  // Pause on hover
  sliderEl.addEventListener('mouseenter', stopAutoSlide);
  sliderEl.addEventListener('mouseleave', startAutoSlide);

  // Keyboard navigation
  sliderEl.setAttribute('tabindex', '0');
  sliderEl.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { nextSlide(); startAutoSlide(); }
    if (e.key === 'ArrowLeft') { goToSlide(currentSlide - 1); startAutoSlide(); }
  });

  startAutoSlide();

  /* ---- Stats Counter Animation ---- */
  var countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;
    var statNumbers = document.querySelectorAll('.stat-number[data-target]');
    statNumbers.forEach(function (el) {
      var target = parseInt(el.dataset.target);
      var suffix = el.dataset.suffix || '';
      var duration = 1500;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        // Ease out cubic
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.floor(eased * target);
        el.textContent = current + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target + suffix;
        }
      }
      requestAnimationFrame(step);
    });
  }

  /* ---- Scroll Reveal & Counter Trigger ---- */
  var revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');

  function checkReveal() {
    var windowHeight = window.innerHeight;
    revealElements.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      var revealPoint = windowHeight * 0.88;
      if (rect.top < revealPoint && rect.bottom > 0) {
        el.classList.add('revealed');
      }
    });

    // Check if stats section is in view
    var statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      var rect = statsSection.getBoundingClientRect();
      if (rect.top < windowHeight * 0.85 && rect.bottom > 0) {
        animateCounters();
      }
    }
  }

  // Throttled scroll handler
  var scrollTimeout = null;
  window.addEventListener('scroll', function () {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function () {
        checkReveal();
        scrollTimeout = null;
      }, 16);
    }
  }, { passive: true });

  // Initial check on load
  checkReveal();
})();
