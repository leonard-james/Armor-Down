import { useEffect, useRef, useState } from 'react';

const subtitles = [
  'Men deserve to heal.',
  'Strength includes vulnerability.',
  'Your feelings are valid.',
  'You are not alone.',
];

export default function Hero() {
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const heroRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
        setFade(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = () => {
    const target = document.querySelector('#whatis');
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #1a1008 0%, #120e08 40%, #0f0d0b 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(80px, 10vw, 120px) clamp(16px, 4vw, 24px) 60px',
      }}
    >
      {/* Subtle warm glow — like a lamp in the dark */}
      <div style={{
        position: 'absolute', top: '15%', left: '50%',
        transform: 'translateX(-50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(196,122,58,0.09) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '5%',
        width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(122,158,126,0.06) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ maxWidth: '860px', textAlign: 'center', position: 'relative', zIndex: 1 }}>

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(196,122,58,0.1)',
          border: '1px solid rgba(196,122,58,0.3)',
          borderRadius: '50px',
          padding: '8px 20px', marginBottom: '36px',
          animation: 'fadeInUp 0.6s ease forwards',
        }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#c47a3a', animation: 'pulse-slow 2s infinite' }} />
          <span style={{ color: '#e8a87c', fontSize: '13px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Gender &amp; Society — Midterm Project
          </span>
        </div>

        {/* Main headline */}
        <h1 style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: 'clamp(42px, 8vw, 88px)',
          fontWeight: '800',
          lineHeight: '1.05',
          margin: '0 0 12px',
          letterSpacing: '-2px',
          animation: 'fadeInUp 0.8s ease 0.1s both',
          color: '#e8e0d5',
        }}>
          It's Safe to{' '}
          <span style={{
            background: 'linear-gradient(135deg, #c47a3a, #e8a87c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Set It Down
          </span>
        </h1>

        {/* Animated subtitle */}
        <p style={{
          fontSize: 'clamp(18px, 3vw, 26px)',
          margin: '0 0 12px',
          fontWeight: '400',
          letterSpacing: '0.3px',
          minHeight: '40px',
          transition: 'opacity 0.5s ease',
          opacity: fade ? 1 : 0,
          animation: 'fadeInUp 0.8s ease 0.3s both',
          color: '#9e8a78',
          fontStyle: 'italic',
        }}>
          {subtitles[subtitleIndex]}
        </p>

        <p style={{
          fontSize: 'clamp(15px, 2vw, 18px)',
          color: '#6b5f55',
          maxWidth: '600px',
          margin: '0 auto 50px',
          lineHeight: '1.9',
          animation: 'fadeInUp 0.8s ease 0.4s both',
        }}>
          Exploring how <strong style={{ color: '#9e8a78' }}>toxic masculinity</strong> forces men to
          carry weight they were never meant to hold — and how we can help them put it down.
          One honest conversation at a time.
        </p>

        {/* CTAs */}
        <div style={{
          display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap',
          animation: 'fadeInUp 0.8s ease 0.5s both',
        }}>
          <button
            onClick={handleScroll}
            style={{
              background: 'linear-gradient(135deg, #c47a3a, #e8a87c)',
              color: '#1a1008', border: 'none', cursor: 'pointer',
              padding: '16px 36px', borderRadius: '10px',
              fontSize: '16px', fontWeight: '700',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 28px rgba(196,122,58,0.3)',
              letterSpacing: '0.3px',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 36px rgba(196,122,58,0.45)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(196,122,58,0.3)'; }}
          >
            Explore Now →
          </button>
          <button
            onClick={() => {
              const t = document.querySelector('#silence');
              if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
            }}
            style={{
              background: 'transparent',
              color: '#9e8a78',
              border: '1px solid rgba(158,138,120,0.35)',
              cursor: 'pointer',
              padding: '16px 36px', borderRadius: '10px',
              fontSize: '16px', fontWeight: '600',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#c47a3a'; e.currentTarget.style.color = '#e8a87c'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(158,138,120,0.35)'; e.currentTarget.style.color = '#9e8a78'; }}
          >
            Get Help Now
          </button>
        </div>

      </div>
    </section>
  );
}
