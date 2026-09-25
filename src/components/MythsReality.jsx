import { useEffect, useRef, useState } from 'react';

const cards = [
  {
    myth: '"Real men don\'t cry."',
    reality: 'Emotional expression is a hallmark of psychological health. Suppressing emotions leads to anxiety, depression, and physical health problems. Crying is a natural, healthy release.',
    mythColor: '#ef4444',
    realityColor: '#14b8a6',
  },
  {
    myth: '"Asking for help is weakness."',
    reality: 'Recognizing a problem and seeking help takes extraordinary courage. It is one of the most intelligent and self-aware things a person can do. Strength is knowing your limits.',
    mythColor: '#f97316',
    realityColor: '#3b82f6',
  },
  {
    myth: '"Men should always be strong."',
    reality: "Mental health struggles affect every human being equally regardless of gender. Pretending otherwise doesn't create strength — it creates silence, and silence can be deadly.",
    mythColor: '#8b5cf6',
    realityColor: '#14b8a6',
  },
  {
    myth: '"Boys will be boys."',
    reality: 'This phrase normalizes harmful behavior and teaches boys to suppress emotions. Children deserve emotional guidance, not dismissal. Accountability and empathy must be taught.',
    mythColor: '#ec4899',
    realityColor: '#3b82f6',
  },
  {
    myth: '"Men don\'t need therapy."',
    reality: "Therapy is a proven, effective tool for improving quality of life for anyone. Mental health care is healthcare. Refusing it doesn't demonstrate toughness — it perpetuates suffering.",
    mythColor: '#f59e0b',
    realityColor: '#14b8a6',
  },
  {
    myth: '"Talking about problems makes you weak."',
    reality: 'Verbalizing struggles is one of the most effective ways to process them. Therapy, peer support, and honest conversations are scientifically validated paths to healing.',
    mythColor: '#6366f1',
    realityColor: '#3b82f6',
  },
];

function FlipCard({ card, index, isVisible }) {
  const [flipped, setFlipped] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleFlip = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setFlipped((f) => !f);
      setAnimating(false);
    }, 180);
  };

  const color = flipped ? card.realityColor : card.mythColor;

  return (
    <div
      onClick={handleFlip}
      role="button"
      tabIndex={0}
      aria-label={flipped ? 'Show myth' : 'Reveal reality'}
      onKeyDown={(e) => e.key === 'Enter' && handleFlip()}
      style={{
        minHeight: 'clamp(200px, 40vw, 280px)',
        cursor: 'pointer',
        borderRadius: '16px',
        border: `1px solid ${color}40`,
        background: flipped
          ? `linear-gradient(135deg, #0d1a2a, #0a1628)`
          : `linear-gradient(135deg, #111827, #0d1117)`,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '28px 22px',
        textAlign: 'center',
        userSelect: 'none',
        outline: 'none',
        transition: 'border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease, opacity 0.7s ease, transform 0.7s ease',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${0.1 + index * 0.08}s`,
        boxShadow: flipped ? `0 8px 40px ${color}25` : 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${color}70`;
        e.currentTarget.style.boxShadow = `0 12px 40px ${color}20`;
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${color}40`;
        e.currentTarget.style.boxShadow = flipped ? `0 8px 40px ${color}25` : 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        transition: 'all 0.3s ease',
      }} />

      {/* Content — fades out then in on flip */}
      <div style={{
        opacity: animating ? 0 : 1,
        transform: animating ? 'scale(0.95)' : 'scale(1)',
        transition: 'opacity 0.18s ease, transform 0.18s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}>
        {/* Badge */}
        <div style={{
          background: `${color}18`,
          border: `1px solid ${color}40`,
          borderRadius: '8px',
          padding: '4px 14px',
          marginBottom: '14px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
        }}>
          <span style={{ color, fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            {flipped ? 'Reality' : 'Myth'}
          </span>
        </div>

        {/* Icon (only on myth side) */}
        {/* icon removed */}

        {/* Text */}
        <p style={{
          color: flipped ? '#cbd5e1' : '#f1f5f9',
          fontSize: flipped ? '13px' : 'clamp(14px, 1.8vw, 17px)',
          fontWeight: flipped ? '400' : '700',
          lineHeight: flipped ? '1.75' : '1.4',
          fontStyle: flipped ? 'normal' : 'italic',
          margin: 0,
          maxWidth: '100%',
        }}>
          {flipped ? card.reality : card.myth}
        </p>
      </div>

      {/* Bottom hint */}
      <div style={{
        position: 'absolute',
        bottom: '12px',
        left: 0, right: 0,
        textAlign: 'center',
        color: '#334155',
        fontSize: '11px',
        fontWeight: '500',
        opacity: animating ? 0 : 1,
        transition: 'opacity 0.18s ease',
      }}>
        {flipped ? '↩ Click to go back' : '↩ Click to reveal the truth'}
      </div>
    </div>
  );
}

export default function MythsReality() {
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
      id="myths"
      ref={ref}
      style={{
        padding: 'clamp(60px, 8vw, 100px) clamp(16px, 4vw, 24px)',
        background: '#0a0e1a',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative orb */}
      <div style={{
        position: 'absolute', bottom: '-100px', left: '-100px',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(20,184,166,0.05) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 70px)' }}>
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px',
          }}>
            <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg, #3b82f6, #14b8a6)' }} />
            <span style={{ color: '#14b8a6', fontSize: '13px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Interactive
            </span>
            <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg, #14b8a6, #3b82f6)' }} />
          </div>

          <h2 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(28px, 5vw, 52px)',
            fontWeight: '800',
            margin: '0 0 16px',
            letterSpacing: '-1px',
            color: '#f1f5f9',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease 0.1s',
          }}>
            Myths{' '}
            <span style={{ color: '#475569' }}>vs</span>{' '}
            <span style={{
              background: 'linear-gradient(135deg, #14b8a6, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Reality</span>
          </h2>

          <p style={{
            color: '#64748b', fontSize: 'clamp(14px, 2vw, 16px)', maxWidth: '520px', margin: '0 auto',
            lineHeight: '1.7',
            opacity: visible ? 1 : 0,
            transition: 'all 0.7s ease 0.2s',
          }}>
            Click each card to uncover the truth behind common myths about men and mental health.
          </p>
        </div>

        {/* Cards grid — 1 col on very small, 2 col on mobile, 3 col on desktop */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: 'clamp(12px, 2vw, 20px)',
        }}>
          {cards.map((card, i) => (
            <FlipCard key={i} card={card} index={i} isVisible={visible} />
          ))}
        </div>

        {/* Hint */}
        <div style={{
          marginTop: '24px', textAlign: 'center',
          opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease 0.8s',
        }}>
          <p style={{ color: '#334155', fontSize: '13px', margin: 0 }}>
            Tap or click any card to reveal the reality
          </p>
        </div>
      </div>
    </section>
  );
}
