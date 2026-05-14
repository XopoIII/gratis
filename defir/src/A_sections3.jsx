// VARIANT A · секции дополнения: filter / crystals / signature / parts
const D = window.DEFIR;
const { useState, useEffect, useRef } = React;
const { ABrick, APill, ASectionHeader, aMono, aDisplay, aBody } = window.A_aux;

/* ─── ФИЛЬТР · стадии с обратным отсчётом ─────────────────────────── */
function AFilter({ t }) {
  // визуально: горизонтальная шкала с 4 «делениями» износа
  // каждое деление — карточка-пилюля с состоянием
  const stages = D.filter;
  const colorByStage = [t.quat, t.primary, t.tertiary, t.accent];

  return (
    <section data-screen-label="07 · фильтр" style={{
      padding: '80px clamp(20px, 4vw, 56px)',
      borderTop: `${t.border * 2}px solid ${t.ink}`,
      background: t.paper,
    }}>
      <ASectionHeader n="07" t="ФИЛЬТР · ОБРАТНЫЙ ОТСЧЁТ." sub="что ты слышишь во рту" theme={t} />

      <p style={{ ...aBody, fontSize: 18, lineHeight: 1.5, maxWidth: '60ch', margin: '0 0 40px' }}>
        В&nbsp;каждой сцене рейда у героя в&nbsp;маске тикает таймер. Привкус во&nbsp;рту&nbsp;— и&nbsp;есть индикатор. Сладко стало&nbsp;— у&nbsp;тебя 20&nbsp;минут до&nbsp;потери сознания. Это&nbsp;— физика, не&nbsp;драма.
      </p>

      {/* шкала: 4 деления с прогрессом износа */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 0,
        border: `${t.border}px solid ${t.ink}`,
        background: t.ink,
      }}>
        {stages.map((s, i) => {
          const isLast = i === stages.length - 1;
          const bg = colorByStage[i];
          return (
            <div key={i} style={{
              padding: '28px 24px 24px',
              background: bg,
              color: t.ink,
              borderRight: isLast ? 'none' : `${t.border}px solid ${t.ink}`,
              position: 'relative',
              minHeight: 280,
              display: 'flex', flexDirection: 'column',
            }}>
              {/* номер стадии */}
              <div style={{
                position: 'absolute', top: -t.border, left: -t.border,
                background: t.ink, color: bg,
                border: `${t.border}px solid ${t.ink}`,
                padding: '4px 10px', ...aMono, fontSize: 11, fontWeight: 700,
              }}>0{i + 1} / 04</div>

              {/* счётчик минут — крупно */}
              <div style={{ marginTop: 16, marginBottom: 18 }}>
                <div style={{ ...aDisplay, fontSize: 'clamp(36px, 4vw, 56px)', lineHeight: .9 }}>
                  {s.left}
                </div>
                <div style={{ ...aMono, fontSize: 10, opacity: .7, marginTop: 6 }}>осталось</div>
              </div>

              {/* стадия */}
              <div style={{ ...aDisplay, fontSize: 22, lineHeight: 1, marginBottom: 8 }}>
                {s.stage}
              </div>

              {/* привкус — большой, отдельный */}
              <div style={{
                ...aMono, fontSize: 11, marginBottom: 10, opacity: .8,
              }}>
                ВО РТУ:
              </div>
              <div style={{
                display: 'inline-block', alignSelf: 'flex-start',
                padding: '6px 12px', background: t.ink, color: bg,
                border: `${t.border}px solid ${t.ink}`,
                ...aDisplay, fontSize: 18, marginBottom: 14,
              }}>
                {s.taste}
              </div>

              {/* описание */}
              <div style={{
                ...aBody, fontSize: 13, lineHeight: 1.45,
                marginTop: 'auto', borderTop: `${t.border}px solid ${t.ink}`, paddingTop: 12,
              }}>
                {s.desc}
              </div>
            </div>
          );
        })}
      </div>

      {/* подпись под шкалой */}
      <div style={{
        marginTop: 16, display: 'flex', justifyContent: 'space-between',
        ...aMono, fontSize: 10, opacity: .5,
      }}>
        <span>← НОВЫЙ ФИЛЬТР · 180 МИН</span>
        <span>СМЕРТЬ → 0</span>
      </div>
    </section>
  );
}

