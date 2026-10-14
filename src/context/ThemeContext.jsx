import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const ThemeContext = createContext(null);
const STORAGE_KEY = 'armor-down-theme';

function readStoredTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch { /* storage unavailable */ }
  return 'dark';
}

function writeStoredTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch { /* storage unavailable */ }
}

export function ThemeProvider({ children }) {
  // Initialize from localStorage — must match what the inline script applied
  const [theme, setTheme] = useState(() => readStoredTheme());

  // toggleCount tracks manual user clicks for the shield animation trigger.
  // We use a ref instead of state so it doesn't cause a re-render by itself.
  const toggleCountRef = useRef(0);
  // Expose a state version for consumers that need to re-render on toggle
  const [animKey, setAnimKey] = useState(0);

  // Apply data-theme to <html> whenever theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    writeStoredTheme(theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      return next;
    });
    // Bump animKey so Navbar's shield redraw fires only on manual clicks
    toggleCountRef.current += 1;
    setAnimKey(k => k + 1);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle, animKey }}>
      {children}
    </ThemeContext.Provider>
  );
}

// This hook is intentionally exported alongside the provider.
// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
