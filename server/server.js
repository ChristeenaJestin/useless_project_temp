const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { evaluateAstrologicalGuesses, getZodiacSign, generateOracleClue, generateBypassVerdict } = require('./astrologyEngine');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Resolve key PC locations on Windows
function getQuickLocations() {
  const home = os.homedir();
  const locations = [];

  // Desktop (check OneDrive Desktop first, then standard Desktop)
  const oneDriveDesktop = path.join(home, 'OneDrive', 'Desktop');
  const stdDesktop = path.join(home, 'Desktop');
  if (fs.existsSync(oneDriveDesktop)) {
    locations.push({ name: "Desktop", path: oneDriveDesktop, icon: "Monitor" });
  } else if (fs.existsSync(stdDesktop)) {
    locations.push({ name: "Desktop", path: stdDesktop, icon: "Monitor" });
  }

  // Downloads
  const downloads = path.join(home, 'Downloads');
  if (fs.existsSync(downloads)) {
    locations.push({ name: "Downloads", path: downloads, icon: "Download" });
  }

  // Documents
  const oneDriveDocs = path.join(home, 'OneDrive', 'Documents');
  const stdDocs = path.join(home, 'Documents');
  if (fs.existsSync(stdDocs)) {
    locations.push({ name: "Documents", path: stdDocs, icon: "Folder" });
  } else if (fs.existsSync(oneDriveDocs)) {
    locations.push({ name: "Documents", path: oneDriveDocs, icon: "Folder" });
  }

  // System Drives
  ['C:\\', 'D:\\'].forEach(drive => {
    try {
      if (fs.existsSync(drive)) {
        locations.push({ name: `Drive (${drive.replace('\\', '')})`, path: drive, icon: "HardDrive" });
      }
    } catch (e) {}
  });

  return locations;
}

// Default target: Desktop
const QUICK_LOCATIONS = getQuickLocations();
const DEFAULT_PC_DIR = QUICK_LOCATIONS.find(l => l.name === 'Desktop')?.path || os.homedir();

function resolveSafePath(requestedDir) {
  if (!requestedDir) return DEFAULT_PC_DIR;
  try {
    const resolved = path.resolve(requestedDir);
    if (fs.existsSync(resolved)) {
      return resolved;
    }
  } catch (e) {}
  return DEFAULT_PC_DIR;
}

// 1. Get Quick Access Locations
app.get('/api/quick-locations', (req, res) => {
  res.json({
    defaultDir: DEFAULT_PC_DIR,
    locations: getQuickLocations()
  });
});

// 2. Browse Real Files on PC
app.get('/api/browse', (req, res) => {
  try {
    const targetDir = resolveSafePath(req.query.dir);
    const stat = fs.statSync(targetDir);
    
    if (!stat.isDirectory()) {
      return res.status(400).json({ error: "Specified path is not a directory." });
    }

    const items = fs.readdirSync(targetDir, { withFileTypes: true });

    // Filter hidden system files
    const IGNORED = new Set([
      'desktop.ini', 'thumbs.db', 'ntuser.dat', '$RECYCLE.BIN', 
      'System Volume Information', 'pagefile.sys', 'hiberfil.sys', 'swapfile.sys'
    ]);

    const entries = [];
    for (const item of items) {
      if (IGNORED.has(item.name.toLowerCase())) continue;
      // Skip hidden files starting with . if on system root
      if (item.name.startsWith('$')) continue;

      const itemFullPath = path.join(targetDir, item.name);
      try {
        const itemStat = fs.statSync(itemFullPath);
        const isDir = item.isDirectory();
        const ext = isDir ? 'folder' : path.extname(item.name).replace('.', '').toLowerCase() || 'file';
        
        // Dynamically compute zodiac from real file birthtime
        const birthDate = itemStat.birthtime && itemStat.birthtime.getTime() > 0 
          ? itemStat.birthtime 
          : itemStat.mtime || new Date();
        const zodiac = getZodiacSign(new Date(birthDate));

        entries.push({
          id: itemFullPath,
          name: item.name,
          path: itemFullPath,
          isDir,
          extension: ext,
          astrologicalSign: zodiac.sign,
          element: zodiac.element,
          planetaryRuler: zodiac.ruler,
          oracleClue: isDir ? null : generateOracleClue({
            fileName: item.name,
            extension: ext,
            birthDate: new Date(birthDate),
            sizeBytes: itemStat.size,
            zodiac
          }),
          status: 'closed'
        });
      } catch (err) {
        // Skip inaccessible files / access denied system folders
      }
    }

    // Sort: folders first, then files
    entries.sort((a, b) => {
      if (a.isDir && !b.isDir) return -1;
      if (!a.isDir && b.isDir) return 1;
      return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
    });

    const parentDir = path.dirname(targetDir);

    res.json({
      currentDir: targetDir,
      parentDir: parentDir !== targetDir ? parentDir : null,
      entries
    });
  } catch (err) {
    res.status(500).json({ error: `Failed to inspect PC directory: ${err.message}` });
  }
});

