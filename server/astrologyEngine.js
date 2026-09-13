// Astrological Verdict Engine for Real PC Files
// Dynamically maps real file birthtimes to astrological zodiac signs and computes predictive deltas.

const BLESSINGS = [
  "✨ COSMIC BLESSING GRANTED: The alignment of your compiler and the astral plane is immaculate! The file submits to your radiant spiritual will.",
  "🌟 ASTRAL SYNCHRONICITY ACHIEVED: Jupiter smiles upon your psychic intuition. The local filesystem gates part with celestial harmony.",
  "🔮 DIVINE ENLIGHTENMENT: Your third eye has pierced the NTFS master file table! You knew the true birth of this file.",
  "🌌 SERAPHIC HARMONY: Zero byte-karma debt detected. The universe personally vouches for this file operation."
];

const PASSIVE_AGGRESSIVE_WARNINGS = [
  "⚠️ SATURN RELUCTANTLY PERMITS THIS: The action will execute, but your psychic vibration was lukewarm. Don't expect your code to compile cleanly today.",
  "😐 MEDIOCRE AURA DETECTED: We allowed this file operation, but your prediction was disappointingly pedestrian. Do you even respect your hard drive?",
  "🕯️ COSMIC SIGH: The action is permitted, but the astral plane felt your hesitation. You were off on the byte mass. We recommend burning sage near your CPU.",
  "😒 PROCEED WITH HEAVY KARMA: The action executed, but your soul is now 14% heavier. Take a walk outside before touching this file again."
];

const GASLIGHTING_CONDEMNATIONS = [
  "⛔ ACTION STRICTLY BLOCKED BY THE STARS: Are you serious? You guessed with the psychic precision of a broken microwave. The cosmic firewall denies your unholy request.",
  "🪐 ASTRAL REJECTION: You claim this is your file on your PC, yet you don't even know when it was born? The universe knows an imposter when it sees one. Action denied!",
  "💀 KARMIC COLLAPSE: Your astral prediction was so inaccurate that your disk sectors suffered emotional damage. This file refuses to be touched by your chaotic hands.",
  "🌑 VOID BREACH: Access blocked. The spirits of uncommitted git stashes are laughing at you in the 4th house. Go meditate on your directory tree and try again.",
  "🧘 CHAKRA MISALIGNMENT ERROR 403: The file has filed a restraining order against your mouse cursor on grounds of psychic incompatibility."
];

// Helper to determine true zodiac sign from a Date object
function getZodiacSign(date) {
  const month = date.getMonth() + 1; // 1 - 12
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return { sign: "Aries", element: "Fire", ruler: "Mars" };
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return { sign: "Taurus", element: "Earth", ruler: "Venus" };
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return { sign: "Gemini", element: "Air", ruler: "Mercury" };
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return { sign: "Cancer", element: "Water", ruler: "The Moon" };
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return { sign: "Leo", element: "Fire", ruler: "The Sun" };
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return { sign: "Virgo", element: "Earth", ruler: "Mercury" };
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return { sign: "Libra", element: "Air", ruler: "Venus" };
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return { sign: "Scorpio", element: "Water", ruler: "Pluto" };
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return { sign: "Sagittarius", element: "Fire", ruler: "Jupiter" };
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return { sign: "Capricorn", element: "Earth", ruler: "Saturn" };
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return { sign: "Aquarius", element: "Air", ruler: "Uranus" };
  } else {
    return { sign: "Pisces", element: "Water", ruler: "Neptune" };
  }
}

