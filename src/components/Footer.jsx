import { Link } from 'react-router-dom';
import LogoIcon from './Logo';

const scrollTo = (href) => {
  const target = document.querySelector(href);
  if (target) {
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

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

const hotlines = [
  { name: 'NCMH Crisis Line', num: '1553',           tel: 'tel:1553'         },
  { name: 'Hopeline PH',      num: '8804-4673',      tel: 'tel:88044673'     },
  { name: 'In Touch',         num: '(02) 8893-7603', tel: 'tel:0288937603'  },
];

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer style={{
      background: '#0a0805',
      borderTop: '1px solid rgba(196,122,58,0.1)',
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
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                textDecoration: 'none', marginBottom: '18px',
              }}
              aria-label="Go to home"
            >
              <LogoIcon style={{ height: '36px', width: '36px' }} />
              <span style={{
                fontFamily: 'Sora, sans-serif', fontWeight: '700',
                fontSize: '16px', color: '#e8e0d5', letterSpacing: '-0.3px',
              }}>
                Armor Down
              </span>
            </Link>
            <p style={{ color: '#4a3f38', fontSize: '14px', lineHeight: '1.85', maxWidth: '280px', margin: '0 0 20px' }}>
              A gender awareness project on toxic masculinity and men's mental health.
              Created for Gender &amp; Society course, 4th Year.
            </p>
            <div style={{ height: '2px', width: '48px', background: 'linear-gradient(90deg, #c47a3a, #e8a87c)', borderRadius: '2px' }} />
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{
              color: '#3a3028', fontSize: '11px', fontWeight: '700',
              letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 20px',
            }}>
              Navigate
            </h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {links.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => scrollTo(l.href)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: '#4a3f38', fontSize: '14px', padding: 0,
                      transition: 'color 0.2s', textAlign: 'left',
                      fontFamily: 'Inter, system-ui, sans-serif',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#e8a87c'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#4a3f38'}
                  >
                    {l.label}
                  </button>
                </li>
              ))}

            </ul>
          </div>

          {/* Crisis hotlines */}
          <div>
            <h4 style={{
              color: '#3a3028', fontSize: '11px', fontWeight: '700',
              letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 20px',
            }}>
              Crisis Hotlines
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {hotlines.map((h) => (
                <a
                  key={h.name}
                  href={h.tel}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    textDecoration: 'none',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.03)',
                    background: 'rgba(255,255,255,0.01)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(196,122,58,0.22)';
                    e.currentTarget.style.background = 'rgba(196,122,58,0.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.01)';
                  }}
                >
                  <span style={{ color: '#4a3f38', fontSize: '13px' }}>{h.name}</span>
                  <span style={{
                    color: '#c47a3a', fontWeight: '700', fontSize: '13px',
                    fontFamily: 'Sora, sans-serif', letterSpacing: '-0.3px',
                  }}>{h.num}</span>
                </a>
              ))}
            </div>

            {/* Emergency callout */}
            <div style={{
              background: 'rgba(192,80,77,0.06)',
              border: '1px solid rgba(192,80,77,0.18)',
              borderRadius: '10px',
              padding: '14px 16px',
            }}>
              <p style={{ color: '#5a4f48', fontSize: '12px', lineHeight: '1.65', margin: 0 }}>
                If you are in immediate danger, please call{' '}
                <strong style={{ color: '#c0504d' }}>911</strong>{' '}
                or go to your nearest emergency room.
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',
          marginBottom: 'clamp(18px, 3vw, 24px)',
        }} />

        {/* Bottom row */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#3a3028', fontSize: '13px', margin: 0 }}>
            © {currentYear} Armor Down — Gender &amp; Society Midterm Project
          </p>
        </div>

      </div>
    </footer>
  );
}
