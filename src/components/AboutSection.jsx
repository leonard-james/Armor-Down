import { useEffect, useRef, useState } from 'react';
import leoPhoto from '../assets/Leo.jpg';

const AMBER    = '#c47a3a';
const AMBER_LT = '#e8a87c';

/* ── Avatar size — single source of truth ── */
const AVATAR_SIZE = 'clamp(64px, 8vw, 78px)';

/* ── Member data ─────────────────────────────────────────────
   Set photo: <importedImage> when a real photo is ready.
   ────────────────────────────────────────────────────────── */
const members = [
  {
    name: 'Fola Faustine L. Gersalia',
    photo: null,
    role: 'Research & Content',
    course: 'BSIT NAS 4-2',
    university: 'Sorsogon State University Bulan Campus',
    year: '2026',
  },
  {
    name: 'Lloyd Allan B. Gimena',
    photo: null,
    role: 'Design & Layout',
    course: 'BSIT NAS 4-2',
    university: 'Sorsogon State University Bulan Campus',
    year: '2026',
  },
  {
    name: 'Leonard James H. Gobris',
    photo: leoPhoto,
    role: 'Development',
    course: 'BSIT NAS 4-2',
    university: 'Sorsogon State University Bulan Campus',
    year: '2026',
  },
  {
    name: 'Mark John D. Ernacio',
    photo: null,
    role: 'Data & Statistics',
    course: 'BSIT NAS 4-2',
    university: 'Sorsogon State University Bulan Campus',
    year: '2026',
  },
];

/* ── Shared avatar wrapper style ── */
const avatarWrapStyle = {
  width: AVATAR_SIZE,
  height: AVATAR_SIZE,
  borderRadius: '50%',
  margin: '0 auto clamp(18px, 2.5vw, 24px)',
  flexShrink: 0,
  overflow: 'hidden',
  display: 'block',
};

