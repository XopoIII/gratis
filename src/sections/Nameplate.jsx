// Nameplate (газетная шапка)

const Nameplate = ({ author }) => (
  <section id="top" className="pad" style={{ borderBottom: '4px double var(--rule-dark)', position: 'relative', overflow: 'hidden' }}>
    {/* фон-карта */}
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0,
      backgroundImage: 'url(assets/nameplate-bg.jpg?v=2)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      opacity: 0.42,
      mixBlendMode: 'multiply',
      pointerEvents: 'none',
    }}/>
    {/* виньетка + размывка краёв в бумагу */}
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0,
      background:
        'radial-gradient(ellipse at center, transparent 30%, var(--bg) 95%),' +
        'linear-gradient(var(--bg), transparent 18%, transparent 82%, var(--bg))',
      pointerEvents: 'none',
    }}/>


    <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>
      <span>Выпуск № 001</span>
      <span>Полевой бюллетень автора</span>
      <span>{new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}</span>
    </div>
    <h1 className="h-display nameplate" style={{ position: 'relative', fontSize: 'clamp(96px, 14vw, 168px)', margin: 0, textShadow: '0 1px 0 var(--bg)' }}>Интегра</h1>
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, alignItems: 'flex-end', marginTop: 18 }}>
      <p style={{ maxWidth: 720, lineHeight: 1.55, fontSize: 15, margin: 0 }}>{author.intro}</p>
      <Stamp>{author.tag}</Stamp>
    </div>
  </section>
);

window.Nameplate = Nameplate;
