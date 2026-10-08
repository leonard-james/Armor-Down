import { useEffect, useRef, useState } from 'react';

const references = [
  {
    citation: 'World Health Organization (2021). Suicide worldwide in 2021: Global health estimates. Geneva: WHO. Men: 12.6 per 100,000; Women: 5.4 per 100,000.',
    url: 'https://www.who.int/news/item/17-06-2021-one-in-100-deaths-is-by-suicide',
    type: 'International Organization',
    color: '#c47a3a',
  },
  {
    citation: 'American Psychological Association (2021). Men and mental health. APA Publications.',
    url: 'https://www.apa.org',
    type: 'Academic Organization',
    color: '#e8a87c',
  },
  {
    citation: 'CALM – Campaign Against Living Miserably (2019). Survey on men\'s mental health. London, UK.',
    url: 'https://www.thecalmzone.net',
    type: 'Research Report',
    color: '#a0522d',
  },
  {
    citation: 'Substance Abuse and Mental Health Services Administration (2021). Mental Health Client Level Data: Adults receiving mental health treatment by gender. Rockville, MD: SAMHSA.',
    url: 'https://www.samhsa.gov/data/',
    type: 'Government Report',
    color: '#8b6b4e',
  },
  {
    citation: 'Department of Health Philippines (2020). National Mental Health Program Report. Manila: DOH.',
    url: 'https://www.doh.gov.ph',
    type: 'Government Report',
    color: '#c47a3a',
  },
  {
    citation: 'Connell, R. W. (2005). Masculinities (2nd ed.). University of California Press.',
    url: null,
    type: 'Academic Book',
    color: '#e8a87c',
  },
  {
    citation: 'Republic Act No. 11036 (2018). Philippine Mental Health Act. Republic of the Philippines.',
    url: 'https://www.officialgazette.gov.ph/2018/07/30/republic-act-no-11036/',
    type: 'Philippine Law',
    color: '#a0522d',
  },
  {
    citation: 'Republic Act No. 10533 (2013). Enhanced Basic Education Act of 2013. Republic of the Philippines.',
    url: 'https://www.officialgazette.gov.ph',
    type: 'Philippine Law',
    color: '#8b6b4e',
  },
  {
    citation: 'Department of Health Philippines (2020). Administrative Order 2020-0013: National Mental Health Program.',
    url: 'https://www.doh.gov.ph',
    type: 'Administrative Order',
    color: '#c47a3a',
  },
  {
    citation: 'National Center for Mental Health Philippines. (n.d.). Crisis hotline services.',
    url: 'https://www.ncmh.gov.ph',
    type: 'Government Agency',
    color: '#e8a87c',
  },
  {
    citation: 'Addis, M. E., & Mahalik, J. R. (2003). Men, masculinity, and the contexts of help seeking. American Psychologist, 58(1), 5–14.',
    url: null,
    type: 'Journal Article',
    color: '#a0522d',
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
        padding: 'clamp(60px, 8vw, 100px) clamp(16px, 4vw, 24px)',
        background: 'var(--bg-page-alt)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(196,122,58,0.2), transparent)',
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
            <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg, #c47a3a, #e8a87c)' }} />
            <span style={{ color: '#c47a3a', fontSize: '13px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Sources
            </span>
            <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg, #e8a87c, #c47a3a)' }} />
          </div>

          <h2 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: '800',
            margin: '0 0 16px',
            letterSpacing: '-1px',
            color: 'var(--text-primary)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease 0.1s',
          }}>
            References &amp;{' '}
            <span style={{
              background: 'linear-gradient(135deg, #c47a3a, #e8a87c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Further Reading</span>
          </h2>

          <p style={{
            color: 'var(--text-dim)', fontSize: '15px',
            opacity: visible ? 1 : 0, transition: 'all 0.7s ease 0.2s',
          }}>
            All claims in this project are supported by academic, governmental, and organizational sources.
          </p>
        </div>

        {/* References list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {references.map((item, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(22,17,13,0.6)',
                border: '1px solid rgba(255,255,255,0.04)',
                borderRadius: '12px',
                padding: '18px 22px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                transition: 'all 0.3s ease',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                transitionDelay: `${0.2 + i * 0.06}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${item.color}22`;
                e.currentTarget.style.background = 'rgba(28,22,18,0.9)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.background = 'rgba(22,17,13,0.6)';
              }}
            >
              {/* Number */}
              <div style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '13px', fontWeight: '700',
                color: item.color, minWidth: '28px', marginTop: '2px',
              }}>
                [{i + 1}]
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '14px',
                    lineHeight: '1.7',
                    margin: 0,
                    fontFamily: 'Georgia, serif',
                    flex: 1,
                  }}>
                    {item.citation}
                  </p>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: item.color,
                        fontSize: '11px',
                        fontWeight: '600',
                        textDecoration: 'none',
                        padding: '4px 10px',
                        border: `1px solid ${item.color}28`,
                        borderRadius: '6px',
                        flexShrink: 0,
                        transition: 'all 0.2s ease',
                        whiteSpace: 'nowrap',
                      }}
                      onMouseEnter={(e) => { e.target.style.background = `${item.color}12`; }}
                      onMouseLeave={(e) => { e.target.style.background = 'transparent'; }}
                    >
                      Visit ↗
                    </a>
                  )}
                </div>
                <div style={{
                  marginTop: '8px',
                  display: 'inline-block',
                  background: `${item.color}0d`,
                  border: `1px solid ${item.color}1e`,
                  borderRadius: '4px',
                  padding: '2px 8px',
                }}>
                  <span style={{ color: item.color, fontSize: '10px', fontWeight: '600', letterSpacing: '0.5px' }}>
                    {item.type}
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
          <p style={{ color: 'var(--text-ghost)', fontSize: '13px' }}>
            All references formatted in APA 7th Edition style.
          </p>
        </div>
      </div>
    </section>
  );
}
