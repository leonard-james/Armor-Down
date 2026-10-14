import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { scrollToSection } from '../utils/sectionNavigation';

const SHIELD_PATH = `M 130 72 L 96 86 L 96 132 C 96 162 112 180 130 190 C 148 180 164 162 164 132 L 164 86 L 148 79.5`;

const NAV_LINKS = [
  { label: 'What Is It',       href: '#whatis'     },
  { label: 'Statistics',       href: '#statistics' },
  { label: 'Myths vs Reality', href: '#myths'      },
  { label: 'Effects',          href: '#effects'    },
  { label: 'Laws',             href: '#laws'       },
  { label: 'About',            href: '#about'      },
  { label: 'References',       href: '#references' },
];

/* ─────────────────────────────────────────────────────────────
   NavShieldLogo
   The hidden <path ref={setMeasureRef}> is rendered immediately
   so getTotalLength() is available on first paint — no deferred
   state update, no gap before the animation path appears.
   animKey === 0  → static logo, no animation on page load.
   animKey  > 0   → instant redraw, handles rapid clicks cleanly.
   ───────────────────────────────────────────────────────────── */
function NavShieldLogo({ animKey, theme }) {
  const lenRef     = useRef(null);
  const controls   = useAnimationControls();
  const reduced = useReducedMotion();

  /* Callback ref — measures synchronously on first DOM attach */
  const measureCb = (el) => {
    if (el && lenRef.current === null) {
      lenRef.current = el.getTotalLength();
    }
  };

  /* Fire when the user manually toggles — animKey=0 is skipped */
  useEffect(() => {
    const len = lenRef.current;
    if (!len || animKey === 0 || reduced) return;
    controls.set({ strokeDashoffset: len, strokeDasharray: len });
    controls.start({
      strokeDashoffset: 0,
      transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] },
    });
  // controls identity is stable; animKey is the only real dep.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animKey, reduced]);

  const isDark      = theme === 'dark';
  const circleFill  = isDark ? '#1c140d' : '#ede3d6';
  const strokeColor = isDark ? '#c47a3a' : '#7c3a0a';
  const ghostStroke = isDark ? 'rgba(196,122,58,0.13)' : 'rgba(100,48,12,0.15)';
  const glowFilter  = isDark && animKey > 0 && !reduced
    ? 'drop-shadow(0 0 8px rgba(196,122,58,0.55))'
    : 'none';
  /* Path length used for static render. We need it available before
     the callback ref fires on hydration. Fallback 400 is replaced by
     the real length on first paint via strokeDasharray on the motion.path. */
  const dash = 400;

  return (
    <svg
      viewBox="0 0 260 260"
      width="36"
      height="36"
      style={{ display: 'block', overflow: 'visible', flexShrink: 0 }}
      aria-hidden="true"
    >
      {/* Measurement path — invisible, attached before visible paths */}
      <path
        ref={measureCb}
        d={SHIELD_PATH}
        fill="none"
        stroke="transparent"
        strokeWidth="8"
        aria-hidden="true"
        style={{ pointerEvents: 'none' }}
      />

      <circle
        cx="130" cy="130" r="90"
        fill={circleFill}
        style={{ transition: 'fill 0.3s ease' }}
      />

      {/* Ghost trace — always fully visible at low opacity */}
      <path
        d={SHIELD_PATH}
        fill="none"
        stroke={ghostStroke}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: 'stroke 0.3s ease' }}
      />

      {/* Animated stroke — fully drawn on initial render */}
      <motion.path
        d={SHIELD_PATH}
        fill="none"
        stroke={strokeColor}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray:  dash,
          strokeDashoffset: 0,
          filter: glowFilter,
          transition: 'stroke 0.3s ease',
        }}
        animate={controls}
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   ThemeToggleButton — one instance, used in both layouts
   ───────────────────────────────────────────────────────────── */
