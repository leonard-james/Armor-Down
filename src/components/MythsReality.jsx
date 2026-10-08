import { useEffect, useRef, useState } from 'react';

// Myth colors: muted warm tones for the "false" side
// Reality colors: sage green / amber for the "truth" side
const cards = [
  {
    myth: '"Real men don\'t cry."',
    reality: 'Emotional expression is a hallmark of psychological health. Suppressing emotions leads to anxiety, depression, and physical health problems. Crying is a natural, healthy release.',
    mythColor: '#c0504d',
    realityColor: '#c47a3a',
  },
  {
    myth: '"Asking for help is weakness."',
    reality: 'Recognizing a problem and seeking help takes extraordinary courage. It is one of the most intelligent and self-aware things a person can do. Strength is knowing your limits.',
    mythColor: '#a0522d',
    realityColor: '#c47a3a',
  },
  {
    myth: '"Men should always be strong."',
    reality: "Mental health struggles affect every human being equally regardless of gender. Pretending otherwise doesn't create strength — it creates silence, and silence can be deadly.",
    mythColor: '#8b6b4e',
    realityColor: '#e8a87c',
  },
  {
    myth: '"Boys will be boys."',
    reality: 'This phrase normalizes harmful behavior and teaches boys to suppress emotions. Children deserve emotional guidance, not dismissal. Accountability and empathy must be taught.',
    mythColor: '#c0504d',
    realityColor: '#c47a3a',
  },
  {
    myth: '"Men don\'t need therapy."',
    reality: "Therapy is a proven, effective tool for improving quality of life for anyone. Mental health care is healthcare. Refusing it doesn't demonstrate toughness — it perpetuates suffering.",
    mythColor: '#a0522d',
    realityColor: '#c47a3a',
  },
  {
    myth: '"Talking about problems makes you weak."',
    reality: 'Verbalizing struggles is one of the most effective ways to process them. Therapy, peer support, and honest conversations are scientifically validated paths to healing.',
    mythColor: '#8b6b4e',
    realityColor: '#c47a3a',
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
        borderRadius: '14px',
        border: `1px solid ${color}40`,
        background: flipped
          ? 'rgba(20,16,12,0.95)'
          : 'rgba(24,19,15,0.9)',
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
        boxShadow: flipped ? `0 8px 32px ${color}20` : 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${color}65`;
        e.currentTarget.style.boxShadow = `0 12px 36px ${color}18`;
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${color}40`;
        e.currentTarget.style.boxShadow = flipped ? `0 8px 32px ${color}20` : 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
      }} />

      {/* Content */}
      <div style={{
        opacity: animating ? 0 : 1,
        transform: animating ? 'scale(0.95)' : 'scale(1)',
        transition: 'opacity 0.18s ease, transform 0.18s ease',
        display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%',
      }}>
        {/* Badge */}
        <div style={{
          background: `${color}15`,
          border: `1px solid ${color}35`,
          borderRadius: '8px',
          padding: '4px 14px',
          marginBottom: '14px',
          display: 'inline-flex', alignItems: 'center',
        }}>
          <span style={{ color, fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            {flipped ? 'Reality' : 'Myth'}
          </span>
        </div>

        {/* Text */}
        <p style={{
          color: flipped ? 'var(--text-secondary)' : 'var(--text-primary)',
          fontSize: flipped ? '13px' : 'clamp(14px, 1.8vw, 17px)',
          fontWeight: flipped ? '400' : '700',
          lineHeight: flipped ? '1.75' : '1.4',
          fontStyle: flipped ? 'normal' : 'italic',
          margin: 0,
        }}>
          {flipped ? card.reality : card.myth}
        </p>
      </div>

      {/* Bottom hint */}
      <div style={{
        position: 'absolute', bottom: '12px', left: 0, right: 0,
        textAlign: 'center', color: 'var(--text-faint)', fontSize: '11px', fontWeight: '500',
        opacity: animating ? 0 : 1, transition: 'opacity 0.18s ease',
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
        background: 'var(--bg-page)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle warm orb */}
      <div style={{
        position: 'absolute', bottom: '-80px', left: '-80px',
        width: '450px', height: '450px',
        background: 'radial-gradient(circle, rgba(122,158,126,0.04) 0%, transparent 70%)',
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
            <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg, #c47a3a, #e8a87c)' }} />
            <span style={{ color: '#c47a3a', fontSize: '13px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Interactive
            </span>
            <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg, #e8a87c, #c47a3a)' }} />
          </div>

          <h2 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(28px, 5vw, 52px)',
            fontWeight: '800',
            margin: '0 0 16px',
            letterSpacing: '-1px',
            color: 'var(--text-primary)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease 0.1s',
          }}>
            Myths{' '}
            <span style={{ color: 'var(--text-dimmer)' }}>vs</span>{' '}
            <span style={{
              background: 'linear-gradient(135deg, #c47a3a, #e8a87c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Reality</span>
          </h2>

          <p style={{
            color: 'var(--text-dim)', fontSize: 'clamp(14px, 2vw, 16px)', maxWidth: '520px', margin: '0 auto',
            lineHeight: '1.7',
            opacity: visible ? 1 : 0,
            transition: 'all 0.7s ease 0.2s',
          }}>
            Click each card to uncover the truth behind common myths about men and mental health.
          </p>
        </div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: 'clamp(12px, 2vw, 20px)',
        }}>
          {cards.map((card, i) => (
            <FlipCard key={i} card={card} index={i} isVisible={visible} />
          ))}
        </div>

        <div style={{
          marginTop: '24px', textAlign: 'center',
          opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease 0.8s',
        }}>
          <p style={{ color: 'var(--text-faint)', fontSize: '13px', margin: 0 }}>
            Tap or click any card to reveal the reality
          </p>
        </div>
      </div>
    </section>
  );
}
