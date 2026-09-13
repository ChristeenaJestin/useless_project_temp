import React, { useState } from 'react';
import { 
  Orbit, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Folder, 
  Monitor, 
  Download, 
  HardDrive,
  Check
} from 'lucide-react';

const LOCATION_ICONS = {
  Monitor,
  Download,
  Folder,
  HardDrive
};

export default function Header({ 
  currentDir, 
  quickLocations = [], 
  onChangeDir, 
  onRefresh, 
  muted, 
  onToggleMute 
}) {
  const [isEditingPath, setIsEditingPath] = useState(false);
  const [inputPath, setInputPath] = useState(currentDir || '');

  const handlePathSubmit = (e) => {
    e.preventDefault();
    if (inputPath.trim()) {
      onChangeDir(inputPath.trim());
      setIsEditingPath(false);
    }
  };

  return (
    <header className="h-16 px-4 border-b border-white/[0.08] glass-panel flex items-center justify-between z-30 relative shrink-0">
      {/* Brand & Project Identity */}
      <div className="flex items-center space-x-3 shrink-0">
        <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-astral-purple/30 to-astral-fuchsia/20 border border-astral-purple/40 shadow-cosmic-glow">
          <Orbit className="w-5 h-5 text-astral-purple animate-spin-slow" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-astral-emerald animate-pulse"></span>
        </div>
        <div>
          <h1 className="text-base font-extrabold tracking-wider text-white font-syne flex items-center gap-1.5">
            AstroFS <span className="text-astral-purple font-mono font-normal text-[10px] px-1.5 py-0.5 rounded bg-astral-purple/15 border border-astral-purple/30">PC DRIVES & DESKTOP</span>
          </h1>
          <p className="text-[10px] text-slate-400 font-sans tracking-wide">
            Astrological File Interceptor for Windows PC
          </p>
        </div>
      </div>

      {/* Quick PC Locations (Desktop, Downloads, Documents, Drives) */}
      <div className="hidden lg:flex items-center space-x-1.5 bg-black/40 p-1 rounded-xl border border-white/[0.06]">
        {quickLocations.map((loc) => {
          const IconComp = LOCATION_ICONS[loc.icon] || Folder;
          const isActive = currentDir && currentDir.toLowerCase() === loc.path.toLowerCase();

          return (
            <button
              key={loc.path}
              onClick={() => onChangeDir(loc.path)}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                isActive 
                  ? 'bg-astral-purple/30 text-white border border-astral-purple/50 shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <IconComp className="w-3.5 h-3.5 text-astral-purple" />
              <span>{loc.name}</span>
            </button>
          );
        })}
      </div>

      {/* Center Path Input / Breadcrumb */}
      <div className="flex-1 max-w-sm mx-3 hidden sm:block">
        {isEditingPath ? (
          <form onSubmit={handlePathSubmit} className="flex items-center space-x-1.5">
            <input
              type="text"
              autoFocus
              value={inputPath}
              onChange={(e) => setInputPath(e.target.value)}
              placeholder="C:\Users\..."
              className="w-full bg-black/60 border border-astral-purple/50 rounded-lg px-2.5 py-1 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-astral-purple/40"
            />
            <button
              type="submit"
              className="p-1 rounded-lg bg-astral-purple text-white hover:bg-astral-purple/80"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          <div 
            onClick={() => {
              setInputPath(currentDir || '');
              setIsEditingPath(true);
            }}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-astral-purple/40 cursor-pointer transition-all truncate"
            title="Click to manually enter a path on your PC"
          >
            <Folder className="w-3.5 h-3.5 text-astral-purple shrink-0" />
            <span className="text-xs font-mono text-slate-300 truncate">
              {currentDir || 'Loading...'}
            </span>
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2 shrink-0">
        <button
          onClick={onRefresh}
          title="Refresh Directory"
          className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Refresh</span>
        </button>

        <button
          onClick={onToggleMute}
          title={muted ? "Unmute Audio" : "Mute Audio"}
          className="p-2 rounded-lg text-slate-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] transition-colors"
        >
          {muted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-astral-purple" />}
        </button>
      </div>
    </header>
  );
}
