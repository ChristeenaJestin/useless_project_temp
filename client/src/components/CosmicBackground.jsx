import React, { useEffect, useRef } from 'react';

export default function CosmicBackground() {
  const canvasRef = useRef(null);

  // Twinkling stars and shooting meteor particles
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

    // Create 55 twinkling stars
    const stars = Array.from({ length: 55 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.7 + 0.2,
      twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      color: Math.random() > 0.6 ? '#c084fc' : Math.random() > 0.3 ? '#38bdf8' : '#ffffff'
    }));

    // Shooting meteor effect
    let meteor = null;
    const spawnMeteor = () => {
      meteor = {
        x: Math.random() * (width * 0.8),
        y: Math.random() * (height * 0.3),
        length: Math.random() * 90 + 70,
        speed: Math.random() * 10 + 8,
        angle: (Math.PI / 4) + (Math.random() * 0.15 - 0.07),
        opacity: 1
      };
    };

    // Spawn first meteor after 3s, then every 7-14s
    let meteorTimeout = setTimeout(function loop() {
      spawnMeteor();
      meteorTimeout = setTimeout(loop, Math.random() * 7000 + 7000);
    }, 3000);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render & update twinkling stars
      stars.forEach((star) => {
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 0.85 || star.alpha < 0.15) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        star.x += star.vx;
        star.y += star.vy;
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
        ctx.shadowBlur = 4;
        ctx.shadowColor = star.color;
        ctx.fill();
      });

      // Render shooting meteor if active
      if (meteor) {
        ctx.save();
        const tailX = meteor.x - Math.cos(meteor.angle) * meteor.length;
        const tailY = meteor.y - Math.sin(meteor.angle) * meteor.length;

        const grad = ctx.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
        grad.addColorStop(0, 'rgba(168, 85, 247, 0)');
        grad.addColorStop(0.6, `rgba(56, 189, 248, ${meteor.opacity * 0.5})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${meteor.opacity})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(meteor.x, meteor.y);
        ctx.stroke();

        meteor.x += Math.cos(meteor.angle) * meteor.speed;
        meteor.y += Math.sin(meteor.angle) * meteor.speed;
        meteor.opacity -= 0.015;

        if (meteor.opacity <= 0 || meteor.x > width || meteor.y > height) {
          meteor = null;
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(meteorTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. Deep Nebula Ambient Glows */}
      <div className="absolute inset-0 ambient-nebula opacity-90" />
      <div className="absolute inset-0 bg-cosmic-grid opacity-35" />

      {/* 2. Large Faded Animated Astrological Zodiac Wheel Centerpiece */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] md:w-[840px] md:h-[840px] flex items-center justify-center pointer-events-none">
        {/* Pulsing Ethereal Radial Core Glow */}
        <div className="absolute inset-12 rounded-full bg-gradient-to-tr from-purple-600/20 via-fuchsia-500/15 to-cyan-500/20 blur-3xl animate-pulse-slow pointer-events-none" />

        {/* Outer Rotating Sacred Ring */}
        <div className="absolute inset-4 rounded-full border border-purple-500/15 animate-spin-slow pointer-events-none" />
        <div className="absolute inset-16 rounded-full border border-cyan-400/10 border-dashed animate-celestial-drift pointer-events-none" />

        {/* Faded Zodiac Chart Image */}
        <div className="relative w-full h-full rounded-full overflow-hidden [mask-image:radial-gradient(circle_at_center,black_48%,transparent_88%)] [-webkit-mask-image:radial-gradient(circle_at_center,black_48%,transparent_88%)]">
          <img
            src="/zodiac_wheel.jpg"
            alt="Faded Celestial Zodiac Chart"
            className="w-full h-full object-cover mix-blend-screen opacity-[0.22] filter contrast-125 brightness-110 animate-celestial-drift"
          />
        </div>
      </div>

      {/* 3. Twinkling Stardust & Meteor Canvas Overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
