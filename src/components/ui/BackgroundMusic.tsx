
import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface BackgroundMusicProps {
  playlistSrcs?: string[];
  autoplay?: boolean;
}

const BackgroundMusic = ({ 
  playlistSrcs = ["/clarniet.mp3", "/turkish.mp3", "/bayat.mp3"], 
  autoplay = true 
}: BackgroundMusicProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(playlistSrcs[currentTrackIndex]);
    audioRef.current.volume = 0.3;

    // Handle track ended event to play next track
    const handleTrackEnded = () => {
      const nextIndex = (currentTrackIndex + 1) % playlistSrcs.length;
      setCurrentTrackIndex(nextIndex);
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleTrackEnded);
    }

    // Browser policies typically require user interaction before playing audio
    const handleUserInteraction = () => {
      if (!userInteracted) {
        setUserInteracted(true);
        if (autoplay) {
          playAudio();
        }
      }
    };

    // Add event listeners for user interaction
    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);

    return () => {
      // Clean up
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleTrackEnded);
        audioRef.current.pause();
        audioRef.current = null;
      }
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };
  }, [playlistSrcs, currentTrackIndex, autoplay]);

  // When current track changes, load and play the new track
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = playlistSrcs[currentTrackIndex];
      
      if (isPlaying) {
        playAudio();
      }
    }
  }, [currentTrackIndex, playlistSrcs]);

  // Auto-attempt play when user has interacted
  useEffect(() => {
    if (userInteracted && autoplay && audioRef.current) {
      playAudio();
    }
  }, [userInteracted, autoplay]);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Audio play failed:", error);
          setIsPlaying(false);
        });
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleAudio}
        className="bg-background/80 backdrop-blur-sm border border-primary/20 rounded-full p-3 shadow-md hover:bg-background/95 transition-all duration-300"
        aria-label={isPlaying ? "Mute background music" : "Play background music"}
      >
        {isPlaying ? (
          <Volume2 className="h-5 w-5 text-primary" />
        ) : (
          <VolumeX className="h-5 w-5 text-muted-foreground" />
        )}
      </button>
    </div>
  );
};

export default BackgroundMusic;
