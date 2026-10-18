import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import windowImg  from '../assets/window.jpg';
import benchImg   from '../assets/bench.jpg';
import aloneImg   from '../assets/alone.jpg';
import dontImg    from '../assets/dont.jpg';
import depressImg from '../assets/depress.jpg';
import standImg   from '../assets/stand.jpg';

/* ─── Story data ─── */
const stories = [
  {
    img: windowImg,
    alt: 'Man looking out a window alone',
    quote: 'I spent years telling myself I was fine. Getting out of bed felt impossible, but admitting that to anyone felt worse.',
    tag: 'Depression & Silence',
    color: '#c47a3a',
    textColor: 'var(--highlight-amber)',
    hoverTextColor: 'var(--highlight-hover-amber)',
  },
  {
    img: benchImg,
    alt: 'Person sitting alone on a bench',
    quote: 'I didn’t know what to say when I reached out. I just knew I didn’t want to face everything alone anymore.',
    tag: 'Reaching Out',
    color: '#e8a87c',
    textColor: 'var(--highlight-amber-lt)',
    hoverTextColor: 'var(--highlight-hover-amber-lt)',
  },
  {
    img: aloneImg,
    alt: 'Man alone in a dark room',
    quote: 'Nobody ever told me it was okay to struggle. I thought being a man meant carrying it all without saying a word.',
    tag: 'Toxic Expectations',
    color: '#8b6b4e',
    textColor: 'var(--highlight-muted)',
    hoverTextColor: 'var(--highlight-hover-muted)',
  },
  {
    img: dontImg,
    alt: 'Person holding back emotions',
    quote: 'Every time someone said "just don\'t think about it," I felt more invisible. My feelings weren\'t something I could switch off.',
    tag: 'Invalidation',
    color: '#a0522d',
    textColor: 'var(--highlight-rust)',
    hoverTextColor: 'var(--highlight-hover-rust)',
  },
  {
    img: depressImg,
    alt: 'Person overwhelmed by depression',
    quote: 'Depression didn\'t look like sadness for me. It looked like numbness — going through the motions while feeling nothing at all.',
    tag: 'Hidden Struggles',
    color: '#c0504d',
    textColor: 'var(--highlight-red)',
    hoverTextColor: 'var(--highlight-hover-red)',
  },
  {
    img: standImg,
    alt: 'Person standing up with determination',
    quote: 'I used to think healing meant never struggling again. Now I know it just means I keep standing back up.',
    tag: 'Moving Forward',
    color: '#c47a3a',
    textColor: 'var(--highlight-amber)',
    hoverTextColor: 'var(--highlight-hover-amber)',
  },
];

/* ─── Story panel ─── */
function StoryPanel({ story }) {
  return (
    <div style={{
        background: 'var(--story-panel-bg)',
        border: `1px solid ${story.color}20`,
        borderRadius: '18px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: `0 20px 56px rgba(0,0,0,0.4)`,
      }}
    >
      {/* Photo */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 'clamp(240px, 35vw, 420px)', flexShrink: 0 }}>
        <img
          src={story.img}
          alt={story.alt}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            display: 'block',
            filter: 'brightness(0.55) saturate(0.6) sepia(0.15)',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to top, var(--story-panel-bg) 0%, var(--story-gradient-mid) 50%, transparent 100%)`,
          pointerEvents: 'none',
        }} />
        {/* Category tag */}
        <div style={{
          position: 'absolute', top: '20px', left: '20px',
          background: `var(--bg-overlay)`,
          border: `1px solid ${story.color}50`,
          backdropFilter: 'blur(10px)',
          borderRadius: '8px',
          padding: '5px 14px',
        }}>
          <span style={{ color: story.textColor, fontSize: '11px', fontWeight: '700', letterSpacing: '1.2px', textTransform: 'uppercase' }}>
            {story.tag}
          </span>
        </div>
      </div>

      {/* Quote body */}
      <div style={{ padding: 'clamp(24px, 4vw, 44px)', display: 'flex', flexDirection: 'column' }}>
        <div style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(48px, 7vw, 72px)',
          lineHeight: '0.7',
          color: story.color, opacity: 0.25,
          marginBottom: '16px', userSelect: 'none',
        }}>"</div>
        <p style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          color: 'var(--quote-text)',
          fontSize: 'clamp(17px, 2.2vw, 22px)',
          lineHeight: '1.8',
          margin: '0 0 28px',
          fontStyle: 'italic',
          maxWidth: '680px',
        }}>
          {story.quote}
        </p>
        <div style={{
          height: '1px',
          background: `linear-gradient(90deg, ${story.color}35, transparent)`,
          marginBottom: '20px',
          maxWidth: '300px',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '50%',
            background: `${story.color}12`, border: `1px solid ${story.color}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }} />
          <div>
            <div style={{ color: 'var(--text-dim)', fontSize: '13px', fontWeight: '600' }}>Anonymous</div>
            <div style={{ color: 'var(--text-faint)', fontSize: '12px' }}>Composite reflection</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main component ─── */
