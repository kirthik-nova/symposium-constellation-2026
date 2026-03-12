import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';

const morningSchedule = [
  { time: "10:00 AM", duration: "1.5 hours", title: "Inauguration Ceremony", venue: "Main Auditorium" },
  { time: "11:30 AM", duration: "10 mins", title: "Networking & Tea", venue: "Lounge Area" },
  { time: "11:40 AM", duration: "1.5 hours", title: "Presentia (Slot 1)", venue: "Seminar Hall A" },
];

const afternoonSchedule = [
  { time: "01:30 PM", duration: "1 hour", title: "Lunch Break", venue: "Campus Cafeteria" },
  { time: "02:30 PM", duration: "1 hour", title: "Presentia (Slot 2)", venue: "Seminar Hall B" },
  { time: "03:30 PM", duration: "1 hour", title: "Quiz Hust Final", venue: "Computer Labs 1-4" },
];

const ScheduleCard = ({ item, type, index }) => (
  <motion.div 
    initial={{ opacity: 0, x: type === 'morning' ? -30 : 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    className="relative pl-10 pb-10 border-l border-white/10 last:pb-0 group"
  >
    {/* Timeline Premium Dot */}
    <div className={`absolute top-0 -left-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-150
      ${type === 'morning' ? 'bg-fuchsia-400 shadow-[0_0_15px_rgba(232,61,232,0.8)]' : 'bg-purple-400 shadow-[0_0_15px_rgba(138,43,226,0.8)]'}
    `}>
      <div className="w-1.5 h-1.5 bg-white rounded-full" />
    </div>
    
    {/* Animated Tracking Line */}
    <motion.div 
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true, margin: "-200px" }}
      transition={{ duration: 1.5, delay: index * 0.2, ease: "easeInOut" }}
      className={`absolute top-0 -left-[1px] w-[2px] h-full origin-top transition-colors duration-500
        ${type === 'morning' ? 'bg-gradient-to-b from-fuchsia-400 to-transparent' : 'bg-gradient-to-b from-purple-400 to-transparent'}
      `}
      style={{ willChange: 'transform' }}
    />

    <div className={`glass-premium rounded-2xl p-8 transition-all duration-500 transform group-hover:translate-x-2 group-hover:bg-[#0a0a0f]/90
      ${type === 'morning' ? 'group-hover:border-fuchsia-500/40 group-hover:shadow-[0_10px_30px_rgba(232,61,232,0.1)]' : 'group-hover:border-purple-500/40 group-hover:shadow-[0_10px_30px_rgba(138,43,226,0.1)]'}
    `}>
      <div className="flex items-center justify-between mb-5">
        <div className={`flex items-center gap-2 text-sm font-mono font-bold px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 shadow-inner
          ${type === 'morning' ? 'text-fuchsia-400' : 'text-purple-400'}
        `}>
          <Clock size={16} className={type === 'morning' ? 'text-fuchsia-400' : 'text-purple-400'} /> {item.time}
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold bg-black/50 px-3 py-1 rounded-full border border-white/5">
          {item.duration}
        </span>
      </div>
      
      <h4 className="text-2xl font-black text-white mb-4 font-heading tracking-wide group-hover:text-white transition-colors">
        {item.title}
      </h4>
      
      <div className="flex items-center gap-3 text-sm text-gray-400 font-medium bg-white/5 w-fit px-4 py-2 rounded-lg border border-white/5">
        <MapPin size={16} className={type === 'morning' ? 'text-fuchsia-400' : 'text-purple-400'} /> 
        {item.venue}
      </div>
    </div>
  </motion.div>
);

const Schedule = () => {
  return (
    <section id="schedule" className="py-32 relative z-10">
      {/* Background ambient structure */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,61,232,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-24"
        >
          <div className="px-5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-bold tracking-[0.3em] uppercase mb-6 shadow-lg backdrop-blur-md">
            TIMELINE
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white font-heading tracking-tighter mb-6">
            Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-500">Schedule</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg font-light leading-relaxed">
            A power-packed day of innovation and excitement. Choose your track and make your mark.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Morning Session Column */}
          <div className="flex flex-col">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="glass-premium border-fuchsia-500/30 p-6 flex flex-col sm:flex-row items-center gap-5 mb-14 rounded-2xl bg-gradient-to-br from-fuchsia-900/20 to-transparent relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-fuchsia-500/20 blur-[50px] rounded-full group-hover:bg-fuchsia-400/30 transition-colors duration-700" />
              <div className="p-4 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-400 shadow-[0_0_20px_rgba(232,61,232,0.2)]">
                <Calendar size={32} />
              </div>
              <div className="text-center sm:text-left relative z-10">
                <h3 className="text-3xl font-black text-white font-heading tracking-tight mb-1">Morning Session</h3>
                <p className="text-fuchsia-400 text-sm font-mono tracking-widest uppercase font-bold">FEB 13, 2026</p>
              </div>
            </motion.div>
            
            <div className="flex-grow pl-6">
              {morningSchedule.map((item, idx) => (
                <ScheduleCard key={idx} item={item} type="morning" index={idx} />
              ))}
            </div>
          </div>

          {/* Afternoon Session Column */}
          <div className="flex flex-col">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="glass-premium border-purple-500/30 p-6 flex flex-col sm:flex-row items-center gap-5 mb-14 rounded-2xl bg-gradient-to-br from-purple-900/20 to-transparent relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/20 blur-[50px] rounded-full group-hover:bg-purple-400/30 transition-colors duration-700" />
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 shadow-[0_0_20px_rgba(138,43,226,0.2)]">
                <Calendar size={32} />
              </div>
              <div className="text-center sm:text-left relative z-10">
                <h3 className="text-3xl font-black text-white font-heading tracking-tight mb-1">Afternoon Session</h3>
                <p className="text-purple-400 text-sm font-mono tracking-widest uppercase font-bold">FEB 13, 2026</p>
              </div>
            </motion.div>

            <div className="flex-grow pl-6">
              {afternoonSchedule.map((item, idx) => (
                <ScheduleCard key={idx} item={item} type="afternoon" index={idx} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Schedule;