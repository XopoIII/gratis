(() => {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---------- REVEAL ----------

    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length && 'IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

        revealEls.forEach((el) => io.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add('is-visible'));
    }

    // ---------- SCROLLYTELLING ----------

    const scrolly = document.querySelector('.scrolly');
    if (scrolly && !prefersReducedMotion && 'IntersectionObserver' in window) {
        const frames = scrolly.querySelectorAll('.scrolly-frame');
        const steps = scrolly.querySelectorAll('.scrolly-step');

        const setActive = (index) => {
            frames.forEach((frame, i) => {
                frame.classList.toggle('is-active', i === index);
            });
        };

        const stepIO = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const step = parseInt(entry.target.dataset.step, 10);
                    if (!isNaN(step)) setActive(step - 1);
                }
            });
        }, { threshold: 0.5 });

        steps.forEach((step) => stepIO.observe(step));
    }

    // ---------- PROGRESS & LAST UPDATE ----------

    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const lastUpdateEl = document.getElementById('last-update');

    const formatRelative = (iso) => {
        const then = new Date(iso);
        const now = new Date();
        if (isNaN(then.getTime())) return '—';

        const diffMs = now - then;
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffDays < 0) return 'скоро';
        if (diffDays === 0) return 'сегодня';
        if (diffDays === 1) return 'вчера';
        if (diffDays < 7) return `${diffDays} дн. назад`;
        if (diffDays < 30) {
            const w = Math.floor(diffDays / 7);
            return `${w} нед. назад`;
        }
        const m = Math.floor(diffDays / 30);
        return `${m} мес. назад`;
    };

    fetch('config.json', { cache: 'no-cache' })
        .then((r) => r.ok ? r.json() : Promise.reject(r.status))
        .then((cfg) => {
            const b = cfg && cfg.book1;
            if (!b) return;

            if (progressText && b.writtenChapters != null && b.totalChapters) {
                progressText.textContent = `${b.writtenChapters} / ${b.totalChapters} глав`;
            }

            if (progressFill && b.writtenChapters != null && b.totalChapters) {
                const pct = Math.min(100, Math.round((b.writtenChapters / b.totalChapters) * 100));
                requestAnimationFrame(() => {
                    progressFill.style.width = pct + '%';
                });
            }

            if (lastUpdateEl && b.lastUpdate) {
                lastUpdateEl.textContent = formatRelative(b.lastUpdate);
            }
        })
        .catch(() => {
            if (progressFill) progressFill.style.width = '32%';
        });

    // ---------- FOOTNOTE: smooth scroll fallback for anchor CTAs ----------

    document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
            const id = a.getAttribute('href').slice(1);
            if (!id) return;
            const target = document.getElementById(id);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
        });
    });

})();
