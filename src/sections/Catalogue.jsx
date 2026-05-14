// Каталог — структурированная сетка с разными типами карточек по статусу.
// Секции: Сейчас пишу · Опубликовано · Циклы · В разработке · Ещё на author.today

// ============================================================================
// Утилиты / общие элементы
// ============================================================================

const StatusBadge = ({ status }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '5px 10px',
    background: 'rgba(0,0,0,0.62)',
    backdropFilter: 'blur(3px)',
    border: `1px solid ${status.tone}`,
    color: '#fff',
    fontFamily: 'var(--ff-body)', fontSize: 9.5, letterSpacing: '0.28em',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  }}>
    <span style={{
      width: 6, height: 6, borderRadius: '50%',
      background: status.tone,
      boxShadow: `0 0 0 2px rgba(0,0,0,0.4), 0 0 8px ${status.tone}`,
    }}/>
    {status.label}
  </span>
);

// Заполняемая обложка / fallback на текстовый глиф
const CoverImage = ({ row, fit = 'cover', pad = 0 }) => {
  const [errored, setErrored] = React.useState(false);
  const hasCover = row.cover && !errored;
  const fallbackBg = row.coverBg || 'linear-gradient(180deg, #1a1612 0%, #08070a 100%)';

  if (hasCover) {
    return (
      <img
        src={row.cover}
        alt={`Обложка — ${row.title}`}
        loading="lazy"
        onError={(e) => {
          // fallback на og-cover если основной не загрузился
          if (row.coverFallback && e.target.src.indexOf(row.coverFallback) === -1) {
            e.target.src = row.coverFallback;
          } else {
            setErrored(true);
          }
        }}
        style={{
          width: '100%', height: '100%',
          objectFit: row.coverFit || fit,
          padding: row.coverPad || pad,
          display: 'block',
          filter: 'saturate(.95) contrast(1.02)',
        }}
      />
    );
  }

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: fallbackBg,
      color: row.accent || '#fff',
      padding: 24, textAlign: 'center',
    }}>
      <div style={{
        fontFamily: 'var(--ff-body)', fontSize: 10, letterSpacing: '0.32em',
        opacity: .55, marginBottom: 22, textTransform: 'uppercase',
      }}>{row.universe}</div>
      <div className="h-display" style={{
        fontSize: 'clamp(36px, 6vw, 56px)', lineHeight: 1,
        letterSpacing: '0.08em', textTransform: 'uppercase',
        textShadow: '0 4px 24px rgba(0,0,0,.6)',
      }}>{row.coverGlyph || row.title}</div>
      <div style={{
        fontFamily: 'var(--ff-body)', fontSize: 9, letterSpacing: '0.32em',
        opacity: .45, marginTop: 24, textTransform: 'uppercase',
      }}>обложка в работе</div>
    </div>
  );
};

// Section heading с правилом сверху
const SectionHead = ({ kicker, title, accent, sub, count }) => (
  <div style={{ marginBottom: 'clamp(28px, 3.5vw, 44px)' }}>
    <RuleRow label={kicker}/>
    <div style={{
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: 16,
    }}>
      <h2 className="h-display" style={{
        fontSize: 'clamp(36px, 5vw, 56px)', margin: 0, lineHeight: .95,
      }}>
        {title.split(' ').map((w, i, arr) =>
          i === arr.length - 1
            ? <span key={i} style={{ color: accent }}>{w}</span>
            : <span key={i}>{w} </span>
        )}
      </h2>
      {(sub || count != null) && (
        <p style={{
          margin: 0, fontSize: 13.5, color: 'var(--dim)',
          maxWidth: 480, lineHeight: 1.55,
        }}>
          {count != null && (
            <span style={{
              display: 'inline-block', marginRight: 14, padding: '4px 9px',
              background: 'var(--paper)', border: '1px solid var(--rule-dark)',
              fontFamily: 'var(--ff-body)', fontSize: 10, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: 'var(--ink)',
            }}>{count}</span>
          )}
          {sub}
        </p>
      )}
    </div>
  </div>
);

