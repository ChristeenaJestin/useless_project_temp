// Browser Native File System Access API & Virtual Astrological Files
import { getZodiacSign, generateOracleClue } from './astrology';

// In-memory handle registry for reading local files & navigating folders on demand
const fileHandlesMap = new Map();
const dirHandlesMap = new Map();

// Helper: Convert File object to AstroFS entry
export async function fileObjectToEntry(file, parentPath = '') {
  const ext = file.name.includes('.') ? file.name.split('.').pop().toLowerCase() : 'file';
  const birthDate = new Date(file.lastModified || Date.now());
  const zodiac = getZodiacSign(birthDate);
  const fullPath = parentPath ? `${parentPath}/${file.name}` : file.name;

  return {
    id: fullPath,
    name: file.name,
    path: fullPath,
    isDir: false,
    size: file.size,
    extension: ext,
    astrologicalSign: zodiac.sign,
    element: zodiac.element,
    planetaryRuler: zodiac.ruler,
    birthDate,
    oracleClue: generateOracleClue({
      fileName: file.name,
      extension: ext,
      birthDate,
      sizeBytes: file.size,
      zodiac
    }),
    status: 'closed',
    isLocalMounted: true
  };
}

// 1. Mount Real PC Folder using window.showDirectoryPicker() or fallback file input
export async function pickAndMountLocalFolder() {
  fileHandlesMap.clear();
  dirHandlesMap.clear();

  // Modern Chromium browsers (Chrome, Edge, Opera, Brave)
  if (typeof window !== 'undefined' && 'showDirectoryPicker' in window) {
    try {
      const dirHandle = await window.showDirectoryPicker({ mode: 'read' });
      const entries = [];
      const folderName = dirHandle.name || 'Mounted PC Folder';

      dirHandlesMap.set(folderName, { handle: dirHandle, parentPath: null });

      for await (const [name, handle] of dirHandle.entries()) {
        // Skip hidden system files
        if (name.startsWith('.') || name.startsWith('$') || name === 'Thumbs.db') continue;

        const itemPath = `${folderName}/${name}`;
        if (handle.kind === 'directory') {
          dirHandlesMap.set(itemPath, { handle, parentPath: folderName });
          entries.push({
            id: itemPath,
            name,
            path: itemPath,
            isDir: true,
            extension: 'folder',
            astrologicalSign: 'Virgo',
            element: 'Earth',
            planetaryRuler: 'Mercury',
            status: 'closed',
            isLocalMounted: true
          });
        } else if (handle.kind === 'file') {
          const file = await handle.getFile();
          const entry = await fileObjectToEntry(file, folderName);
          fileHandlesMap.set(entry.path, { handle, file });
          entries.push(entry);
        }
      }

      // Sort: folders first, then files
      entries.sort((a, b) => {
        if (a.isDir && !b.isDir) return -1;
        if (!a.isDir && b.isDir) return 1;
        return a.name.localeCompare(b.name);
      });

      return {
        currentDir: folderName,
        parentDir: null,
        entries,
        isMounted: true
      };
    } catch (err) {
      if (err.name === 'AbortError') {
        return null; // User cancelled dialog
      }
      console.warn("showDirectoryPicker failed, falling back to input:", err);
    }
  }

  // Fallback for Firefox/Safari or when picker fails: webkitdirectory input
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.webkitdirectory = true;
    input.directory = true;
    input.multiple = true;
    input.style.display = 'none';
    document.body.appendChild(input);

    input.onchange = async (e) => {
      const files = Array.from(e.target.files || []);
      document.body.removeChild(input);

      if (files.length === 0) {
        resolve(null);
        return;
      }

      const folderName = files[0].webkitRelativePath?.split('/')[0] || 'Selected PC Folder';
      const entries = [];
      const seenDirs = new Set();

      for (const file of files) {
        const parts = file.webkitRelativePath.split('/');
        if (parts.length > 2) {
          // Subfolder
          const subDirName = parts[1];
          if (!seenDirs.has(subDirName)) {
            seenDirs.add(subDirName);
            entries.push({
              id: `${folderName}/${subDirName}`,
              name: subDirName,
              path: `${folderName}/${subDirName}`,
              isDir: true,
              extension: 'folder',
              astrologicalSign: 'Gemini',
              element: 'Air',
              planetaryRuler: 'Mercury',
              status: 'closed',
              isLocalMounted: true
            });
          }
        } else {
          // Top-level file
          const entry = await fileObjectToEntry(file, folderName);
          fileHandlesMap.set(entry.path, { file });
          entries.push(entry);
        }
      }

      entries.sort((a, b) => {
        if (a.isDir && !b.isDir) return -1;
        if (!a.isDir && b.isDir) return 1;
        return a.name.localeCompare(b.name);
      });

      resolve({
        currentDir: folderName,
        parentDir: null,
        entries,
        isMounted: true
      });
    };

    input.oncancel = () => {
      document.body.removeChild(input);
      resolve(null);
    };

    input.click();
  });
}

