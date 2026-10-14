import { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';

/* ════════════════════════════════════════════════
   PALETTE
════════════════════════════════════════════════ */
const MEN_COLOR   = '#c47a3a';
const WOMEN_COLOR = '#e8a87c';

/* ════════════════════════════════════════════════
   AnimKey Context
   Lets bar shapes read the replay key from context
   instead of props — Recharts strips unknown props.
════════════════════════════════════════════════ */
const AnimKeyCtx = createContext(0);

/* ════════════════════════════════════════════════
   useScrollTrigger
   once: false → retriggers on every scroll-in.
════════════════════════════════════════════════ */
function useScrollTrigger(amount = 0.3) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: false, amount });
  return { ref, inView };
}

/* ════════════════════════════════════════════════
   useCountUp
   Counts 0→target when trigger=true.
   Resets to 0 when trigger=false (ready to replay).
════════════════════════════════════════════════ */
function useCountUp(target, trigger, duration = 900, decimals = 0) {
  const [value, setValue] = useState(0);
  const rafRef  = useRef(null);
  const startTs = useRef(null);
  const reducedMotion = useReducedMotion();

  const cancel = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    startTs.current = null;
  }, []);

  useEffect(() => {
    if (!trigger || reducedMotion) { cancel(); return; }
    cancel();
    const tick = (ts) => {
      if (!startTs.current) startTs.current = ts;
      const p     = Math.min((ts - startTs.current) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const v     = target * eased;
      setValue(decimals > 0 ? parseFloat(v.toFixed(decimals)) : Math.round(v));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return cancel;
  }, [trigger, target, duration, decimals, cancel, reducedMotion]);

  return reducedMotion ? (trigger ? target : 0) : trigger ? value : 0;
}

/* ════════════════════════════════════════════════
   Animated radial ring — replays on every scroll-in
════════════════════════════════════════════════ */
function RadialRing({ percent, color, textColor, size = 120, stroke = 10, label, sublabel, isVisible, delay = 0 }) {
  const [prog, setProg] = useState(0);
  const r    = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const rafRef  = useRef(null);
  const timerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // always cancel any running animation first
    if (rafRef.current)  cancelAnimationFrame(rafRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);

    if (!isVisible || reducedMotion) return undefined;

    const duration = 1600;
    timerRef.current = setTimeout(() => {
      setProg(0);
      let start = null;
      const animate = (ts) => {
        if (!start) start = ts;
        const t    = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        setProg(percent * ease);
        if (t < 1) rafRef.current = requestAnimationFrame(animate);
      };
      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      if (rafRef.current)  cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isVisible, percent, delay, reducedMotion]);
  const displayedProgress = reducedMotion ? percent : isVisible ? prog : 0;
  const offset = circ - (displayedProgress / 100) * circ;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={`${color}18`} strokeWidth={stroke} />
          <circle
            cx={size/2} cy={size/2} r={r} fill="none"
            stroke={color} strokeWidth={stroke} strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={offset}
            style={{ filter: `drop-shadow(0 0 6px ${color}90)` }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'Sora, sans-serif', fontSize: size * 0.2, fontWeight: '800', color: textColor, lineHeight: 1, filter: `drop-shadow(0 0 8px ${color}60)` }}>
            {label}
          </span>
        </div>
      </div>
      <p style={{ color: 'var(--text-dim)', fontSize: '12px', fontWeight: '500', textAlign: 'center', margin: 0, maxWidth: size }}>
        {sublabel}
      </p>
    </div>
  );
}

/* ════════════════════════════════════════════════
   Animated counter — replays on every scroll-in
════════════════════════════════════════════════ */
function Counter({ target, suffix = '', isVisible, delay = 0 }) {
  const [val, setVal] = useState(0);
  const rafRef   = useRef(null);
  const timerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (rafRef.current)   cancelAnimationFrame(rafRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);

    if (!isVisible || reducedMotion) return undefined;

    const duration = 1800;
    timerRef.current = setTimeout(() => {
      setVal(0);
      let start = null;
      const animate = (ts) => {
        if (!start) start = ts;
        const t    = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        setVal(Math.round(target * ease));
        if (t < 1) rafRef.current = requestAnimationFrame(animate);
      };
      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      if (rafRef.current)   cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isVisible, target, delay, reducedMotion]);

  return <>{reducedMotion ? target : isVisible ? val : 0}{suffix}</>;
}

