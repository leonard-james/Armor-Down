import { useEffect, useRef, useState } from 'react';

const keyPoints = [
  {
    title: 'Emotional Suppression',
    desc: 'Men are conditioned to hide vulnerability, taught that expressing emotions is "unmanly."',
  },
  {
    title: 'Dominance Expectations',
    desc: 'The pressure to always appear strong, in control, and dominant in every situation.',
  },
  {
    title: 'Stigmatization of Help',
    desc: 'Seeking mental health support is framed as weakness, keeping men from getting care they need.',
  },
  {
    title: 'Aggression as Norm',
    desc: 'Violence and aggression are normalized as acceptable masculine responses to conflict.',
  },
];

export default function WhatIs() {
  const [visible, setVisible] = useState(false);
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

  return (
    <section
      id="whatis"
      ref={ref}
      style={{
        padding: 'clamp(60px, 8vw, 100px) clamp(16px, 4vw, 24px)',
        background: '#0f0d0b',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Warm background accent */}
      <div style={{
        position: 'absolute', top: '-80px', right: '-80px',
        width: '480px', height: '480px',
        background: 'radial-gradient(circle, rgba(196,122,58,0.05) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Section label */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.7s ease',
          marginBottom: '16px',
          display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg, #c47a3a, #e8a87c)' }} />
          <span style={{ color: '#c47a3a', fontSize: '13px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Understanding the Issue
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(32px, 5vw, 60px)', alignItems: 'stretch' }}>

          {/* Left: Definition */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s ease 0.1s',
          }}>
            <h2 style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: '800',
              lineHeight: '1.1',
              margin: '0 0 24px',
              letterSpacing: '-1px',
              color: '#e8e0d5',
            }}>
              What is{' '}
              <span style={{
                background: 'linear-gradient(135deg, #c47a3a, #e8a87c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Toxic Masculinity?
              </span>
            </h2>

            <p style={{ color: '#7a6b60', lineHeight: '1.9', fontSize: '16px', marginBottom: '20px' }}>
              <strong style={{ color: '#c4b5a8' }}>Toxic masculinity</strong> refers to a set of cultural norms and expectations
              that define "manhood" through dominance, emotional suppression, and aggression — while stigmatizing
              vulnerability, sensitivity, and the seeking of help.
            </p>

            <p style={{ color: '#7a6b60', lineHeight: '1.9', fontSize: '16px', marginBottom: '20px' }}>
              First widely studied by sociologist <strong style={{ color: '#c4b5a8' }}>R.W. Connell (2005)</strong> through
              the concept of <em>hegemonic masculinity</em>, toxic masculinity describes how certain male behaviors are
              socially rewarded while others — like crying or admitting weakness — are punished.
            </p>

            <p style={{ color: '#7a6b60', lineHeight: '1.9', fontSize: '16px' }}>
              Importantly, this is <strong style={{ color: '#c4b5a8' }}>not an attack on men</strong>.
              It is a critique of a harmful cultural system that damages men's mental health,
              relationships, and communities. Men are often the <em>victims</em> of these expectations too.
            </p>

            {/* Quote */}
            <div style={{
              marginTop: '36px',
              padding: '24px',
              background: 'rgba(196,122,58,0.05)',
              borderLeft: '4px solid #c47a3a',
              borderRadius: '0 12px 12px 0',
            }}>
              <p style={{ color: '#9e8a78', fontStyle: 'italic', fontSize: '16px', lineHeight: '1.7', margin: 0 }}>
                "The most courageous act a man can do is ask for help."
              </p>
              <p style={{ color: '#4a3f38', fontSize: '13px', margin: '8px 0 0' }}>
                — Modern Mental Health Advocacy
              </p>
            </div>
          </div>

          {/* Right: Key points grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: '16px',
            alignSelf: 'stretch',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s ease 0.3s',
          }}>
            {keyPoints.map((point, i) => (
              <div
                key={i}
                style={{
                  background: hoveredCard === i ? 'rgba(196,122,58,0.07)' : 'rgba(28,22,18,0.8)',
                  border: `1px solid ${hoveredCard === i ? 'rgba(196,122,58,0.35)' : 'rgba(196,122,58,0.1)'}`,
                  borderRadius: '16px',
                  padding: '24px',
                  cursor: 'default',
                  opacity: visible ? 1 : 0,
                  transform: hoveredCard === i ? 'translateY(-4px)' : visible ? 'translateY(0)' : 'translateY(20px)',
                  transition: hoveredCard === i
                    ? 'border-color 0.18s ease, background 0.18s ease, transform 0.18s ease, opacity 0.6s ease'
                    : `border-color 0.18s ease, background 0.18s ease, transform 0.18s ease, opacity 0.6s ease ${0.4 + i * 0.1}s`,
                }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                onTouchStart={() => setHoveredCard(i)}
                onTouchEnd={() => setHoveredCard(null)}
              >
                <h3 style={{ color: '#c4b5a8', fontSize: '15px', fontWeight: '700', margin: '0 0 8px', letterSpacing: '-0.2px' }}>
                  {point.title}
                </h3>
                <p style={{ color: '#5a4f48', fontSize: '13px', lineHeight: '1.7', margin: 0 }}>
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
