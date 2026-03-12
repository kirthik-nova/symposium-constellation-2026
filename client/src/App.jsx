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
import UnderConstruction from './components/UnderConstruction';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const MainPage = () => {
  const [loading, setLoading]     = useState(true);
  const [hasEntered, setHasEntered] = useState(false);
  const [isRegOpen, setIsRegOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const audioRef = useRef(null);

  const handlePreloaderComplete = (audio) => {
    audioRef.current = audio;
    setLoading(false);  
    setTimeout(() => setHasEntered(true), 100);
  };

  useEffect(() => {
    if (!hasEntered) return;
    const audio = audioRef.current;
    if (!audio) return;

    const performFadeOut = () => {
      const fadeInterval = setInterval(() => {
        if (audio.volume > 0.015) {
          audio.volume = Math.max(0, audio.volume - 0.01);
        } else {
          audio.volume = 0;
          audio.pause();
          clearInterval(fadeInterval);
        }
      }, 50);
    };

    const onScroll = () => {
      if (window.scrollY > 100 && !audio.paused) {
        window.removeEventListener('scroll', onScroll);
        performFadeOut();
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [hasEntered]);

  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href === '#register') {
        e.preventDefault();
        setIsRegOpen(true);
        return;
      }
      if (href === '#track') {
        e.preventDefault();
        setIsTrackerOpen(true);
        return;
      }
      if (href?.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

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
            <Registration isOpen={isRegOpen} onClose={() => setIsRegOpen(false)} />
            <TicketTracker isOpen={isTrackerOpen} onClose={() => setIsTrackerOpen(false)} />
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
      <Route path="/" element={<UnderConstruction />} />
      <Route path="/home" element={<MainPage />} />
    </Routes>
  );
};

export default App;