/* ─── КРИСТАЛЛЫ · экономика ───────────────────────────────────────── */
function ACrystals({ t }) {
  const crystals = D.crystals;
  // каждый кристалл — карточка-сертификат: размер / энергия / цена
  return (
    <section data-screen-label="08 · кристаллы" style={{
      padding: '80px clamp(20px, 4vw, 56px)',
      borderTop: `${t.border * 2}px solid ${t.ink}`,
      background: t.paper2,
    }}>
      <ASectionHeader n="08" t="КРИСТАЛЛЫ · ЭКОНОМИКА." sub="что туман даёт обратно" theme={t} />

      <p style={{ ...aBody, fontSize: 18, lineHeight: 1.5, maxWidth: '60ch', margin: '0 0 40px' }}>
        Туман не&nbsp;только убивает. Он&nbsp;кристаллизуется в&nbsp;вещах. Кристалл&nbsp;— это деньги, еда и&nbsp;билет наверх. Чем глубже спустишься, тем крупнее кристалл и&nbsp;тем меньше шанс вернуться.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 18,
      }}>
        {crystals.map((c, i) => {
          const tilts = [-0.6, 0.4, -0.3, 0.7, -0.5];
          const sizes = [42, 56, 78, 110, 150];
          const sz = sizes[i] || 60;
          // визуальный «кристалл» — ромб с гранями
          return (
            <ABrick key={i} t={t} bg="#fff" shadow tilt={tilts[i] || 0} style={{ padding: 0, display: 'flex', flexDirection: 'column', minHeight: 360 }}>
              {/* верх: SVG-ромб */}
              <div style={{
                background: i === crystals.length - 1 ? t.accent : (i === crystals.length - 2 ? t.tertiary : t.paper),
                borderBottom: `${t.border}px solid ${t.ink}`,
                padding: '24px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
                minHeight: 180,
              }}>
                <svg width={sz} height={sz} viewBox="-50 -50 100 100" style={{ overflow: 'visible' }}>
                  <polygon
                    points="0,-44 32,-12 28,28 -28,28 -32,-12"
                    fill={i === crystals.length - 1 ? '#fff' : t.ink}
                    stroke={t.ink}
                    strokeWidth="3"
                  />
                  <polygon
                    points="0,-44 32,-12 0,-4 -32,-12"
                    fill={i === crystals.length - 1 ? t.accent : t.primary}
                    stroke={t.ink}
                    strokeWidth="2"
                  />
                  <line x1="0" y1="-4" x2="0" y2="28" stroke={t.ink} strokeWidth="1.5" />
                  <line x1="0" y1="-4" x2="-28" y2="28" stroke={t.ink} strokeWidth="1.5" />
                  <line x1="0" y1="-4" x2="28" y2="28" stroke={t.ink} strokeWidth="1.5" />
                </svg>

                {/* номер */}
                <div style={{
                  position: 'absolute', top: 8, left: 12,
                  ...aMono, fontSize: 10, opacity: .6,
                }}>0{i + 1}</div>
                <div style={{
                  position: 'absolute', top: 8, right: 12,
                  ...aMono, fontSize: 10, opacity: .6,
                }}>{c.sz.toUpperCase()}</div>
              </div>

              {/* низ: данные */}
              <div style={{ padding: '18px 18px 20px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                <div style={{ ...aDisplay, fontSize: 28, lineHeight: 1 }}>{c.t}</div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ ...aMono, fontSize: 10, opacity: .6 }}>ЭНЕРГИЯ</span>
                    <span style={{ ...aBody, fontSize: 13, fontWeight: 700, textAlign: 'right' }}>{c.en}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: `1px dashed ${t.ink}`, paddingTop: 6 }}>
                    <span style={{ ...aMono, fontSize: 10, opacity: .6 }}>ЦЕНА</span>
                    <span style={{ ...aBody, fontSize: 13, fontWeight: 700, textAlign: 'right' }}>{c.pr}</span>
                  </div>
                </div>
              </div>
            </ABrick>
          );
        })}
      </div>

      <div style={{
        marginTop: 28, ...aMono, fontSize: 11, opacity: .6,
        display: 'flex', gap: 16, flexWrap: 'wrap',
      }}>
        <span>★ ЧЕМ КРУПНЕЕ КРИСТАЛЛ — ТЕМ ГЛУБЖЕ ОН ЛЕЖИТ</span>
        <span>· ЖИЛУ НИКТО НЕ ВЫНОСИЛ ЦЕЛИКОМ</span>
      </div>
    </section>
  );
}

