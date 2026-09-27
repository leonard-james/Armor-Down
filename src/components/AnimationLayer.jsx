import { useEffect, useRef, useState } from 'react';

/* ─── 1. FLOATING AMBIENT ORBS (canvas-based) ─── */
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

    // Warm amber/sienna only — no blue, no green
    const colors = ['196,122,58', '160,82,45', '139,107,78', '196,122,58'];
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
        orb.x += orb.vx;
        orb.y += orb.vy;
        orb.phase += 0.005;

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

/* ─── 2. SCROLL-TO-TOP BUTTON ─── */
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
      className="scroll-top-btn"
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #c47a3a, #e8a87c)',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        zIndex: 9990,
        boxShadow: '0 8px 28px rgba(196,122,58,0.35)',
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
        opacity: visible ? 1 : 0,
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        pointerEvents: visible ? 'auto' : 'none',
        color: '#1a1008',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px) scale(1.1)';
        e.currentTarget.style.boxShadow = '0 16px 36px rgba(196,122,58,0.55)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 8px 28px rgba(196,122,58,0.35)';
      }}
    >
      ↑
    </button>
  );
}

/* ─── 3. SECTION REVEAL OBSERVER ─── */
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
      <ScrollToTop />
      <SectionReveal />
    </>
  );
}
