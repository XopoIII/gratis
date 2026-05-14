// LogPreview — последние записи журнала на главной (git log --oneline стиль).
// Полный журнал — отдельный лендинг /log/

const BOOK_MAP = {
  'РЖАВЬ':         { short: 'rzhav',    common: false },
  'СЛОВО И КРОВЬ': { short: 's&k',      common: false },
  'НАВМОР':        { short: 'navmor',   common: false },
  'ЖУСАН':         { short: 'zhusan',   common: false },
  'ОБЩЕЕ':         { short: '*common*', common: true  },
};

// Детерминированный псевдо-хеш (8 hex chars) из date+iter
const pseudoHash = (seed) => {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  // расширяем до 8 hex chars подмешиванием второй итерации
  let h2 = h;
  for (let i = seed.length - 1; i >= 0; i--) {
    h2 ^= seed.charCodeAt(i);
    h2 = Math.imul(h2, 2654435761) >>> 0;
  }
  return (h.toString(16) + h2.toString(16)).slice(0, 8).padStart(8, '0');
};

const truncate = (s, n) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s);

const BOOK_PAD = 10; // ширина колонки книги

const LogPreviewRow = ({ entry }) => {
  const meta  = BOOK_MAP[entry.book] || { short: entry.book.toLowerCase(), common: false };
  const hash  = pseudoHash(entry.date + ':' + entry.iter);
  const bookColor = meta.common ? 'var(--accent-cyan)' : 'var(--accent-moegi)';
  const bookLabel = meta.short.padEnd(BOOK_PAD, ' ');
  const short = truncate(entry.body, 85);
  const isTruncated = entry.body.length > 85;

  return (
    <details className="gl-row" style={{
      borderTop: '1px solid var(--rule-soft)',
    }}>
      <summary className="gl-summary" style={{
        cursor: 'pointer',
        listStyle: 'none',
        display: 'block',
        padding: '8px 0',
        fontFamily: 'var(--ff-mono)',
        fontSize: 13,
        lineHeight: 1.55,
        color: 'var(--fg-soft)',
        whiteSpace: 'pre',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
        <span className="gl-line">
          <span className="gl-hash"  style={{ color: 'var(--accent-amber)', fontVariantNumeric: 'tabular-nums' }}>{hash}</span>
          <span className="gl-sp">  </span>
          <span className="gl-date"  style={{ color: 'var(--muted)', fontVariantNumeric: 'tabular-nums' }}>{entry.date}</span>
          <span className="gl-sp">  </span>
          <span className="gl-book"  style={{ color: bookColor }}>{bookLabel}</span>
          <span className="gl-sp">  </span>
          <span className="gl-body"  style={{ color: 'var(--fg-soft)' }}>{short}</span>
        </span>
      </summary>
      {isTruncated && (
        <div className="gl-full" style={{
          padding: '8px 0 14px calc(8ch + 2ch + 10ch + 2ch + 10ch + 2ch)',
          fontFamily: 'var(--ff-mono)',
          fontSize: 12.5,
          lineHeight: 1.7,
          color: 'var(--fg-soft)',
          textWrap: 'pretty',
          whiteSpace: 'normal',
        }}>
          {entry.body}
          <div style={{
            marginTop: 8,
            fontSize: 10,
            letterSpacing: '0.22em',
            textTransform: 'lowercase',
            color: 'var(--dim)',
          }}>
            iter: {entry.iter}
          </div>
        </div>
      )}
    </details>
  );
};

const LogPreview = () => {
  const entries = window.logPreview;
  const last    = entries[0]?.date || '—';
  const count   = entries.length;

  return (
    <section
      id="log"
      className="pad"
      style={{
        borderBottom: '1px solid var(--rule)',
        background: 'var(--bg-soft)',
      }}
    >
      <div
        className="rule-row"
        style={{ marginBottom: 'clamp(20px, 2.6vw, 32px)' }}
      >
        <span className="lbl" style={{ fontFamily: 'var(--ff-mono)' }}>
          <span style={{ color: 'var(--accent-amber)' }}>❯</span>
          <span style={{ color: 'var(--muted)', marginLeft: 8 }}>git log --oneline -n {count}</span>
        </span>
        <span className="ln"/>
        <a
          href="log/"
          style={{
            fontFamily: 'var(--ff-mono)',
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'lowercase',
            color: 'var(--fg-soft)',
            whiteSpace: 'nowrap',
          }}
        >
          весь журнал <span style={{ color: 'var(--accent-amber)' }}>→</span>
        </a>
      </div>

      <div
        className="gl-list"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          maxWidth: 940,
          borderBottom: '1px solid var(--rule-soft)',
        }}
      >
        {entries.map((entry) => (
          <LogPreviewRow key={entry.date + entry.iter} entry={entry} />
        ))}
      </div>

      {/* git status сводка */}
      <div
        style={{
          marginTop: 'clamp(18px, 2.4vw, 28px)',
          fontFamily: 'var(--ff-mono)',
          fontSize: 11,
          letterSpacing: '0.06em',
          color: 'var(--muted)',
        }}
      >
        on <span style={{ color: 'var(--accent-amber)' }}>branch</span> main
        <span style={{ color: 'var(--dim)' }}> · </span>
        {count} entries
        <span style={{ color: 'var(--dim)' }}> · </span>
        <span style={{ color: 'var(--accent-amber)' }}>last</span>: {last}
        <span style={{ color: 'var(--dim)' }}> · </span>
        ahead by 0 commits
      </div>

      <div
        style={{
          marginTop: 'clamp(14px, 2vw, 20px)',
          fontFamily: 'var(--ff-mono)',
          fontSize: 12,
          letterSpacing: '0.14em',
          textTransform: 'lowercase',
          color: 'var(--muted)',
        }}
      >
        <a href="log/" style={{ color: 'var(--fg)' }}>
          читать полный журнал <span style={{ color: 'var(--accent-amber)' }}>→</span>
        </a>
      </div>

      <style>{`
        .gl-row > .gl-summary::-webkit-details-marker { display: none; }
        .gl-row[open] > .gl-summary .gl-body { color: var(--fg); }
        .gl-row:hover > .gl-summary { background: rgba(255,180,84,0.04); }
        .gl-row:hover > .gl-summary .gl-hash { text-decoration: underline; text-underline-offset: 2px; }

        @media (max-width: 720px) {
          .gl-summary { white-space: normal !important; }
          .gl-summary .gl-line {
            display: grid;
            grid-template-columns: auto auto;
            row-gap: 2px;
            column-gap: 8px;
            align-items: baseline;
          }
          .gl-summary .gl-sp { display: none; }
          .gl-summary .gl-hash { grid-column: 1; grid-row: 1; }
          .gl-summary .gl-date { grid-column: 2; grid-row: 1; }
          .gl-summary .gl-book {
            grid-column: 1 / -1; grid-row: 2;
            font-size: 10px; letter-spacing: 0.22em; text-transform: lowercase;
          }
          .gl-summary .gl-body {
            grid-column: 1 / -1; grid-row: 3;
            white-space: normal; line-height: 1.6;
          }
          .gl-row .gl-full {
            padding-left: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};

window.LogPreview = LogPreview;
