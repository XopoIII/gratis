/* eslint-disable no-undef */
/* Вариант A — «ПОЛЕВОЙ ДНЕВНИК РАДИСТА»
   Морская сталь · брутальный гротеск · фотокарточки на сетке.
   Тон первого экрана: тревога. */

const A = window.KANON;
const { useState } = React;

// ============ HERO ============
const A_Hero = () => {
  return (
    <section
      style={{
        minHeight: '100vh',
        position: 'relative',
        background: 'var(--kanon-bg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
      className="kanon-pad kanon-grid-bg"
    >
      {/* фоновое фото — наблюдатель и хрущёвка */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(180deg, rgba(13,18,24,.78) 0%, rgba(13,18,24,.88) 60%, rgba(13,18,24,.96) 100%), url(${A.hero.img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'grayscale(.6) contrast(1.05)',
        zIndex: 0,
        pointerEvents: 'none',
      }}/>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 30%, rgba(177,74,44,.10), transparent 60%)', zIndex: 0, pointerEvents: 'none' }}/>

      {/* верхняя полоса HUD */}
      <div
        className="kanon-hud"
        style={{
          paddingTop: 22,
          paddingBottom: 18,
          borderBottom: '1px solid var(--kanon-line)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Cap tone="rust">
          <span className="kanon-blink" style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--kanon-rust)', marginRight: 10, verticalAlign: 'middle' }} />
          сигнал · {A.hero.signal}
        </Cap>
        <Cap>{A.hero.location}</Cap>
        <Cap tone="brass">{A.hero.day}</Cap>
      </div>

      {/* основной блок */}
      <div className="kanon-grid-2" style={{ flex: 1, paddingTop: 'clamp(40px, 8vh, 110px)', paddingBottom: 60, position: 'relative', zIndex: 1 }}>
        <div>
          <Cap style={{ marginBottom: 28 }}>
            ╳ <span style={{ color: 'var(--kanon-ink)', marginLeft: 8 }}>глава 01 · кисляк · стр. 12</span>
          </Cap>

          <h1 className="kanon-display" style={{
            fontSize: 'clamp(42px, 9.4vw, 168px)',
            margin: 0,
            color: 'var(--kanon-ink)',
            textWrap: 'balance',
          }}>
            {A.hero.headline.split(' ').map((w, i) => (
              <span key={i} style={{ display: 'inline-block', marginRight: '0.18em', overflowWrap: 'anywhere' }}>{w}</span>
            ))}
          </h1>

          <p style={{
            marginTop: 36,
            maxWidth: 720,
            fontSize: 'clamp(17px, 1.6vw, 22px)',
            lineHeight: 1.55,
            color: 'var(--kanon-ink-dim)',
            textWrap: 'pretty',
          }}>
            {A.hero.sub}
          </p>

          <div style={{ marginTop: 56, display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center' }}>
            <a className="kanon-btn" href={A.cta.href} target="_blank" rel="noreferrer">
              {A.cta.label} <span className="arrow">→</span>
            </a>
            <span className="kanon-mono" style={{ fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--kanon-ink-mute)' }}>
              {A.cta.sub}
            </span>
          </div>
        </div>

        {/* правая колонка: «приёмник» */}
        <aside className="kanon-aside-radio" style={{ position: 'relative' }}>
          <Cap style={{ marginBottom: 18 }}>радиоперехват</Cap>
          <div style={{
            background: 'var(--kanon-bg-2)',
            border: '1px solid var(--kanon-line)',
            padding: 20,
            fontFamily: 'var(--kanon-mono)',
            fontSize: 12,
            lineHeight: 1.7,
            color: 'var(--kanon-ink-dim)',
          }}>
            <div style={{ color: 'var(--kanon-rust)' }}>{'> 08:47:03'}</div>
            <div>···· высокая нота ····</div>
            <div style={{ color: 'var(--kanon-ink)' }}>«пик-пик» · карман</div>
            <div>···· кровь · левое ухо ····</div>
            <div style={{ color: 'var(--kanon-rust)' }}>{'> 08:47:29'}</div>
            <div style={{ color: 'var(--kanon-ink)' }}>тум-тум · пауза</div>
            <div style={{ color: 'var(--kanon-ink)' }}>тум-тум · из-под асфальта</div>
            <div style={{ color: 'var(--kanon-ink-mute)' }}>раз, два, три. снова раз, два, три.</div>
            <div className="kanon-blink" style={{ color: 'var(--kanon-brass)', marginTop: 8 }}>_</div>
          </div>

          <div style={{ marginTop: 22, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--kanon-mono)', fontSize: 10, letterSpacing: '.2em', color: 'var(--kanon-ink-mute)', textTransform: 'uppercase' }}>
            <span>каналов: 12</span>
            <span>шум: −44 db</span>
          </div>
        </aside>
      </div>

      {/* нижняя полоса с триггерами */}
      <div style={{ borderTop: '1px solid var(--kanon-line)', paddingTop: 18, paddingBottom: 22, display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <Cap tone="brass">⚠ предупреждения</Cap>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          {A.triggers.map((t) => (
            <span key={t} className="kanon-mono" style={{
              fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase',
              padding: '4px 10px', border: '1px solid var(--kanon-line)', color: 'var(--kanon-ink-dim)',
            }}>{t}</span>
          ))}
        </div>
      </div>
      </section>
  );
};

// ============ EXCERPT — фрагмент главы ============
const A_Excerpt = () => {
  const ref = useReveal();
  return (
    <section className="kanon-pad" style={{ background: 'var(--kanon-bg)', borderTop: '1px solid var(--kanon-line)', padding: 'clamp(80px, 14vh, 160px) var(--kanon-pad)', position: 'relative' }} ref={ref}>
      <div className="kanon-grid-1-2" style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div>
          <Cap tone="rust">{A.excerpt.label}</Cap>
          <div style={{
            marginTop: 28,
            aspectRatio: '2/3',
            maxWidth: 320,
            backgroundImage: `linear-gradient(180deg, rgba(13,18,24,.0) 40%, rgba(13,18,24,.6) 100%), url(${A.excerpt.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '1px solid var(--kanon-line)',
            position: 'relative',
            filter: 'grayscale(.4) contrast(1.05)',
          }}>
            <div className="kanon-mono" style={{ position: 'absolute', left: 12, bottom: 10, fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--kanon-ink)' }}>
              ухо · кровь · 08:47
            </div>
          </div>
          <div className="kanon-display kanon-fade-in" style={{ fontSize: 'clamp(40px, 5vw, 80px)', marginTop: 28, lineHeight: 1 }}>
            ТУМ-ТУМ.
          </div>
          <div className="kanon-mono" style={{ marginTop: 24, fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--kanon-ink-mute)' }}>
            ↓ читать полностью
          </div>
        </div>

        <div className="kanon-fade-in" style={{ borderLeft: '4px double var(--kanon-line)', paddingLeft: 40 }}>
          {A.excerpt.body.map((p, i) => (
            <p key={i} style={{
              margin: 0,
              marginBottom: i === A.excerpt.body.length - 1 ? 0 : 22,
              fontSize: i === 0 ? 'clamp(22px, 2.2vw, 30px)' : 'clamp(18px, 1.6vw, 22px)',
              lineHeight: 1.5,
              color: i < 2 ? 'var(--kanon-ink)' : 'var(--kanon-ink-dim)',
              fontStyle: i >= 2 && i < 4 ? 'italic' : 'normal',
              textWrap: 'pretty',
            }}>
              {i === 0 && <span className="kanon-display" style={{ fontSize: '1.2em', marginRight: '.15em', color: 'var(--kanon-rust)' }}>«</span>}
              {p}
              {i === A.excerpt.body.length - 1 && <span className="kanon-display" style={{ fontSize: '1.2em', marginLeft: '.05em', color: 'var(--kanon-rust)' }}>»</span>}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ DOSSIER — Борис ============
const A_Dossier = () => {
  const d = A.borisDossier;
  return (
    <section className="kanon-pad" style={{
      background: 'var(--kanon-bg-2)',
      borderTop: '1px solid var(--kanon-line)',
      padding: 'clamp(80px, 12vh, 140px) var(--kanon-pad)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--kanon-line)', paddingBottom: 14, marginBottom: 60 }}>
        <Cap tone="rust">досье</Cap>
        <Cap>{d.code}</Cap>
      </div>

      <div className="kanon-grid-2-2">
        {/* левая — большое имя + талант */}
        <div>
          <div style={{
            aspectRatio: '2/3',
            maxWidth: 480,
            backgroundImage: `linear-gradient(180deg, rgba(13,18,24,0) 40%, rgba(13,18,24,.7) 100%), url(${d.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            border: '1px solid var(--kanon-line)',
            position: 'relative',
            filter: 'grayscale(.5) contrast(1.05)',
            marginBottom: 28,
          }}>
            <div className="kanon-mono" style={{ position: 'absolute', left: 12, top: 10, fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--kanon-ink-mute)' }}>
              ● subj_01 · пирс · день 14
            </div>
            <div className="kanon-mono" style={{ position: 'absolute', right: 12, bottom: 10, fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--kanon-rust)' }}>
              топорик · синяя изолента
            </div>
          </div>

          <h2 className="kanon-display" style={{ fontSize: 'clamp(80px, 14vw, 220px)', margin: 0, lineHeight: 1, color: 'var(--kanon-ink)' }}>
            {d.name}.
          </h2>
          <div className="kanon-mono" style={{ marginTop: 18, fontSize: 13, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--kanon-ink-dim)' }}>
            {d.age} лет · {d.role}
          </div>

          <div style={{ marginTop: 56, padding: 24, border: '1px solid var(--kanon-rust)', position: 'relative' }}>
            <Cap tone="rust" style={{ position: 'absolute', top: -10, left: 16, background: 'var(--kanon-bg-2)', padding: '0 10px' }}>
              ДАР · акустический сенс
            </Cap>
            <div className="kanon-display" style={{ fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: 1, marginTop: 8 }}>
              СЛЫШИТ МЫШЬ ЭТАЖОМ НИЖЕ.
            </div>
            <p style={{ marginTop: 18, marginBottom: 0, fontSize: 16, lineHeight: 1.55, color: 'var(--kanon-ink-dim)' }}>
              {d.talent.desc}
            </p>
            <div className="kanon-mono" style={{ marginTop: 18, fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--kanon-brass)' }}>
              побочный эффект — {d.body}
            </div>
          </div>

          <p style={{ marginTop: 40, fontSize: 'clamp(18px, 1.6vw, 22px)', lineHeight: 1.5, fontStyle: 'italic', color: 'var(--kanon-ink)', maxWidth: 540 }}>
            {d.quote}
          </p>
        </div>

        {/* правая — список инвентаря */}
        <div>
          <Cap style={{ marginBottom: 22 }}>имущество · карман · груз</Cap>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderTop: '1px solid var(--kanon-line)' }}>
            {d.inventory.map((it, i) => (
              <li key={i} style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr',
                gap: 24,
                padding: '22px 0',
                borderBottom: '1px solid var(--kanon-line)',
                alignItems: 'baseline',
              }}>
                <Cap tone="brass">{it.k}</Cap>
                <div style={{ fontSize: 'clamp(20px, 2vw, 28px)', lineHeight: 1.25, fontFamily: 'var(--kanon-display)', textTransform: 'uppercase' }}>
                  {it.v}
                </div>
              </li>
            ))}
          </ul>

          {/* реликвия */}
          <div style={{ marginTop: 48, padding: 28, background: 'var(--kanon-bg-3)', border: '1px solid var(--kanon-line)', display: 'flex', gap: 28, alignItems: 'flex-start' }}>
            <div><TamagochiScreen size={120} mood="flicker" label="alive?" /></div>
            <div style={{ flex: 1 }}>
              <Cap tone="brass">{A.tamagochi.title}</Cap>
              <div className="kanon-display" style={{ fontSize: 'clamp(20px, 1.8vw, 26px)', marginTop: 8, lineHeight: 1 }}>
                ТАМАГОЧИ. СИНЯЯ ИЗОЛЕНТА.
              </div>
              <div className="kanon-mono" style={{ marginTop: 6, fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--kanon-ink-mute)' }}>
                {A.tamagochi.sub}
              </div>
              <p style={{ marginTop: 14, marginBottom: 0, fontSize: 14, lineHeight: 1.55, color: 'var(--kanon-ink-dim)' }}>
                {A.tamagochi.body}
              </p>
              <div className="kanon-mono" style={{ marginTop: 14, fontSize: 12, color: 'var(--kanon-rust)', letterSpacing: '.18em', textTransform: 'uppercase' }}>
                ▸ {A.tamagochi.note}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============ MAP — Владивосток в Улье ============
const A_Map = () => {
  return (
    <section className="kanon-pad" style={{
      background: 'var(--kanon-bg)',
      borderTop: '1px solid var(--kanon-line)',
      padding: 'clamp(80px, 12vh, 140px) var(--kanon-pad)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
        <Cap tone="rust">{A.setting.label}</Cap>
        <Cap>СШИРОТА 43.1° · ВДОЛГОТА 131.9°</Cap>
      </div>

      <h2 className="kanon-display" style={{ fontSize: 'clamp(48px, 6.5vw, 110px)', margin: 0, lineHeight: 1, marginBottom: 28, maxWidth: 1100, textWrap: 'balance' }}>
        {A.setting.title}
      </h2>
      <p style={{ maxWidth: 720, fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.55, color: 'var(--kanon-ink-dim)', marginBottom: 60 }}>
        {A.setting.body}
      </p>

      {/* карта */}
      <div style={{
        position: 'relative',
        aspectRatio: '16/9',
        background: 'var(--kanon-bg-2)',
        border: '1px solid var(--kanon-line)',
        overflow: 'hidden',
      }}>
        {/* фотофон — мост через Золотой Рог */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(180deg, rgba(13,18,24,.45) 0%, rgba(13,18,24,.78) 100%), url(${A.setting.img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(.6) contrast(1.05)',
        }}/>
        <CropMarks />

        {/* стилизованная "карта" — изолинии и формы поверх фото */}
        <svg viewBox="0 0 800 450" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', mixBlendMode: 'screen', opacity: .55 }}>
          {/* контур побережья */}
          <defs>
            <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255,255,255,.06)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* море */}
          <rect width="800" height="450" fill="url(#hatch)" />

          {/* материк/полуостров — несколько пятен */}
          <path d="M0,150 Q120,120 200,170 Q280,210 360,200 L380,260 Q300,270 240,300 Q150,330 80,310 L0,300 Z"
                fill="rgba(180,180,170,.06)" stroke="rgba(255,255,255,.18)" />
          {/* остров Русский */}
          <path d="M520,330 Q590,310 660,340 Q700,360 690,400 Q620,420 560,400 Q510,380 520,330 Z"
                fill="rgba(180,180,170,.06)" stroke="rgba(255,255,255,.18)" />
          {/* мост */}
          <line x1="400" y1="220" x2="540" y2="320" stroke="var(--kanon-brass)" strokeWidth="1.5" strokeDasharray="4 3" opacity=".7" />

          {/* изолинии-сопки */}
          {[80, 60, 40, 20].map((r, i) => (
            <ellipse key={i} cx="180" cy="220" rx={r * 1.2} ry={r * 0.7} fill="none" stroke="rgba(255,255,255,.08)" />
          ))}

          {/* координатная сетка */}
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={'gx' + i} x1={i * 100} y1="0" x2={i * 100} y2="450" stroke="rgba(255,255,255,.04)" />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={'gy' + i} x1="0" y1={i * 90} x2="800" y2={i * 90} stroke="rgba(255,255,255,.04)" />
          ))}
        </svg>

        {/* пины */}
        {A.setting.pins.map((p, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: p.x + '%',
            top: p.y + '%',
            transform: 'translate(-50%, -50%)',
          }}>
            <div style={{
              width: 14, height: 14, borderRadius: '50%',
              background: i === 0 ? 'var(--kanon-rust)' : 'var(--kanon-ink)',
              boxShadow: i === 0 ? '0 0 0 4px rgba(177,74,44,.25)' : 'none',
            }} className={i === 0 ? 'kanon-blink' : ''} />
            <div style={{
              position: 'absolute', top: -4, whiteSpace: 'nowrap',
              ...(p.x > 60 ? { right: 22, textAlign: 'right' } : { left: 22 }),
              fontFamily: 'var(--kanon-mono)', fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase',
              color: 'var(--kanon-ink)',
            }}>
              {p.label}
              <div style={{ fontSize: 10, color: 'var(--kanon-ink-mute)', marginTop: 2, letterSpacing: '.15em' }}>{p.d}</div>
            </div>
          </div>
        ))}

        {/* подпись внизу */}
        <div style={{ position: 'absolute', left: 18, bottom: 12, fontFamily: 'var(--kanon-mono)', fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--kanon-ink-mute)' }}>
          схематично · не для навигации
        </div>
        <div style={{ position: 'absolute', right: 18, bottom: 12, fontFamily: 'var(--kanon-mono)', fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--kanon-rust)' }}>
          ●  субъект 01
        </div>
      </div>
    </section>
  );
};

// ============ PARTS — три части ============
const A_Parts = () => {
  return (
    <section className="kanon-pad" style={{
      background: 'var(--kanon-bg-2)',
      borderTop: '1px solid var(--kanon-line)',
      padding: 'clamp(80px, 12vh, 140px) var(--kanon-pad)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 56 }}>
        <Cap tone="rust">оглавление</Cap>
        <Cap>3 части · 22 главы · 23 дня</Cap>
      </div>

      <div className="kanon-grid-3">
        {A.parts.map((p, i) => (
          <article key={p.n} style={{ borderTop: '4px solid var(--kanon-ink)', paddingTop: 24, position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span className="kanon-display" style={{ fontSize: 64, lineHeight: 1, color: 'var(--kanon-rust)' }}>{p.n}</span>
              <Cap>{p.days}</Cap>
            </div>
            <div className="kanon-display" style={{ fontSize: 'clamp(28px, 2.6vw, 40px)', marginTop: 14, marginBottom: 18, lineHeight: 1, color: 'var(--kanon-ink)' }}>
              {p.name}
            </div>
            <Photo src={p.img} caption={`часть ${p.n} · ${p.name.toLowerCase()}`} h={280} />
            <p style={{ marginTop: 22, marginBottom: 0, fontSize: 15, lineHeight: 1.55, color: 'var(--kanon-ink-dim)' }}>
              {p.hook}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

// ============ TAMAGOCHI — реликвия крупным планом ============
const A_Tamagochi = () => {
  const ref = useReveal();
  return (
    <section className="kanon-pad kanon-fade-in" ref={ref} style={{
      background: 'var(--kanon-bg)',
      borderTop: '1px solid var(--kanon-line)',
      padding: 'clamp(80px, 14vh, 160px) var(--kanon-pad)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 48, borderBottom: '1px solid var(--kanon-line)', paddingBottom: 14 }}>
        <Cap tone="rust">реликвия · subj_01</Cap>
        <Cap>tamagotchi p1 · 1996 · b/у</Cap>
      </div>

      <div className="kanon-grid-2-tama" style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* устройство */}
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <div style={{
            width: 'min(520px, 100%)',
            aspectRatio: '1/1',
            position: 'relative',
            backgroundImage: `url(${A.tamagochi.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'screen',
            filter: 'contrast(1.15) brightness(1.05)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 32%, rgba(0,0,0,.4) 55%, transparent 78%)',
            maskImage: 'radial-gradient(ellipse at center, black 32%, rgba(0,0,0,.4) 55%, transparent 78%)',
          }}>
            {/* мерцающее «свечение» поверх экрана тамагочи */}
            <div className="kanon-blink" aria-hidden="true" style={{
              position: 'absolute',
              left: '38%', top: '32%', width: '24%', height: '22%',
              background: 'radial-gradient(ellipse, rgba(122,176,79,.6), transparent 70%)',
              mixBlendMode: 'screen',
              pointerEvents: 'none',
            }}/>
          </div>
          {/* подписи рядом с устройством */}
          <div className="kanon-mono" style={{ position: 'absolute', left: 8, top: 10, fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--kanon-ink-mute)' }}>
            арт. R-01 · реликвия
          </div>
          <div className="kanon-mono" style={{ position: 'absolute', right: 8, bottom: 10, fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--kanon-rust)' }}>
            экран пискнул · 08:47
          </div>
        </div>

        {/* текст */}
        <div>
          <h2 className="kanon-display" style={{ fontSize: 'clamp(48px, 6.4vw, 108px)', margin: 0, lineHeight: 1, textWrap: 'balance' }}>
            ОН НЕ&nbsp;РАБОТАЕТ. <br/>
            <span style={{ color: 'var(--kanon-rust)' }}>В&nbsp;ЭТОМ ВСЁ&nbsp;ДЕЛО.</span>
          </h2>

          <p style={{ marginTop: 28, fontSize: 'clamp(17px, 1.5vw, 21px)', lineHeight: 1.55, color: 'var(--kanon-ink-dim)', maxWidth: 560 }}>
            {A.tamagochi.body}
          </p>

          <div style={{ marginTop: 36, paddingLeft: 22, borderLeft: '4px double var(--kanon-line)' }}>
            <Cap tone="brass">правило</Cap>
            <div className="kanon-display" style={{ fontSize: 'clamp(22px, 2.2vw, 32px)', marginTop: 8, lineHeight: 1, color: 'var(--kanon-ink)' }}>
              ЕСЛИ ЭКРАНЧИК МИГАЕТ&nbsp;— <span style={{ color: 'var(--kanon-rust)' }}>ТЫ НЕ ОДИН.</span>
            </div>
          </div>

          <div className="kanon-meta-2" style={{ marginTop: 36, fontFamily: 'var(--kanon-mono)', fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--kanon-ink-mute)' }}>
            <div><span style={{ color: 'var(--kanon-brass)' }}>модель</span><br/>tamagotchi p1</div>
            <div><span style={{ color: 'var(--kanon-brass)' }}>состояние</span><br/>трещина · синяя изолента</div>
            <div><span style={{ color: 'var(--kanon-brass)' }}>от&nbsp;кого</span><br/>мать · до Улья</div>
            <div><span style={{ color: 'var(--kanon-brass)' }}>день</span><br/>01 · экран пискнул</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============ SCRIPTORIUM — за столом ============
const A_Scriptorium = () => {
  const ref = useReveal();
  const s = A.scriptorium;
  return (
    <section className="kanon-pad kanon-fade-in" ref={ref} style={{
      background: 'var(--kanon-bg-2)',
      borderTop: '1px solid var(--kanon-line)',
      padding: 'clamp(80px, 14vh, 160px) var(--kanon-pad)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 40, borderBottom: '1px solid var(--kanon-line)', paddingBottom: 14 }}>
        <Cap tone="rust">{s.label}</Cap>
        <Cap>состояние · черновик</Cap>
      </div>

      <div className="kanon-grid-1-2" style={{ maxWidth: 1400, margin: '0 auto', gap: 56 }}>
        <div>
          <div style={{
            aspectRatio: '1/1',
            backgroundImage: `linear-gradient(180deg, rgba(13,18,24,0) 50%, rgba(13,18,24,.75) 100%), url(${s.desk})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '1px solid var(--kanon-line)',
            position: 'relative',
            filter: 'grayscale(.5) contrast(1.05)',
          }}>
            <div className="kanon-mono" style={{ position: 'absolute', left: 12, bottom: 10, fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--kanon-ink-mute)' }}>
              автор · 02:47 · кофе остыл
            </div>
          </div>
        </div>

        <div>
          <h2 className="kanon-display" style={{ fontSize: 'clamp(48px, 6.4vw, 100px)', margin: 0, lineHeight: 1, textWrap: 'balance' }}>
            {s.title}
          </h2>
          <p style={{ marginTop: 28, fontSize: 'clamp(17px, 1.5vw, 21px)', lineHeight: 1.55, color: 'var(--kanon-ink-dim)', maxWidth: 560 }}>
            {s.body}
          </p>

          <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <figure style={{ margin: 0 }}>
              <div style={{
                aspectRatio: '3/2',
                backgroundImage: `url(${s.diary})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '1px solid var(--kanon-line)',
                filter: 'sepia(.15) contrast(1.05)',
              }}/>
              <figcaption className="kanon-mono" style={{ marginTop: 8, fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--kanon-ink-mute)' }}>
                чистовик · перо · кружка
              </figcaption>
            </figure>
            <figure style={{ margin: 0 }}>
              <div style={{
                aspectRatio: '3/2',
                backgroundImage: `url(${s.edits})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '1px solid var(--kanon-rust)',
              }}/>
              <figcaption className="kanon-mono" style={{ marginTop: 8, fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--kanon-rust)' }}>
                правки красным · круг = «оставить»
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============ CTA tail ============
const A_Tail = () => {
  return (
    <section className="kanon-pad" style={{
      background: 'var(--kanon-bg)',
      borderTop: '1px solid var(--kanon-line)',
      padding: 'clamp(100px, 18vh, 200px) var(--kanon-pad)',
      textAlign: 'center',
    }}>
      <Cap tone="rust" style={{ marginBottom: 28 }}>конец фрагмента</Cap>
      <h2 className="kanon-display" style={{ fontSize: 'clamp(56px, 9vw, 156px)', margin: 0, lineHeight: 1, maxWidth: 1200, marginInline: 'auto', textWrap: 'balance' }}>
        ДАЛЬШЕ — <span style={{ color: 'var(--kanon-rust)' }}>ТЫ</span>.
      </h2>
      <p style={{ marginTop: 28, fontSize: 'clamp(16px, 1.4vw, 19px)', color: 'var(--kanon-ink-dim)', maxWidth: 560, marginInline: 'auto' }}>
        Глава 1 пишется прямо сейчас. Книга будет выкладываться целиком, бесплатно, по одной главе. Подпиши себе строку в эфире.
      </p>
      <div style={{ marginTop: 44, display: 'flex', gap: 18, justifyContent: 'center', flexWrap: 'wrap' }}>
        <a className="kanon-btn" href={A.cta.href} target="_blank" rel="noreferrer">
          {A.cta.label} <span className="arrow">→</span>
        </a>
        <a className="kanon-btn-ghost" href={A.author.href}>
          о&nbsp;авторе
        </a>
      </div>

      <div className="kanon-mono" style={{ marginTop: 80, paddingTop: 28, borderTop: '1px solid var(--kanon-line)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--kanon-ink-mute)' }}>
        <span>© Агатис Интегра · 2026</span>
        <span>самиздат · S-T-I-K-S</span>
        <span>читать медленно</span>
      </div>
    </section>
  );
};

// ============ Плавающий тамагочи в углу ============
const FloatingTama = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      position: 'fixed',
      right: 'clamp(16px, 2.5vw, 32px)',
      bottom: 'clamp(16px, 2.5vw, 32px)',
      zIndex: 60,
      pointerEvents: 'auto',
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        title="реликвия. она моргает."
        style={{
          width: 'clamp(78px, 9vw, 120px)',
          height: 'clamp(78px, 9vw, 120px)',
          padding: 0,
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          position: 'relative',
          filter: 'drop-shadow(0 12px 24px rgba(0,0,0,.6))',
          animation: 'kanon-tama-float 6s ease-in-out infinite',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${A.tamagochi.img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'screen',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 34%, rgba(0,0,0,.5) 56%, transparent 78%)',
          maskImage: 'radial-gradient(ellipse at center, black 34%, rgba(0,0,0,.5) 56%, transparent 78%)',
          filter: 'contrast(1.15) brightness(1.1)',
        }}/>
        {/* зелёный фосфор-блик */}
        <div className="kanon-blink" style={{
          position: 'absolute', left: '38%', top: '34%', width: '24%', height: '20%',
          background: 'radial-gradient(ellipse, rgba(122,176,79,.85), transparent 70%)',
          mixBlendMode: 'screen', pointerEvents: 'none',
        }}/>
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          right: 0,
          bottom: 'calc(100% + 12px)',
          width: 'min(280px, 80vw)',
          background: 'var(--kanon-bg-2)',
          border: '1px solid var(--kanon-line)',
          padding: 18,
          boxShadow: '0 24px 48px rgba(0,0,0,.6)',
        }}>
          <div className="kanon-mono" style={{ fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--kanon-rust)', marginBottom: 8 }}>
            ● экран моргнул
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--kanon-ink)' }}>
            Если он мигает — <span style={{ color: 'var(--kanon-rust)' }}>ты не один</span>.
          </div>
          <div className="kanon-mono" style={{ marginTop: 12, fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--kanon-ink-mute)' }}>
            tamagotchi p1 · 1996 · b/у
          </div>
          <button
            onClick={() => setOpen(false)}
            style={{
              marginTop: 14, padding: '6px 12px', background: 'transparent',
              border: '1px solid var(--kanon-line)', color: 'var(--kanon-ink-dim)',
              fontFamily: 'var(--kanon-mono)', fontSize: 10, letterSpacing: '.22em',
              textTransform: 'uppercase', cursor: 'pointer',
            }}
          >закрыть</button>
        </div>
      )}
    </div>
  );
};

// ============ корень варианта A ============
const VariantA = () => (
  <div data-variant="A">
    <A_Hero/>
    <A_Excerpt/>
    <A_Dossier/>
    <A_Map/>
    <A_Parts/>
    <A_Tamagochi/>
    <A_Scriptorium/>
    <A_Tail/>
  </div>
);

window.VariantA = VariantA;
