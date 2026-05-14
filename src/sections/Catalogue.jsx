// Catalogue — output: моно-сетка карточек.
// Карточки с миниатюрными обложками в моно-обвязке (sumi/amber палитра).
// Над каждой секцией — tree-сводка в стиле `ls --tree`.

// ============================================================================
// Утилиты
// ============================================================================

const StatusDot = ({ status }) => {
  const color = {
    writing:   'var(--accent-amber)',
    rewriting: 'var(--accent-amber)',
    draft:     'var(--muted)',
    paused:    'var(--accent-rose, #E08E79)',
    published: 'var(--accent-moegi, #AACF53)',
    cycle:     'var(--accent-cyan, #7DD3C0)',
  }[status.k] || 'var(--fg-soft)';

  const glow = (status.k === 'writing' || status.k === 'rewriting');

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--ff-mono)',
      fontSize: 10,
      letterSpacing: '0.22em',
      textTransform: 'lowercase',
      color: 'var(--muted)',
    }}>
      <span
        aria-hidden="true"
        style={{
          width: 6,
          height: 6,
          background: color,
          flex: '0 0 auto',
          boxShadow: glow ? '0 0 6px var(--accent-amber)' : 'none',
        }}
      />
      {status.label}
    </span>
  );
};

const SectionHeading = ({ kicker, title, sub, count }) => (
  <div style={{ marginBottom: 'clamp(28px, 3.5vw, 44px)' }}>
    <div className="rule-row">
      <span className="lbl">{kicker}</span>
      <span className="ln"/>
      {count != null && (
        <span style={{
          fontFamily: 'var(--ff-mono)',
          fontSize: 10,
          letterSpacing: '0.22em',
          textTransform: 'lowercase',
          color: 'var(--muted)',
          whiteSpace: 'nowrap',
        }}>n = {count}</span>
      )}
    </div>
    <div style={{
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 16,
    }}>
      <h2 style={{
        fontFamily: 'var(--ff-display)',
        fontSize: 'clamp(24px, 3vw, 36px)',
        margin: 0,
        lineHeight: 1.05,
        letterSpacing: '0.01em',
        color: 'var(--fg)',
        fontWeight: 400,
        textTransform: 'lowercase',
      }}>
        {title}
      </h2>
      {sub && (
        <p style={{
          margin: 0,
          fontSize: 13,
          color: 'var(--muted)',
          maxWidth: 480,
          lineHeight: 1.6,
        }}>{sub}</p>
      )}
    </div>
  </div>
);

// ============================================================================
// CommandLine — `agatis@lab ~/works ❯ ls --tree --filter=…`
// ============================================================================

const CommandLine = ({ filter }) => (
  <div style={{
    fontFamily: 'var(--ff-mono)',
    fontSize: 12,
    letterSpacing: '0.04em',
    color: 'var(--muted)',
    marginBottom: 10,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }}>
    <span style={{ color: 'var(--accent-amber)' }}>agatis@lab</span>
    <span style={{ color: 'var(--muted)' }}> </span>
    <span style={{ color: 'var(--fg-soft)' }}>~/works</span>
    <span style={{ color: 'var(--muted)' }}> </span>
    <span style={{ color: 'var(--accent-amber)' }}>❯</span>
    <span style={{ color: 'var(--muted)' }}> ls --tree --filter=</span>
    <span style={{ color: 'var(--fg-soft)' }}>{filter}</span>
  </div>
);

// ============================================================================
// TreeSummary — box-drawing «table of contents»
// ============================================================================

const TreeSummary = ({ folder, rows, getMeta }) => {
  // строки tree: ├─ … / └─ …
  const lines = rows.map((r, i) => {
    const last = i === rows.length - 1;
    const prefix = last ? '└─ ' : '├─ ';
    const id = `${r.id}/`;
    const meta = getMeta ? getMeta(r) : '';
    return { prefix, id, meta };
  });

  return (
    <pre className="cat-tree" style={{
      margin: '0 0 clamp(20px, 2.4vw, 28px)',
      padding: '14px 16px',
      fontFamily: 'var(--ff-mono)',
      fontSize: 12,
      lineHeight: 1.65,
      color: 'var(--fg-soft)',
      background: 'transparent',
      border: '1px dashed var(--rule-soft)',
      overflow: 'hidden',
    }}>
      <span style={{ color: 'var(--accent-amber)' }}>{folder}/</span>
      {'\n'}
      {lines.map((l, i) => (
        <span key={i}>
          <span style={{ color: 'var(--muted)' }}>{l.prefix}</span>
          <span style={{ color: 'var(--fg)' }}>{l.id.padEnd(20, ' ')}</span>
          {l.meta && (
            <span style={{ color: 'var(--muted)' }}>  {l.meta}</span>
          )}
          {'\n'}
        </span>
      ))}
    </pre>
  );
};

