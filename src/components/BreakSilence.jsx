import { useEffect, useRef, useState } from 'react';

const hotlines = [
  {
    name: 'National Center for Mental Health',
    number: '1553',
    tel: 'tel:1553',
    desc: 'Philippines 24/7 crisis hotline',
    color: '#3b82f6',
  },
  {
    name: 'Hopeline Philippines',
    number: '8804-4673',
    tel: 'tel:88044673',
    desc: 'Free emotional support & counseling',
    color: '#14b8a6',
  },
  {
    name: 'In Touch Community Services',
    number: '(02) 8893-7603',
    tel: 'tel:0288937603',
    desc: 'Mental health counseling & support',
    color: '#8b5cf6',
  },
  {
    name: 'DOH Mental Health Program',
    number: '(02) 8651-7800',
    tel: 'tel:0286517800',
    desc: 'Department of Health mental health services',
    color: '#14b8a6',
  },
];

const affirmations = [
  'You are worthy of care.',
  'Your pain is real and valid.',
  'Asking for help is brave.',
  'You don\'t have to face this alone.',
  'Recovery is possible.',
];

export default function BreakSilence() {
  const [visible, setVisible] = useState(false);
  const [affIdx, setAffIdx] = useState(0);
  const [affFade, setAffFade] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAffFade(false);
      setTimeout(() => {
        setAffIdx((prev) => (prev + 1) % affirmations.length);
        setAffFade(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="silence"
      ref={ref}
      style={{
        padding: 'clamp(60px, 10vw, 120px) clamp(16px, 4vw, 24px)',
        background: 'linear-gradient(135deg, #0a0e1a 0%, #0d1220 30%, #0a1420 60%, #0a0e1a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient light effects */}
      <div style={{
        position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
        width: '800px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '20%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(20,184,166,0.06) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* Top border */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 0, height: '2px',
        background: 'linear-gradient(90deg, transparent, #3b82f6, #14b8a6, transparent)',
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)',
          borderRadius: '50px', padding: '8px 20px', marginBottom: '36px',
          opacity: visible ? 1 : 0, transition: 'all 0.7s ease',
        }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', animation: 'pulse-slow 1.5s infinite' }} />
          <span style={{ color: '#93c5fd', fontSize: '13px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Break the Silence
          </span>
        </div>

        {/* Headline */}
        <h2 style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: 'clamp(36px, 7vw, 72px)',
          fontWeight: '800',
          lineHeight: '1.05',
          margin: '0 0 20px',
          letterSpacing: '-2px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease 0.1s',
          color: '#f1f5f9',
        }}>
          You Don't Have to{' '}
          <span style={{
            background: 'linear-gradient(135deg, #3b82f6, #14b8a6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Carry This Alone
          </span>
        </h2>

        {/* Rotating affirmation */}
        <div style={{
          minHeight: '40px', marginBottom: '24px',
          opacity: visible ? 1 : 0, transition: 'all 0.7s ease 0.2s',
        }}>
          <p style={{
            fontSize: 'clamp(18px, 3vw, 24px)',
            color: '#64748b',
            fontStyle: 'italic',
            fontWeight: '400',
            margin: 0,
            transition: 'opacity 0.4s ease',
            opacity: affFade ? 1 : 0,
          }}>
            "{affirmations[affIdx]}"
          </p>
        </div>

        {/* Main paragraph */}
        <p style={{
          color: '#475569',
          fontSize: '17px',
          lineHeight: '1.85',
          maxWidth: '680px',
          margin: '0 auto 60px',
          opacity: visible ? 1 : 0,
          transition: 'all 0.7s ease 0.3s',
        }}>
          The most important thing you can do right now is <strong style={{ color: '#94a3b8' }}>reach out</strong>.
          Whether it's talking to a friend, a family member, a counselor, or a crisis hotline —
          taking that first step is an act of extraordinary courage.
          <br /><br />
          If you or someone you know is struggling, these resources are available, free, and confidential.
        </p>

        {/* Hotline cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '60px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease 0.4s',
        }}>
          {hotlines.map((h, i) => (
            <div
              key={i}
              style={{
                background: hoveredCard === i ? `rgba(17,24,39,0.95)` : 'rgba(17,24,39,0.8)',
                border: `1px solid ${hoveredCard === i ? h.color + '55' : h.color + '25'}`,
                borderRadius: '16px',
                padding: '24px 20px',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transform: hoveredCard === i ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hoveredCard === i ? `0 16px 40px ${h.color}20` : 'none',
              }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              onTouchStart={() => setHoveredCard(i)}
              onTouchEnd={() => setHoveredCard(null)}
            >
              <div style={{ fontSize: '24px', marginBottom: '12px' }} />
              <a
                href={h.tel}
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                <div style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: '22px', fontWeight: '800',
                  color: h.color, marginBottom: '6px',
                  letterSpacing: '-0.5px',
                }}>
                  {h.number}
                </div>
              </a>
              <div style={{ color: '#f1f5f9', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>
                {h.name}
              </div>
              <div style={{ color: '#475569', fontSize: '12px' }}>
                {h.desc}
              </div>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, transparent, ${h.color}, transparent)`,
              }} />
            </div>
          ))}
        </div>

        {/* Steps to getting help */}
        <div style={{
          background: 'rgba(59,130,246,0.05)',
          border: '1px solid rgba(59,130,246,0.15)',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '50px',
          opacity: visible ? 1 : 0,
          transition: 'all 0.8s ease 0.6s',
        }}>
          <h3 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: '22px', fontWeight: '700',
            color: '#f1f5f9', margin: '0 0 30px',
            letterSpacing: '-0.3px',
          }}>
            First Steps Toward Healing
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))', gap: '20px' }}>
            {[
              { step: '01', text: 'Acknowledge you\'re struggling — that alone takes strength.', color: '#3b82f6' },
              { step: '02', text: 'Tell one trusted person how you\'re really feeling.', color: '#14b8a6' },
              { step: '03', text: 'Call a hotline or schedule a counseling session.', color: '#8b5cf6' },
              { step: '04', text: 'Be patient — healing is a process, not a destination.', color: '#f59e0b' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'left' }}>
                <div style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: '36px', fontWeight: '900',
                  color: `${s.color}40`,
                  lineHeight: '1',
                  marginBottom: '10px',
                }}>
                  {s.step}
                </div>
                <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final message */}
        <div style={{
          opacity: visible ? 1 : 0,
          transition: 'all 0.8s ease 0.8s',
        }}>
          <p style={{
            color: '#334155', fontSize: '15px', lineHeight: '1.8', margin: '0 0 8px',
          }}>
            Remember: seeking help is not a sign of weakness.
          </p>
          <p style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(20px, 3vw, 28px)',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #3b82f6, #14b8a6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
            letterSpacing: '-0.5px',
          }}>
            It's the bravest thing you can do.
          </p>
        </div>
      </div>
    </section>
  );
}
