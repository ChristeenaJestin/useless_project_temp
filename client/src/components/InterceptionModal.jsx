import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  HardDrive, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Orbit, 
  Eye, 
  EyeOff, 
  Sliders, 
  ChevronRight,
  FastForward,
  Timer,
  FolderInput,
  Archive,
  Share2,
  Skull,
  Flame,
  Cpu,
  Briefcase,
  Copy,
  Check,
  Zap,
  RefreshCw,
  Gift
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEffects } from './SoundFx';
import AstroLogo from './AstroLogo';
import { generateClientBypassVerdict } from '../utils/astrology';

const LOADING_STAGES = [
  "Consulting the astral plane...",
  "Calculating byte-karma delta...",
  "Reading planetary NTFS allocation table...",
  "Querying file birth chart from OS kernel...",
  "Weighing soul against file mass...",
  "Synthesizing celestial verdict..."
];

const CORPORATE_EXCUSES = [
  "I'll write unit tests later",
  "It works on my machine",
  "Fixing in next sprint",
  "Just a temporary prototype"
];

export default function InterceptionModal({ 
  interception, 
  onClose, 
  onSubmitInterrogation, 
  isSubmitting, 
  verdictResult,
  onBypassSuccess
}) {
  if (!interception) return null;

  const { file, action } = interception;

  // Form states with default guesses
  const [guessDate, setGuessDate] = useState('2024-01-01');
  const [guessTime, setGuessTime] = useState('12:00:00');
  const [guessSize, setGuessSize] = useState('1024');
  const [guessSizeUnit, setGuessSizeUnit] = useState('bytes');
  const [psychicConfidence, setPsychicConfidence] = useState(65);
  const [showOracleHint, setShowOracleHint] = useState(false);
  const [optedForRitual, setOptedForRitual] = useState(false);

  // Multi-step loading stage index
  const [loadingStageIdx, setLoadingStageIdx] = useState(0);

  // Bypass feature states
  const [bypassing, setBypassing] = useState(false);
  const [activeBypassTab, setActiveBypassTab] = useState('all');
  const [isWarping, setIsWarping] = useState(false);
  const [timeWarpSeconds, setTimeWarpSeconds] = useState(30);
  const [relocationName, setRelocationName] = useState(`blessed_${file.name}`);
  const [curseCoworker, setCurseCoworker] = useState('innocent.coworker@company.internal');
  const [curseLink, setCurseLink] = useState('');
  const [curseCopied, setCurseCopied] = useState(false);
  const [isSacrificing, setIsSacrificing] = useState(false);
  const [sacrificedName, setSacrificedName] = useState('');
  const [chronoHackActive, setChronoHackActive] = useState(false);
  const [excuseText, setExcuseText] = useState("I'll write unit tests later");

  // Play intercept sound when modal mounts
  useEffect(() => {
    soundEffects.playInterceptChime();
  }, []);

  // Multi-step loading messages when submitting
  useEffect(() => {
    let interval;
    if (isSubmitting) {
      setLoadingStageIdx(0);
      interval = setInterval(() => {
        setLoadingStageIdx((prev) => (prev + 1) % LOADING_STAGES.length);
      }, 650);
    }
    return () => clearInterval(interval);
  }, [isSubmitting]);

  // Audio & confetti on verdict
  useEffect(() => {
    if (verdictResult) {
      if (verdictResult.tier === 'LUCKY') {
        soundEffects.playLuckyFanfare();
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#10b981', '#f59e0b', '#8b5cf6', '#38bdf8']
        });
      } else if (verdictResult.tier === 'NEUTRAL') {
        soundEffects.playNeutralDrone();
      } else if (verdictResult.tier === 'DOOMED' && !verdictResult.bypassed) {
        soundEffects.playDoomedGlitch();
      }
    }
  }, [verdictResult]);

  const handleSubmit = (e) => {
    e.preventDefault();
    soundEffects.playClick();
    setOptedForRitual(false);
    onSubmitInterrogation({
      filePath: file.path,
      action,
      guessDate,
      guessTime,
      guessSize: Number(guessSize),
      guessSizeUnit,
      psychicConfidence: Number(psychicConfidence)
    });
  };

  // Cosmic Loophole Bypass Execution Helper
  const handleExecuteBypass = async (bypassType, payload = {}) => {
    setBypassing(true);
    soundEffects.playClick();

    try {
      let res = null;
      if (!file?.isLocalMounted && !file?.virtualContent) {
        try {
          const apiRes = await fetch('/api/bypass', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              filePath: file.path,
              action,
              bypassType,
              payload
            })
          });
          if (apiRes.ok) {
            res = await apiRes.json();
          }
        } catch (e) {
          // Backend not reachable on hosted URL
        }
      }

      // If backend not present or local file, generate client bypass verdict in-browser
      if (!res || !res.verdict) {
        const clientVerdict = generateClientBypassVerdict({
          bypassType,
          fileName: file.name,
          payload
        });
        res = { verdict: clientVerdict, bypassed: true };
      }

      if (res.verdict) {
        soundEffects.playBypassChime();
        confetti({
          particleCount: 110,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#facc15', '#a855f7', '#38bdf8', '#10b981', '#ffffff']
        });

        if (onBypassSuccess) {
          onBypassSuccess({ file, action, result: res });
        }
      }
    } catch (err) {
      console.error("Cosmic bypass severed", err);
    } finally {
      setBypassing(false);
    }
  };

  // Ritual 1: Spacetime Warp Timer
  const triggerTimeWarp = () => {
    setIsWarping(true);
    soundEffects.playClick();
    setTimeWarpSeconds(30);

    const interval = setInterval(() => {
      setTimeWarpSeconds(prev => {
        if (prev <= 5) {
          clearInterval(interval);
          setIsWarping(false);
          handleExecuteBypass('time-shift');
          return 0;
        }
        return prev - 5;
      });
    }, 250);
  };

  // Ritual 4: Dispatch Curse Transfer
  const triggerCurseDispatch = () => {
    const email = curseCoworker.trim() || 'innocent.coworker@company.internal';
    const fakeToken = Math.random().toString(36).substring(2, 9);
    const link = `https://astrofs.internal/curse/transfer?token=${fakeToken}&victim=${encodeURIComponent(email)}`;
    setCurseLink(link);
    handleExecuteBypass('curse-transfer', { coworker: email, link });
  };

  const copyCurseLink = () => {
    if (curseLink) {
      navigator.clipboard.writeText(curseLink);
      setCurseCopied(true);
      setTimeout(() => setCurseCopied(false), 2000);
    }
  };

  // Ritual 6: Sacrificial Altar
  const triggerSacrifice = (offeringName) => {
    const name = offeringName || 'node_modules/phantom_cache.tmp';
    setSacrificedName(name);
    setIsSacrificing(true);
    setTimeout(() => {
      setIsSacrificing(false);
      handleExecuteBypass('sacrifice', { sacrificedName: name });
    }, 850);
  };

  const handleAltarDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      triggerSacrifice(e.dataTransfer.files[0].name);
    }
  };

  const actionLabels = {
    open: { label: "OPEN REAL FILE", color: "text-emerald-400", icon: Eye },
    close: { label: "CLOSE FILE", color: "text-amber-400", icon: EyeOff }
  };
  const actionMeta = actionLabels[action] || actionLabels.open;

  const oracleHint = `Born under the sign of ${file.astrologicalSign} (${file.element}), this .${file.extension} entity resonates with ${file.planetaryRuler}. Look closely into your memories of when you created or downloaded it on this PC!`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-3xl rounded-2xl glass-modal overflow-hidden border border-astral-purple/30 text-slate-200">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-astral-purple via-astral-fuchsia to-astral-cyan animate-aurora" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between bg-black/40 relative z-10">
          <div className="flex items-center space-x-3.5">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full p-0.5 border border-amber-500/40 shadow-cosmic-glow shrink-0 overflow-hidden bg-black/50">
              <img 
                src="/solar_system.jpg" 
                alt="Solar System" 
                className="w-full h-full object-cover rounded-full mix-blend-screen filter contrast-125 brightness-110"
              />
              <div className="absolute inset-0 rounded-full border border-amber-500/30 pointer-events-none" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  ACTION INTERCEPTED
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Astrological Verification
                </span>
              </div>
              <h2 className="text-xs sm:text-sm font-outfit font-bold text-white mt-1 flex items-center gap-1.5 truncate">
                Target: <span className="text-astral-purple truncate">{file.name}</span>
                <span className="text-slate-500 font-mono">({actionMeta.label})</span>
              </h2>
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-end text-right font-mono text-[11px]">
            <span className="text-white font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-astral-purple" /> {file.astrologicalSign}
            </span>
            <span className="text-slate-400 text-[10px]">{file.element} • {file.planetaryRuler}</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 max-h-[82vh] overflow-y-auto space-y-6">

          {/* STAGE 1: THE PSYCHIC PREDICTION FORM */}
          {!verdictResult && !isSubmitting && (
            <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
              <div className="p-3.5 rounded-xl bg-astral-purple/10 border border-astral-purple/20 text-xs font-mono text-slate-300 leading-relaxed flex items-start space-x-3">
                <Orbit className="w-4 h-4 text-astral-purple shrink-0 mt-0.5 animate-spin-slow" />
                <p>
                  <strong>Celestial Gatekeeper Notice:</strong> To <span className={actionMeta.color}>{action}</span> this file on your PC, you must prove spiritual ownership. Input your psychic predictions of its exact birth coordinates and mass below (the cosmos will divine your fate):
                </p>
              </div>

              {/* Guesses Container */}
              <div className="space-y-4">
                {/* Guess 1: Creation Date */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <label className="text-slate-300 font-semibold flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-sky-400" />
                      <span>1. Psychic Guess: Exact Creation Date</span>
                    </label>
                    <span className="text-[10px] text-slate-500">YYYY-MM-DD</span>
                  </div>
                  <input
                    type="date"
                    required
                    value={guessDate}
                    onChange={(e) => setGuessDate(e.target.value)}
                    className="w-full bg-black/60 border border-white/[0.1] focus:border-astral-purple rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-astral-purple/40"
                  />
                </div>

                {/* Guess 2: Creation Time */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <label className="text-slate-300 font-semibold flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span>2. Psychic Guess: Exact Creation Time</span>
                    </label>
                    <span className="text-[10px] text-slate-500">HH:MM:SS</span>
                  </div>
                  <input
                    type="time"
                    step="1"
                    required
                    value={guessTime}
                    onChange={(e) => setGuessTime(e.target.value)}
                    className="w-full bg-black/60 border border-white/[0.1] focus:border-astral-purple rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-astral-purple/40"
                  />
                </div>

                {/* Guess 3: File Size */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <label className="text-slate-300 font-semibold flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-purple-400" />
                      <span>3. Psychic Guess: File Size</span>
                    </label>
                    <span className="text-[10px] text-slate-500">Bytes, KB, or MB</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="1"
                      required
                      value={guessSize}
                      onChange={(e) => setGuessSize(e.target.value)}
                      placeholder="e.g. 2048"
                      className="flex-1 bg-black/60 border border-white/[0.1] focus:border-astral-purple rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-astral-purple/40"
                    />
                    <select
                      value={guessSizeUnit}
                      onChange={(e) => setGuessSizeUnit(e.target.value)}
                      className="bg-black/60 border border-white/[0.1] focus:border-astral-purple rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-astral-purple/40"
                    >
                      <option value="bytes">Bytes</option>
                      <option value="KB">KB</option>
                      <option value="MB">MB</option>
                    </select>
                  </div>
                </div>

                {/* Psychic Confidence Level */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-astral-purple" />
                      <span>Psychic Confidence</span>
                    </span>
                    <span className="text-astral-purple font-semibold">{psychicConfidence}% Intuitive</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={psychicConfidence}
                    onChange={(e) => setPsychicConfidence(Number(e.target.value))}
                    className="w-full accent-astral-purple cursor-pointer h-1.5 bg-black/40 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>Hazy Vision</span>
                    <span>Direct Revelation</span>
                  </div>
                </div>
              </div>

              {/* Optional Oracle Whisper Disclosure */}
              <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-3.5 h-3.5 text-astral-purple animate-pulse" />
                    <span className="text-xs font-mono font-semibold text-purple-300">
                      Astral Oracle (Optional Hint)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playOracleHum();
                      setShowOracleHint(!showOracleHint);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-[11px] font-mono text-purple-200 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{showOracleHint ? "Conceal Oracle Prophecy" : "🔮 Consult Oracle Whisper"}</span>
                  </button>
                </div>

                {showOracleHint && (
                  <div className="mt-3 pt-3 border-t border-purple-500/15 flex items-start space-x-3.5 animate-fade-in">
                    <div className="relative w-12 h-12 rounded-full shrink-0 p-0.5 border border-purple-400/40 shadow-cosmic-glow overflow-hidden">
                      <img 
                        src="/solar_system.jpg" 
                        alt="Oracle Solar System" 
                        className="w-full h-full object-cover rounded-full filter contrast-125" 
                      />
                      <div className="absolute inset-0 rounded-full border border-purple-400/30 pointer-events-none" />
                    </div>
                    <div className="space-y-1 text-left min-w-0">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold flex items-center gap-1">
                        <span>Prophecy for</span>
                        <span className="text-white truncate">"{file.name}"</span>
                      </div>
                      <p className="text-xs font-mono text-purple-200/90 leading-relaxed italic">
                        "{file.oracleClue || oracleHint}"
                      </p>
                      <div className="text-[9px] font-mono text-slate-500 mt-1">
                        * Consulting the oracle is purely optional and does not affect your cosmic verdict score.
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-xs font-mono text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-mono text-xs font-semibold bg-gradient-to-r from-astral-purple via-astral-fuchsia to-indigo-600 hover:opacity-95 text-white shadow-cosmic-glow transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Submit to Astrological Verdict</span>
                </button>
              </div>
            </form>
          )}

          {/* STAGE 2: LOADING ANIMATION */}
          {isSubmitting && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
              <div className="relative flex items-center justify-center">
                <AstroLogo size="lg" showStatus={false} />
              </div>

              <div className="space-y-2">
                <div className="text-sm font-mono font-bold text-white tracking-wide">
                  {LOADING_STAGES[loadingStageIdx]}
                </div>
                <p className="text-xs font-mono text-slate-400">
                  Casting the cosmic lots and consulting astral coordinates...
                </p>
              </div>

              <div className="w-56 h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/10 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-astral-purple to-astral-cyan animate-shimmer" />
              </div>
            </div>
          )}

          {/* STAGE 3: VERDICT BREAKDOWN & COSMIC LOOPHOLE BYPASSES */}
          {verdictResult && (
            <div className="space-y-6 animate-fade-in">
              {/* Verdict Header Banner */}
              <div className={`p-4 rounded-xl border flex items-start space-x-3.5 transition-all ${
                verdictResult.bypassed
                  ? 'bg-amber-500/15 border-amber-500/40 shadow-neutral-glow'
                  : verdictResult.tier === 'LUCKY'
                  ? 'bg-emerald-500/10 border-emerald-500/30 shadow-lucky-glow'
                  : verdictResult.tier === 'NEUTRAL'
                  ? 'bg-amber-500/10 border-amber-500/30 shadow-neutral-glow'
                  : 'bg-rose-500/15 border-rose-500/30 shadow-doomed-glow'
              }`}>
                <div className="mt-0.5 shrink-0">
                  {verdictResult.bypassed ? (
                    <Zap className="w-6 h-6 text-amber-300 animate-bounce" />
                  ) : verdictResult.tier === 'LUCKY' ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  ) : verdictResult.tier === 'NEUTRAL' ? (
                    <AlertTriangle className="w-6 h-6 text-amber-400" />
                  ) : (
                    <XCircle className="w-6 h-6 text-rose-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[11px] font-mono font-bold tracking-wider px-2 py-0.5 rounded ${
                      verdictResult.bypassed
                        ? 'bg-amber-500/30 text-amber-200 border border-amber-500/50'
                        : verdictResult.tier === 'LUCKY' 
                        ? 'bg-emerald-500/20 text-emerald-300' 
                        : verdictResult.tier === 'NEUTRAL' 
                        ? 'bg-amber-500/20 text-amber-300' 
                        : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {verdictResult.verdictTitle}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Score: <strong className="text-white">{verdictResult.compositeScore}%</strong>
                    </span>
                    {verdictResult.bypassed && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        ⚡ COSMIC BYPASS GRANTED
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-mono text-slate-200 mt-2 leading-relaxed">
                    {verdictResult.message}
                  </p>
                </div>
              </div>

              {/* Registered Astrological Petition (Collected without accuracy judgment) */}
              {verdictResult.submissionDetails && (
                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.08] space-y-3 font-mono text-xs">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold border-b border-white/[0.06] pb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-astral-cyan">
                      <Sparkles className="w-3.5 h-3.5 text-astral-cyan" />
                      Registered Astrological Petition
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      Pure 50/50 Cosmic Lot
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-astral-purple" />
                        Intuited Birth Date
                      </div>
                      <div className="text-white text-xs font-semibold mt-1">
                        {verdictResult.submissionDetails.guessDate}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-astral-cyan" />
                        Intuited Birth Time
                      </div>
                      <div className="text-white text-xs font-semibold mt-1">
                        {verdictResult.submissionDetails.guessTime}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 flex items-center gap-1">
                        <HardDrive className="w-3 h-3 text-emerald-400" />
                        Intuited File Mass
                      </div>
                      <div className="text-white text-xs font-semibold mt-1">
                        {verdictResult.submissionDetails.guessSize}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 flex items-center gap-1">
                        <Orbit className="w-3 h-3 text-amber-400" />
                        Psychic Resonance
                      </div>
                      <div className="text-white text-xs font-semibold mt-1">
                        {verdictResult.submissionDetails.psychicConfidence}
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 bg-white/[0.02] px-3 py-2 rounded-lg border border-white/[0.03] flex items-center justify-between">
                    <span>Celestial Arbiter: <strong className="text-slate-200">50/50 Random Fortune</strong></span>
                    <span className="text-slate-400 font-mono">No earthly accuracy required</span>
                  </div>
                </div>
              )}

              {/* YES / NO BYPASS CONFIRMATION DIALOG (Displayed when DOOMED and user hasn't opted in yet) */}
              {!verdictResult.allowed && !optedForRitual && (
                <div className="rounded-2xl border border-amber-500/40 bg-black/75 backdrop-blur-xl p-5 sm:p-6 shadow-2xl space-y-5 animate-fade-in">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 shadow-lucky-glow shrink-0">
                      <ShieldAlert className="w-7 h-7 text-amber-400 animate-pulse" />
                    </div>
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                          COSMIC REJECTION DETECTED
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          Bypass Decision Required
                        </span>
                      </div>
                      <h3 className="text-base font-outfit font-bold text-white leading-tight">
                        Do you opt to bypass the doom through ancient rituals?
                      </h3>
                      <p className="text-xs font-mono text-slate-300 leading-relaxed">
                        The stars have locked this file under a malevolent astral transit. However, cosmic loophole rituals exist—such as <strong className="text-emerald-300">relocating the file</strong>, performing an <strong className="text-purple-300">astral zip & unzip void purge</strong>, or <strong className="text-amber-300">transferring the curse to another person</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-mono text-xs text-slate-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>❌ No, Accept Defeat & Close</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        soundEffects.playClick();
                        setOptedForRitual(true);
                      }}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-mono text-xs font-bold bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:opacity-95 text-black shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Zap className="w-4 h-4" />
                      <span>⚡ Yes, Proceed with Ancient Ritual</span>
                    </button>
                  </div>
                </div>
              )}

              {/* RITUALISTIC BYPASSES: COSMIC LOOPHOLE SECTION (Displayed when DOOMED and user opted for rituals) */}
              {!verdictResult.allowed && optedForRitual && (
                <div className="rounded-2xl border border-amber-500/40 bg-black/60 backdrop-blur-xl p-4 sm:p-5 shadow-2xl space-y-4 animate-fade-in">
                  {/* Bypass Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                    <div className="flex items-center space-x-2.5">
                      <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 shadow-cosmic-glow">
                        <Zap className="w-5 h-5 animate-pulse text-amber-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-outfit font-bold text-white flex items-center gap-2">
                          <span>Cosmic Loopholes: Choose Your Ritual</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            RITUAL CHAMBER ACTIVE
                          </span>
                        </h3>
                        <p className="text-[11px] font-mono text-slate-400">
                          Execute any ancient rite below to purge the curse, reset your karma, and unlock the file:
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setOptedForRitual(false)}
                        className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 border border-white/10 transition-all cursor-pointer"
                      >
                        ← Back to Choice
                      </button>
                    </div>
                  </div>

                  {/* Filter Tabs */}
                  <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-[11px] font-mono">
                    {[
                      { id: 'all', label: 'All Rituals' },
                      { id: 'featured', label: '⭐ Featured (Relocate / Zip / Send)' },
                      { id: 'time', label: '⏳ Spacetime & Physics' },
                      { id: 'corporate', label: '💼 Corporate & Social' },
                      { id: 'occult', label: '🔥 Altar & Dark Arts' }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          soundEffects.playClick();
                          setActiveBypassTab(tab.id);
                        }}
                        className={`px-2.5 py-1 rounded-lg transition-all shrink-0 cursor-pointer ${
                          activeBypassTab === tab.id
                            ? 'bg-astral-purple text-white shadow-sm'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Interactive Bypass Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1">

                    {/* 1. Spatial Relocation (Rename / Move to another location) */}
                    {(activeBypassTab === 'all' || activeBypassTab === 'featured' || activeBypassTab === 'time') && (
                      <div className="p-3.5 rounded-xl bg-white/[0.03] border border-emerald-500/30 hover:border-emerald-400 transition-all space-y-2.5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-mono font-bold">
                            <FolderInput className="w-4 h-4" />
                            <span>1. Spatial Relocation (Move / Rename)</span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">FEATURED</span>
                          </div>
                          <p className="text-[11px] font-mono text-slate-300 mt-1 leading-relaxed">
                            Relocate or rename the physical file to a blessed name/path to completely wipe its karmic debt.
                          </p>
                        </div>
                        <div className="space-y-1.5">
                          <input
                            type="text"
                            value={relocationName}
                            onChange={(e) => setRelocationName(e.target.value)}
                            placeholder="New blessed filename..."
                            className="w-full bg-black/60 border border-white/10 rounded-lg px-2.5 py-1 text-xs font-mono text-white focus:outline-none focus:border-emerald-400"
                          />
                          <button
                            type="button"
                            disabled={bypassing}
                            onClick={() => handleExecuteBypass('spatial-relocation', { newName: relocationName })}
                            className="w-full py-1.5 px-3 rounded-lg text-xs font-mono font-semibold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                          >
                            <FolderInput className="w-3.5 h-3.5" />
                            <span>Translocate & Reset Karma</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* 2. Metamorphic Transmutation (Zip/Unzip) */}
                    {(activeBypassTab === 'all' || activeBypassTab === 'featured' || activeBypassTab === 'occult') && (
                      <div className="p-3.5 rounded-xl bg-white/[0.03] border border-purple-500/30 hover:border-purple-400 transition-all space-y-2.5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center space-x-2 text-purple-400 text-xs font-mono font-bold">
                            <Archive className="w-4 h-4" />
                            <span>2. Metamorphic Transmutation (Zip & Unzip)</span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300">FEATURED</span>
                          </div>
                          <p className="text-[11px] font-mono text-slate-300 mt-1 leading-relaxed">
                            Compress the entity into a ZIP void archive and extract it back, purging the natal birth aura to reset as a Newborn entity.
                          </p>
                        </div>
                        <button
                          type="button"
                          disabled={bypassing}
                          onClick={() => handleExecuteBypass('transmutation')}
                          className="w-full py-1.5 px-3 rounded-lg text-xs font-mono font-semibold bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-400/40 shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Archive className="w-3.5 h-3.5" />
                          <span>📦 Purge Natal Aura (Simulate Zip & Unzip)</span>
                        </button>
                      </div>
                    )}

                    {/* 3. Karmic Outsourcing (Send to Another Person) */}
                    {(activeBypassTab === 'all' || activeBypassTab === 'featured' || activeBypassTab === 'corporate') && (
                      <div className="p-3.5 rounded-xl bg-white/[0.03] border border-amber-500/30 hover:border-amber-400 transition-all space-y-2.5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono font-bold">
                            <Share2 className="w-4 h-4" />
                            <span>3. Karmic Outsourcing (Send to Another Person)</span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">FEATURED</span>
                          </div>
                          <p className="text-[11px] font-mono text-slate-300 mt-1 leading-relaxed">
                            Generate an astrological curse transfer link to shift the bad karma onto an innocent friend or coworker.
                          </p>
                        </div>
                        <div className="space-y-1.5">
                          <input
                            type="email"
                            value={curseCoworker}
                            onChange={(e) => setCurseCoworker(e.target.value)}
                            placeholder="coworker@company.internal"
                            className="w-full bg-black/60 border border-white/10 rounded-lg px-2.5 py-1 text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                          />
                          {curseLink ? (
                            <button
                              type="button"
                              onClick={copyCurseLink}
                              className="w-full py-1.5 px-3 rounded-lg text-xs font-mono font-semibold bg-amber-500/30 text-amber-200 border border-amber-400/40 flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              {curseCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{curseCopied ? "Curse Link Copied!" : "Copy Curse Transfer Link"}</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              disabled={bypassing}
                              onClick={triggerCurseDispatch}
                              className="w-full py-1.5 px-3 rounded-lg text-xs font-mono font-semibold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                            >
                              <Share2 className="w-3.5 h-3.5" />
                              <span>Dispatch Curse Link to Another Person</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* 4. Chronological Exorcism (Wait / Time-Shift) */}
                    {(activeBypassTab === 'all' || activeBypassTab === 'time') && (
                      <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-sky-400/40 transition-all space-y-2.5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center space-x-2 text-sky-400 text-xs font-mono font-bold">
                            <FastForward className="w-4 h-4" />
                            <span>4. Chronological Exorcism</span>
                          </div>
                          <p className="text-[11px] font-mono text-slate-300 mt-1 leading-relaxed">
                            Fast-forward spacetime by 30 celestial minutes to push Mars out of retrograde.
                          </p>
                        </div>
                        <div>
                          {isWarping ? (
                            <div className="p-2 rounded-lg bg-sky-950/40 border border-sky-400/30 text-center space-y-1.5">
                              <span className="text-[10px] font-mono text-sky-300 animate-pulse block">
                                🌌 Spacetime Warping: {timeWarpSeconds} mins remaining...
                              </span>
                              <div className="w-full h-1 bg-black/60 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-sky-400 transition-all duration-200" 
                                  style={{ width: `${((30 - timeWarpSeconds) / 30) * 100}%` }}
                                />
                              </div>
                            </div>
                          ) : (
                            <button
                              type="button"
                              disabled={bypassing}
                              onClick={triggerTimeWarp}
                              className="w-full py-1.5 px-3 rounded-lg text-xs font-mono font-semibold bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/40 shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                            >
                              <FastForward className="w-3.5 h-3.5" />
                              <span>⚡ Fast-Forward Mars (30 Mins)</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* 5. The Sacrificial Offering (Altar of the Gods) */}
                    {(activeBypassTab === 'all' || activeBypassTab === 'occult') && (
                      <div 
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleAltarDrop}
                        className="p-3.5 rounded-xl bg-white/[0.03] border border-dashed border-orange-500/40 hover:border-orange-400 transition-all space-y-2.5 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center space-x-2 text-orange-400 text-xs font-mono font-bold">
                            <Flame className={`w-4 h-4 ${isSacrificing ? 'animate-bounce text-amber-300' : ''}`} />
                            <span>5. The Sacrificial Offering</span>
                          </div>
                          <p className="text-[11px] font-mono text-slate-300 mt-1 leading-relaxed">
                            Drop a disposable file or offer virtual node_modules to appease the zodiac deities.
                          </p>
                        </div>
                        <div>
                          {isSacrificing ? (
                            <div className="p-2 rounded-lg bg-orange-950/50 border border-orange-400/40 text-center text-[10px] font-mono text-orange-300 animate-pulse flex items-center justify-center gap-1.5">
                              <Flame className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                              <span>Immolating "{sacrificedName}" on the altar...</span>
                            </div>
                          ) : (
                            <button
                              type="button"
                              disabled={bypassing}
                              onClick={() => triggerSacrifice('node_modules/phantom_cache.tmp')}
                              className="w-full py-1.5 px-3 rounded-lg text-xs font-mono font-semibold bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-400/40 shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                            >
                              <Flame className="w-3.5 h-3.5" />
                              <span>🔥 Sacrifice node_modules Cache</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* 6. The Corporate Bribe (Developer Excuse) */}
                    {(activeBypassTab === 'all' || activeBypassTab === 'corporate') && (
                      <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-400/40 transition-all space-y-2.5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-mono font-bold">
                            <Briefcase className="w-4 h-4" />
                            <span>6. The Corporate Bribe</span>
                          </div>
                          <p className="text-[11px] font-mono text-slate-300 mt-1 leading-relaxed">
                            Submit a classic developer excuse to obtain an astrological corporate waiver.
                          </p>
                        </div>
                        <div className="space-y-1.5">
                          <input
                            type="text"
                            value={excuseText}
                            onChange={(e) => setExcuseText(e.target.value)}
                            placeholder="Type developer excuse..."
                            className="w-full bg-black/60 border border-white/10 rounded-lg px-2.5 py-1 text-xs font-mono text-white focus:outline-none focus:border-indigo-400"
                          />
                          <div className="flex flex-wrap gap-1">
                            {CORPORATE_EXCUSES.map(excuse => (
                              <button
                                key={excuse}
                                type="button"
                                onClick={() => setExcuseText(excuse)}
                                className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] hover:bg-white/[0.1] text-slate-400 hover:text-white border border-white/[0.05] transition-all cursor-pointer"
                              >
                                {excuse}
                              </button>
                            ))}
                          </div>
                          <button
                            type="button"
                            disabled={bypassing}
                            onClick={() => handleExecuteBypass('corporate-bribe', { excuse: excuseText })}
                            className="w-full py-1.5 px-3 rounded-lg text-xs font-mono font-semibold bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-400/40 shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                          >
                            <Briefcase className="w-3.5 h-3.5" />
                            <span>Bribe Celestial Gatekeeper</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* 7. The Chrono-Cheat (System Clock Hack) */}
                    {(activeBypassTab === 'all' || activeBypassTab === 'time') && (
                      <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-400/40 transition-all space-y-2.5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono font-bold">
                            <Cpu className="w-4 h-4" />
                            <span>7. The Chrono-Cheat</span>
                          </div>
                          <p className="text-[11px] font-mono text-slate-300 mt-1 leading-relaxed">
                            Simulate clock crystal hijack to force a mythical Venus-Jupiter golden alignment.
                          </p>
                        </div>
                        <button
                          type="button"
                          disabled={bypassing}
                          onClick={() => {
                            setChronoHackActive(true);
                            handleExecuteBypass('chrono-cheat');
                          }}
                          className="w-full py-1.5 px-3 rounded-lg text-xs font-mono font-semibold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Cpu className="w-3.5 h-3.5" />
                          <span>⚡ Force Golden Alignment Window</span>
                        </button>
                      </div>
                    )}

                    {/* 8. Malicious Compliance (Corrupt the File) */}
                    {(activeBypassTab === 'all' || activeBypassTab === 'occult') && (
                      <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-rose-400/40 transition-all space-y-2.5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center space-x-2 text-rose-400 text-xs font-mono font-bold">
                            <Skull className="w-4 h-4" />
                            <span>8. Malicious Compliance</span>
                          </div>
                          <p className="text-[11px] font-mono text-slate-300 mt-1 leading-relaxed">
                            Simulate header bit-rot lobotomy: you can't ruin what is already dead.
                          </p>
                        </div>
                        <button
                          type="button"
                          disabled={bypassing}
                          onClick={() => handleExecuteBypass('malicious-compliance')}
                          className="w-full py-1.5 px-3 rounded-lg text-xs font-mono font-semibold bg-rose-950/50 hover:bg-rose-900/70 text-rose-200 border border-rose-500/40 shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Skull className="w-3.5 h-3.5 text-rose-400" />
                          <span>Perform Self-Lobotomy (Bit-Rot)</span>
                        </button>
                      </div>
                    )}

                  </div>
                </div>
              )}

              {/* Action Outcome & Dismiss Button */}
              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  {verdictResult.allowed 
                    ? "Astrological checkpoint resolved." 
                    : optedForRitual 
                    ? "Ritual active: Select an ancient bypass to unlock the file." 
                    : "Action currently locked under the stars."}
                </span>

                <div className="flex items-center space-x-2">
                  {verdictResult.allowed ? (
                    <button
                      onClick={onClose}
                      className={`px-5 py-2.5 rounded-xl font-mono text-xs font-semibold text-white shadow-lg transition-all flex items-center gap-2 cursor-pointer ${
                        verdictResult.bypassed
                          ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-500/30'
                          : verdictResult.tier === 'LUCKY'
                          ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20'
                          : 'bg-amber-600 hover:bg-amber-500 shadow-amber-500/20'
                      }`}
                    >
                      <span>
                        {verdictResult.bypassed 
                          ? `Proceed with ${action.toUpperCase()} (Bypass Honored)` 
                          : `Proceed (${verdictResult.tier === 'LUCKY' ? 'Blessed' : 'Heavy Karma'})`}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : optedForRitual ? (
                    <button
                      onClick={onClose}
                      className="px-4 py-2 rounded-lg font-mono text-xs text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all cursor-pointer"
                    >
                      <span>Cancel & Close</span>
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
