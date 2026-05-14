// Header — статус-бар активной AI-сессии

const Header = ({ author }) => (
  <header
    className="pad-s ai-statusbar"
    style={{
      borderBottom: '1px solid var(--rule)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 24,
      fontFamily: 'var(--ff-mono)',
      fontSize: 12,
      letterSpacing: '0.14em',
      textTransform: 'lowercase',
      color: 'var(--muted)',
    }}
  >
    {/* LEFT — бренд */}
    <a
      href="#top"
      className="ai-brand"
      style={{ color: 'var(--fg)', letterSpacing: '0.06em', display: 'inline-flex', alignItems: 'center', gap: 8 }}
      aria-label="agaINTE GRAtis — главная"
    >
      <span className="ai-prompt-mark" style={{ color: 'var(--accent-amber)' }}>❯</span>
      <span style={{ color: 'var(--fg)' }}>agaINTE GRAtis</span>
      <span style={{ color: 'var(--muted)' }}>· {author.version}</span>
    </a>

    {/* CENTER — навигация */}
    <nav
      className="nav-links ai-nav"
      style={{ display: 'flex', gap: 22 }}
    >
      <a href="#process"><span style={{ color: 'var(--accent-amber)' }}>·</span> process</a>
      <a href="#log"><span style={{ color: 'var(--accent-amber)' }}>·</span> log</a>
      <a href="#output"><span style={{ color: 'var(--accent-amber)' }}>·</span> catalog</a>
      <a href="#faq"><span style={{ color: 'var(--accent-amber)' }}>·</span> faq</a>
      <a href="#contact"><span style={{ color: 'var(--accent-amber)' }}>·</span> contact</a>
    </nav>

    {/* RIGHT — мини-статус AI-сессии */}
    <span
      className="ai-status"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 14,
        whiteSpace: 'nowrap',
      }}
    >
      <span>
        <span style={{ color: 'var(--muted)' }}>model: </span>
        <span style={{ color: 'var(--fg-soft)' }}>opus</span>
      </span>
      <span>
        <span style={{ color: 'var(--muted)' }}>ctx: </span>
        <span style={{ color: 'var(--fg-soft)' }}>1M</span>
      </span>
      <span>
        <span style={{ color: 'var(--muted)' }}>status: </span>
        <span style={{ color: 'var(--accent-amber)' }}>rewriting</span>
        <span style={{ color: 'var(--fg-soft)' }}> «ржавь»</span>
        <span className="ai-cursor" style={{ color: 'var(--accent-amber)', marginLeft: 4 }}>▌</span>
      </span>
    </span>

    <style>{`
      .ai-prompt-mark { animation: aiPromptBlink 1.4s ease-in-out infinite; }
      .ai-cursor { animation: aiPromptBlink 1.1s steps(2, start) infinite; }
      @keyframes aiPromptBlink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
      @media (max-width: 640px) {
        .ai-statusbar .ai-status { display: none !important; }
        .ai-statusbar .ai-nav { display: none !important; }
      }
      @media (max-width: 900px) and (min-width: 641px) {
        .ai-statusbar .ai-status { display: none !important; }
      }
      @media (prefers-reduced-motion: reduce) {
        .ai-prompt-mark, .ai-cursor { animation: none; }
      }
    `}</style>
  </header>
);

window.Header = Header;
