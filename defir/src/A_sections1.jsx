// VARIANT A · секции 1–5: top bar / hero / triggers / rules-anchor / dossier
const D = window.DEFIR;
const { useState, useRef, useEffect } = React;
const { ABrick, APill, ASectionHeader, APhotoStub, aMono, aDisplay, aBody,
        A_FONT_DISPLAY, A_FONT_BODY, A_FONT_MONO, A_FONT_SERIF } = window.A_aux;

/* ─── 00 · top bar ────────────────────────────────────────────────── */
function ATopBar({ t }) {
  return (
    <div style={{
      padding: '14px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      borderBottom: `${t.border}px solid ${t.ink}`, background: t.ink, color: t.paper, gap: 24, flexWrap: 'wrap',
    }}>
      <span style={{ ...aDisplay, fontSize: 26 }}>ДЭФИР★</span>
      <div style={{ display: 'flex', gap: 18, ...aMono, color: t.paper, alignItems: 'center', flexWrap: 'wrap' }}>
        <span>43°06′58″N</span>
        <span>· 131°52′25″E</span>
        <span style={{ background: t.primary, color: t.ink, padding: '3px 9px' }}>● ИДЕЯ · ГЛАВА 01</span>
        <span style={{ opacity: .5 }}>{D.now.words}</span>
      </div>
      <a href={D.cta.href} target="_blank" rel="noreferrer" style={{ ...aMono, color: t.primary }}>СЛЕДИТЬ →</a>
    </div>
  );
}

/* ─── 01 · hero (typography play) ─────────────────────────────────── */
function AHero({ t }) {
  // outline стиль для слова
  const outline = {
    color: 'transparent',
    WebkitTextStroke: `2px ${t.ink}`,
    textStroke: `2px ${t.ink}`,
  };
  return (
    <section data-screen-label="01 · hero" style={{
      padding: '64px clamp(20px, 4vw, 56px) 48px', position: 'relative', overflow: 'hidden',
    }}>
      {/* фоновая «2025» как кирпич */}
      <div aria-hidden style={{
        position: 'absolute', right: -40, bottom: -120, ...aDisplay,
        fontSize: 'clamp(360px, 50vw, 720px)', color: t.paper2, lineHeight: .8, pointerEvents: 'none',
        userSelect: 'none', zIndex: 0,
      }}>2025</div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* плашка */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 14px',
          background: t.accent, color: t.ink,
          border: `${t.border}px solid ${t.ink}`,
          boxShadow: `${Math.max(0, t.shadow - 3)}px ${Math.max(0, t.shadow - 3)}px 0 0 ${t.ink}`,
          ...aMono, fontSize: 13, marginBottom: 32,
        }}>
          ★ РАБОЧЕЕ НАЗВАНИЕ · ПОСТАП · 18+
        </div>

        {/* заголовок: outline + filled + поворот */}
        <h1 style={{ ...aDisplay, margin: 0, fontSize: 'clamp(64px, 13vw, 200px)' }}>
          <span style={{ display: 'block' }}>
            <span style={outline}>ТУМАН</span>
          </span>
          <span style={{ display: 'inline-block', background: t.primary, padding: '0 .12em',
            border: `${t.border + 1}px solid ${t.ink}`,
            boxShadow: `${t.shadow + 4}px ${t.shadow + 4}px 0 0 ${t.ink}`,
            transform: `rotate(${-t.tilt}deg)`, marginTop: 4,
          }}>ПОДНЯЛСЯ</span>
          <br />
          <span style={{ display: 'inline-block', marginTop: 12 }}>
            И&nbsp;<span style={outline}>ОСТАЛСЯ.</span>
          </span>
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 40, marginTop: 56, alignItems: 'flex-end' }}>
          <p style={{ fontSize: 22, lineHeight: 1.4, margin: 0, maxWidth: '46ch', ...aBody, color: t.ink }}>
            {D.hero.sub}
          </p>
          <ABrick t={t} bg={t.primary} shadow tilt={-t.tilt * 0.4}>
            <div style={{ ...aMono, fontSize: 11, marginBottom: 6 }}>ИДЕЯ → ЧЕРНОВИК</div>
            <div style={{ ...aDisplay, fontSize: 'clamp(28px, 3vw, 36px)', lineHeight: 1, marginBottom: 12 }}>
              СЛЕДИТЬ ЗА<br />ГЛАВОЙ 01.
            </div>
            <a href={D.cta.href} target="_blank" rel="noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '14px 18px', background: t.ink, color: t.primary,
              ...aMono, fontSize: 13, fontWeight: 700,
              border: `${t.border}px solid ${t.ink}`,
            }}>{D.cta.label.toUpperCase()} →</a>
            <div style={{ ...aMono, marginTop: 10, fontSize: 10, opacity: .7 }}>{D.cta.sub}</div>
          </ABrick>
        </div>

        {/* now-индикатор: что прямо сейчас на столе у автора */}
        <div style={{
          marginTop: 56, display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gap: 0, alignItems: 'stretch',
          border: `${t.border}px solid ${t.ink}`,
          background: t.ink, color: t.paper,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '14px 18px', background: t.primary, color: t.ink,
            borderRight: `${t.border}px solid ${t.ink}`,
            ...aMono, fontSize: 12, fontWeight: 700,
          }}>
            <span style={{
              width: 10, height: 10, background: t.accent, borderRadius: '50%',
              display: 'inline-block',
              animation: 'a-pulse 1.6s ease-in-out infinite',
            }} />
            ● СЕЙЧАС НА СТОЛЕ
          </div>
          <div style={{ padding: '14px 22px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ ...aMono, fontSize: 12, color: t.primary, fontWeight: 700 }}>
              {D.now.chapter} · {D.now.scene}
            </div>
            <div style={{ ...aBody, fontSize: 14, lineHeight: 1.4, opacity: .9 }}>
              застрял: {D.now.blocker}
            </div>
          </div>
          <div style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            alignItems: 'flex-end', padding: '14px 22px',
            borderLeft: `${t.border}px solid ${t.paper}`, gap: 2,
          }}>
            <div style={{ ...aDisplay, fontSize: 24, color: t.primary }}>{D.now.words.split(' / ')[0]}</div>
            <div style={{ ...aMono, fontSize: 10, opacity: .6 }}>из {D.now.words.split(' / ')[1]} слов · {D.now.pace}</div>
          </div>
        </div>
        <style>{`@keyframes a-pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: .35; transform: scale(.7); } }`}</style>
      </div>
    </section>
  );
}