// ============================================================================
// CARD: «СЕЙЧАС ПИШУ» — большая, featured
// ============================================================================
const WritingCard = ({ row }) => (
  <a
    href={row.href}
    target="_blank"
    rel="noopener"
    className="cat-writing"
    style={{
      display: 'grid',
      gridTemplateColumns: 'minmax(180px, 240px) 1fr',
      background: 'var(--paper)',
      border: '1px solid var(--rule-dark)',
      borderTop: `3px solid ${row.accent}`,
      textDecoration: 'none', color: 'inherit',
      position: 'relative', overflow: 'hidden',
      transition: 'transform .25s ease, box-shadow .25s ease',
    }}
  >
    {/* «marker» полоска с прогрессом */}
    <div style={{
      position: 'absolute', top: 0, right: 0, padding: '10px 14px',
      fontFamily: 'var(--ff-body)', fontSize: 10, letterSpacing: '0.22em',
      textTransform: 'uppercase', color: row.accent,
      borderLeft: '1px solid var(--rule-dark)',
      borderBottom: '1px solid var(--rule-dark)',
      background: 'var(--bg)',
      zIndex: 2,
    }}>
      № {row.n}
    </div>

    {/* Cover */}
    <div style={{
      position: 'relative',
      aspectRatio: '2 / 3',
      background: '#0a0a0a',
      borderRight: '1px solid var(--rule-dark)',
      overflow: 'hidden',
    }}>
      <CoverImage row={row}/>
      <div style={{ position: 'absolute', top: 14, left: 14 }}>
        <StatusBadge status={row.status}/>
      </div>
    </div>

    {/* Body */}
    <div style={{
      padding: 'clamp(22px, 2.5vw, 32px)',
      display: 'flex', flexDirection: 'column', gap: 14,
    }}>
      <div style={{
        fontFamily: 'var(--ff-body)', fontSize: 10, letterSpacing: '0.26em',
        textTransform: 'uppercase', color: 'var(--dim)',
      }}>{row.universe}</div>

      <h3 className="h-display" style={{
        fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1, margin: 0,
        textWrap: 'balance',
      }}>{row.title}</h3>

      {row.subtitle && (
        <div className="h-hand" style={{
          fontSize: 22, color: row.accent, marginTop: -6,
        }}>{row.subtitle}</div>
      )}

      <p style={{
        margin: 0, fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink-soft)',
        textWrap: 'pretty',
      }}>{row.tagline}</p>

      {/* Progress bar */}
      {row.progress && (
        <div style={{ marginTop: 6 }}>
          <div style={{
            fontFamily: 'var(--ff-body)', fontSize: 10, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'var(--dim)',
            display: 'flex', justifyContent: 'space-between', marginBottom: 6,
          }}>
            <span>{row.progress}</span>
            <span style={{ color: row.accent }}>● в работе</span>
          </div>
          <div style={{
            height: 3, background: 'var(--rule)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, height: '100%',
              width: '38%',
              background: row.accent,
              boxShadow: `0 0 12px ${row.accent}`,
            }}/>
          </div>
        </div>
      )}

      <div style={{
        marginTop: 'auto', paddingTop: 18, borderTop: '1px dotted var(--rule-dark)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: 'var(--ff-body)', fontSize: 10.5, letterSpacing: '0.16em',
        textTransform: 'uppercase',
      }}>
        <span style={{ color: 'var(--dim)' }}>{row.genre}</span>
        <span style={{ color: row.accent }}>читать лендинг →</span>
      </div>
    </div>
  </a>
);

