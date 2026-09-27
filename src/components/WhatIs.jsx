import { useEffect, useRef, useState } from 'react';

const keyPoints = [
  {
    num: '01',
    title: 'Emotional Suppression',
    desc: 'Men are conditioned to hide vulnerability, taught that expressing emotions is "unmanly." Feelings become a private shame rather than a shared human experience.',
  },
  {
    num: '02',
    title: 'Dominance Expectations',
    desc: 'The pressure to always appear strong, in control, and dominant — in every room, every relationship, every moment of uncertainty.',
  },
  {
    num: '03',
    title: 'Stigmatization of Help',
    desc: 'Seeking mental health support is framed as weakness. This keeps men from getting care they need until a crisis forces their hand.',
  },
  {
    num: '04',
    title: 'Aggression as Norm',
    desc: 'Violence and aggression are normalized as acceptable masculine responses to conflict, while empathy and restraint are treated as suspect.',
  },
];

export default function WhatIs() {
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
      id="whatis"
      ref={ref}
      style={{
        padding: 'clamp(60px, 8vw, 100px) clamp(16px, 4vw, 24px)',
        background: '#0f0d0b',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Faint watermark — suggestion #5 */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%) rotate(-12deg)',
        fontSize: 'clamp(80px, 18vw, 180px)',
        fontFamily: 'Sora, sans-serif',
        fontWeight: '900',
        color: 'rgba(196,122,58,0.025)',
        pointerEvents: 'none',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        letterSpacing: '-4px',
        zIndex: 0,
      }}>
        SILENCE
      </div>

      {/* Subtle grain texture overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
        opacity: 0.4,
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

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

        {/* Two-column layout: definition left, editorial points right */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'start',
        }}>

          {/* ── Left: Definition ── */}
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
              margin: '0 0 28px',
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
              <strong style={{ color: '#c4b5a8' }}>Toxic masculinity</strong> refers to a set of cultural norms and
              expectations that define "manhood" through dominance, emotional suppression, and aggression — while
              stigmatizing vulnerability, sensitivity, and the seeking of help.
            </p>

            <p style={{ color: '#7a6b60', lineHeight: '1.9', fontSize: '16px', marginBottom: '20px' }}>
              First widely studied by sociologist <strong style={{ color: '#c4b5a8' }}>R.W. Connell (2005)</strong> through
              the concept of <em>hegemonic masculinity</em>, toxic masculinity describes how certain male behaviors are
              socially rewarded while others — like crying or admitting weakness — are punished.
            </p>

            <p style={{ color: '#7a6b60', lineHeight: '1.9', fontSize: '16px' }}>
              Importantly, this is <strong style={{ color: '#c4b5a8' }}>not an attack on men</strong>. It is a critique
              of a harmful cultural system that damages men's mental health, relationships, and communities. Men are
              often the <em>victims</em> of these expectations too.
            </p>

            {/* Pull-quote — suggestion #3 */}
            <div style={{
              marginTop: '40px',
              paddingLeft: '24px',
              borderLeft: '3px solid #c47a3a',
            }}>
              <p style={{
                color: '#9e8a78', fontStyle: 'italic',
                fontSize: 'clamp(16px, 2vw, 19px)',
                lineHeight: '1.7', margin: '0 0 10px',
                fontFamily: 'Georgia, serif',
              }}>
                "The most courageous act a man can do is ask for help."
              </p>
              <p style={{ color: '#4a3f38', fontSize: '12px', margin: 0, letterSpacing: '0.5px' }}>
                — Modern Mental Health Advocacy
              </p>
            </div>
          </div>

          {/* ── Right: Editorial pull-quote style — suggestions #1 #2 #3 #4 ── */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s ease 0.3s',
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
          }}>
            {keyPoints.map((point, i) => {
              // Suggestion #4 — asymmetric: alternate left padding to stagger
              const isOffset = i % 2 !== 0;
              return (
                <div
                  key={i}
                  style={{
                    position: 'relative',
                    paddingLeft: '28px',
                    paddingBottom: i < keyPoints.length - 1 ? '36px' : '0',
                    marginLeft: isOffset ? 'clamp(0px, 4vw, 40px)' : '0',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.7s ease ${0.4 + i * 0.12}s, transform 0.7s ease ${0.4 + i * 0.12}s`,
                  }}
                >
                  {/* Suggestion #2 — vertical line with dot, instead of border/box */}
                  {/* Vertical line running down (except last item) */}
                  {i < keyPoints.length - 1 && (
                    <div style={{
                      position: 'absolute',
                      left: '5px',
                      top: '24px',
                      bottom: '0',
                      width: '1px',
                      background: `linear-gradient(180deg, rgba(196,122,58,0.4), rgba(196,122,58,0.05))`,
                    }} />
                  )}
                  {/* Dot at top of line */}
                  <div style={{
                    position: 'absolute',
                    left: '2px', top: '8px',
                    width: '7px', height: '7px',
                    borderRadius: '50%',
                    background: '#c47a3a',
                    boxShadow: '0 0 8px rgba(196,122,58,0.5)',
                  }} />

                  {/* Suggestion #1 — ghosted oversized numeral behind the title */}
                  <div style={{ position: 'relative' }}>
                    <span style={{
                      position: 'absolute',
                      top: '-18px', right: '0',
                      fontFamily: 'Sora, sans-serif',
                      fontWeight: '900',
                      fontSize: 'clamp(52px, 8vw, 80px)',
                      color: 'rgba(196,122,58,0.07)',
                      lineHeight: 1,
                      userSelect: 'none',
                      pointerEvents: 'none',
                      letterSpacing: '-2px',
                    }}>
                      {point.num}
                    </span>

                    {/* Suggestion #3 — mini bold headline + explanation, no box */}
                    <h3 style={{
                      fontFamily: 'Sora, sans-serif',
                      fontSize: 'clamp(15px, 2vw, 17px)',
                      fontWeight: '800',
                      color: '#c4b5a8',
                      margin: '0 0 8px',
                      letterSpacing: '-0.2px',
                    }}>
                      {point.title}
                    </h3>
                    <p style={{
                      color: '#5a4f48',
                      fontSize: '14px',
                      lineHeight: '1.75',
                      margin: 0,
                      maxWidth: '340px',
                    }}>
                      {point.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
