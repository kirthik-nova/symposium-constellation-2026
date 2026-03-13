import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/events' },
    { name: 'Schedule', href: '/schedule' },
    { name: 'Ticket', href: '/track' },
    { name: 'About', href: '/about' },
    { name: 'Admin', href: '/admin' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-3 bg-[#000000]/85 backdrop-blur-xl border-b border-white/5 shadow-lg' : 'py-4 bg-[#000000]/20 backdrop-blur-xs'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative z-10">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(232,61,232,0.2)] group-hover:border-fuchsia-500/50 transition-all duration-500">
            <motion.img 
              src="/favicon.png" 
              alt="Constellation 2K26 Logo" 
              className="w-full h-full object-cover scale-110" 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              whileHover={{ rotate: 360, transition: { duration: 3 } }}
            />
          </div>
          <span className="text-white font-heading text-lg font-black tracking-tight group-hover:text-fuchsia-400 transition-colors duration-500">
            CONSTELLATION<span className="text-white/30 font-light ml-0.5 group-hover:text-white/50 transition-colors">2K26</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
            <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.href} 
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group py-2"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-fuchsia-400 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-full" />
                </Link>
              </li>
            ))}
          </ul>
          
          <Link to="/register" className="group relative px-6 py-2.5 rounded-full bg-white text-black font-bold text-sm overflow-hidden flex items-center gap-2 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-shadow">
            <span className="relative z-10">Register Now</span>
            <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-gray-300 hover:text-white relative z-10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-white/10 py-5 px-6 flex flex-col gap-5 shadow-2xl animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-400 hover:text-white font-medium text-base transition-colors py-1"
            >
              {link.name}
            </Link>
          ))}
          <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 rounded-xl bg-white text-black text-center font-bold text-base mt-2 shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95 transition-transform">
            Register Now
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;