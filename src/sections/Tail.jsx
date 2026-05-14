// Reviews + FAQ + Contact + Footer

const Reviews = ({ items }) => (
  <section id="readers" className="pad grid cols-2-1-2" style={{ borderBottom: '1px solid var(--rule-dark)' }}>
    <div>
      <RuleRow label="Письма читателей"/>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 28 }}>
        {items.map((t, i) => (
          <div key={i} style={{ borderTop: '1px solid var(--rule-dark)', paddingTop: 18 }}>
            <p style={{ fontSize: 15, lineHeight: 1.55, margin: 0, textWrap: 'pretty' }}>«{t.q}»</p>
            <div style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--dim)', marginTop: 12, textTransform: 'uppercase' }}>— {t.a}, {t.s}</div>
          </div>
        ))}
      </div>
    </div>
    <VRule/>
    <div>
      <RuleRow label="Часто спрашивают"/>
      {window.faq.map(([q, a], i, arr) => (
        <div key={i} style={{ borderBottom: i < arr.length - 1 ? '1px dotted var(--rule-dark)' : 'none', padding: '14px 0' }}>
          <div className="h-display" style={{ fontSize: 16, marginBottom: 4 }}>{q}</div>
          <div style={{ fontSize: 13, color: 'var(--dim)', lineHeight: 1.6 }}>{a}</div>
        </div>
      ))}
    </div>
  </section>
);

const Contact = ({ author }) => (
  <section id="contact" className="pad" style={{ background: 'var(--paper)', borderTop: '1px solid var(--rule)' }}>
    <RuleRow label="Связь"/>
    <div className="grid cols-1-1" style={{ alignItems: 'flex-end' }}>
      <h2 className="h-display feature-h" style={{ fontSize: 'clamp(48px, 7vw, 76px)', margin: 0 }}>
        Напиши <span style={{ color: 'var(--accent)' }}>письмо.</span>
      </h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 15, lineHeight: 2 }}>
        {author.socials.map(s => (
          <li key={s.k}>
            <span style={{ color: 'var(--accent-2)', marginRight: 14, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase' }}>{s.k}</span>
            <a href={s.href} target="_blank" rel="noreferrer">{s.v}</a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const Footer = () => (
  <footer className="pad-s" style={{ borderTop: '4px double var(--rule-dark)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--dim)' }}>
    <span>© Агатис Интегра · 2026</span>
    <span>самиздат · постапок</span>
    <span>читать медленно</span>
  </footer>
);

Object.assign(window, { Reviews, Contact, Footer });
