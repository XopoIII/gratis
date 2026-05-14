// ВАРИАНТ A — НЕО-БРУТАЛИЗМ · ДЭФИР · версия 2 (детальная проработка)
// 9 секций: hero / триггеры / правила-якорь / досье Марка / фракции /
// карта Владивостока / фрагмент-открытка / devlog / cta-нарратив

const D = window.DEFIR;
const { useState, useEffect, useRef } = React;

/* ═══════════════════════════ ТОКЕНЫ И TWEAKS ════════════════════════════ */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "scheme": "lime",
  "tilt": 1.2,
  "shadow": 8,
  "tone": "balanced"
}/*EDITMODE-END*/;

const SCHEMES = {
  lime:   { primary: '#c4f04a', accent: '#ff5f1f', tertiary: '#ff8aa1', quat: '#0fa48a' },
  orange: { primary: '#ff5f1f', accent: '#c4f04a', tertiary: '#ff8aa1', quat: '#0fa48a' },
  rose:   { primary: '#ff8aa1', accent: '#c4f04a', tertiary: '#ff5f1f', quat: '#0fa48a' },
};

function useATokens() {
  const [values, setTweak] = window.useTweaks
    ? window.useTweaks(TWEAK_DEFAULTS)
    : [TWEAK_DEFAULTS, () => {}];
  const sc = SCHEMES[values.scheme] || SCHEMES.lime;
  const harsh = values.tone === 'harsh';
  const soft  = values.tone === 'soft';
  return {
    values, setTweak,
    t: {
      ink:    harsh ? '#000' : '#0a0a0a',
      paper:  soft ? '#f6f3e8' : '#f1ede1',
      paper2: soft ? '#ece7d6' : '#e6dfca',
      primary:   sc.primary,
      accent:    sc.accent,
      tertiary:  sc.tertiary,
      quat:      sc.quat,
      border:    harsh ? 4 : (soft ? 2 : 3),
      shadow:    Math.max(0, values.shadow ?? 8),
      tilt:      values.tilt ?? 1.2,
    },
  };
}

/* ═══════════════════════════ БАЗОВЫЕ ПРИМИТИВЫ ══════════════════════════ */

const A_FONT_DISPLAY = '"Bowlby One", Impact, sans-serif';
const A_FONT_BODY    = '"Space Grotesk", system-ui, sans-serif';
const A_FONT_MONO    = '"DM Mono", "JetBrains Mono", monospace';
const A_FONT_SERIF   = '"PT Serif", Georgia, serif';

const aMono = { fontFamily: A_FONT_MONO, fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase' };
const aDisplay = { fontFamily: A_FONT_DISPLAY, fontWeight: 400, lineHeight: .9, letterSpacing: '-.01em', textTransform: 'uppercase' };
const aBody = { fontFamily: A_FONT_BODY };

function ABrick({ children, bg = '#fff', shadow = true, tilt = 0, t, style, label, accent }) {
  const border = `${t.border}px solid ${t.ink}`;
  const sh = shadow ? `${t.shadow}px ${t.shadow}px 0 0 ${t.ink}` : 'none';
  return (
    <div style={{
      background: bg, border, boxShadow: sh, padding: 24,
      transform: tilt ? `rotate(${tilt}deg)` : undefined,
      position: 'relative',
      transition: 'transform .2s ease, box-shadow .2s ease',
      ...style,
    }}>
      {label ? (
        <div style={{
          position: 'absolute', top: -t.border, right: -t.border,
          background: accent || t.ink, color: accent ? t.ink : t.paper,
          border, padding: '4px 10px', ...aMono, fontSize: 10,
        }}>{label}</div>
      ) : null}
      {children}
    </div>
  );
}

function APill({ children, bg, t, intense }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', padding: '4px 10px',
      background: bg || t.paper, border: `2px solid ${t.ink}`, color: t.ink,
      ...aMono, fontSize: 11, fontWeight: intense ? 700 : 400,
      lineHeight: 1.4,
    }}>{children}</span>
  );
}

function ASectionHeader({ n, t: rt, sub, t: _t, theme }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 32, flexWrap: 'wrap' }}>
      <span style={{ ...aDisplay, fontSize: 84, color: theme.ink, lineHeight: .85 }}>{n}</span>
      <span style={{ ...aDisplay, fontSize: 'clamp(36px, 5vw, 64px)', color: theme.ink }}>{rt}</span>
      {sub ? <span style={{ ...aMono, color: theme.ink, opacity: .6, marginLeft: 'auto' }}>{sub}</span> : null}
    </div>
  );
}

function APhotoStub({ label, ratio = '4 / 3', t, fill = '#fff', stamp }) {
  const border = `${t.border}px solid ${t.ink}`;
  return (
    <div style={{
      aspectRatio: ratio, background: fill, border, position: 'relative', overflow: 'hidden',
      backgroundImage: `repeating-linear-gradient(45deg, transparent 0 18px, rgba(0,0,0,.04) 18px 19px)`,
    }}>
      {/* угловые засечки кадра */}
      {[
        { top: 8, left: 8 }, { top: 8, right: 8 }, { bottom: 8, left: 8 }, { bottom: 8, right: 8 },
      ].map((c, i) => (
        <span key={i} style={{ position: 'absolute', width: 16, height: 16, borderColor: t.ink, borderStyle: 'solid', borderWidth: 0,
          ...(c.top !== undefined ? { top: c.top, borderTopWidth: t.border } : {}),
          ...(c.bottom !== undefined ? { bottom: c.bottom, borderBottomWidth: t.border } : {}),
          ...(c.left !== undefined ? { left: c.left, borderLeftWidth: t.border } : {}),
          ...(c.right !== undefined ? { right: c.right, borderRightWidth: t.border } : {}),
        }} />
      ))}
      {/* центральный X */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: '14%', opacity: .2 }}>
        <line x1="0" y1="0" x2="100" y2="100" stroke={t.ink} strokeWidth="1.2" />
        <line x1="100" y1="0" x2="0" y2="100" stroke={t.ink} strokeWidth="1.2" />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 6, ...aMono, color: t.ink }}>
        <span style={{ fontSize: 11, opacity: .5 }}>★ ФОТО БУДЕТ ★</span>
        <span style={{ fontSize: 13, fontWeight: 700 }}>{label}</span>
      </div>
      {stamp ? (
        <div style={{ position: 'absolute', bottom: -t.border, left: 22, background: t.ink, color: t.paper, padding: '4px 10px', ...aMono, fontSize: 10, transform: 'rotate(-1deg)' }}>{stamp}</div>
      ) : null}
    </div>
  );
}

window.A_aux = { ABrick, APill, ASectionHeader, APhotoStub, aMono, aDisplay, aBody, useATokens, A_FONT_DISPLAY, A_FONT_BODY, A_FONT_MONO, A_FONT_SERIF };
