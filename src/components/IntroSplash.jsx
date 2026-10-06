import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Timings (ms) ──────────────────────────────────────────
   T_PAUSE   200   pause before stroke starts
   T_DRAW   1800   path draws itself
   T_HOLD   1800   hold fully drawn
   T_FLY     850   shield flies to navbar
   T_FADE    500   overlay fades out (starts with fly)
   ────────────────────────────────────────────────────────── */
const T_PAUSE = 200;
const T_DRAW  = 1800;
const T_HOLD  = 1800;
const T_FLY   = 850;
const T_FADE  = 500;

const TS_FLY  = T_PAUSE + T_DRAW + T_HOLD;   // 3 800 ms
const TS_DONE = TS_FLY + T_FLY + 120;        // 4 770 ms

const SPLASH_SIZE   = 260;   // large centered SVG
const NAV_SIZE      = 36;    // navbar logo size

const SHIELD_PATH = `M 130 72
  L 96 86
  L 96 132
  C 96 162 112 180 130 190
  C 148 180 164 162 164 132
  L 164 86
  L 148 79.5`;

/* ── Measure where the navbar logo actually is ──────────────
   Called after scrollTo(0,0) so the navbar is at its real
   top-of-page position with no scroll offset.
   ────────────────────────────────────────────────────────── */
function getNavTarget() {
  // The navbar logo sits at: padding-left 24px, padding-top ~20px
  // Logo size: 36×36. We need its center.
  const navLeft = 24 + NAV_SIZE / 2;   // 42
  const navTop  = 20 + NAV_SIZE / 2;   // 38
  // Splash shield center = viewport center
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  return {
    x:     navLeft - cx,
    y:     navTop  - cy,
    scale: NAV_SIZE / SPLASH_SIZE,   // ≈ 0.138
  };
}

/* ── Drawing shield ─────────────────────────────────────── */
function DrawingShield({ size = SPLASH_SIZE }) {
  const measureRef = useRef(null);
  const [len, setLen] = useState(null);

  useLayoutEffect(() => {
    if (measureRef.current) setLen(measureRef.current.getTotalLength());
  }, []);

  return (
    <svg
      viewBox="0 0 260 260"
      width={size} height={size}
      aria-hidden="true"
      style={{ display: 'block', overflow: 'visible' }}
    >
      <circle cx="130" cy="130" r="90" fill="#1a1008" />
      <path d={SHIELD_PATH} fill="none" stroke="rgba(196,122,58,0.1)"
        strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />

      {len === null && (
        <path ref={measureRef} d={SHIELD_PATH}
          fill="none" stroke="transparent" strokeWidth="9" />
      )}

      {len !== null && (
        <motion.path
          d={SHIELD_PATH} fill="none" stroke="#c47a3a"
          strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"
          style={{
            strokeDasharray: len,
            filter: 'drop-shadow(0 0 10px rgba(196,122,58,0.75))',
          }}
          initial={{ strokeDashoffset: len }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: T_DRAW / 1000, delay: T_PAUSE / 1000, ease: 'easeInOut' }}
        />
      )}
    </svg>
  );
}

/* ── Main splash ────────────────────────────────────────── */
export default function IntroSplash({ onComplete }) {
  const [phase,   setPhase]   = useState('draw');  // 'draw' | 'fly' | 'done'
  const [visible, setVisible] = useState(true);
  const navTarget = useRef({ x: 0, y: 0, scale: 1 });

  useEffect(() => {
    // Lock body scroll + snap to top so the fixed overlay is
    // always perfectly centred on the visible screen.
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width    = '100%';

    // Measure navbar target now that scroll = 0
    navTarget.current = getNavTarget();

    const t1 = setTimeout(() => setPhase('fly'), TS_FLY);
    const t2 = setTimeout(() => {
      sessionStorage.setItem('hasSeenIntro', '1');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width    = '';
      window.scrollTo({ top: 0, behavior: 'instant' });
      setVisible(false);
      onComplete();
    }, TS_DONE);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width    = '';
    };
  }, [onComplete]);

  const nt = navTarget.current;
  const flying = phase === 'fly';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash-root"
          initial={{ opacity: 1 }}
          animate={{ opacity: flying ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: T_FADE / 1000, ease: 'easeInOut' }}
          style={{
            position: 'fixed', inset: 0,
            zIndex: 9999,
            background: '#0f0d0b',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: flying ? 'none' : 'auto',
          }}
        >
          {/* Shield — flies to navbar on 'fly' phase */}
          <motion.div
            style={{ flexShrink: 0, transformOrigin: 'center center' }}
            animate={flying
              ? { x: nt.x, y: nt.y, scale: nt.scale }
              : { x: 0,    y: 0,    scale: 1 }}
            transition={{ duration: T_FLY / 1000, ease: [0.4, 0, 0.2, 1] }}
          >
            <DrawingShield />
          </motion.div>

          {/* Wordmark below shield — fades in after draw, out during fly */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: flying ? 0 : 1,
              y: 0,
            }}
            transition={{
              opacity: { duration: 0.55, delay: flying ? 0 : (T_PAUSE + T_DRAW) / 1000 },
              y:       { duration: 0.55, delay: flying ? 0 : (T_PAUSE + T_DRAW) / 1000 },
            }}
            style={{ textAlign: 'center', marginTop: '28px' }}
          >
            <p style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: 'clamp(20px, 4vw, 28px)',
              fontWeight: '800',
              color: '#e8e0d5',
              letterSpacing: '-0.5px',
              margin: '0 0 10px',
              userSelect: 'none',
            }}>
              Armor Down
            </p>
            <p style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '13px',
              color: '#4a3f48',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              margin: 0,
              userSelect: 'none',
            }}>
              Men's Mental Health
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
