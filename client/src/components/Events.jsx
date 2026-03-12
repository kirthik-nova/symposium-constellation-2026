import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import {
  Terminal, Lightbulb, UserCheck,
  Gamepad2, Puzzle, Target, ArrowUpRight,
} from 'lucide-react';

import pptImg from '/PPT.png';
import mythImg from '/Myth.png';
import brainImg from '/Brain.png';

/* ─── live width hook ───────────────────────────────────────────── */
const useWindowWidth = () => {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);
  return width;
};

/* ─── DATA ─────────────────────────────────────────────────────── */
const techEvents = [
  {
    id: 1, title: 'PPT', tag: 'Paper Presentation',
    desc: 'Present your research and innovative ideas to industry experts and peers with a polished deck and compelling narrative.',
    img: pptImg,
    icon: UserCheck, color: '#e2e8f0', colorRgb: '226,232,240', num: '01',
  },
  {
    id: 2, title: 'Myth Buster', tag: 'Technical Analysis',
    desc: 'Bust common technical myths and prove your engineering logic. Challenge the established norms.',
    img: mythImg,
    icon: Terminal, color: '#94a3b8', colorRgb: '148,163,184', num: '02',
  },
  {
    id: 3, title: 'Brain Auction', tag: 'Strategy Quiz',
    desc: 'Bid on technical problems and solve them to win. A unique blend of technical depth and strategic bidding.',
    img: brainImg,
    icon: Lightbulb, color: '#cbd5e1', colorRgb: '203,213,225', num: '03',
  },
];

const nonTechEvents = [
  {
    id: 4, title: 'Dumb Charades', tag: 'Stage Performance',
    desc: 'Express yourself without words. A classic game of non-verbal communication and team coordination.',
    img: '/Dumb.jpeg',
    icon: Target, color: '#e879f9', colorRgb: '232,121,249', num: '01',
  },
  {
    id: 5, title: 'Meme It Up', tag: 'Digital Creativity',
    desc: 'Channel your inner meme lord. Create the most viral technical and college memes to win.',
    img: '/Meme.png',
    icon: Puzzle, color: '#a78bfa', colorRgb: '167,139,250', num: '02',
  },
  {
    id: 6, title: 'Cook with Friends', tag: 'Team Activity',
    desc: 'A culinary showdown without the flame. Team up to create the most appetizing preparation with fun ingredients.',
    img: '/Cook.jpeg',
    icon: Gamepad2, color: '#818cf8', colorRgb: '129,140,248', num: '03',
  },
];

