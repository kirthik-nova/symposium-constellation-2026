import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Department definitions with SVG icons ──────────────────────────────────────
const DEPARTMENTS = [
  {
    key: 'cse',
    label: 'CSE',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.8)',
    initial: { x: -260, y: -220 },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    key: 'it',
    label: 'IT',
    color: '#f472b6',
    glow: 'rgba(244,114,182,0.8)',
    initial: { x: 260, y: -220 },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    key: 'eee',
    label: 'EEE',
    color: '#fbbf24',
    glow: 'rgba(251,191,36,0.8)',
    initial: { x: -300, y: 0 },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    key: 'ece',
    label: 'ECE',
    color: '#34d399',
    glow: 'rgba(52,211,153,0.8)',
    initial: { x: 300, y: 0 },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
        <circle cx="12" cy="12" r="2" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    key: 'civil',
    label: 'Civil',
    color: '#fb923c',
    glow: 'rgba(251,146,60,0.8)',
    initial: { x: -200, y: 240 },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
        <path d="M3 22V10l9-8 9 8v12H3z" />
        <rect x="9" y="14" width="6" height="8" />
      </svg>
    ),
  },
  {
    key: 'mech',
    label: 'Mech',
    color: '#94a3b8',
    glow: 'rgba(148,163,184,0.8)',
    initial: { x: 200, y: 240 },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
      </svg>
    ),
  },
  {
    key: 'biotech',
    label: 'BioTech',
    color: '#6ee7b7',
    glow: 'rgba(110,231,183,0.8)',
    initial: { x: 0, y: -290 },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" />
      </svg>
    ),
  },
  {
    key: 'aids',
    label: 'AI & DS',
    color: '#e879f9',
    glow: 'rgba(232,121,249,0.8)',
    initial: { x: 0, y: 290 },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
        <path d="M12 2a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4" />
        <path d="M12 14c-6 0-8 3-8 3v1h16v-1s-2-3-8-3" />
      </svg>
    ),
  },
];

// College convergence logo
const CollegeLogo = () => (
  <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
    {/* Main building silhouette */}
    <rect x="10" y="35" width="60" height="38" rx="2" fill="white" opacity="0.15" stroke="white" strokeWidth="1.2" />
    {/* Pillars */}
    {[18, 30, 42, 54].map(x => (
      <rect key={x} x={x} y="42" width="6" height="24" rx="1" fill="white" opacity="0.3" />
    ))}
    {/* Roof triangle */}
    <polygon points="5,35 40,8 75,35" fill="white" opacity="0.2" stroke="white" strokeWidth="1.2" />
    {/* Flag */}
    <line x1="40" y1="8" x2="40" y2="2" stroke="white" strokeWidth="1.5" />
    {/* Dome */}
    <ellipse cx="40" cy="28" rx="10" ry="8" fill="white" opacity="0.25" stroke="white" strokeWidth="1" />
    {/* Steps */}
    <rect x="20" y="73" width="40" height="3" rx="1" fill="white" opacity="0.2" />
    <rect x="15" y="76" width="50" height="3" rx="1" fill="white" opacity="0.15" />
  </svg>
);

