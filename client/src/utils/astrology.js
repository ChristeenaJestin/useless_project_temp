// Client-Side Astrological Engine for Mounted Local PC Files & Hosted Deployments

export const BLESSINGS = [
  "✨ COSMIC BLESSING GRANTED: The alignment of your compiler and the astral plane is immaculate! The file submits to your radiant spiritual will.",
  "🌟 ASTRAL SYNCHRONICITY ACHIEVED: Jupiter smiles upon your psychic intuition. The local filesystem gates part with celestial harmony.",
  "🔮 DIVINE ENLIGHTENMENT: Your third eye has pierced the NTFS master file table! You knew the true birth of this file.",
  "🌌 SERAPHIC HARMONY: Zero byte-karma debt detected. The universe personally vouches for this file operation."
];

export const GASLIGHTING_CONDEMNATIONS = [
  "⛔ ACTION STRICTLY BLOCKED BY THE STARS: Are you serious? You guessed with the psychic precision of a broken microwave. The cosmic firewall denies your unholy request.",
  "🪐 ASTRAL REJECTION: You claim this is your file on your PC, yet you don't even know when it was born? The universe knows an imposter when it sees one. Action denied!",
  "💀 KARMIC COLLAPSE: Your astral prediction was so inaccurate that your disk sectors suffered emotional damage. This file refuses to be touched by your chaotic hands.",
  "🌑 VOID BREACH: Access blocked. The spirits of uncommitted git stashes are laughing at you in the 4th house. Go meditate on your directory tree and try again.",
  "🧘 CHAKRA MISALIGNMENT ERROR 403: The file has filed a restraining order against your mouse cursor on grounds of psychic incompatibility."
];

export function getZodiacSign(date) {
  const d = date instanceof Date ? date : new Date(date || Date.now());
  const month = d.getMonth() + 1; // 1 - 12
  const day = d.getDate();

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

export function generateOracleClue({ fileName, extension, birthDate, sizeBytes, zodiac }) {
  const lowerName = (fileName || '').toLowerCase();
  const lowerExt = (extension || '').toLowerCase();

  let specialLore = "";
  if (lowerName.includes("figma")) {
    specialLore = "The oracle envisions wireframes, auto-layouts, and designers debating over subtle border-radius tokens.";
  } else if (lowerName.includes("github") || lowerName.includes("git")) {
    specialLore = "The echoes of git commits reverberate: 'fixes bug', 'final v2', and the quiet fear of merge conflicts.";
  } else if (lowerName.includes("netflix")) {
    specialLore = "A gateway to late-night binge watching when you promised yourself you'd go to sleep at 11 PM.";
  } else if (lowerName.includes("postman")) {
    specialLore = "Whispers of HTTP headers, Bearer tokens, and desperate prayers for a 200 OK response.";
  } else if (lowerName.includes("mongo")) {
    specialLore = "Unbound BSON documents drifting through memory without the rigid tyranny of SQL tables.";
  } else if (lowerName.includes("code") || lowerName.includes("react")) {
    specialLore = "The sacred IDE anvil where raw keystrokes are forged into living software.";
  } else if (lowerName.includes("readme")) {
    specialLore = "The sacred guide scroll created to illuminate newcomers, yet perpetually skimmed.";
  }

  let extLore = "";
  if (["js", "jsx", "ts", "tsx"].includes(lowerExt)) {
    extLore = "Crafted in the versatile syntax of JavaScript/TypeScript.";
  } else if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(lowerExt)) {
    extLore = "An optical vessel of pixels and chromatic frequencies.";
  } else if (lowerExt === "pdf") {
    extLore = "A solemn document sealed in immutable portable document format.";
  } else if (lowerExt === "json") {
    extLore = "A structured hierarchy of configuration keys and values.";
  } else {
    extLore = `An enigmatic entity registered under the .${lowerExt || 'file'} format.`;
  }

  const hour = (birthDate instanceof Date ? birthDate : new Date()).getHours();
  let timeClue = hour >= 5 && hour < 12 
    ? "Brought into existence during the early morning hours over caffeine."
    : hour >= 12 && hour < 17 
    ? "Crafted in the steady daylight of an active afternoon."
    : hour >= 17 && hour < 22 
    ? "Manifested in the dusk as the working day wound down."
    : "Birthed in the silent witching hours of the night.";

  const sizeClue = sizeBytes < 1024 
    ? "Scarcely a few hundred bytes, featherweight in the digital ether."
    : sizeBytes < 1048576 
    ? `Weighs modest kilobytes (${(sizeBytes / 1024).toFixed(0)} KB).`
    : `A heavyweight file spanning ${(sizeBytes / 1048576).toFixed(1)} MB.`;

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const bDate = birthDate instanceof Date ? birthDate : new Date();
  const dateClue = `Born in ${months[bDate.getMonth()]} ${bDate.getFullYear()}, ruled by ${zodiac.sign} (${zodiac.element}).`;

  return [specialLore, extLore, dateClue, timeClue, sizeClue].filter(Boolean).join(" ");
}

// Client-side 50/50 prediction generator (used when backend is not hosted on localhost)
export function evaluateClientAstrology({ fileName, birthDate, sizeBytes, guessDate, guessTime, guessSize, guessSizeUnit, psychicConfidence }) {
  const zodiac = getZodiacSign(birthDate || new Date());
  const isLucky = Math.random() < 0.5;

  if (isLucky) {
    return {
      tier: "LUCKY",
      allowed: true,
      verdictTitle: "LUCKY: Seraphic Resonance & Divine Grace",
      compositeScore: Math.floor(Math.random() * 20) + 80,
      message: BLESSINGS[Math.floor(Math.random() * BLESSINGS.length)],
      fileName,
      submissionDetails: {
        guessDate: String(guessDate || 'Undisclosed'),
        guessTime: String(guessTime || 'Undisclosed'),
        guessSize: `${guessSize || 0} ${guessSizeUnit || 'bytes'}`,
        psychicConfidence: `${psychicConfidence || 65}%`
      },
      celestialSummary: {
        sign: zodiac.sign,
        ruler: zodiac.ruler,
        element: zodiac.element
      }
    };
  } else {
    return {
      tier: "DOOMED",
      allowed: false,
      verdictTitle: "DOOMED: Cosmic Rejection & Astral Curse",
      compositeScore: Math.floor(Math.random() * 25) + 10,
      message: GASLIGHTING_CONDEMNATIONS[Math.floor(Math.random() * GASLIGHTING_CONDEMNATIONS.length)],
      fileName,
      submissionDetails: {
        guessDate: String(guessDate || 'Undisclosed'),
        guessTime: String(guessTime || 'Undisclosed'),
        guessSize: `${guessSize || 0} ${guessSizeUnit || 'bytes'}`,
        psychicConfidence: `${psychicConfidence || 65}%`
      },
      celestialSummary: {
        sign: zodiac.sign,
        ruler: zodiac.ruler,
        element: zodiac.element
      }
    };
  }
}

export function generateClientBypassVerdict({ bypassType, fileName, payload = {} }) {
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

