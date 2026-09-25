import { useEffect, useRef, useState } from 'react';

/* ── Animated radial ring ── */
function RadialRing({ percent, color, size = 120, stroke = 10, label, sublabel, isVisible, delay = 0 }) {
  const [prog, setProg] = useState(0);
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (prog / 100) * circ;

  useEffect(() => {
    if (!isVisible) return;
    let start = null;
    const duration = 1600;
    const animate = (ts) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      // ease out cubic
      const ease = 1 - Math.pow(1 - t, 3);
      setProg(percent * ease);
      if (t < 1) requestAnimationFrame(animate);
    };
    const id = setTimeout(() => requestAnimationFrame(animate), delay);
    return () => clearTimeout(id);
  }, [isVisible, percent, delay]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Track */}
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none"
            stroke={`${color}18`}
            strokeWidth={stroke}
          />
          {/* Progress */}
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{
              filter: `drop-shadow(0 0 6px ${color}90)`,
              transition: 'none',
            }}
          />
        </svg>
        {/* Center label */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: size * 0.2,
            fontWeight: '800',
            color,
            lineHeight: 1,
            filter: `drop-shadow(0 0 8px ${color}60)`,
          }}>{label}</span>
        </div>
      </div>
      <p style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '600', textAlign: 'center', margin: 0, maxWidth: size }}>
        {sublabel}
      </p>
    </div>
  );
}

/* ── Animated horizontal bar ── */
function BarRow({ label, maleVal, femaleVal, maxVal, color, isVisible, delay = 0 }) {
  const [prog, setProg] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = null;
    const duration = 1400;
    const animate = (ts) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setProg(ease);
      if (t < 1) requestAnimationFrame(animate);
    };
    const id = setTimeout(() => requestAnimationFrame(animate), delay);
    return () => clearTimeout(id);
  }, [isVisible, delay]);

  const maleW = (maleVal / maxVal) * 100 * prog;
  const femaleW = (femaleVal / maxVal) * 100 * prog;

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '600' }}>{label}</span>
      </div>
      {/* Male bar */}
      <div style={{ marginBottom: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <span style={{ color: '#64748b', fontSize: '11px', width: '44px', flexShrink: 0 }}>Men</span>
          <div style={{ flex: 1, height: '10px', background: 'rgba(255,255,255,0.04)', borderRadius: '99px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${maleW}%`,
              background: `linear-gradient(90deg, ${color}, ${color}cc)`,
              borderRadius: '99px',
              boxShadow: `0 0 8px ${color}60`,
              transition: 'none',
            }} />
          </div>
          <span style={{ color, fontSize: '12px', fontWeight: '700', width: '36px', textAlign: 'right', flexShrink: 0 }}>
            {maleVal}%
          </span>
        </div>
        {/* Female bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: '#64748b', fontSize: '11px', width: '44px', flexShrink: 0 }}>Women</span>
          <div style={{ flex: 1, height: '10px', background: 'rgba(255,255,255,0.04)', borderRadius: '99px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${femaleW}%`,
              background: 'rgba(148,163,184,0.3)',
              borderRadius: '99px',
              transition: 'none',
            }} />
          </div>
          <span style={{ color: '#64748b', fontSize: '12px', fontWeight: '700', width: '36px', textAlign: 'right', flexShrink: 0 }}>
            {femaleVal}%
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Animated counter ── */
function Counter({ target, suffix = '', isVisible, delay = 0 }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = null;
    const duration = 1800;
    const animate = (ts) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(target * ease));
      if (t < 1) requestAnimationFrame(animate);
    };
    const id = setTimeout(() => requestAnimationFrame(animate), delay);
    return () => clearTimeout(id);
  }, [isVisible, target, delay]);

  return <>{val}{suffix}</>;
}

