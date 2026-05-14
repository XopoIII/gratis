// Глобальные CSS-токены AI-lab оболочки + сброс + адаптивные правила.
// Подключается одним <style> в корневой index.html.
// Книжные лендинги (/navmor/, /rzhav/ и т.д.) НЕ используют эти токены —
// у них своя «бумажная» эстетика. Контраст намеренный.

const css = `
:root {
  /* Палитра — warm sumi (тёплый японский тушь) */
  --bg:        #1A1614;   /* warm sumi base */
  --bg-soft:   #211C19;   /* panels */
  --panel:     #1F1A17;
  --fg:        #EDE4D3;   /* kinari (небелёный шёлк) */
  --fg-soft:   #C9BFAE;
  --muted:     #8C8071;   /* rikyū-cha */
  --dim:       #5A5147;
  --rule:      #2A2420;
  --rule-soft: #3A332C;
  --hi:        #FAF3E2;

  /* Multi-accent — заменяет одноцветный "AI-зелёный" */
  --accent-amber: #FFB454;   /* prompts, brand cursor */
  --accent-shu:   #EB6101;   /* highlight/warning */
  --accent-cyan:  #7DD3C0;   /* links */
  --accent-rose:  #E08E79;   /* CTA */
  --accent-moegi: #AACF53;   /* success */

  /* Алиасы для совместимости с компонентами */
  --ink:       var(--fg);
  --ink-soft:  var(--fg-soft);
  --paper:     var(--bg-soft);
  --rule-dark: var(--rule-soft);
  --accent:    var(--accent-amber);
  --accent-2:  var(--muted);

  /* Шрифты — моно + humanist serif */
  --ff-display: "PT Mono", "JetBrains Mono", "Courier New", monospace;
  --ff-body:    "PT Mono", "JetBrains Mono", "Courier New", monospace;
  --ff-mono:    "PT Mono", "JetBrains Mono", "Courier New", monospace;
  --ff-serif:   "Newsreader", "Iowan Old Style", Georgia, serif;

  /* Сетка */
  --pad-page-x: clamp(20px, 5vw, 56px);
  --gap-grid:   clamp(24px, 4vw, 48px);

  /* Радиусы — нулевые, лабораторный стиль */
  --r: 0;
}

* { box-sizing: border-box; }
html, body {
  margin: 0; padding: 0;
  background: var(--bg);
  color: var(--fg);
  font-family: var(--ff-body);
  font-size: 14px;
  line-height: 1.55;
  overflow-x: clip;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body { max-width: 100vw; position: relative; }

/* Warm grain — лёгкая тёплая «плёнка» поверх фона */
body::before {
  content: "";
  position: fixed; inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.05;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>");
}

img { max-width: 100%; display: block; }
a   { color: inherit; text-decoration: none; }
a:hover { color: var(--accent-amber); }
button { font: inherit; cursor: pointer; background: transparent; color: var(--fg); border: 1px solid var(--rule-soft); }

/* Focus ring — тёплый, ненавязчивый */
:focus-visible {
  outline: 1px dashed var(--accent-amber);
  outline-offset: 2px;
}

/* Helpers */
.h-display { font-family: var(--ff-display); text-transform: uppercase; letter-spacing: 0.04em; line-height: 1.05; }
.h-mono    { font-family: var(--ff-mono);    text-transform: uppercase; letter-spacing: 0.22em; font-size: 11px; color: var(--muted); }
.h-hand    { font-family: var(--ff-serif);   font-style: italic; letter-spacing: 0; text-transform: none; }
.h-num     { font-variant-numeric: tabular-nums; }

/* Prompt-маркер — амбер-подсветка для «❯» и т.п. */
.prompt-amber { color: var(--accent-amber); }

/* Layout */
.page {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  position: relative;
  background: var(--bg);
}
.page > * { position: relative; }

.pad   { padding: clamp(40px, 6vw, 72px) var(--pad-page-x); }
.pad-s { padding: clamp(20px, 3vw, 32px) var(--pad-page-x); }

/* Sectioning rule */
.section-rule { border-bottom: 1px solid var(--rule); }

/* Stamps — узкие моно-чипы */
.stamp {
  display: inline-block;
  border: 1px solid var(--rule-soft);
  color: var(--fg-soft);
  padding: 4px 10px;
  font-family: var(--ff-mono);
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  background: transparent;
  white-space: nowrap;
}

/* Rule row — заголовок секции (label — line) */
.rule-row {
  display: flex; align-items: center; gap: 14px;
  margin: 0 0 18px;
}
.rule-row .lbl {
  font: 10px/1 var(--ff-mono);
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--muted);
}
.rule-row .ln { flex: 1; height: 1px; background: var(--rule-soft); }

/* Info-box — рамка лабораторного отчёта */
.box {
  border: 1px solid var(--rule-soft);
  background: transparent;
  padding: 18px 22px;
}
.box-row {
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: 14px;
  align-items: baseline;
  padding: 7px 0;
  font-family: var(--ff-mono);
  font-size: 13px;
}
.box-row + .box-row { border-top: 1px solid var(--rule); }
.box-row .k {
  color: var(--muted);
  letter-spacing: 0.18em;
  text-transform: lowercase;
}
.box-row .v {
  color: var(--fg);
}

/* Responsive grid utilities */
.grid { display: grid; gap: var(--gap-grid); }
.cols-3-1-1 { grid-template-columns: 1fr 1px 1fr 1px 1fr; }
.cols-2-1   { grid-template-columns: 320px 1fr; }
.cols-1-1   { grid-template-columns: 1fr 1fr; }
.cols-2-1-2 { grid-template-columns: 2fr 1px 1fr; }
.cols-feat  { grid-template-columns: 1.2fr 1fr; }
.cols-hero  { grid-template-columns: 1.3fr 1fr; }

.vrule { background: var(--rule-soft); }

@media (max-width: 900px) {
  .cols-3-1-1, .cols-2-1, .cols-1-1, .cols-2-1-2, .cols-feat, .cols-hero {
    grid-template-columns: 1fr !important;
  }
  .cols-3-1-1 > .vrule, .cols-2-1-2 > .vrule { display: none; }
  .nav-links { display: none !important; }
  .box-row { grid-template-columns: 110px 1fr; gap: 10px; font-size: 12px; }
}

@media (max-width: 640px) {
  .pad   { padding: clamp(28px, 6vw, 48px) clamp(16px, 4vw, 28px) !important; }
  .pad-s { padding: clamp(16px, 4vw, 24px) clamp(16px, 4vw, 28px) !important; }
  .box   { padding: 14px 16px; }
  .box-row { grid-template-columns: 1fr; gap: 2px; padding: 8px 0; }
  .box-row .k { font-size: 10px; }
}

/* Selection */
::selection {
  background: var(--accent-amber);
  color: var(--bg);
}

/* Scrollbar — ненавязчивый, тёплый */
* {
  scrollbar-width: thin;
  scrollbar-color: var(--rule-soft) transparent;
}
*::-webkit-scrollbar { width: 8px; height: 8px; }
*::-webkit-scrollbar-track { background: transparent; }
*::-webkit-scrollbar-thumb { background: var(--rule-soft); }
*::-webkit-scrollbar-thumb:hover { background: var(--accent-amber); }
`;

const tag = document.createElement('style');
tag.id = 'global-tokens';
tag.textContent = css;
if (!document.getElementById('global-tokens')) document.head.appendChild(tag);
