import { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';

/* ════════════════════════════════════════════════
   PALETTE
════════════════════════════════════════════════ */
const MEN_COLOR   = '#2dd4bf';
const WOMEN_COLOR = '#f472b6';

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

  const cancel = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    startTs.current = null;
  }, []);

  useEffect(() => {
    if (!trigger) { cancel(); setValue(0); return; }
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
  }, [trigger, target, duration, decimals, cancel]);

  return value;
}

/* ════════════════════════════════════════════════
   Animated radial ring — replays on every scroll-in
════════════════════════════════════════════════ */
function RadialRing({ percent, color, size = 120, stroke = 10, label, sublabel, isVisible, delay = 0 }) {
  const [prog, setProg] = useState(0);
  const r    = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (prog / 100) * circ;
  const rafRef  = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    // always cancel any running animation first
    if (rafRef.current)  cancelAnimationFrame(rafRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);

    if (!isVisible) {
      setProg(0);   // reset so it's ready to replay
      return;
    }

    const duration = 1600;
    timerRef.current = setTimeout(() => {
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
  }, [isVisible, percent, delay]);

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
          <span style={{ fontFamily: 'Sora, sans-serif', fontSize: size * 0.2, fontWeight: '800', color, lineHeight: 1, filter: `drop-shadow(0 0 8px ${color}60)` }}>
            {label}
          </span>
        </div>
      </div>
      <p style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '600', textAlign: 'center', margin: 0, maxWidth: size }}>
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

  useEffect(() => {
    if (rafRef.current)   cancelAnimationFrame(rafRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);

    if (!isVisible) {
      setVal(0);   // reset for next replay
      return;
    }

    const duration = 1800;
    timerRef.current = setTimeout(() => {
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
  }, [isVisible, target, delay]);

  return <>{val}{suffix}</>;
}

/* ════════════════════════════════════════════════
   Chart tooltip
════════════════════════════════════════════════ */
function ChartTooltip({ active, payload, label, unit = '' }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'rgba(15,23,42,0.97)', border: '1px solid rgba(45,212,191,0.22)',
      borderRadius: '10px', padding: '10px 16px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.55)', pointerEvents: 'none',
    }}>
      <p style={{ color: '#94a3b8', fontSize: '12px', margin: '0 0 5px', fontWeight: '600' }}>{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.fill, fontSize: '15px', fontWeight: '800', margin: '2px 0', fontFamily: 'Sora, sans-serif' }}>
          {entry.value}{unit}
          <span style={{ color: '#64748b', fontSize: '11px', fontWeight: '500', marginLeft: '6px' }}>{entry.name}</span>
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