const Preloader = ({ onComplete }) => {
  const [gate, setGate] = useState(true);
  const [stage, setStage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [activeDept, setActiveDept] = useState(-1); // which dept is "highlighted" during intro
  const [visibleWords, setVisibleWords] = useState(0); // for word-by-word text reveal
  const [showSkip, setShowSkip] = useState(false);
  const timersRef = useRef([])

  useEffect(() => {
    const skipTimer = setTimeout(() => setShowSkip(true), 12000);
    return () => clearTimeout(skipTimer);
  }, [])

  const startSequence = () => {
    setGate(false);
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    // Base timing variables for easier adjustment
    const startDelay = 1000;
    const deptStagger = 1100; 
    const stage2Delay = 900;
    const stage3Delay = 3600;
    const stage4Delay = 3200;
    const wordStagger = 620;

    // Stage 1: departments fly in one by one
    const t1 = setTimeout(() => setStage(1), startDelay);

    // Animate each dept label highlight sequentially
    DEPARTMENTS.forEach((_, i) => {
      timersRef.current.push(setTimeout(() => setActiveDept(i), startDelay + 200 + i * deptStagger));
    });

    // Stage 2: all arrived, show convergence pulse
    const t2 = setTimeout(() => {
      setStage(2);
      setActiveDept(-1);
    }, startDelay + DEPARTMENTS.length * deptStagger + stage2Delay);

    // Stage 3: convergence — departments fly into center, college logo appears
    const t3 = setTimeout(() => setStage(3), startDelay + DEPARTMENTS.length * deptStagger + stage3Delay);

    // Stage 4: cinematic text screen — after logo settles
    const t4 = setTimeout(() => setStage(4), startDelay + DEPARTMENTS.length * deptStagger + stage3Delay + stage4Delay);

    // Word-by-word reveal on the text screen
    const REVEAL_WORDS = ["Let's", "dive", "into", "the", "realm"];
    const wordBase = startDelay + DEPARTMENTS.length * deptStagger + stage3Delay + stage4Delay + 600;
    REVEAL_WORDS.forEach((_, i) => {
      timersRef.current.push(setTimeout(() => setVisibleWords(i + 1), wordBase + i * wordStagger));
    });

    timersRef.current.push(t1, t2, t3, t4);
  };

  useEffect(() => {
    return () => {
      // Clear all timeouts AND intervals
      timersRef.current.forEach(id => {
        clearTimeout(id);
        clearInterval(id);
      });
    };
  }, []);



  const handleEnter = () => {
    if (stage < 4) return;
    onComplete();
  };

  const scale = isMobile ? 0.45 : 1;
  const deptStaggerVal = 1.1;
  const deptDuration = 1.6;
  const wordRevealDuration = 1.2;

  return (
    <>
      <AnimatePresence>

      {/* ── GATE ─────────────────────────────────────────────── */}
      {gate && (
        <motion.div
          key="gate"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          onClick={startSequence}
          style={{
            position: 'fixed', inset: 0, zIndex: 999999,
            background: '#000', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}
        >
          {/* Deep atmospheric glow */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(109,40,217,0.22) 0%, rgba(232,61,232,0.06) 55%, transparent 80%)',
          }} />

          {/* Subtle grain texture overlay */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.03,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            backgroundSize: '180px',
          }} />

          {/* Slow rotating outer ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
            style={{
              position: 'absolute',
              width: 480, height: 480,
              borderRadius: '50%',
              border: '1px solid rgba(167,139,250,0.08)',
              pointerEvents: 'none',
            }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
            style={{
              position: 'absolute',
              width: 340, height: 340,
              borderRadius: '50%',
              border: '1px dashed rgba(232,61,232,0.1)',
              pointerEvents: 'none',
            }}
          />

          {/* Main content block */}
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* Top eyebrow — "— EST. 2K26 —" */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: '0.8em' }}
              animate={{ opacity: 1, letterSpacing: '0.55em' }}
              transition={{ delay: 0.2, duration: 1.2, ease: 'easeOut' }}
              style={{
                fontFamily: 'monospace',
                fontSize: 9,
                color: 'rgba(167,139,250,0.4)',
                textTransform: 'uppercase',
                marginBottom: 32,
                display: 'flex', alignItems: 'center', gap: 12,
              }}
            >
              <span style={{ width: 30, height: 1, background: 'rgba(167,139,250,0.3)', display: 'inline-block' }} />
              EST. 2K26
              <span style={{ width: 30, height: 1, background: 'rgba(167,139,250,0.3)', display: 'inline-block' }} />
            </motion.div>

            {/* "DEPARTMENT OF" */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9, ease: 'easeOut' }}
              style={{
                fontFamily: 'monospace',
                fontSize: 11,
                letterSpacing: '0.5em',
                color: 'rgba(196,181,253,0.5)',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              Department of
            </motion.div>

            {/* "HAS" — the hero word */}
            <motion.div
              initial={{ opacity: 0, scale: 0.75, filter: 'blur(18px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ delay: 0.85, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative', marginBottom: 6 }}
            >
              {/* Glow behind HAS */}
              <div style={{
                position: 'absolute', inset: '-16px -30px',
                background: 'radial-gradient(ellipse, rgba(232,121,249,0.3) 0%, transparent 70%)',
                filter: 'blur(14px)',
                pointerEvents: 'none',
              }} />
              <motion.span
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                style={{
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                  fontSize: 88,
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  background: 'linear-gradient(90deg, #c4b5fd, #e879f9, #f9a8d4, #a78bfa, #e879f9, #c4b5fd)',
                  backgroundSize: '300% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'inline-block',
                  lineHeight: 1,
                  filter: 'drop-shadow(0 0 28px rgba(232,121,249,0.5))',
                }}
              >
                HAS
              </motion.span>
            </motion.div>

            {/* Thin ornamental divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.9, ease: 'easeOut' }}
              style={{
                width: 220, height: 1, marginBottom: 22,
                background: 'linear-gradient(90deg, transparent, rgba(196,181,253,0.4), rgba(232,121,249,0.6), rgba(196,181,253,0.4), transparent)',
                transformOrigin: 'center',
              }}
            />

            {/* "PRESENTS" */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8, ease: 'easeOut' }}
              style={{
                fontFamily: 'monospace',
                fontSize: 13,
                letterSpacing: '0.7em',
                color: 'rgba(255,255,255,0.75)',
                textTransform: 'uppercase',
                marginBottom: 44,
              }}
            >
              Presents
            </motion.div>

            {/* Event name */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.9, ease: 'easeOut' }}
              style={{ marginBottom: 52 }}
            >
              <div style={{
                fontFamily: "'Georgia', serif",
                fontSize: 36,
                fontWeight: 700,
                letterSpacing: '0.14em',
                color: 'white',
                textShadow: '0 0 40px rgba(167,139,250,0.5)',
                lineHeight: 1,
              }}>
                Constellation <span style={{
                  fontStyle: 'italic', fontWeight: 300,
                  fontSize: 28, color: 'rgba(196,181,253,0.8)',
                }}>2K26</span>
              </div>
            </motion.div>

            {/* Tap prompt */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8, duration: 0.8 }}
            >
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.38em',
                  color: 'rgba(232,61,232,0.8)', textTransform: 'uppercase',
                  display: 'flex', alignItems: 'center', gap: 12,
                }}
              >
                <motion.span
                  animate={{ scaleX: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                  style={{ width: 22, height: 1, background: 'rgba(232,61,232,0.5)', display: 'inline-block' }}
                />
                tap anywhere to begin
                <motion.span
                  animate={{ scaleX: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                  style={{ width: 22, height: 1, background: 'rgba(232,61,232,0.5)', display: 'inline-block' }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Corner ornaments */}
          {[
            { top: 28, left: 28 },
            { top: 28, right: 28 },
            { bottom: 28, left: 28 },
            { bottom: 28, right: 28 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
              style={{
                position: 'absolute', ...pos,
                width: 18, height: 18,
                borderTop: i < 2 ? '1px solid rgba(167,139,250,0.3)' : 'none',
                borderBottom: i >= 2 ? '1px solid rgba(167,139,250,0.3)' : 'none',
                borderLeft: i % 2 === 0 ? '1px solid rgba(167,139,250,0.3)' : 'none',
                borderRight: i % 2 === 1 ? '1px solid rgba(167,139,250,0.3)' : 'none',
              }}
            />
          ))}
        </motion.div>
      )}

      {/* ── CINEMATIC PRELOADER ─────────────────────────────── */}
      {!gate && stage < 5 && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
          style={{
            position: 'fixed', inset: 0, width: '100vw', height: '100vh',
            zIndex: 99999, backgroundColor: '#000', overflow: 'hidden',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* Ambient background glow */}
          <motion.div
            animate={{ opacity: stage >= 2 ? [0.15, 0.3, 0.15] : 0.1 }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.2) 0%, transparent 65%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{
            flex: 1, width: '100%', display: 'flex', alignItems: 'center',
            justifyContent: 'center', position: 'relative',
          }}>

            {/* ── STAGE 1–2: Departments fly in ──────────────── */}
            {stage >= 1 && stage < 3 && DEPARTMENTS.map((dept, i) => (
              <motion.div
                key={dept.key}
                initial={{
                  x: dept.initial.x * scale,
                  y: dept.initial.y * scale,
                  opacity: 0,
                  scale: 0.3,
                }}
                animate={{
                  x: dept.initial.x * scale * 0.72,
                  y: dept.initial.y * scale * 0.72,
                  opacity: 1,
                  scale: activeDept === i ? 1.25 : 1,
                }}
                transition={{
                  x: { duration: deptDuration, delay: i * deptStaggerVal, ease: 'easeOut' },
                  y: { duration: deptDuration, delay: i * deptStaggerVal, ease: 'easeOut' },
                  opacity: { duration: 0.6, delay: i * deptStaggerVal },
                  scale: { duration: 0.3, ease: 'easeOut' },
                }}
                style={{
                  position: 'absolute',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {/* Icon bubble */}
                <motion.div
                  animate={{
                    boxShadow: activeDept === i
                      ? `0 0 30px ${dept.glow}, 0 0 60px ${dept.glow}`
                      : `0 0 14px ${dept.glow}`,
                  }}
                  style={{
                    width: isMobile ? 44 : 62,
                    height: isMobile ? 44 : 62,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)',
                    border: `1.5px solid ${dept.color}55`,
                    backdropFilter: 'blur(12px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: dept.color,
                    transition: 'box-shadow 0.3s',
                  }}
                >
                  <div style={{ transform: isMobile ? 'scale(0.7)' : 'scale(1)' }}>
                    {dept.icon}
                  </div>
                </motion.div>

                {/* Department label */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * deptStaggerVal + 0.4, duration: 0.5 }}
                  style={{
                    fontFamily: 'monospace',
                    fontSize: isMobile ? 8 : 11,
                    letterSpacing: '0.18em',
                    color: activeDept === i ? dept.color : 'rgba(255,255,255,0.5)',
                    textTransform: 'uppercase',
                    fontWeight: activeDept === i ? 700 : 400,
                    textShadow: activeDept === i ? `0 0 12px ${dept.color}` : 'none',
                    transition: 'all 0.3s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {dept.label}
                </motion.div>

                {/* Connector line toward center */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: activeDept === i ? 0.6 : 0.15 }}
                  transition={{ delay: i * deptStaggerVal + 0.6, duration: 0.8 }}
                  style={{
                    position: 'absolute',
                    width: isMobile ? 30 : 50,
                    height: 1,
                    background: `linear-gradient(to center, ${dept.color}, transparent)`,
                    transformOrigin: 'center',
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${Math.atan2(-dept.initial.y, -dept.initial.x) * 180 / Math.PI}deg)`,
                    pointerEvents: 'none',
                  }}
                />
              </motion.div>
            ))}

            {/* Constellation SVG lines stage 1–2 */}
            {stage >= 1 && stage < 3 && (
              <motion.svg
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 2 }}
                style={{ position: 'absolute', pointerEvents: 'none' }}
                width={isMobile ? 340 : 680}
                height={isMobile ? 340 : 680}
                viewBox="-340 -340 680 680"
              >
                {DEPARTMENTS.map((dept, i) => (
                  <motion.line
                    key={dept.key}
                    x1={dept.initial.x * 0.72}
                    y1={dept.initial.y * 0.72}
                    x2={0}
                    y2={0}
                    stroke={dept.color}
                    strokeWidth="0.8"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: activeDept >= i ? 0.35 : 0.1 }}
                    transition={{ duration: 1.2, delay: i * deptStaggerVal + 0.8 }}
                  />
                ))}
              </motion.svg>
            )}

            {/* ── STAGE 3+: Convergence — everything flies to center ── */}
            {stage >= 3 && DEPARTMENTS.map((dept, i) => (
              <motion.div
                key={`converge-${dept.key}`}
                initial={{
                  x: dept.initial.x * scale * 0.72,
                  y: dept.initial.y * scale * 0.72,
                  opacity: 1,
                  scale: 1,
                }}
                animate={{
                  x: 0,
                  y: 0,
                  opacity: stage >= 4 ? 0 : 0.6,
                  scale: stage >= 4 ? 0 : 0.4,
                }}
                transition={{
                  duration: 1.4,
                  delay: i * 0.1,
                  ease: 'easeInOut',
                }}
                style={{
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: dept.color,
                }}
              >
                <div style={{ transform: isMobile ? 'scale(0.6)' : 'scale(0.85)' }}>
                  {dept.icon}
                </div>
              </motion.div>
            ))}

            {/* ── College Logo appears at center from stage 3 ── */}
            {stage >= 3 && (
              <motion.div
                onClick={handleEnter}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.0, delay: 0.8, ease: 'easeOut' }}
                style={{
                  position: 'relative',
                  display: 'grid',
                  placeItems: 'center',
                  width: isMobile ? 180 : 280,
                  height: isMobile ? 180 : 280,
                  cursor: stage >= 3 ? 'pointer' : 'default',
                  zIndex: 10,
                }}
              >
                {/* Multi-layer glow blob */}
                <motion.div
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    position: 'absolute',
                    width: '100%', height: '100%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(167,139,250,0.4) 0%, rgba(232,61,232,0.2) 50%, transparent 75%)',
                    filter: 'blur(20px)',
                  }}
                />

                {/* Outer pulse rings */}
                {[1.4, 1.7, 2.1].map((s, i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [s, s + 0.3, s], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.55 }}
                    style={{
                      position: 'absolute',
                      width: isMobile ? 180 : 280,
                      height: isMobile ? 180 : 280,
                      borderRadius: '50%',
                      border: `1px solid rgba(167,139,250,${0.5 - i * 0.15})`,
                    }}
                  />
                ))}

                {/* Orbiting rings */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, ease: 'linear', repeat: Infinity }}
                  style={{
                    position: 'absolute',
                    width: isMobile ? 150 : 230,
                    height: isMobile ? 150 : 230,
                    borderRadius: '50%',
                    border: '1px dashed rgba(232,61,232,0.4)',
                  }}
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 6, ease: 'linear', repeat: Infinity }}
                  style={{
                    position: 'absolute',
                    width: isMobile ? 110 : 170,
                    height: isMobile ? 110 : 170,
                    borderRadius: '50%',
                    border: '1px dotted rgba(167,139,250,0.35)',
                  }}
                />

                {/* Central college logo circle */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'relative',
                    width: isMobile ? 90 : 130,
                    height: isMobile ? 90 : 130,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)',
                    border: '2px solid rgba(167,139,250,0.6)',
                    boxShadow: '0 0 60px rgba(139,92,246,0.6), 0 0 120px rgba(232,61,232,0.3), inset 0 0 30px rgba(167,139,250,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  <div style={{ transform: isMobile ? 'scale(0.65)' : 'scale(1)' }}>
                    <CollegeLogo />
                  </div>
                </motion.div>

              </motion.div>
            )}

            {/* ── Final burst when transitioning to text screen ── */}
            <AnimatePresence>
              {stage === 4 && (
                <motion.div
                  key="burst"
                  initial={{ opacity: 0, scale: 0.1 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.1, 12, 12] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    width: 100, height: 100,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #fff 0%, #e83de8 30%, #8b5cf6 60%, transparent 80%)',
                    pointerEvents: 'none',
                    zIndex: 50,
                  }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* ── Progress bar (stages 0–3 only) ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: stage < 3 ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            style={{
              width: '100%', paddingBottom: 64,
              display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 20,
            }}
          >
            <div style={{
              fontFamily: 'monospace',
              fontSize: isMobile ? 9 : 11,
              letterSpacing: '0.4em',
              color: 'rgba(196,181,253,0.6)',
              textTransform: 'uppercase',
              marginBottom: 10,
              textAlign: 'center',
              minHeight: 16,
            }}>
              {stage === 0 && 'INITIALIZING...'}
              {stage === 1 && activeDept >= 0 && activeDept < DEPARTMENTS.length
                ? `${DEPARTMENTS[activeDept].label} DEPARTMENT ONLINE`
                : stage === 1 ? 'DEPARTMENTS LOADING...' : ''}
              {stage === 2 && 'ALL DEPARTMENTS ONLINE — CONVERGING...'}
            </div>
            <div style={{ width: 280, height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 99, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: stage === 0 ? '5%'
                    : stage === 1 ? `${5 + (activeDept + 1) / DEPARTMENTS.length * 55}%`
                      : stage === 2 ? '65%'
                        : '100%',
                }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(to right, #a78bfa, #e83de8)',
                  boxShadow: '0 0 10px #e83de8',
                  borderRadius: 99,
                }}
              />
            </div>
          </motion.div>


        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════
          STAGE 4 — CINEMATIC TEXT SCREEN
      ══════════════════════════════════════════════════════ */}
      {!gate && stage >= 4 && (
        <motion.div
          key="textscreen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 100000,
            background: '#000',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
            cursor: visibleWords >= 5 ? 'pointer' : 'default',
          }}
          onClick={visibleWords >= 5 ? handleEnter : undefined}
        >
          {/* Deep radial atmosphere */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'radial-gradient(ellipse 80% 60% at 50% 55%, rgba(109,40,217,0.28) 0%, rgba(168,85,247,0.08) 45%, transparent 75%)',
            }}
          />

          {/* Floating particle sparks */}
          {Array.from({ length: 22 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 0, x: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                y: [0, -(60 + Math.random() * 120)],
                x: [(Math.random() - 0.5) * 200],
              }}
              transition={{
                duration: 2.2 + Math.random() * 2,
                delay: 0.3 + Math.random() * 2.5,
                repeat: Infinity,
                repeatDelay: Math.random() * 3,
              }}
              style={{
                position: 'absolute',
                bottom: '38%',
                left: `${30 + Math.random() * 40}%`,
                width: 2 + Math.random() * 3,
                height: 2 + Math.random() * 3,
                borderRadius: '50%',
                background: ['#a78bfa', '#e879f9', '#f472b6', '#fff', '#c4b5fd'][i % 5],
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Horizontal scan line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: [0, 0.4, 0] }}
            transition={{ duration: 1.2, delay: 0.2, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: '100%', height: 1,
              background: 'linear-gradient(90deg, transparent, #a78bfa, #e879f9, #a78bfa, transparent)',
              top: '50%',
              pointerEvents: 'none',
            }}
          />

          {/* ── The big words ── */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: isMobile ? 8 : 14,
            position: 'relative',
            zIndex: 10,
            userSelect: 'none',
          }}>

            {/* LINE 1: "Let's  dive" */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: isMobile ? 14 : 28 }}>
              {[
                { word: "Let's", delay: 0 },
                { word: 'dive', delay: 1 },
              ].map(({ word, delay }) => (
                <AnimatePresence key={word}>
                  {visibleWords > delay && (
                    <motion.span
                      initial={{ opacity: 0, y: 60, scale: 1.4, filter: 'blur(20px)' }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                      transition={{ duration: wordRevealDuration, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        fontFamily: "'Georgia', 'Times New Roman', serif",
                        fontSize: isMobile ? 46 : 90,
                        fontWeight: 300,
                        letterSpacing: '-0.01em',
                        color: 'rgba(255,255,255,0.92)',
                        lineHeight: 1,
                        display: 'inline-block',
                        textShadow: '0 0 60px rgba(167,139,250,0.35)',
                      }}
                    >
                      {word}
                    </motion.span>
                  )}
                </AnimatePresence>
              ))}
            </div>

            {/* LINE 2: "into the" — italic, smaller, spaced */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: isMobile ? 10 : 20 }}>
              {[
                { word: 'into', delay: 2 },
                { word: 'the', delay: 3 },
              ].map(({ word, delay }) => (
                <AnimatePresence key={word}>
                  {visibleWords > delay && (
                    <motion.span
                      initial={{ opacity: 0, y: 40, filter: 'blur(14px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ duration: wordRevealDuration * 0.9, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        fontFamily: "'Georgia', 'Times New Roman', serif",
                        fontSize: isMobile ? 28 : 52,
                        fontWeight: 300,
                        fontStyle: 'italic',
                        letterSpacing: '0.18em',
                        color: 'rgba(196,181,253,0.7)',
                        lineHeight: 1,
                        display: 'inline-block',
                        textTransform: 'lowercase',
                      }}
                    >
                      {word}
                    </motion.span>
                  )}
                </AnimatePresence>
              ))}
            </div>

            {/* LINE 3: "REALM" — giant, gradient, chromatic */}
            <AnimatePresence>
              {visibleWords >= 5 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6, filter: 'blur(30px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  transition={{ duration: wordRevealDuration * 1.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: 'relative', display: 'inline-block' }}
                >
                  {/* Glow layer behind the text */}
                  <div style={{
                    position: 'absolute', inset: '-10px -20px',
                    background: 'radial-gradient(ellipse, rgba(232,121,249,0.35) 0%, rgba(167,139,250,0.2) 50%, transparent 75%)',
                    filter: 'blur(18px)',
                    borderRadius: 8,
                    pointerEvents: 'none',
                  }} />
                  <motion.span
                    animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    style={{
                      fontFamily: "'Georgia', 'Times New Roman', serif",
                      fontSize: isMobile ? 72 : 148,
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      background: 'linear-gradient(90deg, #c4b5fd, #e879f9, #f472b6, #a78bfa, #e879f9, #c4b5fd)',
                      backgroundSize: '300% 100%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      display: 'inline-block',
                      lineHeight: 1,
                      filter: 'drop-shadow(0 0 30px rgba(232,121,249,0.6))',
                    }}
                  >
                    REALM
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Thin divider line that draws in after REALM */}
          <AnimatePresence>
            {visibleWords >= 5 && (
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
                style={{
                  width: isMobile ? 180 : 320,
                  height: 1,
                  marginTop: isMobile ? 24 : 36,
                  background: 'linear-gradient(90deg, transparent, rgba(196,181,253,0.5), transparent)',
                  transformOrigin: 'center',
                }}
              />
            )}
          </AnimatePresence>

          {/* ENTER button */}
          <AnimatePresence>
            {visibleWords >= 5 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                onClick={handleEnter}
                style={{
                  marginTop: isMobile ? 28 : 42,
                  display: 'flex', alignItems: 'center', gap: 14,
                  cursor: 'pointer',
                }}
              >
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  style={{
                    fontFamily: 'monospace',
                    fontSize: isMobile ? 10 : 12,
                    letterSpacing: '0.55em',
                    color: 'rgba(196,181,253,0.75)',
                    textTransform: 'uppercase',
                    display: 'flex', alignItems: 'center', gap: 12,
                  }}
                >
                  <motion.span
                    animate={{ scaleX: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    style={{ width: 24, height: 1, background: 'rgba(196,181,253,0.5)', display: 'inline-block' }}
                  />
                  tap to enter
                  <motion.span
                    animate={{ scaleX: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    style={{ width: 24, height: 1, background: 'rgba(196,181,253,0.5)', display: 'inline-block' }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>


        </motion.div>
      )}
      </AnimatePresence>

      <AnimatePresence>
        {showSkip && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[1000001]"
          >
            <motion.button
              onClick={onComplete}
              whileHover={{ scale: 1.05, letterSpacing: '0.4em' }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-3 rounded-full overflow-hidden transition-all duration-500"
              style={{ pointerEvents: 'auto' }}
            >
              {/* Button Background with Glassmorphism */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-xl border border-white/10 group-hover:border-fuchsia-500/50 transition-colors" />
              
              {/* Animated Inner Glow */}
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative flex items-center gap-3">
                <span className="text-[10px] font-mono tracking-[0.3em] text-white/40 group-hover:text-white transition-colors uppercase italic">
                  Abstain Cinematic
                </span>
                <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-fuchsia-500/20 transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-white/30 group-hover:text-fuchsia-400 transition-colors">
                    <polyline points="13 17 18 12 13 7" />
                    <polyline points="6 17 11 12 6 7" />
                  </svg>
                </div>
              </div>
            </motion.button>
            
            {/* Subtle floating label */}
            <motion.p 
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-center text-[8px] font-mono tracking-widest text-fuchsia-400/50 mt-3 uppercase"
            >
              Bypass Protocol
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Preloader;