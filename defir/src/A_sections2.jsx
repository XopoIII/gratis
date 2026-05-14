// VARIANT A · секции 6–10: factions / map / excerpt / devlog / cta
const D = window.DEFIR;
const { useState, useRef, useEffect } = React;
const { ABrick, APill, ASectionHeader, APhotoStub, aMono, aDisplay, aBody,
        A_FONT_DISPLAY, A_FONT_BODY, A_FONT_MONO, A_FONT_SERIF } = window.A_aux;

/* ─── Sigil — простые SVG-гербы фракций ───────────────────────────── */
function Sigil({ kind, size = 64, color = '#000', stroke = 3 }) {
  const s = stroke;
  switch (kind) {
    case 'shield':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size}>
          <path d="M32 4 L58 12 L58 32 Q58 50 32 60 Q6 50 6 32 L6 12 Z" fill="none" stroke={color} strokeWidth={s} strokeLinejoin="round" />
          <path d="M22 22 L42 22 L42 32 L32 42 L22 32 Z" fill={color} />
        </svg>
      );
    case 'tower':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size}>
          <rect x="22" y="14" width="20" height="46" fill="none" stroke={color} strokeWidth={s} />
          <rect x="14" y="6" width="36" height="10" fill={color} />
          <line x1="32" y1="14" x2="32" y2="60" stroke={color} strokeWidth={s} />
          <circle cx="32" cy="38" r="5" fill={color} />
        </svg>
      );
    case 'mask':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size}>
          <path d="M14 22 Q32 12 50 22 L52 38 Q44 56 32 56 Q20 56 12 38 Z" fill="none" stroke={color} strokeWidth={s} />
          <circle cx="24" cy="28" r="5" fill={color} />
          <circle cx="40" cy="28" r="5" fill={color} />
          <rect x="26" y="40" width="12" height="10" fill={color} />
        </svg>
      );
    case 'eye':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size}>
          <path d="M6 32 Q32 8 58 32 Q32 56 6 32 Z" fill="none" stroke={color} strokeWidth={s} />
          <circle cx="32" cy="32" r="10" fill={color} />
          <circle cx="36" cy="28" r="3" fill="#fff" />
        </svg>
      );
    case 'lens':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size}>
          <circle cx="26" cy="26" r="18" fill="none" stroke={color} strokeWidth={s} />
          <line x1="40" y1="40" x2="58" y2="58" stroke={color} strokeWidth={s + 1} strokeLinecap="round" />
          <path d="M14 26 L38 26 M26 14 L26 38" stroke={color} strokeWidth={s - 1} />
        </svg>
      );
    default: return null;
  }
}

