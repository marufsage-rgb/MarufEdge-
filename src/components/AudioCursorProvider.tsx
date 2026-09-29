import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { soundManager } from '../lib/soundFx';
import { Volume2, VolumeX, Music, MousePointer } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  isMusicPlaying: boolean;
  toggleMusic: () => void;
  volume: number;
  setVolume: (vol: number) => void;
  playHoverSound: () => void;
  playClickSound: () => void;
  playDataSound: () => void;
  cyberCursorEnabled: boolean;
  setCyberCursorEnabled: (enabled: boolean) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

// High-performance Cursor Component
const CyberCursor = ({ enabled }: { enabled: boolean }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [clickRipples, setClickRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
      if (haloRef.current) {
        haloRef.current.style.left = `${e.clientX}px`;
        haloRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('button, a, input, select, textarea, [role="button"], .interactive-card')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setClickRipples(prev => [...prev.slice(-3), newRipple]);
      setTimeout(() => {
        setClickRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 500);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('click', handleClick);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      <div
        ref={cursorRef}
        className="fixed w-4 h-4 rounded-full border border-cyan-400 bg-cyan-400/30 shadow-[0_0_12px_rgba(6,182,212,0.8)] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out pointer-events-none"
        style={{ transform: `translate(-50%, -50%) scale(${isHovering ? 1.6 : 1})` }}
      />
      <div
        ref={haloRef}
        className="fixed w-8 h-8 rounded-full border border-blue-500/40 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 pointer-events-none"
        style={{ transform: `translate(-50%, -50%) scale(${isHovering ? 1.3 : 1})` }}
      />
      {clickRipples.map(ripple => (
        <motion.div
          key={ripple.id}
          initial={{ scale: 0.2, opacity: 0.8 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed w-10 h-10 rounded-full border-2 border-emerald-400 bg-emerald-400/10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: ripple.x, top: ripple.y }}
        />
      ))}
    </div>
  );
};

export const AudioCursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.4);
  const [cyberCursorEnabled, setCyberCursorEnabled] = useState<boolean>(true);

  useEffect(() => {
    setIsMuted(soundManager.getMuted());
    setVolumeState(soundManager.getVolume());
  }, []);

  const toggleMute = useCallback(() => {
    const next = !isMuted;
    setIsMuted(next);
    soundManager.setMuted(next);
  }, [isMuted]);

  const toggleMusic = useCallback(() => {
    const active = soundManager.toggleAmbientMusic();
    setIsMusicPlaying(active);
  }, []);

  const handleSetVolume = useCallback((val: number) => {
    setVolumeState(val);
    soundManager.setVolume(val);
  }, []);

  const playHoverSound = useCallback(() => soundManager.playHover(), []);
  const playClickSound = useCallback(() => soundManager.playClick(), []);
  const playDataSound = useCallback(() => soundManager.playDataTransmission(), []);

  // Global sound triggers
  useEffect(() => {
    const handleGlobalClick = () => soundManager.playClick();
    const handleGlobalMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest('button, a, .interactive-card')) {
        soundManager.playHover();
      }
    };

    window.addEventListener('click', handleGlobalClick);
    window.addEventListener('mouseover', handleGlobalMouseOver);
    return () => {
      window.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('mouseover', handleGlobalMouseOver);
    };
  }, []);

  return (
    <SoundContext.Provider
      value={{
        isMuted,
        toggleMute,
        isMusicPlaying,
        toggleMusic,
        volume,
        setVolume: handleSetVolume,
        playHoverSound,
        playClickSound,
        playDataSound,
        cyberCursorEnabled,
        setCyberCursorEnabled,
      }}
    >
      {children}
      <CyberCursor enabled={cyberCursorEnabled} />

      {/* Floating Audio Dock */}
      <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md border border-white/10 p-1.5 rounded-2xl shadow-2xl">
        <button
          onClick={toggleMute}
          className={`p-2 rounded-xl transition-all ${isMuted ? 'text-red-400 bg-red-950/30' : 'text-cyan-400 bg-slate-900'}`}
          title="Toggle FX"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        <button
          onClick={toggleMusic}
          className={`p-2 rounded-xl transition-all ${isMusicPlaying ? 'text-white bg-blue-600 shadow-lg shadow-blue-900/50' : 'text-slate-400 bg-slate-900'}`}
          title="Toggle Music"
        >
          <Music className="w-4 h-4" />
        </button>
        <button
          onClick={() => setCyberCursorEnabled(!cyberCursorEnabled)}
          className={`hidden md:block p-2 rounded-xl transition-all ${cyberCursorEnabled ? 'text-cyan-400 bg-cyan-950/40' : 'text-slate-500 bg-slate-900'}`}
          title="Toggle Cursor"
        >
          <MousePointer className="w-4 h-4" />
        </button>
      </div>
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within an AudioCursorProvider');
  }
  return context;
};
