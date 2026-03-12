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
import { useEffect, useRef, useState } from 'react';

function App() {
  const [loading, setLoading]     = useState(true);
  const [hasEntered, setHasEntered] = useState(false);
  const [isRegOpen, setIsRegOpen] = useState(false);
  const audioRef = useRef(null);

  // After preloader exits, start entry sequence
  const handlePreloaderComplete = (audio) => {
    audioRef.current = audio;
    setLoading(false);  
    // Small tick so the DOM settles before animations fire
    setTimeout(() => setHasEntered(true), 100);
  };

  // Slow Cinematic Fade Out
  useEffect(() => {
    if (!hasEntered) return;
    
    const audio = audioRef.current;
    if (!audio) return;

    const performFadeOut = () => {
      // Start a slow interval-based fade
      const fadeInterval = setInterval(() => {
        if (audio.volume > 0.015) {
          // Decrement by 0.01 every 50ms = 0.2 volume per second
          // From 0.7 to 0 takes ~3.5 seconds
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

  // Smooth anchor scroll
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
      if (href?.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-fuchsia-500/30 selection:text-white">
      <Toaster theme="dark" position="top-center" richColors />
      <AnimatePresence mode="wait">
        {loading && (
          <Preloader key="preloader" onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      {/* Only mount page content after preloader is fully gone */}
      {!loading && (
        <div className="relative">
          {/* Permanent backgrounds */}
          <NetworkBackground />
          <ParticleBackground />

          {/* ── Navbar slides down from top ── */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={hasEntered ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="fixed top-0 left-0 w-full z-[60]"
          >
            <Navbar />
          </motion.div>

          {/* ── Hero: passed hasEntered so it waits cleanly ── */}
          <main className="relative z-10">
            <Hero hasEntered={hasEntered} />

            {/* Content reveals as normal */}
            <CountdownPoster />
            <Events />
            <Schedule />
            <Registration isOpen={isRegOpen} onClose={() => setIsRegOpen(false)} />
            <About />
          </main>

          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;