/* ─── HERO CARD ─────────────────────────────────────────────────── */
const HeroCard = ({ event, flip }) => {
  const [hovered, setHovered] = useState(false);
  const w = useWindowWidth();
  const isMobile = w < 640;
  const isTablet = w >= 640 && w < 1024;
  const Icon = event.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : (flip ? '1fr 1.1fr' : '1.1fr 1fr'),
        minHeight: isMobile ? 'auto' : isTablet ? 360 : 420,
        borderRadius: isMobile ? 18 : 28,
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: hovered
          ? `0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(${event.colorRgb},0.2)`
          : '0 8px 40px rgba(0,0,0,0.3)',
        transition: 'box-shadow 0.5s ease',
      }}>

        {/* IMAGE */}
        <div style={{
          order: isMobile ? 1 : (flip ? 2 : 1),
          position: 'relative',
          overflow: 'hidden',
          height: isMobile ? 220 : '100%',
        }}>
          <motion.img
            src={event.img}
            alt={event.title}
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: isMobile ? 220 : 'unset' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: isMobile
              ? 'linear-gradient(to bottom, transparent 35%, rgba(6,4,18,0.97) 100%)'
              : flip
                ? 'linear-gradient(to left, rgba(6,4,18,0.95) 0%, rgba(6,4,18,0.3) 40%, transparent 70%)'
                : 'linear-gradient(to right, rgba(6,4,18,0.95) 0%, rgba(6,4,18,0.3) 40%, transparent 70%)',
          }} />
          {/* Ghost number */}
          <div style={{
            position: 'absolute', bottom: isMobile ? 10 : 20, left: isMobile ? 14 : 24,
            fontFamily: 'monospace', fontSize: isMobile ? 56 : 100, fontWeight: 900,
            color: 'rgba(255,255,255,0.07)', lineHeight: 1, userSelect: 'none', letterSpacing: '-0.04em',
          }}>{event.num}</div>
          {/* Tag pill */}
          <div style={{
            position: 'absolute', top: isMobile ? 14 : 24, left: isMobile ? 14 : 24,
            display: 'flex', alignItems: 'center', gap: 6,
            padding: isMobile ? '4px 10px' : '6px 14px',
            borderRadius: 999, background: 'rgba(0,0,0,0.6)',
            border: `1px solid rgba(${event.colorRgb},0.35)`, backdropFilter: 'blur(12px)',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: event.color, boxShadow: `0 0 8px ${event.color}`, flexShrink: 0 }} />
            <span style={{ fontFamily: 'monospace', fontSize: isMobile ? 7 : 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: event.color, fontWeight: 700 }}>
              {event.tag}
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{
          order: isMobile ? 2 : (flip ? 1 : 2),
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: isMobile ? '28px 22px 32px' : isTablet ? '36px 32px' : '52px 48px',
          position: 'relative',
          background: isMobile
            ? 'rgba(6,4,18,0.98)'
            : flip
              ? `linear-gradient(to right, rgba(6,4,18,0.98), rgba(${event.colorRgb},0.04))`
              : `linear-gradient(to left, rgba(6,4,18,0.98), rgba(${event.colorRgb},0.04))`,
        }}>
          {/* Vertical accent — desktop only */}
          {!isMobile && (
            <motion.div
              initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                position: 'absolute', [flip ? 'right' : 'left']: 0,
                top: '20%', bottom: '20%', width: 2,
                background: `linear-gradient(to bottom, transparent, ${event.color}, transparent)`,
                transformOrigin: 'top', opacity: 0.5,
              }}
            />
          )}

          <motion.div
            animate={{ color: hovered ? event.color : 'rgba(255,255,255,0.2)' }}
            transition={{ duration: 0.3 }}
            style={{ marginBottom: isMobile ? 12 : 20 }}
          >
            <Icon size={isMobile ? 22 : 28} />
          </motion.div>

          <h3 style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: isMobile ? 26 : isTablet ? 34 : 'clamp(32px, 3.5vw, 52px)',
            fontWeight: 700, color: '#fff', letterSpacing: '-0.02em',
            lineHeight: 1.1, marginBottom: isMobile ? 10 : 18,
          }}>{event.title}</h3>

          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ height: 1, width: 48, background: `linear-gradient(to right, ${event.color}, transparent)`, transformOrigin: 'left', marginBottom: isMobile ? 10 : 20, opacity: 0.7 }}
          />

          <p style={{
            fontFamily: "'Georgia', serif",
            fontSize: isMobile ? 13.5 : 15,
            color: 'rgba(200,200,210,0.7)', lineHeight: 1.75,
            maxWidth: isMobile ? '100%' : 340,
            marginBottom: isMobile ? 22 : 32, fontWeight: 300,
          }}>{event.desc}</p>

          <motion.a
            href="#register" whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 400 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              width: 'fit-content',
              padding: isMobile ? '9px 16px' : '12px 24px',
              borderRadius: 12,
              border: `1px solid rgba(${event.colorRgb},0.3)`,
              color: event.color, fontSize: isMobile ? 10 : 13,
              fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase', textDecoration: 'none',
              background: `rgba(${event.colorRgb},0.06)`,
              transition: 'background 0.3s, border-color 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `rgba(${event.colorRgb},0.14)`; e.currentTarget.style.borderColor = `rgba(${event.colorRgb},0.6)`; }}
            onMouseLeave={e => { e.currentTarget.style.background = `rgba(${event.colorRgb},0.06)`; e.currentTarget.style.borderColor = `rgba(${event.colorRgb},0.3)`; }}
          >
            Register Now <ArrowUpRight size={12} />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── SECTION HEADER ────────────────────────────────────────────── */
