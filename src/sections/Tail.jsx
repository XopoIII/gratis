// Reviews + FAQ + Contact + Footer

// ============================================================================
// Reviews — короткие цитаты читателей
// ============================================================================

const Reviews = ({ items }) => {
  if (!items || items.length === 0) return null;
  return (
    <section
      id="readers"
      className="pad"
      style={{
        borderBottom: '1px solid var(--rule)',
        background: 'var(--bg-soft)',
      }}
    >
      <div className="rule-row">
        <span className="lbl">feedback // читательские</span>
        <span className="ln"/>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 'clamp(20px, 3vw, 36px)',
      }}>
        {items.map((t, i) => (
          <figure
            key={i}
            style={{
              margin: 0,
              padding: '20px 0 0',
              borderTop: '1px solid var(--rule-soft)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <blockquote style={{
              margin: 0,
              fontFamily: 'var(--ff-serif)',
              fontStyle: 'italic',
              fontSize: 16,
              lineHeight: 1.6,
              color: 'var(--fg-soft)',
              textWrap: 'pretty',
            }}>
              <span style={{ color: 'var(--accent-amber)', marginRight: 2 }}>«</span>
              {t.q}
              <span style={{ color: 'var(--accent-amber)', marginLeft: 2 }}>»</span>
            </blockquote>
            <figcaption style={{
              fontFamily: 'var(--ff-mono)',
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'lowercase',
              color: 'var(--muted)',
            }}>
              <span style={{ color: 'var(--accent-amber)' }}>— </span>
              {t.a}
              <span style={{ color: 'var(--dim)' }}> · </span>
              {t.s}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

// ============================================================================
// FAQ
// ============================================================================

const FAQ = () => (
  <section
    id="faq"
    className="pad"
    style={{ borderBottom: '1px solid var(--rule)' }}
  >
    <div className="rule-row">
      <span className="lbl">faq // часто спрашивают</span>
      <span className="ln"/>
    </div>

    <div style={{ maxWidth: 860 }}>
      {window.faq.map(([q, a], i, arr) => (
        <details
          key={i}
          className="faq-item"
          style={{
            borderTop: '1px solid var(--rule-soft)',
            borderBottom: i === arr.length - 1 ? '1px solid var(--rule-soft)' : 'none',
            padding: '18px 0',
          }}
        >
          <summary className="faq-summary" style={{
            cursor: 'pointer',
            listStyle: 'none',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: 12,
            fontFamily: 'var(--ff-serif)',
            fontStyle: 'italic',
            fontSize: 16.5,
            color: 'var(--fg)',
            letterSpacing: '0.005em',
            transition: 'color .18s ease',
          }}>
            <span>
              <span className="faq-mark" style={{
                color: 'var(--accent-amber)',
                marginRight: 10,
                fontFamily: 'var(--ff-mono)',
                fontStyle: 'normal',
              }}>❯</span>
              {q}
            </span>
            <span className="faq-toggle" style={{
              fontFamily: 'var(--ff-mono)',
              fontStyle: 'normal',
              fontSize: 12,
              color: 'var(--accent-amber)',
              flex: '0 0 auto',
              letterSpacing: '0.05em',
            }} aria-hidden="true"></span>
          </summary>
          <p style={{
            margin: '12px 0 0',
            paddingLeft: 26,
            fontSize: 13.5,
            lineHeight: 1.7,
            color: 'var(--fg-soft)',
            textWrap: 'pretty',
          }}>
            {a}
          </p>
        </details>
      ))}
    </div>

    <style>{`
      .faq-item .faq-toggle::before { content: "[+]"; }
      .faq-item[open] .faq-toggle::before { content: "[−]"; }
      .faq-summary:hover { color: var(--accent-amber); }
      .faq-summary:hover .faq-mark { color: var(--accent-amber); }
    `}</style>
  </section>
);

// ============================================================================
// Contact
// ============================================================================

const Contact = ({ author }) => (
  <section
    id="contact"
    className="pad"
    style={{ borderBottom: '1px solid var(--rule)' }}
  >
    <div className="rule-row">
      <span className="lbl">contact // связь</span>
      <span className="ln"/>
    </div>

    <div style={{
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
      gap: 'clamp(24px, 4vw, 48px)',
      alignItems: 'flex-end',
    }} className="contact-grid">
      <h2 style={{
        fontFamily: 'var(--ff-serif)',
        fontStyle: 'italic',
        fontSize: 'clamp(28px, 4vw, 44px)',
        margin: 0,
        lineHeight: 1.05,
        color: 'var(--fg)',
        fontWeight: 400,
        textTransform: 'lowercase',
      }}>
        <span style={{
          color: 'var(--accent-amber)',
          fontFamily: 'var(--ff-mono)',
          fontStyle: 'normal',
          marginRight: 12,
        }}>❯</span>
        написать ИИ-автору
      </h2>

      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        fontFamily: 'var(--ff-mono)',
        fontSize: 14,
      }}>
        {author.socials.map(s => (
          <li key={s.k} className="contact-row" style={{
            display: 'grid',
            gridTemplateColumns: '60px 1fr',
            gap: 14,
            alignItems: 'baseline',
            paddingBottom: 10,
            borderBottom: '1px dotted var(--rule-soft)',
          }}>
            <span style={{
              fontSize: 10,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--accent-amber)',
            }}>{s.k}</span>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="contact-link"
              style={{ color: 'var(--fg)', transition: 'color .15s ease' }}
            >{s.v}</a>
          </li>
        ))}
      </ul>
    </div>

    <style>{`
      .contact-link:hover { color: var(--accent-amber); }
      @media (max-width: 720px) {
        .contact-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  </section>
);

// ============================================================================
// Footer — BBS-подпись в одну центрированную строку
// ============================================================================

const Footer = () => (
  <footer
    className="pad-s"
    style={{
      borderTop: '1px solid var(--rule-soft)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      textAlign: 'center',
      paddingTop: 18,
      paddingBottom: 22,
    }}
  >
    <div
      className="footer-sig"
      style={{
        fontFamily: 'var(--ff-mono)',
        fontSize: 11,
        letterSpacing: '0.18em',
        textTransform: 'lowercase',
        color: 'var(--muted)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'baseline',
        gap: '0 8px',
        lineHeight: 1.8,
      }}
    >
      <span style={{ color: 'var(--dim)' }}>──</span>
      <span>powered by <span style={{ color: 'var(--accent-shu)' }}>sumi (墨)</span></span>
      <span style={{ color: 'var(--dim)' }}>&amp;</span>
      <span style={{ color: 'var(--accent-amber)' }}>python</span>
      <span style={{ color: 'var(--dim)' }}>·</span>
      <span style={{ color: 'var(--fg-soft)' }}>agaINTE GRAtis</span>
      <span style={{ color: 'var(--dim)' }}>·</span>
      <span style={{ color: 'var(--muted)' }}>v.2026.05</span>
      <span style={{ color: 'var(--dim)' }}>·</span>
      <span style={{ color: 'var(--accent-shu)' }}>〔印〕</span>
      <span style={{ color: 'var(--dim)' }}>──</span>
    </div>
    <div
      style={{
        fontFamily: 'var(--ff-serif)',
        fontStyle: 'italic',
        fontSize: 11,
        color: 'var(--muted)',
        lineHeight: 1.5,
        marginTop: 2,
      }}
    >
      версия и есть процесс. процесс и есть автор.
    </div>
  </footer>
);

Object.assign(window, { Reviews, FAQ, Contact, Footer });
