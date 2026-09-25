import { useEffect, useRef, useState } from 'react';

/* ─── 1. SCROLL PROGRESS BAR ─── */
function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      height: '3px', zIndex: 9999, pointerEvents: 'none',
      background: 'rgba(255,255,255,0.05)',
    }}>
      <div style={{
        height: '100%',
        width: `${progress}%`,
        background: 'linear-gradient(90deg, #3b82f6, #14b8a6, #8b5cf6)',
        transition: 'width 0.1s linear',
        boxShadow: '0 0 10px rgba(59,130,246,0.8), 0 0 20px rgba(20,184,166,0.4)',
      }} />
    </div>
  );
}

/* ─── 2. CURSOR TRAIL ─── */
function CursorTrail() {
  const trailRef = useRef([]);
  const dotsRef = useRef([]);
  const mouseRef = useRef({ x: -200, y: -200 });
  const rafRef = useRef(null);
  const containerRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  const TRAIL_LENGTH = 16;

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches);
  }, []);

  useEffect(() => {
    if (isTouch) return;
    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    // Init trail positions
    trailRef.current = Array.from({ length: TRAIL_LENGTH }, () => ({ x: -200, y: -200 }));

    const animate = () => {
      const mouse = mouseRef.current;
      const trail = trailRef.current;

      // First dot follows mouse directly
      trail[0].x += (mouse.x - trail[0].x) * 0.35;
      trail[0].y += (mouse.y - trail[0].y) * 0.35;

      // Each subsequent dot follows the previous
      for (let i = 1; i < TRAIL_LENGTH; i++) {
        trail[i].x += (trail[i - 1].x - trail[i].x) * 0.45;
        trail[i].y += (trail[i - 1].y - trail[i].y) * 0.45;
      }

      // Update DOM
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        const t = 1 - i / TRAIL_LENGTH;
        const size = 6 * t + 2;
        dot.style.transform = `translate(${trail[i].x - size / 2}px, ${trail[i].y - size / 2}px)`;
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.opacity = t * 0.6;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9998 }}>
      {Array.from({ length: TRAIL_LENGTH }, (_, i) => (
        <div
          key={i}
          ref={(el) => (dotsRef.current[i] = el)}
          style={{
            position: 'fixed',
            top: 0, left: 0,
            borderRadius: '50%',
            background: i % 2 === 0
              ? `rgba(59,130,246,${0.8 - i * 0.04})`
              : `rgba(20,184,166,${0.8 - i * 0.04})`,
            pointerEvents: 'none',
            willChange: 'transform',
            mixBlendMode: 'screen',
          }}
        />
      ))}
    </div>
  );
}

/* ─── 3. RIPPLE ON CLICK ─── */
function RippleEffect() {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const onClick = (e) => {
      const id = Date.now() + Math.random();
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 900);
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9997, overflow: 'hidden' }}>
      {ripples.map((r) => (
        <div
          key={r.id}
          style={{
            position: 'fixed',
            left: r.x,
            top: r.y,
            width: '6px',
            height: '6px',
            marginLeft: '-3px',
            marginTop: '-3px',
            borderRadius: '50%',
            border: '2px solid rgba(59,130,246,0.7)',
            animation: 'rippleExpand 0.9s cubic-bezier(0.2, 0.6, 0.4, 1) forwards',
            pointerEvents: 'none',
          }}
        />
      ))}
    </div>
  );
}

/* ─── 4. FLOATING AMBIENT ORBS (canvas-based) ─── */
function AmbientOrbs() {
  const canvasRef = useRef(null);
  const orbsRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Init orbs
    const colors = ['59,130,246', '20,184,166', '139,92,246', '59,130,246'];
    orbsRef.current = Array.from({ length: 5 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 180 + 100,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      color: colors[i % colors.length],
      opacity: Math.random() * 0.04 + 0.02,
      phase: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      orbsRef.current.forEach((orb) => {
        // Move
        orb.x += orb.vx;
        orb.y += orb.vy;
        orb.phase += 0.005;

        // Bounce
        if (orb.x < -orb.r) orb.x = canvas.width + orb.r;
        if (orb.x > canvas.width + orb.r) orb.x = -orb.r;
        if (orb.y < -orb.r) orb.y = canvas.height + orb.r;
        if (orb.y > canvas.height + orb.r) orb.y = -orb.r;

        const pulse = orb.opacity + Math.sin(orb.phase) * 0.01;
        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        grad.addColorStop(0, `rgba(${orb.color},${pulse})`);
        grad.addColorStop(1, `rgba(${orb.color},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 1,
      }}
    />
  );
}

/* ─── 5. SCROLL-TO-TOP BUTTON ─── */
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #3b82f6, #14b8a6)',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        zIndex: 9990,
        boxShadow: '0 8px 32px rgba(59,130,246,0.4)',
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
        opacity: visible ? 1 : 0,
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px) scale(1.1)';
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(59,130,246,0.6)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(59,130,246,0.4)';
      }}
    >
      ↑
    </button>
  );
}

/* ─── 6. SECTION REVEAL OBSERVER ─── */
function SectionReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            entry.target.classList.remove('section-hidden');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    // Observe all sections EXCEPT the myths section (flip cards break with transform)
    const targets = document.querySelectorAll('section:not(#myths)');
    targets.forEach((el) => {
      if (!el.classList.contains('section-visible')) {
        el.classList.add('section-hidden');
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return null;
}

/* ─── MASTER EXPORT ─── */
export default function AnimationLayer() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches);
  }, []);

  return (
    <>
      {!isTouch && <AmbientOrbs />}
      <ScrollProgressBar />
      {!isTouch && <CursorTrail />}
      {!isTouch && <RippleEffect />}
      <ScrollToTop />
      <SectionReveal />
    </>
  );
}