// 2. Browse a subfolder within the mounted local PC directory
export async function browseMountedDirectory(dirPath) {
  const dirItem = dirHandlesMap.get(dirPath);
  if (!dirItem || !dirItem.handle) return null;

  try {
    const entries = [];
    for await (const [name, handle] of dirItem.handle.entries()) {
      if (name.startsWith('.') || name.startsWith('$') || name === 'Thumbs.db') continue;
      const itemPath = `${dirPath}/${name}`;
      if (handle.kind === 'directory') {
        dirHandlesMap.set(itemPath, { handle, parentPath: dirPath });
        entries.push({
          id: itemPath,
          name,
          path: itemPath,
          isDir: true,
          extension: 'folder',
          astrologicalSign: 'Virgo',
          element: 'Earth',
          planetaryRuler: 'Mercury',
          status: 'closed',
          isLocalMounted: true
        });
      } else if (handle.kind === 'file') {
        const file = await handle.getFile();
        const entry = await fileObjectToEntry(file, dirPath);
        fileHandlesMap.set(entry.path, { handle, file });
        entries.push(entry);
      }
    }

    entries.sort((a, b) => {
      if (a.isDir && !b.isDir) return -1;
      if (!a.isDir && b.isDir) return 1;
      return a.name.localeCompare(b.name);
    });

    return {
      currentDir: dirPath,
      parentDir: dirItem.parentPath,
      entries,
      isMounted: true
    };
  } catch (err) {
    console.error("Failed to browse mounted subfolder:", err);
    return null;
  }
}

// 3. Check if path is part of local mounted directories
export function isMountedPath(path) {
  return dirHandlesMap.has(path) || fileHandlesMap.has(path);
}

// 4. Read content of a mounted local PC file directly in the browser
export async function readMountedFileContent(filePath) {
  const item = fileHandlesMap.get(filePath);
  if (!item) {
    return { isImage: false, content: "[File content accessible once unlocked by the stars]" };
  }

  if (item.virtualContent) {
    return { isImage: false, content: item.virtualContent };
  }

  const file = item.handle ? await item.handle.getFile() : item.file;
  if (!file) {
    return { isImage: false, content: "[File content unavailable]" };
  }

  const ext = file.name.split('.').pop().toLowerCase();
  const imageExts = new Set(['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'ico']);

  if (imageExts.has(ext)) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve({ isImage: true, content: reader.result });
      reader.onerror = () => resolve({ isImage: false, content: "[Could not render optical vessel]" });
      reader.readAsDataURL(file);
    });
  } else {
    try {
      const text = await file.text();
      return {
        isImage: false,
        content: text.length > 65536 ? text.substring(0, 65536) + "\n\n...[Truncated for celestial balance]..." : text
      };
    } catch (e) {
      return { isImage: false, content: "[Binary file content - cannot display as plain text]" };
    }
  }
}

// 5. Virtual sample files for hosted deployments (when no local folder mounted yet)
export function getSampleAstrologicalFiles() {
  const sampleFolder = "Desktop (Celestial Cloud)";

  const SAMPLE_DEFS = [
    {
      name: "algorithms_lecture.pdf",
      size: 428000,
      date: new Date(2024, 2, 14, 10, 30),
      ext: "pdf",
      content: "[Binary PDF Data - Celestial Lecture on Sorting Algorithms & Karmic Trees]"
    },
    {
      name: "quarterly_karmic_report.xlsx",
      size: 18450,
      date: new Date(2023, 9, 21, 15, 45),
      ext: "doc",
      content: "ASTROFS CORPORATE AUDIT\n-----------------------\nQ1: +340 Spiritual Merits\nQ2: -120 Karmic Penalties (mercury in retrograde)\nQ3: +890 File Access Loops\nQ4: Parity Restored"
    },
    {
      name: "secret_developer_diary.txt",
      size: 1024,
      date: new Date(2024, 0, 1, 12, 0),
      ext: "txt",
      content: "Day 42: The compiler refused to build today because Venus entered retrograde in my 8th house. I tried burning sage near the CPU exhaust fan, but the linter still threw 14 karmic warnings."
    },
    {
      name: "starlight_simulation.jsx",
      size: 3450,
      date: new Date(2024, 4, 18, 23, 15),
      ext: "jsx",
      content: "import React from 'react';\n\nexport default function Starlight() {\n  return <div>✨ Seraphic Resonance Active. Cosmic file unlocked.</div>;\n}"
    },
    {
      name: "astrological_manifesto.md",
      size: 2150,
      date: new Date(2023, 7, 5, 14, 20),
      ext: "md",
      content: "# AstroFS Manifesto\n\n1. No file shall be read without spiritual consent.\n2. All NTFS allocation tables are karmically linked to the 12 zodiac houses.\n3. Defeat the doom through sacred loophole rituals."
    }
  ];

  const entries = SAMPLE_DEFS.map(def => {
    const zodiac = getZodiacSign(def.date);
    const fullPath = `${sampleFolder}/${def.name}`;

    // Register in handle map so file can be read once unlocked
    fileHandlesMap.set(fullPath, { virtualContent: def.content });

    return {
      id: fullPath,
      name: def.name,
      path: fullPath,
      isDir: false,
      size: def.size,
      extension: def.ext,
      astrologicalSign: zodiac.sign,
      element: zodiac.element,
      planetaryRuler: zodiac.ruler,
      birthDate: def.date,
      oracleClue: generateOracleClue({
        fileName: def.name,
        extension: def.ext,
        birthDate: def.date,
        sizeBytes: def.size,
        zodiac
      }),
      status: 'closed',
      virtualContent: def.content
    };
  });

  return {
    currentDir: sampleFolder,
    parentDir: null,
    entries
  };
}

