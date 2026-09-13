import React, { useEffect, useRef } from 'react';

export default function CursorAura() {
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

    // Mouse coordinates and movement dynamics
    let mouse = { x: width / 2, y: height / 2 };
    let prevMouse = { x: width / 2, y: height / 2 };
    let smoothPos = { x: width / 2, y: height / 2 };
    let isMoving = false;
    let motionIntensity = 0;
    let lastMoveTime = 0;
    let rotationAngle = 0;

    // Stardust trail particles
    const particles = [];
    const PARTICLE_COLORS = [
      '#fef08a', // luminous light gold
      '#facc15', // vibrant gold
      '#fbbf24', // amber starlight
      '#c084fc', // celestial violet
      '#a855f7', // astral purple
      '#38bdf8', // cosmic cyan
      '#ffffff'  // pure white spark
    ];

    const handleMouseMove = (e) => {
      const now = performance.now();
      const dx = e.clientX - mouse.x;
      const dy = e.clientY - mouse.y;
      const speed = Math.hypot(dx, dy);

      prevMouse.x = mouse.x;
      prevMouse.y = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      isMoving = true;
      lastMoveTime = now;

      // Spawn glowing stardust particles while cursor is moving
      const count = Math.min(Math.floor(speed / 4) + 2, 7);
      for (let i = 0; i < count; i++) {
        const spread = (Math.random() - 0.5) * 12;
        const angle = Math.atan2(dy, dx) + Math.PI + (Math.random() - 0.5) * 1.2;
        const pSpeed = Math.random() * 2.2 + 0.5;

        particles.push({
          x: mouse.x + spread,
          y: mouse.y + spread,
          vx: Math.cos(angle) * pSpeed + (Math.random() - 0.5) * 0.8,
          vy: Math.sin(angle) * pSpeed + (Math.random() - 0.5) * 0.8 - 0.3,
          radius: Math.random() * 2.8 + 1.2,
          color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
          alpha: 1.0,
          decay: Math.random() * 0.028 + 0.022,
          sparkle: Math.random() * Math.PI * 2
        });
      }

      // Limit particle count for high 60fps performance
      if (particles.length > 90) {
        particles.splice(0, particles.length - 90);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const now = performance.now();
      const timeSinceMove = now - lastMoveTime;

      // Calculate motion intensity (quickly ramps to 1 when moving, smoothly fades to 0.18 when still)
      if (timeSinceMove < 150) {
        motionIntensity += (1.0 - motionIntensity) * 0.25;
      } else {
        motionIntensity += (0.15 - motionIntensity) * 0.08;
      }

      // Smooth trailing interpolation
      smoothPos.x += (mouse.x - smoothPos.x) * 0.35;
      smoothPos.y += (mouse.y - smoothPos.y) * 0.35;
      rotationAngle += 0.03 + motionIntensity * 0.08;

      // 1. Draw Shining Radiant Cursor Aura (Visible on top of everything)
      if (motionIntensity > 0.02) {
        const auraRadius = 80 + motionIntensity * 55; // 80px to 135px radius

        // Outer soft radiant halo
        const haloGrad = ctx.createRadialGradient(
          smoothPos.x, smoothPos.y, 0,
          smoothPos.x, smoothPos.y, auraRadius
        );
        haloGrad.addColorStop(0, `rgba(254, 240, 138, ${0.45 * motionIntensity})`);
        haloGrad.addColorStop(0.25, `rgba(250, 204, 21, ${0.30 * motionIntensity})`);
        haloGrad.addColorStop(0.55, `rgba(168, 85, 247, ${0.22 * motionIntensity})`);
        haloGrad.addColorStop(0.85, `rgba(56, 189, 248, ${0.08 * motionIntensity})`);
        haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.save();
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(smoothPos.x, smoothPos.y, auraRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Brilliant inner core starlight (at exact mouse point)
        const coreGrad = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 24
        );
        coreGrad.addColorStop(0, `rgba(255, 255, 255, ${0.95 * motionIntensity})`);
        coreGrad.addColorStop(0.3, `rgba(254, 240, 138, ${0.75 * motionIntensity})`);
        coreGrad.addColorStop(0.7, `rgba(234, 179, 8, ${0.35 * motionIntensity})`);
        coreGrad.addColorStop(1, 'rgba(234, 179, 8, 0)');

        ctx.save();
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 24, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Four-point shimmering starlight lens flare rays while moving
        if (motionIntensity > 0.25) {
          ctx.save();
          ctx.translate(mouse.x, mouse.y);
          ctx.rotate(rotationAngle);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.65 * motionIntensity})`;
          ctx.lineWidth = 1.5;
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#facc15';

          const rayLen = 16 + motionIntensity * 14;
          // Horizontal & vertical primary flare
          ctx.beginPath();
          ctx.moveTo(-rayLen, 0);
          ctx.lineTo(rayLen, 0);
          ctx.moveTo(0, -rayLen);
          ctx.lineTo(0, rayLen);
          ctx.stroke();

          // Diagonal subtle secondary flare
          ctx.strokeStyle = `rgba(254, 240, 138, ${0.4 * motionIntensity})`;
          ctx.lineWidth = 1;
          const diagLen = rayLen * 0.6;
          ctx.beginPath();
          ctx.moveTo(-diagLen, -diagLen);
          ctx.lineTo(diagLen, diagLen);
          ctx.moveTo(-diagLen, diagLen);
          ctx.lineTo(diagLen, -diagLen);
          ctx.stroke();

          ctx.restore();
        }
      }

      // 2. Draw trailing stardust particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.radius *= 0.96;
        p.sparkle += 0.2;

        if (p.alpha <= 0 || p.radius < 0.3) {
          particles.splice(i, 1);
          continue;
        }

        const currentAlpha = p.alpha * (0.8 + 0.2 * Math.sin(p.sparkle));

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }

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
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 select-none"
      style={{ pointerEvents: 'none' }}
    />
  );
}
