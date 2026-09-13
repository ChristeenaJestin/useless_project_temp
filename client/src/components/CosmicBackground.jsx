import React, { useEffect, useRef } from 'react';

export default function CosmicBackground() {
  const starsCanvasRef = useRef(null);

  useEffect(() => {
    const canvas = starsCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Ambient gentle twinkling stars
    const stars = Array.from({ length: 55 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.4 + 0.4,
      alpha: Math.random() * 0.7 + 0.2,
      speed: (Math.random() * 0.012 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      color: Math.random() > 0.4 ? '#ffffff' : '#fef08a'
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((s) => {
        s.alpha += s.speed;
        if (s.alpha > 0.9 || s.alpha < 0.15) {
          s.speed = -s.speed;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.shadowBlur = 6;
        ctx.shadowColor = s.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. Full-Bleed Faded Solar System Image covering the entire application background */}
      <img
        src="/solar_system.jpg"
        alt="Solar System Background"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none opacity-35 filter contrast-110 brightness-95 transition-opacity duration-700"
      />

      {/* 2. Atmospheric Cosmic Void Gradients for smooth fading */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-[#07080d]/40 pointer-events-none" />
      <div className="absolute inset-0 ambient-nebula opacity-25 pointer-events-none" />

      {/* 3. Ambient Twinkling Cosmic Stars */}
      <canvas
        ref={starsCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