const SectionHeader = ({ number, label, title, accent, accentRgb, sub }) => {
  const w = useWindowWidth();
  const isMobile = w < 640;
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{ marginBottom: isMobile ? 32 : 56, position: 'relative', overflow: 'hidden' }}
    >
      {!isMobile && (
        <div style={{
          position: 'absolute', top: -32, left: -16,
          fontFamily: 'monospace', fontSize: 180, fontWeight: 900,
          color: 'rgba(255,255,255,0.025)', lineHeight: 1,
          userSelect: 'none', letterSpacing: '-0.05em', pointerEvents: 'none',
        }}>{number}</div>
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '5px 14px', borderRadius: 999,
          border: `1px solid rgba(${accentRgb},0.3)`,
          background: `rgba(${accentRgb},0.07)`,
          marginBottom: isMobile ? 12 : 20,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: accent, boxShadow: `0 0 8px ${accent}` }} />
          <span style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: accent, fontWeight: 700 }}>{label}</span>
        </div>
        <h2 style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontSize: isMobile ? 32 : 'clamp(40px, 5vw, 72px)',
          fontWeight: 700, color: '#fff', letterSpacing: '-0.03em',
          lineHeight: 1.05, marginBottom: isMobile ? 10 : 16,
        }}>{title}</h2>
        <p style={{
          fontFamily: "'Georgia', serif", fontSize: isMobile ? 14 : 16,
          color: 'rgba(180,180,200,0.55)', maxWidth: 520, lineHeight: 1.7, fontWeight: 300,
        }}>{sub}</p>
        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: isMobile ? 18 : 32, height: 1,
            background: `linear-gradient(to right, rgba(${accentRgb},0.4), rgba(${accentRgb},0.1) 40%, transparent)`,
            transformOrigin: 'left',
          }}
        />
      </div>
    </motion.div>
  );
};

/* ─── MAIN ──────────────────────────────────────────────────────── */
const Events = () => {
  const sectionRef = useRef(null);
  const w = useWindowWidth();
  const isMobile = w < 640;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightBg = useMotionTemplate`radial-gradient(700px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.018), transparent 65%)`;

  const onPointerMove = ({ clientX, clientY }) => {
    if (!sectionRef.current) return;
    const { left, top } = sectionRef.current.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <section
      ref={sectionRef} id="events" onPointerMove={onPointerMove}
      style={{ padding: isMobile ? '56px 0 72px' : '96px 0 128px', position: 'relative', overflow: 'hidden' }}
    >
      <motion.div style={{ background: spotlightBg, position: 'absolute', inset: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '10%', left: '-10%', width: isMobile ? 240 : 500, height: isMobile ? 240 : 500, background: 'rgba(255,255,255,0.015)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: isMobile ? 240 : 500, height: isMobile ? 240 : 500, background: 'rgba(139,92,246,0.06)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 16px' : '0 32px', position: 'relative', zIndex: 10 }}>

        {/* TECHNICAL */}
        <div style={{ marginBottom: isMobile ? 64 : 120 }}>
          <SectionHeader number="01" label="Competitive Tech" title="Technical Events" accent="#e2e8f0" accentRgb="226,232,240" sub="Challenge your skills, debug complex systems, and innovate with cutting-edge technology." />
          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 14 : 20 }}>
            {techEvents.map((event, i) => <HeroCard key={event.id} event={event} flip={i % 2 !== 0} />)}
          </div>
        </div>

        {/* NON-TECHNICAL */}
        <div>
          <SectionHeader number="02" label="Fun & Creative" title="Non-Technical Events" accent="#e879f9" accentRgb="232,121,249" sub="Unwind and showcase your creativity, humor, and wit — no code required." />
          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 14 : 20 }}>
            {nonTechEvents.map((event, i) => <HeroCard key={event.id} event={event} flip={i % 2 !== 0} />)}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Events;