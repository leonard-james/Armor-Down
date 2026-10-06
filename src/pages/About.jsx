import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────────────────
   DESIGN TOKENS — exact values from the existing site
   ─────────────────────────────────────────────────────────
   Backgrounds : #0f0d0b (page), rgba(24,19,15,0.7) (card)
   Accent amber : #c47a3a (primary), #e8a87c (light)
   Card border  : rgba(196,122,58,0.18) default → 0.45 hover
   Card radius  : 24px (panels) / 18px (smaller cards)
   Card padding : clamp(20px,3vw,36px)
   Hover lift   : translateY(-3px), border → amber 45%
   Top bar      : 2px gradient transparent→amber→transparent
   Body text    : #e8e0d5 (primary), #7a6b60 (secondary),
                  #5a4f48 (muted), #c4b5a8 (card titles)
   Heading font : Sora, sans-serif  800  -1px letter-spacing
   Body font    : Inter, system-ui, sans-serif
   Label style  : 13px / 600 / #c47a3a / 2px ls / uppercase
                  flanked by 40px amber gradient lines
───────────────────────────────────────────────────────── */

const AMBER    = '#c47a3a';
const AMBER_LT = '#e8a87c';

/* Avatar shades — amber palette only, varied opacity */
const AVATAR_COLORS = [
  { bg: 'rgba(196,122,58,0.18)', border: 'rgba(196,122,58,0.45)', text: AMBER    },
  { bg: 'rgba(232,168,124,0.15)', border: 'rgba(232,168,124,0.4)', text: AMBER_LT },
  { bg: 'rgba(160,82,45,0.2)',   border: 'rgba(160,82,45,0.45)',  text: '#a0522d' },
  { bg: 'rgba(196,122,58,0.12)', border: 'rgba(232,168,124,0.35)', text: '#d4956a' },
];

const members = [
  {
    name: 'Fola Faustine L. Gersalia',
    initials: 'FG',
    role: 'Research & Content',
    course: 'BSIT NAS 4-2',
    university: 'Sorsogon State University Bulan Campus',
    year: '2026',
  },
  {
    name: 'Lloyd Allan B. Gimena',
    initials: 'LG',
    role: 'Design & Layout',
    course: 'BSIT NAS 4-2',
    university: 'Sorsogon State University Bulan Campus',
    year: '2026',
  },
  {
    name: 'Leonard James H. Gobris',
    initials: 'LG',
    role: 'Development',
    course: 'BSIT NAS 4-2',
    university: 'Sorsogon State University Bulan Campus',
    year: '2026',
  },
  {
    name: 'Mark John D. Ernacio',
    initials: 'ME',
    role: 'Data & Statistics',
    course: 'BSIT NAS 4-2',
    university: 'Sorsogon State University Bulan Campus',
    year: '2026',
  },
];