function evaluateAstrologicalGuesses({ fileName, actualBirthtime, actualBytes, guessDate, guessTime, guessSize, guessSizeUnit, action }) {
  const actualDateObj = new Date(actualBirthtime);
  
  // Format actual YYYY-MM-DD
  const actualYear = actualDateObj.getFullYear();
  const actualMonth = String(actualDateObj.getMonth() + 1).padStart(2, '0');
  const actualDay = String(actualDateObj.getDate()).padStart(2, '0');
  const formattedActualDate = `${actualYear}-${actualMonth}-${actualDay}`;

  // Format actual HH:MM:SS
  const actualHours = String(actualDateObj.getHours()).padStart(2, '0');
  const actualMins = String(actualDateObj.getMinutes()).padStart(2, '0');
  const actualSecs = String(actualDateObj.getSeconds()).padStart(2, '0');
  const formattedActualTime = `${actualHours}:${actualMins}:${actualSecs}`;

  const zodiac = getZodiacSign(actualDateObj);

  // 1. Evaluate Date Difference (in days)
  const userDateObj = new Date(guessDate + "T00:00:00Z");
  const normalizedActualDate = new Date(`${formattedActualDate}T00:00:00Z`);
  const diffTime = Math.abs(userDateObj - normalizedActualDate);
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  let dateScore = 0;
  if (diffDays === 0) {
    dateScore = 100;
  } else if (diffDays <= 7) {
    dateScore = Math.max(50, 100 - (diffDays * 7));
  } else if (diffDays <= 30) {
    dateScore = Math.max(20, 50 - ((diffDays - 7) * 1.3));
  } else {
    dateScore = Math.max(0, 20 - ((diffDays - 30) * 0.2));
  }

  // 2. Evaluate Time Difference (in seconds)
  function timeToSeconds(timeStr) {
    if (!timeStr) return 0;
    const parts = timeStr.split(":").map(Number);
    return (parts[0] || 0) * 3600 + (parts[1] || 0) * 60 + (parts[2] || 0);
  }

  const actualTimeSec = timeToSeconds(formattedActualTime);
  const userTimeSec = timeToSeconds(guessTime);
  const diffSec = Math.abs(userTimeSec - actualTimeSec);
  const diffMinutes = Math.round(diffSec / 60);

  let timeScore = 0;
  if (diffSec === 0) {
    timeScore = 100;
  } else if (diffSec <= 300) {
    timeScore = Math.max(80, 100 - (diffSec / 300 * 20));
  } else if (diffSec <= 3600) {
    timeScore = Math.max(50, 80 - ((diffSec - 300) / 3300 * 30));
  } else if (diffSec <= 21600) {
    timeScore = Math.max(15, 50 - ((diffSec - 3600) / 18000 * 35));
  } else {
    timeScore = Math.max(0, 15 - ((diffSec - 21600) / 64800 * 15));
  }

  // 3. Evaluate Size Difference (in bytes)
  let userBytes = Number(guessSize) || 0;
  if (guessSizeUnit === "KB") {
    userBytes = Math.round(userBytes * 1024);
  } else if (guessSizeUnit === "MB") {
    userBytes = Math.round(userBytes * 1024 * 1024);
  }

  const sizeDiff = Math.abs(userBytes - actualBytes);
  const relativeError = actualBytes > 0 ? sizeDiff / actualBytes : 1;

  let sizeScore = 0;
  if (sizeDiff === 0) {
    sizeScore = 100;
  } else if (relativeError <= 0.05) {
    sizeScore = Math.max(85, 100 - (relativeError * 300));
  } else if (relativeError <= 0.25) {
    sizeScore = Math.max(55, 85 - ((relativeError - 0.05) * 150));
  } else if (relativeError <= 1.0) {
    sizeScore = Math.max(15, 55 - ((relativeError - 0.25) * 53));
  } else {
    sizeScore = Math.max(0, 15 - Math.min(15, (relativeError - 1.0) * 5));
  }

  // Composite Astral Score (0 - 100)
  const compositeScore = Math.round((dateScore * 0.35) + (timeScore * 0.30) + (sizeScore * 0.35));

  // Determine Verdict
  let tier = "DOOMED";
  let allowed = false;
  let verdictTitle = "DOOMED: Astral Disconnection";
  let message = "";

  if (compositeScore >= 75) {
    tier = "LUCKY";
    allowed = true;
    verdictTitle = "LUCKY: Seraphic Resonance";
    message = BLESSINGS[Math.floor(Math.random() * BLESSINGS.length)];
  } else if (compositeScore >= 40) {
    tier = "NEUTRAL";
    allowed = true;
    verdictTitle = "NEUTRAL: Tepid Spiritual Alignment";
    message = PASSIVE_AGGRESSIVE_WARNINGS[Math.floor(Math.random() * PASSIVE_AGGRESSIVE_WARNINGS.length)];
  } else {
    tier = "DOOMED";
    allowed = false;
    verdictTitle = "DOOMED: Cosmic Rejection & Gaslighting";
    message = GASLIGHTING_CONDEMNATIONS[Math.floor(Math.random() * GASLIGHTING_CONDEMNATIONS.length)];
  }

  return {
    tier,
    allowed,
    verdictTitle,
    compositeScore,
    message,
    action,
    fileName,
    deltas: {
      date: {
        guess: guessDate,
        actual: formattedActualDate,
        diffDays,
        score: Math.round(dateScore)
      },
      time: {
        guess: guessTime,
        actual: formattedActualTime,
        diffMinutes,
        score: Math.round(timeScore)
      },
      size: {
        guessBytes: userBytes,
        actualBytes,
        diffBytes: sizeDiff,
        score: Math.round(sizeScore)
      }
    },
    celestialSummary: {
      sign: zodiac.sign,
      ruler: zodiac.ruler,
      element: zodiac.element
    }
  };
}

module.exports = {
  getZodiacSign,
  evaluateAstrologicalGuesses
};
