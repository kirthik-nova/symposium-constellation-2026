import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import MagneticButton from './MagneticButton';
import DepartmentConstellation from './DepartmentConstellation';

/* ─── reusable sequential reveal helper ─────────────────────── */
const reveal = (delay, extras = {}) => ({
  initial: { opacity: 0, y: 28, ...extras.from },
  animate: { opacity: 1, y: 0,  ...extras.to   },
  transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1], ...extras.t },
});

const Hero = ({ hasEntered }) => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const text = 'CONSTELLATION';

  const yPoster       = useTransform(scrollY, [0, 1000], [0, isMobile ? 0 : 150]);
  const yText         = useTransform(scrollY, [0, 1000], [0, isMobile ? 0 : 50]);
  const smoothYPoster = useSpring(yPoster, { stiffness: 50, damping: 20 });
  const smoothYText   = useSpring(yText,   { stiffness: 50, damping: 20 });

  const letterVariants = {
    hidden:  { 
      opacity: 0, 
      y: 60, 
      rotateX: isMobile ? 0 : -90,
      filter: isMobile ? 'blur(0px)' : 'blur(8px)'
    },
    visible: (i) => ({
      opacity: 1, 
      y: 0, 
      rotateX: 0, 
      filter: 'blur(0px)',
      transition: { 
        duration: isMobile ? 0.6 : 0.8,
        delay: (hasEntered ? (isMobile ? 0.4 : 1.0) : 999) + i * (isMobile ? 0.04 : 0.08), 
        ease: [0.2, 0.65, 0.3, 0.9] 
      },
    }),
  };

  const getRevealProps = (delayOffset, extras = {}) => {
    const mobileDelay = delayOffset * 0.6;
    return {
      initial: { opacity: 0, y: isMobile ? 12 : 32, ...extras.from },
      animate: hasEntered ? { opacity: 1, y: 0, ...extras.to } : { opacity: 0, y: isMobile ? 12 : 32, ...extras.from },
      transition: { duration: isMobile ? 0.8 : 1.2, delay: isMobile ? mobileDelay : delayOffset, ease: [0.16, 1, 0.3, 1], ...extras.t },
    };
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] w-full flex items-start lg:items-center
                 pt-28 pb-12 px-4 sm:px-6 md:pt-32 md:pb-20 overflow-hidden"
    >
      {/* Lighting flares */}
      <motion.div
        initial={{ opacity: 0 }} 
        animate={hasEntered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 3, delay: 2.0 }}
        className="absolute top-0 left-1/4 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px]
                   bg-fuchsia-500/10 sm:bg-fuchsia-500/18 blur-[60px] sm:blur-[110px] rounded-full pointer-events-none"
        style={{ willChange: 'opacity' }}
      />
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }} 
          animate={hasEntered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 3, delay: 2.5 }}
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px]
                     bg-purple-600/15 blur-[110px] rounded-full pointer-events-none"
          style={{ willChange: 'opacity' }}
        />
      )}

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">

        {/* LEFT COLUMN */}
        <motion.div
          style={{ y: smoothYText }}
          className="flex flex-col items-start text-left lg:col-span-7"
        >

          {/* 1 ── Registration badge */}
          <motion.div
            {...getRevealProps(0.6, { from: { y: -20, scale: 0.85 }, to: { scale: 1 } })}
            className="mb-7 inline-flex items-center gap-3 px-4 py-2 rounded-full
                       border border-white/10 bg-white/5 backdrop-blur-md shadow-lg
                       overflow-hidden relative group cursor-default"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 to-purple-500/20
                           translate-x-[-100%] group-hover:translate-x-[100%]
                           transition-transform duration-1000 ease-in-out" />
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-fuchsia-500 shadow-[0_0_8px_#e83de8]" />
            </span>
            <span className="text-xs font-semibold tracking-widest text-gray-200 uppercase relative z-10">
              Registration Open
            </span>
          </motion.div>

          {/* 2 ── Eyebrow line */}
          <motion.div
            {...getRevealProps(1.2, { from: { x: -30, y: 0 }, to: { x: 0 } })}
            className="flex items-center gap-3 mb-4"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={hasEntered ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.0, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-8 h-px bg-fuchsia-400/70 origin-left"
              style={{ willChange: 'transform' }}
            />
            <h2 className="text-base sm:text-lg text-fuchsia-400 font-medium
                           tracking-[0.18em] uppercase">
              National Level Tech Symposium
            </h2>
          </motion.div>

          {/* 3 ── CONSTELLATION — per-letter stagger */}
          <h1 className="text-[2.6rem] leading-[1.1] sm:text-5xl md:text-7xl lg:text-[5.5rem]
                         font-black text-white font-heading tracking-tight mb-2 sm:mb-3 flex flex-col">
            <div className="flex overflow-hidden pb-1 sm:pb-2 flex-wrap">
              {text.split('').map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate={hasEntered ? "visible" : "hidden"}
                  className="inline-block"
                  style={{ willChange: 'transform', perspective: '400px' }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* 4 ── 2K26 */}
            <motion.span
              initial={{ opacity: 0, y: 30, clipPath: 'inset(0 100% 0 0)' }}
              animate={hasEntered ? { opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0)' } : {}}
              transition={{ duration: 1.4, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-gradient-premium pb-2 block"
              style={{ willChange: 'transform' }}
            >
              2K26
            </motion.span>
          </h1>

          {/* Thin rule */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={hasEntered ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md h-px mb-6 origin-left"
            style={{
              background: 'linear-gradient(to right, rgba(232,61,232,0.4), rgba(138,43,226,0.2), transparent)',
              willChange: 'transform',
            }}
          />

          {/* 5 ── Tagline */}
          <motion.p
            {...getRevealProps(3.2)}
            className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-xl mb-8"
          >
            A dynamic convergence of minds where{' '}
            <span className="text-white font-medium drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              technical brilliance
            </span>
            {' '}meets{' '}
            <span className="text-white font-medium drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              creative expression
            </span>.{' '}
            Join the ultimate inter-department battleground.
          </motion.p>

          {/* 6 ── Meta chips */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-10 sm:mb-12 w-full">
            {[
              {
                delay: 3.8,
                icon:  <Calendar size={18} />,
                iconBg:'bg-fuchsia-500/10 text-fuchsia-400 shadow-[0_0_15px_rgba(232,61,232,0.2)]',
                label: 'Date',
                value: 'Apr 02, 2026',
              },
              {
                delay: 4.2,
                icon:  <MapPin size={18} />,
                iconBg:'bg-purple-500/10 text-purple-400 shadow-[0_0_15px_rgba(138,43,226,0.2)]',
                label: 'Venue',
                value: 'Arunai Engineering College',
              },
            ].map((chip) => (
              <motion.div
                key={chip.label}
                {...getRevealProps(chip.delay, { from: { x: -15 }, to: { x: 0 } })}
                className="glass-premium rounded-xl px-5 py-3 flex items-center gap-3
                           hover:bg-white/5 transition-colors cursor-default w-full sm:w-auto"
              >
                <div className={`p-2 rounded-lg ${chip.iconBg}`}>{chip.icon}</div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">{chip.label}</span>
                  <span className="text-sm text-white font-semibold">{chip.value}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 7 ── CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start sm:items-center w-full">
            <motion.div {...getRevealProps(4.8)} className="w-full sm:w-auto">
              <MagneticButton className="w-full sm:w-auto block">
                <a
                  href="#events"
                  className="group relative w-full sm:w-auto justify-center px-8 py-4
                             bg-white text-black font-bold text-base rounded-full overflow-hidden
                             transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]
                             flex items-center gap-2"
                >
                  <span className="relative z-10">Explore Events</span>
                  <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 group-hover:rotate-[-45deg] transition-all duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </a>
              </MagneticButton>
            </motion.div>

            <motion.div {...getRevealProps(5.2)} className="w-full sm:w-auto">
              <MagneticButton className="w-full sm:w-auto block">
                <a
                  href="#schedule"
                  className="group relative w-full sm:w-auto justify-center px-8 py-4
                             bg-transparent border border-white/20 text-white font-medium text-base rounded-full
                             transition-all hover:bg-white/5 hover:border-white/40
                             flex items-center gap-2 overflow-hidden"
                >
                  <span className="relative z-10">View Schedule</span>
                  <div className="absolute top-0 left-0 w-[2px] h-full bg-fuchsia-400 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300" />
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-fuchsia-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 delay-100" />
                </a>
              </MagneticButton>
            </motion.div>
          </div>

        </motion.div>

        {/* RIGHT COLUMN — Constellation */}
        <motion.div
          style={{ y: smoothYPoster, willChange: 'transform' }}
          initial={{ opacity: 0, scale: 0.85, x: 40 }}
          animate={hasEntered ? { opacity: 1, scale: 1, x: 0 } : {}}
          transition={{ duration: 2.0, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full flex items-center justify-center lg:col-span-5 mt-6 lg:mt-0"
        >
          <DepartmentConstellation />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;