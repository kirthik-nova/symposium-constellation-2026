import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Users, Zap } from 'lucide-react';

const RegistrationProgress = () => {
  const [spotsLeft, setSpotsLeft] = useState(42); // Realistic fake data
  const [percentage, setPercentage] = useState(86);
  const [isVisible, setIsVisible] = useState(true);

  // Subtle pulsing animation for the number
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly decrease spots a bit for "live" feel during demo if needed,
      // but here we just keep it steady or slightly fluctuating
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="w-full bg-gradient-to-r from-fuchsia-600/20 via-violet-600/20 to-blue-600/20 backdrop-blur-md border-b border-white/10 py-2 relative z-[70] overflow-hidden"
        >
          {/* Animated Glow Line */}
          <motion.div 
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent"
          />

          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-5 h-5 rounded-full border border-black bg-gray-800 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20" />
                  </div>
                ))}
              </div>
              <p className="text-[10px] sm:text-xs font-bold tracking-wider text-fuchsia-100 uppercase flex items-center gap-2">
                <Users size={12} className="text-fuchsia-400" />
                <span className="text-white">{spotsLeft}</span> Spots remaining for early boarding
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-fuchsia-500 to-violet-500"
                  />
                </div>
                <span className="text-[10px] font-mono text-fuchsia-400">{percentage}% Claimed</span>
              </div>
              
              <div className="flex items-center gap-1 bg-fuchsia-500/20 px-2 py-0.5 rounded border border-fuchsia-500/30">
                <Zap size={10} className="text-fuchsia-400 fill-fuchsia-400" />
                <span className="text-[9px] font-black text-white italic tracking-tighter uppercase font-heading">Live</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationProgress;
