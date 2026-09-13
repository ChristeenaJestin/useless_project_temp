import React, { useState } from 'react';
import { 
  Folder, 
  FolderUp, 
  FileText, 
  FileCode, 
  Code2, 
  Terminal, 
  Image as ImageIcon, 
  File, 
  Eye, 
  EyeOff, 
  Search, 
  Monitor, 
  Download, 
  HardDrive, 
  Lock, 
  Unlock
} from 'lucide-react';
import { soundEffects } from './SoundFx';

const EXTENSION_MAP = {
  js: { icon: FileCode, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  jsx: { icon: FileCode, color: 'text-sky-400', bg: 'bg-sky-500/10' },
  ts: { icon: FileCode, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  tsx: { icon: FileCode, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  json: { icon: Code2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  html: { icon: Code2, color: 'text-orange-400', bg: 'bg-orange-500/10' },
  css: { icon: Code2, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  md: { icon: FileText, color: 'text-slate-300', bg: 'bg-white/10' },
  txt: { icon: FileText, color: 'text-sky-300', bg: 'bg-sky-500/10' },
  pdf: { icon: FileText, color: 'text-rose-400', bg: 'bg-rose-500/10' },
  doc: { icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  docx: { icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  c: { icon: Terminal, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  cpp: { icon: Terminal, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  py: { icon: Terminal, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  png: { icon: ImageIcon, color: 'text-pink-400', bg: 'bg-pink-500/10' },
  jpg: { icon: ImageIcon, color: 'text-pink-400', bg: 'bg-pink-500/10' },
  jpeg: { icon: ImageIcon, color: 'text-pink-400', bg: 'bg-pink-500/10' },
  svg: { icon: ImageIcon, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  zip: { icon: File, color: 'text-amber-500', bg: 'bg-amber-500/10' }
};

const LOCATION_ICONS = {
  Monitor,
  Download,
  Folder,
  HardDrive
};

export default function FileExplorer({ 
  entries = [], 
  currentDir, 
  parentDir, 
  quickLocations = [],
  activeFile, 
  onSelectFile, 
  onNavigateDir, 
  onInterceptAction,
  openFilePaths = new Set()
}) {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredEntries = entries.filter(e => 
    e.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    e.extension?.toLowerCase().includes(filterQuery.toLowerCase()) ||
    e.astrologicalSign?.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <aside className="w-80 h-full border-r border-white/[0.08] glass-panel flex flex-col shrink-0 select-none">
      {/* Quick PC Shortcuts */}
      <div className="p-2.5 border-b border-white/[0.06] bg-black/20">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-1 mb-1.5 block">
          PC Quick Access
        </span>
        <div className="grid grid-cols-2 gap-1">
          {quickLocations.map(loc => {
            const IconComp = LOCATION_ICONS[loc.icon] || Folder;
            const isActive = currentDir && currentDir.toLowerCase() === loc.path.toLowerCase();
            return (
              <button
                key={loc.path}
                onClick={() => {
                  soundEffects.playClick();
                  onNavigateDir(loc.path);
                }}
                className={`flex items-center space-x-1.5 px-2 py-1 rounded text-[11px] font-mono truncate transition-all text-left ${
                  isActive 
                    ? 'bg-astral-purple/30 text-white border border-astral-purple/40' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                <IconComp className="w-3 h-3 text-astral-purple shrink-0" />
                <span className="truncate">{loc.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Directory Title & Item Count */}
      <div className="p-3 border-b border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center space-x-2 min-w-0">
          <Folder className="w-4 h-4 text-astral-purple shrink-0" />
          <span className="text-xs font-mono font-semibold text-slate-300 truncate">
            {currentDir ? currentDir.split(/[\\/]/).pop() || currentDir : 'Files'}
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-400 border border-white/[0.05] shrink-0">
          {entries.length} items
        </span>
      </div>

      {/* Search Input */}
      <div className="p-2.5 border-b border-white/[0.06]">
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 pointer-events-none" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search files on PC..."
            className="w-full bg-black/40 border border-white/[0.08] focus:border-astral-purple/50 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-astral-purple/30 font-mono transition-all"
          />
        </div>
      </div>

      {/* Entry List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {/* Parent Directory Link (..) */}
        {parentDir && (
          <div
            onClick={() => {
              soundEffects.playClick();
              onNavigateDir(parentDir);
            }}
            className="flex items-center space-x-2 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] cursor-pointer text-xs font-mono transition-all border border-transparent hover:border-white/[0.06]"
          >
            <FolderUp className="w-4 h-4 text-astral-purple" />
            <span>.. (Parent Folder)</span>
          </div>
        )}

        {filteredEntries.map((item) => {
          if (item.isDir) {
            return (
              <div
                key={item.path}
                onClick={() => {
                  soundEffects.playClick();
                  onNavigateDir(item.path);
                }}
                className="flex items-center space-x-2.5 p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.05] cursor-pointer text-xs font-mono transition-all border border-transparent hover:border-white/[0.06] group"
              >
                <Folder className="w-4 h-4 text-amber-400 group-hover:text-amber-300 shrink-0" />
                <span className="truncate font-medium">{item.name}</span>
                <span className="text-[10px] text-slate-600 ml-auto font-normal">dir</span>
              </div>
            );
          }

          const extConfig = EXTENSION_MAP[item.extension] || { icon: File, color: 'text-slate-400', bg: 'bg-white/5' };
          const IconComponent = extConfig.icon;
          const isActive = activeFile && activeFile.path === item.path;
          const isOpen = openFilePaths.has(item.path);

          return (
            <div
              key={item.path}
              onClick={() => {
                soundEffects.playClick();
                onSelectFile(item);
              }}
              className={`group rounded-lg p-2.5 cursor-pointer border transition-all ${
                isActive 
                  ? 'bg-astral-purple/15 border-astral-purple/40 shadow-sm' 
                  : 'border-transparent hover:bg-white/[0.04] hover:border-white/[0.06]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2.5 min-w-0">
                  <div className={`p-1.5 rounded-md border border-white/5 ${extConfig.bg} shrink-0`}>
                    <IconComponent className={`w-3.5 h-3.5 ${extConfig.color}`} />
                  </div>
                  <div className="min-w-0 truncate">
                    <span className={`text-xs font-mono font-medium truncate block ${isActive ? 'text-white' : 'text-slate-300'}`}>
                      {item.name}
                    </span>
                    <div className="flex items-center space-x-1.5 mt-0.5 text-[10px] font-mono text-slate-500">
                      <span className="text-astral-purple">{item.astrologicalSign}</span>
                      <span>•</span>
                      <span>{item.element}</span>
                    </div>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="shrink-0 flex items-center ml-2">
                  {isOpen ? (
                    <span className="flex items-center text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      <Unlock className="w-2.5 h-2.5 mr-1" /> Open
                    </span>
                  ) : (
                    <span className="flex items-center text-[10px] text-slate-500 font-mono bg-white/[0.03] px-1.5 py-0.5 rounded border border-white/[0.05]">
                      <Lock className="w-2.5 h-2.5 mr-1" /> Sealed
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="mt-2 pt-2 border-t border-white/[0.04] flex items-center justify-between opacity-80 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] text-slate-500 font-mono">
                  .{item.extension}
                </span>

                <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                  {/* Action: Open */}
                  {!isOpen && (
                    <button
                      onClick={() => onInterceptAction(item, 'open')}
                      title="Psychic Open"
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-astral-purple/20 hover:bg-astral-purple/30 text-astral-purple hover:text-white border border-astral-purple/30 flex items-center space-x-1 transition-all"
                    >
                      <Eye className="w-2.5 h-2.5" />
                      <span>Open</span>
                    </button>
                  )}

                  {/* Action: Close */}
                  {isOpen && (
                    <button
                      onClick={() => onInterceptAction(item, 'close')}
                      title="Psychic Close"
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 flex items-center space-x-1 transition-all cursor-pointer"
                    >
                      <EyeOff className="w-2.5 h-2.5" />
                      <span>Close</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredEntries.length === 0 && (
          <div className="p-6 text-center text-slate-500 text-xs font-mono">
            No files in this PC folder.
          </div>
        )}
      </div>
    </aside>
  );
}
