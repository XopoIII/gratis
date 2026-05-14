// Базовые UI-примитивы (компоненты, использующие глобальный CSS)

const Stamp = ({ children, color, rotate = -6, size = 11 }) => (
  <span className="stamp" style={{
    fontSize: size,
    transform: `rotate(${rotate}deg)`,
    ...(color ? { borderColor: color, color } : null),
  }}>{children}</span>
);

const RuleRow = ({ label }) => (
  <div className="rule-row"><span className="lbl">{label}</span><span className="ln"/></div>
);

const VRule = () => <div className="vrule"/>;

const Button = ({ variant = 'solid', children, ...rest }) => {
  const base = {
    fontFamily: 'var(--ff-display)', fontSize: 12, letterSpacing: '0.16em',
    padding: '14px 26px', textTransform: 'uppercase', border: 'none',
  };
  const variants = {
    solid:  { background: 'var(--ink)', color: 'var(--bg)' },
    ghost:  { background: 'transparent', color: 'var(--ink)', border: '1px solid var(--ink)' },
    accent: { background: 'var(--accent)', color: 'var(--bg)' },
  };
  return <button style={{ ...base, ...variants[variant] }} {...rest}>{children}</button>;
};

Object.assign(window, { Stamp, RuleRow, VRule, Button });
