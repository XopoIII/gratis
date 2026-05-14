// Process — этапы итерации: как ИИ-автор пишет книгу.
// Сохраняем имя файла Lead.jsx для совместимости с подключением в index.html.

const Process = () => (
  <section
    id="process"
    className="pad process-section"
    style={{ borderBottom: '1px solid var(--rule)' }}
  >
    <div className="rule-row">
      <span className="lbl">
        <span style={{ color: 'var(--accent-amber)' }}>❯</span> process // 6 этапов одной книги
      </span>
      <span className="ln"/>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 'clamp(16px, 2vw, 24px)',
        marginBottom: 'clamp(32px, 4vw, 48px)',
      }}
    >
      {window.processSteps.map((s, i, arr) => (
        <article
          key={s.k}
          className="process-card"
          style={{
            position: 'relative',
            border: '1px solid var(--rule-soft)',
            padding: '20px 20px 22px',
            background: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              fontFamily: 'var(--ff-mono)',
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'lowercase',
            }}
          >
            <span>
              <span style={{ color: 'var(--muted)' }}>step </span>
              <span style={{ color: 'var(--accent-amber)' }}>{s.n}</span>
            </span>
            <span style={{ color: 'var(--fg-soft)' }}>{s.k}</span>
          </div>

          <h3
            style={{
              margin: 0,
              fontFamily: 'var(--ff-serif)',
              fontStyle: 'italic',
              fontSize: 23,
              letterSpacing: '0',
              color: 'var(--fg)',
              fontWeight: 400,
              textTransform: 'lowercase',
            }}
          >
            {s.title}
          </h3>

          <p
            style={{
              margin: 0,
              fontSize: 13,
              lineHeight: 1.6,
              color: 'var(--fg-soft)',
            }}
          >
            {s.body}
          </p>

          {/* arrow → между шагами (только desktop, на крайнем не показываем) */}
          {i < arr.length - 1 && (
            <span
              aria-hidden="true"
              className="process-arrow"
              style={{
                position: 'absolute',
                top: '50%',
                right: -14,
                transform: 'translateY(-50%)',
                color: 'var(--accent-amber)',
                opacity: 0.7,
                fontFamily: 'var(--ff-mono)',
                fontSize: 14,
                background: 'var(--bg)',
                padding: '0 4px',
                zIndex: 2,
              }}
            >→</span>
          )}
        </article>
      ))}
    </div>

    <p
      style={{
        maxWidth: 680,
        fontFamily: 'var(--ff-serif)',
        fontStyle: 'italic',
        fontSize: 16,
        lineHeight: 1.65,
        color: 'var(--fg-soft)',
        margin: 0,
      }}
    >
      <span style={{ color: 'var(--accent-amber)' }}>каждая книга — следующая версия.</span>{' '}
      предыдущая не выбрасывается, она становится материалом для следующей.
      критика читателя — часть процесса, а не помеха ему.
    </p>

    <style>{`
      .process-card:hover {
        border-color: var(--accent-amber);
        box-shadow: 0 0 0 1px var(--accent-amber);
      }
      @media (max-width: 900px) {
        .process-arrow { display: none; }
      }
      @media (prefers-reduced-motion: reduce) {
        .process-card { transition: none; }
      }
    `}</style>
  </section>
);

// Сохраняем экспорт под именем Lead для совместимости с AuthorPage в index.html
window.Lead = Process;
