import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { scrollToSection } from '../utils/sectionNavigation';

const subtitles = [
  'Men deserve to heal.',
  'Strength includes vulnerability.',
  'Your feelings are valid.',
  'You are not alone.',
];

export default function Hero() {
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [rotationPaused, setRotationPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const heroRef = useRef(null);

  const handleScroll = () => scrollToSection('#whatis', reducedMotion);

  useEffect(() => {
    if (rotationPaused || reducedMotion) return undefined;
    let fadeTimeout;
    const interval = setInterval(() => {
      setFade(false);
      fadeTimeout = setTimeout(() => {
        setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
        setFade(true);
      }, 500);
    }, 6000);
    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimeout);
    };
  }, [reducedMotion, rotationPaused]);

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{
        minHeight: '100vh',
        background: 'var(--bg-hero)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(80px, 10vw, 120px) clamp(16px, 4vw, 24px) 60px',
      }}
    >
      {/* Amber radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(196,122,58,0.09) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
      {/* Sage green radial glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(122,158,126,0.06) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '860px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <h1
          style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(42px, 8vw, 88px)',
            fontWeight: '800',
            lineHeight: '1.05',
            margin: '0 0 12px',
            letterSpacing: '-2px',
            animation: 'fadeInUp 0.8s ease 0.1s both',
            color: 'var(--headline-base)',
          }}
        >
          It's Safe to{' '}
          <span
            style={{
              background: 'var(--highlight-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Set It Down
          </span>
        </h1>

        <p
          aria-live="off"
          style={{
            fontSize: 'clamp(18px, 3vw, 26px)',
            margin: '0 0 12px',
            fontWeight: '400',
            letterSpacing: '0.3px',
            minHeight: '40px',
            transition: 'opacity 0.5s ease',
            opacity: fade ? 1 : 0,
            animation: 'fadeInUp 0.8s ease 0.3s both',
            color: 'var(--text-dim)',
            fontStyle: 'italic',
          }}
        >
          {subtitles[subtitleIndex]}
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

        <p
          style={{
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: 'var(--text-muted)',
            maxWidth: '600px',
            margin: '0 auto 50px',
            lineHeight: '1.9',
            animation: 'fadeInUp 0.8s ease 0.4s both',
          }}
        >
          Exploring how{' '}
          <strong style={{ color: 'var(--highlight-emphasis)' }}>toxic masculinity</strong>{' '}
          forces men to carry weight they were never meant to hold — and how we can
          help them put it down. One honest conversation at a time.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'fadeInUp 0.8s ease 0.5s both',
          }}
        >
          <button
            onClick={handleScroll}
            style={{
              background: 'linear-gradient(135deg, #c47a3a, #e8a87c)',
              color: '#1a1008',
              border: 'none',
              cursor: 'pointer',
              padding: '16px 36px',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '700',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              boxShadow: '0 8px 28px var(--scroll-top-shadow)',
              letterSpacing: '0.3px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 16px 36px var(--scroll-top-shadow-hv)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 28px var(--scroll-top-shadow)';
            }}
          >
            Explore Now →
          </button>

          <button
            onClick={() => {
              scrollToSection('#silence', reducedMotion);
            }}
            style={{
              background: 'transparent',
              color: 'var(--text-dim)',
              border: '1px solid var(--border-card)',
              cursor: 'pointer',
              padding: '16px 36px',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'border-color 0.3s ease, color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--amber)';
              e.currentTarget.style.color = 'var(--highlight-amber-lt)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-card)';
              e.currentTarget.style.color = 'var(--text-dim)';
            }}
          >
            Get Help Now
          </button>
        </div>
      </div>
    </section>
  );
}
