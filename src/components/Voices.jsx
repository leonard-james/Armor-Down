import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  {
    img: dontImg,
    alt: 'Person holding back emotions',
    quote: 'Every time someone said "just don\'t think about it," I felt more invisible. My feelings weren\'t something I could switch off.',
    tag: 'Invalidation',
    color: '#f59e0b',
  },
  {
    img: depressImg,
    alt: 'Person overwhelmed by depression',
    quote: 'Depression didn\'t look like sadness for me. It looked like numbness — going through the motions while feeling nothing at all.',
    tag: 'Hidden Struggles',
    color: '#ef4444',
  },
  {
    img: standImg,
    alt: 'Person standing up with determination',
    quote: 'I used to think healing meant never struggling again. Now I know it just means I keep standing back up.',
    tag: 'Moving Forward',
    color: '#22c55e',
  },
];

/* ─── Full-width single card shown in tab panel ─── */
function StoryPanel({ story }) {
  return (
    <div
      role="tabpanel"
      aria-label={story.tag}
      style={{
        background: '#0d1117',
        border: `1px solid ${story.color}25`,
        borderRadius: '20px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: `0 24px 64px ${story.color}10`,
      }}
    >
      {/* Photo — taller since it has full width */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 'clamp(240px, 35vw, 420px)', flexShrink: 0 }}>
        <img
          src={story.img}
          alt={story.alt}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            display: 'block',
            filter: 'brightness(0.68) saturate(0.75)',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, #0d1117 0%, rgba(13,17,23,0.3) 50%, transparent 100%)',
          pointerEvents: 'none',
        }} />
        {/* Category tag */}
        <div style={{
          position: 'absolute', top: '20px', left: '20px',
          background: `${story.color}22`,
          border: `1px solid ${story.color}55`,
          backdropFilter: 'blur(10px)',
          borderRadius: '8px',
          padding: '5px 14px',
        }}>
          <span style={{ color: story.color, fontSize: '11px', fontWeight: '700', letterSpacing: '1.2px', textTransform: 'uppercase' }}>
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
          color: story.color, opacity: 0.3,
          marginBottom: '16px', userSelect: 'none',
        }}>"</div>
        <p style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          color: '#cbd5e1',
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
          background: `linear-gradient(90deg, ${story.color}40, transparent)`,
          marginBottom: '20px',
          maxWidth: '300px',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '50%',
            background: `${story.color}15`, border: `1px solid ${story.color}35`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px', flexShrink: 0,
          }} />
          <div>
            <div style={{ color: '#64748b', fontSize: '13px', fontWeight: '600' }}>Anonymous</div>
            <div style={{ color: '#334155', fontSize: '12px' }}>Composite reflection</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main component ─── */
export default function Voices() {
  const [visible, setVisible]   = useState(false);
  const [active, setActive]     = useState(0);
  const [direction, setDirection] = useState(1); // +1 = forward, -1 = back
  const sectionRef  = useRef(null);
  const tabListRef  = useRef(null);
  const tabRefs     = useRef([]);

  /* Section enter animation (one-shot is fine for the header) */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* Switch tab — track direction for slide animation */
  const selectTab = useCallback((idx) => {
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
  }, [active]);

  /* Keyboard navigation: arrow keys move focus, Enter/Space select */
  const handleKeyDown = useCallback((e, idx) => {
    let next = idx;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      next = (idx + 1) % stories.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      next = (idx - 1 + stories.length) % stories.length;
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectTab(idx);
      return;
    } else {
      return;
    }
    tabRefs.current[next]?.focus();
  }, [selectTab]);

  /* Scroll active tab into view on mobile when it changes */
  useEffect(() => {
    tabRefs.current[active]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [active]);

  /* Framer Motion variants — subtle slide + fade */
  const variants = {
    enter:  (dir) => ({ opacity: 0, x: dir * 40 }),
    center: { opacity: 1, x: 0 },
    exit:   (dir) => ({ opacity: 0, x: dir * -40 }),
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

      {/* ── Section header ── */}
      <div style={{
        textAlign: 'center',
        padding: '0 clamp(16px, 4vw, 24px)',
        marginBottom: 'clamp(36px, 5vw, 52px)',
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

      {/* ── Tab bar + panel ── */}
      <div style={{
        maxWidth: '900px', margin: '0 auto',
        padding: '0 clamp(16px, 4vw, 32px)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.7s ease 0.2s',
      }}>

        {/* Tab list — horizontally scrollable on mobile */}
        <div
          role="tablist"
          aria-label="Story categories"
          ref={tabListRef}
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '4px',
            marginBottom: '28px',
            scrollbarWidth: 'none',        /* Firefox */
            msOverflowStyle: 'none',       /* IE/Edge */
          }}
        >
          <style>{`.voices-tablist::-webkit-scrollbar { display: none; }`}</style>

          {stories.map((story, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                ref={el => tabRefs.current[i] = el}
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
                  border: `1px solid ${isActive ? story.color : 'rgba(255,255,255,0.08)'}`,
                  background: isActive ? `${story.color}18` : 'transparent',
                  color: isActive ? story.color : '#475569',
                  fontSize: '13px',
                  fontWeight: isActive ? '700' : '500',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  letterSpacing: '0.2px',
                  /* focus-visible ring */
                  boxShadow: 'none',
                }}
                onFocus={(e) => { e.currentTarget.style.boxShadow = `0 0 0 2px ${story.color}60`; }}
                onBlur={(e)  => { e.currentTarget.style.boxShadow = 'none'; }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = `${story.color}50`;
                    e.currentTarget.style.color = `${story.color}cc`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.color = '#475569';
                  }
                }}
              >
                {story.tag}
              </button>
            );
          })}
        </div>

        {/* Tab panel — AnimatePresence handles cross-fade */}
        <div
          id="voices-panel"
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
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <StoryPanel story={stories[active]} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Disclaimer ── */}
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
          <span style={{ fontSize: '14px', flexShrink: 0, marginTop: '1px' }} />
          <p style={{ color: '#334155', fontSize: '12px', lineHeight: '1.7', margin: 0, fontStyle: 'italic' }}>
            <strong style={{ color: '#475569', fontStyle: 'normal' }}>Disclaimer:</strong>{' '}
            Composite reflections based on common experiences described in mental health literature — not direct quotes from named individuals.
          </p>
        </div>
      </div>
    </section>
  );
}