/* ════════════════════════════════════════════════
   Shared chart legend
════════════════════════════════════════════════ */
function ChartLegend() {
  return (
    <div style={{ display: 'flex', gap: '20px', marginBottom: '14px' }}>
      {[{ label: 'Men', color: MEN_COLOR }, { label: 'Women', color: WOMEN_COLOR }].map(l => (
        <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: l.color }} />
          <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '600' }}>{l.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════
   CHART 1 — Help-seeking (%)
════════════════════════════════════════════════ */
const helpRawData = [
  { group: 'Men',   value: 33, fill: MEN_COLOR   },
  { group: 'Women', value: 52, fill: WOMEN_COLOR  },
];

function HelpSeekingChart() {
  const { ref, inView } = useScrollTrigger(0.3);
  const [animKey, setAnimKey] = useState(0);
  const wasInView = useRef(false);
  useEffect(() => {
    if (inView && !wasInView.current) setAnimKey(k => k + 1);
    wasInView.current = inView;
  }, [inView]);

  const menVal   = useCountUp(33, inView, 850, 0);
  const womenVal = useCountUp(52, inView, 850, 0);
  const displayVals = { Men: menVal, Women: womenVal };

  return (
    <AnimKeyCtx.Provider value={animKey}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          background: 'rgba(17,24,39,0.72)', border: '1px solid rgba(45,212,191,0.18)',
          borderRadius: '24px', padding: 'clamp(20px, 3vw, 36px)', boxSizing: 'border-box',
        }}
      >
        <p style={{ color: '#475569', fontSize: '12px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 4px' }}>
          Help-seeking behaviour
        </p>
        <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(17px, 2.5vw, 24px)', fontWeight: '800', color: '#f1f5f9', margin: '0 0 6px', letterSpacing: '-0.4px' }}>
          Men vs Women —{' '}
          <span style={{ background: `linear-gradient(135deg, ${MEN_COLOR}, #3b82f6)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Who seeks help? (%)
          </span>
        </h3>
        <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', margin: '0 0 22px' }}>
          Percentage who seek professional mental health support when struggling.
        </p>

        <ChartLegend />

        {/* Count-up numbers */}
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px' }}>
          {helpRawData.map(d => (
            <div key={d.group} style={{ textAlign: 'center' }}>
              <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '900', color: d.fill, filter: `drop-shadow(0 0 10px ${d.fill}55)` }}>
                {displayVals[d.group]}%
              </span>
              <p style={{ color: '#64748b', fontSize: '12px', margin: '2px 0 0', fontWeight: '600' }}>{d.group}</p>
            </div>
          ))}
        </div>

        <div style={{ width: '100%', height: '200px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={helpRawData} margin={{ top: 4, right: 16, left: 0, bottom: 4 }} barCategoryGap="38%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="group" tick={{ fill: '#64748b', fontSize: 13, fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tickFormatter={v => `${v}%`} tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} width={36} />
              <Tooltip content={<ChartTooltip unit="%" />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="value" name="seeking help" shape={<BarShapeSnappy />} maxBarSize={80} isAnimationActive={false}>
                {helpRawData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p style={{ color: '#334155', fontSize: '11px', marginTop: '14px', marginBottom: 0, fontStyle: 'italic' }}>
          Source: [citation needed] — placeholder values: Men 33%, Women 52%. Replace with verified APA/WHO/PSA data.
        </p>
      </motion.div>
    </AnimKeyCtx.Provider>
  );
}

/* ════════════════════════════════════════════════
   CHART 2 — Suicide Rate (per 100,000)
════════════════════════════════════════════════ */
const suicideRawData = [
  { group: 'Men',   value: 12.5, fill: MEN_COLOR   },
  { group: 'Women', value: 3.8,  fill: WOMEN_COLOR  },
];

function SuicideRateChart() {
  const { ref, inView } = useScrollTrigger(0.3);
  const [animKey, setAnimKey] = useState(0);
  const wasInView = useRef(false);
  useEffect(() => {
    if (inView && !wasInView.current) setAnimKey(k => k + 1);
    wasInView.current = inView;
  }, [inView]);

  const menVal   = useCountUp(12.5, inView, 1100, 1);
  const womenVal = useCountUp(3.8,  inView, 1100, 1);
  const displayVals = { Men: menVal, Women: womenVal };

  return (
    <AnimKeyCtx.Provider value={animKey}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.08 }}
        style={{
          background: 'rgba(17,24,39,0.72)', border: '1px solid rgba(239,68,68,0.15)',
          borderRadius: '24px', padding: 'clamp(20px, 3vw, 36px)', boxSizing: 'border-box',
        }}
      >
        <p style={{ color: '#475569', fontSize: '12px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 4px' }}>
          Sensitive data — handle with care
        </p>
        <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(17px, 2.5vw, 24px)', fontWeight: '800', color: '#f1f5f9', margin: '0 0 6px', letterSpacing: '-0.4px' }}>
          Suicide rate comparison{' '}
          <span style={{ color: '#ef4444', fontSize: '0.65em', fontWeight: '600' }}>per 100,000</span>
        </h3>
        <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', margin: '0 0 22px' }}>
          Suicide rates by gender per 100,000 population — Philippines context. Replace with verified DOH/WHO data.
        </p>

        <ChartLegend />

        {/* Count-up numbers */}
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px' }}>
          {suicideRawData.map(d => (
            <div key={d.group} style={{ textAlign: 'center' }}>
              <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '900', color: d.fill, filter: `drop-shadow(0 0 10px ${d.fill}55)` }}>
                {displayVals[d.group]}
              </span>
              <p style={{ color: '#64748b', fontSize: '12px', margin: '2px 0 0', fontWeight: '600' }}>{d.group}</p>
            </div>
          ))}
        </div>

        <div style={{ width: '100%', height: '200px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={suicideRawData} margin={{ top: 4, right: 16, left: 0, bottom: 4 }} barCategoryGap="38%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="group" tick={{ fill: '#64748b', fontSize: 13, fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis
                domain={[0, 16]} tick={{ fill: '#475569', fontSize: 11 }}
                axisLine={false} tickLine={false} width={28}
                label={{ value: 'per 100k', angle: -90, position: 'insideLeft', offset: 12, fill: '#334155', fontSize: 10 }}
              />
              <Tooltip content={<ChartTooltip unit=" per 100k" />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="value" name="suicide rate" shape={<BarShapeSmooth />} maxBarSize={80} isAnimationActive={false}>
                {suicideRawData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ marginTop: '14px', padding: '12px 16px', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.14)', borderRadius: '10px' }}>
          <p style={{ color: '#94a3b8', fontSize: '12px', lineHeight: '1.6', margin: 0 }}>
            Men account for a significantly higher proportion of suicide deaths globally.
            These numbers are a call to action — not a reflection of weakness.
          </p>
        </div>

        <p style={{ color: '#334155', fontSize: '11px', marginTop: '12px', marginBottom: 0, fontStyle: 'italic' }}>
          Source: [citation needed] — placeholder values: Men 12.5, Women 3.8 per 100,000. Replace with verified WHO/DOH/PSA data.
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
        background: 'linear-gradient(180deg, #0a0e1a 0%, #0d1220 50%, #0a0e1a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(20,184,166,0.3), transparent)' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* ── Section header ── */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 70px)' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px',
            opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease',
          }}>
            <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg, #3b82f6, #14b8a6)' }} />
            <span style={{ color: '#3b82f6', fontSize: '13px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>The hard numbers</span>
            <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg, #14b8a6, #3b82f6)' }} />
          </div>
          <h2 style={{
            fontFamily: 'Sora, sans-serif', fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: '800',
            margin: '0 0 12px', letterSpacing: '-1px', color: '#f1f5f9',
            opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease 0.1s',
          }}>
            The silent crisis in{' '}
            <span style={{ background: 'linear-gradient(135deg, #3b82f6, #14b8a6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>numbers</span>
          </h2>
          <p style={{
            color: '#64748b', fontSize: 'clamp(14px, 2vw, 17px)', maxWidth: '540px', margin: '0 auto', lineHeight: '1.7',
            opacity: visible ? 1 : 0, transition: 'all 0.7s ease 0.2s',
          }}>
            Data-driven evidence of the mental health crisis facing men globally and in the Philippines.
          </p>
        </div>

        {/* ── ROW 1: Radial rings ── */}
        <div style={{
          background: 'rgba(17,24,39,0.6)', border: '1px solid rgba(59,130,246,0.12)',
          borderRadius: '24px', padding: 'clamp(24px, 4vw, 40px)', marginBottom: '24px',
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease 0.3s',
        }}>
          <p style={{ color: '#475569', fontSize: '12px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', textAlign: 'center', marginBottom: '32px', marginTop: 0 }}>
            Help-seeking & awareness gaps
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(24px, 4vw, 48px)' }}>
            <RadialRing percent={33} color="#3b82f6" size={130} stroke={11} label="1 in 3" sublabel="Men who actually seek mental health help (APA, 2021)" isVisible={visible} delay={400} />
            <RadialRing percent={40} color="#ef4444" size={130} stroke={11} label="40%" sublabel="Men who never spoke to anyone about mental health (CALM, 2019)" isVisible={visible} delay={550} />
            <RadialRing percent={77} color="#8b5cf6" size={130} stroke={11} label="77%" sublabel="Men with mental illness receive no treatment (WHO, 2022)" isVisible={visible} delay={700} />
            <RadialRing percent={85} color="#14b8a6" size={130} stroke={11} label="85%" sublabel="Homeless adults who are male — linked to untreated mental illness (SAMHSA, 2020)" isVisible={visible} delay={850} />
          </div>
          <p style={{ color: '#1e293b', fontSize: '11px', textAlign: 'center', marginTop: '24px', marginBottom: 0 }}>
            Sources: APA (2021), CALM (2019), WHO (2021)
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
            { num: 3, suffix: '–4×', label: 'Men more likely to die by suicide than women globally', color: '#ef4444', source: 'WHO, 2021' },
            { num: 6, suffix: 'M',   label: 'U.S. men affected by depression annually', color: '#3b82f6', source: 'NIMH, 2021' },
            { num: 5, suffix: ' yrs', label: 'Shorter average life expectancy for men vs women', color: '#f59e0b', source: 'WHO, 2022' },
            { num: 3, suffix: '×',   label: 'Higher male suicide rate in the Philippines vs females', color: '#14b8a6', source: 'DOH PH, 2020' },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(17,24,39,0.6)', border: `1px solid ${item.color}20`,
                borderRadius: '16px', padding: '24px 20px',
                position: 'relative', overflow: 'hidden', transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${item.color}50`; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 40px ${item.color}15`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${item.color}20`; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }} />
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '900', color: item.color, lineHeight: 1, letterSpacing: '-1px', filter: `drop-shadow(0 0 12px ${item.color}50)` }}>
                <Counter target={item.num} suffix={item.suffix} isVisible={visible} delay={800 + i * 100} />
              </div>
              <p style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '500', lineHeight: '1.5', margin: '10px 0 8px' }}>{item.label}</p>
              <span style={{ background: `${item.color}12`, border: `1px solid ${item.color}25`, borderRadius: '5px', padding: '2px 8px', color: item.color, fontSize: '10px', fontWeight: '600' }}>
                {item.source}
              </span>
            </div>
          ))}
        </div>

        {/* ── Bottom note ── */}
        <div style={{ marginTop: '40px', textAlign: 'center', opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease 1s' }}>
          <p style={{ color: '#1e293b', fontSize: '13px', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
            Behind every statistic is a real person — a father, a son, a brother, a friend.
            These numbers demand action, not silence.
          </p>
        </div>

      </div>
    </section>
  );
}
