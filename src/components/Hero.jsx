import { useEffect, useRef, useState } from 'react';

const subtitles = [
  'Men deserve to heal.',
  'Strength includes vulnerability.',
  'Your feelings are valid.',
  'You are not alone.',
];

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: Math.random() * 6 + 2,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 4,
  duration: Math.random() * 4 + 4,
  opacity: Math.random() * 0.4 + 0.1,
  color: i % 2 === 0 ? '#3b82f6' : '#14b8a6',
}));

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
        background: 'linear-gradient(135deg, #0a0e1a 0%, #0f172a 40%, #0a1628 70%, #0a0e1a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(80px, 10vw, 120px) clamp(16px, 4vw, 24px) 60px',
      }}
    >
      {/* Ambient glow orbs */}
      <div style={{
        position: 'absolute', top: '20%', left: '10%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
        animation: 'float 8s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', right: '10%',
        width: '350px', height: '350px',
        background: 'radial-gradient(circle, rgba(20,184,166,0.1) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
        animation: 'float 10s ease-in-out infinite reverse',
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
        />
      ))}

      {/* Grid pattern overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ maxWidth: '900px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(59,130,246,0.12)',
          border: '1px solid rgba(59,130,246,0.3)',
          borderRadius: '50px',
          padding: '8px 20px', marginBottom: '36px',
          animation: 'fadeInUp 0.6s ease forwards',
          backdropFilter: 'blur(10px)',
        }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6', animation: 'pulse-slow 2s infinite' }} />
          <span style={{ color: '#93c5fd', fontSize: '13px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Gender &amp; Society — Midterm Project
          </span>
        </div>

        {/* Main headline */}
        <h1 style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: 'clamp(42px, 8vw, 90px)',
          fontWeight: '800',
          lineHeight: '1.05',
          margin: '0 0 12px',
          letterSpacing: '-2px',
          animation: 'fadeInUp 0.8s ease 0.1s both',
          color: '#f1f5f9',
        }}>
          It's Safe to{' '}
          <span style={{
            background: 'linear-gradient(135deg, #3b82f6, #14b8a6)',
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
          color: '#64748b',
          margin: '0 0 12px',
          fontWeight: '400',
          letterSpacing: '0.5px',
          minHeight: '40px',
          transition: 'opacity 0.5s ease',
          opacity: fade ? 1 : 0,
          animation: 'fadeInUp 0.8s ease 0.3s both',
        }}>
          <span style={{ color: '#94a3b8' }}>{subtitles[subtitleIndex]}</span>
        </p>

        <p style={{
          fontSize: 'clamp(15px, 2vw, 18px)',
          color: '#475569',
          maxWidth: '600px',
          margin: '0 auto 50px',
          lineHeight: '1.8',
          animation: 'fadeInUp 0.8s ease 0.4s both',
        }}>
          Exploring how <strong style={{ color: '#94a3b8' }}>toxic masculinity</strong> forces men to
          carry weight they were never meant to hold — and how we can help them put it down. One honest conversation at a time.
        </p>

        {/* CTAs */}
        <div style={{
          display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap',
          animation: 'fadeInUp 0.8s ease 0.5s both',
        }}>
          <button
            onClick={handleScroll}
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #14b8a6)',
              color: 'white', border: 'none', cursor: 'pointer',
              padding: '16px 36px', borderRadius: '12px',
              fontSize: '16px', fontWeight: '700',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 32px rgba(59,130,246,0.35)',
              letterSpacing: '0.3px',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(59,130,246,0.5)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(59,130,246,0.35)'; }}
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
              color: '#94a3b8', border: '1px solid rgba(148,163,184,0.3)', cursor: 'pointer',
              padding: '16px 36px', borderRadius: '12px',
              fontSize: '16px', fontWeight: '600',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.color = '#3b82f6'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(148,163,184,0.3)'; e.currentTarget.style.color = '#94a3b8'; }}
          >
            Get Help Now
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          onClick={handleScroll}
          style={{
            marginTop: '70px', display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '8px', cursor: 'pointer',
            animation: 'fadeInUp 0.8s ease 0.8s both',
          }}
        >
          <span style={{ color: '#475569', fontSize: '12px', fontWeight: '500', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Scroll Down
          </span>
          <div style={{
            width: '28px', height: '44px',
            border: '2px solid rgba(148,163,184,0.25)',
            borderRadius: '14px',
            display: 'flex', justifyContent: 'center', paddingTop: '8px',
          }}>
            <div style={{
              width: '4px', height: '10px',
              background: '#3b82f6', borderRadius: '2px',
              animation: 'float 1.5s ease-in-out infinite',
            }} />
          </div>
        </div>
      </div>
    </section>
  );
}
