import React, { useState, useEffect } from 'react';
import AstroLogo from './AstroLogo';
import { soundEffects } from './SoundFx';

export default function CosmicSplashLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const TOTAL_DURATION = 4000; // Exactly 4 seconds duration
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, Math.floor((elapsed / TOTAL_DURATION) * 100));

      setProgress(currentProgress);

      if (elapsed >= TOTAL_DURATION) {
        clearInterval(interval);
        setProgress(100);
        soundEffects.playBootChime();
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500);
        }, 300);
      }
    }, 35);

    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.key === 'Escape' || e.key === 'Enter') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSkip = () => {
    soundEffects.playClick();
    soundEffects.playBootChime();
    setProgress(100);
    setIsExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 300);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#06070b] overflow-hidden transition-all duration-700 select-none ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Soft Ambient Cosmic Glow */}
      <div className="absolute w-[500px] h-[500px] bg-astral-purple/15 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />

      {/* Centered Minimal Brand & Loader */}
      <div className="relative z-10 flex flex-col items-center space-y-5 text-center">
        {/* Logo */}
        <AstroLogo size="xl" showStatus={false} />

        {/* Clean Title */}
        <h1 className="text-2xl sm:text-3xl font-light tracking-[0.25em] text-white font-outfit">
          ASTRO<span className="font-bold text-astral-purple">FS</span>
        </h1>

        {/* Elegant Minimal Progress Bar */}
        <div className="w-44 sm:w-52 space-y-2 pt-2">
          <div className="w-full h-1 rounded-full bg-white/[0.08] overflow-hidden relative">
            <div 
              style={{ width: `${progress}%` }}
              className="h-full rounded-full bg-gradient-to-r from-astral-purple via-astral-fuchsia to-astral-cyan transition-all duration-75 shadow-[0_0_10px_rgba(168,85,247,0.7)]"
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 tracking-wider">
            <span>INITIALIZING</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>

      {/* Discrete Skip Link */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute bottom-8 text-[11px] font-mono text-slate-600 hover:text-slate-300 transition-colors cursor-pointer tracking-wider"
      >
        Skip →
      </button>
    </div>
  );
}