/* ── Member card ── */
function MemberCard({ member, index, visible }) {
  const av = AVATAR_COLORS[index % AVATAR_COLORS.length];

  return (
    <div
      style={{
        background: 'rgba(24,19,15,0.7)',
        border: `1px solid rgba(196,122,58,0.18)`,
        borderRadius: '24px',
        padding: 'clamp(24px, 3vw, 36px)',
        position: 'relative',
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.65s ease ${0.15 + index * 0.1}s,
                     transform 0.65s ease ${0.15 + index * 0.1}s,
                     border-color 0.2s ease,
                     box-shadow 0.2s ease`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(196,122,58,0.45)';
        e.currentTarget.style.transform   = 'translateY(-3px)';
        e.currentTarget.style.boxShadow   = `0 16px 40px rgba(196,122,58,0.1)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(196,122,58,0.18)';
        e.currentTarget.style.transform   = 'translateY(0)';
        e.currentTarget.style.boxShadow   = 'none';
      }}
    >
      {/* Top accent bar — same as Statistics highlight cards */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, transparent, ${AMBER}, transparent)`,
      }} />

      {/* Avatar */}
      <div
        role="img"
        aria-label={`${member.name} initials avatar`}
        style={{
          width: '64px', height: '64px',
          borderRadius: '50%',
          background: av.bg,
          border: `1px solid ${av.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '20px',
          flexShrink: 0,
        }}
      >
        <span style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: '20px',
          fontWeight: '800',
          color: av.text,
          letterSpacing: '-0.5px',
          userSelect: 'none',
        }}>
          {member.initials}
        </span>
      </div>

      {/* Name */}
      <h3 style={{
        fontFamily: 'Sora, sans-serif',
        fontSize: 'clamp(17px, 2vw, 20px)',
        fontWeight: '700',
        color: '#c4b5a8',
        margin: '0 0 6px',
        letterSpacing: '-0.2px',
      }}>
        {member.name}
      </h3>

      {/* Role badge */}
      <div style={{
        display: 'inline-block',
        background: `rgba(196,122,58,0.1)`,
        border: `1px solid rgba(196,122,58,0.25)`,
        borderRadius: '6px',
        padding: '3px 10px',
        marginBottom: '14px',
      }}>
        <span style={{
          color: AMBER,
          fontSize: '11px',
          fontWeight: '600',
          letterSpacing: '0.8px',
          textTransform: 'uppercase',
        }}>
          {member.role}
        </span>
      </div>

      {/* Divider */}
      <div style={{
        height: '1px',
        background: `linear-gradient(90deg, rgba(196,122,58,0.25), transparent)`,
        marginBottom: '14px',
      }} />

      {/* Info fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {[
          { label: 'Course / Section', value: member.course },
          { label: 'University',       value: member.university },
          { label: 'Year',             value: member.year },
        ].map(({ label, value }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            <span style={{
              color: '#3a3028',
              fontSize: '10px',
              fontWeight: '600',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}>
              {label}
            </span>
            <span style={{
              color: '#7a6b60',
              fontSize: '13px',
              fontWeight: '500',
              lineHeight: '1.5',
            }}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Page ── */
export default function About() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    /* scroll to top on mount */
    window.scrollTo({ top: 0, behavior: 'instant' });

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0f0d0b 0%, #0d0b09 100%)',
        padding: 'clamp(100px, 14vw, 140px) clamp(16px, 4vw, 24px) clamp(60px, 8vw, 100px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow — same style as Hero */}
      <div style={{
        position: 'absolute', top: '10%', left: '50%',
        transform: 'translateX(-50%)',
        width: '700px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(196,122,58,0.07) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* Top border line */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 0, height: '1px',
        background: `linear-gradient(90deg, transparent, rgba(196,122,58,0.25), transparent)`,
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* ── Section label + heading — identical pattern to WhatIs/Statistics ── */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(48px, 7vw, 80px)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.7s ease',
        }}>
          {/* Label row with flanking lines */}
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '12px',
            marginBottom: '16px',
          }}>
            <div style={{ height: '2px', width: '40px', background: `linear-gradient(90deg, ${AMBER}, ${AMBER_LT})` }} />
            <span style={{
              color: AMBER,
              fontSize: '13px', fontWeight: '600',
              letterSpacing: '2px', textTransform: 'uppercase',
            }}>
              The Team
            </span>
            <div style={{ height: '2px', width: '40px', background: `linear-gradient(90deg, ${AMBER_LT}, ${AMBER})` }} />
          </div>

          {/* H1 — two-tone, same pattern as every section heading */}
          <h1 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(32px, 6vw, 64px)',
            fontWeight: '800',
            lineHeight: '1.08',
            margin: '0 0 20px',
            letterSpacing: '-1.5px',
            color: '#e8e0d5',
          }}>
            The Team{' '}
            <span style={{
              background: `linear-gradient(135deg, ${AMBER}, ${AMBER_LT})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Behind Armor Down
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            color: '#7a6b60',
            fontSize: 'clamp(15px, 2vw, 18px)',
            lineHeight: '1.8',
            maxWidth: '580px',
            margin: '0 auto',
          }}>
            This project was created for our Gender and Society midterm, with the goal
            of giving men's mental health the attention it deserves.
          </p>
        </div>

        {/* ── Member grid — 4 columns desktop, 1-col mobile ── */}
        <div className="member-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'clamp(12px, 2vw, 20px)',
        }}>
          {members.map((member, i) => (
            <MemberCard key={i} member={member} index={i} visible={visible} />
          ))}
        </div>
        <style>{`
          @media (max-width: 700px) {
            .member-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>

        {/* ── Bottom note — same muted style as Statistics disclaimer ── */}
        <div style={{
          marginTop: 'clamp(48px, 7vw, 72px)',
          textAlign: 'center',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.7s ease 0.6s',
        }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(196,122,58,0.06)',
            border: '1px solid rgba(196,122,58,0.15)',
            borderRadius: '12px',
            padding: '14px 24px',
          }}>
            <p style={{
              color: '#4a3f38',
              fontSize: '13px',
              lineHeight: '1.7',
              margin: 0,
              fontStyle: 'italic',
            }}>
              Gender and Society — 4th Year Midterm Project &nbsp;·&nbsp; All research is cited and sourced.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
