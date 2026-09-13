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
  Trash2, 
  Sliders, 
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEffects } from './SoundFx';

const LOADING_STAGES = [
  "Consulting the astral plane...",
  "Calculating byte-karma delta...",
  "Reading planetary NTFS allocation table...",
  "Querying file birth chart from OS kernel...",
  "Weighing soul against file mass...",
  "Synthesizing celestial verdict..."
];

export default function InterceptionModal({ 
  interception, 
  onClose, 
  onSubmitInterrogation, 
  isSubmitting, 
  verdictResult 
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

  // Multi-step loading stage index
  const [loadingStageIdx, setLoadingStageIdx] = useState(0);

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
      } else if (verdictResult.tier === 'DOOMED') {
        soundEffects.playDoomedGlitch();
      }
    }
  }, [verdictResult]);

  const handleSubmit = (e) => {
    e.preventDefault();
    soundEffects.playClick();
    onSubmitInterrogation({
      filePath: file.path,
      action,
      guessDate,
      guessTime,
      guessSize: Number(guessSize),
      guessSizeUnit
    });
  };

  const actionLabels = {
    open: { label: "OPEN REAL FILE", color: "text-emerald-400", icon: Eye },
    close: { label: "CLOSE FILE", color: "text-amber-400", icon: EyeOff },
    delete: { label: "BANISH / DELETE REAL FILE", color: "text-rose-400", icon: Trash2 }
  };
  const actionMeta = actionLabels[action] || actionLabels.open;

  // Satirical oracle hint based on the real file
  const oracleHint = `Born under the sign of ${file.astrologicalSign} (${file.element}), this .${file.extension} entity resonates with ${file.planetaryRuler}. Look closely into your memories of when you created or downloaded it on this PC!`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-2xl rounded-2xl glass-modal overflow-hidden border border-astral-purple/30 text-slate-200">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-astral-purple via-astral-fuchsia to-astral-cyan animate-aurora" />

        {/* Modal Header */}
        <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-black/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-astral-purple/20 border border-astral-purple/40 flex items-center justify-center shadow-cosmic-glow">
              <ShieldAlert className="w-5 h-5 text-astral-purple animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  ACTION INTERCEPTED
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Astrological Verification Required
                </span>
              </div>
              <h2 className="text-sm font-mono font-bold text-white mt-1 flex items-center gap-1.5">
                Target: <span className="text-astral-purple">{file.name}</span>
                <span className="text-slate-500">({actionMeta.label})</span>
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
        <div className="p-6 max-h-[78vh] overflow-y-auto space-y-6">

          {/* STAGE 1: THE PSYCHIC PREDICTION FORM */}
          {!verdictResult && !isSubmitting && (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Gatekeeper Manifesto Banner */}
              <div className="p-3.5 rounded-xl bg-astral-purple/10 border border-astral-purple/20 text-xs font-mono text-slate-300 leading-relaxed flex items-start space-x-3">
                <Orbit className="w-4 h-4 text-astral-purple shrink-0 mt-0.5 animate-spin-slow" />
                <p>
                  <strong>Celestial Gatekeeper Notice:</strong> To <span className={actionMeta.color}>{action}</span> this file on your PC, you must prove spiritual ownership. Input your psychic predictions of its exact birth coordinates and mass below:
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

              {/* Satirical Oracle Clue Button */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playOracleHum();
                    setShowOracleHint(!showOracleHint);
                  }}
                  className="w-full py-2 px-3 rounded-lg border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 text-xs font-mono text-purple-300 flex items-center justify-center gap-2 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>{showOracleHint ? "Conceal Oracle Clue" : "Consult Astral Oracle (Clue)"}</span>
                </button>

                {showOracleHint && (
                  <div className="mt-2.5 p-3 rounded-lg bg-black/50 border border-purple-500/30 text-xs font-mono text-purple-200/90 leading-relaxed italic animate-fade-in">
                    🔮 <strong>Oracle Whisper:</strong> "{oracleHint}"
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-xs font-mono text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-mono text-xs font-semibold bg-gradient-to-r from-astral-purple via-astral-fuchsia to-indigo-600 hover:opacity-95 text-white shadow-cosmic-glow transition-all flex items-center gap-2"
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
              <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-astral-purple/20 border-t-astral-purple animate-spin" />
                <div className="absolute inset-2 rounded-full border-2 border-astral-fuchsia/20 border-b-astral-fuchsia animate-spin-slow" />
                <Orbit className="w-7 h-7 text-astral-purple animate-pulse" />
              </div>

              <div className="space-y-2">
                <div className="text-sm font-mono font-bold text-white tracking-wide">
                  {LOADING_STAGES[loadingStageIdx]}
                </div>
                <p className="text-xs font-mono text-slate-400">
                  Cross-referencing your intuition with actual NTFS timestamps...
                </p>
              </div>

              <div className="w-56 h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/10 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-astral-purple to-astral-cyan animate-shimmer" />
              </div>
            </div>
          )}

          {/* STAGE 3: VERDICT BREAKDOWN */}
          {verdictResult && (
            <div className="space-y-5 animate-fade-in">
              {/* Verdict Header Banner */}
              <div className={`p-4 rounded-xl border flex items-start space-x-3.5 ${
                verdictResult.tier === 'LUCKY'
                  ? 'bg-emerald-500/10 border-emerald-500/30 shadow-lucky-glow'
                  : verdictResult.tier === 'NEUTRAL'
                  ? 'bg-amber-500/10 border-amber-500/30 shadow-neutral-glow'
                  : 'bg-rose-500/15 border-rose-500/30 shadow-doomed-glow'
              }`}>
                <div className="mt-0.5 shrink-0">
                  {verdictResult.tier === 'LUCKY' && <CheckCircle2 className="w-6 h-6 text-emerald-400" />}
                  {verdictResult.tier === 'NEUTRAL' && <AlertTriangle className="w-6 h-6 text-amber-400" />}
                  {verdictResult.tier === 'DOOMED' && <XCircle className="w-6 h-6 text-rose-400" />}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-[11px] font-mono font-bold tracking-wider px-2 py-0.5 rounded ${
                      verdictResult.tier === 'LUCKY' 
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
                  </div>
                  <p className="text-xs font-mono text-slate-200 mt-2 leading-relaxed">
                    {verdictResult.message}
                  </p>
                </div>
              </div>

              {/* Accuracy Delta Breakdown vs Real PC File Stats */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.08] space-y-3 font-mono text-xs">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold border-b border-white/[0.06] pb-2 flex items-center justify-between">
                  <span>Actual PC File Metadata vs Psychic Guess</span>
                  <span className="text-astral-purple">OS Kernel Verification</span>
                </div>

                {/* Date Delta */}
                <div className="flex items-center justify-between p-2 rounded bg-white/[0.02]">
                  <span className="text-slate-300">Creation Date:</span>
                  <div className="text-right">
                    <div className="text-slate-400 text-[11px]">
                      Guess: <span className="text-white">{verdictResult.deltas.date.guess}</span> | Real: <span className="text-astral-purple font-semibold">{verdictResult.deltas.date.actual}</span>
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {verdictResult.deltas.date.diffDays} days off ({verdictResult.deltas.date.score}% accuracy)
                    </div>
                  </div>
                </div>

                {/* Time Delta */}
                <div className="flex items-center justify-between p-2 rounded bg-white/[0.02]">
                  <span className="text-slate-300">Creation Time:</span>
                  <div className="text-right">
                    <div className="text-slate-400 text-[11px]">
                      Guess: <span className="text-white">{verdictResult.deltas.time.guess}</span> | Real: <span className="text-astral-purple font-semibold">{verdictResult.deltas.time.actual}</span>
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {verdictResult.deltas.time.diffMinutes} mins off ({verdictResult.deltas.time.score}% accuracy)
                    </div>
                  </div>
                </div>

                {/* Size Delta */}
                <div className="flex items-center justify-between p-2 rounded bg-white/[0.02]">
                  <span className="text-slate-300">File Mass:</span>
                  <div className="text-right">
                    <div className="text-slate-400 text-[11px]">
                      Guess: <span className="text-white">{verdictResult.deltas.size.guessBytes.toLocaleString()} B</span> | Real: <span className="text-astral-purple font-semibold">{verdictResult.deltas.size.actualBytes.toLocaleString()} B</span>
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {verdictResult.deltas.size.diffBytes.toLocaleString()} bytes off ({verdictResult.deltas.size.score}% accuracy)
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Outcome & Dismiss Button */}
              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-end space-x-3">
                {verdictResult.allowed ? (
                  <button
                    onClick={onClose}
                    className={`px-5 py-2.5 rounded-xl font-mono text-xs font-semibold text-white shadow-lg transition-all flex items-center gap-2 ${
                      verdictResult.tier === 'LUCKY'
                        ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20'
                        : 'bg-amber-600 hover:bg-amber-500 shadow-amber-500/20'
                    }`}
                  >
                    <span>Proceed ({verdictResult.tier === 'LUCKY' ? 'Blessed' : 'Heavy Karma'})</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl font-mono text-xs font-semibold bg-rose-900/60 hover:bg-rose-900 text-rose-200 border border-rose-500/40 shadow-doomed-glow transition-all flex items-center gap-2"
                  >
                    <span>Accept Defeat & Close</span>
                  </button>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
