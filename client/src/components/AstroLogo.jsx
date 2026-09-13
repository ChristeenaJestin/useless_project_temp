import React from 'react';

export default function AstroLogo({ size = 'md', className = '', showStatus = true }) {
  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  const containerSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`relative group flex items-center justify-center ${containerSize} ${className}`}>
      {/* Outer Ambient Cosmic Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-astral-purple/30 via-astral-fuchsia/20 to-astral-cyan/30 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Main Glass Shield Enclosure */}
      <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-obsidian-900/90 via-obsidian-950/95 to-black border border-white/[0.12] group-hover:border-astral-purple/50 shadow-cosmic-glow p-1 flex items-center justify-center overflow-hidden transition-all duration-300">
        
        {/* Subtle Background Radial Light */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.25)_0%,transparent_70%)] pointer-events-none" />

        {/* Vector SVG Emblem */}
        <svg 
          viewBox="0 0 64 64" 
          className="w-full h-full relative z-10 transition-transform duration-500 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoPrimaryOrbit" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc"/>
              <stop offset="50%" stopColor="#a855f7"/>
              <stop offset="100%" stopColor="#06b6d4"/>
            </linearGradient>

            <linearGradient id="logoGoldAccent" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b"/>
              <stop offset="50%" stopColor="#fbbf24"/>
              <stop offset="100%" stopColor="#fef08a"/>
            </linearGradient>

            <linearGradient id="logoStarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff"/>
              <stop offset="30%" stopColor="#f3e8ff"/>
              <stop offset="65%" stopColor="#c084fc"/>
              <stop offset="100%" stopColor="#6366f1"/>
            </linearGradient>

            <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Rotating Outer Coordinate Ring */}
          <g className="origin-center animate-[spin_25s_linear_infinite]">
            <circle 
              cx="32" 
              cy="32" 
              r="27" 
              stroke="url(#logoPrimaryOrbit)" 
              strokeWidth="1.2" 
              strokeOpacity="0.45" 
              strokeDasharray="3 4"
            />
            <circle cx="32" cy="5" r="1.6" fill="#facc15" />
            <circle cx="32" cy="59" r="1.6" fill="#facc15" />
            <circle cx="5" cy="32" r="1.6" fill="#38bdf8" />
            <circle cx="59" cy="32" r="1.6" fill="#38bdf8" />
          </g>

          {/* Gyroscopic Astrological Spheres */}
          <ellipse 
            cx="32" 
            cy="32" 
            rx="23" 
            ry="10" 
            transform="rotate(-35 32 32)" 
            stroke="url(#logoPrimaryOrbit)" 
            strokeWidth="1.3" 
            strokeOpacity="0.7"
          />
          <ellipse 
            cx="32" 
            cy="32" 
            rx="23" 
            ry="10" 
            transform="rotate(35 32 32)" 
            stroke="url(#logoPrimaryOrbit)" 
            strokeWidth="1.3" 
            strokeOpacity="0.7"
          />

          {/* Planetary Orbit Nodes */}
          <circle cx="16" cy="20" r="1.8" fill="#fef08a" filter="url(#logoGlow)" />
          <circle cx="48" cy="44" r="1.8" fill="#38bdf8" filter="url(#logoGlow)" />

          {/* Geometric Octagram Star */}
          <polygon 
            points="32,15 36,28 49,32 36,36 32,49 28,36 15,32 28,28" 
            fill="none" 
            stroke="url(#logoGoldAccent)" 
            strokeWidth="1" 
            strokeOpacity="0.6"
          />

          {/* Central Celestial Starburst Emblem */}
          <path 
            d="M 32 10 
               C 32 22 22 32 10 32 
               C 22 32 32 42 32 54 
               C 32 42 42 32 54 32 
               C 42 32 32 22 32 10 Z" 
            fill="url(#logoStarGradient)" 
            filter="url(#logoGlow)"
            className="drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]"
          />

          {/* Inner Astrological Quantum Nexus */}
          <rect 
            x="27.5" 
            y="27.5" 
            width="9" 
            height="9" 
            rx="2" 
            transform="rotate(45 32 32)" 
            fill="#07080d" 
            stroke="#fef08a" 
            strokeWidth="1.2"
          />
          <circle cx="32" cy="32" r="2" fill="#38bdf8" filter="url(#logoGlow)" />
        </svg>
      </div>

      {/* Active Celestial Pulse Indicator */}
      {showStatus && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3 z-20">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-obsidian-950 shadow-sm shadow-emerald-400/50" />
        </span>
      )}
    </div>
  );
}
