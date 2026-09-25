import { useEffect, useRef, useState } from 'react';

const laws = [
  {
    number: 'RA 11036',
    title: 'Philippine Mental Health Act',
    year: '2018',
    description:
      'The landmark legislation that guarantees all Filipinos the right to access mental health services. It mandates mental health facilities in hospitals, workplaces, schools, and communities. It also addresses the stigma around mental health and protects the rights of individuals with mental health conditions.',
    highlights: [
      'Mandates mental health services in all hospitals',
      'Establishes a National Mental Health Policy',
      'Protects rights of persons with mental health conditions',
      'Requires mental health programs in schools and workplaces',
    ],
    color: '#3b82f6',
    icon: '⚖️',
    tag: 'Primary Law',
  },
  {
    number: 'RA 10533',
    title: 'Enhanced Basic Education Act',
    year: '2013',
    description:
      'The K–12 reform law that expanded basic education to 13 years. Critically, it mandates the inclusion of mental health and emotional well-being topics in the curriculum, recognizing that healthy development must include psychological literacy from a young age.',
    highlights: [
      'Includes mental health in the K–12 curriculum',
      'Promotes holistic student development',
      'Addresses social-emotional learning',
      'Supports gender-responsive education',
    ],
    color: '#14b8a6',
    icon: '📚',
    tag: 'Education',
  },
  {
    number: 'DOH AO 2020-0013',
    title: 'National Mental Health Program',
    year: '2020',
    description:
      'An administrative order by the Department of Health establishing the operational framework for the National Mental Health Program. It provides specific guidelines for mental health service delivery, with emphasis on community-based care and addressing underserved populations.',
    highlights: [
      'Strengthens community-based mental health care',
      'Provides guidelines for service implementation',
      'Targets underserved and vulnerable populations',
      'Aligns with the WHO Mental Health Action Plan',
    ],
    color: '#8b5cf6',
    icon: '🏥',
    tag: 'Policy',
  },
  {
    number: 'RA 9262',
    title: 'Anti-Violence Against Women and Children Act',
    year: '2004',
    description:
      'While primarily focused on protecting women and children, this law is highly relevant as it illustrates how toxic masculinity directly enables violence and harm. It criminalizes physical, sexual, psychological, and economic abuse — behaviors often rooted in harmful masculine norms.',
    highlights: [
      'Criminalizes domestic violence and abuse',
      'Addresses psychological and emotional abuse',
      'Provides protection orders for victims',
      'Highlights root causes linked to gender norms',
    ],
    color: '#f59e0b',
    icon: '🛡️',
    tag: 'Protection',
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
                  <div style={{
                    width: '52px', height: '52px',
                    background: `${law.color}15`,
                    border: `1px solid ${law.color}30`,
                    borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '22px', flexShrink: 0,
                  }}>
                    {law.icon}
                  </div>
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
