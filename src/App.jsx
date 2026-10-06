import { useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnimationLayer from './components/AnimationLayer';
import IntroSplash from './components/IntroSplash';

/* ── Pages ── */
import Home from './pages/Home';
import About from './pages/About';

/* ─────────────────────────────────────────────────────────
   ScrollToTop
   Scrolls to (0,0) on every client-side route change.
   Strips any hash so anchors don't auto-scroll on navigation.
   Does NOT run on first mount when the intro is active —
   the intro overlay covers everything, so the reset happens
   via a separate post-intro callback instead.
   ───────────────────────────────────────────────────────── */
function ScrollToTop({ introActive }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (introActive) return; // intro handles its own scroll reset
    window.history.replaceState(null, '', pathname); // strip hash
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, introActive]);

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

  return !alreadySeen && !prefersReduced && onHomepage;
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
    <BrowserRouter>
        <div style={{ background: '#0f0d0b', minHeight: '100vh', position: 'relative' }}>

          {/* Scroll-to-top on every client-side navigation */}
          <ScrollToTop introActive={showIntro} />

          <AnimationLayer />
          <Navbar introActive={showIntro} />

          <main style={{ position: 'relative', zIndex: 1 }}>
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
            <IntroSplash onComplete={handleIntroComplete} />
          )}

        </div>
    </BrowserRouter>
  );
}
