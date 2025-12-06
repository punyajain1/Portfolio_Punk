"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

const TRACKS = [
  {
    title: "Resonance",
    artist: "HOME",
    id: "8GW6sLrK40k"
  },
  {
    title: "Nightcall",
    artist: "Kavinsky",
    id: "MV_3Dpw-BRY"
  },
  {
    title: "Midnight City",
    artist: "M83",
    id: "dX3k_QDnzHE"
  },
  {
    title: "After Dark",
    artist: "Mr.Kitty",
    id: "sVx1mJDeUjY"
  },
  {
    title: "METAMORPHOSIS",
    artist: "INTERWORLD",
    id: "lJvRohYSrZM"
  },
  {
    title: "Alone",
    artist: "Marshmello",
    id: "ALZHF5UqnU4"
  }
];

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef<any>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initializePlayer();
      };
    } else {
      initializePlayer();
    }

    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, []);

  const initializePlayer = () => {
    if (playerRef.current || !window.YT) return;

    playerRef.current = new window.YT.Player('youtube-player', {
      height: '1',
      width: '1',
      videoId: TRACKS[currentTrack].id,
      playerVars: {
        'playsinline': 1,
        'controls': 0,
        'disablekb': 1,
        'fs': 0,
        'iv_load_policy': 3,
        'modestbranding': 1,
        'origin': typeof window !== 'undefined' ? window.location.origin : '',
        'enablejsapi': 1,
        'rel': 0
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange,
        'onError': (e: any) => console.error("YouTube Player Error:", e)
      }
    });
  };

  const onPlayerReady = (event: any) => {
    setIsReady(true);
    event.target.setVolume(isMuted ? 0 : volume);
  };

  const onPlayerStateChange = (event: any) => {
    if (event.data === 1) { // PLAYING
      setIsPlaying(true);
      startProgressTimer();
    } else if (event.data === 2) { // PAUSED
      setIsPlaying(false);
      stopProgressTimer();
    } else if (event.data === 0) { // ENDED
      nextTrack();
    }
  };

  const startProgressTimer = () => {
    stopProgressTimer();
    progressInterval.current = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        const current = playerRef.current.getCurrentTime();
        const dur = playerRef.current.getDuration();
        if (dur > 0) {
            setProgress((current / dur) * 100);
        }
      }
    }, 1000);
  };

  const stopProgressTimer = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);
  };

  // Handle Track Change
  useEffect(() => {
    if (isReady && playerRef.current && typeof playerRef.current.loadVideoById === 'function') {
      playerRef.current.loadVideoById(TRACKS[currentTrack].id);
      setIsPlaying(true);
    }
  }, [currentTrack, isReady]);

  // Handle Volume Change
  useEffect(() => {
    if (isReady && playerRef.current && typeof playerRef.current.setVolume === 'function') {
      playerRef.current.setVolume(isMuted ? 0 : volume);
    }
  }, [volume, isMuted, isReady]);

  const togglePlay = () => {
    if (!playerRef.current || !isReady || typeof playerRef.current.playVideo !== 'function') return;
    
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % TRACKS.length);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseFloat(e.target.value);
    setProgress(newVal);
    if (playerRef.current && isReady && typeof playerRef.current.seekTo === 'function') {
        const dur = playerRef.current.getDuration();
        playerRef.current.seekTo((newVal / 100) * dur, true);
    }
  };

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-4 right-4 z-50"
    >
      {/* Hidden YouTube Player */}
      <div id="youtube-player" className="absolute top-0 left-0 w-0 h-0 opacity-0 pointer-events-none"></div>

      {/* Retro Neon Player Container */}
      <div className="relative w-80 bg-black/90 rounded-lg border-2 border-[#ff00ff] shadow-[0_0_20px_rgba(255,0,255,0.4),inset_0_0_20px_rgba(255,0,255,0.1)] overflow-hidden backdrop-blur-xl">
        
        {/* Header / Visualizer Area */}
        <div className="h-24 relative border-b border-[#ff00ff]/50 bg-gradient-to-b from-[#ff00ff]/10 to-transparent p-4 flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#00f7ff] shadow-[0_0_10px_#00f7ff]' : 'bg-red-500'}`} />
                    <span className="text-[#00f7ff] font-mono text-xs tracking-widest">STEREO</span>
                </div>
                <div className="flex gap-1">
                    {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-1 bg-[#333] rounded-full overflow-hidden">
                            <motion.div 
                                animate={{ width: isPlaying ? ["0%", "100%", "50%"] : "0%" }}
                                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                                className="h-full bg-[#ff00ff]"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-1 z-10">
                <h3 className="text-white font-black italic text-lg tracking-wider truncate drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                    {TRACKS[currentTrack].title}
                </h3>
                <p className="text-[#ff00ff] font-mono text-xs truncate uppercase tracking-widest">
                    {TRACKS[currentTrack].artist}
                </p>
            </div>

            {/* Grid Background Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,#ff00ff_95%)] bg-[length:20px_20px] opacity-20 pointer-events-none" />
        </div>

        {/* Controls Area */}
        <div className="p-4 bg-black/50">
            {/* Progress Bar */}
            <div className="mb-4 relative group cursor-pointer">
                <div className="w-full h-2 bg-[#333] rounded-full overflow-hidden border border-[#333]">
                    <div 
                        className="h-full bg-gradient-to-r from-[#00f7ff] to-[#ff00ff] shadow-[0_0_10px_#ff00ff]" 
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={progress || 0} 
                    onChange={handleSeek}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>

            <div className="flex items-center justify-between">
                {/* Main Controls */}
                <div className="flex items-center gap-4">
                    <button onClick={prevTrack} className="text-[#ff00ff] hover:text-white transition-colors hover:drop-shadow-[0_0_5px_#fff]">
                        <SkipBack size={24} fill="currentColor" />
                    </button>
                    
                    <button 
                        onClick={togglePlay} 
                        className="w-12 h-12 rounded-full border-2 border-[#00f7ff] flex items-center justify-center text-[#00f7ff] shadow-[0_0_15px_rgba(0,247,255,0.3)] hover:bg-[#00f7ff] hover:text-black hover:shadow-[0_0_25px_#00f7ff] transition-all active:scale-95"
                    >
                        {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                    </button>

                    <button onClick={nextTrack} className="text-[#ff00ff] hover:text-white transition-colors hover:drop-shadow-[0_0_5px_#fff]">
                        <SkipForward size={24} fill="currentColor" />
                    </button>
                </div>

                {/* Volume */}
                <div className="flex items-center gap-2 group/vol">
                    <button onClick={() => setIsMuted(!isMuted)} className="text-[#ff00ff]/70 hover:text-[#ff00ff]">
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <div className="w-20 h-1 bg-[#333] rounded-full relative">
                        <div 
                            className="absolute top-0 left-0 h-full bg-[#00f7ff] rounded-full"
                            style={{ width: `${isMuted ? 0 : volume}%` }}
                        />
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={volume} 
                            onChange={(e) => setVolume(Number(e.target.value))}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
}