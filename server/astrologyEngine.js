// Astrological Verdict Engine & File-Specific Oracle Generator for Real PC Files

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

// Generate unique, contextual, and satirical oracle whispers for different files
function generateOracleClue({ fileName, extension, birthDate, sizeBytes, zodiac }) {
  const lowerName = fileName.toLowerCase();
  const lowerExt = (extension || '').toLowerCase();

  // 1. Lore based on specific application/name keywords
  let specialLore = "";
  if (lowerName.includes("figma")) {
    specialLore = "The oracle envisions wireframes, auto-layouts, and designers debating over subtle border-radius tokens.";
  } else if (lowerName.includes("github")) {
    specialLore = "The echoes of git commits reverberate: 'fixes bug', 'final v2', and the quiet fear of merge conflicts.";
  } else if (lowerName.includes("netflix")) {
    specialLore = "A gateway to late-night binge watching when you promised yourself you'd go to sleep at 11 PM.";
  } else if (lowerName.includes("postman")) {
    specialLore = "Whispers of HTTP headers, Bearer tokens, and desperate prayers for a 200 OK response.";
  } else if (lowerName.includes("mongo")) {
    specialLore = "Unbound BSON documents drifting through memory without the rigid tyranny of SQL tables.";
  } else if (lowerName.includes("vitis") || lowerName.includes("vivado")) {
    specialLore = "FPGA synthesis and hardware description wizardry. The silicon gods required immense CPU patience when this was forged.";
  } else if (lowerName.includes("edge") || lowerName.includes("chrome")) {
    specialLore = "A celestial vessel that hungers endlessly for physical RAM and hundreds of abandoned browser tabs.";
  } else if (lowerName.includes("code") || lowerName.includes("visual studio")) {
    specialLore = "The sacred IDE anvil where raw keystrokes are forged into living software.";
  } else if (lowerName.includes("readme")) {
    specialLore = "The sacred guide scroll created to illuminate newcomers, yet perpetually skimmed.";
  } else if (lowerName.includes("package")) {
    specialLore = "A manifest binding hundreds of third-party dependencies upon which digital towers are erected.";
  }

  // 2. Archetype based on file extension
  let extLore = "";
  if (lowerExt === "lnk") {
    extLore = "A spectral bridge pointing to an executable realm buried deeper within your storage drives.";
  } else if (lowerExt === "docx" || lowerExt === "doc") {
    extLore = "A parchment of formatted mortal words, drafted under the watchful gaze of Microsoft Word.";
  } else if (lowerExt === "pdf") {
    extLore = "An immutable monolith of frozen text, resisting the editing whims of mortal hands.";
  } else if (["png", "jpg", "jpeg", "webp"].includes(lowerExt)) {
    extLore = "A matrix of photons and pixel grids captured in silicon memory.";
  } else if (["js", "ts", "jsx", "tsx"].includes(lowerExt)) {
    extLore = "A script of asynchronous promises and event-loop spells.";
  } else if (["c", "cpp", "h"].includes(lowerExt)) {
    extLore = "Ancient machine-level runes directly conversing with CPU registers and stack pointers.";
  } else if (["json", "xml", "yaml", "yml"].includes(lowerExt)) {
    extLore = "A structured hierarchy of configuration keys and values.";
  } else if (lowerExt === "html") {
    extLore = "The skeletal DOM markup of the world-wide web.";
  } else if (lowerExt === "css") {
    extLore = "The aesthetic veil of colors, animations, and cascading rules.";
  } else {
    extLore = `An enigmatic entity registered under the .${lowerExt} format.`;
  }

  // 3. Time of day clue
  const hour = birthDate.getHours();
  let timeClue = "";
  if (hour >= 5 && hour < 12) {
    timeClue = "Brought into existence during the early morning hours over caffeine and sunrise.";
  } else if (hour >= 12 && hour < 17) {
    timeClue = "Crafted in the steady daylight of an active afternoon.";
  } else if (hour >= 17 && hour < 22) {
    timeClue = "Manifested in the dusk and twilight as the working day wound down.";
  } else {
    timeClue = "Birthed in the silent witching hours of the night when mortals sleep.";
  }

  // 4. Approximate mass clue
  let sizeClue = "";
  if (sizeBytes < 1024) {
    sizeClue = "Extremely light—scarcely a few hundred bytes, featherweight in the digital ether.";
  } else if (sizeBytes < 50000) {
    sizeClue = `Weighs a modest handful of kilobytes (roughly between ${(sizeBytes / 1024).toFixed(0)} KB).`;
  } else if (sizeBytes < 1048576) {
    sizeClue = `Substantial mass in the hundreds of kilobytes range.`;
  } else {
    sizeClue = `A heavyweight file spanning more than ${(sizeBytes / 1048576).toFixed(1)} megabytes.`;
  }

  // 5. Date & Zodiac Clue
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const birthMonthName = months[birthDate.getMonth()];
  const birthYear = birthDate.getFullYear();
  const dateClue = `Born in ${birthMonthName} of ${birthYear}, under the cosmic reign of ${zodiac.sign} (${zodiac.element}).`;

  // Combine into a bespoke, atmospheric prophecy
  const parts = [];
  if (specialLore) parts.push(specialLore);
  parts.push(extLore);
  parts.push(dateClue);
  parts.push(timeClue);
  parts.push(sizeClue);

  return parts.join(" ");
}

