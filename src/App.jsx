import { useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { MotionConfig, useReducedMotion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnimationLayer from './components/AnimationLayer';
import IntroSplash from './components/IntroSplash';
import { ThemeProvider } from './context/ThemeContext';
import { scrollToSection } from './utils/sectionNavigation';

/* ── Pages ── */
import Home from './pages/Home';
import About from './pages/About';

/* ─────────────────────────────────────────────────────────
   ScrollToTop
   Scrolls to (0,0) on route changes, or to the requested section
   when navigation includes a hash.
   Does NOT run on first mount when the intro is active —
   the intro overlay covers everything, so the reset happens
   via a separate post-intro callback instead.
   ───────────────────────────────────────────────────────── */
function ScrollToTop({ introActive }) {
  const { pathname, hash } = useLocation();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (introActive) return; // intro handles its own scroll reset
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return undefined;
    }
    const frame = requestAnimationFrame(() => {
      scrollToSection(hash, reducedMotion);
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, introActive, reducedMotion]);

  return null;
}

/* ─────────────────────────────────────────────────────────
   shouldShowIntro()
   Returns true only when:
     • sessionStorage hasn't recorded a prior view, AND
     • the user has NOT set prefers-reduced-motion
   ───────────────────────────────────────────────────────── */
function shouldShowIntro() {
  if (typeof window === 'undefined') return false;
  const alreadySeen    = sessionStorage.getItem('hasSeenIntro');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const onHomepage     = window.location.pathname === '/';

  if (!onHomepage && !alreadySeen) {
    // Session started on a non-home route — mark as seen so the
    // animation never fires if the user later navigates to "/".
    sessionStorage.setItem('hasSeenIntro', '1');
  }

  return !alreadySeen && !prefersReduced && onHomepage && !window.location.hash;
}

export default function App() {
  const [showIntro, setShowIntro] = useState(() => shouldShowIntro());

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
    // Once the overlay has fully cleared, snap to top and strip any
    // hash that may have caused the "Shared Experiences" auto-scroll.
    window.history.replaceState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <AppShell showIntro={showIntro} onIntroComplete={handleIntroComplete} />
        </BrowserRouter>
      </MotionConfig>
    </ThemeProvider>
  );
}

function AppShell({ showIntro, onIntroComplete }) {
  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh', position: 'relative' }}>
      <a className="skip-link" href="#main-content">Skip to main content</a>

      {/* Scroll-to-top on every client-side navigation */}
      <ScrollToTop introActive={showIntro} />

      <AnimationLayer />
      <Navbar />

      <main id="main-content" tabIndex={-1} style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/"      element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* Any unknown path (including sub-routes after a hard refresh)
              redirects to the homepage without resetting sessionStorage */}
          <Route path="*"      element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

      {showIntro && (
        <IntroSplash onComplete={onIntroComplete} />
      )}
    </div>
  );
}