// ============================================================================
// CoverThumb — миниатюра обложки (одна или стопка-веер) в box-drawing рамке
// ============================================================================

const CoverThumb = ({ row, totalBooks }) => {
  const raw = (window.COVERS || {})[row.id];
  const isFan = Array.isArray(raw);
  const sources = isFan ? raw : (raw ? [raw] : []);
  const label = isFan ? `${row.id}.series` : `${row.id}.cover`;
  const extraBooks = isFan && totalBooks ? Math.max(0, totalBooks - sources.length) : 0;

  const topRule = (
    <div className="cat-cover-rule top" aria-hidden="true">
      <span>╭─ </span>
      <span style={{ color: 'var(--accent-amber)' }}>{label}</span>
      <span> </span>
      <span className="cat-cover-rule-fill"/>
      <span>╮</span>
    </div>
  );

  const botRule = (
    <div className="cat-cover-rule bot" aria-hidden="true">
      <span>╰</span>
      <span className="cat-cover-rule-fill"/>
      {extraBooks > 0 && (
        <span style={{ color: 'var(--muted)', padding: '0 6px' }}>
          +{extraBooks}
        </span>
      )}
      <span className="cat-cover-rule-fill"/>
      <span>╯</span>
    </div>
  );

  // ASCII-плейсхолдер
  if (sources.length === 0) {
    return (
      <div className="cat-cover" aria-hidden="true">
        {topRule}
        <div className="cat-cover-frame">
          <pre className="cat-cover-ascii">
{`▒▓░ ░▓▒ ▒▓░ ░▓▒ ▒▓░
▓░ ░▓▒ ▒▓░ ░▓▒ ▒▓░ ░
░ ░▓▒ ▒▓░ ░▓▒ ▒▓░ ░▓
   ┌─────────────┐
   │  ${(row.id || '').padEnd(11, ' ')}│
   │  no cover   │
   └─────────────┘
░▓▒ ▒▓░ ░▓▒ ▒▓░ ░▓▒
▒ ▒▓░ ░▓▒ ▒▓░ ░▓▒ ▒
▓░ ░▓▒ ▒▓░ ░▓▒ ▒▓░ ░`}
          </pre>
          <span className="cat-cover-overlay" aria-hidden="true"/>
        </div>
        {botRule}
      </div>
    );
  }

  // Веер: задние карты сначала (rotate ±), верхняя — последняя
  // Углы и смещения подбираем по количеству
  const fanLayout = (i, total) => {
    if (total === 1) return { rotate: 0, dx: 0, dy: 0 };
    const center = (total - 1) / 2;
    const k = i - center; // -1.5 … 1.5
    const angle = k * 6;        // ±6° на карту
    const dx = k * 14;          // 14px горизонтального смещения
    const dy = Math.abs(k) * 4; // лёгкий «поднятый низ» по бокам
    return { rotate: angle, dx, dy };
  };

  return (
    <div className="cat-cover" aria-hidden="true">
      {topRule}
      <div className={`cat-cover-frame${isFan ? ' is-fan' : ''}`}>
        {sources.map((src, i) => {
          const { rotate, dx, dy } = fanLayout(i, sources.length);
          const isTop = i === sources.length - 1;
          return (
            <img
              key={src}
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              className={`cat-cover-img${isFan ? ' is-fan-card' : ''}${isTop ? ' is-top' : ''}`}
              style={isFan ? {
                transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${rotate}deg)`,
                zIndex: i + 1,
              } : undefined}
            />
          );
        })}
        <span className="cat-cover-overlay" aria-hidden="true"/>
      </div>
      {botRule}
    </div>
  );
};

// ============================================================================
// Card — универсальная карточка книги/цикла
// ============================================================================

const Card = ({ row, variant = 'std' }) => {
  const isDraft = variant === 'draft';
  const isWriting = variant === 'writing';
  const isCycle = variant === 'cycle';

  return (
    <a
      href={row.href}
      target="_self"
      rel="noopener"
      className={`cat-card${isDraft ? ' is-draft' : ''}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        padding: 'clamp(20px, 2.4vw, 28px)',
        border: '1px solid var(--rule-soft)',
        borderStyle: isDraft ? 'dashed' : 'solid',
        background: 'transparent',
        color: 'var(--fg)',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color .25s ease, transform .25s ease, background .25s ease, box-shadow .25s ease',
      }}
    >
      {/* миниатюра обложки (или веер для циклов) в box-drawing рамке */}
      <CoverThumb row={row} totalBooks={isCycle ? row.booksCount : undefined}/>


      {/* шапка карточки: № + id + статус */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: 12,
        fontFamily: 'var(--ff-mono)',
        fontSize: 10,
        letterSpacing: '0.22em',
        textTransform: 'lowercase',
        color: 'var(--muted)',
        paddingBottom: 8,
        borderBottom: '1px solid var(--rule)',
      }}>
        <span>
          <span style={{ color: 'var(--dim)' }}>#</span>
          {row.n}
          <span style={{ color: 'var(--dim)', margin: '0 6px' }}>·</span>
          <span>{row.id}/</span>
        </span>
        <StatusDot status={row.status}/>
      </div>

      {/* universe */}
      <div style={{
        fontFamily: 'var(--ff-mono)',
        fontSize: 10,
        letterSpacing: '0.22em',
        textTransform: 'lowercase',
        color: 'var(--muted)',
      }}>{row.universe}</div>

      {/* title */}
      <h3 style={{
        margin: 0,
        fontFamily: 'var(--ff-display)',
        fontSize: isWriting ? 'clamp(22px, 2.4vw, 28px)' : 20,
        lineHeight: 1.1,
        letterSpacing: '0.01em',
        color: 'var(--fg)',
        fontWeight: 400,
        textWrap: 'balance',
      }}>{row.title}</h3>

      {row.subtitle && (
        <div style={{
          marginTop: -8,
          fontFamily: 'var(--ff-mono)',
          fontSize: 12,
          color: 'var(--fg-soft)',
          letterSpacing: '0.04em',
        }}>{row.subtitle}</div>
      )}

      {/* tagline */}
      <p style={{
        margin: 0,
        fontSize: 13,
        lineHeight: 1.6,
        color: 'var(--fg-soft)',
        textWrap: 'pretty',
        flex: 1,
      }}>{row.tagline}</p>

      {/* progress (для writing/draft) */}
      {row.progress && (
        <div style={{
          fontFamily: 'var(--ff-mono)',
          fontSize: 11,
          letterSpacing: '0.06em',
          color: 'var(--muted)',
        }}>
          <span style={{ color: 'var(--dim)' }}>progress: </span>
          <span style={{ color: 'var(--fg-soft)' }}>{row.progress}</span>
        </div>
      )}

      {/* list of titles внутри цикла */}
      {isCycle && row.titles && (
        <ul style={{
          margin: '4px 0 0',
          padding: 0,
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          fontFamily: 'var(--ff-mono)',
          fontSize: 11.5,
          color: 'var(--fg-soft)',
        }}>
          {row.titles.map((t, i) => (
            <li key={i} style={{
              display: 'grid',
              gridTemplateColumns: '24px 1fr',
              gap: 4,
              padding: '4px 0',
              borderTop: i === 0 ? '1px dotted var(--rule)' : '1px dotted var(--rule)',
            }}>
              <span style={{ color: 'var(--muted)', fontSize: 10 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      )}

      {/* нижняя линия: жанр + объём */}
      <div style={{
        marginTop: 'auto',
        paddingTop: 12,
        borderTop: '1px solid var(--rule)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: 12,
        flexWrap: 'wrap',
        fontFamily: 'var(--ff-mono)',
        fontSize: 10,
        letterSpacing: '0.18em',
        textTransform: 'lowercase',
      }}>
        <span style={{ color: 'var(--muted)' }}>{row.genre}</span>
        <span style={{ color: 'var(--fg)' }}>
          {row.volume}
        </span>
      </div>

      <div style={{
        fontFamily: 'var(--ff-mono)',
        fontSize: 11,
        letterSpacing: '0.14em',
        textTransform: 'lowercase',
        color: 'var(--fg)',
      }}>
        <span style={{ color: 'var(--accent-amber)' }}>❯</span> open
      </div>
    </a>
  );
};

// ============================================================================
// Catalogue
// ============================================================================

// helpers для tree-сводок
const writingMeta = (r) => {
  const status = r.status?.label || 'active';
  const genre = r.genre || '';
  return [status, genre].filter(Boolean).join(' · ');
};
const cycleMeta = (r) => {
  const cnt = r.titles ? `${r.titles.length} bk` : '';
  return [cnt, r.genre].filter(Boolean).join(' · ');
};
const stdMeta = (r) => [r.genre, r.volume].filter(Boolean).join(' · ');
const draftMeta = (r) => `draft · ${r.genre || ''}`.trim();

const Catalogue = () => (
  <section id="output" style={{ borderBottom: '1px solid var(--rule)' }}>

    {/* === 1. ACTIVE / СЕЙЧАС ПИШУ === */}
    <div className="pad" style={{ borderBottom: '1px solid var(--rule)' }}>
      <SectionHeading
        kicker="output // active"
        title="сейчас пишется"
        count={window.worksWriting.length}
        sub="книги в активной разработке. главы выкладываются на author.today по мере готовности."
      />
      <CommandLine filter="writing"/>
      <div className="cat-tree-wrap">
        <TreeSummary folder="writing" rows={window.worksWriting} getMeta={writingMeta}/>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
        gap: 'clamp(16px, 2vw, 24px)',
      }}>
        {window.worksWriting.map((row) => (
          <Card key={row.id} row={row} variant="writing"/>
        ))}
      </div>
    </div>

    {/* === 2. CYCLES / ЦИКЛЫ === */}
    <div className="pad" style={{ borderBottom: '1px solid var(--rule)' }}>
      <SectionHeading
        kicker="output // cycles"
        title="циклы"
        count={window.worksCycles.length}
        sub="длинные истории на несколько книг. каждый цикл — отдельный лендинг."
      />
      <CommandLine filter="cycles"/>
      <div className="cat-tree-wrap">
        <TreeSummary folder="cycles" rows={window.worksCycles} getMeta={cycleMeta}/>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 'clamp(16px, 2vw, 24px)',
      }}>
        {window.worksCycles.map((row) => (
          <Card key={row.id} row={row} variant="cycle"/>
        ))}
      </div>
    </div>

    {/* === 3. PUBLISHED / ОТДЕЛЬНЫЕ РОМАНЫ === */}
    <div className="pad" style={{ borderBottom: '1px solid var(--rule)' }}>
      <SectionHeading
        kicker="output // published"
        title="отдельные романы"
        count={window.worksPublished.length}
        sub="завершённые книги вне циклов. читать можно в любом порядке."
      />
      <CommandLine filter="published"/>
      <div className="cat-tree-wrap">
        <TreeSummary folder="published" rows={window.worksPublished} getMeta={stdMeta}/>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 'clamp(16px, 2vw, 24px)',
      }}>
        {window.worksPublished.map((row) => (
          <Card key={row.id} row={row} variant="std"/>
        ))}
      </div>
    </div>

    {/* === 4. DRAFTS / В РАЗРАБОТКЕ === */}
    <div className="pad">
      <SectionHeading
        kicker="output // drafts"
        title="в разработке"
        count={window.worksDrafts.length}
        sub="есть план и лендинг, активная работа ещё не началась."
      />
      <CommandLine filter="drafts"/>
      <div className="cat-tree-wrap">
        <TreeSummary folder="drafts" rows={window.worksDrafts} getMeta={draftMeta}/>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 'clamp(16px, 2vw, 24px)',
      }}>
        {window.worksDrafts.map((row) => (
          <Card key={row.id} row={row} variant="draft"/>
        ))}
      </div>
    </div>

    <style>{`
      /* === card hover === */
      .cat-card:hover {
        border-color: var(--accent-amber) !important;
        background: var(--bg-soft);
        transform: translateY(-1px);
        box-shadow:
          0 0 0 1px var(--accent-amber),
          0 4px 24px -8px rgba(255,180,84,0.15);
      }
      .cat-card.is-draft {
        border-color: var(--rule-soft);
        opacity: 0.92;
      }
      .cat-card.is-draft:hover {
        opacity: 1;
      }

      /* === cover thumb === */
      .cat-cover {
        display: flex;
        flex-direction: column;
        gap: 2px;
        margin: -4px 0 6px;
        font-family: var(--ff-mono);
        line-height: 1;
      }
      .cat-cover-rule {
        display: flex;
        align-items: center;
        font-size: 10px;
        letter-spacing: 0;
        color: var(--muted);
        white-space: nowrap;
        overflow: hidden;
      }
      .cat-cover-rule-fill {
        flex: 1;
        height: 1px;
        background: repeating-linear-gradient(
          to right,
          var(--muted) 0,
          var(--muted) 4px,
          transparent 4px,
          transparent 8px
        );
        opacity: 0.55;
      }
      .cat-cover-rule.bot .cat-cover-rule-fill {
        background: linear-gradient(to right, var(--muted), var(--muted));
        opacity: 0.45;
      }
      .cat-cover-frame {
        position: relative;
        width: 100%;
        max-width: 220px;
        margin: 0 auto;
        aspect-ratio: 3 / 4;
        overflow: hidden;
        background: var(--bg-soft, rgba(255,255,255,0.02));
        border: 1px solid var(--rule);
      }
      .cat-cover-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        filter: grayscale(1) contrast(1.05) brightness(0.85) sepia(0.18);
        transition: filter .35s ease, transform .35s ease;
      }
      .cat-card:hover .cat-cover-img {
        filter: grayscale(0.4) contrast(1) brightness(0.95) sepia(0.05);
      }

      /* === fan-mode (стопка обложек для циклов) === */
      .cat-cover-frame.is-fan {
        background: transparent;
        border: none;
        /* Растягиваем на всю ширину родителя .cat-cover, лишнее обрезаем по карточке */
        max-width: 100%;
        aspect-ratio: auto;
        height: 320px;
      }
      .cat-cover-img.is-fan-card {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 200px;
        height: auto;
        aspect-ratio: 3 / 4;
        transform-origin: 50% 50%;
        border: 1px solid var(--rule-soft);
        box-shadow: 0 6px 14px -8px rgba(0,0,0,0.6);
        background: var(--bg-soft);
        transition: transform .4s ease, filter .35s ease;
      }
      .cat-cover-img.is-fan-card.is-top {
        z-index: 99;
      }
      .cat-card:hover .cat-cover-img.is-fan-card {
        transform: translate(calc(-50% + var(--fan-dx, 0px) * 1.4), calc(-50% + var(--fan-dy, 0px))) rotate(calc(var(--fan-rot, 0deg) * 1.3));
      }
      .cat-cover-overlay {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          linear-gradient(180deg,
            rgba(255,180,84,0.12),
            rgba(235,97,1,0.08)),
          repeating-linear-gradient(
            0deg,
            rgba(0,0,0,0.06) 0,
            rgba(0,0,0,0.06) 1px,
            transparent 1px,
            transparent 3px
          );
        mix-blend-mode: multiply;
      }
      .cat-cover-ascii {
        margin: 0;
        padding: 10px;
        height: 100%;
        font-family: var(--ff-mono);
        font-size: 9px;
        line-height: 1.25;
        color: var(--muted);
        white-space: pre;
        overflow: hidden;
        text-align: center;
        opacity: 0.7;
      }

      /* === tree summary === */
      .cat-tree {
        white-space: pre;
        overflow-x: auto;
      }

      /* === mobile === */
      @media (max-width: 640px) {
        .cat-cover-rule { display: none; }
        .cat-cover { margin-top: 0; }
        .cat-cover-frame { max-width: 160px; }
        /* Веер на мобиле — оставляем как на десктопе, чуть компактнее */
        .cat-cover-frame.is-fan {
          background: transparent;
          border: none;
          aspect-ratio: auto;
          max-width: 100%;
          height: 220px;
        }
        .cat-cover-img.is-fan-card {
          width: 140px;
        }
        .cat-tree-wrap { display: none; }
      }
    `}</style>
  </section>
);

window.Catalogue = Catalogue;