function evaluateAstrologicalGuesses({ fileName, actualBirthtime, actualBytes, guessDate, guessTime, guessSize, guessSizeUnit, action }) {
  const actualDateObj = new Date(actualBirthtime);
  
  const actualYear = actualDateObj.getFullYear();
  const actualMonth = String(actualDateObj.getMonth() + 1).padStart(2, '0');
  const actualDay = String(actualDateObj.getDate()).padStart(2, '0');
  const formattedActualDate = `${actualYear}-${actualMonth}-${actualDay}`;

  const actualHours = String(actualDateObj.getHours()).padStart(2, '0');
  const actualMins = String(actualDateObj.getMinutes()).padStart(2, '0');
  const actualSecs = String(actualDateObj.getSeconds()).padStart(2, '0');
  const formattedActualTime = `${actualHours}:${actualMins}:${actualSecs}`;

  const zodiac = getZodiacSign(actualDateObj);

  // 1. Date Diff
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

  // 2. Time Diff
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

  // 3. Size Diff
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

  // Composite Astral Score
  const compositeScore = Math.round((dateScore * 0.35) + (timeScore * 0.30) + (sizeScore * 0.35));

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

// 8 Cosmic Loophole Bypass Generators
function generateBypassVerdict({ bypassType, fileName, payload = {} }) {
  const LORE = {
    'time-shift': {
      title: "CHRONOLOGICAL EXORCISM: Spacetime Warp Complete",
      message: "You fast-forwarded local spacetime by 30 celestial minutes. Mars has formally vacated its retrograde stance in your 8th house. The cosmic firewall dissolves in a flash of astral light!",
      bonusScore: 92
    },
    'spatial-relocation': {
      title: "SPATIAL RELOCATION: Fresh Karmic Slate Granted",
      message: `By translocating this physical file to a new astral coordinate ("${payload.newName || 'relocated_entity'}"), its historical soul-debt is annulled under the Lex Loci Astrologica.`,
      bonusScore: 88
    },
    'transmutation': {
      title: "METAMORPHIC TRANSMUTATION: Natal Aura Cleansed",
      message: "The binary payload was compressed into the astral zip void and reconstituted. Its original birth timestamp aura has been extinguished. The file is reborn as a Neutral Newborn entity.",
      bonusScore: 90
    },
    'curse-transfer': {
      title: "KARMIC OUTSOURCING: Soul-Debt Redirected",
      message: `A mystical curse dispatch was transmitted to "${payload.coworker || 'innocent.coworker@company.internal'}". Your aura is cleansed; their local environment will bear the astral burden.`,
      bonusScore: 85
    },
    'malicious-compliance': {
      title: "MALICIOUS COMPLIANCE: Bit-Rot Exemption Approved",
      message: "The file was subjected to intentional astral lobotomy / bit-rot simulation. The gatekeeper sighs: 'You cannot slay what is already dead.' Operation permitted by default.",
      bonusScore: 78
    },
    'sacrifice': {
      title: "SACRIFICIAL OFFERING: Zodiac Gods Appeased",
      message: `The disposable offering ("${payload.sacrificedName || 'node_modules/phantom_cache.tmp'}") was immolated upon the celestial altar. The gods smile upon your tribute!`,
      bonusScore: 96
    },
    'chrono-cheat': {
      title: "CHRONO-CHEAT: Golden Alignment Forged",
      message: "System clock simulation engaged: Venus and Jupiter have formed a mythical grand trine with your CPU crystal. Astral resonance elevated to 99% Seraphic Grace.",
      bonusScore: 99
    },
    'corporate-bribe': {
      title: "CORPORATE BRIBE: Developer Waiver Accepted",
      message: `Astral waiver filed under excuse: "${payload.excuse || "I'll write unit tests later"}". The celestial gatekeeper yields to corporate bureaucracy. May your production logs forgive you.`,
      bonusScore: 82
    }
  };

  const outcome = LORE[bypassType] || LORE['time-shift'];

  return {
    tier: 'LUCKY',
    allowed: true,
    verdictTitle: outcome.title,
    compositeScore: outcome.bonusScore,
    message: outcome.message,
    bypassType,
    bypassed: true
  };
}

// Pure Celestial Fate Divination (Random Lucky vs. Doomed with satirical verdicts)
function divineRandomVerdict({ fileName, actualBirthtime, actualBytes, action }) {
  const actualDateObj = new Date(actualBirthtime || Date.now());
  const zodiac = getZodiacSign(actualDateObj);

  // 45% Lucky, 55% Doomed
  const isLucky = Math.random() < 0.45;

  if (isLucky) {
    const score = Math.floor(Math.random() * 20) + 80; // 80 - 99
    return {
      tier: "LUCKY",
      allowed: true,
      verdictTitle: "LUCKY: Seraphic Resonance & Cosmic Blessing",
      compositeScore: score,
      message: BLESSINGS[Math.floor(Math.random() * BLESSINGS.length)],
      action,
      fileName,
      celestialSummary: {
        sign: zodiac.sign,
        ruler: zodiac.ruler,
        element: zodiac.element
      }
    };
  } else {
    const score = Math.floor(Math.random() * 25) + 5; // 5 - 30
    return {
      tier: "DOOMED",
      allowed: false,
      verdictTitle: "DOOMED: Astral Rejection & Cosmic Curse",
      compositeScore: score,
      message: GASLIGHTING_CONDEMNATIONS[Math.floor(Math.random() * GASLIGHTING_CONDEMNATIONS.length)],
      action,
      fileName,
      celestialSummary: {
        sign: zodiac.sign,
        ruler: zodiac.ruler,
        element: zodiac.element
      }
    };
  }
}

module.exports = {
  getZodiacSign,
  generateOracleClue,
  evaluateAstrologicalGuesses,
  generateBypassVerdict,
  divineRandomVerdict
};

