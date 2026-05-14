// Laboratory — собственный инструмент / принципы работы.
// Содержит только принципы, без раскрытия реализации.

const Laboratory = () => (
  <section
    id="lab"
    className="pad lab-section"
    style={{ borderBottom: '1px solid var(--rule)' }}
  >
    <div className="rule-row">
      <span className="lbl">
        <span style={{ color: 'var(--accent-amber)' }}>❯</span> laboratory // 5 принципов инструмента
      </span>
      <span className="ln"/>
    </div>

    <p
      className="lab-intro"
      style={{
        maxWidth: 680,
        fontFamily: 'var(--ff-serif)',
        fontStyle: 'italic',
        fontSize: 16,
        lineHeight: 1.65,
        color: 'var(--fg-soft)',
        margin: '0 0 clamp(28px, 3vw, 40px)',
      }}
    >
      <span style={{ color: 'var(--accent-amber)' }}>инструмент. собственный.</span>{' '}
      пишется параллельно с книгами. каждая книга — заодно тест-кейс.
    </p>

    <div
      className="lab-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 'clamp(16px, 2vw, 24px)',
        marginBottom: 'clamp(28px, 3vw, 40px)',
      }}
    >
      {window.labPrinciples.map((p) => (
        <article
          key={p.k}
          className="lab-card"
          style={{
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
              gap: 12,
            }}
          >
            <span>
              <span style={{ color: 'var(--muted)' }}>module </span>
              <span style={{ color: 'var(--accent-amber)' }}>{p.n}</span>
            </span>
            <span style={{ color: 'var(--fg-soft)' }}>{p.k}</span>
          </div>

          <h3
            style={{
              margin: 0,
              fontFamily: 'var(--ff-serif)',
              fontStyle: 'italic',
              fontSize: 21,
              color: 'var(--fg)',
              fontWeight: 400,
              textTransform: 'lowercase',
              lineHeight: 1.25,
            }}
          >
            {p.title}
          </h3>

          <p
            style={{
              margin: 0,
              fontSize: 13,
              lineHeight: 1.6,
              color: 'var(--fg-soft)',
            }}
          >
            {p.body}
          </p>
        </article>
      ))}
    </div>

    <p
      style={{
        maxWidth: 680,
        fontFamily: 'var(--ff-mono)',
        fontSize: 12,
        lineHeight: 1.7,
        letterSpacing: '0.04em',
        color: 'var(--muted)',
        margin: 0,
      }}
    >
      <span style={{ color: 'var(--accent-amber)' }}>// </span>
      детали — закрытые. показываю принципы, не реализацию.
    </p>

    <style>{`
      .lab-card:hover {
        border-color: var(--accent-amber);
        box-shadow: 0 0 0 1px var(--accent-amber);
      }
      @media (prefers-reduced-motion: reduce) {
        .lab-card { transition: none; }
      }
    `}</style>
  </section>
);

window.Laboratory = Laboratory;
