import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoIcon from './Logo';

const sectionLinks = [
  { label: 'What Is It',      href: '#whatis'     },
  { label: 'Statistics',      href: '#statistics'  },
  { label: 'Myths vs Reality',href: '#myths'       },
  { label: 'Effects',         href: '#effects'     },
  { label: 'Laws',            href: '#laws'        },
  { label: 'References',      href: '#references'  },
];

export default function Navbar({ introActive = false }) {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const location   = useLocation();
  const navigate   = useNavigate();
  const onHome     = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* For section anchors — if already on home, smooth-scroll.
     If on another page, navigate home first then scroll. */
  const handleSectionClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    if (onHome) {
      const target = document.querySelector(href);
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    } else {
      navigate('/' + href); // e.g. "/#whatis" — hash preserved for scroll-on-load
    }
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#7a6b60',
    fontSize: '13px',
    fontWeight: '500',
    padding: '6px 12px',
    borderRadius: '6px',
    transition: 'color 0.2s, background 0.2s',
    display: 'block',
    letterSpacing: '0.2px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'Inter, system-ui, sans-serif',
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        transition: 'all 0.4s ease',
        backgroundColor: scrolled ? 'rgba(15,13,11,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(196,122,58,0.15)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.4)' : 'none',
        padding: scrolled ? '12px 0' : '20px 0',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo — always goes to / */}
        <Link
          to="/"
          aria-label="Go to homepage"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px',
                   transition: 'opacity 0.2s ease, transform 0.2s ease' }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.75'; e.currentTarget.style.transform = 'scale(1.03)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1';    e.currentTarget.style.transform = 'scale(1)'; }}
        >
          {/*
            Plain wrapper — layoutId removed since the splash
            no longer uses a shared layout animation.
            The overlay covers the navbar during the intro so
            no duplicate-logo treatment is needed.
          */}
          <div style={{ width: '36px', height: '36px', flexShrink: 0 }}>
            <LogoIcon style={{ height: '36px', width: '36px', display: 'block' }} />
          </div>
          <span style={{
            fontFamily: 'Sora, sans-serif', fontWeight: '700', fontSize: '15px',
            color: '#e8e0d5', letterSpacing: '-0.3px',
          }}>
            Armor Down
          </span>
        </Link>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: '4px', listStyle: 'none', margin: 0, padding: 0 }}
          className="nav-desktop-links">
          {sectionLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleSectionClick(e, link.href)}
                style={linkStyle}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#e8e0d5'; e.currentTarget.style.background = 'rgba(196,122,58,0.1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#7a6b60'; e.currentTarget.style.background = 'transparent'; }}
              >
                {link.label}
              </a>
            </li>
          ))}

          {/* About page link */}
          <li>
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              style={{
                ...linkStyle,
                color: location.pathname === '/about' ? '#e8a87c' : '#7a6b60',
                background: location.pathname === '/about' ? 'rgba(196,122,58,0.1)' : 'transparent',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#e8e0d5'; e.currentTarget.style.background = 'rgba(196,122,58,0.1)'; }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = location.pathname === '/about' ? '#e8a87c' : '#7a6b60';
                e.currentTarget.style.background = location.pathname === '/about' ? 'rgba(196,122,58,0.1)' : 'transparent';
              }}
            >
              About
            </Link>
          </li>
        </ul>

        {/* CTA */}
        <a
          href="#silence"
          onClick={(e) => handleSectionClick(e, '#silence')}
          className="nav-cta"
          style={{
            background: 'linear-gradient(135deg, #c47a3a, #e8a87c)',
            color: '#1a1008',
            textDecoration: 'none',
            padding: '8px 18px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '700',
            transition: 'opacity 0.2s, transform 0.2s',
            letterSpacing: '0.2px',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'scale(1.03)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
        >
          Get Help Now
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className="nav-hamburger"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', flexDirection: 'column', gap: '5px' }}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: 'block', width: '24px', height: '2px',
              background: '#e8e0d5', borderRadius: '2px',
              transition: 'all 0.3s ease',
              transform: menuOpen
                ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                : i === 2 ? 'rotate(-45deg) translate(5px, -5px)'
                : 'none'
                : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: 'rgba(15,13,11,0.98)', borderTop: '1px solid rgba(196,122,58,0.15)', padding: '16px 24px 24px' }}>
          {sectionLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleSectionClick(e, link.href)}
              style={{ display: 'block', textDecoration: 'none', color: '#7a6b60', fontSize: '15px', fontWeight: '500', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#e8a87c'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#7a6b60'}
            >
              {link.label}
            </a>
          ))}

          {/* About in mobile menu */}
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            style={{ display: 'block', textDecoration: 'none', color: location.pathname === '/about' ? '#e8a87c' : '#7a6b60', fontSize: '15px', fontWeight: '500', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'color 0.2s' }}
          >
            About
          </Link>

          <a
            href="#silence"
            onClick={(e) => handleSectionClick(e, '#silence')}
            style={{ display: 'block', marginTop: '16px', background: 'linear-gradient(135deg, #c47a3a, #e8a87c)', color: '#1a1008', textDecoration: 'none', padding: '12px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '700', textAlign: 'center' }}
          >
            Get Help Now
          </a>
        </div>
      )}

      <style>{`
        .nav-hamburger { display: none; }
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
