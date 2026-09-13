import React, { useState, useEffect } from 'react';
import { Orbit, Sparkles, ShieldCheck, Terminal, ChevronRight, Zap } from 'lucide-react';
import AstroLogo from './AstroLogo';
import { soundEffects } from './SoundFx';

const BOOT_STAGES = [
  { progress: 15, text: "Mounting Planetary File Allocation Table (FAT-Zodiac)...", tag: "KERNEL" },
  { progress: 35, text: "Scanning local NTFS drives for Mercury Retrograde interference...", tag: "EPHEMERIS" },
  { progress: 55, text: "Aligning 12 astrological houses with desktop system sectors...", tag: "ZODIAC" },
  { progress: 75, text: "Calibrating byte-mass karma scales & psychic confidence matrix...", tag: "ORACLE" },
  { progress: 92, text: "Arming cosmic firewall & loophole bypass ritual chamber...", tag: "SECURITY" },
  { progress: 100, text: "Planetary alignment verified. Seraphic clearance granted.", tag: "READY" }
];

const ZODIAC_GLYPHS = [
  { sign: 'Aries', glyph: '♈' },
  { sign: 'Taurus', glyph: '♉' },
  { sign: 'Gemini', glyph: '♊' },
  { sign: 'Cancer', glyph: '♋' },
  { sign: 'Leo', glyph: '♌' },
  { sign: 'Virgo', glyph: '♍' },
  { sign: 'Libra', glyph: '♎' },
  { sign: 'Scorpio', glyph: '♏' },
  { sign: 'Sagittarius', glyph: '♐' },
  { sign: 'Capricorn', glyph: '♑' },
  { sign: 'Aquarius', glyph: '♒' },
  { sign: 'Pisces', glyph: '♓' }
];