/* ─── ФИРМЕННЫЕ СЦЕНЫ · 7 авторских приёмов ───────────────────────── */
function ASignature({ t }) {
  const sigs = D.signature;
  const [open, setOpen] = useState(0);

  return (
    <section data-screen-label="09 · фирменные сцены" style={{
      padding: '80px clamp(20px, 4vw, 56px)',
      borderTop: `${t.border * 2}px solid ${t.ink}`,
      background: t.ink, color: t.paper,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 32, flexWrap: 'wrap' }}>
        <span style={{ ...aDisplay, fontSize: 84, color: t.primary, lineHeight: .85 }}>09</span>
        <span style={{ ...aDisplay, fontSize: 'clamp(36px, 5vw, 64px)' }}>ФИРМЕННЫЕ СЦЕНЫ.</span>
        <span style={{ ...aMono, opacity: .5, marginLeft: 'auto' }}>что отличает ДЭФИР от других постапов</span>
      </div>

      <p style={{ ...aBody, fontSize: 18, lineHeight: 1.5, maxWidth: '60ch', margin: '0 0 40px', opacity: .85 }}>
        Семь авторских приёмов, которые повторяются. Это&nbsp;— подпись. Если ты&nbsp;их&nbsp;любишь, тебе будет хорошо. Если&nbsp;нет&nbsp;— честно: это не&nbsp;твоя книга.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 0, border: `${t.border}px solid ${t.paper}` }}>
        {/* список сцен — слева */}
        <div style={{
          borderRight: `${t.border}px solid ${t.paper}`,
          background: t.paper, color: t.ink,
        }}>
          {sigs.map((s, i) => {
            const active = i === open;
            return (
              <button
                key={i}
                onClick={() => setOpen(i)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '16px 18px',
                  background: active ? t.primary : 'transparent',
                  color: t.ink,
                  border: 'none',
                  borderBottom: i < sigs.length - 1 ? `1px solid ${t.ink}` : 'none',
                  cursor: 'pointer',
                  display: 'flex', gap: 12, alignItems: 'baseline',
                  transition: 'background .15s',
                }}
              >
                <span style={{ ...aMono, fontSize: 11, fontWeight: 700, opacity: active ? 1 : .5 }}>{s.n}</span>
                <span style={{ ...aDisplay, fontSize: 16, lineHeight: 1.1, flex: 1 }}>{s.t}</span>
                {active ? <span style={{ ...aMono, fontSize: 12 }}>→</span> : null}
              </button>
            );
          })}
        </div>

        {/* раскрытое описание — справа */}
        <div style={{ padding: '32px 40px', position: 'relative', minHeight: 380, background: t.ink }}>
          <div style={{ ...aMono, fontSize: 11, color: t.primary, marginBottom: 14, fontWeight: 700 }}>
            ПРИЁМ {sigs[open].n} / 0{sigs.length}
          </div>
          <h3 style={{ ...aDisplay, fontSize: 'clamp(36px, 4.5vw, 56px)', margin: '0 0 24px', color: t.paper, lineHeight: .95 }}>
            {sigs[open].t}
          </h3>
          <p style={{ ...aBody, fontSize: 17, lineHeight: 1.55, margin: 0, maxWidth: '52ch', opacity: .9 }}>
            {sigs[open].d}
          </p>

          {/* фоновый «номер» */}
          <div aria-hidden style={{
            position: 'absolute', right: 24, bottom: -28, ...aDisplay,
            fontSize: 220, color: t.paper, opacity: .06, lineHeight: .8, pointerEvents: 'none',
          }}>{sigs[open].n}</div>
        </div>
      </div>
    </section>
  );
}