/* ─── 05 · фракции (карточки богаче, hover-раскрытие) ─────────────── */
function AFactions({ t }) {
  const [active, setActive] = useState(null);
  const colors = [t.ink, t.accent, t.primary, t.quat, t.tertiary];
  const inks   = [t.paper, t.ink, t.ink, t.ink, t.ink];

  return (
    <section data-screen-label="05 · фракции" style={{
      padding: '72px clamp(20px, 4vw, 56px)',
      background: t.paper, borderTop: `${t.border * 2}px solid ${t.ink}`,
    }}>
      <ASectionHeader n="04" t="ПЯТЬ ФРАКЦИЙ." sub="dramatis personae · кто и зачем" theme={t} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
        {D.factions.map((f, i) => {
          const open = active === i;
          const bg = colors[i];
          const ink = inks[i];
          return (
            <button key={i}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              style={{
                textAlign: 'left', cursor: 'pointer',
                background: bg, color: ink,
                border: `${t.border}px solid ${t.ink}`,
                boxShadow: open ? `${t.shadow + 4}px ${t.shadow + 4}px 0 0 ${t.ink}` : `${t.shadow}px ${t.shadow}px 0 0 ${t.ink}`,
                padding: 20, minHeight: open ? 480 : 380,
                transform: open ? 'translate(-3px, -3px)' : 'none',
                transition: 'transform .2s, box-shadow .2s, min-height .25s',
                fontFamily: A_FONT_BODY, fontSize: 13, lineHeight: 1.45,
                position: 'relative',
              }}>
              <div style={{ position: 'absolute', top: -t.border, left: -t.border,
                background: bg === t.ink ? t.primary : t.ink, color: bg === t.ink ? t.ink : t.paper,
                border: `${t.border}px solid ${t.ink}`, padding: '4px 10px',
                ...aMono, fontSize: 10 }}>{f.code}</div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Sigil kind={f.sigil} size={56} color={ink} stroke={2.4} />
              </div>

              <div style={{ ...aDisplay, fontSize: 30, marginTop: 8, color: ink }}>{f.name}</div>
              <div style={{ ...aMono, fontSize: 10, marginTop: 6, opacity: .7 }}>{f.who}</div>
              <p style={{ margin: '14px 0 0', color: ink, fontWeight: 500 }}>{f.what}</p>

              {/* шкала опасности */}
              <div style={{ marginTop: 14 }}>
                <div style={{ ...aMono, fontSize: 9, opacity: .7, marginBottom: 4 }}>ОПАСНОСТЬ ДЛЯ ГЕРОЯ</div>
                <div style={{ display: 'flex', gap: 3 }}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <span key={n} style={{
                      flex: 1, height: 8,
                      background: n <= f.danger ? (bg === t.ink ? t.accent : t.ink) : 'transparent',
                      border: `1.5px solid ${ink}`,
                    }} />
                  ))}
                </div>
              </div>

              {/* девиз */}
              <div style={{
                marginTop: 14, paddingTop: 12,
                borderTop: `2px dashed ${ink}`,
                fontFamily: A_FONT_SERIF, fontStyle: 'italic', fontSize: 13, lineHeight: 1.35,
              }}>«{f.motto}»</div>

              {/* раскрытие при hover */}
              {open ? (
                <div style={{
                  marginTop: 14, paddingTop: 12, borderTop: `${t.border}px solid ${ink}`,
                  fontSize: 12, lineHeight: 1.5,
                }}>
                  <div style={{ ...aMono, fontSize: 9, marginBottom: 6, opacity: .7 }}>ЗАЧЕМ ОНИ → {f.why.toUpperCase()}</div>
                  {f.detail}
                </div>
              ) : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* ─── 06 · карта Владивостока ─────────────────────────────────────── */
function AMap({ t }) {
  const [hover, setHover] = useState(null);
  const factionColor = (f) => ({
    'ВЫШКИ': t.accent,
    'ЗАСЛОНКА': t.ink,
    'НЫРКИ': t.tertiary,
    'ФОНАРИКИ': t.quat,
    'НЮХАЧИ': t.primary,
  })[f] || t.paper2;

  const pin = hover != null ? D.vladivostok.pins[hover] : null;

  return (
    <section data-screen-label="06 · карта" style={{
      padding: '72px clamp(20px, 4vw, 56px)',
      background: t.ink, color: t.paper,
      borderTop: `${t.border * 2}px solid ${t.ink}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 32, flexWrap: 'wrap' }}>
        <span style={{ ...aDisplay, fontSize: 84, color: t.primary }}>05</span>
        <span style={{ ...aDisplay, fontSize: 'clamp(36px, 5vw, 64px)' }}>ВЛАДИВОСТОК.</span>
        <span style={{ ...aMono, opacity: .55, marginLeft: 'auto' }}>{D.vladivostok.base}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 24 }}>
        {/* карта */}
        <div style={{
          position: 'relative', aspectRatio: '4 / 3',
          background: t.paper, border: `${t.border}px solid ${t.paper}`,
          backgroundImage: `repeating-linear-gradient(0deg, transparent 0 39px, rgba(0,0,0,.06) 39px 40px), repeating-linear-gradient(90deg, transparent 0 39px, rgba(0,0,0,.06) 39px 40px)`,
        }}>
          {/* силуэт суши — стилизованные пятна */}
          <svg viewBox="0 0 100 75" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <path d="M5 25 Q15 15 30 18 Q42 14 50 22 Q60 18 70 24 Q80 26 86 22 L88 32 Q90 42 84 50 Q72 58 60 56 Q48 64 38 60 Q26 66 18 60 Q8 56 6 46 Z"
                  fill={t.paper2} stroke={t.ink} strokeWidth=".4" />
            {/* мост */}
            <line x1="50" y1="64" x2="62" y2="84" stroke={t.ink} strokeWidth=".8" strokeDasharray="2 1" />
          </svg>
          {/* туман — снизу */}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '40%',
            background: `linear-gradient(to top, rgba(196,240,74,.1), transparent)`,
            pointerEvents: 'none' }} />

          {/* пины */}
          {D.vladivostok.pins.map((p, i) => {
            const dangerous = p.h === 0;
            const sub = p.h < 120;
            return (
              <button key={i}
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                style={{
                  position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
                  transform: 'translate(-50%, -50%)',
                  background: factionColor(p.f),
                  color: factionColor(p.f) === t.ink ? t.paper : t.ink,
                  border: `${t.border - 1}px solid ${t.ink}`,
                  boxShadow: hover === i ? `4px 4px 0 0 ${t.ink}` : `2px 2px 0 0 ${t.ink}`,
                  padding: '4px 8px',
                  ...aMono, fontSize: 9, fontWeight: 700,
                  cursor: 'pointer',
                  zIndex: hover === i ? 10 : 1,
                  opacity: dangerous ? .85 : 1,
                }}>
                {dangerous ? '✕' : sub ? '◐' : '●'} {p.name} {p.h ? `· ${p.h}м` : ''}
              </button>
            );
          })}
        </div>

        {/* инфо-панель */}
        <div style={{ display: 'grid', gap: 14, alignContent: 'flex-start' }}>
          <div style={{ background: t.paper, color: t.ink, border: `${t.border}px solid ${t.paper}`, padding: 22 }}>
            {pin ? (
              <>
                <div style={{ ...aMono, fontSize: 11, color: t.accent, fontWeight: 700 }}>● {pin.f}</div>
                <div style={{ ...aDisplay, fontSize: 36, marginTop: 6 }}>{pin.name}</div>
                <div style={{ ...aMono, fontSize: 11, marginTop: 6, opacity: .65 }}>
                  ВЫСОТА · {pin.h ? `${pin.h} М НАД УРОВНЕМ МОРЯ` : 'НИЖЕ КРОМКИ ТУМАНА'}
                </div>
                <p style={{ ...aBody, fontSize: 14, lineHeight: 1.55, marginTop: 12, marginBottom: 0 }}>{pin.d}</p>
              </>
            ) : (
              <>
                <div style={{ ...aMono, fontSize: 11, color: t.accent }}>● НАВЕДИ КУРСОР НА ПИН</div>
                <div style={{ ...aDisplay, fontSize: 36, marginTop: 6 }}>ГОРОД В&nbsp;ТУМАНЕ.</div>
                <p style={{ ...aBody, fontSize: 14, lineHeight: 1.55, marginTop: 12, marginBottom: 0, opacity: .8 }}>
                  Туман стоит на 100–120 м. Всё, что ниже — глубина: рейды, добыча, потери.
                  Всё, что выше — анклавы: разные по укладу и опасности.
                </p>
              </>
            )}
          </div>

          {/* легенда */}
          <div style={{ background: t.paper, color: t.ink, border: `${t.border}px solid ${t.paper}`, padding: 16 }}>
            <div style={{ ...aMono, fontSize: 10, marginBottom: 10 }}>ЛЕГЕНДА</div>
            <div style={{ display: 'grid', gap: 6 }}>
              {[
                { sym: '●',  l: 'выше кромки · жилое' },
                { sym: '◐',  l: 'у кромки · опасно' },
                { sym: '✕',  l: 'на дне · не возвращаются' },
              ].map((l, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, ...aMono, fontSize: 11 }}>
                  <span style={{ width: 18, color: t.accent }}>{l.sym}</span>
                  <span style={{ textTransform: 'none', letterSpacing: 0, fontFamily: A_FONT_BODY, fontSize: 13 }}>{l.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 07 · фрагмент главы как тизер-открытка ──────────────────────── */
function AExcerpt({ t }) {
  return (
    <section data-screen-label="07 · фрагмент" style={{
      padding: '72px clamp(20px, 4vw, 56px)',
      background: t.paper2,
      borderTop: `${t.border * 2}px solid ${t.ink}`,
    }}>
      <ASectionHeader n="06" t="ФРАГМЕНТ ГЛАВЫ 01." sub="«рельсы» · черновик" theme={t} />

      {/* открытка */}
      <div style={{
        background: t.paper, border: `${t.border}px solid ${t.ink}`,
        boxShadow: `${t.shadow + 4}px ${t.shadow + 4}px 0 0 ${t.ink}`,
        padding: 0, transform: `rotate(${-t.tilt * 0.3}deg)`,
        maxWidth: 1080, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1.4fr',
      }}>
        {/* левая половина — «адрес» */}
        <div style={{ padding: 28, borderRight: `${t.border}px dashed ${t.ink}`, position: 'relative' }}>
          {/* марка */}
          <div style={{
            position: 'absolute', top: 18, right: 18,
            width: 88, height: 110,
            background: t.accent, border: `${t.border}px solid ${t.ink}`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            transform: 'rotate(2deg)',
            backgroundImage: `repeating-linear-gradient(45deg, transparent 0 5px, rgba(0,0,0,.08) 5px 6px)`,
          }}>
            <div style={{ ...aDisplay, fontSize: 36, lineHeight: 1 }}>01</div>
            <div style={{ ...aMono, fontSize: 8, marginTop: 4 }}>ГЛАВА</div>
            <div style={{ ...aMono, fontSize: 8 }}>★ ★ ★</div>
          </div>

          <div style={{ ...aMono, fontSize: 11, marginBottom: 10 }}>★ ОТКУДА</div>
          <div style={{ ...aDisplay, fontSize: 28 }}>МАРК «НОС»</div>
          <div style={{ ...aMono, fontSize: 11, opacity: .65, marginTop: 4 }}>ОРЛИНОЕ ГНЕЗДО · 199М</div>

          <div style={{ marginTop: 36, ...aMono, fontSize: 11 }}>★ КУДА</div>
          <div style={{ ...aDisplay, fontSize: 28 }}>РЕЛЬСЫ</div>
          <div style={{ ...aMono, fontSize: 11, opacity: .65, marginTop: 4 }}>КРОМКА · 92М · ОТЛИВ</div>

          {/* печать */}
          <div style={{
            marginTop: 40,
            display: 'inline-block',
            padding: '14px 18px',
            border: `${t.border}px double ${t.accent}`,
            color: t.accent,
            transform: 'rotate(-6deg)',
            ...aMono, fontSize: 11, fontWeight: 700,
          }}>
            ★ ЧЕРНОВИК · НЕ ОПУБЛИКОВАНО ★
          </div>

          <div style={{ marginTop: 18, ...aMono, fontSize: 10, opacity: .55 }}>
            СТАЯ · 4 / ФИЛЬТР · 180 МИН / ЦЕЛЬ · ОСКОЛОК
          </div>
        </div>

        {/* правая половина — текст */}
        <div style={{ padding: 32, background: t.paper }}>
          <div style={{ ...aMono, fontSize: 10, color: t.accent, marginBottom: 8 }}>★ ВЫДЕРЖКА ИЗ ЧЕРНОВИКА</div>
          <div style={{ fontFamily: A_FONT_SERIF, fontSize: 17, lineHeight: 1.7, columnCount: 1 }}>
            {D.excerpt.body.map((p, i) => (
              <p key={i} style={{ margin: i ? '14px 0 0' : 0,
                ...(i === 0 ? {
                  // дроп-кап для первого абзаца
                } : {})
              }}>
                {i === 0 ? (
                  <>
                    <span style={{ fontFamily: A_FONT_DISPLAY, fontSize: 64, lineHeight: .8, float: 'left', marginRight: 8, marginTop: 4, color: t.accent }}>
                      {p.charAt(0)}
                    </span>
                    {p.slice(1)}
                  </>
                ) : p}
              </p>
            ))}
          </div>
          <div style={{ marginTop: 22, paddingTop: 12, borderTop: `2px dashed ${t.ink}`, ...aMono, fontSize: 10, opacity: .6 }}>
            фрагмент главы 01 · может измениться
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 08 · devlog автора ──────────────────────────────────────────── */
function ADevlog({ t }) {
  return (
    <section data-screen-label="08 · devlog" style={{
      padding: '72px clamp(20px, 4vw, 56px)',
      borderTop: `${t.border * 2}px solid ${t.ink}`,
    }}>
      <ASectionHeader n="07" t="ЧТО Я ПИШУ ПРЯМО СЕЙЧАС." sub="дневник черновика" theme={t} />

      {/* счётчик «сейчас» */}
      <ABrick t={t} bg={t.ink} shadow={false} tilt={0} style={{ padding: 24, color: t.paper, marginBottom: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22, alignItems: 'flex-start' }}>
          <div>
            <div style={{ ...aMono, fontSize: 10, color: t.primary }}>ГЛАВА</div>
            <div style={{ ...aDisplay, fontSize: 24, marginTop: 4 }}>{D.now.chapter}</div>
          </div>
          <div>
            <div style={{ ...aMono, fontSize: 10, color: t.primary }}>СЦЕНА</div>
            <div style={{ ...aDisplay, fontSize: 24, marginTop: 4 }}>{D.now.scene}</div>
          </div>
          <div>
            <div style={{ ...aMono, fontSize: 10, color: t.primary }}>ОБЪЁМ</div>
            <div style={{ ...aDisplay, fontSize: 24, marginTop: 4 }}>{D.now.words}</div>
            <div style={{ ...aMono, fontSize: 10, opacity: .5, marginTop: 2 }}>{D.now.pace}</div>
          </div>
          <div>
            <div style={{ ...aMono, fontSize: 10, color: t.accent }}>★ БЛОКЕР</div>
            <div style={{ ...aBody, fontSize: 13, lineHeight: 1.45, marginTop: 4 }}>{D.now.blocker}</div>
          </div>
        </div>
      </ABrick>

      {/* записи */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        {D.devlog.map((d, i) => {
          const tagColor = { 'СЦЕНА': t.primary, 'МИР': t.quat, 'ПЕРСОНАЖ': t.tertiary, 'СТРУКТУРА': t.accent, 'ЯЗЫК': '#fff' }[d.tag] || t.paper;
          return (
            <ABrick key={i} t={t} bg={t.paper} shadow tilt={(i % 2 ? 1 : -1) * t.tilt * 0.3} style={{ padding: 22, position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ ...aMono, fontSize: 11 }}>{d.date}</span>
                <span style={{ ...aMono, fontSize: 10, background: tagColor, color: t.ink, border: `${t.border - 1}px solid ${t.ink}`, padding: '2px 8px', fontWeight: 700 }}>{d.tag}</span>
              </div>
              <div style={{ ...aDisplay, fontSize: 22, lineHeight: 1, marginBottom: 10 }}>{d.t.toUpperCase()}.</div>
              <p style={{ ...aBody, fontSize: 14, lineHeight: 1.5, margin: 0 }}>{d.body}</p>
            </ABrick>
          );
        })}
      </div>
    </section>
  );
}

/* ─── 09 · CTA встроенная в нарратив ──────────────────────────────── */
function ACta({ t }) {
  return (
    <section data-screen-label="09 · cta" style={{
      padding: '88px clamp(20px, 4vw, 56px) 64px',
      borderTop: `${t.border * 2}px solid ${t.ink}`,
      background: t.primary,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* нарративная строка → переход в кнопку */}
      <div style={{ ...aMono, fontSize: 12, marginBottom: 18, color: t.ink }}>★ КОНЕЦ ВЫПУСКА · СЕЙЧАС</div>

      <h2 style={{ ...aDisplay, margin: 0, fontSize: 'clamp(56px, 9vw, 140px)', color: t.ink, maxWidth: '14ch' }}>
        ПОКА ВЫ ЧИТАЛИ —<br />
        Я НАПИСАЛ
      </h2>

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginTop: 8, flexWrap: 'wrap' }}>
        <span style={{ ...aDisplay, fontSize: 'clamp(56px, 9vw, 140px)', color: t.ink }}>
          ЕЩЁ
        </span>
        {/* кнопка прямо в строке */}
        <a href={D.cta.href} target="_blank" rel="noreferrer" style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          background: t.ink, color: t.primary,
          border: `${t.border + 1}px solid ${t.ink}`,
          boxShadow: `${t.shadow + 6}px ${t.shadow + 6}px 0 0 ${t.accent}`,
          padding: '14px 24px',
          ...aDisplay, fontSize: 'clamp(40px, 6vw, 88px)', lineHeight: .9,
          textDecoration: 'none', cursor: 'pointer',
          transform: `rotate(${t.tilt}deg)`,
        }}>
          800 СЛОВ →
        </a>
      </div>

      <h2 style={{ ...aDisplay, margin: '12px 0 0', fontSize: 'clamp(56px, 9vw, 140px)', color: t.ink }}>
        ГЛАВЫ&nbsp;01.
      </h2>

      <p style={{
        ...aBody, fontSize: 19, lineHeight: 1.5, color: t.ink,
        margin: '36px 0 0', maxWidth: '54ch', fontWeight: 500,
      }}>
        Это не «жми лайк». Это рабочий кабинет с распахнутой дверью. Author.Today публикует главы по мере готовности. Бесплатно. С возможностью комментировать каждую сцену — и быть услышанным до того, как это станет книгой.
      </p>

      <div style={{ marginTop: 36, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <a href={D.cta.href} target="_blank" rel="noreferrer" style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          background: t.ink, color: t.paper,
          border: `${t.border}px solid ${t.ink}`,
          boxShadow: `${t.shadow}px ${t.shadow}px 0 0 ${t.accent}`,
          padding: '18px 26px',
          ...aMono, fontSize: 13, fontWeight: 700,
        }}>
          ★ {D.cta.label.toUpperCase()} →
        </a>
        <a href={D.author.href} style={{
          ...aMono, fontSize: 12, color: t.ink, textDecoration: 'underline',
        }}>
          ИЛИ → СТРАНИЦА АВТОРА
        </a>
      </div>

      {/* нижняя «выходная» строка */}
      <div style={{
        marginTop: 56, paddingTop: 22,
        borderTop: `${t.border}px solid ${t.ink}`,
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
        ...aMono, fontSize: 11,
      }}>
        <span>дэфир ★ 2025 ★ рабочее название ★ агатис интегра</span>
        <span style={{ background: t.ink, color: t.primary, padding: '3px 10px' }}>● REC · ИДЁТ ЗАПИСЬ</span>
      </div>
    </section>
  );
}

window.A_sec2 = { AFactions, AMap, AExcerpt, ADevlog, ACta };