// ============================================================================
// CARD: ОПУБЛИКОВАНО — стандартная
// ============================================================================
const StdCard = ({ row }) => (
  <a
    href={row.href}
    target="_blank"
    rel="noopener"
    className="cat-card"
    style={{
      display: 'flex', flexDirection: 'column',
      background: 'var(--paper)',
      border: '1px solid var(--rule-dark)',
      textDecoration: 'none', color: 'inherit',
      position: 'relative', overflow: 'hidden',
      transition: 'transform .25s ease, box-shadow .25s ease',
    }}
  >
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '10px 16px',
      borderBottom: '1px solid var(--rule-dark)',
      fontFamily: 'var(--ff-body)', fontSize: 10, letterSpacing: '0.22em',
      textTransform: 'uppercase', color: 'var(--dim)',
    }}>
      <span>№ {row.n} · {row.id}/</span>
      <span style={{ color: row.accent }}>открыть ↗</span>
    </div>

    <div style={{
      position: 'relative',
      aspectRatio: '2 / 3',
      background: row.coverBg || '#0a0a0a',
      overflow: 'hidden',
      borderBottom: '1px solid var(--rule-dark)',
    }}>
      <CoverImage row={row}/>
      <div style={{ position: 'absolute', top: 12, left: 12 }}>
        <StatusBadge status={row.status}/>
      </div>
    </div>

    <div style={{
      padding: '20px 18px 22px',
      display: 'flex', flexDirection: 'column', gap: 10, flex: 1,
    }}>
      <div style={{
        fontFamily: 'var(--ff-body)', fontSize: 10, letterSpacing: '0.22em',
        textTransform: 'uppercase', color: 'var(--dim)',
      }}>{row.universe}</div>
      <h3 className="h-display" style={{
        fontSize: 24, lineHeight: 1.05, margin: 0, textWrap: 'balance',
      }}>{row.title}</h3>
      <p style={{
        margin: 0, fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink-soft)',
        textWrap: 'pretty', flex: 1,
      }}>{row.tagline}</p>

      <div style={{
        marginTop: 6, paddingTop: 14, borderTop: '1px dotted var(--rule-dark)',
        display: 'grid', gridTemplateColumns: '1fr auto', gap: 8,
        fontFamily: 'var(--ff-body)', fontSize: 10.5, letterSpacing: '0.14em',
        textTransform: 'uppercase',
      }}>
        <span style={{ color: 'var(--dim)' }}>{row.genre}</span>
        <span style={{ color: 'var(--ink)' }}>{row.volume}</span>
      </div>
    </div>
  </a>
);

