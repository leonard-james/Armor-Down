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
    desc: "Seeking mental health support is framed as weakness. This keeps men from getting care they need until a crisis forces their hand. Research on men's help-seeking links masculine socialization to whether men use mental health services (Addis & Mahalik, 2003).",
    citationHref: 'https://doi.org/10.1037/0003-066X.58.1.5',
    citationLabel: '[13]',
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
        background: 'var(--bg-page)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Faint "SILENCE" watermark */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(-12deg)',
          fontSize: 'clamp(80px, 18vw, 180px)',
          fontFamily: 'Sora, sans-serif',
          fontWeight: '900',
          color: 'var(--watermark-color)',
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          letterSpacing: '-4px',
          zIndex: 0,
        }}
      >
        SILENCE
      </div>

      {/* SVG grain texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
          opacity: 0.4,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg, #c47a3a, #e8a87c)' }} />
          <span style={{ color: 'var(--amber-text)', fontSize: '13px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Understanding the Issue
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'start',
          }}
        >
          {/* Left: Definition */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.8s ease 0.1s',
            }}
          >
            <h2
              style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: 'clamp(32px, 5vw, 52px)',
                fontWeight: '800',
                lineHeight: '1.1',
                margin: '0 0 28px',
                letterSpacing: '-1px',
                color: 'var(--text-primary)',
              }}
            >
              What is{' '}
              <span
                style={{
                  background: 'var(--highlight-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Toxic Masculinity?
              </span>
            </h2>

            <p style={{ color: 'var(--text-dimmer)', lineHeight: '1.9', fontSize: '16px', marginBottom: '20px' }}>
              <strong style={{ color: 'var(--highlight-emphasis-strong)' }}>Toxic masculinity</strong>{' '}
              refers to a set of cultural norms and expectations that define "manhood" through dominance,
              emotional suppression, and aggression — while stigmatizing vulnerability, sensitivity, and
              the seeking of help.
            </p>

            <p style={{ color: 'var(--text-dimmer)', lineHeight: '1.9', fontSize: '16px', marginBottom: '20px' }}>
              First set out by sociologist <strong style={{ color: 'var(--highlight-emphasis-strong)' }}>R.W. Connell</strong>{' '}
              in <em>Masculinities</em> (1995; 2nd ed. 2005), the concept of{' '}
              <em style={{ color: 'var(--highlight-emphasis-subtle)' }}>hegemonic masculinity</em> describes how certain male behaviors are socially rewarded
              while others — like crying or admitting weakness — are punished.{' '}
              <a
                href="https://ucpress.edu/books/masculinities/paper"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--amber-text)',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(196,122,58,0.4)',
                  paddingBottom: '1px',
                }}
              >
                [8]
              </a>
            </p>

            <p style={{ color: 'var(--text-dimmer)', lineHeight: '1.9', fontSize: '16px' }}>
              Importantly, this is{' '}
              <strong style={{ color: 'var(--highlight-emphasis-strong)' }}>not an attack on men</strong>. It is a
              critique of a harmful cultural system that damages men's mental health, relationships, and
              communities. Men are often the <em style={{ color: 'var(--highlight-emphasis-subtle)' }}>victims</em> of these expectations too.
            </p>

            {/* Pull-quote */}
            <div style={{ marginTop: '40px', paddingLeft: '24px', borderLeft: '3px solid var(--amber)' }}>
              <p
                style={{
                  color: 'var(--text-dim)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(16px, 2vw, 19px)',
                  lineHeight: '1.7',
                  margin: '0 0 10px',
                  fontFamily: 'Georgia, serif',
                }}
              >
                "The most courageous act a man can do is ask for help."
              </p>
              <p style={{ color: 'var(--text-ghost)', fontSize: '12px', margin: 0, letterSpacing: '0.5px' }}>
                — Modern Mental Health Advocacy
              </p>
            </div>
          </div>

          {/* Right: Timeline key points */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.8s ease 0.3s',
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
            }}
          >
            {keyPoints.map((point, i) => {
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
                  {i < keyPoints.length - 1 && (
                    <div
                      style={{
                        position: 'absolute',
                        left: '5px',
                        top: '24px',
                        bottom: '0',
                        width: '1px',
                        background: 'linear-gradient(180deg, rgba(196,122,58,0.4), rgba(196,122,58,0.05))',
                      }}
                    />
                  )}
                  <div
                    style={{
                      position: 'absolute',
                      left: '2px',
                      top: '8px',
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: '#c47a3a',
                      boxShadow: '0 0 8px rgba(196,122,58,0.5)',
                    }}
                  />
                  <div style={{ position: 'relative' }}>
                    <span
                      style={{
                        position: 'absolute',
                        top: '-18px',
                        right: '0',
                        fontFamily: 'Sora, sans-serif',
                        fontWeight: '900',
                        fontSize: 'clamp(52px, 8vw, 80px)',
                        color: 'var(--watermark-numeral)',
                        lineHeight: 1,
                        userSelect: 'none',
                        pointerEvents: 'none',
                        letterSpacing: '-2px',
                      }}
                    >
                      {point.num}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'Sora, sans-serif',
                        fontSize: 'clamp(15px, 2vw, 17px)',
                        fontWeight: '800',
                        color: 'var(--text-secondary)',
                        margin: '0 0 8px',
                        letterSpacing: '-0.2px',
                      }}
                    >
                      {point.title}
                    </h3>
                    <p style={{ color: 'var(--text-faint)', fontSize: '14px', lineHeight: '1.75', margin: 0, maxWidth: '340px' }}>
                      {point.desc}
                      {point.citationHref && (
                        <>
                          {' '}
                          <a
                            href={point.citationHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: 'var(--amber-text)',
                              textDecoration: 'none',
                              borderBottom: '1px solid rgba(196,122,58,0.4)',
                              paddingBottom: '1px',
                            }}
                          >
                            {point.citationLabel}
                          </a>
                        </>
                      )}
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
