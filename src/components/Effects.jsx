import { useEffect, useRef, useState } from 'react';

const effects = [
  {
    title: 'Depression & Anxiety',
    desc: 'Emotional suppression forces feelings inward. Men who cannot express grief, fear, or sadness are significantly more likely to develop clinical depression and anxiety disorders.',
    stat: '6M',
    statLabel: 'U.S. men affected by depression annually (NIMH, 2021)',
    color: '#c47a3a',
    detail: 'Depression in men often goes undiagnosed because it manifests differently — as irritability, workaholism, or risk-taking rather than sadness. The stigma against men showing vulnerability means millions suffer in silence, never seeking the help that could save their lives.',
  },
  {
    title: 'Aggression & Anger',
    desc: 'When vulnerability is unacceptable, emotions re-emerge as anger. Suppressed pain manifests as aggression, impulsivity, and outbursts — hurting both the man and those around him.',
    stat: '76%',
    statLabel: 'of violent crime perpetrated by men (FBI, 2020)',
    color: '#c0504d',
    detail: 'Anger is one of the few emotions socially permitted for men. When grief, fear, and sadness have no outlet, they transform into rage. This is not a character flaw — it is the predictable result of a culture that forbids emotional expression.',
  },
  {
    title: 'Substance Abuse',
    desc: 'Men are twice as likely as women to develop alcohol dependency — often using substances to numb emotional pain they were never taught to process.',
    stat: '2×',
    statLabel: 'more likely to develop alcohol dependence (NIAAA, 2021)',
    color: '#a0522d',
    detail: 'Alcohol and drugs become self-medication when men have no other coping tools. The same masculine norms that prevent help-seeking also glamorize heavy drinking as a marker of toughness, creating a dangerous cycle that destroys health, families, and careers.',
  },
  {
    title: 'Isolation & Loneliness',
    desc: 'The "don\'t show weakness" mentality prevents men from forming deep emotional bonds. Social isolation is a primary predictor of mental health deterioration and early death.',
    stat: '40%',
    statLabel: 'of men report chronic loneliness (Cigna, 2020)',
    color: '#8b6b4e',
    detail: 'Men are taught that needing others is weakness. As a result, many adult men have no close friendships in which they can be honest. Loneliness is now recognized by the WHO as a public health epidemic — and men are disproportionately affected.',
  },
  {
    title: 'Avoiding Medical Help',
    desc: 'Men are less likely to see doctors or seek any form of care. This directly contributes to men dying an average of 5 years earlier than women globally.',
    stat: '5 yrs',
    statLabel: 'shorter life expectancy for men (WHO, 2022)',
    color: '#e8a87c',
    detail: 'The belief that "real men push through pain" means men delay seeking medical attention until conditions become critical. Cancers, heart disease, and mental illness are all caught later in men — not because of biology, but because of culture.',
  },
  {
    title: 'Relationship Damage',
    desc: 'Emotional unavailability creates deep relational distance. Inability to communicate needs or resolve conflict healthily leads to higher rates of divorce and estrangement.',
    stat: '69%',
    statLabel: 'of divorces initiated by women citing emotional issues (APA, 2019)',
    color: '#c47a3a',
    detail: 'When men cannot identify or express their emotions, intimacy becomes impossible. Partners feel unseen; children grow up with emotionally absent fathers. The cost is generational — boys who watch their fathers suppress emotion learn to do the same.',
  },
];