/* ════════════════════════════════════════════════
   Chart tooltip
════════════════════════════════════════════════ */
function ChartTooltip({ active, payload, label, unit = '' }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)',
      borderRadius: '10px', padding: '10px 16px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.35)', pointerEvents: 'none',
    }}>
      <p style={{ color: 'var(--text-muted)', fontSize: '12px', margin: '0 0 5px', fontWeight: '600' }}>{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.payload.textColor, fontSize: '15px', fontWeight: '800', margin: '2px 0', fontFamily: 'Sora, sans-serif' }}>
          {entry.value}{unit}
          <span style={{ color: 'var(--text-dimmer)', fontSize: '11px', fontWeight: '500', marginLeft: '6px' }}>{entry.name}</span>
        </p>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════
   Bar shape factories
   Read animKey from context so Recharts prop-stripping
   doesn't break the replay logic.
════════════════════════════════════════════════ */
function makeBarShape(transition) {
  function AnimatedBarShape({ x, y, width, height, fill }) {
    const animKey = useContext(AnimKeyCtx);
    const h = height > 0 ? height : 0;
    return (
      <motion.rect
        key={animKey}
        x={x} width={width} rx={5} fill={fill}
        initial={{ y: y + h, height: 0 }}
        animate={{ y, height: h }}
        transition={transition}
      />
    );
  }
  AnimatedBarShape.displayName = 'AnimatedBarShape';
  return AnimatedBarShape;
}

const BarShapeSnappy = makeBarShape({ duration: 0.85, ease: [0.16, 1, 0.3, 1] });
const BarShapeSmooth = makeBarShape({ duration: 1.1,  ease: 'easeOut' });

function SuicideLegend() {
  return (
    <div style={{ display: 'flex', gap: '16px', marginBottom: '14px', flexWrap: 'wrap' }}>
      {[
        { label: 'Men (Global)',   color: MEN_COLOR   },
        { label: 'Women (Global)', color: WOMEN_COLOR },
        { label: 'Men (PH)',       color: '#a0522d'   },
        { label: 'Women (PH)',     color: '#d4956a'   },
      ].map(l => (
        <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: l.color }} />
          <span style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: '600' }}>{l.label}</span>
        </div>
      ))}
    </div>
  );
}

