import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import { MessageCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import NetworkBackground from './components/NetworkBackground';
import ParticleBackground from './components/ParticleBackground';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Schedule from './components/Schedule';
import Footer from './components/Footer';
import CountdownPoster from './components/CountdownPoster';
import Preloader from './components/Preloader';
import Registration from './components/Registration';
import TicketTracker from './components/TicketTracker';
import TicketPage from './components/TicketPage';
import AdminDashboard from './components/AdminDashboard';

import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Skip preloader for admin/ticket
  const isSpecialRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/ticket');
  
  const [loading, setLoading] = useState(!isSpecialRoute);
  const [hasEntered, setHasEntered] = useState(isSpecialRoute);

  const handlePreloaderComplete = () => {
    setLoading(false);
    setTimeout(() => setHasEntered(true), 100);
  };

  // Derived states for modals based on route
  const isRegOpen = location.pathname === '/register';
  const isTrackerOpen = location.pathname === '/track';

  const handleModalClose = () => {
    navigate('/');
  };

  useEffect(() => {
    if (isSpecialRoute) {
      setLoading(false);
      setHasEntered(true);
    }
  }, [location.pathname, isSpecialRoute]);

  useEffect(() => {
    // Handle section scrolling
    const sections = ['events', 'schedule', 'about'];
    const path = location.pathname.replace('/', '');
    
    if (sections.includes(path)) {
      const el = document.getElementById(path);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else if (location.pathname === '/' || location.pathname === '/home') {
      if (hasEntered && !isRegOpen && !isTrackerOpen) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [location.pathname, hasEntered, isRegOpen, isTrackerOpen]);

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-fuchsia-500/30 selection:text-white">
      <AnimatePresence mode="wait">
        {loading && (
          <Preloader key="preloader" onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/ticket" element={<TicketPage />} />
        <Route path="*" element={
          !loading && (
            <div className="relative">
              <NetworkBackground />
              <ParticleBackground />

              <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={hasEntered ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="z-[60]"
              >
                <Navbar />
              </motion.div>

              <main className="relative z-10">
                <Hero hasEntered={hasEntered} />
                <CountdownPoster />
                <Events />
                <Schedule />
                <Registration isOpen={isRegOpen} onClose={handleModalClose} />
                <TicketTracker isOpen={isTrackerOpen} onClose={handleModalClose} />
                <About />
              </main>

              <Footer />

              {/* Floating WhatsApp Button */}
              <motion.a
                href="https://chat.whatsapp.com/JJyxCwedZTnHCSFVvGxYGg"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0, opacity: 0 }}
                animate={hasEntered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[70] w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] group transition-all"
                title="Join WhatsApp Community"
              >
                <MessageCircle size={30} className="text-white" />
                <span className="absolute right-full mr-3 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Join Community
                </span>
              </motion.a>
            </div>
          )
        } />
      </Routes>

      <Toaster theme="dark" position="top-center" richColors />
    </div>
  );
};

export default App;