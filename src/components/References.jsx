import { useEffect, useRef, useState } from 'react';

const references = [
  {
    citation: 'World Health Organization (2021). Suicide data.',
    url: 'https://www.who.int/news-room/fact-sheets/detail/suicide',
    type: 'International Organization',
    color: '#3b82f6',
  },
  {
    citation: 'American Psychological Association (2021). Men and mental health. APA Publications.',
    url: 'https://www.apa.org',
    type: 'Academic Organization',
    color: '#14b8a6',
  },
  {
    citation: 'CALM – Campaign Against Living Miserably (2019). Survey on men\'s mental health. London, UK.',
    url: 'https://www.thecalmzone.net',
    type: 'Research Report',
    color: '#8b5cf6',
  },
  {
    citation: 'Department of Health Philippines (2020). National Mental Health Program Report. Manila: DOH.',
    url: 'https://www.doh.gov.ph',
    type: 'Government Report',
    color: '#f59e0b',
  },
  {
    citation: 'Connell, R. W. (2005). Masculinities (2nd ed.). University of California Press.',
    url: null,
    type: 'Academic Book',
    color: '#ec4899',
  },
  {
    citation: 'Republic Act No. 11036 (2018). Philippine Mental Health Act. Republic of the Philippines.',
    url: 'https://www.officialgazette.gov.ph/2018/07/30/republic-act-no-11036/',
    type: 'Philippine Law',
    color: '#14b8a6',
  },
  {
    citation: 'Republic Act No. 10533 (2013). Enhanced Basic Education Act of 2013. Republic of the Philippines.',
    url: 'https://www.officialgazette.gov.ph',
    type: 'Philippine Law',
    color: '#3b82f6',
  },
  {
    citation: 'Department of Health Philippines (2020). Administrative Order 2020-0013: National Mental Health Program.',
    url: 'https://www.doh.gov.ph',
    type: 'Administrative Order',
    color: '#8b5cf6',
  },
  {
    citation: 'National Center for Mental Health Philippines. (n.d.). Crisis hotline services.',
    url: 'https://www.ncmh.gov.ph',
    type: 'Government Agency',
    color: '#f59e0b',
  },
  {
    citation: 'Addis, M. E., & Mahalik, J. R. (2003). Men, masculinity, and the contexts of help seeking. American Psychologist, 58(1), 5–14.',
    url: null,
    type: 'Journal Article',
    color: '#ec4899',
  },
];

export default function References() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="references"
      ref={ref}
      style={{
        padding: '100px 24px',
        background: '#080c18',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.25), transparent)',
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px',
          }}>
            <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg, #3b82f6, #14b8a6)' }} />
            <span style={{ color: '#3b82f6', fontSize: '13px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Sources
            </span>
            <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg, #14b8a6, #3b82f6)' }} />
          </div>

          <h2 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: '800',
            margin: '0 0 16px',
            letterSpacing: '-1px',
            color: '#f1f5f9',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease 0.1s',
          }}>
            References &amp;{' '}
            <span style={{
              background: 'linear-gradient(135deg, #3b82f6, #14b8a6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Further Reading</span>
          </h2>

          <p style={{
            color: '#475569', fontSize: '15px',
            opacity: visible ? 1 : 0, transition: 'all 0.7s ease 0.2s',
          }}>
            All claims in this project are supported by academic, governmental, and organizational sources.
          </p>
        </div>

        {/* References list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {references.map((ref, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(17,24,39,0.5)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '12px',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                transition: 'all 0.3s ease',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                transitionDelay: `${0.2 + i * 0.07}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${ref.color}25`;
                e.currentTarget.style.background = 'rgba(17,24,39,0.9)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.background = 'rgba(17,24,39,0.5)';
              }}
            >
              {/* Number */}
              <div style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '13px', fontWeight: '700',
                color: ref.color, minWidth: '28px',
                marginTop: '2px',
              }}>
                [{i + 1}]
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                  <p style={{
                    color: '#94a3b8',
                    fontSize: '14px',
                    lineHeight: '1.7',
                    margin: 0,
                    fontFamily: 'Georgia, serif',
                    flex: 1,
                  }}>
                    {ref.citation}
                  </p>
                  {ref.url && (
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: ref.color,
                        fontSize: '11px',
                        fontWeight: '600',
                        textDecoration: 'none',
                        padding: '4px 10px',
                        border: `1px solid ${ref.color}30`,
                        borderRadius: '6px',
                        flexShrink: 0,
                        transition: 'all 0.2s ease',
                        whiteSpace: 'nowrap',
                      }}
                      onMouseEnter={(e) => { e.target.style.background = `${ref.color}15`; }}
                      onMouseLeave={(e) => { e.target.style.background = 'transparent'; }}
                    >
                      Visit ↗
                    </a>
                  )}
                </div>
                <div style={{
                  marginTop: '8px',
                  display: 'inline-block',
                  background: `${ref.color}10`,
                  border: `1px solid ${ref.color}20`,
                  borderRadius: '4px',
                  padding: '2px 8px',
                }}>
                  <span style={{ color: ref.color, fontSize: '10px', fontWeight: '600', letterSpacing: '0.5px' }}>
                    {ref.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* APA note */}
        <div style={{
          marginTop: '40px', textAlign: 'center',
          opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease 1.2s',
        }}>
          <p style={{ color: '#1e293b', fontSize: '13px' }}>
            All references formatted in APA 7th Edition style.
          </p>
        </div>
      </div>
    </section>
  );
}
