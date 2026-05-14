/* «Канон» — общие UI-примитивы */
/* eslint-disable no-undef */

const { useEffect, useRef, useState, useMemo } = React;

// ---- хук: появление на скролле ----
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            // включаем сам элемент и все .kanon-fade-in внутри
            e.target.classList.add('is-in');
            e.target.querySelectorAll('.kanon-fade-in').forEach((n) => n.classList.add('is-in'));
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

// ---- ярлык-капшен ----
const Cap = ({ children, tone = 'dim', style }) => (
  <div
    className={'kanon-cap ' + (tone === 'rust' ? 'kanon-cap-rust' : tone === 'brass' ? 'kanon-cap-brass' : '')}
    style={style}
  >
    {children}
  </div>
);

// ---- блок «строка с метаданными» ----
const MetaRow = ({ items }) => (
  <div
    className="kanon-mono"
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 22,
      fontSize: 11,
      letterSpacing: '.22em',
      textTransform: 'uppercase',
      color: 'var(--kanon-ink-dim)',
    }}
  >
    {items.map((s, i) => (
      <span key={i}>{s}</span>
    ))}
  </div>
);

// ---- фотокарточка-полароид ----
const Photo = ({ src, caption, style, w, h, rotate = 0 }) => {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="kanon-photo kanon-fade-in"
      style={{
        width: w,
        height: h,
        transform: `rotate(${rotate}deg)`,
        transformOrigin: 'center',
        ...style,
      }}
    >
      <img src={src} alt={caption || ''} style={{ height: 'calc(100% - 12px - 38px + 12px)' }} />
      {caption ? <div className="cap">{caption}</div> : null}
    </div>
  );
};

// ---- пиксельный мини-экран тамагочи ----
const TamagochiScreen = ({ size = 80, mood = 'idle', label }) => {
  const isNum = typeof size === 'number';
  const padding = isNum ? size * 0.06 : '6%';
  const width = isNum ? size : '100%';
  const height = isNum ? size : '100%';
  // сетка 16x16, рисуем простую "рожицу" Улья
  const grid = useMemo(() => {
    const empty = Array.from({ length: 16 }, () => Array(16).fill(0));
    // глаза
    [
      // глаза
      [5, 5], [5, 6],
      [5, 9], [5, 10],
      [6, 5], [6, 6],
      [6, 9], [6, 10],
      // рот
      [10, 5], [10, 6], [10, 7], [10, 8], [10, 9], [10, 10],
      [11, 5], [11, 10],
    ].forEach(([r, c]) => (empty[r][c] = 1));
    return empty;
  }, []);

  return (
    <div
      style={{
        width,
        height,
        background: 'var(--kanon-phos-bg)',
        padding,
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.6), inset 0 0 12px rgba(0,0,0,.6)',
        position: 'relative',
        fontFamily: 'var(--kanon-mono)',
      }}
    >
      <div
        className={mood === 'flicker' ? 'kanon-flicker' : ''}
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(16, 1fr)',
          gridTemplateRows: 'repeat(16, 1fr)',
          gap: 1,
          background: '#1a2510',
        }}
      >
        {grid.flatMap((row, r) =>
          row.map((v, c) => (
            <div
              key={r + '-' + c}
              style={{
                background: v ? 'var(--kanon-phos)' : 'transparent',
                opacity: v ? 0.92 : 0,
              }}
            />
          ))
        )}
      </div>
      {label ? (
        <div
          style={{
            position: 'absolute',
            left: 0, right: 0, bottom: -16,
            textAlign: 'center',
            color: 'var(--kanon-phos)',
            fontSize: 9,
            letterSpacing: '.2em',
            textTransform: 'uppercase',
            opacity: .8,
          }}
        >
          {label}
        </div>
      ) : null}
    </div>
  );
};

// ---- координатная отметка ----
const Coord = ({ children, style }) => (
  <span
    className="kanon-mono"
    style={{
      fontSize: 11,
      letterSpacing: '.2em',
      color: 'var(--kanon-rust)',
      textTransform: 'uppercase',
      ...style,
    }}
  >
    {children}
  </span>
);

// ---- уголки-«crop marks» как у плёночного кадра ----
const CropMarks = ({ size = 18, color = 'var(--kanon-ink-mute)' }) => (
  <>
    {[
      { top: 0, left: 0, br: 'none', bl: 'none' },
      { top: 0, right: 0 },
      { bottom: 0, left: 0 },
      { bottom: 0, right: 0 },
    ].map((p, i) => (
      <span
        key={i}
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderTop: i < 2 ? `1px solid ${color}` : 'none',
          borderBottom: i >= 2 ? `1px solid ${color}` : 'none',
          borderLeft: i % 2 === 0 ? `1px solid ${color}` : 'none',
          borderRight: i % 2 === 1 ? `1px solid ${color}` : 'none',
          ...p,
        }}
      />
    ))}
  </>
);

Object.assign(window, { useReveal, Cap, MetaRow, Photo, TamagochiScreen, Coord, CropMarks });