/* ─── 02 · триггеры (отдельный блок) ──────────────────────────────── */
function ATriggers({ t }) {
  const colorByWeight = {
    hard: t.accent,
    med:  t.tertiary,
    soft: t.paper,
  };
  return (
    <section data-screen-label="02 · триггеры" style={{
      padding: '40px clamp(20px, 4vw, 56px)',
      borderTop: `${t.border * 2}px solid ${t.ink}`,
      borderBottom: `${t.border * 2}px solid ${t.ink}`,
      background: t.ink, color: t.paper,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 22, flexWrap: 'wrap' }}>
        <span style={{ ...aDisplay, fontSize: 64, color: t.accent }}>!</span>
        <span style={{ ...aDisplay, fontSize: 'clamp(28px, 4vw, 44px)' }}>ПЕРЕД ВХОДОМ.</span>
        <span style={{ ...aMono, opacity: .6, marginLeft: 'auto' }}>триггер-варнинги · черновик</span>
      </div>
      <p style={{ ...aBody, fontSize: 16, lineHeight: 1.5, maxWidth: '64ch', margin: '0 0 24px', opacity: .8 }}>
        ДЭФИР — постап / литФрп для взрослых. Это не приключенческое чтиво. Список — для тех, кто хочет понять, во что подписывается. Жирные — это будет. Регулярные — будет, но дозировано. Тонкие — стилистика.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {D.triggersGrouped.map((tr, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 14px', background: colorByWeight[tr.weight], color: t.ink,
            border: `${t.border}px solid ${tr.weight === 'soft' ? t.paper : t.ink}`,
            ...aMono, fontSize: 12,
            fontWeight: tr.weight === 'hard' ? 700 : 400,
          }}>
            {tr.weight === 'hard' ? '★ ' : tr.weight === 'med' ? '· ' : '∘ '}
            {tr.label}
            <span style={{ opacity: .65, marginLeft: 6, textTransform: 'none', letterSpacing: 0, fontFamily: A_FONT_BODY, fontWeight: 400, fontSize: 12 }}>
              — {tr.desc}
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ─── 03 · правила эфира как центральный якорь (диаграмма высот) ──── */
function ARules({ t }) {
  // вертикальная диаграмма: чем ниже — тем плотнее туман
  const colors = [t.primary, t.accent, t.tertiary, t.quat];
  return (
    <section data-screen-label="03 · правила-якорь" style={{
      padding: '72px clamp(20px, 4vw, 56px)', background: t.paper2,
      borderBottom: `${t.border * 2}px solid ${t.ink}`,
    }}>
      <ASectionHeader n="02" t="4 ПРАВИЛА ЭФИРА." sub="физика мира" theme={t} />
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 36, alignItems: 'flex-start' }}>
        {/* диаграмма вертикали */}
        <ABrick t={t} bg={t.paper} shadow tilt={0} style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: 18, borderBottom: `${t.border}px solid ${t.ink}`, ...aMono, fontSize: 11 }}>
            ВЕРТИКАЛЬ · 0 — 500 М
          </div>
          <div style={{ position: 'relative', height: 460 }}>
            {/* градиент тумана */}
            <div style={{ position: 'absolute', inset: 0,
              background: `linear-gradient(to top, ${t.ink} 0%, ${t.ink} 18%, rgba(10,10,10,.7) 22%, rgba(10,10,10,.35) 40%, rgba(10,10,10,.1) 60%, transparent 75%)`,
            }} />
            {/* отметки высот */}
            {[
              { h: 0,   label: 'ДНО · 0м',           note: 'не работают приборы', dot: t.accent,   zone: 'deep'  },
              { h: 92,  label: 'КРОМКА · 92м',        note: 'нырки по пояс',       dot: t.accent,   zone: 'deep'  },
              { h: 199, label: 'ОРЛ. ГНЕЗДО · 199м',  note: 'дом Марка',           dot: t.primary,  zone: 'mid'   },
              { h: 257, label: 'ХОЛОДИЛЬНИК · 257м',  note: 'военный форт',        dot: t.primary,  zone: 'mid'   },
              { h: 426, label: 'ПОПОВА · 426м',       note: 'элита Вышек',         dot: t.primary,  zone: 'top'   },
            ].map((m, i) => {
              const top = 100 - (m.h / 500) * 100;
              // на нижних 25% фон — почти чёрный → текст белый;
              // на верхних 75% фон светлеет → текст чёрный
              const onDark = m.zone === 'deep';
              const txtColor = onDark ? '#fff' : t.ink;
              return (
                <div key={i} style={{
                  position: 'absolute', left: 8, right: 8, top: `${top}%`,
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <span style={{
                    width: 10, height: 10, background: m.dot,
                    border: `1.5px solid ${onDark ? '#fff' : t.ink}`,
                    flexShrink: 0,
                  }} />
                  <span style={{
                    ...aMono, fontSize: 10, fontWeight: 700, whiteSpace: 'nowrap',
                    color: txtColor,
                    background: onDark ? 'rgba(0,0,0,.35)' : 'rgba(241,237,225,.8)',
                    padding: '2px 6px',
                  }}>{m.label}</span>
                  <span style={{
                    ...aMono, fontSize: 9, whiteSpace: 'nowrap',
                    color: txtColor, opacity: .8,
                  }}>· {m.note}</span>
                </div>
              );
            })}
            {/* вода */}
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '8%',
              background: `repeating-linear-gradient(45deg, ${t.quat} 0 4px, ${t.ink} 4px 6px)`, opacity: .6 }} />
          </div>
          <div style={{ padding: '12px 18px', borderTop: `${t.border}px solid ${t.ink}`, ...aMono, fontSize: 10, opacity: .65 }}>
            ↑ ЖИЗНЬ · ↓ ТУМАН · ↓↓ СМЕРТЬ
          </div>
        </ABrick>

        {/* четыре правила */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
          {D.rules.map((r, i) => (
            <ABrick key={i} t={t} bg={colors[i]} shadow tilt={i % 2 ? t.tilt * 0.5 : -t.tilt * 0.4} style={{ padding: 28, minHeight: 220 }} label={`№${r.n}`}>
              <div style={{ ...aDisplay, fontSize: 'clamp(28px, 3vw, 38px)', marginTop: 4 }}>{r.t}</div>
              <p style={{ margin: '14px 0 0', ...aBody, fontSize: 15, lineHeight: 1.5, fontWeight: 500, color: t.ink }}>{r.d}</p>
            </ABrick>
          ))}
        </div>
      </div>

      {/* нижний инсет: фильтр-таймер */}
      <div style={{ marginTop: 36, padding: '16px 22px', background: t.ink, color: t.paper,
        border: `${t.border}px solid ${t.ink}`, display: 'grid', gridTemplateColumns: 'auto repeat(4, 1fr)', gap: 18, alignItems: 'center' }}>
        <span style={{ ...aMono, color: t.primary }}>★ ФИЛЬТР · 180 МИН</span>
        {D.filter.map((f, i) => (
          <div key={i} style={{ borderLeft: i ? `1px dashed ${t.paper}` : 'none', paddingLeft: i ? 14 : 0 }}>
            <div style={{ ...aMono, fontSize: 10, opacity: .55 }}>{f.stage}</div>
            <div style={{ ...aMono, fontSize: 12, fontWeight: 700, color: i === 2 ? t.accent : (i === 3 ? t.accent : t.paper) }}>
              {f.taste} · {f.left}
            </div>
            <div style={{ ...aBody, fontSize: 11, opacity: .65, marginTop: 2 }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── 04 · досье Марка (газетная анатомия) ────────────────────────── */
function ADossier({ t }) {
  const inv = D.markDossier.inventory;
  return (
    <section data-screen-label="04 · досье Марка" style={{ padding: '72px clamp(20px, 4vw, 56px)' }}>
      <ASectionHeader n="03" t="ГЕРОЙ." sub="субъект 01 · нырок" theme={t} />

      {/* верхний блок: имя + фото + базовый блок */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 28, marginBottom: 28 }}>
        <div>
          <div style={{ ...aMono, fontSize: 12, color: t.ink, opacity: .6 }}>СУБЪЕКТ · 01</div>
          <div style={{ ...aDisplay, fontSize: 'clamp(80px, 11vw, 160px)', lineHeight: .85 }}>
            МАРК
          </div>
          <div style={{ ...aDisplay, fontSize: 'clamp(36px, 4vw, 56px)', color: t.accent, marginTop: -10 }}>
            «НОС».
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 18 }}>
            <APill t={t} bg={t.primary} intense>27 ЛЕТ</APill>
            <APill t={t} bg={t.paper}>НЫРОК</APill>
            <APill t={t} bg={t.paper}>3 ГОДА В ТУМАНЕ</APill>
            <APill t={t} bg={t.paper}>ОРЛИНОЕ ГНЕЗДО · 199М</APill>
          </div>
        </div>

        <APhotoStub label="МАРК · ПОРТРЕТ В ГП-7" ratio="3 / 4" t={t} fill={t.paper} stamp="★ ФОТО БУДЕТ" />
      </div>

      {/* три блока: талант / изъян / цель */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginBottom: 28 }}>
        {[
          { name: 'ТАЛАНТ',  bg: t.primary,  text: D.markDossier.talent.desc },
          { name: 'ИЗЪЯН',   bg: t.accent,   text: D.markDossier.flaw.desc },
          { name: 'ЦЕЛЬ',    bg: t.tertiary, text: D.markDossier.goal.desc },
        ].map((b, i) => (
          <ABrick key={i} t={t} bg={b.bg} shadow tilt={(i - 1) * t.tilt * 0.4} style={{ padding: 24, minHeight: 220 }}>
            <div style={{ ...aMono, fontSize: 11, fontWeight: 700, marginBottom: 10 }}>{b.name}</div>
            <p style={{ ...aBody, fontSize: 14, lineHeight: 1.55, color: t.ink, margin: 0 }}>{b.text}</p>
          </ABrick>
        ))}
      </div>

      {/* анатомия: 6 слоёв инвентаря с привязкой к телу */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 28, alignItems: 'flex-start' }}>
        <ABrick t={t} bg={t.paper} shadow={false} tilt={0} style={{ padding: 0 }}>
          <div style={{ padding: 14, borderBottom: `${t.border}px solid ${t.ink}`, ...aMono, fontSize: 11 }}>
            АНАТОМИЯ · ЧТО НА НЁМ ★
          </div>
          {/* схематичный силуэт */}
          <div style={{ position: 'relative', padding: '28px 20px', minHeight: 460 }}>
            <svg viewBox="0 0 200 480" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 24, height: 420, opacity: .9 }}>
              <g fill="none" stroke={t.ink} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
                {/* голова + маска */}
                <ellipse cx="100" cy="60" rx="40" ry="46" />
                <circle cx="86" cy="60" r="11" fill={t.paper} />
                <circle cx="114" cy="60" r="11" fill={t.paper} />
                <path d="M75 88 Q100 110 125 88 Q120 102 100 104 Q80 102 75 88 Z" fill={t.paper} />
                {/* шея */}
                <line x1="100" y1="106" x2="100" y2="130" />
                {/* плащ */}
                <path d="M40 130 L160 130 L180 360 L20 360 Z" fill={t.paper} />
                {/* пояс */}
                <line x1="34" y1="270" x2="166" y2="270" strokeWidth="3" />
                {/* кукла на поясе */}
                <rect x="120" y="266" width="14" height="22" fill={t.tertiary} stroke={t.ink} />
                {/* нога */}
                <line x1="80" y1="360" x2="74" y2="450" />
                <line x1="120" y1="360" x2="126" y2="450" />
                {/* ботинки */}
                <rect x="64" y="450" width="22" height="14" fill={t.ink} />
                <rect x="116" y="450" width="22" height="14" fill={t.ink} />
              </g>
            </svg>
            {/* мраморный узор на крыле носа — точка */}
            <span style={{ position: 'absolute', top: 70, left: '50%', transform: 'translate(-50%, 0)', display: 'block', width: 16, height: 4, background: t.accent, border: `1.5px solid ${t.ink}`, transform: 'translate(8px, 0) rotate(-20deg)' }} />
          </div>
        </ABrick>

        <div style={{ display: 'grid', gap: 12 }}>
          {inv.map((it, i) => (
            <ABrick key={i} t={t} bg={i === 2 ? t.primary : (i === 5 ? t.accent : t.paper)}
                    shadow tilt={i % 2 ? t.tilt * 0.3 : -t.tilt * 0.25} style={{ padding: '14px 18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ ...aDisplay, fontSize: 36, color: t.ink, lineHeight: .8 }}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <div style={{ ...aMono, fontSize: 11, fontWeight: 700 }}>{it.k.toUpperCase()}</div>
                  <div style={{ ...aBody, fontSize: 14, lineHeight: 1.45, marginTop: 2 }}>{it.v}</div>
                </div>
              </div>
            </ABrick>
          ))}

          {/* цитата */}
          <ABrick t={t} bg={t.ink} shadow={false} tilt={0} style={{ padding: 22, color: t.paper }}>
            <div style={{ ...aMono, fontSize: 10, color: t.primary, marginBottom: 8 }}>ЦИТАТА · НЫРКИ</div>
            <p style={{ ...aBody, fontFamily: A_FONT_SERIF, fontStyle: 'italic', margin: 0, fontSize: 17, lineHeight: 1.55, color: t.paper }}>
              {D.markDossier.quote}
            </p>
          </ABrick>
        </div>
      </div>
    </section>
  );
}

window.A_sec1 = { ATopBar, AHero, ATriggers, ARules, ADossier };
