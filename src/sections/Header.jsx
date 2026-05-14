// Header / nav

const Header = ({ author }) => (
  <header className="pad-s" style={{ borderBottom: '1px solid var(--rule)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
    <a href="#top" className="h-display" style={{ fontSize: 22 }}>{author.initials}</a>
    <nav className="nav-links" style={{ display: 'flex', gap: 28, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--dim)' }}>
      <a href="#about">О себе</a>
      <a href="#works">Каталог</a>
      <a href="#readers">Читательская</a>
      <a href="#contact">Контакт</a>
    </nav>
    <Stamp rotate={-3}>Самиздат · 18+</Stamp>
  </header>
);

window.Header = Header;
