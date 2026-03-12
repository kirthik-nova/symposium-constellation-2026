import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Cpu, Cog, Zap, FlaskConical, Building2, MonitorSmartphone, Code2 } from 'lucide-react';

const DepartmentConstellation = () => {
  const containerRef = useRef(null);

  // Nodes representing different departments
  const nodes = [
    { name: "CSE / IT", Icon: Code2, color: "from-fuchsia-400 to-purple-500", shadow: "shadow-[0_0_20px_#e83de8]", delay: 0 },
    { name: "ECE", Icon: Zap, color: "from-purple-400 to-pink-500", shadow: "shadow-[0_0_20px_#8a2be2]", delay: 0.2 },
    { name: "MECH", Icon: Cog, color: "from-gray-400 to-zinc-600", shadow: "shadow-[0_0_20px_#9ca3af]", delay: 0.4 },
    { name: "CIVIL", Icon: Building2, color: "from-orange-400 to-amber-600", shadow: "shadow-[0_0_20px_#f97316]", delay: 0.6 },
    { name: "BIO / AGRI", Icon: FlaskConical, color: "from-green-400 to-emerald-500", shadow: "shadow-[0_0_20px_#4ade80]", delay: 0.8 },
    { name: "AIDS / AIML", Icon: Cpu, color: "from-rose-400 to-red-500", shadow: "shadow-[0_0_20px_#f43f5e]", delay: 1.0 },
    { name: "EEE", Icon: MonitorSmartphone, color: "from-yellow-400 to-amber-500", shadow: "shadow-[0_0_20px_#facc15]", delay: 1.2 },
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    // Initial check
    checkMobile();
    // Re-evaluate on resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Responsive sizes
  const orbitalRings = isMobile ? [120] : [150, 220, 290]; // Only 1 ring on mobile
  const innerRadius = isMobile ? 85 : 150;
  const outerRadius = isMobile ? 145 : 250;
  const nodeSize = isMobile ? "w-10 h-10 p-2" : "w-14 h-14 p-3";
  const iconSize = isMobile ? 18 : 24;
  const coreSize = isMobile ? "w-16 h-16" : "w-20 h-20";
  const coreInnerSize = isMobile ? "w-6 h-6" : "w-8 h-8";

  return (
    <div ref={containerRef} className={`relative w-full flex items-center justify-center perspective-[2000px] group cursor-crosshair ${isMobile ? 'h-[400px]' : 'h-[500px]'}`}>
      {/* Central Core Element */}
      <motion.div
        animate={isMobile ? { scale: [1, 1.05, 1] } : { scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ willChange: 'transform' }}
        className={`absolute ${isMobile ? 'w-24 h-24' : 'w-32 h-32'} rounded-full bg-gradient-to-br from-fuchsia-500/20 to-purple-500/20 blur-xl group-hover:blur-2xl transition-all duration-500`}
      />
      <div className={`absolute ${coreSize} ${isMobile ? 'bg-black/40' : 'glass-premium'} rounded-full border border-white/20 flex items-center justify-center z-10 shadow-[0_0_40px_rgba(255,255,255,0.2)]`}>
        <div className={`${coreInnerSize} rounded-full bg-white opacity-80 shadow-[0_0_20px_#fff] ${isMobile ? '' : 'animate-pulse'}`} />
      </div>

      {/* Orbital Rings */}
      {orbitalRings.map((radius, i) => (
        <motion.div
          key={`ring-${i}`}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 18 + i * 6, repeat: Infinity, ease: 'linear' }}
          className="absolute rounded-full border border-white/5 bg-transparent"
          style={{ width: radius * 2, height: radius * 2, borderTopColor: 'rgba(232, 61, 232, 0.3)', borderLeftColor: 'rgba(138, 43, 226, 0.3)', willChange: 'transform' }}
        />
      ))}

      {/* Department Nodes */}
      {nodes.map((node, index) => {
        const radius = index % 2 === 0 ? innerRadius : outerRadius;
        const angle = (index * (360 / nodes.length)) * (Math.PI / 180);
        // Start from center
        const startX = 0;
        const startY = 0;
        // End position calculation (simple circle)
        const endX = Math.cos(angle) * radius;
        const endY = Math.sin(angle) * radius;

        return (
          <motion.div
            key={index}
            initial={{ x: startX, y: startY, scale: 0, opacity: 0 }}
            animate={{ x: endX, y: endY, scale: 1, opacity: 1 }}
            transition={{ type: "spring", delay: 2 + node.delay, stiffness: 50, damping: 10 }}
            className="absolute z-20"
          >
            {/* Hover Tooltip Layer */}
            <div className="relative group/node">
              {/* Inner Node */}
              <motion.div
                animate={isMobile ? {} : { y: [0, -6, 0] }}
                transition={{ duration: 3 + index * 0.3, repeat: Infinity, delay: index * 0.2, ease: "easeInOut" }}
                style={{ willChange: 'transform' }}
                className={`${nodeSize} rounded-xl transform rotate-45 flex items-center justify-center cursor-pointer bg-black/60 ${isMobile ? '' : 'backdrop-blur-md'} border border-white/20 hover:scale-125 transition-transform duration-300 ${node.shadow}`}
              >
                <div className={`w-full h-full transform -rotate-45 flex items-center justify-center text-white rounded-lg bg-gradient-to-br ${node.color} opacity-80 group-hover/node:opacity-100`}>
                  <node.Icon size={iconSize} />
                </div>
              </motion.div>

              {/* Department Label on hover */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-8 opacity-0 group-hover/node:opacity-100 group-hover/node:translate-y-12 transition-all duration-300 pointer-events-none whitespace-nowrap z-50">
                <div className={`px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-xs font-bold tracking-widest uppercase text-white shadow-[0_0_20px_rgba(0,0,0,0.8)]`}>
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${node.color}`}>
                    {node.name}
                  </span>
                </div>
              </div>

              {/* Connector line back to core - Hidden on Mobile */}
              {!isMobile && (
                <svg
                  className="absolute top-1/2 left-1/2 pointer-events-none -translate-y-1/2 -translate-x-1/2"
                  style={{ width: `${Math.abs(endX)}px`, height: `${Math.abs(endY)}px`, zIndex: -1, overflow: 'visible' }}
                >
                  <motion.line
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 2.5 + node.delay }}
                    x1="0" y1="0"
                    x2={-endX} y2={-endY}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                </svg>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default DepartmentConstellation;
