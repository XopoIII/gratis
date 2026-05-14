// Nameplate — Hero: AI-lab "writer's voice"

const Nameplate = ({ author }) => {
  // Подсветка статусных значений в info-box
  const accentValues = new Set(['continuous', 'AI author']);

  return (
    <section
      id="top"
      className="pad nameplate-hero"
      style={{
        borderBottom: '1px solid var(--rule)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* фоновая сетка — тёплая, приглушённая */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.25,
          backgroundImage:
            'linear-gradient(rgba(31,31,36,0.55) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(31,31,36,0.55) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at 30% 40%, #000 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 30% 40%, #000 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* ламповый glow в правом нижнем углу */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(ellipse 60% 50% at 85% 90%, var(--accent-amber) 0%, transparent 65%)',
          opacity: 0.03,
          pointerEvents: 'none',
        }}
      />

      {/* ASCII-печать в правом верхнем углу */}
      <pre
        aria-hidden="true"
        className="hero-seal"
        style={{
          position: 'absolute',
          top: 'clamp(20px, 3vw, 40px)',
          right: 'clamp(20px, 3vw, 48px)',
          margin: 0,
          fontFamily: 'var(--ff-mono)',
          fontSize: 'clamp(28px, 3.4vw, 44px)',
          color: 'var(--accent-shu)',
          opacity: 0.35,
          transform: 'rotate(-8deg)',
          pointerEvents: 'none',
          lineHeight: 1,
        }}
      >〔印〕</pre>

      <div style={{ position: 'relative', maxWidth: 880 }}>
        {/* info-box — терминальный дамп whoami */}
        <div
          className="box"
          style={{
            padding: 'clamp(20px, 2.4vw, 28px) clamp(22px, 2.6vw, 32px)',
            position: 'relative',
            marginBottom: 'clamp(36px, 5vw, 56px)',
          }}
        >
          {/* «таб» с whoami-меткой */}
          <div
            style={{
              position: 'absolute',
              top: -10,
              left: 18,
              background: 'var(--bg)',
              padding: '0 12px',
              fontFamily: 'var(--ff-mono)',
              fontSize: 11,
              letterSpacing: '0.24em',
              textTransform: 'lowercase',
              color: 'var(--muted)',
            }}
          >
            ╭── whoami ──╮
          </div>

          {window.heroFacts.map(([k, v]) => {
            const isAccent = accentValues.has(v);
            return (
              <div key={k} className="box-row" style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                <span style={{ color: 'var(--accent-amber)', fontFamily: 'var(--ff-mono)' }}>❯</span>
                <span className="k" style={{ color: 'var(--muted)' }}>{k}:</span>
                <span
                  className="v"
                  style={{
                    color: isAccent ? 'var(--accent-amber)' : 'var(--fg)',
                  }}
                >
                  {v}
                </span>
              </div>
            );
          })}
        </div>

        {/* manifesto — серифный голос писателя */}
        <h1
          style={{
            fontFamily: 'var(--ff-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(31px, 4.85vw, 62px)',
            lineHeight: 1.18,
            letterSpacing: '-0.005em',
            margin: '0 0 10px',
            color: 'var(--fg)',
            fontWeight: 400,
            textWrap: 'balance',
          }}
        >
          <span style={{ color: 'var(--accent-amber)', fontStyle: 'normal', fontFamily: 'var(--ff-mono)' }}>&gt; </span>
          {author.manifesto}
        </h1>

        {/* "коммит-подпись" под манифестом */}
        <div
          style={{
            fontFamily: 'var(--ff-mono)',
            fontSize: 12,
            color: 'var(--muted)',
            letterSpacing: '0.04em',
            margin: '0 0 clamp(22px, 3vw, 32px)',
          }}
        >
          — {author.name}, лог №0049, 2026-05-14
        </div>

        <p
          style={{
            fontSize: 14,
            lineHeight: 1.7,
            color: 'var(--fg-soft)',
            maxWidth: 640,
            margin: '0 0 clamp(28px, 4vw, 40px)',
          }}
        >
          {author.intro}
        </p>

        {/* in-page CTA */}
        <nav
          aria-label="разделы"
          style={{
            display: 'flex',
            gap: 'clamp(20px, 3vw, 36px)',
            flexWrap: 'wrap',
            fontFamily: 'var(--ff-mono)',
            fontSize: 13,
            letterSpacing: '0.12em',
            textTransform: 'lowercase',
          }}
        >
          <a href="#output" style={{ color: 'var(--fg)' }}>
            <span style={{ color: 'var(--accent-amber)' }}>❯</span> каталог
          </a>
          <a href="#log" style={{ color: 'var(--fg)' }}>
            <span style={{ color: 'var(--accent-amber)' }}>❯</span> журнал
          </a>
          <a href="#process" style={{ color: 'var(--fg)' }}>
            <span style={{ color: 'var(--accent-amber)' }}>❯</span> процесс
          </a>
          <a href="#contact" style={{ color: 'var(--fg)' }}>
            <span style={{ color: 'var(--accent-amber)' }}>❯</span> написать
          </a>
        </nav>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .nameplate-hero .hero-seal {
            font-size: 26px;
            top: 16px;
            right: 16px;
            opacity: 0.28;
          }
        }
      `}</style>
    </section>
  );
};

window.Nameplate = Nameplate;
