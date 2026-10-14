import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import LogoIcon from './Logo';
import { crisisHotline, emergencyNumber } from '../data/crisisResources';
import { scrollToSection } from '../utils/sectionNavigation';

const links = [
  { label: 'What Is It',        href: '#whatis'     },
  { label: 'Statistics',        href: '#statistics'  },
  { label: 'Myths vs Reality',  href: '#myths'       },
  { label: 'Effects',           href: '#effects'     },
  { label: 'Laws & Policies',   href: '#laws'        },
  { label: 'Break the Silence', href: '#silence'     },
  { label: 'About Us',          href: '#about'       },
  { label: 'References',        href: '#references'  },
];

const currentYear = new Date().getFullYear();

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();

  const scrollTo = (event, href) => {
    event.preventDefault();
    if (location.pathname !== '/') {
      navigate(`/${href}`);
      return;
    }
    scrollToSection(href, reducedMotion);
  };

  return (
    <footer style={{
      background: 'var(--bg-footer)',
      borderTop: '1px solid var(--border-subtle)',
      padding: 'clamp(48px, 7vw, 72px) clamp(16px, 4vw, 24px) clamp(24px, 4vw, 36px)',
      position: 'relative',
    }}>
      {/* Top gradient line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(196,122,58,0.3), rgba(232,168,124,0.2), transparent)',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Top grid */}
        <div
          id="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: 'clamp(32px, 5vw, 56px)',
            marginBottom: 'clamp(40px, 6vw, 56px)',
          }}
        >
          {/* Brand */}
          <div>
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' })}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                textDecoration: 'none', marginBottom: '18px',
              }}
              aria-label="Go to home"
            >
              <LogoIcon style={{ height: '36px', width: '36px' }} />
              <span style={{
                fontFamily: 'Sora, sans-serif', fontWeight: '700',
                fontSize: '16px', color: 'var(--text-primary)', letterSpacing: '-0.3px',
              }}>
                Armor Down
              </span>
            </Link>
            <p style={{ color: 'var(--footer-copy)', fontSize: '14px', lineHeight: '1.85', maxWidth: '280px', margin: '0 0 20px' }}>
              A gender awareness project on toxic masculinity and men's mental health.
              Created for Gender &amp; Society course, 4th Year.
            </p>
            <div style={{ height: '2px', width: '48px', background: 'linear-gradient(90deg, #c47a3a, #e8a87c)', borderRadius: '2px' }} />
          </div>

          {/* Navigation */}
          <nav aria-label="Footer sections">
            <h3 style={{
              color: 'var(--footer-heading)', fontSize: '11px', fontWeight: '700',
              letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 20px',
            }}>
              Navigate
            </h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(event) => scrollTo(event, l.href)}
                    style={{
                      cursor: 'pointer', textDecoration: 'none',
                      color: 'var(--footer-link)', fontSize: '14px', padding: 0,
                      transition: 'color 0.2s', textAlign: 'left',
                      fontFamily: 'Inter, system-ui, sans-serif',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--amber-text)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-link)'}
                  >
                    {l.label}
                  </a>
                </li>
              ))}

            </ul>
          </nav>

          {/* Crisis hotline */}
          <section aria-labelledby="footer-crisis-heading">
            <h3 style={{
              color: 'var(--footer-heading)', fontSize: '11px', fontWeight: '700',
              letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 20px',
            }} id="footer-crisis-heading">
              Crisis hotline
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {[crisisHotline].map((h) => (
                <a
                  key={h.tel}
                  href={h.tel}
                  aria-label={`${h.name}, ${h.number}, ${h.region}. Call`}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    textDecoration: 'none',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-divider)',
                    background: 'transparent',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(196,122,58,0.22)';
                    e.currentTarget.style.background = 'rgba(196,122,58,0.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-divider)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <span style={{ color: 'var(--footer-hotline)', fontSize: '13px' }}>{h.name} · {h.region}</span>
                  <span style={{
                    color: 'var(--amber-text)', fontWeight: '700', fontSize: '13px',
                    fontFamily: 'Sora, sans-serif', letterSpacing: '-0.3px',
                  }}>{h.number}</span>
                </a>
              ))}
            </div>
            <p style={{ color: 'var(--footer-copy)', fontSize: '12px', lineHeight: '1.6', margin: '0 0 16px' }}>
              The official NCMH site was not accessible during this audit; the current number, hours, and mobile alternatives could not be independently confirmed.{' '}
              <a
                href={`#${crisisHotline.reference}`}
                onClick={(event) => scrollTo(event, `#${crisisHotline.reference}`)}
                style={{ color: 'var(--amber-text)', textDecoration: 'underline', textUnderlineOffset: '2px' }}
              >
                NCMH source details
              </a>
            </p>

            {/* Emergency callout */}
            <div style={{
              background: 'rgba(192,80,77,0.06)',
              border: '1px solid rgba(192,80,77,0.18)',
              borderRadius: '10px',
              padding: '14px 16px',
            }}>
              <p style={{ color: 'var(--footer-emergency)', fontSize: '12px', lineHeight: '1.65', margin: 0 }}>
                If you are in immediate danger, call{' '}
                <a href={emergencyNumber.tel} style={{ color: 'var(--highlight-red)', fontWeight: '700' }}>{emergencyNumber.number}</a>{' '}
                or go to your nearest emergency room.
              </p>
            </div>
          </section>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--border-divider), transparent)',
          marginBottom: 'clamp(18px, 3vw, 24px)',
        }} />

        {/* Bottom row */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--footer-note)', fontSize: '13px', margin: 0 }}>
            © {currentYear} Armor Down — Gender &amp; Society Midterm Project
          </p>
        </div>

      </div>
    </footer>
  );
}
