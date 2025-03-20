
import { useState, useRef } from "react";
import { Play, Pause, ExternalLink, Clock } from "lucide-react";

const Portfolio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = (index: number) => {
    if (activeIndex === index) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setActiveIndex(index);
      setIsPlaying(true);
      // In a real implementation, we would load the new audio file here
      setTimeout(() => {
        audioRef.current?.play();
      }, 100);
    }
  };

  const portfolioItems = [
    {
      title: "Andalusian Night",
      category: "Arabic Classical",
      image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "3:42",
      description: "A soulful interpretation of classical Arabic maqam, blending traditional melodies with contemporary keyboard arrangements."
    },
    {
      title: "Istanbul Dreams",
      category: "Turkish Fusion",
      image: "https://images.unsplash.com/photo-1524187208855-b6c2f1e78bce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "4:15",
      description: "An evocative journey through Turkish musical traditions, featuring intricate rhythms and emotional melodic phrases."
    },
    {
      title: "Oriental Bridges",
      category: "East-West Fusion",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "5:08",
      description: "A bold fusion project that connects Eastern modal systems with Western harmony, creating a unique crosscultural dialogue."
    },
    {
      title: "Desert Winds",
      category: "Ambient Arabic",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "6:23",
      description: "Atmospheric compositions inspired by the vast deserts of the Middle East, with layered keyboard textures and traditional motifs."
    }
  ];

  return (
    <section id="portfolio" className="py-24 bg-accent/50 dark:bg-accent/10 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-background rounded-full text-sm font-medium mb-4">
            Featured Works
          </span>
          <h2 className="section-title">
            Musical <span className="text-gradient">Portfolio</span>
          </h2>
          <p className="section-subtitle">
            Experience a selection of Sameh Yahya's performances and compositions
            spanning various styles and cultural influences.
          </p>
        </div>

        {/* Portfolio grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioItems.map((item, index) => (
            <div 
              key={index}
              className="glass-panel overflow-hidden card-hover group"
            >
              {/* Image container with overlay */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 w-full">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/80 text-sm font-medium">{item.category}</span>
                      <div className="flex items-center text-white/80 text-sm">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{item.duration}</span>
                      </div>
                    </div>
                    <h3 className="text-xl text-white font-serif font-bold">{item.title}</h3>
                  </div>
                </div>
                
                {/* Play button overlay */}
                <button 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                  onClick={() => handlePlayPause(index)}
                  aria-label={isPlaying && activeIndex === index ? "Pause" : "Play"}
                >
                  {isPlaying && activeIndex === index ? (
                    <Pause className="h-8 w-8 text-white" />
                  ) : (
                    <Play className="h-8 w-8 text-white translate-x-0.5" />
                  )}
                </button>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <button 
                    className="text-primary font-medium hover:underline flex items-center gap-1.5"
                    onClick={() => handlePlayPause(index)}
                  >
                    {isPlaying && activeIndex === index ? (
                      <>
                        <Pause className="h-4 w-4" /> Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" /> Listen
                      </>
                    )}
                  </button>
                  <a 
                    href="#" 
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                    aria-label="View details"
                  >
                    <span>Details</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Hidden audio element */}
        <audio ref={audioRef} className="hidden">
          <source src="/path-to-audio-file.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        
        {/* View more button */}
        <div className="mt-16 text-center">
          <a 
            href="#" 
            className="cta-button bg-background dark:bg-accent border border-primary hover:bg-primary/10 inline-block"
          >
            View Full Portfolio
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