function EffectCard({ effect, i, visible }) {
  const [show, setShow] = useState(false);
  // Use a small delay on hide so the mouse can travel from card → modal
  const hideTimer = useRef(null);

  const handleEnter = () => {
    clearTimeout(hideTimer.current);
    setShow(true);
  };

  const handleLeave = () => {
    // 120 ms grace period so the user can move the cursor onto the popup
    hideTimer.current = setTimeout(() => setShow(false), 120);
  };

  useEffect(() => () => clearTimeout(hideTimer.current), []);

  return (
    <div style={{ position: 'relative' }}>
      {/* ── Card ── */}
      <div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        style={{
          background: show ? 'rgba(28,22,18,0.95)' : 'rgba(24,19,15,0.7)',
          border: `1px solid ${show ? effect.color + '55' : effect.color + '20'}`,
          borderRadius: '18px',
          padding: '28px',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'default',
          opacity: visible ? 1 : 0,
          transform: visible
            ? show ? 'translateY(-4px)' : 'translateY(0)'
            : 'translateY(36px)',
          boxShadow: show ? `0 20px 48px ${effect.color}18` : 'none',
          transition: visible
            ? 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease, opacity 0.6s ease'
            : `opacity 0.6s ease ${0.15 + i * 0.08}s, transform 0.6s ease ${0.15 + i * 0.08}s`,
        }}
      >
        {/* Left accent bar */}
        <div style={{
          position: 'absolute', left: 0, top: '20%', bottom: '20%', width: '3px',
          background: `linear-gradient(180deg, transparent, ${effect.color}, transparent)`,
          opacity: show ? 1 : 0.4,
          transition: 'opacity 0.2s ease',
        }} />

        <h3 style={{
          color: '#c4b5a8', fontSize: '17px', fontWeight: '700',
          margin: '0 0 10px', letterSpacing: '-0.2px',
        }}>
          {effect.title}
        </h3>

        <p style={{ color: '#5a4f48', fontSize: '13px', lineHeight: '1.8', margin: '0 0 18px' }}>
          {effect.desc}
        </p>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: `${effect.color}0e`, border: `1px solid ${effect.color}25`,
          borderRadius: '50px', padding: '5px 14px',
        }}>
          <span style={{ color: effect.color, fontSize: '15px', fontWeight: '800', fontFamily: 'Sora, sans-serif' }}>
            {effect.stat}
          </span>
          <span style={{ color: '#4a3f38', fontSize: '11px', fontWeight: '500', lineHeight: '1.4' }}>
            {effect.statLabel}
          </span>
        </div>
      </div>

      {/* ── Hover popup — fixed center of screen ── */}
      <div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: show
            ? 'translate(-50%, -50%) scale(1)'
            : 'translate(-50%, -48%) scale(0.97)',
          width: 'min(480px, 90vw)',
          zIndex: 9000,
          pointerEvents: show ? 'auto' : 'none',
          opacity: show ? 1 : 0,
          transition: 'opacity 0.22s ease, transform 0.22s ease',
        }}
      >
        <div style={{
          background: 'linear-gradient(160deg, #1c1610 0%, #160f0b 100%)',
          border: `1px solid ${effect.color}40`,
          borderRadius: '20px',
          padding: '32px',
          boxShadow: `0 32px 80px rgba(0,0,0,0.85), 0 0 0 1px ${effect.color}15`,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Top accent */}
          <div style={{
            position: 'absolute', top: 0, left: '15%', right: '15%', height: '2px',
            background: `linear-gradient(90deg, transparent, ${effect.color}, transparent)`,
          }} />

          {/* Stat badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: `${effect.color}12`, border: `1px solid ${effect.color}30`,
            borderRadius: '50px', padding: '4px 14px', marginBottom: '16px',
          }}>
            <span style={{ color: effect.color, fontSize: '16px', fontWeight: '900', fontFamily: 'Sora, sans-serif' }}>
              {effect.stat}
            </span>
            <span style={{ color: '#5a4f48', fontSize: '11px' }}>{effect.statLabel}</span>
          </div>

          {/* Title */}
          <h4 style={{
            fontFamily: 'Sora, sans-serif', fontSize: '20px', fontWeight: '800',
            color: '#e8e0d5', margin: '0 0 12px', letterSpacing: '-0.3px',
          }}>
            {effect.title}
          </h4>

          {/* Divider */}
          <div style={{
            height: '1px',
            background: `linear-gradient(90deg, ${effect.color}28, transparent)`,
            marginBottom: '14px',
          }} />

          {/* Short desc */}
          <p style={{ color: '#9e8a78', fontSize: '14px', lineHeight: '1.8', margin: '0 0 14px' }}>
            {effect.desc}
          </p>

          {/* Detail */}
          <p style={{
            color: '#6b5f55', fontSize: '13px', lineHeight: '1.85', margin: 0,
            padding: '16px 18px',
            background: `${effect.color}06`,
            border: `1px solid ${effect.color}14`,
            borderRadius: '12px',
          }}>
            {effect.detail}
          </p>
        </div>
      </div>

      {/* Backdrop dimmer */}
      <div style={{
        position: 'fixed', inset: 0,
        background: 'rgba(10,8,6,0.55)',
        backdropFilter: 'blur(3px)',
        zIndex: 8999,
        pointerEvents: 'none',
        opacity: show ? 1 : 0,
        transition: 'opacity 0.22s ease',
      }} />
    </div>
  );
}

export default function Effects() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="effects"
      ref={ref}
      style={{
        padding: 'clamp(60px, 8vw, 100px) clamp(16px, 4vw, 24px)',
        background: 'linear-gradient(180deg, #0f0d0b 0%, #0d0b09 100%)',
        position: 'relative',
        overflow: 'visible', /* allow popups to escape section bounds */
      }}
    >
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(196,122,58,0.2), transparent)',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 70px)' }}>
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px',
          }}>
            <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg, #c0504d, #a0522d)' }} />
            <span style={{ color: '#c0504d', fontSize: '13px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>
              The Damage Done
            </span>
            <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg, #a0522d, #c0504d)' }} />
          </div>

          <h2 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(28px, 5vw, 52px)',
            fontWeight: '800',
            margin: '0 0 16px',
            letterSpacing: '-1px',
            color: '#e8e0d5',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.1s',
          }}>
            How Toxic Masculinity{' '}
            <span style={{
              background: 'linear-gradient(135deg, #c0504d, #a0522d)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Harms Men</span>
          </h2>

          <p style={{
            color: '#5a4f48', fontSize: 'clamp(14px, 2vw, 16px)', maxWidth: '560px',
            margin: '0 auto', lineHeight: '1.7',
            opacity: visible ? 1 : 0,
            transition: 'all 0.6s ease 0.2s',
          }}>
            The culture of silence doesn't protect men — it systematically destroys their health, relationships, and lives.
          </p>
        </div>

        {/* Grid — overflow visible so popups aren't clipped */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '16px',
          overflow: 'visible',
        }}>
          {effects.map((effect, i) => (
            <EffectCard key={i} effect={effect} i={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
