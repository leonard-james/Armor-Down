const scrollTo = (href) => {
  const target = document.querySelector(href);
  if (target) {
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

const links = [
  { label: 'What Is It', href: '#whatis' },
  { label: 'Statistics', href: '#statistics' },
  { label: 'Myths vs Reality', href: '#myths' },
  { label: 'Effects', href: '#effects' },
  { label: 'Laws & Policies', href: '#laws' },
  { label: 'Break the Silence', href: '#silence' },
  { label: 'References', href: '#references' },
];

export default function Footer() {
  return (
    <footer style={{
      background: '#050810',
      borderTop: '1px solid rgba(59,130,246,0.1)',
      padding: '60px 24px 30px',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Top row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '50px',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px', height: '36px',
                background: 'linear-gradient(135deg, #3b82f6, #14b8a6)',
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: '900', fontSize: '18px', color: 'white', fontFamily: 'Sora, sans-serif',
              }}>B</div>
              <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: '700', fontSize: '15px', color: '#f1f5f9' }}>
                Break the Silence
              </span>
            </div>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.8', maxWidth: '280px', margin: 0 }}>
              A gender awareness project on toxic masculinity and men's mental health.
              Created for Gender &amp; Society course, 4th Year.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ color: '#475569', fontSize: '12px', fontWeight: '600', letterSpacing: '1.5px', textTransform: 'uppercase', margin: '0 0 16px' }}>
              Navigate
            </h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {links.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => scrollTo(l.href)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: '#334155', fontSize: '14px', padding: 0,
                      transition: 'color 0.2s', textAlign: 'left',
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#3b82f6'}
                    onMouseLeave={(e) => e.target.style.color = '#334155'}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Crisis contact */}
          <div>
            <h4 style={{ color: '#475569', fontSize: '12px', fontWeight: '600', letterSpacing: '1.5px', textTransform: 'uppercase', margin: '0 0 16px' }}>
              Crisis Hotlines
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { name: 'NCMH Crisis Line', num: '1553' },
                { name: 'Hopeline PH', num: '8804-4673' },
                { name: 'In Touch', num: '(02) 8893-7603' },
              ].map((h) => (
                <div key={h.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#334155', fontSize: '13px' }}>{h.name}</span>
                  <span style={{ color: '#3b82f6', fontWeight: '700', fontSize: '13px', fontFamily: 'Sora, sans-serif' }}>{h.num}</span>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '20px',
              background: 'rgba(59,130,246,0.06)',
              border: '1px solid rgba(59,130,246,0.15)',
              borderRadius: '10px',
              padding: '14px 16px',
            }}>
              <p style={{ color: '#475569', fontSize: '12px', lineHeight: '1.6', margin: 0 }}>
                If you are in immediate danger, please call <strong style={{ color: '#ef4444' }}>911</strong> or go to your nearest emergency room.
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.04)', marginBottom: '24px' }} />

        {/* Bottom row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ color: '#334155', fontSize: '13px', margin: 0 }}>
            © 2025 Break the Silence — Gender &amp; Society Midterm Project
          </p>
          <p style={{ color: '#334155', fontSize: '12px', margin: 0 }}>
            Built with React + Vite + Tailwind CSS v4 &nbsp;|&nbsp; Content based on cited research
          </p>
        </div>
      </div>
    </footer>
  );
}
