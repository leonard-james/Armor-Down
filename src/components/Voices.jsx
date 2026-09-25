import { useEffect, useRef, useState } from 'react';
import windowImg from '../assets/window.jpg';
import benchImg from '../assets/bench.avif';
import aloneImg from '../assets/alone.jpg';

const stories = [
  {
    img: windowImg,
    alt: 'Man looking out a window alone',
    quote: 'I spent years telling myself I was fine. Getting out of bed felt impossible, but admitting that to anyone felt worse.',
    tag: 'Depression & Silence',
    color: '#3b82f6',
  },
  {
    img: benchImg,
    alt: 'Person sitting alone on a bench',
    quote: 'I sat on that bench for an hour before I finally called the hotline. That one call changed everything.',
    tag: 'Reaching Out',
    color: '#14b8a6',
  },
  {
    img: aloneImg,
    alt: 'Man alone in a dark room',
    quote: 'Nobody ever told me it was okay to struggle. I thought being a man meant carrying it all without saying a word.',
    tag: 'Toxic Expectations',
    color: '#8b5cf6',
  },
];

function StoryCard({ story, visible, index }) {
  return (
    <div
      style={{
        background: '#0d1117',
        border: `1px solid ${story.color}20`,
        borderRadius: '20px',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${0.15 + index * 0.12}s, transform 0.7s ease ${0.15 + index * 0.12}s, border-color 0.2s ease, box-shadow 0.2s ease`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${story.color}50`;
        e.currentTarget.style.boxShadow = `0 20px 50px ${story.color}12`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${story.color}20`;
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Photo */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '220px', flexShrink: 0 }}>
        <img
          src={story.img}
          alt={story.alt}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            display: 'block',
            filter: 'brightness(0.72) saturate(0.8)',
            transition: 'transform 0.5s ease, filter 0.5s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.filter = 'brightness(0.85) saturate(0.95)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.filter = 'brightness(0.72) saturate(0.8)';
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, #0d1117 0%, transparent 55%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '14px', left: '14px',
          background: `${story.color}22`,
          border: `1px solid ${story.color}55`,
          backdropFilter: 'blur(8px)',
          borderRadius: '8px',
          padding: '3px 10px',
        }}>
          <span style={{ color: story.color, fontSize: '10px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>
            {story.tag}
          </span>
        </div>
      </div>

      {/* Caption */}
      <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{
          fontFamily: 'Georgia, serif',
          fontSize: '40px', lineHeight: '0.8',
          color: story.color, opacity: 0.35,
          marginBottom: '8px', userSelect: 'none',
        }}>"</div>
        <p style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          color: '#cbd5e1',
          fontSize: '14px',
          lineHeight: '1.75',
          margin: '0 0 18px',
          fontStyle: 'italic',
          flex: 1,
        }}>
          {story.quote}
        </p>
        <div style={{
          height: '1px',
          background: `linear-gradient(90deg, ${story.color}30, transparent)`,
          marginBottom: '14px',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '30px', height: '30px', borderRadius: '50%',
            background: `${story.color}15`, border: `1px solid ${story.color}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '13px', flexShrink: 0,
          }}>👤</div>
          <div>
            <div style={{ color: '#64748b', fontSize: '12px', fontWeight: '600' }}>Anonymous</div>
            <div style={{ color: '#334155', fontSize: '11px' }}>Composite reflection</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Voices() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const goTo = (idx) => {
    const clamped = Math.max(0, Math.min(idx, stories.length - 1));
    setCurrent(clamped);
  };

  return (
    <section
      id="voices"
      ref={sectionRef}
      style={{
        padding: 'clamp(60px, 8vw, 100px) 0',
        background: '#060810',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)',
      }} />

      {/* Header */}
      <div style={{
        textAlign: 'center',
        padding: '0 clamp(16px, 4vw, 24px)',
        marginBottom: 'clamp(36px, 5vw, 56px)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 0.7s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '14px' }}>
          <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg, #3b82f6, #14b8a6)' }} />
          <span style={{ color: '#3b82f6', fontSize: '13px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Shared Experiences
          </span>
          <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg, #14b8a6, #3b82f6)' }} />
        </div>
        <h2 style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: 'clamp(28px, 5vw, 48px)',
          fontWeight: '800', margin: '0 0 12px',
          letterSpacing: '-1px', color: '#f1f5f9',
        }}>
          When Silence{' '}
          <span style={{
            background: 'linear-gradient(135deg, #3b82f6, #14b8a6)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>Finally Breaks</span>
        </h2>
        <p style={{ color: '#475569', fontSize: 'clamp(14px, 2vw, 16px)', maxWidth: '520px', margin: '0 auto', lineHeight: '1.7' }}>
          These reflections capture experiences commonly described by men in mental health literature.
        </p>
      </div>

      {/* ── DESKTOP: all 3 cards side by side ── */}
      <div className="voices-desktop" style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: '0 clamp(16px, 4vw, 32px)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '24px',
        alignItems: 'stretch',
      }}>
        {stories.map((story, i) => (
          <StoryCard key={i} story={story} visible={visible} index={i} />
        ))}
      </div>

      {/* ── MOBILE: carousel (1 card + arrows + dots) ── */}
      <div className="voices-mobile" style={{ display: 'none', flexDirection: 'column' }}>
        {/* Arrow row */}
        <div style={{ position: 'relative', padding: '0 56px' }}>
          {/* Prev */}
          <button
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
            aria-label="Previous"
            style={{
              position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)',
              zIndex: 10, width: '40px', height: '40px', borderRadius: '50%',
              background: current === 0 ? 'rgba(17,24,39,0.4)' : 'rgba(59,130,246,0.2)',
              border: `1px solid ${current === 0 ? 'rgba(255,255,255,0.06)' : 'rgba(59,130,246,0.5)'}`,
              color: current === 0 ? '#334155' : '#93c5fd',
              fontSize: '20px', cursor: current === 0 ? 'default' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
          >‹</button>

          {/* Single card */}
          <div ref={trackRef} style={{ minHeight: '420px' }}>
            <StoryCard story={stories[current]} visible={visible} index={0} />
          </div>

          {/* Next */}
          <button
            onClick={() => goTo(current + 1)}
            disabled={current === stories.length - 1}
            aria-label="Next"
            style={{
              position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
              zIndex: 10, width: '40px', height: '40px', borderRadius: '50%',
              background: current === stories.length - 1 ? 'rgba(17,24,39,0.4)' : 'rgba(59,130,246,0.2)',
              border: `1px solid ${current === stories.length - 1 ? 'rgba(255,255,255,0.06)' : 'rgba(59,130,246,0.5)'}`,
              color: current === stories.length - 1 ? '#334155' : '#93c5fd',
              fontSize: '20px', cursor: current === stories.length - 1 ? 'default' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
          >›</button>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
          {stories.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} style={{
              width: i === current ? '24px' : '8px', height: '8px',
              borderRadius: '4px', padding: 0, border: 'none', cursor: 'pointer',
              background: i === current ? '#3b82f6' : 'rgba(148,163,184,0.25)',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{
        maxWidth: '860px', margin: 'clamp(28px, 4vw, 40px) auto 0',
        padding: '0 clamp(16px, 4vw, 24px)',
        opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease 0.8s',
      }}>
        <div style={{
          background: 'rgba(59,130,246,0.04)', border: '1px solid rgba(59,130,246,0.1)',
          borderRadius: '12px', padding: '14px 18px',
          display: 'flex', gap: '10px', alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>📋</span>
          <p style={{ color: '#334155', fontSize: '12px', lineHeight: '1.7', margin: 0, fontStyle: 'italic' }}>
            <strong style={{ color: '#475569', fontStyle: 'normal' }}>Disclaimer:</strong>{' '}
            Composite reflections based on common experiences described in mental health literature — not direct quotes from named individuals.
          </p>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .voices-desktop { display: none !important; }
          .voices-mobile { display: flex !important; padding: 0 16px; }
        }
      `}</style>
    </section>
  );
}
