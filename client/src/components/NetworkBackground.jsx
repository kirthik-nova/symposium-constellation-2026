import React, { useEffect, useRef } from 'react';

const NetworkBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let   raf;

    const isMobile     = window.innerWidth < 768;
    const COUNT        = isMobile ? 28 : 48;
    const MAX_DIST     = 180;
    let   particles    = [];

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const COLORS = ['#e83de8','#8a2be2','#d946ef','#a855f7'];

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x      = Math.random() * canvas.width;
        this.y      = Math.random() * canvas.height;
        this.vx     = (Math.random() - 0.5) * 0.35;
        this.vy     = (Math.random() - 0.5) * 0.35;
        this.r      = Math.random() * 2.2 + 0.8;
        this.color  = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.alpha  = Math.random() * 0.5 + 0.4;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width)  this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height)  this.vy = -this.vy;
      }
      draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Init
    particles = Array.from({ length: COUNT }, () => new Particle());

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const opacity = 0.18 * (1 - dist / MAX_DIST);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(200,100,255,${opacity})`;
            ctx.lineWidth   = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-[#030008] pointer-events-none overflow-hidden">

      {/* Static ambient glows — no JS animation, just CSS breathing */}
      <div
        className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full
                   bg-purple-700/18 blur-[130px] animate-pulse"
        style={{ animationDuration: '8s', willChange: 'opacity' }}
      />
      <div
        className="absolute -bottom-[10%] -right-[10%] w-[60vw] h-[60vw] rounded-full
                   bg-fuchsia-700/14 blur-[130px] animate-pulse"
        style={{ animationDuration: '11s', animationDelay: '3s', willChange: 'opacity' }}
      />
      <div
        className="absolute top-[40%] left-[30%] w-[35vw] h-[35vw] rounded-full
                   bg-violet-700/8 blur-[100px] animate-pulse"
        style={{ animationDuration: '15s', animationDelay: '6s', willChange: 'opacity' }}
      />

      {/* Canvas — particle network */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.72 }}
      />

      {/* Subtle dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Centre-fade vignette — keeps edges dark */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#030008_100%)] opacity-70" />
    </div>
  );
};

export default NetworkBackground;