// ============================================================================
// CARD: ЦИКЛ — веер обложек / стопка корешков
// ============================================================================
const CycleCard = ({ row }) => {
  const hasCovers = row.covers && row.covers.length > 0;
  return (
    <a
      href={row.href}
      target="_blank"
      rel="noopener"
      className="cat-cycle"
      style={{
        display: 'flex', flexDirection: 'column',
        background: 'var(--ink)', color: 'var(--bg)',
        border: '1px solid var(--rule-dark)',
        textDecoration: 'none',
        position: 'relative', overflow: 'hidden',
        transition: 'transform .25s ease, box-shadow .25s ease',
      }}
    >
      {/* header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '10px 16px',
        borderBottom: '1px solid rgba(236,225,196,0.18)',
        fontFamily: 'var(--ff-body)', fontSize: 10, letterSpacing: '0.22em',
        textTransform: 'uppercase', color: 'rgba(236,225,196,0.55)',
      }}>
        <span>№ {row.n} · цикл · {row.booksCount} {row.booksCount === 1 ? 'книга' : row.booksCount < 5 ? 'книги' : 'книг'}</span>
        <span style={{ color: row.accent }}>{row.plannedLanding ? 'лендинг скоро' : 'открыть ↗'}</span>
      </div>

      {/* Fan of covers — крупная зона */}
      <div style={{
        position: 'relative',
        aspectRatio: '16 / 11',
        background: row.coverBg || `linear-gradient(135deg, ${row.tone} 0%, #000 100%)`,
        overflow: 'hidden',
        borderBottom: '1px solid rgba(236,225,196,0.18)',
      }}>
        {hasCovers ? (
          <div className="cycle-fan" style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '8% 6%',
          }}>
            {row.covers.map((src, i, arr) => {
              const center = (arr.length - 1) / 2;
              const offset = i - center;
              const rot = offset * 6; // degrees
              const tx = offset * 18;  // % overlap
              const ty = Math.abs(offset) * 4;
              const z = arr.length - Math.abs(offset);
              return (
                <img
                  key={src}
                  src={src}
                  alt={row.titles?.[i] || ''}
                  loading="lazy"
                  className="cycle-spine"
                  style={{
                    width: `${100 / Math.max(arr.length, 3) + 12}%`,
                    aspectRatio: '2 / 3',
                    objectFit: 'cover',
                    border: '2px solid #1a1612',
                    boxShadow: '0 8px 24px -10px rgba(0,0,0,.8), 0 2px 0 rgba(255,255,255,0.04) inset',
                    transform: `translate(${tx * 0.6}%, ${ty}%) rotate(${rot}deg)`,
                    transformOrigin: 'center bottom',
                    transition: 'transform .5s cubic-bezier(.2,.7,.1,1)',
                    zIndex: z,
                    marginLeft: i === 0 ? 0 : -24,
                    flexShrink: 0,
                  }}
                />
              );
            })}
          </div>
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            color: row.accent, padding: 32, textAlign: 'center',
          }}>
            <div style={{
              fontFamily: 'var(--ff-body)', fontSize: 10, letterSpacing: '0.32em',
              opacity: .55, marginBottom: 24, textTransform: 'uppercase',
            }}>{row.universe}</div>
            <div className="h-display" style={{
              fontSize: 'clamp(48px, 8vw, 88px)', lineHeight: 1,
              letterSpacing: '0.06em',
            }}>{row.coverGlyph}</div>
            <div style={{
              fontFamily: 'var(--ff-body)', fontSize: 10, letterSpacing: '0.32em',
              opacity: .5, marginTop: 24, textTransform: 'uppercase',
            }}>{row.booksCount} книг(и) · обложки скоро</div>
          </div>
        )}

        {/* status badge */}
        <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 50 }}>
          <StatusBadge status={row.status}/>
        </div>
      </div>

      {/* body */}
      <div style={{
        padding: '20px 18px 22px',
        display: 'flex', flexDirection: 'column', gap: 10, flex: 1,
      }}>
        <div style={{
          fontFamily: 'var(--ff-body)', fontSize: 10, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'rgba(236,225,196,0.55)',
        }}>{row.universe}</div>
        <h3 className="h-display" style={{
          fontSize: 26, lineHeight: 1.02, margin: 0,
          textWrap: 'balance', color: 'var(--bg)',
        }}>{row.title}</h3>
        <p style={{
          margin: 0, fontSize: 13.5, lineHeight: 1.55, color: 'rgba(236,225,196,0.78)',
          textWrap: 'pretty',
        }}>{row.tagline}</p>

        {/* Список книг внутри цикла */}
        {row.titles && (
          <ul style={{
            margin: '8px 0 0', padding: 0, listStyle: 'none',
            display: 'flex', flexDirection: 'column', gap: 6,
            fontFamily: 'var(--ff-body)', fontSize: 11.5, letterSpacing: '0.05em',
            color: 'rgba(236,225,196,0.7)',
          }}>
            {row.titles.map((t, i) => (
              <li key={i} style={{
                display: 'grid', gridTemplateColumns: '22px 1fr',
                alignItems: 'baseline',
                paddingTop: 6, borderTop: i === 0 ? 'none' : '1px dotted rgba(236,225,196,0.15)',
              }}>
                <span style={{ color: row.accent, fontSize: 10, letterSpacing: '0.16em' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        )}

        <div style={{
          marginTop: 'auto', paddingTop: 14,
          borderTop: '1px dotted rgba(236,225,196,0.2)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'var(--ff-body)', fontSize: 10.5, letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}>
          <span style={{ color: 'rgba(236,225,196,0.55)' }}>{row.genre}</span>
          <span style={{ color: row.accent }}>{row.volume}</span>
        </div>
      </div>
    </a>
  );
};

// ============================================================================
// CARD: ЧЕРНОВИК — приглушённая
// ============================================================================
const DraftCard = ({ row }) => (
  <a
    href={row.href}
    target="_blank"
    rel="noopener"
    className="cat-draft"
    style={{
      display: 'flex', flexDirection: 'column',
      background: 'var(--paper)',
      border: '1px dashed var(--rule-dark)',
      textDecoration: 'none', color: 'inherit',
      position: 'relative', overflow: 'hidden',
      opacity: .92,
      transition: 'transform .25s ease, opacity .25s ease',
    }}
  >
    {/* corner stamp */}
    <div style={{
      position: 'absolute', top: 14, right: -28,
      transform: 'rotate(35deg)', transformOrigin: 'center',
      padding: '4px 32px',
      background: 'transparent',
      border: '1.5px solid var(--dim)',
      color: 'var(--dim)',
      fontFamily: 'var(--ff-display)', fontSize: 10,
      letterSpacing: '0.28em', textTransform: 'uppercase',
      zIndex: 4, pointerEvents: 'none',
    }}>черновик</div>

    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '10px 16px',
      borderBottom: '1px dashed var(--rule-dark)',
      fontFamily: 'var(--ff-body)', fontSize: 10, letterSpacing: '0.22em',
      textTransform: 'uppercase', color: 'var(--dim)',
    }}>
      <span>№ {row.n}</span>
      <span style={{ marginRight: 60 }}/>
    </div>

    <div style={{
      position: 'relative',
      aspectRatio: '2 / 3',
      background: row.coverBg || '#0a0a0a',
      overflow: 'hidden',
      borderBottom: '1px dashed var(--rule-dark)',
      filter: 'saturate(.78)',
    }}>
      <CoverImage row={row}/>
    </div>

    <div style={{
      padding: '18px 18px 20px',
      display: 'flex', flexDirection: 'column', gap: 8, flex: 1,
    }}>
      <div style={{
        fontFamily: 'var(--ff-body)', fontSize: 10, letterSpacing: '0.22em',
        textTransform: 'uppercase', color: 'var(--dim)',
      }}>{row.universe}</div>
      <h3 className="h-display" style={{
        fontSize: 22, lineHeight: 1.05, margin: 0, color: 'var(--ink-soft)',
      }}>{row.title}</h3>
      <p style={{
        margin: 0, fontSize: 12.5, lineHeight: 1.55, color: 'var(--dim)',
        textWrap: 'pretty', flex: 1,
      }}>{row.tagline}</p>
      <div style={{
        marginTop: 6, paddingTop: 10, borderTop: '1px dotted var(--rule-dark)',
        fontFamily: 'var(--ff-body)', fontSize: 10, letterSpacing: '0.16em',
        textTransform: 'uppercase', color: 'var(--dim)',
      }}>{row.progress}</div>
    </div>
  </a>
);

// ============================================================================
// CARD: ТОЛЬКО НА AUTHOR.TODAY — компактная карточка с миниатюрной обложкой
// ============================================================================
const ATCard = ({ row }) => (
  <a
    href={row.at}
    target="_blank"
    rel="noopener"
    className="cat-at"
    style={{
      display: 'grid',
      gridTemplateColumns: '78px 1fr auto',
      gap: 16, alignItems: 'stretch',
      padding: 0,
      background: 'transparent',
      border: '1px solid var(--rule)',
      borderLeft: `4px solid ${row.accent}`,
      textDecoration: 'none', color: 'inherit',
      overflow: 'hidden',
      transition: 'background .2s ease, transform .2s ease',
    }}
  >
    {/* mini cover */}
    <div style={{
      width: 78, aspectRatio: '2 / 3',
      background: '#000',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {row.cover ? (
        <img
          src={row.cover}
          alt={`Обложка — ${row.title}`}
          loading="lazy"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      ) : (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: row.accent + '18',
          color: row.accent,
          fontFamily: 'var(--ff-display)', fontSize: 22,
        }}>{row.title.charAt(0)}</div>
      )}
    </div>

    <div style={{
      minWidth: 0,
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '14px 0',
    }}>
      <div className="h-display" style={{
        fontSize: 17, lineHeight: 1.1, margin: 0, color: 'var(--ink)',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>{row.title}</div>
      <div style={{
        marginTop: 4, fontSize: 12, color: 'var(--ink-soft)',
        textWrap: 'pretty', lineHeight: 1.45,
      }}>{row.tagline}</div>
      <div style={{
        marginTop: 6,
        fontFamily: 'var(--ff-body)', fontSize: 9.5, letterSpacing: '0.22em',
        textTransform: 'uppercase', color: 'var(--dim)',
      }}>{row.genre}</div>
    </div>

    <div style={{
      fontFamily: 'var(--ff-body)', fontSize: 10, letterSpacing: '0.22em',
      textTransform: 'uppercase', color: row.accent,
      whiteSpace: 'nowrap',
      alignSelf: 'center',
      paddingRight: 18,
    }}>AT&nbsp;↗</div>
  </a>
);

// ============================================================================
// CATALOGUE: главный экспорт
// ============================================================================
const Catalogue = ({ works }) => {
  const total =
    (window.worksWriting?.length || 0) +
    (window.worksPublished?.length || 0) +
    (window.worksCycles?.length || 0) +
    (window.worksDrafts?.length || 0);

  return (
    <section id="works" style={{ borderBottom: '1px solid var(--rule-dark)' }}>
      {/* === 1. СЕЙЧАС ПИШУ === */}
      <div className="pad" style={{ borderBottom: '1px solid var(--rule)', background: 'var(--paper)' }}>
        <SectionHead
          kicker="Каталог · сейчас за столом"
          title="Сейчас пишу"
          accent="var(--accent)"
          count={window.worksWriting.length}
          sub="Книги в активной разработке — главы выкладываются на author.today по мере готовности."
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
          gap: 'clamp(20px, 2.5vw, 32px)',
        }}>
          {window.worksWriting.map((row) => <WritingCard key={row.id} row={row}/>)}
        </div>
      </div>

      {/* === 2. ЦИКЛЫ === */}
      <div className="pad">
        <SectionHead
          kicker="Книжные циклы"
          title="Циклы и серии"
          accent="var(--accent-2)"
          count={window.worksCycles.length}
          sub="Длинные истории на несколько книг. Каждый цикл — отдельный лендинг с веером обложек и сюжетной картой."
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 'clamp(20px, 2.5vw, 32px)',
        }}>
          {window.worksCycles.map((row) => <CycleCard key={row.id} row={row}/>)}
        </div>
      </div>

      {/* === 3. ОПУБЛИКОВАНО (одиночные романы) === */}
      <div className="pad" style={{ borderTop: '1px solid var(--rule-dark)', background: 'var(--paper)' }}>
        <SectionHead
          kicker="Опубликовано · самостоятельные романы"
          title="Отдельные романы"
          accent="var(--accent)"
          count={window.worksPublished.length}
          sub="Завершённые книги вне циклов. Можно читать в любом порядке — миры не связаны."
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'clamp(20px, 2.5vw, 32px)',
        }}>
          {window.worksPublished.map((row) => <StdCard key={row.id} row={row}/>)}
        </div>
      </div>

      {/* === 4. В РАЗРАБОТКЕ === */}
      <div className="pad" style={{ borderTop: '1px solid var(--rule)' }}>
        <SectionHead
          kicker="В разработке · черновики"
          title="Лежат на полке"
          accent="var(--dim)"
          count={window.worksDrafts.length}
          sub="Книги, для которых есть лендинг и план, но активная работа ещё не началась. Можно почитать описание и подписаться."
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 'clamp(20px, 2.5vw, 32px)',
        }}>
          {window.worksDrafts.map((row) => <DraftCard key={row.id} row={row}/>)}
        </div>
      </div>

      {/* === 5. ЕЩЁ НА AUTHOR.TODAY === */}
      {window.worksOnAT && window.worksOnAT.length > 0 && (
        <div className="pad" style={{ borderTop: '1px solid var(--rule-dark)', background: 'var(--paper)' }}>
          <SectionHead
            kicker="Без отдельного лендинга"
            title="Ещё на author.today"
            accent="var(--accent-2)"
            count={window.worksOnAT.length}
            sub="Старые книги и эксперименты, которые пока живут только на author.today. Лендинги — позже, по очереди."
          />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))',
            gap: 12,
          }}>
            {window.worksOnAT.map((row, i) => <ATCard key={i} row={row}/>)}
          </div>
        </div>
      )}

      <style>{`
        .cat-writing:hover { transform: translateY(-2px); box-shadow: 0 22px 44px -28px rgba(42,29,24,.55); }
        .cat-card:hover { transform: translateY(-2px); box-shadow: 0 22px 44px -28px rgba(42,29,24,.55); }
        .cat-card:hover img { transform: scale(1.02); transition: transform .5s ease; }
        .cat-cycle:hover { transform: translateY(-2px); box-shadow: 0 22px 44px -28px rgba(0,0,0,.7); }
        .cat-cycle:hover .cycle-spine:nth-child(1) { transform: translate(-58%, 0%) rotate(-14deg) !important; }
        .cat-cycle:hover .cycle-spine:nth-child(2) { transform: translate(-28%, -3%) rotate(-7deg) !important; }
        .cat-cycle:hover .cycle-spine:nth-child(3) { transform: translate(0%, -6%) rotate(0deg) !important; }
        .cat-cycle:hover .cycle-spine:nth-child(4) { transform: translate(28%, -3%) rotate(7deg) !important; }
        .cat-cycle:hover .cycle-spine:nth-child(5) { transform: translate(58%, 0%) rotate(14deg) !important; }
        .cat-draft:hover { opacity: 1; transform: translateY(-2px); }
        .cat-at:hover { background: var(--paper); transform: translateX(2px); }
      `}</style>
    </section>
  );
};

window.Catalogue = Catalogue;
