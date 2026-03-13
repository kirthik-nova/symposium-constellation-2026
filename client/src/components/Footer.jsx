import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Mail, MapPin, Phone, Github, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

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
            <Link to="/" className="flex items-center gap-2 mb-6 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-400 to-purple-600 flex items-center justify-center text-black font-bold font-mono text-lg shadow-[0_0_20px_rgba(232,61,232,0.3)] group-hover:scale-105 transition-transform duration-300">
                {'>_'}
              </div>
              <span className="text-white font-heading text-3xl font-bold tracking-wide">
                Constellation<span className="text-gray-400 font-light ml-0.5">2K26</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 font-light">
              Arunai Engineering College,<br />
              Mathur, Tiruvannamalai,<br />
              Tamil Nadu — 606 603.
            </p>
            <div className="flex gap-4">
              <a href="https://chat.whatsapp.com/JJyxCwedZTnHCSFVvGxYGg" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-green-400 hover:border-green-400/50 hover:bg-green-400/10 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                <MessageCircle size={18} />
              </a>
              <a href="https://www.instagram.com/constellation_2k26?igsh=dGN3cWV1Z2p6ZTIy" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-fuchsia-400 hover:border-fuchsia-400/50 hover:bg-fuchsia-400/10 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(232,61,232,0.2)]">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-400/50 hover:bg-purple-400/10 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(138,43,226,0.2)]">
                <Linkedin size={18} />
              </a>
              <a href="mailto:constellation2k26@gmail.com" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-pink-400 hover:border-pink-400/50 hover:bg-pink-400/10 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(236,72,153,0.2)]">
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
              <li><Link to="/" className="hover:text-fuchsia-400 transition-colors flex items-center gap-3 group"><span className="text-fuchsia-500 w-1.5 h-1.5 rounded-full inline-block group-hover:scale-150 group-hover:shadow-[0_0_8px_#e83de8] transition-all" /> Home</Link></li>
              <li><Link to="/events" className="hover:text-fuchsia-400 transition-colors flex items-center gap-3 group"><span className="text-fuchsia-500 w-1.5 h-1.5 rounded-full inline-block group-hover:scale-150 group-hover:shadow-[0_0_8px_#e83de8] transition-all" /> Events</Link></li>
              <li><Link to="/schedule" className="hover:text-fuchsia-400 transition-colors flex items-center gap-3 group"><span className="text-fuchsia-500 w-1.5 h-1.5 rounded-full inline-block group-hover:scale-150 group-hover:shadow-[0_0_8px_#e83de8] transition-all" /> Schedule</Link></li>
              <li><Link to="/about" className="hover:text-fuchsia-400 transition-colors flex items-center gap-3 group"><span className="text-fuchsia-500 w-1.5 h-1.5 rounded-full inline-block group-hover:scale-150 group-hover:shadow-[0_0_8px_#e83de8] transition-all" /> About</Link></li>
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
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-green-500/50 group-hover:text-green-400 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all">
                  <MessageCircle size={16} />
                </div>
                <a href="https://chat.whatsapp.com/JJyxCwedZTnHCSFVvGxYGg" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors uppercase font-bold tracking-widest text-[11px]">Join WhatsApp Group</a>
              </li>
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
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-fuchsia-400 uppercase font-bold tracking-tighter">Saravanan</span>
                    <a href="tel:+919500439897" className="hover:text-white transition-colors">+91 95004 39897</a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-purple-400 uppercase font-bold tracking-tighter">Suresh</span>
                    <a href="tel:+919952480449" className="hover:text-white transition-colors">+91 99524 80449</a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-pink-400 uppercase font-bold tracking-tighter">Sabu</span>
                    <a href="tel:+918124156576" className="hover:text-white transition-colors">+91 81241 56576</a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-blue-400 uppercase font-bold tracking-tighter">Parameshwari</span>
                    <a href="tel:+919791701269" className="hover:text-white transition-colors">+91 97917 01269</a>
                  </div>
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
                <p className="text-white text-xs font-medium leading-relaxed">Saravanan <span className="text-gray-600 mx-1">|</span> Suresh<br />  Sabu <span className="text-gray-600 mx-1">|</span> Parameshwari</p>
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
          
          <div className="flex flex-col sm:flex-row items-stretch gap-6">
            {/* David Shalom - Highlighted Card */}
            <motion.a 
              href="https://github.com/davidShalom-git" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group p-4 rounded-2xl bg-fuchsia-500/5 border border-fuchsia-500/20 backdrop-blur-xl overflow-hidden shadow-[0_0_20px_rgba(232,61,232,0.1)] hover:shadow-[0_0_40px_rgba(232,61,232,0.3)] transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-400 shadow-[0_0_15px_rgba(232,61,232,0.2)] group-hover:scale-110 transition-transform duration-500">
                  <Github size={24} />
                </div>
                <div className="flex flex-col items-start pr-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] text-fuchsia-400 font-black tracking-[0.2em] uppercase px-2 py-0.5 rounded bg-fuchsia-400/10 border border-fuchsia-400/20">Lead Architect</span>
                  </div>
                  <span className="text-white text-lg font-heading font-black tracking-tight leading-tight">David Shalom</span>
                  <span className="text-gray-500 text-[10px] font-mono mt-1">@davidShalom-git</span>
                </div>
              </div>
            </motion.a>

            {/* Kirthik - Highlighted Card */}
            <motion.a 
              href="https://github.com/kirthik-nova" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20 backdrop-blur-xl overflow-hidden shadow-[0_0_20px_rgba(138,43,226,0.1)] hover:shadow-[0_0_40px_rgba(138,43,226,0.3)] transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 shadow-[0_0_15px_rgba(138,43,226,0.2)] group-hover:scale-110 transition-transform duration-500">
                  <Github size={24} />
                </div>
                <div className="flex flex-col items-start pr-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] text-purple-400 font-black tracking-[0.2em] uppercase px-2 py-0.5 rounded bg-purple-400/10 border border-purple-400/20">Core Interface</span>
                  </div>
                  <span className="text-white text-lg font-heading font-black tracking-tight leading-tight">Kirthik</span>
                  <span className="text-gray-500 text-[10px] font-mono mt-1">@kirthik-nova</span>
                </div>
              </div>
            </motion.a>
          </div>
        </motion.div>
        
      </div>
    </footer>
  );
};

export default Footer;