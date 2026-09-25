import { useEffect, useRef, useState } from 'react';

const laws = [
  {
    number: 'RA 11036',
    title: 'Philippine Mental Health Act',
    year: '2018',
    description:
      'The cornerstone of mental health legislation in the Philippines. It guarantees every Filipino — including men — the right to access mental health services without fear of discrimination or stigma. It directly addresses the culture of silence around mental health by mandating services in hospitals, workplaces, and schools.',
    highlights: [
      'Guarantees the right to mental health care for all Filipinos',
      'Mandates mental health services in hospitals and workplaces',
      'Explicitly prohibits discrimination against those seeking help',
      'Establishes a National Mental Health Policy targeting stigma',
    ],
    color: '#3b82f6',
    tag: 'Primary Law',
  },
  {
    number: 'RA 11313',
    title: 'Safe Spaces Act',
    year: '2019',
    description:
      'Also known as the "Bawal Bastos" law, this act addresses gender-based harassment in public spaces, online, and in workplaces and schools. For men\'s mental health, it is directly relevant: it challenges the toxic masculine norm that harassment and aggression are acceptable expressions of manhood — behaviors rooted in the same culture that discourages men from seeking help.',
    highlights: [
      'Prohibits gender-based sexual harassment in all spaces',
      'Challenges norms that normalize male aggression',
      'Covers online harassment — a growing source of male-perpetrated harm',
      'Signals a legal shift away from toxic masculinity as the default',
    ],
    color: '#14b8a6',
    tag: 'Gender Norms',
  },
  {
    number: 'DOH AO 2020-0013',
    title: 'National Mental Health Program',
    year: '2020',
    description:
      'The Department of Health\'s operational framework for delivering mental health services across the Philippines. It prioritizes community-based care and targets underserved populations — a category that disproportionately includes men, who are least likely to seek help through formal hospital channels.',
    highlights: [
      'Expands community-based mental health access beyond hospitals',
      'Targets underserved groups — including men who avoid formal care',
      'Funds mental health awareness and destigmatization campaigns',
      'Aligns with the WHO Mental Health Action Plan 2013–2030',
    ],
    color: '#8b5cf6',
    tag: 'Policy',
  },
  {
    number: 'RA 10533',
    title: 'Enhanced Basic Education Act (K–12)',
    year: '2013',
    description:
      'The K–12 reform law that restructured Philippine basic education. It mandates the inclusion of mental health, emotional well-being, and social-emotional learning in the curriculum. Reaching boys early — before toxic masculine norms are fully internalized — is one of the most effective long-term strategies for improving men\'s mental health outcomes.',
    highlights: [
      'Integrates mental health and emotional literacy into the curriculum',
      'Reaches boys before harmful gender norms become deeply ingrained',
      'Promotes help-seeking as a normal, healthy behavior from youth',
      'Supports gender-responsive and inclusive education standards',
    ],
    color: '#f59e0b',
    tag: 'Education',
  },
];

export default function LawsPolicies() {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
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
      id="laws"
      ref={ref}
      style={{
        padding: '100px 24px',
        background: 'linear-gradient(180deg, #080c18 0%, #0a0e1a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative lines */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(20,184,166,0.3), transparent)',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '70px' }}>
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px',
          }}>
            <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg, #3b82f6, #14b8a6)' }} />
            <span style={{ color: '#14b8a6', fontSize: '13px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Philippine Context
            </span>
            <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg, #14b8a6, #3b82f6)' }} />
          </div>

          <h2 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(30px, 5vw, 52px)',
            fontWeight: '800',
            margin: '0 0 16px',
            letterSpacing: '-1px',
            color: '#f1f5f9',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease 0.1s',
          }}>
            Laws &amp;{' '}
            <span style={{
              background: 'linear-gradient(135deg, #14b8a6, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Policies</span>
          </h2>

          <p style={{
            color: '#64748b', fontSize: '16px', maxWidth: '560px', margin: '0 auto',
            lineHeight: '1.7',
            opacity: visible ? 1 : 0,
            transition: 'all 0.7s ease 0.2s',
          }}>
            The Philippines has taken meaningful legislative steps toward mental health equity.
            Here's what the law says — and how it relates to men's wellbeing.
          </p>
        </div>

        {/* Laws list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {laws.map((law, i) => (
            <div
              key={i}
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
              style={{
                background: activeIndex === i ? 'rgba(17,24,39,0.95)' : 'rgba(17,24,39,0.5)',
                border: `1px solid ${activeIndex === i ? law.color + '50' : law.color + '20'}`,
                borderRadius: '20px',
                padding: '28px 32px',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-30px)',
                transitionDelay: `${0.2 + i * 0.1}s`,
                boxShadow: activeIndex === i ? `0 20px 60px ${law.color}15` : 'none',
              }}
              onMouseEnter={(e) => {
                if (activeIndex !== i) {
                  e.currentTarget.style.borderColor = `${law.color}35`;
                  e.currentTarget.style.background = 'rgba(17,24,39,0.8)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeIndex !== i) {
                  e.currentTarget.style.borderColor = `${law.color}20`;
                  e.currentTarget.style.background = 'rgba(17,24,39,0.5)';
                }
              }}
            >
              {/* Header row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
                      <span style={{
                        fontFamily: 'Sora, sans-serif',
                        fontWeight: '800', fontSize: '18px',
                        color: law.color,
                        letterSpacing: '-0.3px',
                      }}>
                        {law.number}
                      </span>
                      <span style={{
                        background: `${law.color}15`, border: `1px solid ${law.color}30`,
                        borderRadius: '6px', padding: '2px 8px',
                        color: law.color, fontSize: '10px', fontWeight: '700', letterSpacing: '0.8px', textTransform: 'uppercase',
                      }}>
                        {law.tag}
                      </span>
                      <span style={{ color: '#334155', fontSize: '12px' }}>{law.year}</span>
                    </div>
                    <h3 style={{ color: '#f1f5f9', fontSize: '16px', fontWeight: '700', margin: 0, letterSpacing: '-0.2px' }}>
                      {law.title}
                    </h3>
                  </div>
                </div>
                <div style={{
                  width: '28px', height: '28px',
                  border: `1px solid ${law.color}30`,
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: law.color, fontSize: '14px', flexShrink: 0,
                  transition: 'transform 0.3s ease',
                  transform: activeIndex === i ? 'rotate(45deg)' : 'rotate(0deg)',
                }}>
                  +
                </div>
              </div>

              {/* Expanded content */}
              {activeIndex === i && (
                <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: `1px solid ${law.color}15` }}>
                  <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.8', margin: '0 0 20px' }}>
                    {law.description}
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                    {law.highlights.map((h, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <span style={{
                          width: '20px', height: '20px', borderRadius: '50%',
                          background: `${law.color}20`, border: `1px solid ${law.color}40`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0, marginTop: '1px',
                          color: law.color, fontSize: '10px',
                        }}>✓</span>
                        <span style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.6' }}>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div style={{
          marginTop: '50px',
          background: 'rgba(59,130,246,0.06)',
          border: '1px solid rgba(59,130,246,0.15)',
          borderRadius: '16px',
          padding: '28px 32px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.7s ease 1s',
        }}>
          <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.8', margin: 0, textAlign: 'center' }}>
            <span style={{ color: '#3b82f6', fontWeight: '600' }}>Note:</span> While laws exist, implementation remains uneven.
            Many Filipino men are still unaware of the services they are entitled to.
            Awareness and destigmatization remain critical next steps.
          </p>
        </div>
      </div>
    </section>
  );
}