export default function CosmicSplashLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [logs, setLogs] = useState([]);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let currentP = 0;
    let stageIdx = 0;

    // Fast-advancing cosmic boot progression
    const interval = setInterval(() => {
      currentP += Math.floor(Math.random() * 4) + 2;

      if (currentP >= 100) {
        currentP = 100;
        clearInterval(interval);
      }

      setProgress(currentP);

      // Advance boot logs
      if (stageIdx < BOOT_STAGES.length && currentP >= BOOT_STAGES[stageIdx].progress) {
        const nextStage = BOOT_STAGES[stageIdx];
        setLogs(prev => [...prev.slice(-3), nextStage]);
        setCurrentStageIdx(stageIdx);
        stageIdx++;
      }

      if (currentP === 100) {
        soundEffects.playBootChime();
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 650);
        }, 500);
      }
    }, 45);

    // Allow keyboard ESC or Space to skip immediately
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
    }, 450);
  };

  const currentStage = BOOT_STAGES[currentStageIdx] || BOOT_STAGES[0];

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-10 bg-[#06070b] overflow-hidden transition-all duration-700 ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Animated Cosmic Field */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Deep space nebula radial gradients */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-astral-purple/20 rounded-full blur-[140px] animate-pulse-slow" />
        <div className="absolute -bottom-32 left-1/4 w-[600px] h-[400px] bg-astral-cyan/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-astral-fuchsia/15 rounded-full blur-[100px]" />

        {/* Huge Faint Rotating Zodiac Wheel */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full border border-white/[0.04] animate-[spin_120s_linear_infinite] opacity-30 flex items-center justify-center">
          <div className="absolute inset-8 rounded-full border border-dashed border-astral-purple/20 animate-[spin_80s_linear_infinite_reverse]" />
          <div className="absolute inset-24 rounded-full border border-white/[0.03]" />
          {ZODIAC_GLYPHS.map((item, idx) => {
            const angle = (idx * 360) / ZODIAC_GLYPHS.length;
            const radius = 295;
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;
            return (
              <span
                key={item.sign}
                style={{
                  transform: `translate(${x}px, ${y}px) rotate(${angle + 90}deg)`
                }}
                className="absolute text-sm font-mono text-purple-300/40 select-none"
              >
                {item.glyph}
              </span>
            );
          })}
        </div>

        {/* Ambient Star Sparks */}
        <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />
      </div>

      {/* Top Header Status Bar */}
      <div className="w-full max-w-2xl flex items-center justify-between text-[11px] font-mono text-slate-400 relative z-10">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-astral-purple opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-astral-purple" />
          </span>
          <span className="text-white font-semibold tracking-wider">ASTROFS KERNEL v3.4.1</span>
        </div>
        <div className="flex items-center gap-3 text-slate-500">
          <span>NTFS INTERCEPTOR</span>
          <span className="text-white/20">•</span>
          <span className="text-astral-cyan">WINDOWS PC SYSTEM</span>
        </div>
      </div>

      {/* Centerpiece Hero Animation */}
      <div className="flex flex-col items-center justify-center text-center space-y-6 relative z-10 my-auto">
        {/* Pulsing Ripple Rings around Logo */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-36 h-36 rounded-full border border-astral-purple/20 animate-ping opacity-25" />
          <div className="absolute w-28 h-28 rounded-full border border-astral-cyan/30 animate-pulse" />
          <AstroLogo size="xl" showStatus={false} />
        </div>

        {/* Brand Titles with Syne Font */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-[10px] font-mono font-semibold tracking-widest text-purple-300 uppercase shadow-cosmic-glow">
            <Sparkles className="w-3 h-3 text-purple-300 animate-pulse" />
            Cosmic OS Gatekeeper Initialization
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-[0.25em] text-white font-syne drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]">
            ASTROFS
          </h1>
          <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-md mx-auto leading-relaxed">
            Aligning local computer filesystem with planetary coordinates and celestial transit ephemeris
          </p>
        </div>

        {/* High-Tech Progress Bar */}
        <div className="w-72 sm:w-96 space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Orbit className="w-3.5 h-3.5 text-astral-purple animate-spin-slow" />
              <span>{currentStage.tag}</span>
            </span>
            <span className="text-white font-bold tracking-wider">{progress}%</span>
          </div>

          <div className="w-full h-2 rounded-full bg-black/60 p-0.5 border border-white/10 overflow-hidden relative shadow-inner">
            <div 
              style={{ width: `${progress}%` }}
              className="h-full rounded-full bg-gradient-to-r from-astral-purple via-astral-fuchsia via-astral-cyan to-emerald-400 transition-all duration-75 relative shadow-[0_0_12px_rgba(168,85,247,0.8)]"
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Satirical Live Celestial Boot Telemetry Log Box */}
        <div className="w-full max-w-lg p-3.5 rounded-xl bg-black/60 border border-white/[0.08] backdrop-blur-md text-left font-mono text-xs space-y-1.5 shadow-2xl">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 border-b border-white/[0.06] pb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-purple-300">
              <Terminal className="w-3 h-3 text-astral-purple" />
              Astral Ephemeris Boot Stream
            </span>
            <span className="text-[9px] text-emerald-400">ONLINE</span>
          </div>

          <div className="space-y-1 min-h-[48px] flex flex-col justify-end">
            {logs.slice(-2).map((log, idx) => (
              <div key={idx} className="flex items-start space-x-2 text-[11px] text-slate-300 animate-fade-in leading-relaxed">
                <ChevronRight className="w-3 h-3 text-astral-cyan shrink-0 mt-0.5" />
                <span className="text-slate-200">{log.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer Action Bar */}
      <div className="w-full max-w-2xl flex items-center justify-between text-xs font-mono relative z-10 pt-4 border-t border-white/[0.06]">
        <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Local PC Drive Protection Active</span>
        </div>

        <button
          type="button"
          onClick={handleSkip}
          className="px-3.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-astral-purple/40 text-[11px] text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer group"
        >
          <span>Enter Workspace</span>
          <span className="text-slate-500 group-hover:text-astral-purple font-sans">[Skip]</span>
          <Zap className="w-3 h-3 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
