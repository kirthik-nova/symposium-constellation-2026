import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Mail, MapPin, Phone, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="pt-32 pb-8 border-t border-white/5 relative z-10 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(232,61,232,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Top Map Box Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-fuchsia-500 shadow-[0_0_10px_#e83de8]"></span>
            </span>
            <h3 className="text-gray-400 font-mono text-sm tracking-widest uppercase font-bold">
              Deployment Coordinates <span className="text-fuchsia-400 mx-2">::</span> Arunai Engineering College, Tiruvannamalai
            </h3>
          </div>
          
          <div className="glass-premium p-1.5 rounded-[2rem] w-full h-[350px] relative group overflow-hidden border-fuchsia-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <iframe
              title="Arunai Engineering College Location"
              src="https://maps.google.com/maps?q=Arunai+Engineering+College,+Tiruvannamalai,+Tamil+Nadu,+India&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(100%) hue-rotate(180deg) grayscale(70%) contrast(1.1) brightness(0.85)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-[1.75rem] opacity-75 group-hover:opacity-100 transition-opacity duration-700"
            />

            {/* Map Overlay info */}
            <a
              href="https://maps.google.com/?q=Arunai+Engineering+College,+Tiruvannamalai"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-6 right-6 bg-[#0a0a0f]/90 border border-fuchsia-500/30
                         px-4 py-2 rounded-xl flex items-center gap-2 text-fuchsia-400 font-mono text-xs
                         shadow-[0_0_20px_rgba(232,61,232,0.15)] backdrop-blur-xl
                         hover:scale-105 transition-transform duration-300"
            >
              <MapPin size={14} /> Open in Maps
            </a>

            <div className="absolute bottom-6 left-6 flex gap-3">
              <div className="text-[11px] text-fuchsia-400 font-mono font-bold bg-[#0a0a0f]/90 border border-white/10 backdrop-blur-xl px-3 py-1.5 rounded-lg shadow-lg">
                LAT: 12.2467° N
              </div>
              <div className="text-[11px] text-purple-400 font-mono font-bold bg-[#0a0a0f]/90 border border-white/10 backdrop-blur-xl px-3 py-1.5 rounded-lg shadow-lg">
                LNG: 79.0696° E
              </div>
            </div>
          </div>
        </motion.div>

        {/* Multi-column Footer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1: Brand */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:col-span-4 pr-4"
          >
            <a href="#" className="flex items-center gap-2 mb-6 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-400 to-purple-600 flex items-center justify-center text-black font-bold font-mono text-lg shadow-[0_0_20px_rgba(232,61,232,0.3)] group-hover:scale-105 transition-transform duration-300">
                {'>_'}
              </div>
              <span className="text-white font-heading text-3xl font-bold tracking-wide">
                Constellation<span className="text-gray-400 font-light ml-0.5">2K26</span>
              </span>
            </a>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 font-light">
              Arunai Engineering College,<br />
              Mathur, Tiruvannamalai,<br />
              Tamil Nadu — 606 603.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-fuchsia-400 hover:border-fuchsia-400/50 hover:bg-fuchsia-400/10 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(232,61,232,0.2)]">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-400/50 hover:bg-purple-400/10 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(138,43,226,0.2)]">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-pink-400 hover:border-pink-400/50 hover:bg-pink-400/10 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                <Mail size={18} />
              </a>
            </div>
          </motion.div>

          {/* Column 2: Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col lg:col-span-2"
          >
            <h3 className="text-white font-heading text-lg font-bold mb-8 tracking-wide">Quick Links</h3>
            <ul className="space-y-4 font-mono text-sm text-gray-400">
              <li><a href="#" className="hover:text-fuchsia-400 transition-colors flex items-center gap-3 group"><span className="text-fuchsia-500 w-1.5 h-1.5 rounded-full inline-block group-hover:scale-150 group-hover:shadow-[0_0_8px_#e83de8] transition-all" /> Home</a></li>
              <li><a href="#events" className="hover:text-fuchsia-400 transition-colors flex items-center gap-3 group"><span className="text-fuchsia-500 w-1.5 h-1.5 rounded-full inline-block group-hover:scale-150 group-hover:shadow-[0_0_8px_#e83de8] transition-all" /> Events</a></li>
              <li><a href="#schedule" className="hover:text-fuchsia-400 transition-colors flex items-center gap-3 group"><span className="text-fuchsia-500 w-1.5 h-1.5 rounded-full inline-block group-hover:scale-150 group-hover:shadow-[0_0_8px_#e83de8] transition-all" /> Schedule</a></li>
              <li><a href="#about" className="hover:text-fuchsia-400 transition-colors flex items-center gap-3 group"><span className="text-fuchsia-500 w-1.5 h-1.5 rounded-full inline-block group-hover:scale-150 group-hover:shadow-[0_0_8px_#e83de8] transition-all" /> About</a></li>
            </ul>
          </motion.div>

          {/* Column 3: Contact */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col lg:col-span-3"
          >
            <h3 className="text-white font-heading text-lg font-bold mb-8 tracking-wide">Contact Us</h3>
            <ul className="space-y-5 text-sm text-gray-400 font-medium">
              <li className="flex items-center gap-4 group">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-fuchsia-500/50 group-hover:text-fuchsia-400 group-hover:shadow-[0_0_15px_rgba(232,61,232,0.2)] transition-all">
                  <Mail size={16} />
                </div>
                <a href="mailto:constellation2k26@gmail.com" className="hover:text-white transition-colors">constellation2k26@gmail.com</a>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-purple-500/50 group-hover:text-purple-400 group-hover:shadow-[0_0_15px_rgba(138,43,226,0.2)] transition-all">
                  <Phone size={16} />
                </div>
                <div className="flex flex-col gap-1">
                  <a href="tel:+1234567890" className="hover:text-white transition-colors">+1 234 567 890</a>
                  <a href="tel:+1987654321" className="hover:text-white transition-colors">+1 987 654 321</a>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Column 4: Coordinators */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col lg:col-span-3"
          >
            <h3 className="text-white font-heading text-lg font-bold mb-8 tracking-wide">Command Crew</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] text-fuchsia-400 font-bold tracking-[0.2em] uppercase mb-1.5 drop-shadow-[0_0_8px_rgba(232,61,232,0.5)]">Student Coordinators</h4>
                <p className="text-white text-sm font-medium">John Doe <span className="text-gray-600 mx-2">|</span> Jane Smith</p>
              </div>
              
              <div>
                <h4 className="text-[10px] text-purple-400 font-bold tracking-[0.2em] uppercase mb-1.5 drop-shadow-[0_0_8px_rgba(138,43,226,0.5)]">Convener</h4>
                <p className="text-white text-sm font-medium">Prof. Alan Turing</p>
              </div>
              
              <div>
                <h4 className="text-[10px] text-pink-400 font-bold tracking-[0.2em] uppercase mb-1.5 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]">Co-Convener</h4>
                <p className="text-white text-sm font-medium">Dr. Ada Lovelace</p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 relative"
        >
          <p className="text-gray-500 text-xs md:text-sm font-medium tracking-wide">
            &copy; {new Date().getFullYear()} Constellation 2k26. All Systems Nominal.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a 
              href="https://github.com/davidShalom-git" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-premium px-5 py-2.5 rounded-full cursor-pointer hover:bg-white/5 hover:border-fuchsia-500/30 transition-all duration-300 group flex items-center gap-3"
            >
              <Github size={18} className="text-gray-400 group-hover:text-white transition-colors" />
              <div className="flex flex-col text-left">
                <span className="text-[9px] text-fuchsia-400 font-bold tracking-widest uppercase leading-none mb-1">Developer</span>
                <span className="text-white text-sm font-heading font-bold leading-none">David Shalom</span>
              </div>
            </a>

            <a 
              href="https://github.com/kirthik-nova" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-premium px-5 py-2.5 rounded-full cursor-pointer hover:bg-white/5 hover:border-purple-500/30 transition-all duration-300 group flex items-center gap-3"
            >
              <Github size={18} className="text-gray-400 group-hover:text-white transition-colors" />
              <div className="flex flex-col text-left">
                <span className="text-[9px] text-purple-400 font-bold tracking-widest uppercase leading-none mb-1">Developer</span>
                <span className="text-white text-sm font-heading font-bold leading-none">Kirthik</span>
              </div>
            </a>
          </div>
        </motion.div>
        
      </div>
    </footer>
  );
};

export default Footer;