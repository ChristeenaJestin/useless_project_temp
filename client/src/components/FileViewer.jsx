import React from 'react';
import { 
  Lock, 
  Unlock, 
  Trash2, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Terminal, 
  FileCode, 
  Code2, 
  FileText, 
  Image as ImageIcon,
  Compass,
  Zap
} from 'lucide-react';
import { soundEffects } from './SoundFx';

export default function FileViewer({ 
  file, 
  fileContent, 
  isOpen, 
  onInterceptAction 
}) {
  if (!file) {
    return (
      <main className="flex-1 h-full flex flex-col items-center justify-center p-8 bg-transparent relative text-center overflow-hidden">
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center mb-4 text-slate-300 shadow-cosmic-glow">
            <Compass className="w-8 h-8 text-astral-purple animate-spin-slow" />
          </div>
          <h3 className="text-sm font-mono font-semibold text-slate-100">No File Selected</h3>
          <p className="text-xs font-mono text-slate-300 max-w-sm mt-1.5 leading-relaxed">
            Select any real file from your PC in the left explorer to inspect its spiritual structure or initiate a psychic file operation.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 h-full flex flex-col bg-transparent overflow-hidden relative">
      {/* File Action & Breadcrumb Bar */}
      <div className="h-12 px-4 border-b border-white/[0.08] glass-panel flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2.5 min-w-0">
          <span className="text-xs font-mono font-bold text-white truncate flex items-center gap-1.5">
            {file.name}
          </span>
          <span className="text-[11px] font-mono text-slate-500 truncate hidden md:inline">
            ({file.path})
          </span>
          
          {/* Status Badge */}
          {isOpen ? (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-1">
              <Unlock className="w-2.5 h-2.5" /> DECRYPTED & OPEN
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center gap-1">
              <Lock className="w-2.5 h-2.5" /> CELESTIAL SHROUD (SEALED)
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 shrink-0">
          {!isOpen && (
            <button
              onClick={() => {
                soundEffects.playClick();
                onInterceptAction(file, 'open');
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-astral-purple/20 hover:bg-astral-purple/30 text-astral-purple hover:text-white border border-astral-purple/40 shadow-sm flex items-center space-x-1.5 transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Open File</span>
            </button>
          )}

          {isOpen && (
            <button
              onClick={() => {
                soundEffects.playClick();
                onInterceptAction(file, 'close');
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 shadow-sm flex items-center space-x-1.5 transition-all"
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span>Close File</span>
            </button>
          )}

          <button
            onClick={() => {
              soundEffects.playClick();
              onInterceptAction(file, 'delete');
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 hover:text-rose-100 border border-rose-500/30 shadow-sm flex items-center space-x-1.5 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-400" />
            <span>Delete File</span>
          </button>
        </div>
      </div>

      {/* File Astrological Identity Strip */}
      <div className="px-4 py-2 bg-black/30 backdrop-blur-md border-b border-white/[0.06] text-[11px] font-mono flex items-center justify-between text-slate-400 shrink-0">
        <div className="flex items-center space-x-4">
          <span><strong className="text-slate-300">Zodiac Sign:</strong> {file.astrologicalSign}</span>
          <span><strong className="text-slate-300">Element:</strong> {file.element}</span>
          <span><strong className="text-slate-300">Planetary Ruler:</strong> {file.planetaryRuler}</span>
        </div>
        <div className="flex items-center space-x-1 text-astral-purple text-[10px]">
          <Sparkles className="w-3 h-3" />
          <span>Real PC File Birth Chart</span>
        </div>
      </div>

      {/* Viewport Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {!isOpen && (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-fade-in">
            {/* Celestial Holographic Seal with Orbit Rings */}
            <div className="relative w-64 h-64 mb-6 flex items-center justify-center group">
              {/* Pulsing Ambient Solar & Nebula Glow */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-amber-500/20 via-purple-600/25 to-cyan-500/20 blur-2xl animate-pulse-slow pointer-events-none" />
              
              {/* Concentric Subtle Orbit Rings */}
              <div className="absolute inset-0 rounded-full border border-astral-purple/40 animate-spin-slow pointer-events-none" />
              <div className="absolute inset-4 rounded-full border border-amber-400/30 border-dashed animate-pulse pointer-events-none" />
              <div className="absolute inset-8 rounded-full border border-cyan-400/20 pointer-events-none" />
              <div className="absolute inset-14 rounded-full border border-purple-400/25 border-dotted pointer-events-none" />

              {/* Center Seal Emblem */}
              <div className="relative z-10 w-24 h-24 rounded-full bg-black/50 backdrop-blur-xl border border-amber-500/40 shadow-cosmic-glow flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Lock className="w-8 h-8 text-amber-300 animate-pulse" />
                <span className="text-[9px] font-mono font-bold text-amber-200 mt-1 uppercase tracking-widest">SEALED</span>
              </div>

              {/* Astrological Sign Badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-black/70 border border-amber-500/40 text-xs font-mono text-white whitespace-nowrap shadow-cosmic-glow flex items-center gap-2 z-20 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>Zodiac: <strong className="text-amber-300">{file.astrologicalSign}</strong> ({file.element})</span>
              </div>
            </div>

            <h2 className="text-base font-mono font-bold text-white tracking-wide">
              File Shrouded by Astrological Interceptor
            </h2>
            <p className="text-xs font-mono text-slate-300 max-w-md mt-2 leading-relaxed">
              The bytes of <code className="text-astral-purple font-semibold">{file.name}</code> are locked under the stars of <strong className="text-amber-300">{file.astrologicalSign}</strong>. Prove your psychic synchronization to inspect its contents.
            </p>
            <button
              onClick={() => {
                soundEffects.playClick();
                onInterceptAction(file, 'open');
              }}
              className="mt-5 px-5 py-2.5 rounded-xl font-mono text-xs font-semibold bg-gradient-to-r from-astral-purple via-astral-fuchsia to-indigo-600 text-white shadow-cosmic-glow hover:opacity-95 transition-all flex items-center gap-2 group"
            >
              <Zap className="w-4 h-4 text-amber-300 group-hover:animate-bounce" />
              <span>Initiate Psychic Decryption</span>
            </button>
          </div>
        )}

        {isOpen && fileContent && (
          <div className="w-full max-w-5xl mx-auto rounded-xl border border-white/10 bg-black/60 backdrop-blur-xl overflow-hidden shadow-2xl">
            {fileContent.isImage ? (
              <div className="p-6 flex flex-col items-center justify-center">
                <img 
                  src={fileContent.content} 
                  alt={file.name} 
                  className="max-h-[65vh] object-contain rounded-lg border border-white/10" 
                />
              </div>
            ) : (
              <pre className="p-5 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                <code>{fileContent.content}</code>
              </pre>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