function readFileContentHelper(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const imageExts = new Set(['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico']);
  
  if (imageExts.has(ext)) {
    const buffer = fs.readFileSync(filePath);
    const mime = ext === '.svg' ? 'image/svg+xml' : `image/${ext.replace('.', '')}`;
    return { isImage: true, content: `data:${mime};base64,${buffer.toString('base64')}` };
  } else {
    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      return {
        isImage: false,
        content: raw.length > 65536 ? raw.substring(0, 65536) + "\n\n...[Truncated for celestial balance]..." : raw
      };
    } catch (e) {
      return { isImage: false, content: "[Binary file content - cannot display as plain text]" };
    }
  }
}

// 3. Read Real File Content (when unlocked by Astrological Verdict)
app.get('/api/file-content', (req, res) => {
  const filePath = req.query.path;
  if (!filePath || !fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found on local disk." });
  }

  try {
    const content = readFileContentHelper(filePath);
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: `Cannot read file: ${err.message}` });
  }
});

// 4. Interrogation Engine for Real PC Files
app.post('/api/interrogate', (req, res) => {
  const { filePath, action, guessDate, guessTime, guessSize, guessSizeUnit } = req.body;

  if (!filePath || !action || !guessDate || !guessTime || guessSize === undefined) {
    return res.status(400).json({
      error: "Incomplete psychic prediction. Please input date, time, and size."
    });
  }

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      error: "This physical entity does not exist on your computer."
    });
  }

  try {
    const stat = fs.statSync(filePath);
    const fileName = path.basename(filePath);

    // Real creation time on NTFS
    const actualBirthtime = (stat.birthtime && stat.birthtime.getTime() > 0)
      ? stat.birthtime
      : stat.mtime;
    const actualBytes = stat.size;

    const evaluation = evaluateAstrologicalGuesses({
      fileName,
      actualBirthtime,
      actualBytes,
      guessDate,
      guessTime,
      guessSize,
      guessSizeUnit: guessSizeUnit || "bytes",
      action
    });

    let fileContent = null;

    if (evaluation.allowed) {
      if (action === 'open') {
        fileContent = readFileContentHelper(filePath);
      } else if (action === 'delete') {
        // Safe deletion: move to local .astral_trash in user home
        const trashDir = path.join(os.homedir(), '.astral_trash');
        if (!fs.existsSync(trashDir)) {
          fs.mkdirSync(trashDir, { recursive: true });
        }
        const destination = path.join(trashDir, `${Date.now()}_${fileName}`);
        fs.renameSync(filePath, destination);
      }
    }

    res.json({
      verdict: evaluation,
      fileContent
    });
  } catch (err) {
    res.status(500).json({ error: `File interrogation failed: ${err.message}` });
  }
});

