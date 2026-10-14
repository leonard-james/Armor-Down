import { useEffect, useRef, useState } from 'react';

const references = [
  // [1] WHO 2025
  {
    citation: 'World Health Organization. (2025). Suicide worldwide in 2021: Global health estimates. World Health Organization. https://www.who.int/publications/i/item/9789240110069',
    url: 'https://www.who.int/publications/i/item/9789240110069',
    type: 'International Organization',
    color: '#c47a3a',
    textColor: 'var(--highlight-amber)',
  },
  // [2] APA 2018 guidelines
  {
    citation: 'American Psychological Association. (2018). APA guidelines for psychological practice with boys and men. American Psychological Association. https://www.apa.org/about/policy/boys-men-practice-guidelines.pdf',
    url: 'https://www.apa.org/about/policy/boys-men-practice-guidelines.pdf',
    type: 'Clinical Guidelines',
    color: '#e8a87c',
    textColor: 'var(--highlight-amber-lt)',
  },
  // [3] CALM / HuffPost 2016
  {
    citation: 'Campaign Against Living Miserably & HuffPost UK. (2016). Masculinity audit 2016: Research reveals pressures on modern men. CALM. https://www.thecalmzone.net/masculinity-audit-2016-research-reveals-pressures-on-modern-men',
    url: 'https://www.thecalmzone.net/masculinity-audit-2016-research-reveals-pressures-on-modern-men',
    type: 'Research Report',
    color: '#a0522d',
    textColor: 'var(--highlight-rust)',
  },
  // [4] Priory Group
  {
    citation: 'Priory Group. (n.d.). Men\'s mental health: 40% of men won\'t talk to anyone about their mental health. Priory Group. https://www.priorygroup.com/blog/40-of-men-wont-talk-to-anyone-about-their-mental-health',
    url: 'https://www.priorygroup.com/blog/40-of-men-wont-talk-to-anyone-about-their-mental-health',
    type: 'Survey / Report',
    color: '#8b6b4e',
    textColor: 'var(--highlight-muted)',
  },
  // [5] NIMH
  {
    citation: 'National Institute of Mental Health. (n.d.). Mental illness. National Institute of Mental Health. https://www.nimh.nih.gov/health/statistics/mental-illness',
    url: 'https://www.nimh.nih.gov/health/statistics/mental-illness',
    type: 'Government Statistics',
    color: '#c47a3a',
    textColor: 'var(--highlight-amber)',
  },
  // [6] Our World in Data / WHO
  {
    citation: 'Ritchie, H., & Roser, M. (2024). Male vs. female suicide rate, 2021 [Data visualization]. Our World in Data. https://ourworldindata.org/grapher/male-vs-female-suicide',
    url: 'https://ourworldindata.org/grapher/male-vs-female-suicide',
    type: 'Data Visualization',
    color: '#e8a87c',
    textColor: 'var(--highlight-amber-lt)',
  },
  // [7] WHO Special Initiative — Philippines 2020
  {
    citation: 'World Health Organization. (2020). WHO Special Initiative for Mental Health: Philippines country brief. World Health Organization. https://www.who.int/docs/default-source/mental-health/special-initiative/who-special-initiative-country-brief-report---philippines---2020-04-23-brief.pdf',
    url: 'https://www.who.int/docs/default-source/mental-health/special-initiative/who-special-initiative-country-brief-report---philippines---2020-04-23-brief.pdf',
    type: 'WHO Country Brief',
    color: '#c47a3a',
    textColor: 'var(--highlight-amber)',
  },
  // [8] Connell
  {
    citation: 'Connell, R. W. (2005). Masculinities (2nd ed.). University of California Press. https://ucpress.edu/books/masculinities/paper',
    url: 'https://ucpress.edu/books/masculinities/paper',
    type: 'Academic Book',
    color: '#e8a87c',
    textColor: 'var(--highlight-amber-lt)',
  },
  // [9] RA 11036
  {
    citation: 'Republic of the Philippines. (2018). Republic Act No. 11036: An act establishing a national mental health policy for the purpose of enhancing the delivery of integrated mental health services, promoting and protecting the rights of persons utilizing psychiatric, neurologic and psychosocial health services, appropriating funds therefor, and for other purposes [Mental Health Act]. Senate of the Philippines Legislative Reference Bureau. https://ldr.senate.gov.ph/legislative-issuance/republic-act-no-11036',
    url: 'https://ldr.senate.gov.ph/legislative-issuance/republic-act-no-11036',
    type: 'Philippine Law',
    color: '#a0522d',
    textColor: 'var(--highlight-rust)',
  },
  // [10] RA 10533
  {
    citation: 'Republic of the Philippines. (2013). Republic Act No. 10533: An act enhancing the Philippine basic education system by strengthening its curriculum and increasing the number of years for basic education [Enhanced Basic Education Act of 2013]. Senate of the Philippines Legislative Reference Bureau. https://ldr.senate.gov.ph/bills/senate-bill-no-3286-15th-congress-republic',
    url: 'https://ldr.senate.gov.ph/bills/senate-bill-no-3286-15th-congress-republic',
    type: 'Philippine Law',
    color: '#8b6b4e',
    textColor: 'var(--highlight-muted)',
  },
  // [11] DOH AO 2016-0039
  {
    citation: 'Department of Health Philippines. (2016). Administrative Order No. 2016-0039: Revised operational framework for a comprehensive national mental health program. Department of Health. https://www.scribd.com/document/748744909/Administrative-Order-No-2016-0039-Revised-Operational-Framework-for-a-Comprehensive-National-Mental-Health-Program',
    url: 'https://www.scribd.com/document/748744909/Administrative-Order-No-2016-0039-Revised-Operational-Framework-for-a-Comprehensive-National-Mental-Health-Program',
    type: 'Administrative Order',
    color: '#c47a3a',
    textColor: 'var(--highlight-amber)',
  },
  // [12] NCMH
  {
    citation: 'National Center for Mental Health. (n.d.). NCMH crisis hotline. National Center for Mental Health, Department of Health. https://ncmh.gov.ph',
    url: 'https://ncmh.gov.ph',
    type: 'Government Agency',
    color: '#e8a87c',
    textColor: 'var(--highlight-amber-lt)',
  },
  // [13] Addis & Mahalik
  {
    citation: 'Addis, M. E., & Mahalik, J. R. (2003). Men, masculinity, and the contexts of help seeking. American Psychologist, 58(1), 5–14. https://doi.org/10.1037/0003-066X.58.1.5',
    url: 'https://doi.org/10.1037/0003-066X.58.1.5',
    type: 'Journal Article',
    color: '#a0522d',
    textColor: 'var(--highlight-rust)',
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
            <span style={{ color: 'var(--amber-text)', fontSize: '13px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>
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
              background: 'var(--highlight-gradient)',
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
              id={`reference-${i + 1}`}
              tabIndex={-1}
              style={{
                background: 'var(--ref-bg)',
                border: '1px solid var(--ref-border)',
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
                e.currentTarget.style.background = 'var(--ref-bg-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--ref-border)';
                e.currentTarget.style.background = 'var(--ref-bg)';
              }}
            >
              {/* Number */}
              <div style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '13px', fontWeight: '700',
                color: item.textColor, minWidth: '28px', marginTop: '2px',
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
                      aria-label={`Open reference ${i + 1}: ${item.type} in a new tab`}
                      style={{
                        color: item.textColor,
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
                      Open source ↗
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
                  <span style={{ color: item.textColor, fontSize: '10px', fontWeight: '600', letterSpacing: '0.5px' }}>
                    {item.type}
                  </span>
                </div>
                {item.needsVerification && (
                  <div style={{
                    display: 'inline-block',
                    marginLeft: '8px',
                    marginTop: '8px',
                    background: 'rgba(192,80,77,0.08)',
                    border: '1px solid rgba(192,80,77,0.35)',
                    borderRadius: '4px',
                    padding: '2px 8px',
                  }}>
                    <span style={{ color: 'var(--highlight-red)', fontSize: '10px', fontWeight: '700', letterSpacing: '0.5px' }}>
                      ⚠ Needs verification
                    </span>
                  </div>
                )}
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
