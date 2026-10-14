import { useEffect, useRef, useState } from 'react';

/* Avatar accent tints — amber palette, varied opacity */
const AVATAR_COLORS = [
  { bg: 'rgba(196,122,58,0.18)', border: 'rgba(196,122,58,0.45)', text: 'var(--highlight-amber)' },
  { bg: 'rgba(232,168,124,0.15)', border: 'rgba(232,168,124,0.40)', text: 'var(--highlight-amber-lt)' },
  { bg: 'rgba(160,82,45,0.20)',   border: 'rgba(160,82,45,0.45)',  text: 'var(--highlight-rust)' },
  { bg: 'rgba(196,122,58,0.12)', border: 'rgba(232,168,124,0.35)', text: 'var(--highlight-peach)' },
];

const members = [
  { name: 'Fola Faustine L. Gersalia', initials: 'FG', role: 'Research & Content', course: 'BSIT NAS 4-2', university: 'Sorsogon State University - Bulan Campus', year: '2026' },
  { name: 'Lloyd Allan B. Gimena',     initials: 'LG', role: 'Design & Layout',    course: 'BSIT NAS 4-2', university: 'Sorsogon State University - Bulan Campus', year: '2026' },
  { name: 'Leonard James H. Gobris',   initials: 'LG', role: 'Development',        course: 'BSIT NAS 4-2', university: 'Sorsogon State University - Bulan Campus', year: '2026' },
  { name: 'Mark John D. Ernacio',      initials: 'ME', role: 'Data & Statistics',  course: 'BSIT NAS 4-2', university: 'Sorsogon State University - Bulan Campus', year: '2026' },
];

function MemberCard({ member, index, visible }) {
  const av = AVATAR_COLORS[index % AVATAR_COLORS.length];

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-card)',
        borderRadius: '24px',
        padding: 'clamp(24px, 3vw, 36px)',
        position: 'relative',
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.65s ease ${0.15 + index * 0.1}s,
                     transform 0.65s ease ${0.15 + index * 0.1}s,
                     border-color 0.2s ease, box-shadow 0.2s ease`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-card-hover)';
        e.currentTarget.style.transform   = 'translateY(-3px)';
        e.currentTarget.style.boxShadow   = '0 16px 40px rgba(196,122,58,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-card)';
        e.currentTarget.style.transform   = 'translateY(0)';
        e.currentTarget.style.boxShadow   = 'none';
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: 'linear-gradient(90deg, transparent, var(--amber), transparent)',
      }} />

      {/* Avatar */}
      <div
        role="img"
        aria-label={`${member.name} initials avatar`}
        style={{
          width: '64px', height: '64px', borderRadius: '50%',
          background: av.bg, border: `1px solid ${av.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '20px', flexShrink: 0,
        }}
      >
        <span style={{
          fontFamily: 'Sora, sans-serif', fontSize: '20px', fontWeight: '800',
          color: av.text, letterSpacing: '-0.5px', userSelect: 'none',
        }}>
          {member.initials}
        </span>
      </div>

      {/* Name */}
      <h3 style={{
        fontFamily: 'Sora, sans-serif', fontSize: 'clamp(17px, 2vw, 20px)',
        fontWeight: '700', color: 'var(--text-secondary)', margin: '0 0 6px', letterSpacing: '-0.2px',
      }}>
        {member.name}
      </h3>

      {/* Role badge */}
      <div style={{
        display: 'inline-block',
        background: 'var(--badge-bg)', border: '1px solid var(--badge-border)',
        borderRadius: '6px', padding: '3px 10px', marginBottom: '14px',
      }}>
        <span style={{ color: 'var(--badge-text)', fontSize: '11px', fontWeight: '600', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
          {member.role}
        </span>
      </div>

      {/* Divider */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, var(--border-subtle), transparent)',
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
            <span style={{ color: 'var(--meta-label)', fontSize: '10px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>
              {label}
            </span>
            <span style={{ color: 'var(--meta-value)', fontSize: '13px', fontWeight: '500', lineHeight: '1.5' }}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, var(--bg-page) 0%, var(--bg-page-alt) 100%)',
        padding: 'clamp(100px, 14vw, 140px) clamp(16px, 4vw, 24px) clamp(60px, 8vw, 100px)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(196,122,58,0.07) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(196,122,58,0.25), transparent)',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Section header */}
        <div style={{
          textAlign: 'center', marginBottom: 'clamp(48px, 7vw, 80px)',
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.7s ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg, var(--amber), var(--amber-lt))' }} />
            <span style={{ color: 'var(--amber-text)', fontSize: '13px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>
              The Team
            </span>
            <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg, var(--amber-lt), var(--amber))' }} />
          </div>

          <h1 style={{
            fontFamily: 'Sora, sans-serif', fontSize: 'clamp(32px, 6vw, 64px)',
            fontWeight: '800', lineHeight: '1.08', margin: '0 0 20px',
            letterSpacing: '-1.5px', color: 'var(--headline-base)',
          }}>
            The Team{' '}
            <span style={{
              background: 'var(--highlight-gradient)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Behind Armor Down
            </span>
          </h1>

          <p style={{
            color: 'var(--text-dim)', fontSize: 'clamp(15px, 2vw, 18px)',
            lineHeight: '1.8', maxWidth: '580px', margin: '0 auto',
          }}>
            This project was created for our Gender and Society midterm, with the goal
            of giving men's mental health the attention it deserves.
          </p>
        </div>

        {/* Member grid */}
        <div className="about-member-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'clamp(12px, 2vw, 20px)',
        }}>
          {members.map((member, i) => (
            <MemberCard key={i} member={member} index={i} visible={visible} />
          ))}
        </div>
        <style>{`
          @media (max-width: 700px) { .about-member-grid { grid-template-columns: 1fr !important; } }
          @media (min-width: 701px) and (max-width: 960px) { .about-member-grid { grid-template-columns: repeat(2,1fr) !important; } }
        `}</style>

        {/* Bottom note */}
        <div style={{
          marginTop: 'clamp(48px, 7vw, 72px)', textAlign: 'center',
          opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease 0.6s',
        }}>
          <div style={{
            display: 'inline-block',
            background: 'var(--badge-bg)', border: '1px solid var(--badge-border)',
            borderRadius: '12px', padding: '14px 24px',
          }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.7', margin: 0, fontStyle: 'italic' }}>
              Gender and Society — 4th Year Midterm Project &nbsp;·&nbsp; All research is cited and sourced.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
