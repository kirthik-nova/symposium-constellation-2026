import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ImageIcon, Clock } from 'lucide-react';

/* ─────────────────────────────────────────
   Countdown hook
───────────────────────────────────────── */
const useCountdown = (targetDate) => {
  const calc = () => {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
    return {
      days: Math.floor(diff / 86_400_000),
      hours: Math.floor((diff % 86_400_000) / 3_600_000),
      minutes: Math.floor((diff % 3_600_000) / 60_000),
      seconds: Math.floor((diff % 60_000) / 1_000),
      done: false,
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
};

/* ─────────────────────────────────────────
   Single digit flip card
───────────────────────────────────────── */
const CountUnit = ({ value, label, index }) => {
  const display = String(value).padStart(2, '0');
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-2"
    >
      {/* Card */}
      <div
        className="relative flex items-center justify-center rounded-2xl border border-white/10 overflow-hidden"
        style={{
          width: 'clamp(64px, 14vw, 100px)',
          height: 'clamp(64px, 14vw, 100px)',
          background: 'linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(138,43,226,0.1) 100%)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        {/* Top gloss */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/[0.03] rounded-t-2xl pointer-events-none" />
        {/* Centre divider */}
        <div className="absolute left-0 right-0 h-px bg-black/40" style={{ top: '50%' }} />

        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: -22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 22, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="font-black font-mono text-white tabular-nums select-none relative z-10"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', lineHeight: 1 }}
          >
            {display}
          </motion.span>
        </AnimatePresence>

        {/* Bottom glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'radial-gradient(circle at 50% 120%, rgba(232,61,232,0.15), transparent 70%)' }}
        />
      </div>

      <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-gray-500 font-bold">
        {label}
      </span>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────── */
const CountdownPoster = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  // ← Set your actual event date/time here
  const EVENT_DATE = '2026-04-02T09:00:00';
  const countdown = useCountdown(EVENT_DATE);

  return (
    <section
      ref={sectionRef}
      id="countdown"
      className="relative py-20 sm:py-28 overflow-hidden z-10"
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[10%] w-[50vw] h-[50vw] max-w-[600px]
                        bg-fuchsia-600/8 rounded-full blur-[120px]"
          style={{ willChange: 'transform' }} />
        <div className="absolute bottom-[-10%] right-[5%] w-[40vw] h-[40vw] max-w-[480px]
                        bg-violet-700/8 rounded-full blur-[100px]"
          style={{ willChange: 'transform' }} />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 relative z-10">

        {/* ── Section heading ── */}
        <motion.div
          initial={isInView ? {} : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-center text-center mb-14 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                          bg-fuchsia-500/10 border border-fuchsia-500/25 mb-5">
            <Clock size={12} className="text-fuchsia-400" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-fuchsia-400">
              Mark Your Calendar
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white font-heading tracking-tight mb-4">
            Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-500">
              Countdown
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg font-light max-w-lg">
            The clock is ticking. Get ready for the most exciting symposium of the year.
          </p>
        </motion.div>

        {/* ── Main grid: countdown left | poster right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ══════ LEFT: Countdown ══════ */}
          <div className="flex flex-col items-center lg:items-start gap-8">

            {/* Date label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-px bg-fuchsia-500/50" />
              <span className="text-sm text-gray-400 font-mono tracking-widest">APR 02 · 2026 · 9:00 AM</span>
            </motion.div>

            {/* Digits */}
            {countdown.done ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 px-8 py-5 rounded-2xl border border-fuchsia-500/30
                           bg-fuchsia-500/10 backdrop-blur-md"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-fuchsia-500" />
                </span>
                <span className="text-lg font-bold text-white tracking-wide">🎉 Event is Happening Now!</span>
              </motion.div>
            ) : (
              <div className="flex items-start gap-3 sm:gap-4">
                <CountUnit value={countdown.days} label="Days" index={0} />
                <div className="text-white/20 font-bold text-2xl sm:text-3xl select-none mt-5">:</div>
                <CountUnit value={countdown.hours} label="Hours" index={1} />
                <div className="text-white/20 font-bold text-2xl sm:text-3xl select-none mt-5">:</div>
                <CountUnit value={countdown.minutes} label="Minutes" index={2} />
                <div className="text-white/20 font-bold text-2xl sm:text-3xl select-none mt-5">:</div>
                <CountUnit value={countdown.seconds} label="Seconds" index={3} />
              </div>
            )}

            {/* Progress bar */}
            {!countdown.done && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                className="w-full max-w-sm"
              >
                <div className="flex justify-between text-[9px] text-gray-600 uppercase tracking-wider mb-2">
                  <span>Announced</span>
                  <span>Event Day</span>
                </div>
                <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${Math.min(Math.max(100 - (countdown.days / 90) * 100, 5), 95)}%` } : {}}
                    transition={{ duration: 1.4, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full"
                    style={{
                      background: 'linear-gradient(to right, #e83de8, #8a2be2, #6366f1)',
                      boxShadow: '0 0 10px rgba(232,61,232,0.5)',
                    }}
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* ══════ RIGHT: Poster frame ══════ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <div
              className="relative w-full max-w-[520px]"
              style={{ aspectRatio: '16/9' }}
            >
              {/* Outer glow layer */}
              <div
                className="absolute -inset-3 rounded-[2rem] blur-2xl opacity-30 pointer-events-none"
                style={{
                  background: 'linear-gradient(145deg, #e83de8 0%, #8a2be2 50%, #6366f1 100%)',
                  willChange: 'transform',
                }}
              />

              {/* Glass card */}
              <div
                className="relative w-full h-full rounded-[1.5rem] overflow-hidden border border-white/10 flex flex-col"
                style={{
                  background: 'linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(10,10,20,0.88) 100%)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
              >
                {/* Corner marks */}
                {[
                  'top-3 left-3 border-t border-l',
                  'top-3 right-3 border-t border-r',
                  'bottom-3 left-3 border-b border-l',
                  'bottom-3 right-3 border-b border-r',
                ].map((c, i) => (
                  <div key={i} className={`absolute w-5 h-5 ${c} border-white/15`} />
                ))}

                {/* Gradient top stripe */}
                <div
                  className="h-1.5 w-full shrink-0"
                  style={{ background: 'linear-gradient(to right, #e83de8, #8a2be2, #6366f1)' }}
                />

                {/* ── Poster body ──
                    To add your real poster:
                    1. Place your image in /public/poster.jpg
                    2. Replace everything inside this div with:
                       <img src="/poster.jpg" alt="Event Poster"
                         className="w-full h-full object-cover" />
                */}
                <div className="flex-1 flex flex-col items-center justify-center gap-5 px-6 py-8">
                  <motion.div
                    animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.65, 0.4] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      willChange: 'transform',
                      background: 'linear-gradient(135deg, rgba(232,61,232,0.18), rgba(138,43,226,0.18))',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <ImageIcon size={28} className="text-white/35" />
                  </motion.div>

                  <div className="text-center">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-white/25 font-mono mb-1">
                      Official Poster
                    </p>
                    <p className="text-[9px] text-white/18">
                      Drop your image in /public/poster.jpg
                    </p>
                  </div>

                  {/* Decorative placeholder lines */}
                  <div className="w-full flex flex-col gap-2.5 mt-2 px-2">
                    {[75, 55, 65, 45].map((w, i) => (
                      <motion.div
                        key={i}
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.7 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className="h-px rounded-full bg-white/6 origin-left"
                        style={{ width: `${w}%`, margin: '0 auto' }}
                      />
                    ))}
                  </div>
                </div>

                {/* Bottom footer */}
                <div
                  className="shrink-0 px-5 py-3.5 border-t border-white/6
                              flex items-center justify-between"
                >
                  <div>
                    <p className="text-[9px] tracking-[0.2em] uppercase text-fuchsia-400/80 font-bold leading-none">
                      Constellation
                    </p>
                    <p className="text-[8px] text-white/25 font-mono mt-0.5">2K26 · Feb 13</p>
                  </div>
                  <div
                    className="text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, rgba(232,61,232,0.12), rgba(138,43,226,0.12))',
                      border: '1px solid rgba(232,61,232,0.2)',
                    }}
                  >
                    <span className="text-fuchsia-400">Event</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CountdownPoster;
