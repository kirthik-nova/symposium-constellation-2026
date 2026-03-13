import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
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

const MainPage = () => {
  const [loading, setLoading]     = useState(true);
  const [hasEntered, setHasEntered] = useState(false);
  const [isRegOpen, setIsRegOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);

  const handlePreloaderComplete = () => {
    setLoading(false);  
    setTimeout(() => setHasEntered(true), 100);
  };



  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Handle specific routes that open modals
    if (location.pathname === '/register') {
      setIsRegOpen(true);
    } else if (location.pathname === '/track') {
      setIsTrackerOpen(true);
    }

    // Handle section scrolling
    const sections = ['events', 'schedule', 'about'];
    const path = location.pathname.replace('/', '');
    
    if (sections.includes(path)) {
      const el = document.getElementById(path);
      if (el) {
        // Short delay to ensure component is rendered
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else if (location.pathname === '/' || location.pathname === '/home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);

  // Sync state back to URL when modals close
  const handleRegClose = () => {
    setIsRegOpen(false);
    if (location.pathname === '/register') navigate('/');
  };

  const handleTrackerClose = () => {
    setIsTrackerOpen(false);
    if (location.pathname === '/track') navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-fuchsia-500/30 selection:text-white">
      <AnimatePresence mode="wait">
        {loading && (
          <Preloader key="preloader" onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      {!loading && (
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
            <Registration isOpen={isRegOpen} onClose={handleRegClose} />
            <TicketTracker isOpen={isTrackerOpen} onClose={handleTrackerClose} />
            <About />
          </main>

          <Footer />
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/events" element={<MainPage />} />
      <Route path="/schedule" element={<MainPage />} />
      <Route path="/about" element={<MainPage />} />
      <Route path="/register" element={<MainPage />} />
      <Route path="/track" element={<MainPage />} />
      <Route path="/ticket" element={<TicketPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
};

export default App;