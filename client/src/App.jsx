import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FileExplorer from './components/FileExplorer';
import FileViewer from './components/FileViewer';
import InterceptionModal from './components/InterceptionModal';
import CosmicBackground from './components/CosmicBackground';
import CursorAura from './components/CursorAura';
import CosmicSplashLoader from './components/CosmicSplashLoader';
import { soundEffects } from './components/SoundFx';
import { 
  pickAndMountLocalFolder, 
  browseMountedDirectory, 
  readMountedFileContent, 
  getSampleAstrologicalFiles,
  isMountedPath
} from './utils/localFileSystem';
import { evaluateClientAstrology } from './utils/astrology';

export default function App() {
  const [currentDir, setCurrentDir] = useState('');
  const [parentDir, setParentDir] = useState(null);
  const [quickLocations, setQuickLocations] = useState([]);
  const [entries, setEntries] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [openFiles, setOpenFiles] = useState({}); // { [filePath]: { isImage, content } }
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(false);

  // Interception Modal States
  const [interception, setInterception] = useState(null); // { file, action }
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verdictResult, setVerdictResult] = useState(null);
  const [showBootLoader, setShowBootLoader] = useState(true);

  // Load real files from PC directory or mounted local folder
  const loadDirectory = async (dirPath) => {
    setLoading(true);
    try {
      // 1. If this is a local browser-mounted folder/subfolder, browse client-side handles
      if (dirPath && isMountedPath(dirPath)) {
        const mountedData = await browseMountedDirectory(dirPath);
        if (mountedData) {
          setCurrentDir(mountedData.currentDir);
          setParentDir(mountedData.parentDir);
          setEntries(mountedData.entries || []);

          const firstFile = mountedData.entries?.find(e => !e.isDir);
          if (firstFile && (!activeFile || !mountedData.entries.some(e => e.path === activeFile.path))) {
            setActiveFile(firstFile);
          }
          return;
        }
      }

      // 2. Try fetching from local Express backend
      const url = dirPath ? `/api/browse?dir=${encodeURIComponent(dirPath)}` : '/api/browse';
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setCurrentDir(data.currentDir);
        setParentDir(data.parentDir);
        setEntries(data.entries || []);

        // Pick first file if none active
        const firstFile = data.entries?.find(e => !e.isDir);
        if (firstFile && (!activeFile || !data.entries.some(e => e.path === activeFile.path))) {
          setActiveFile(firstFile);
        }
        return;
      }
    } catch (err) {
      console.warn("Backend directory fetch unavailable, checking fallback:", err);
    } finally {
      setLoading(false);
    }

    // 3. Fallback to sample celestial files if hosted or backend unreachable
    setEntries(prev => {
      if (prev.length === 0) {
        const sample = getSampleAstrologicalFiles();
        setCurrentDir(sample.currentDir);
        setParentDir(sample.parentDir);
        if (sample.entries.length > 0) {
          setActiveFile(sample.entries[0]);
        }
        return sample.entries;
      }
      return prev;
    });
  };

  // Mount Real PC folder via File System Access API
  const handleMountLocalFolder = async () => {
    try {
      const mounted = await pickAndMountLocalFolder();
      if (mounted) {
        setCurrentDir(mounted.currentDir);
        setParentDir(mounted.parentDir);
        setEntries(mounted.entries);
        const firstFile = mounted.entries.find(e => !e.isDir);
        if (firstFile) {
          setActiveFile(firstFile);
        }
      }
    } catch (err) {
      console.error("Failed to mount local folder:", err);
    }
  };

  // On mount: fetch quick locations (Desktop, Downloads, Documents, Drives)
  useEffect(() => {
    const initLocations = async () => {
      try {
        const res = await fetch('/api/quick-locations');
        if (res.ok) {
          const data = await res.json();
          setQuickLocations(data.locations || []);
          if (data.defaultDir) {
            loadDirectory(data.defaultDir);
            return;
          }
        }
      } catch (e) {
        console.warn("Could not load quick locations from backend", e);
      }
      loadDirectory();
    };

    initLocations();
  }, []);

  // Intercept every file action!
  const handleInterceptAction = (file, action) => {
    setVerdictResult(null);
    setInterception({ file, action });
  };

  // Submit psychic predictions
  const handleSubmitInterrogation = async (formData) => {
    setIsSubmitting(true);
    const minDelay = new Promise(resolve => setTimeout(resolve, 2000));
    const targetFile = interception?.file;
    const isMounted = targetFile?.isLocalMounted;

    try {
      let res;
      if (isMounted) {
        // Direct browser-native evaluation for mounted PC files
        const [, verdict] = await Promise.all([
          minDelay,
          Promise.resolve(evaluateClientAstrology({
            fileName: targetFile.name,
            birthDate: targetFile.birthDate,
            sizeBytes: targetFile.size,
            guessDate: formData.guessDate,
            guessTime: formData.guessTime,
            guessSize: formData.guessSize,
            guessSizeUnit: formData.guessSizeUnit,
            psychicConfidence: formData.psychicConfidence
          }))
        ]);

        let fileContent = null;
        if (verdict.allowed && formData.action === 'open') {
          fileContent = await readMountedFileContent(formData.filePath);
        }

        res = { verdict, fileContent };
      } else {
        // Try backend API first
        try {
          const apiPromise = fetch('/api/interrogate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          }).then(async r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
          });

          const [, apiRes] = await Promise.all([minDelay, apiPromise]);
          res = apiRes;
        } catch (apiErr) {
          // If backend fails (e.g. hosted static web app), evaluate client-side!
          console.warn("Backend /api/interrogate unreachable, using client astrology engine:", apiErr);
          const verdict = evaluateClientAstrology({
            fileName: targetFile?.name || 'file',
            birthDate: targetFile?.birthDate,
            sizeBytes: targetFile?.size || 1024,
            guessDate: formData.guessDate,
            guessTime: formData.guessTime,
            guessSize: formData.guessSize,
            guessSizeUnit: formData.guessSizeUnit,
            psychicConfidence: formData.psychicConfidence
          });

          let fileContent = null;
          if (verdict.allowed && formData.action === 'open') {
            fileContent = await readMountedFileContent(formData.filePath);
          }

          res = { verdict, fileContent };
        }
      }

      if (res && res.verdict) {
        setVerdictResult(res.verdict);

        if (res.verdict.allowed) {
          if (formData.action === 'open' && res.fileContent) {
            setOpenFiles(prev => ({
              ...prev,
              [formData.filePath]: res.fileContent
            }));
          } else if (formData.action === 'close') {
            setOpenFiles(prev => {
              const updated = { ...prev };
              delete updated[formData.filePath];
              return updated;
            });
          }
        }
      }
    } catch (err) {
      console.error("Interrogation connection severed", err);
      setVerdictResult({
        tier: 'DOOMED',
        allowed: false,
        verdictTitle: 'DOOMED: Connection Error',
        compositeScore: 0,
        message: 'Could not connect to the astrological file engine.',
        submissionDetails: {
          guessDate: formData.guessDate || 'Unknown',
          guessTime: formData.guessTime || 'Unknown',
          guessSize: `${formData.guessSize || 0} ${formData.guessSizeUnit || 'bytes'}`,
          psychicConfidence: `${formData.psychicConfidence || 65}%`
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBypassSuccess = async (bypassData) => {
    const { action, result, file } = bypassData;
    const targetPath = result.updatedFilePath || file.path;

    // Set verdictResult to the successful bypass verdict
    setVerdictResult(result.verdict);

    let content = result.fileContent;
    if (action === 'open' && !content) {
      if (file.isLocalMounted || !result.fileContent) {
        content = await readMountedFileContent(file.path);
      }
    }

    if (action === 'open' && content) {
      setOpenFiles(prev => ({
        ...prev,
        [targetPath]: content
      }));
    } else if (action === 'close') {
      setOpenFiles(prev => {
        const updated = { ...prev };
        delete updated[file.path];
        return updated;
      });
    }

    if (result.updatedFilePath) {
      loadDirectory(currentDir);
    }
  };

  const handleCloseModal = () => {
    setInterception(null);
    setVerdictResult(null);
  };

  const handleToggleMute = () => {
    const isMuted = soundEffects.toggleMute();
    setMuted(isMuted);
  };

  const isOpen = activeFile && !!openFiles[activeFile.path];
  const activeContent = activeFile ? openFiles[activeFile.path] : null;
  const openFilePaths = new Set(Object.keys(openFiles));

  return (
    <div className="h-screen w-screen flex flex-col bg-transparent text-slate-200 overflow-hidden font-sans relative">
      {/* 1. Full-bleed background image covering the entire application */}
      <CosmicBackground />

      {/* 2. Top-level Shining Cursor Aura following mouse across all panels */}
      <CursorAura />

      {/* Header Bar */}
      <Header
        currentDir={currentDir}
        quickLocations={quickLocations}
        onChangeDir={loadDirectory}
        onRefresh={() => loadDirectory(currentDir)}
        muted={muted}
        onToggleMute={handleToggleMute}
        onMountLocalFolder={handleMountLocalFolder}
      />

      {/* Clean 2-Column Workspace */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Left Column: Real PC File Explorer */}
        <FileExplorer
          entries={entries}
          currentDir={currentDir}
          parentDir={parentDir}
          quickLocations={quickLocations}
          activeFile={activeFile}
          onSelectFile={setActiveFile}
          onNavigateDir={loadDirectory}
          onInterceptAction={handleInterceptAction}
          openFilePaths={openFilePaths}
          onMountLocalFolder={handleMountLocalFolder}
        />

        {/* Right Column: Real File Content Viewer */}
        <FileViewer
          file={activeFile}
          fileContent={activeContent}
          isOpen={isOpen}
          onInterceptAction={handleInterceptAction}
        />
      </div>

      {/* Interception Modal */}
      <InterceptionModal
        interception={interception}
        onClose={handleCloseModal}
        onSubmitInterrogation={handleSubmitInterrogation}
        isSubmitting={isSubmitting}
        verdictResult={verdictResult}
        onBypassSuccess={handleBypassSuccess}
      />

      {/* Animating Cosmic OS Boot Loader */}
      {showBootLoader && (
        <CosmicSplashLoader onComplete={() => setShowBootLoader(false)} />
      )}
    </div>
  );
}