/* ── Placeholder silhouette — swap out by setting member.photo ── */
function PlaceholderAvatar() {
  return (
    <div style={{
      ...avatarWrapStyle,
      background: 'rgba(58,48,40,0.6)',
      border: '1px solid rgba(196,122,58,0.2)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg viewBox="0 0 60 60" width="100%" height="100%" aria-hidden="true" style={{ display: 'block' }}>
        <circle cx="30" cy="22" r="10" fill="rgba(196,122,58,0.25)" />
        <ellipse cx="30" cy="50" rx="16" ry="12" fill="rgba(196,122,58,0.2)" />
      </svg>
    </div>
  );
}

/* ── Real photo avatar ── */
function PhotoAvatar({ src, name }) {
  return (
    <div style={{
      ...avatarWrapStyle,
      background: '#0f0d0b',                  /* dark fill kills white JPG edges */
      border: '1px solid rgba(196,122,58,0.4)',
    }}>
      <img
        src={src}
        alt={`${name} photo`}
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
      />
    </div>
  );
}

/* ── Member card ── */
function MemberCard({ member, index, visible, isHovered, anyHovered, onEnter, onLeave }) {
  const dimmed = anyHovered && !isHovered;

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        background: 'rgba(24,19,15,0.7)',
        border: `1px solid ${isHovered ? 'rgba(196,122,58,0.55)' : 'rgba(196,122,58,0.18)'}`,
        borderRadius: '24px',
        padding: 'clamp(20px, 2.5vw, 32px)',
        position: 'relative',
        overflow: 'hidden',
        opacity: visible ? (dimmed ? 0.45 : 1) : 0,
        transform: visible
          ? isHovered ? 'translateY(-10px) scale(1.03)' : 'translateY(0) scale(1)'
          : 'translateY(32px)',
        filter: dimmed ? 'blur(2px)' : 'none',
        boxShadow: isHovered ? '0 24px 56px rgba(196,122,58,0.18)' : 'none',
        zIndex: isHovered ? 2 : 1,
        transition: `opacity 0.65s ease ${visible ? 0 : 0.15 + index * 0.1}s,
                     transform 0.3s ease,
                     filter 0.3s ease,
                     border-color 0.2s ease,
                     box-shadow 0.3s ease`,
        cursor: 'default',
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, transparent, ${AMBER}, transparent)`,
      }} />

      {member.photo
        ? <PhotoAvatar src={member.photo} name={member.name} />
        : <PlaceholderAvatar />
      }

      <h3 style={{
        fontFamily: 'Sora, sans-serif', fontSize: 'clamp(14px, 1.6vw, 17px)',
        fontWeight: '700', color: '#c4b5a8', margin: '0 0 8px', letterSpacing: '-0.2px',
      }}>
        {member.name}
      </h3>

      <div style={{
        display: 'inline-block',
        background: 'rgba(196,122,58,0.1)', border: '1px solid rgba(196,122,58,0.25)',
        borderRadius: '6px', padding: '3px 10px', marginBottom: '14px',
      }}>
        <span style={{ color: AMBER, fontSize: '10px', fontWeight: '600', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
          {member.role}
        </span>
      </div>

      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, rgba(196,122,58,0.25), transparent)',
        marginBottom: '14px',
      }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {[
          { label: 'Course / Section', value: member.course },
          { label: 'University',       value: member.university },
          { label: 'Year',             value: member.year },
        ].map(({ label, value }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ color: '#3a3028', fontSize: '10px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>
              {label}
            </span>
            <span style={{ color: '#7a6b60', fontSize: '12px', fontWeight: '500', lineHeight: '1.5' }}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Member grid with hover state ── */
function MemberGrid({ visible }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  return (
    <>
      <div className="about-member-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 'clamp(12px, 2vw, 20px)',
      }}>
        {members.map((member, i) => (
          <MemberCard
            key={i}
            member={member}
            index={i}
            visible={visible}
            isHovered={hoveredIndex === i}
            anyHovered={hoveredIndex !== null}
            onEnter={() => setHoveredIndex(i)}
            onLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>
      <style>{`
        @media (max-width: 700px) {
          .about-member-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 701px) and (max-width: 960px) {
          .about-member-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </>
  );
}
export default function AboutSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: 'clamp(60px, 8vw, 100px) clamp(16px, 4vw, 24px)',
        background: 'linear-gradient(180deg, #0d0b09 0%, #0f0d0b 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(196,122,58,0.06) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      {/* Top border */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(196,122,58,0.2), transparent)',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── 1. Our Rationale ── */}
        <div style={{
          textAlign: 'center', marginBottom: 'clamp(48px, 7vw, 72px)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.7s ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ height: '2px', width: '40px', background: `linear-gradient(90deg, ${AMBER}, ${AMBER_LT})` }} />
            <span style={{ color: AMBER, fontSize: '13px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Our Rationale
            </span>
            <div style={{ height: '2px', width: '40px', background: `linear-gradient(90deg, ${AMBER_LT}, ${AMBER})` }} />
          </div>

          <h2 style={{
            fontFamily: 'Sora, sans-serif', fontSize: 'clamp(24px, 4vw, 40px)',
            fontWeight: '800', lineHeight: '1.1',
            margin: '0 0 28px', letterSpacing: '-1px', color: '#e8e0d5',
          }}>
            Why We Chose{' '}
            <span style={{
              background: `linear-gradient(135deg, ${AMBER}, ${AMBER_LT})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              This Issue
            </span>
          </h2>

          <div style={{
            background: 'rgba(24,19,15,0.6)', border: '1px solid rgba(196,122,58,0.15)',
            borderRadius: '20px', padding: 'clamp(24px, 3vw, 40px)',
            position: 'relative', overflow: 'hidden',
            maxWidth: '860px', margin: '0 auto', textAlign: 'left',
          }}>
            <div style={{
              position: 'absolute', left: 0, top: '15%', bottom: '15%', width: '3px',
              background: `linear-gradient(180deg, transparent, ${AMBER}, transparent)`,
            }} />
            <p style={{ color: '#7a6b60', fontSize: 'clamp(15px, 1.8vw, 17px)', lineHeight: '1.9', margin: 0, paddingLeft: '8px' }}>
              Most conversations about gender inequality focus on how harmful norms affect women — rightly so — but rarely examine how those same norms also harm men. We chose toxic masculinity and men's mental health because it's an underrepresented angle in gender advocacy, especially in a Philippine context where phrases like{' '}
              <em style={{ color: '#c4b5a8' }}>"lalaki ka, 'wag kang umiyak"</em>{' '}
              go largely unquestioned. Real gender equality means making room for men to be vulnerable too.
            </p>
          </div>
        </div>

        {/* ── 2. Hero header ── */}
        <div style={{
          textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 64px)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.7s ease 0.1s',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ height: '2px', width: '40px', background: `linear-gradient(90deg, ${AMBER}, ${AMBER_LT})` }} />
            <span style={{ color: AMBER, fontSize: '13px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>
              The Team
            </span>
            <div style={{ height: '2px', width: '40px', background: `linear-gradient(90deg, ${AMBER_LT}, ${AMBER})` }} />
          </div>

          <h2 style={{
            fontFamily: 'Sora, sans-serif', fontSize: 'clamp(28px, 5vw, 52px)',
            fontWeight: '800', lineHeight: '1.08',
            margin: '0 0 16px', letterSpacing: '-1.5px', color: '#e8e0d5',
          }}>
            The Team{' '}
            <span style={{
              background: `linear-gradient(135deg, ${AMBER}, ${AMBER_LT})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Behind Armor Down
            </span>
          </h2>

          <p style={{ color: '#7a6b60', fontSize: 'clamp(14px, 2vw, 17px)', lineHeight: '1.8', maxWidth: '560px', margin: '0 auto' }}>
            This project was created for our Gender and Society midterm, with the goal
            of giving men's mental health the attention it deserves.
          </p>
        </div>

        {/* ── 4-column member grid ── */}
        <MemberGrid visible={visible} />

        {/* ── Bottom note ── */}
        <div style={{
          marginTop: 'clamp(40px, 6vw, 60px)', textAlign: 'center',
          opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease 0.6s',
        }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(196,122,58,0.06)', border: '1px solid rgba(196,122,58,0.15)',
            borderRadius: '12px', padding: '14px 24px',
          }}>
            <p style={{ color: '#4a3f38', fontSize: '13px', lineHeight: '1.7', margin: 0, fontStyle: 'italic' }}>
              Gender and Society — 4th Year Midterm Project &nbsp;·&nbsp; All research is cited and sourced.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
