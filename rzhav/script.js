/* ═══════════════════════════════════════════════════════════════
   Ржавь · script.js
   Лёгкая анимация появления полей бланка и "шлепка" штампа.
   Без фреймворков. Совместимо с prefers-reduced-motion.
   ═══════════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Плавное появление полей бланка при скролле ─────────── */
  const revealTargets = document.querySelectorAll('[data-reveal]');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.12,
      }
    );

    revealTargets.forEach((el) => observer.observe(el));
  }

  /* ── Шлепок штампа при hover ────────────────────────────── */
  const acceptedStamp = document.querySelector('.stamp-accepted');

  if (acceptedStamp && !reduceMotion) {
    let wobbling = false;

    acceptedStamp.addEventListener('mouseenter', () => {
      if (wobbling) return;
      wobbling = true;

      acceptedStamp.animate(
        [
          { transform: 'rotate(-6deg) translateY(0.5rem) scale(1)' },
          { transform: 'rotate(2deg) translateY(-4px) scale(1.08)', offset: 0.4 },
          { transform: 'rotate(-2deg) translateY(-1px) scale(1.04)', offset: 0.75 },
          { transform: 'rotate(0deg) translateY(0) scale(1.04)' },
        ],
        { duration: 380, easing: 'cubic-bezier(0.2, 1.4, 0.3, 1.1)', fill: 'forwards' }
      );

      setTimeout(() => {
        wobbling = false;
      }, 380);
    });
  }

  /* ── Курсор-пропуск для резолюции ───────────────────────── */
  const resolution = document.querySelector('.sticky-resolution');

  if (resolution && !reduceMotion) {
    resolution.addEventListener('pointerdown', () => {
      resolution.animate(
        [
          { transform: 'rotate(-4deg) scale(1)' },
          { transform: 'rotate(0deg) scale(0.96)' },
          { transform: 'rotate(-4deg) scale(1)' },
        ],
        { duration: 220, easing: 'ease-in-out' }
      );
    });
  }

  /* ── Скрытие резолюции у подвала, чтобы не перекрывала штамп ── */
  const footer = document.querySelector('.form-footer');

  if (resolution && footer && 'IntersectionObserver' in window) {
    const footerObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            resolution.style.opacity = '0';
            resolution.style.pointerEvents = 'none';
          } else {
            resolution.style.opacity = '';
            resolution.style.pointerEvents = '';
          }
        });
      },
      { threshold: 0.1 }
    );

    footerObs.observe(footer);
  }
})();
