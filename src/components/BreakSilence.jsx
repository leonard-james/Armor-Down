import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { crisisHotline, emergencyNumber } from '../data/crisisResources';

const affirmations = [
  'You are worthy of care.',
  'Your pain is real and valid.',
  'Asking for help is brave.',
  'You don\'t have to face this alone.',
  'Recovery is possible.',
];

const steps = [
  { step: '01', text: 'Acknowledge you\'re struggling — that alone takes strength.', color: '#c47a3a', numberColor: 'var(--highlight-step-amber)' },
  { step: '02', text: 'Tell one trusted person how you\'re really feeling.', color: '#e8a87c', numberColor: 'var(--highlight-step-amber-lt)' },
  { step: '03', text: 'Call a hotline or schedule a counseling session.', color: '#8b6b4e', numberColor: 'var(--highlight-step-muted)' },
  { step: '04', text: 'Be patient — healing is a process, not a destination.', color: '#e8a87c', numberColor: 'var(--highlight-step-amber-lt)' },
];

export default function BreakSilence() {
  const [visible, setVisible] = useState(false);
  const [affIdx, setAffIdx] = useState(0);
  const [affFade, setAffFade] = useState(true);
  const [rotationPaused, setRotationPaused] = useState(false);
  const reducedMotion = useReducedMotion();
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
    if (rotationPaused || reducedMotion) return undefined;
    let fadeTimeout;
    const interval = setInterval(() => {
      setAffFade(false);
      fadeTimeout = setTimeout(() => {
        setAffIdx((prev) => (prev + 1) % affirmations.length);
        setAffFade(true);
      }, 400);
    }, 7000);
    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimeout);
    };
  }, [reducedMotion, rotationPaused]);

  return (
    <section
      id="silence"
      ref={ref}
      style={{
        padding: 'clamp(60px, 10vw, 120px) clamp(16px, 4vw, 24px)',
        background: 'linear-gradient(160deg, var(--bg-page-alt) 0%, var(--bg-page) 50%, var(--bg-page-alt) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Warm ambient glow */}
      <div style={{
        position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '350px',
        background: 'radial-gradient(ellipse, rgba(196,122,58,0.07) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '8%', left: '15%',
        width: '350px', height: '350px',
        background: 'radial-gradient(circle, rgba(122,158,126,0.05) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* Top border */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 0, height: '2px',
        background: 'linear-gradient(90deg, transparent, #c47a3a, #e8a87c, transparent)',
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'var(--badge-bg)', border: '1px solid var(--badge-border)',
          borderRadius: '50px', padding: '8px 20px', marginBottom: '36px',
          opacity: visible ? 1 : 0, transition: 'all 0.7s ease',
        }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#c0504d', animation: 'pulse-slow 1.5s infinite' }} />
          <span style={{ color: 'var(--highlight-amber-lt)', fontSize: '13px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>
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
          color: 'var(--text-primary)',
        }}>
          You Don't Have to{' '}
          <span style={{
            background: 'var(--highlight-gradient)',
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
          <p aria-live="off" style={{
            fontSize: 'clamp(18px, 3vw, 24px)',
            color: 'var(--text-muted)',
            fontStyle: 'italic',
            fontWeight: '400',
            margin: 0,
            transition: 'opacity 0.4s ease',
            opacity: affFade ? 1 : 0,
          }}>
            "{affirmations[affIdx]}"
          </p>
          {!reducedMotion && (
            <button
              type="button"
              className="motion-toggle"
              onClick={() => setRotationPaused((paused) => !paused)}
            >
              {rotationPaused ? 'Resume rotating message' : 'Pause rotating message'}
            </button>
          )}
        </div>

        {/* Main paragraph */}
        <p style={{
          color: 'var(--text-dim)',
          fontSize: '17px',
          lineHeight: '1.85',
          maxWidth: '680px',
          margin: '0 auto 60px',
          opacity: visible ? 1 : 0,
          transition: 'all 0.7s ease 0.3s',
        }}>
          The most important thing you can do right now is <strong style={{ color: 'var(--highlight-emphasis-strong)' }}>reach out</strong>.
          Whether it's talking to a friend, a family member, a counselor, or a crisis hotline —
          taking that first step is an act of extraordinary courage.
          <br /><br />
          If you or someone you know is struggling, consider contacting the National Center for Mental Health.
          Current operating hours and mobile alternatives could not be independently confirmed during this audit.
        </p>

        {/* Hotline card */}
        <div
          className="hotline-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '14px',
            marginBottom: '60px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease 0.4s',
          }}
        >
          {[crisisHotline].map((h, i) => (
            <a
              key={i}
              href={h.tel}
              aria-label={`${h.name}, ${h.number}, ${h.region}. Call`}
              style={{
                background: hoveredCard === i ? 'var(--bg-card-hover)' : 'var(--bg-panel)',
                border: `1px solid ${hoveredCard === i ? h.color + '50' : h.color + '20'}`,
                borderRadius: '14px',
                padding: '22px 18px',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transform: hoveredCard === i ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hoveredCard === i ? `0 14px 36px ${h.color}14` : 'none',
                textDecoration: 'none',
                display: 'block',
              }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              onTouchStart={() => setHoveredCard(i)}
              onTouchEnd={() => setHoveredCard(null)}
            >
              <div style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '22px', fontWeight: '800',
                color: 'var(--highlight-amber-lt)',
                marginBottom: '6px',
                letterSpacing: '-0.5px',
              }}>
                {h.number}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>
                {h.name} · {h.region}
              </div>
              <div style={{ color: 'var(--text-dimmer)', fontSize: '12px' }}>
                {h.desc}
              </div>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, transparent, ${h.color}, transparent)`,
              }} />
            </a>
          ))}
        </div>

        {/* Steps */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '18px',
          padding: '36px 40px',
          marginBottom: '50px',
          opacity: visible ? 1 : 0,
          transition: 'all 0.8s ease 0.6s',
          textAlign: 'left',
        }}>
          <h3 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: '20px', fontWeight: '700',
            color: 'var(--text-secondary)', margin: '0 0 28px',
            letterSpacing: '-0.3px',
          }}>
            First Steps Toward Healing
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))', gap: '20px' }}>
            {steps.map((s, i) => (
              <div key={i}>
                <div style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: '36px', fontWeight: '900',
                  color: s.numberColor,
                  lineHeight: '1', marginBottom: '10px',
                }}>
                  {s.step}
                </div>
                <p style={{ color: 'var(--text-dim)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final message */}
        <div style={{ opacity: visible ? 1 : 0, transition: 'all 0.8s ease 0.8s' }}>
          <p style={{ color: 'var(--text-faint)', fontSize: '15px', lineHeight: '1.8', margin: '0 0 8px' }}>
            The 1553 number is listed in the NCMH reference below. If you cannot connect and there is immediate danger, call{' '}
            <a href={emergencyNumber.tel} style={{ color: 'var(--highlight-red)' }}>{emergencyNumber.number}</a> or go to the nearest emergency room. See{' '}
            <a href={`#${crisisHotline.reference}`} style={{ color: 'var(--amber-text)' }}>NCMH source details</a>.
          </p>
          <p style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(20px, 3vw, 28px)',
            fontWeight: '800',
            background: 'var(--highlight-gradient)',
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