/* ─── СТРУКТУРА КНИГИ · 3 части как спуск ─────────────────────────── */
function AParts({ t }) {
  const parts = D.parts;
  // визуально: лестница вниз — каждая часть ниже предыдущей
  return (
    <section data-screen-label="11 · структура книги" style={{
      padding: '80px clamp(20px, 4vw, 56px)',
      borderTop: `${t.border * 2}px solid ${t.ink}`,
      background: t.paper,
      position: 'relative', overflow: 'hidden',
    }}>
      <ASectionHeader n="11" t="ТРИ ЧАСТИ. ОДИН СПУСК." sub="карта первой книги" theme={t} />

      <p style={{ ...aBody, fontSize: 18, lineHeight: 1.5, maxWidth: '60ch', margin: '0 0 48px' }}>
        Каждая часть&nbsp;— шаг вниз. Глубже туман, плотнее давление, больше потерь. Финал&nbsp;— на&nbsp;дне.
      </p>

      {/* лестница — три блока, каждый ниже и темнее */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 0,
        position: 'relative',
      }}>
        {parts.map((p, i) => {
          const offsets = [0, 80, 160];
          const bgs = [t.paper2, '#444', t.ink];
          const fgs = [t.ink, t.paper, t.paper];
          const accents = [t.quat, t.primary, t.accent];

          return (
            <div key={i} style={{
              marginLeft: offsets[i],
              background: bgs[i],
              color: fgs[i],
              border: `${t.border}px solid ${t.ink}`,
              boxShadow: `${t.shadow}px ${t.shadow}px 0 0 ${t.ink}`,
              padding: '28px 32px',
              marginTop: i === 0 ? 0 : 24,
              display: 'grid',
              gridTemplateColumns: '120px 200px 1fr',
              gap: 32,
              alignItems: 'center',
              position: 'relative',
            }}>
              {/* римская */}
              <div style={{
                ...aDisplay, fontSize: 'clamp(60px, 7vw, 96px)',
                color: accents[i], lineHeight: .9,
              }}>{p.n}</div>

              {/* название + дни */}
              <div>
                <div style={{ ...aDisplay, fontSize: 'clamp(28px, 3vw, 38px)', lineHeight: 1, marginBottom: 8 }}>
                  {p.name}
                </div>
                <div style={{
                  display: 'inline-block',
                  padding: '4px 10px',
                  background: accents[i], color: t.ink,
                  border: `${t.border}px solid ${t.ink}`,
                  ...aMono, fontSize: 10,
                }}>{p.days.toUpperCase()}</div>
              </div>

              {/* описание */}
              <div style={{ ...aBody, fontSize: 15, lineHeight: 1.5, opacity: .9 }}>
                {p.hook}
              </div>

              {/* стрелка вниз — кроме последнего */}
              {i < parts.length - 1 ? (
                <div aria-hidden style={{
                  position: 'absolute', left: 60, bottom: -28,
                  ...aDisplay, fontSize: 32, color: t.ink,
                  zIndex: 2,
                }}>↓</div>
              ) : null}

              {/* индикатор глубины */}
              <div style={{
                position: 'absolute', top: -t.border, right: -t.border,
                background: accents[i], color: t.ink,
                border: `${t.border}px solid ${t.ink}`,
                padding: '4px 10px', ...aMono, fontSize: 10, fontWeight: 700,
              }}>
                ГЛУБИНА {i === 0 ? 'КРОМКА' : i === 1 ? 'СРЕДНЯЯ' : 'ДНО'}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        marginTop: 40, ...aMono, fontSize: 11, opacity: .5,
      }}>
        ★ ПЛАН ВТОРОЙ И&nbsp;ТРЕТЬЕЙ ЧАСТЕЙ&nbsp;— УТОЧНЯЕТСЯ ПО&nbsp;ХОДУ ПЕРВОЙ
      </div>
    </section>
  );
}

window.A_sec3 = { AFilter, ACrystals, ASignature, AParts };