export default function Voices() {
  const [visible, setVisible]     = useState(false);
  const [active, setActive]       = useState(0);
  const [direction, setDirection] = useState(1);
  const sectionRef = useRef(null);
  const tabRefs    = useRef([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const selectTab = useCallback((idx) => {
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
  }, [active]);

  const handleKeyDown = useCallback((e, idx) => {
    let next;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault(); next = (idx + 1) % stories.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault(); next = (idx - 1 + stories.length) % stories.length;
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); selectTab(idx); return;
    } else { return; }
    selectTab(next);
    tabRefs.current[next]?.focus();
  }, [selectTab]);

  useEffect(() => {
    tabRefs.current[active]?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'nearest', inline: 'center' });
  }, [active, reducedMotion]);

  const variants = {
    enter:  (dir) => ({ opacity: 0, x: reducedMotion ? 0 : dir * 40 }),
    center: { opacity: 1, x: 0 },
    exit:   (dir) => ({ opacity: 0, x: reducedMotion ? 0 : dir * -40 }),
  };

  return (
    <section
      id="voices"
      ref={sectionRef}
      style={{
        padding: 'clamp(60px, 8vw, 100px) 0',
        background: 'var(--bg-page-alt)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(196,122,58,0.2), transparent)',
      }} />

      {/* Section header */}
      <div style={{
        textAlign: 'center',
        padding: '0 clamp(16px, 4vw, 24px)',
        marginBottom: 'clamp(36px, 5vw, 52px)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 0.7s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '14px' }}>
          <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg, #c47a3a, #e8a87c)' }} />
          <span style={{ color: 'var(--amber-text)', fontSize: '13px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Shared Experiences
          </span>
          <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg, #e8a87c, #c47a3a)' }} />
        </div>
        <h2 style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: 'clamp(28px, 5vw, 48px)',
          fontWeight: '800', margin: '0 0 12px',
          letterSpacing: '-1px', color: 'var(--text-primary)',
        }}>
          When Silence{' '}
          <span style={{
            background: 'var(--highlight-gradient)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>Finally Breaks</span>
        </h2>
        <p style={{ color: 'var(--text-dim)', fontSize: 'clamp(14px, 2vw, 16px)', maxWidth: '520px', margin: '0 auto', lineHeight: '1.7' }}>
          These reflections capture experiences commonly described by men in mental health literature.
        </p>
      </div>

      {/* Tab bar + panel */}
      <div style={{
        maxWidth: '900px', margin: '0 auto',
        padding: '0 clamp(16px, 4vw, 32px)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.7s ease 0.2s',
      }}>
        {/* Tab list */}
        <div
          role="tablist"
          aria-label="Story categories"
          style={{
            display: 'flex', gap: '8px',
            overflowX: 'auto', paddingBottom: '4px', marginBottom: '28px',
            scrollbarWidth: 'none', msOverflowStyle: 'none',
          }}
        >
          {stories.map((story, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                ref={(el) => (tabRefs.current[i] = el)}
                role="tab"
                aria-selected={isActive}
                aria-controls="voices-panel"
                id={`voices-tab-${i}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectTab(i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                style={{
                  flexShrink: 0,
                  padding: '8px 18px',
                  borderRadius: '8px',
                  border: `1px solid ${isActive ? story.color : 'var(--tab-border-inactive)'}`,
                  background: isActive ? `${story.color}15` : 'transparent',
                  color: isActive ? story.textColor : 'var(--text-dimmer)',
                  fontSize: '13px',
                  fontWeight: isActive ? '700' : '500',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.2px',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = `${story.color}40`;
                    e.currentTarget.style.color = story.hoverTextColor;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'var(--tab-border-inactive)';
                    e.currentTarget.style.color = 'var(--text-dimmer)';
                  }
                }}
              >
                {story.tag}
              </button>
            );
          })}
        </div>

        {/* Tab panel */}
        <div
          id="voices-panel"
          role="tabpanel"
          aria-labelledby={`voices-tab-${active}`}
          tabIndex={0}
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: reducedMotion ? 0 : 0.35, ease: 'easeInOut' }}
            >
              <StoryPanel story={stories[active]} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{
        maxWidth: '860px', margin: 'clamp(28px, 4vw, 40px) auto 0',
        padding: '0 clamp(16px, 4vw, 24px)',
        opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease 0.8s',
      }}>
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
          borderRadius: '12px', padding: '14px 18px',
          display: 'flex', gap: '10px', alignItems: 'flex-start',
        }}>
          <p style={{ color: 'var(--text-faint)', fontSize: '12px', lineHeight: '1.7', margin: 0, fontStyle: 'italic' }}>
            <strong style={{ color: 'var(--highlight-emphasis-subtle)', fontStyle: 'normal' }}>Disclaimer:</strong>{' '}
            Composite reflections based on common experiences described in mental health literature — not direct quotes from named individuals.
          </p>
        </div>
      </div>
    </section>
  );
}
