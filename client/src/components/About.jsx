import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Cpu, Lightbulb, Trophy, Users } from 'lucide-react';

// Line-level reveal — opacity+y only (no blur = no repaints)
const CinematicTextReveal = ({ text, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={{ willChange: 'transform' }}
    >
      {text}
    </motion.p>
  );
};

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  return (
    <section id="about" className="py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="px-5 py-1.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 shadow-[0_0_15px_rgba(232,61,232,0.1)]"
          >
            ABOUT THE EVENT
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-7xl font-black text-white font-heading tracking-tight mb-20 text-center"
          >
            What is <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-500 to-violet-500">Constellation 2k26</span>?
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 w-full items-center">
            {/* Left text column */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative"
            >
              <motion.div 
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute top-0 -left-6 w-1 h-full bg-gradient-to-b from-fuchsia-400 via-purple-500 to-transparent rounded-full opacity-50 origin-top" 
              />
              <CinematicTextReveal 
                text="Constellation 2k26 is the flagship national level symposium organized by the Department of Computer Science & Engineering. It's where technical brilliance meets extreme creative expression."
                className="text-xl md:text-2xl text-white mb-8 leading-relaxed font-light" 
              />
              <CinematicTextReveal 
                text="This one-day extravaganza brings together the brightest minds to compete, collaborate, and celebrate both technology and culture in an unforgettable cinematic environment."
                className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed font-light" 
              />
              <CinematicTextReveal 
                text="From insightful Paper Presentations to mind-bending Quizzes, alongside entertaining Non-Technical challenges — there is a massive stage waiting for your talent."
                className="text-lg md:text-xl text-gray-500 leading-relaxed font-light" 
              />
            </motion.div>

            {/* Right grid column */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {[
                { icon: <Cpu className="text-fuchsia-400" size={28} />, title: "Technical Mastery", desc: "Prove your mettle in Paper Presentations and Technical Quizzes.", bg: "bg-fuchsia-500/10", border: "hover:border-fuchsia-500/40 hover:shadow-[0_10px_30px_rgba(232,61,232,0.1)]" },
                { icon: <Lightbulb className="text-purple-400" size={28} />, title: "Non-Tech Fun", desc: "Unleash your creativity and wit in Mad Ads and strategy games.", bg: "bg-purple-500/10", border: "hover:border-purple-500/40 hover:shadow-[0_10px_30px_rgba(138,43,226,0.1)]" },
                { icon: <Trophy className="text-pink-400" size={28} />, title: "Recognition", desc: "Earn prestigious certificates and accolades for your achievements.", bg: "bg-pink-500/10", border: "hover:border-pink-500/40 hover:shadow-[0_10px_30px_rgba(236,72,153,0.1)]" },
                { icon: <Users className="text-violet-400" size={28} />, title: "Networking", desc: "Connect with fellow tech enthusiasts and industry professionals.", bg: "bg-violet-500/10", border: "hover:border-violet-500/40 hover:shadow-[0_10px_30px_rgba(139,92,246,0.1)]" }
              ].map((card, i) => (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  className={`glass-premium rounded-2xl p-8 transition-all duration-500 group ${card.border}`}
                >
                  <div className={`w-14 h-14 rounded-xl ${card.bg} flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-500`}>
                    {card.icon}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 font-heading tracking-wide">{card.title}</h4>
                  <p className="text-sm text-gray-400 font-medium leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Premium Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full rounded-3xl overflow-hidden glass-premium border-fuchsia-500/20 shadow-[0_0_50px_rgba(232,61,232,0.05)] p-[1px] group"
        >
          {/* Animated glow background */}
          <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 via-purple-500/20 to-fuchsia-500/20 opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-700" />
          
          <div className="relative w-full h-full bg-[#050508]/90 backdrop-blur-2xl rounded-[23px] p-10 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center divide-x divide-white/10">
              {[
                { value: '300+', label: 'PARTICIPANTS', color: 'text-fuchsia-400' },
                { value: '6', label: 'EVENTS', color: 'text-white' },
                { value: '15+', label: 'COLLEGES', color: 'text-purple-400' },
                { value: '1', label: 'DAY', color: 'text-white' },
              ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 + (i * 0.1), type: "spring" }}
                  className="flex flex-col justify-center border-l border-white/10 first:border-0"
                >
                  <h3 className={`text-5xl md:text-6xl lg:text-7xl font-black font-heading mb-3 transition-transform duration-300 hover:scale-110 ${stat.color} drop-shadow-lg`}>
                    {stat.value}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-400 tracking-[0.3em] font-bold uppercase">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;