function ChartLegend() {
  return (
    <div style={{ display: 'flex', gap: '20px', marginBottom: '14px' }}>
      {[{ label: 'Men', color: MEN_COLOR }, { label: 'Women', color: WOMEN_COLOR }].map(l => (
        <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: l.color }} />
          <span style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: '600' }}>{l.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════
   CHART 1 — Help-seeking (%)
════════════════════════════════════════════════ */
const helpRawData = [
  { group: 'Men',   value: 41.6, fill: MEN_COLOR, textColor: 'var(--highlight-amber)' },
  { group: 'Women', value: 56.9, fill: WOMEN_COLOR, textColor: 'var(--highlight-amber-lt)' },
];

function HelpSeekingChart() {
  const { ref, inView } = useScrollTrigger(0.3);
  const [animKey, setAnimKey] = useState(0);
  const wasInView = useRef(false);
  useEffect(() => {
    if (inView && !wasInView.current) setAnimKey(k => k + 1);
    wasInView.current = inView;
  }, [inView]);

  const menVal   = useCountUp(41.6, inView, 850, 1);
  const womenVal = useCountUp(56.9, inView, 850, 1);
  const displayVals = { Men: menVal, Women: womenVal };

  return (
    <AnimKeyCtx.Provider value={animKey}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          background: 'var(--bg-panel)', border: '1px solid rgba(196,122,58,0.18)',
          borderRadius: '24px', padding: 'clamp(20px, 3vw, 36px)', boxSizing: 'border-box',
        }}
      >
        <p style={{ color: 'var(--text-dimmer)', fontSize: '12px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 4px' }}>
          Help-seeking behaviour
        </p>
        <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(17px, 2.5vw, 24px)', fontWeight: '800', color: 'var(--text-primary)', margin: '0 0 6px', letterSpacing: '-0.4px' }}>
          Men vs Women —{' '}
          <span style={{ background: 'var(--highlight-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Who seeks help? (%)
          </span>
        </h3>
        <p style={{ color: 'var(--text-dim)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 22px' }}>
          Percentage of US adults with any mental illness who received mental health treatment in the past year (2022).
        </p>

        <ChartLegend />

        {/* Count-up numbers */}
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px' }}>
          {helpRawData.map(d => (
            <div key={d.group} style={{ textAlign: 'center' }}>
              <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '900', color: d.textColor, filter: `drop-shadow(0 0 10px ${d.fill}55)` }}>
                {displayVals[d.group]}%
              </span>
              <p style={{ color: 'var(--text-dimmer)', fontSize: '12px', margin: '2px 0 0', fontWeight: '600' }}>{d.group}</p>
            </div>
          ))}
        </div>

        <div style={{ width: '100%', height: '200px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={helpRawData} margin={{ top: 4, right: 16, left: 0, bottom: 4 }} barCategoryGap="38%">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
              <XAxis dataKey="group" tick={{ fill: 'var(--text-dim)', fontSize: 13, fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tickFormatter={v => `${v}%`} tick={{ fill: 'var(--text-dimmer)', fontSize: 11 }} axisLine={false} tickLine={false} width={36} />
              <Tooltip content={<ChartTooltip unit="%" />} cursor={{ fill: 'var(--badge-bg)' }} />
              <Bar dataKey="value" name="seeking help" shape={<BarShapeSnappy />} maxBarSize={80} isAnimationActive={false}>
                {helpRawData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p style={{ color: 'var(--text-faint)', fontSize: '11px', marginTop: '14px', marginBottom: 0, fontStyle: 'italic' }}>
          Source: NIMH, using SAMHSA National Survey on Drug Use and Health data (2022). See reference [5]. Among US adults with any mental illness: 41.6% of men vs. 56.9% of women received mental health treatment.
        </p>
      </motion.div>
    </AnimKeyCtx.Provider>
  );
}

/* ════════════════════════════════════════════════
   CHART 2 — Suicide Rate (per 100,000)
════════════════════════════════════════════════ */
const suicideRawData = [
  { group: 'Men (Global)',   value: 12.3, fill: MEN_COLOR, textColor: 'var(--highlight-amber)' },
  { group: 'Women (Global)', value: 5.6,  fill: WOMEN_COLOR, textColor: 'var(--highlight-amber-lt)' },
  { group: 'Men (PH)',       value: 6.1,  fill: '#a0522d', textColor: 'var(--highlight-rust)' },
  { group: 'Women (PH)',     value: 2.1,  fill: '#d4956a', textColor: 'var(--highlight-peach)' },
];

function SuicideRateChart() {
  const { ref, inView } = useScrollTrigger(0.3);
  const [animKey, setAnimKey] = useState(0);
  const wasInView = useRef(false);
  useEffect(() => {
    if (inView && !wasInView.current) setAnimKey(k => k + 1);
    wasInView.current = inView;
  }, [inView]);

  const menVal   = useCountUp(12.3, inView, 1100, 1);
  const womenVal = useCountUp(5.6,  inView, 1100, 1);
  const displayVals = { 'Men (Global)': menVal, 'Women (Global)': womenVal };

  return (
    <AnimKeyCtx.Provider value={animKey}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.08 }}
        style={{
          background: 'var(--bg-panel)', border: '1px solid rgba(192,80,77,0.15)',
          borderRadius: '24px', padding: 'clamp(20px, 3vw, 36px)', boxSizing: 'border-box',
        }}
      >
        <p style={{ color: 'var(--text-dimmer)', fontSize: '12px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 4px' }}>
          Sensitive data — handle with care
        </p>
        <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(17px, 2.5vw, 24px)', fontWeight: '800', color: 'var(--text-primary)', margin: '0 0 6px', letterSpacing: '-0.4px' }}>
          Suicide rate comparison{' '}
          <span style={{ color: 'var(--highlight-red)', fontSize: '0.65em', fontWeight: '600' }}>per 100,000</span>
        </h3>
        <p style={{ color: 'var(--text-dim)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 22px' }}>
          Global and Philippines suicide rates by sex per 100,000 population (WHO Global Health Estimates, 2021 data). Men die by suicide at more than twice the rate of women worldwide.
        </p>

        <SuicideLegend />

        {/* Count-up numbers — global figures only */}
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px' }}>
          {suicideRawData.filter(d => d.group.includes('Global')).map(d => (
            <div key={d.group} style={{ textAlign: 'center' }}>
              <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '900', color: d.textColor, filter: `drop-shadow(0 0 10px ${d.fill}55)` }}>
                {displayVals[d.group]}
              </span>
              <p style={{ color: 'var(--text-dimmer)', fontSize: '12px', margin: '2px 0 0', fontWeight: '600' }}>{d.group}</p>
            </div>
          ))}
        </div>
        <p style={{ color: 'var(--text-faint)', fontSize: '11px', margin: '0 0 10px', fontStyle: 'italic', textAlign: 'center' }}>
          Philippines (2021): Men 6.1 · Women 2.1 per 100,000 — Source: WHO via Our World in Data, 2021 (see reference [6])
        </p>

        <div style={{ width: '100%', height: '200px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={suicideRawData} margin={{ top: 4, right: 16, left: 0, bottom: 4 }} barCategoryGap="38%">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
              <XAxis dataKey="group" tick={{ fill: 'var(--text-dim)', fontSize: 13, fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis
                domain={[0, 16]} tick={{ fill: 'var(--text-dimmer)', fontSize: 11 }}
                axisLine={false} tickLine={false} width={28}
                label={{ value: 'per 100k', angle: -90, position: 'insideLeft', offset: 12, fill: 'var(--text-faint)', fontSize: 10 }}
              />
              <Tooltip content={<ChartTooltip unit=" per 100k" />} cursor={{ fill: 'var(--badge-bg)' }} />
              <Bar dataKey="value" name="suicide rate" shape={<BarShapeSmooth />} maxBarSize={80} isAnimationActive={false}>
                {suicideRawData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ marginTop: '14px', padding: '12px 16px', background: 'rgba(192,80,77,0.06)', border: '1px solid rgba(192,80,77,0.14)', borderRadius: '10px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', lineHeight: '1.6', margin: 0 }}>
            Men account for a significantly higher proportion of suicide deaths globally.
            These numbers are a call to action — not a reflection of weakness.
          </p>
        </div>

        <p style={{ color: 'var(--text-faint)', fontSize: '11px', marginTop: '12px', marginBottom: 0, fontStyle: 'italic' }}>
          Source: WHO Global Health Estimates (2021), via Our World in Data. Global — Men 12.3, Women 5.6 per 100,000. Philippines — Men 6.1, Women 2.1 per 100,000. See references [1] and [6].
        </p>
      </motion.div>
    </AnimKeyCtx.Provider>
  );
}

/* ════════════════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════════════════ */
export default function Statistics() {
  const { ref, inView: visible } = useScrollTrigger(0.1);

  return (
    <section
      id="statistics"
      ref={ref}
      style={{
        padding: 'clamp(60px, 8vw, 100px) clamp(16px, 4vw, 24px)',
        background: 'linear-gradient(180deg, var(--bg-page) 0%, var(--bg-page-alt) 50%, var(--bg-page) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(196,122,58,0.2), transparent)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(122,158,126,0.15), transparent)' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* ── Section header ── */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 70px)' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px',
            opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease',
          }}>
            <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg, #c47a3a, #e8a87c)' }} />
            <span style={{ color: 'var(--amber-text)', fontSize: '13px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>The hard numbers</span>
            <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg, #e8a87c, #c47a3a)' }} />
          </div>
          <h2 style={{
            fontFamily: 'Sora, sans-serif', fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: '800',
            margin: '0 0 12px', letterSpacing: '-1px', color: 'var(--text-primary)',
            opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease 0.1s',
          }}>
            The silent crisis in{' '}
            <span style={{ background: 'var(--highlight-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>numbers</span>
          </h2>
          <p style={{
            color: 'var(--text-dim)', fontSize: 'clamp(14px, 2vw, 17px)', maxWidth: '540px', margin: '0 auto', lineHeight: '1.7',
            opacity: visible ? 1 : 0, transition: 'all 0.7s ease 0.2s',
          }}>
            Data-driven evidence of the mental health crisis facing men globally and in the Philippines.
          </p>
        </div>

        <div style={{
          marginBottom: '24px',
          padding: 'clamp(16px, 3vw, 24px)',
          background: 'var(--bg-panel)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          overflowX: 'auto',
        }}>
          <h3 id="statistics-data-heading" style={{
            color: 'var(--text-secondary)', fontFamily: 'Sora, sans-serif',
            fontSize: '18px', margin: '0 0 14px',
          }}>
            Statistics in text
          </h3>
          <table aria-labelledby="statistics-data-heading" style={{
            width: '100%', borderCollapse: 'collapse', color: 'var(--text-muted)',
            fontSize: '13px', lineHeight: '1.5', textAlign: 'left',
          }}>
            <thead>
              <tr>
                {['Measure', 'Men', 'Women', 'Source'].map((heading) => (
                  <th key={heading} scope="col" style={{
                    padding: '10px 8px', color: 'var(--text-secondary)',
                    borderBottom: '1px solid var(--border-divider)',
                  }}>{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['U.S. adults with mental illness who received treatment (2022)', '41.6%', '56.9%', [['Reference [5]: NIMH statistics', 'reference-5']]],
                ['UK men who felt depressed and told someone (2016)', '50%', '67%', [['Reference [3]: CALM Masculinity Audit', 'reference-3']]],
                ['UK men who had never discussed their mental health', '40%', '—', [['Reference [4]: Priory Group survey', 'reference-4']]],
                ['Suicide deaths per 100,000 worldwide (2021)', '12.3', '5.6', [['Reference [1]: WHO estimates', 'reference-1'], ['Reference [6]: Our World in Data', 'reference-6']]],
                ['Suicide deaths per 100,000 in the Philippines (2021)', '6.1', '2.1', [['Reference [6]: Our World in Data', 'reference-6']]],
                ['Male-to-female suicide-rate ratio worldwide (2021)', '2.2×', '—', [['Reference [1]: WHO estimates', 'reference-1'], ['Reference [6]: Our World in Data', 'reference-6']]],
                ['U.S. men affected by depression annually', '6 million', '—', [['Reference [5]: NIMH statistics', 'reference-5']]],
                ['Global life-expectancy difference (2021)', '5 years shorter', '—', [['Reference [6]: Our World in Data', 'reference-6']]],
                ['Male-to-female suicide-rate ratio in the Philippines (2021)', '2.9×', '—', [['Reference [6]: Our World in Data', 'reference-6']]],
              ].map(([measure, men, women, sources]) => (
                <tr key={measure}>
                  <th scope="row" style={{ padding: '10px 8px', fontWeight: '500', borderBottom: '1px solid var(--border-divider)' }}>{measure}</th>
                  <td style={{ padding: '10px 8px', borderBottom: '1px solid var(--border-divider)' }}>{men}</td>
                  <td style={{ padding: '10px 8px', borderBottom: '1px solid var(--border-divider)' }}>{women}</td>
                  <td style={{ padding: '10px 8px', borderBottom: '1px solid var(--border-divider)' }}>
                    {sources.map(([label, id], index) => (
                      <span key={id}>
                        {index > 0 ? ' · ' : ''}
                        <a href={`#${id}`} style={{ color: 'var(--amber-text)', textDecoration: 'underline', textUnderlineOffset: '2px' }}>{label}</a>
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ color: 'var(--text-faint)', fontSize: '12px', lineHeight: '1.5', margin: '14px 0 0' }}>
            Years and populations differ by source. Rates are per 100,000 where stated; “—” means the cited statistic is not presented as a sex comparison.
          </p>
        </div>

        {/* ── ROW 1: Radial rings ── */}
        <div style={{
          background: 'var(--bg-panel)', border: '1px solid var(--border-subtle)',
          borderRadius: '24px', padding: 'clamp(24px, 4vw, 40px)', marginBottom: '24px',
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease 0.3s',
        }}>
          <p style={{ color: 'var(--text-dimmer)', fontSize: '12px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', textAlign: 'center', marginBottom: '32px', marginTop: 0 }}>
            Help-seeking & awareness gaps
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(24px, 4vw, 48px)' }}>
            <RadialRing percent={41.6} color="#c47a3a" textColor="var(--highlight-amber)" size={130} stroke={11} label="41.6%" sublabel="Men with any mental illness who received treatment (NIMH, 2022)" isVisible={visible} delay={400} />
            <RadialRing percent={50}   color="#e8a87c" textColor="var(--highlight-amber-lt)" size={130} stroke={11} label="~50%"  sublabel="Men who felt very depressed and told someone — vs. 67% of women (CALM, 2016)" isVisible={visible} delay={550} />
            <RadialRing percent={40}   color="#a0522d" textColor="var(--highlight-rust)" size={130} stroke={11} label="40%"   sublabel="UK men who have never spoken to anyone about their mental health (Priory Group)" isVisible={visible} delay={700} />
          </div>
          <p style={{ color: 'var(--text-ghost)', fontSize: '11px', textAlign: 'center', marginTop: '24px', marginBottom: 0 }}>
            Sources: NIMH (2022), CALM Masculinity Audit (2016), Priory Group survey of 1,000 men
          </p>
        </div>

        {/* ── ROW 2: Animated Recharts — Help-seeking + Suicide rate ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: '24px',
          marginBottom: '24px',
        }}>
          <HelpSeekingChart />
          <SuicideRateChart />
        </div>

        {/* ── ROW 3: Big number highlights ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
          gap: '16px',
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease 0.7s',
        }}>
          {[
            { num: 2, suffix: '.2×', label: 'Higher male suicide death rate worldwide (2021)', color: '#c0504d', textColor: 'var(--highlight-red)', source: 'WHO, 2021 [1]' },
            { num: 6, suffix: 'M',   label: 'U.S. men affected by depression annually', color: '#c47a3a', textColor: 'var(--highlight-amber)', source: 'NIMH, 2022 [5]' },
            { num: 5, suffix: ' yrs', label: 'Shorter average life expectancy for men vs women globally (68.4 vs 73.8 years in 2021)', color: '#e8a87c', textColor: 'var(--highlight-amber-lt)', source: 'WHO GHE 2021, via Our World in Data [6]' },
            { num: 3, suffix: '×',   label: 'Nearly 3× higher male suicide rate in the Philippines vs females', color: '#e8a87c', textColor: 'var(--highlight-amber-lt)', source: 'WHO via Our World in Data, 2021 [6]' },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: 'var(--bg-panel)', border: `1px solid ${item.color}20`,
                borderRadius: '16px', padding: '24px 20px',
                position: 'relative', overflow: 'hidden', transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${item.color}50`; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 40px ${item.color}15`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${item.color}20`; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }} />
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '900', color: item.textColor, lineHeight: 1, letterSpacing: '-1px', filter: `drop-shadow(0 0 12px ${item.color}50)` }}>
                <Counter target={item.num} suffix={item.suffix} isVisible={visible} delay={800 + i * 100} />
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: '500', lineHeight: '1.5', margin: '10px 0 8px' }}>{item.label}</p>
              <span style={{ background: `${item.color}12`, border: `1px solid ${item.color}25`, borderRadius: '5px', padding: '2px 8px', color: item.textColor, fontSize: '10px', fontWeight: '600' }}>
                {item.source}
              </span>
            </div>
          ))}
        </div>

        {/* ── Bottom note ── */}
        <div style={{ marginTop: '40px', textAlign: 'center', opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease 1s' }}>
          <p style={{ color: 'var(--text-ghost)', fontSize: '13px', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
            Behind every statistic is a real person — a father, a son, a brother, a friend.
            These numbers demand action, not silence.
          </p>
        </div>

      </div>
    </section>
  );
}
