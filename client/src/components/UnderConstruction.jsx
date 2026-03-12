import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Hammer, Sparkles, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import NetworkBackground from './NetworkBackground';

import { Link } from 'react-router-dom';

const UnderConstruction = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500)
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-white flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <NetworkBackground />
      <ParticleBackground />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-2xl text-center"
      >
        {/* Glow behind */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-fuchsia-600/20 blur-[120px] rounded-full pointer-events-none" />

        <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="w-20 h-20 bg-gradient-to-br from-fuchsia-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(232,61,232,0.4)] p-5"
        >
            <Hammer size={40} className="text-white animate-pulse" />
        </motion.div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-400 text-xs font-bold tracking-[0.3em] uppercase mb-6">
            <Zap size={14} className="fill-fuchsia-400" /> Constellation 2K26
        </div>

        <h1 className="text-5xl sm:text-7xl font-black font-heading tracking-tighter text-white mb-6">
            LAUNCHING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-500 to-violet-400 italic">SOON</span>
        </h1>

        <p className="text-gray-400 text-lg sm:text-xl font-light leading-relaxed max-w-lg mx-auto mb-10">
          We are currently crafting a spectacular digital experience for the upcoming symposium. Get ready for the big reveal{dots}
        </p>

        {/* Status Deck */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
                { label: 'Uptime', val: '98.4%', icon: Sparkles },
                { label: 'Security', val: 'Secured', icon: ShieldCheck },
                { label: 'Oxygen', val: 'Optimal', icon: Zap }
            ].map((stat, i) => (
                <div key={i} className="glass-premium p-4 rounded-2xl border-white/5 bg-white/5 backdrop-blur-md flex flex-col items-center gap-1">
                    <stat.icon size={16} className="text-fuchsia-500 mb-1" />
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{stat.label}</span>
                    <span className="text-white font-mono">{stat.val}</span>
                </div>
            ))}
        </div>

        {/* Scannable QR Code Section */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col items-center gap-4 py-8"
        >
            <div className="relative group">
                {/* Glow behind QR */}
                <div className="absolute inset-0 bg-fuchsia-500/20 blur-xl group-hover:bg-fuchsia-500/40 transition-all duration-500 rounded-2xl" />
                <div className="relative p-3 bg-white rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105">
                    <img 
                        src="/src/assets/website_qr.png" 
                        alt="Website QR Code" 
                        className="w-32 h-32 sm:w-40 sm:h-40"
                    />
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-white/10" />
                <span className="text-[10px] sm:text-xs font-mono tracking-[0.4em] uppercase text-gray-400 group-hover:text-fuchsia-400 transition-colors">
                    Scan to Visit Constellation
                </span>
                <div className="w-8 h-px bg-white/10" />
            </div>
        </motion.div>
      </motion.div>

      {/* Decorative lines */}
      <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-fuchsia-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
    </div>
  );
};

export default UnderConstruction;