// 5. Cosmic Loophole Bypass Engine (Overriding the Doom)
app.post('/api/bypass', (req, res) => {
  const { filePath, action, bypassType, payload = {} } = req.body;

  if (!filePath || !bypassType) {
    return res.status(400).json({ error: "Missing filePath or bypassType for cosmic bypass." });
  }

  let effectiveFilePath = filePath;

  try {
    // Perform file-level mutations if applicable
    if (bypassType === 'spatial-relocation') {
      if (fs.existsSync(filePath)) {
        const dir = path.dirname(filePath);
        const originalExt = path.extname(filePath);
        const baseWithoutExt = path.basename(filePath, originalExt);
        const newName = payload.newName && payload.newName.trim() 
          ? payload.newName.trim() 
          : `blessed_${baseWithoutExt}${originalExt}`;
        const newFullPath = path.join(dir, newName);

        if (!fs.existsSync(newFullPath)) {
          fs.renameSync(filePath, newFullPath);
          effectiveFilePath = newFullPath;
        }
      }
    } else if (bypassType === 'transmutation') {
      // Touch file timestamp to reset natal chart to Newborn
      if (fs.existsSync(filePath)) {
        try {
          const now = new Date();
          fs.utimesSync(filePath, now, now);
        } catch (e) {}
      }
    } else if (bypassType === 'malicious-compliance') {
      // Inject simulated bit-rot header
      if (fs.existsSync(filePath)) {
        try {
          const ext = path.extname(filePath).toLowerCase();
          const textExts = new Set(['.txt', '.md', '.json', '.js', '.jsx', '.ts', '.tsx', '.html', '.css']);
          if (textExts.has(ext)) {
            const originalText = fs.readFileSync(filePath, 'utf-8');
            if (!originalText.startsWith("/* [ASTRAL_BIT_ROT_LOBOTOMY]")) {
              fs.writeFileSync(filePath, `/* [ASTRAL_BIT_ROT_LOBOTOMY: Mars Retrograde Exemption Granted] */\n` + originalText, 'utf-8');
            }
          }
        } catch (e) {}
      }
    } else if (bypassType === 'sacrifice') {
      // If user sacrificed an actual disposable file
      if (payload.sacrificialFilePath && fs.existsSync(payload.sacrificialFilePath)) {
        try {
          fs.unlinkSync(payload.sacrificialFilePath);
        } catch (e) {}
      }
    }

    // Generate celestial bypass verdict
    const verdict = generateBypassVerdict({
      bypassType,
      fileName: path.basename(effectiveFilePath),
      payload
    });

    // Execute the file operation
    let fileContent = null;
    if (action === 'open') {
      if (fs.existsSync(effectiveFilePath)) {
        fileContent = readFileContentHelper(effectiveFilePath);
      }
    } else if (action === 'delete') {
      if (fs.existsSync(effectiveFilePath)) {
        const trashDir = path.join(os.homedir(), '.astral_trash');
        if (!fs.existsSync(trashDir)) {
          fs.mkdirSync(trashDir, { recursive: true });
        }
        const destination = path.join(trashDir, `${Date.now()}_${path.basename(effectiveFilePath)}`);
        fs.renameSync(effectiveFilePath, destination);
      }
    }

    // Recompute file's updated astrological identity
    let updatedZodiac = null;
    if (fs.existsSync(effectiveFilePath)) {
      try {
        const stat = fs.statSync(effectiveFilePath);
        const birthDate = stat.birthtime && stat.birthtime.getTime() > 0 ? stat.birthtime : stat.mtime || new Date();
        updatedZodiac = getZodiacSign(new Date(birthDate));
      } catch (e) {}
    }

    res.json({
      verdict,
      fileContent,
      updatedFilePath: effectiveFilePath !== filePath ? effectiveFilePath : null,
      newFileName: path.basename(effectiveFilePath),
      updatedZodiac
    });
  } catch (err) {
    res.status(500).json({ error: `Cosmic bypass failed: ${err.message}` });
  }
});

// Serve frontend in production build if present
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDistPath));

app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: "API endpoint not found." });
  }
  const indexHtml = path.join(clientDistPath, 'index.html');
  res.sendFile(indexHtml, (err) => {
    if (err) {
      res.status(200).send("Astrological File Interceptor API Server is running.");
    }
  });
});

app.listen(PORT, () => {
  console.log(`✨ AstroFS PC Server online at http://localhost:${PORT}`);
  console.log(`📂 Default PC Directory: ${DEFAULT_PC_DIR}`);
});
