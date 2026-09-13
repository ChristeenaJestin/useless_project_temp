import React, { useEffect, useRef } from 'react';

export default function CosmicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
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

    // Mouse coordinates & smooth trailing aura position (lerp)
    let mouse = { x: width / 2, y: height / 2, active: false };
    let aura = { x: width / 2, y: height / 2 };

    // Cursor particle trail list
    const auraParticles = [];

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      // Spawn 2-4 cosmic tailing particles per move event
      const colors = ['#a855f7', '#38bdf8', '#fbbf24', '#f43f5e', '#ffffff'];
      for (let i = 0; i < 3; i++) {
        auraParticles.push({
          x: mouse.x + (Math.random() - 0.5) * 8,
          y: mouse.y + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 + 0.3,
          radius: Math.random() * 3 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.025 + 0.02
        });
      }

      // Limit particle array size
      if (auraParticles.length > 120) {
        auraParticles.splice(0, auraParticles.length - 120);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Static ambient stars
    const stars = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2 + 0.4,
      alpha: Math.random() * 0.6 + 0.2,
      twinkleSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      color: Math.random() > 0.5 ? '#e9d5ff' : '#bae6fd'
    }));

    // Animation Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw smooth cursor trailing aura glow (lantern effect)
      if (mouse.active) {
        // Smooth lerp for trailing aura center
        aura.x += (mouse.x - aura.x) * 0.15;
        aura.y += (mouse.y - aura.y) * 0.15;

        const auraGrad = ctx.createRadialGradient(
          aura.x, aura.y, 0,
          aura.x, aura.y, 140
        );
        auraGrad.addColorStop(0, 'rgba(168, 85, 247, 0.22)');
        auraGrad.addColorStop(0.3, 'rgba(56, 189, 248, 0.12)');
        auraGrad.addColorStop(0.7, 'rgba(251, 191, 36, 0.04)');
        auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(aura.x, aura.y, 140, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw & update cursor stardust tail particles
      for (let i = auraParticles.length - 1; i >= 0; i--) {
        const p = auraParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.radius *= 0.96;

        if (p.alpha <= 0 || p.radius < 0.2) {
          auraParticles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }

      // 3. Draw ambient twinkling stars
      stars.forEach((star) => {
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 0.8 || star.alpha < 0.15) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. Full-Screen Covering Faded Solar System Background */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/solar_system.jpg"
          alt="Solar System Background"
          className="w-full h-full object-cover opacity-[0.26] filter contrast-125 brightness-105 transform scale-105 transition-all duration-1000 ease-out pointer-events-none"
        />
        {/* Soft Vignette Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/95 via-transparent to-obsidian-950/80 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-60" />
      </div>

      {/* 2. Ambient Deep Cosmic Color Glows */}
      <div className="absolute inset-0 ambient-nebula opacity-70 pointer-events-none" />
      <div className="absolute inset-0 bg-cosmic-grid opacity-20 pointer-events-none" />

      {/* 3. Interactive Tailing Aura & Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />
    </div>
  );
}
