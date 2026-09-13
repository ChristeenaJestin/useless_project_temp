import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FileExplorer from './components/FileExplorer';
import FileViewer from './components/FileViewer';
import InterceptionModal from './components/InterceptionModal';
import CosmicBackground from './components/CosmicBackground';
import CursorAura from './components/CursorAura';
import { soundEffects } from './components/SoundFx';

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

  // Load real files from PC directory
  const loadDirectory = async (dirPath) => {
    setLoading(true);
    try {
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
      }
    } catch (err) {
      console.error("Failed to read PC directory", err);
    } finally {
      setLoading(false);
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
        console.warn("Could not load quick locations", e);
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

    try {
      const apiPromise = fetch('/api/interrogate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }).then(r => r.json());

      const [, res] = await Promise.all([minDelay, apiPromise]);

      if (res.verdict) {
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
          } else if (formData.action === 'delete') {
            setOpenFiles(prev => {
              const updated = { ...prev };
              delete updated[formData.filePath];
              return updated;
            });
            loadDirectory(currentDir);
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
        message: 'Could not connect to the local astrological file engine.',
        deltas: {
          date: { guess: formData.guessDate, actual: 'Unknown', diffDays: 99, score: 0 },
          time: { guess: formData.guessTime, actual: 'Unknown', diffMinutes: 99, score: 0 },
          size: { guessBytes: formData.guessSize, actualBytes: 0, diffBytes: 0, score: 0 }
        }
      });
    } finally {
      setIsSubmitting(false);
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
      />
    </div>
  );
}
