import LogoIcon from './Logo';

const scrollTo = (href) => {
  const target = document.querySelector(href);
  if (target) {
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

const links = [
  { label: 'What Is It',      href: '#whatis'     },
  { label: 'Statistics',      href: '#statistics'  },
  { label: 'Myths vs Reality',href: '#myths'       },
  { label: 'Effects',         href: '#effects'     },
  { label: 'Laws & Policies', href: '#laws'        },
  { label: 'Break the Silence', href: '#silence'   },
  { label: 'References',      href: '#references'  },
];

const hotlines = [
  { name: 'NCMH Crisis Line', num: '1553',          tel: 'tel:1553'         },
  { name: 'Hopeline PH',      num: '8804-4673',     tel: 'tel:88044673'     },
  { name: 'In Touch',         num: '(02) 8893-7603', tel: 'tel:0288937603'  },
];

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer style={{
      background: '#050810',
      borderTop: '1px solid rgba(45,212,191,0.12)',
      padding: 'clamp(48px, 7vw, 72px) clamp(16px, 4vw, 24px) clamp(24px, 4vw, 36px)',
      position: 'relative',
    }}>
      {/* Top gradient line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, #2dd4bf40, #3b82f640, transparent)',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* ── Top grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
          gap: 'clamp(32px, 5vw, 56px)',
          marginBottom: 'clamp(40px, 6vw, 56px)',
        }}>

          {/* Brand */}
          <div>
            <button
              onClick={() => scrollTo('#hero')}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: 0, marginBottom: '18px',
              }}
              aria-label="Scroll to top"
            >
              <LogoIcon style={{ height: '36px', width: '36px' }} />
              <span style={{
                fontFamily: 'Sora, sans-serif', fontWeight: '700',
                fontSize: '16px', color: '#f1f5f9', letterSpacing: '-0.3px',
              }}>
                Armor Down
              </span>
            </button>
            <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.85', maxWidth: '280px', margin: '0 0 20px' }}>
              A gender awareness project on toxic masculinity and men's mental health.
              Created for Gender &amp; Society course, 4th Year.
            </p>
            {/* Accent rule */}
            <div style={{ height: '2px', width: '48px', background: 'linear-gradient(90deg, #2dd4bf, #3b82f6)', borderRadius: '2px' }} />
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{
              color: '#334155', fontSize: '11px', fontWeight: '700',
              letterSpacing: '2px', textTransform: 'uppercase',
              margin: '0 0 20px',
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
                      color: '#475569', fontSize: '14px', padding: 0,
                      transition: 'color 0.2s', textAlign: 'left',
                      fontFamily: 'Inter, system-ui, sans-serif',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#2dd4bf'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}
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
              color: '#334155', fontSize: '11px', fontWeight: '700',
              letterSpacing: '2px', textTransform: 'uppercase',
              margin: '0 0 20px',
            }}>
              Crisis Hotlines
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {hotlines.map((h) => (
                <a
                  key={h.name}
                  href={h.tel}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    textDecoration: 'none',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.04)',
                    background: 'rgba(255,255,255,0.02)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(45,212,191,0.25)';
                    e.currentTarget.style.background = 'rgba(45,212,191,0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  }}
                >
                  <span style={{ color: '#475569', fontSize: '13px' }}>{h.name}</span>
                  <span style={{
                    color: '#2dd4bf', fontWeight: '700', fontSize: '13px',
                    fontFamily: 'Sora, sans-serif', letterSpacing: '-0.3px',
                  }}>{h.num}</span>
                </a>
              ))}
            </div>

            {/* Emergency callout */}
            <div style={{
              background: 'rgba(239,68,68,0.06)',
              border: '1px solid rgba(239,68,68,0.18)',
              borderRadius: '10px',
              padding: '14px 16px',
            }}>
              <p style={{ color: '#64748b', fontSize: '12px', lineHeight: '1.65', margin: 0 }}>
                If you are in immediate danger, please call{' '}
                <strong style={{ color: '#ef4444' }}>911</strong>{' '}
                or go to your nearest emergency room.
              </p>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
          marginBottom: 'clamp(18px, 3vw, 24px)',
        }} />

        {/* ── Bottom row ── */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
        }}>
          <p style={{ color: '#334155', fontSize: '13px', margin: 0 }}>
            © {currentYear} Armor Down — Gender &amp; Society Midterm Project
          </p>
          <p style={{ color: '#1e293b', fontSize: '12px', margin: 0 }}>
            Built with React + Vite &nbsp;|&nbsp; Content based on cited research
          </p>
        </div>

      </div>
    </footer>
  );
}
