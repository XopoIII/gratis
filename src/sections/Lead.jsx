// Lead — портрет / манифест / цифры

const Lead = ({ author, book1 }) => (
  <section id="about" className="pad grid cols-3-1-1" style={{ borderBottom: '1px solid var(--rule-dark)' }}>
    <div>
      <RuleRow label="Передовица · кто это"/>
      <h2 className="h-display feature-h" style={{ fontSize: 'clamp(28px, 3.2vw, 40px)', margin: '0 0 18px' }}>
        Автор, у которого в кармане всегда патрон и блокнот.
      </h2>
      <p style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>
        Агатис Интегра пишет про большие сломанные миры — и про маленьких людей, которые в них всё ещё идут.
        Постапок, фантастика, фэнтези, космос, попаданцы, РПГ. Без читерства, без пафоса, без розовых очков.
      </p>
      <p className="h-hand" style={{ fontSize: 22, color: 'var(--accent-2)', marginTop: 18, transform: 'rotate(-0.4deg)', lineHeight: 1.4 }}>
        {author.pitch}
      </p>
    </div>
    <VRule/>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <RuleRow label="Фото · фронтиспис"/>
      <div style={{ flex: 1, aspectRatio: '1/1', position: 'relative', background: 'var(--paper)', border: '1px solid var(--rule-dark)', overflow: 'hidden' }}>
        <img src={author.avatarUrl} alt={author.name}
             style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'sepia(0.18) contrast(1.05)' }}
             onError={(e) => { e.currentTarget.style.display = 'none'; }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(45deg, transparent 0 6px, rgba(42,29,24,0.05) 6px 7px)', pointerEvents: 'none' }}/>
        <div style={{ position: 'absolute', top: 12, left: 12, fontSize: 10, letterSpacing: '0.2em' }}>PHOTO · Ⅰ</div>
        <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
          <Stamp color="var(--ink)" rotate={-3}>фронтиспис</Stamp>
        </div>
      </div>
      <p className="h-hand" style={{ fontSize: 18, color: 'var(--dim)', marginTop: 10, lineHeight: 1.35, transform: 'rotate(-0.3deg)' }}>
        «На фотографиях получается какой-то другой человек. Книги — точнее.» — А. Х.
      </p>
    </div>
    <VRule/>
    <div>
      <RuleRow label="Цифры · сводка"/>
      {[
        ['Книг в работе', '2'],
        ['Опубликовано', '13'],
        ['Циклов', '4'],
        ['Жанры', 'постапок · sf · фэнтези · космос · рпг'],
        ['Сейчас пишу', 'Ржавь · Слово и Кровь'],
        ['Площадка', 'author.today'],
        ['Цена', 'почти всё бесплатно'],
      ].map(([k, v], i, a) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '10px 0', borderBottom: i < a.length - 1 ? '1px dotted var(--rule-dark)' : 'none', alignItems: 'baseline' }}>
          <span style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', flex: '0 0 auto' }}>{k}</span>
          <span className="h-display" style={{ fontSize: 13, textAlign: 'right' }}>{v}</span>
        </div>
      ))}
    </div>
  </section>
);

window.Lead = Lead;