function ThemeToggleButton({ theme, onToggle }) {
  const isDark   = theme === 'dark';
  const reduced = useReducedMotion();

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="theme-toggle-btn"
    >
      <span
        key={theme}
        className={reduced ? '' : 'toggle-icon'}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {isDark
          ? <Sun  size={15} strokeWidth={2} aria-hidden="true" />
          : <Moon size={15} strokeWidth={2} aria-hidden="true" />
        }
      </span>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   Navbar
   Desktop: Brand | Nav links | [Get Help Now] [Toggle]
   Mobile:  Brand |             [Toggle] [Hamburger]
   One ThemeToggleButton per viewport — no duplicates.
   ───────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const onHome   = location.pathname === '/';

  const { theme, toggle, animKey } = useTheme();
  const isDark = theme === 'dark';
  const reducedMotion = useReducedMotion();
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  const scrollTo = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    if (onHome) {
      scrollToSection(href, reducedMotion);
    } else {
      navigate('/' + href);
    }
  };

  const navBg = scrolled
    ? isDark ? 'rgba(15,13,11,0.95)' : 'rgba(245,236,224,0.97)'
    : 'transparent';

  const menuBg = isDark ? '#0f0d0b' : '#f5ece0';

  return (
    <>
      <nav
        aria-label="Primary"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, padding 0.3s ease',
          backgroundColor: navBg,
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-nav)' : '1px solid transparent',
          boxShadow: scrolled
            ? isDark ? '0 4px 24px rgba(0,0,0,0.4)' : '0 4px 16px rgba(80,40,10,0.10)'
            : 'none',
          padding: scrolled ? '12px 0' : '20px 0',
        }}
      >
        <div style={{
          maxWidth: '1200px', margin: '0 auto', padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '8px',
        }}>

          {/* ── Brand / Logo ── */}
          <Link
            to="/"
            aria-label="Go to homepage"
            onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' })}
            style={{
              textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px',
              flexShrink: 0, transition: 'opacity 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.75'; e.currentTarget.style.transform = 'scale(1.03)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1';    e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <div style={{ width: '36px', height: '36px', flexShrink: 0 }}>
              <NavShieldLogo animKey={animKey} theme={theme} />
            </div>
            <span style={{
              fontFamily: 'Sora, sans-serif', fontWeight: '700', fontSize: '15px',
              color: 'var(--text-primary)', letterSpacing: '-0.3px',
            }}>
              Armor Down
            </span>
          </Link>

          {/* ── Desktop nav links (hidden ≤768px) ── */}
          <ul className="nd-links" style={{
            display: 'flex', gap: '2px', listStyle: 'none', margin: 0, padding: 0,
            flex: 1, justifyContent: 'center',
          }}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  style={{
                    textDecoration: 'none',
                    color: 'var(--nav-link)',
                    fontSize: '13px', fontWeight: '500',
                    padding: '6px 10px', borderRadius: '6px',
                    display: 'block', letterSpacing: '0.1px',
                    border: 'none', cursor: 'pointer',
                    fontFamily: 'Inter, system-ui, sans-serif',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.backgroundColor = 'var(--badge-bg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--nav-link)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* ── Desktop right: CTA + single toggle (hidden ≤768px) ── */}
          <div className="nd-cta" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <a
              href="#silence"
              onClick={(e) => scrollTo(e, '#silence')}
              style={{
                background: 'linear-gradient(135deg, #c47a3a, #e8a87c)',
                color: '#1a1008', textDecoration: 'none',
                padding: '8px 18px', borderRadius: '8px',
                fontSize: '13px', fontWeight: '700', letterSpacing: '0.2px',
                whiteSpace: 'nowrap', transition: 'opacity 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'scale(1.03)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1';    e.currentTarget.style.transform = 'scale(1)'; }}
            >
              Get Help Now
            </a>
            <ThemeToggleButton theme={theme} onToggle={toggle} />
          </div>

          {/* ── Mobile right: single toggle + hamburger (hidden >768px) ── */}
          <div className="nm-controls" style={{ display: 'none', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <ThemeToggleButton theme={theme} onToggle={toggle} />
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '6px', display: 'flex', flexDirection: 'column', gap: '5px',
              }}
            >
              {[0, 1, 2].map((i) => (
                <span key={i} style={{
                  display: 'block', width: '24px', height: '2px',
                  background: 'var(--text-primary)', borderRadius: '2px',
                  transition: 'transform 0.3s ease, opacity 0.3s ease',
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
        </div>

        {/* ── Mobile dropdown menu ── */}
        <div
          id="mobile-navigation"
          hidden={!menuOpen}
          style={{
            background: menuBg, borderTop: '1px solid var(--border-nav)',
            padding: '16px 24px 24px',
          }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                style={{
                  display: 'block', textDecoration: 'none',
                  color: 'var(--nav-link)', fontSize: '15px', fontWeight: '500',
                  padding: '12px 0', borderBottom: '1px solid var(--border-divider)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--highlight-amber-lt)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--nav-link)'}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#silence"
              onClick={(e) => scrollTo(e, '#silence')}
              style={{
                display: 'block', marginTop: '16px',
                background: 'linear-gradient(135deg, #c47a3a, #e8a87c)',
                color: '#1a1008', textDecoration: 'none',
                padding: '12px 20px', borderRadius: '8px',
                fontSize: '14px', fontWeight: '700', textAlign: 'center',
              }}
            >
              Get Help Now
            </a>
          </div>
      </nav>

      {/* Scoped CSS — no global side effects */}
      <style>{`
        /* Desktop default */
        .nd-links    { display: flex !important; }
        .nd-cta      { display: flex !important; }
        .nm-controls { display: none  !important; }

        /* Mobile */
        @media (max-width: 768px) {
          .nd-links    { display: none  !important; }
          .nd-cta      { display: none  !important; }
          .nm-controls { display: flex  !important; }
        }
      `}</style>
    </>
  );
}
