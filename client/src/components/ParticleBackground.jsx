import React, { useMemo } from 'react';

/* Deterministic pseudo-random — avoids hydration mismatch & Math.random in render */
const seeded = (seed) => {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
};

const ParticleBackground = () => {
  const particles = useMemo(() =>
    Array.from({ length: 22 }, (_, i) => ({
      id:       i,
      x:        seeded(i * 3)  * 100,
      y:        seeded(i * 7)  * 100,
      size:     seeded(i * 11) * 2.5 + 1,
      dur:      seeded(i * 5)  * 18 + 10,
      delay:    seeded(i * 13) * 8,
      opacity:  seeded(i * 17) * 0.35 + 0.15,
      drift:    (seeded(i * 19) - 0.5) * 60,
    }))
  , []);

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-fuchsia-400"
          style={{
            left:    `${p.x}%`,
            top:     `${p.y}%`,
            width:   p.size,
            height:  p.size,
            opacity: p.opacity,
            willChange: 'transform, opacity',
            animation: `particleFloat ${p.dur}s ${p.delay}s linear infinite`,
            '--drift': `${p.drift}px`,
          }}
        />
      ))}

      {/* Inline keyframes so no separate CSS file is needed */}
      <style>{`
        @keyframes particleFloat {
          0%   { transform: translateY(0)     translateX(0);           opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(-120px) translateX(var(--drift)); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default ParticleBackground;