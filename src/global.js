// Глобальные CSS-токены + сброс + адаптивные правила.
// Подключается одним <style> в корневом HTML.

const css = `
:root {
  --bg: #ece1c4;
  --paper: #f3eacf;
  --ink: #2a1d18;
  --ink-soft: #3a2a1c;
  --dim: #6b5942;
  --rule: #cdbe9c;
  --rule-dark: #3a2a1c;
  --accent: #8b2e1f;
  --accent-2: #b8862a;
  --cream: #e8d9a8;

  --ff-display: "Russo One", "Impact", "Arial Black", sans-serif;
  --ff-body: "PT Mono", "Courier New", monospace;
  --ff-hand: "Caveat", cursive;

  --pad-page-x: clamp(20px, 5vw, 56px);
  --gap-grid: clamp(24px, 4vw, 48px);
}

* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; background: var(--bg); color: var(--ink); font-family: var(--ff-body); }
img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
button { font: inherit; cursor: pointer; }
table { width: 100%; border-collapse: collapse; }

/* helpers */
.h-display { font-family: var(--ff-display); text-transform: uppercase; letter-spacing: 0.02em; line-height: 0.95; }
.h-mono    { font-family: var(--ff-body); letter-spacing: 0.2em; text-transform: uppercase; font-size: 11px; }
.h-hand    { font-family: var(--ff-hand); }

/* layout */
.page { width: 100%; max-width: 1280px; margin: 0 auto; position: relative; background: var(--bg); }
.page::before {
  content: ""; position: absolute; inset: 0; pointer-events: none; opacity: 0.6;
  background:
    radial-gradient(circle at 20% 10%, rgba(42,29,24,0.06), transparent 40%),
    radial-gradient(circle at 80% 60%, rgba(139,46,31,0.07), transparent 50%),
    radial-gradient(circle at 50% 90%, rgba(184,134,42,0.06), transparent 45%);
}
.page > * { position: relative; }

.pad   { padding: clamp(40px, 6vw, 72px) var(--pad-page-x); }
.pad-s { padding: clamp(24px, 4vw, 40px) var(--pad-page-x); }

/* stamps */
.stamp {
  display: inline-block; border: 2px solid var(--accent); color: var(--accent);
  padding: 4px 10px; font-family: var(--ff-display); font-size: 11px;
  letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.88; white-space: nowrap;
}

/* rule-row (label — line) */
.rule-row { display: flex; align-items: center; gap: 14px; margin: 0 0 14px; }
.rule-row .lbl { font: 11px/1 var(--ff-body); letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink); }
.rule-row .ln  { flex: 1; height: 1px; background: var(--rule-dark); }

/* responsive grid utilities */
.grid { display: grid; gap: var(--gap-grid); }
.cols-3-1-1 { grid-template-columns: 1fr 1px 1fr 1px 1fr; }
.cols-2-1   { grid-template-columns: 320px 1fr; }
.cols-1-1   { grid-template-columns: 1fr 1fr; }
.cols-2-1-2 { grid-template-columns: 2fr 1px 1fr; }
.cols-feat  { grid-template-columns: 1.2fr 1fr; }
.cols-hero  { grid-template-columns: 1.3fr 1fr; }

/* Mobile */
@media (max-width: 900px) {
  .cols-3-1-1, .cols-2-1, .cols-1-1, .cols-2-1-2, .cols-feat, .cols-hero {
    grid-template-columns: 1fr !important;
  }
  .cols-3-1-1 > .vrule, .cols-2-1-2 > .vrule { display: none; }
  .nav-links { display: none !important; }
}

@media (max-width: 640px) {
  .nameplate { font-size: clamp(72px, 22vw, 120px) !important; }
  .feature-h { font-size: clamp(36px, 9vw, 56px) !important; }
}

.vrule { background: var(--rule-dark); }

/* Mobile catalog tweaks */
@media (max-width: 560px) {
  .cat-writing { grid-template-columns: 1fr !important; }
  .cat-writing > div:first-of-type { aspect-ratio: 3 / 4 !important; max-height: 360px; }
  .cat-at { grid-template-columns: 60px 1fr !important; }
  .cat-at > div:last-of-type { display: none; }
}

/* current chapter (highlighted block) */
.now-block {
  margin: clamp(40px, 6vw, 60px) var(--pad-page-x);
  padding: clamp(32px, 5vw, 64px);
  background: var(--ink); color: var(--bg);
  position: relative; overflow: hidden;
}
.now-block .ghost {
  position: absolute; top: -80px; right: -40px;
  font-family: var(--ff-display); font-size: clamp(220px, 32vw, 380px);
  line-height: 1; color: rgba(236,225,196,0.05);
  text-transform: uppercase; pointer-events: none;
}
.now-block .scanlines {
  position: absolute; inset: 0; opacity: 0.05;
  background-image: repeating-linear-gradient(0deg, transparent 0 38px, rgba(236,225,196,0.5) 38px 39px);
  pointer-events: none;
}

/* paper card (white box on dark) */
.paper-card { background: var(--bg); color: var(--ink); padding: clamp(24px, 3vw, 32px); position: relative; }
`;

const tag = document.createElement('style');
tag.id = 'global-tokens';
tag.textContent = css;
if (!document.getElementById('global-tokens')) document.head.appendChild(tag);