export default function Statistics() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

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

        {/* ── Section Header ── */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 70px)' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px',
            opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease',
          }}>
            <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg, #3b82f6, #14b8a6)' }} />
            <span style={{ color: '#3b82f6', fontSize: '13px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>The Hard Numbers</span>
            <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg, #14b8a6, #3b82f6)' }} />
          </div>
          <h2 style={{
            fontFamily: 'Sora, sans-serif', fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: '800',
            margin: '0 0 12px', letterSpacing: '-1px', color: '#f1f5f9',
            opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease 0.1s',
          }}>
            The Silent Crisis in{' '}
            <span style={{ background: 'linear-gradient(135deg, #3b82f6, #14b8a6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Numbers</span>
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
          borderRadius: '24px', padding: 'clamp(24px, 4vw, 40px)',
          marginBottom: '24px',
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease 0.3s',
        }}>
          <p style={{ color: '#475569', fontSize: '12px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', textAlign: 'center', marginBottom: '32px', marginTop: 0 }}>
            📊 Help-Seeking & Awareness Gaps
          </p>
          <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
            gap: 'clamp(24px, 4vw, 48px)',
          }}>
            <RadialRing
              percent={33} color="#3b82f6" size={130} stroke={11}
              label="1 in 3" sublabel="Men who actually seek mental health help (APA, 2021)"
              isVisible={visible} delay={400}
            />
            <RadialRing
              percent={40} color="#ef4444" size={130} stroke={11}
              label="40%" sublabel="Men who never spoke to anyone about mental health (CALM, 2019)"
              isVisible={visible} delay={550}
            />
            <RadialRing
              percent={77} color="#8b5cf6" size={130} stroke={11}
              label="77%" sublabel="Men with mental illness receive no treatment (WHO, 2022)"
              isVisible={visible} delay={700}
            />
            <RadialRing
              percent={85} color="#14b8a6" size={130} stroke={11}
              label="85%" sublabel="Homeless adults who are male — linked to untreated mental illness (SAMHSA, 2020)"
              isVisible={visible} delay={850}
            />
          </div>
          <p style={{ color: '#1e293b', fontSize: '11px', textAlign: 'center', marginTop: '24px', marginBottom: 0 }}>
            Sources: APA (2021), CALM (2019), WHO (2021)
          </p>
        </div>

        {/* ── ROW 2: Bar chart + Big numbers ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '24px',
          marginBottom: '24px',
        }}>
          {/* Bar chart */}
          <div style={{
            background: 'rgba(17,24,39,0.6)', border: '1px solid rgba(59,130,246,0.12)',
            borderRadius: '24px', padding: 'clamp(20px, 3vw, 32px)',
            opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease 0.5s',
          }}>
            <p style={{ color: '#475569', fontSize: '12px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px', marginTop: 0 }}>
              📈 Men vs Women — Help Seeking (%)
            </p>
            <BarRow label="Seek professional help" maleVal={31} femaleVal={51} maxVal={100} color="#3b82f6" isVisible={visible} delay={600} />
            <BarRow label="Talk to friends/family" maleVal={32} femaleVal={53} maxVal={100} color="#14b8a6" isVisible={visible} delay={750} />
            <BarRow label="Use crisis/hotline services" maleVal={18} femaleVal={35} maxVal={100} color="#8b5cf6" isVisible={visible} delay={900} />
            <BarRow label="Acknowledge own symptoms" maleVal={40} femaleVal={65} maxVal={100} color="#f59e0b" isVisible={visible} delay={1050} />
            <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#3b82f6' }} />
                <span style={{ color: '#64748b', fontSize: '11px' }}>Men</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'rgba(148,163,184,0.4)' }} />
                <span style={{ color: '#64748b', fontSize: '11px' }}>Women</span>
              </div>
            </div>
            <p style={{ color: '#1e293b', fontSize: '11px', marginTop: '12px', marginBottom: 0 }}>
              Sources: APA (2021), SAMHSA National Survey on Drug Use & Health (2020)</p>
          </div>

          {/* Suicide rate visual */}
          <div style={{
            background: 'rgba(17,24,39,0.6)', border: '1px solid rgba(239,68,68,0.15)',
            borderRadius: '24px', padding: 'clamp(20px, 3vw, 32px)',
            opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease 0.6s',
          }}>
            <p style={{ color: '#475569', fontSize: '12px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px', marginTop: 0 }}>
              ⚠️ Suicide Rate Comparison
            </p>

            {/* Global */}
            <div style={{ marginBottom: '28px' }}>
              <p style={{ color: '#64748b', fontSize: '13px', fontWeight: '600', margin: '0 0 12px' }}>Global (WHO, 2021)</p>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '80px' }}>
                {[
                  { label: 'Men', val: 75, color: '#ef4444' },
                  { label: 'Women', val: 25, color: '#475569' },
                ].map((b, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: b.color, fontSize: '13px', fontWeight: '800', fontFamily: 'Sora, sans-serif' }}>
                      {b.val}%
                    </span>
                    <div style={{
                      width: '100%', borderRadius: '6px 6px 0 0',
                      background: visible ? b.color : 'transparent',
                      height: visible ? `${b.val * 0.6}px` : '0px',
                      transition: `height 1.2s cubic-bezier(0.34,1.26,0.64,1) ${0.7 + i * 0.15}s, background 0.3s ease ${0.7 + i * 0.15}s`,
                      boxShadow: visible ? `0 -4px 16px ${b.color}40` : 'none',
                      minHeight: '4px',
                    }} />
                    <span style={{ color: '#475569', fontSize: '11px' }}>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Philippines */}
            <div>
              <p style={{ color: '#64748b', fontSize: '13px', fontWeight: '600', margin: '0 0 12px' }}>Philippines (DOH, 2020)</p>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '80px' }}>
                {[
                  { label: 'Men', val: 75, color: '#f59e0b' },
                  { label: 'Women', val: 25, color: '#475569' },
                ].map((b, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: b.color, fontSize: '13px', fontWeight: '800', fontFamily: 'Sora, sans-serif' }}>
                      {b.val}%
                    </span>
                    <div style={{
                      width: '100%', borderRadius: '6px 6px 0 0',
                      background: visible ? b.color : 'transparent',
                      height: visible ? `${b.val * 0.6}px` : '0px',
                      transition: `height 1.2s cubic-bezier(0.34,1.26,0.64,1) ${1.0 + i * 0.15}s, background 0.3s ease ${1.0 + i * 0.15}s`,
                      boxShadow: visible ? `0 -4px 16px ${b.color}40` : 'none',
                      minHeight: '4px',
                    }} />
                    <span style={{ color: '#475569', fontSize: '11px' }}>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              marginTop: '20px', padding: '12px 16px',
              background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)',
              borderRadius: '10px',
            }}>
              <p style={{ color: '#94a3b8', fontSize: '12px', lineHeight: '1.6', margin: 0 }}>
                Men account for <strong style={{ color: '#ef4444' }}>~75% of all suicides</strong> globally — yet are the least likely to seek help.
              </p>
            </div>
          </div>
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
            { num: 6, suffix: 'M', label: 'U.S. men affected by depression annually', color: '#3b82f6', source: 'NIMH, 2021' },
            { num: 5, suffix: ' yrs', label: 'Shorter average life expectancy for men vs women', color: '#f59e0b', source: 'WHO, 2022' },
            { num: 3, suffix: '×', label: 'Higher male suicide rate in the Philippines vs females', color: '#14b8a6', source: 'DOH PH, 2020' },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(17,24,39,0.6)',
                border: `1px solid ${item.color}20`,
                borderRadius: '16px',
                padding: '24px 20px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${item.color}50`;
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 16px 40px ${item.color}15`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${item.color}20`;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }} />
              <div style={{
                fontFamily: 'Sora, sans-serif', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '900',
                color: item.color, lineHeight: 1, letterSpacing: '-1px',
                filter: `drop-shadow(0 0 12px ${item.color}50)`,
              }}>
                <Counter target={item.num} suffix={item.suffix} isVisible={visible} delay={800 + i * 100} />
              </div>
              <p style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '500', lineHeight: '1.5', margin: '10px 0 8px' }}>
                {item.label}
              </p>
              <span style={{
                background: `${item.color}12`, border: `1px solid ${item.color}25`,
                borderRadius: '5px', padding: '2px 8px',
                color: item.color, fontSize: '10px', fontWeight: '600',
              }}>
                📌 {item.source}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom note */}
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
